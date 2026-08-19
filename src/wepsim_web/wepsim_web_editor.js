/*
 *  Copyright 2015-2026 The WepSIM team (see docs/WEPSIM-TEAM.md)
 *
 *  This file is part of WepSIM.
 *
 *  WepSIM is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  WepSIM is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with WepSIM.  If not, see <http://www.gnu.org/licenses/>.
 *
 */


     import { get_cfg }                   from "../sim_core/sim_cfg.js";
     import { get_simware,
              set_simware }               from "../sim_core/sim_adt_core.js";
     import { refresh }                   from "../sim_core/sim_core_ui.js";
     import { wait_if_uievents,
              update_memories }           from "../sim_core/sim_core_ctrl.js";
     import { simcore_reset,
              simcore_compile_firmware }  from "../sim_core/sim_api_core.js";

     import { wsasm_src2mem }             from "../sim_sw/assembly.js";
     import { i18n_get }                  from "../wepsim_i18n/i18n.js";

     import { asmdbg_update_assembly }    from "./wepsim_uielto_dbg_asm.js";
     import { sim_change_workspace }      from "./wepsim_web_simulator.js";

     import { get_inputfirm,
              get_inputasm }              from "../wepsim_web/wepsim_web_simulator.js";

     import { wepsim_notify_error,
              wepsim_notify_success }     from "../wepsim_core/wepsim_notify.js";
     import { wsweb_dlg_alert }           from "../wepsim_core/wepsim_dialog.js";


    //
    // WepSIM API
    //

    export class ws_editor_cm6
    {
        constructor ( editor_id, editor_cfg )
        {
            // load CM6 in this object
            this.CM6 = globalThis.CM6 ;
            if (!this.CM6) {
                throw new Error("ERROR: CodeMirror 6 bundle is not loaded !") ;
            }

            // is_modified, is_compiled, and is_refreshed
            this.is_modified  = true ;
            this.is_compiled  = false ;
            this.is_refreshed = false ;

            const updateListener = this.CM6.EditorView.updateListener.of((update) => {
                if (update.docChanged) {
                    this.is_modified  = true ;
                    this.is_compiled  = false ;
                    this.is_refreshed = false ;
                }
            });

            // For dynamic options with setOption()
            this.theme_compartment    = new this.CM6.Compartment() ;
            this.keymap_compartment   = new this.CM6.Compartment() ;
            this.readonly_compartment = new this.CM6.Compartment() ;

            // For highlight a single line
            this.setLineHighlight     = this.CM6.StateEffect.define() ;
            this.clearLineHighlight   = this.CM6.StateEffect.define() ;
            this.lineHighlightField   = this.getLineHighlightField() ;

            // Options for creating the default extension array
            var editor_opt = {
                    mode:          "",
                    lineWrapping:  true,
                    showMinimap:   true,
		    matchBrackets: true,
		    indentUnit:    3,
                } ;

            if ("firmware" == editor_cfg)
                 editor_opt.mode = "javascript" ;
            else editor_opt.mode = "gas" ;

            // Extension array
            const extensions = [
                updateListener,

                ...this.CM6.createSetup({
                    mode:          editor_opt.mode,
                    lineWrapping:  editor_opt.lineWrapping,
                    showMinimap:   editor_opt.showMinimap,
		    matchBrackets: editor_opt.matchBrackets,
		    indentUnit:    editor_opt.indentUnit
                }),

                this.theme_compartment.of([]),
                this.keymap_compartment.of([]),
                this.readonly_compartment.of( this.CM6.EditorState.readOnly.of(false) ),

                this.CM6.EditorView.theme({
                    '&':            { height: '100%' },
                    '.cm-scroller': { overflow: 'auto' },
                    '.cm-content':  { 'white-space': 'pre-wrap', 'word-break': 'normal', 'font-weight': 'bold' },
                }),

                this.lineHighlightField
            ];

            const state = this.CM6.EditorState.create({
                doc: "\n\n\n\n\n\n\n\n\n\n",
                extensions
            });

            const parent = document.getElementById(editor_id);

            // new EditorView
            this.view = new this.CM6.EditorView({ state, parent });
        }

        // helper for constructor
        getLineHighlightField ( )
        {
            var lineHighlightField = this.CM6.StateField.define({

		create() {
		    return CM6.Decoration.none;
		},

		update: (decorations, transaction) => {
		    decorations = decorations.map(transaction.changes);

		    for (const effect of transaction.effects)
		    {
			if (effect.is(this.setLineHighlight))
			{
			    const line  = transaction.state.doc.lineAt(effect.value);
			    decorations = CM6.Decoration.set([ CM6.Decoration.line({ class: "CodeMirror-selected" }).range(line.from) ]);
			}

			if (effect.is(this.clearLineHighlight)) {
			    decorations = CM6.Decoration.none;
			}
		    }

		    return decorations;
		},

		provide: field => CM6.EditorView.decorations.from(field)
            }) ;

            return lineHighlightField ;
        }

        highlightLine ( line )
        {
            const lineBase   = Math.min(line + 1, this.view.state.doc.lines);
            const lineNumber = Math.max(1, lineBase);

            const docLine = this.view.state.doc.line(lineNumber);

            this.view.dispatch({
                selection: { anchor: docLine.from },
                effects: this.setLineHighlight.of(docLine.from)
            });
        }

        clearHighlight ( )
        {
            this.view.dispatch({
                effects: this.clearLineHighlight.of(null)
            });
        }

        scrollToLine ( line )
        {
            var lineBase   = Math.min(line + 1, this.view.state.doc.lines) ;
            var lineNumber = Math.max(1, lineBase) ;

            const docLine = this.view.state.doc.line(lineNumber) ;

            this.view.dispatch({
                effects: this.CM6.EditorView.scrollIntoView( docLine.from, { y: "center" })
            }) ;
        }


        setSize ( width, height )
        {
            if (width !== null && width !== undefined) {
                this.view.dom.style.width =
                    typeof width === "number" ? `${width}px` : width;
            }

            if (height !== null && height !== undefined) {
                this.view.dom.style.height =
                    typeof height === "number" ? `${height}px` : height;
            }

            this.view.requestMeasure();
        }

        refresh ( ) {
            this.view.requestMeasure();
        }

        getValue ( ) {
            return this.view.state.doc.toString();
        }

        setValue ( text )
        {
            this.view.dispatch({
                changes: {
                    from: 0,
                    to: this.view.state.doc.length,
                    insert: text
                }
            });
        }

        getCursor ( )
        {
            const pos  = this.view.state.selection.main.head;
            const line = this.view.state.doc.lineAt(pos);

            return {
                line: line.number - 1,
                ch:   pos - line.from
            };
        }

        setCursor ( {line, ch} )
        {
            // lineChToOffset ( line, ch )
            const l   = this.view.state.doc.line(line + 1) ;
            const pos = Math.min(l.from + ch, l.to) ;

            // scroll to
            this.view.dispatch({
                selection: { anchor: pos },
                scrollIntoView: true
            });
        }

        setOption ( name, value )
        {
            switch (name)
            {
                case "theme":
                     this.setTheme(value); break;
                case "keyMap":
                     this.setKeyMap(value); break;
                case "readOnly":
                     this.setReadOnly(value); break;
                default:
                     console.warn("ERROR: ws_editor_cm6.setOption(...): unsupported option " + name) ;
            }
        }

        setTheme ( theme )
        {
            var extension = [] ;
            switch (theme)
            {
                case "default":
                     extension = [] ; break ;
                case "blackboard":
                     extension = this.CM6.blackboardTheme ?? []; break ;
                case "eclipse":
                     extension = this.CM6.eclipseTheme    ?? []; break ;
            }

            this.view.dispatch({
                effects: this.theme_compartment.reconfigure(extension)
            });
        }

        setKeyMap ( name )
        {
            var extension = [] ;
            switch (name)
            {
                case "default":
                     extension = []; break ;
                case "vim":
                     extension = this.CM6.vim(); break ;
                case "emacs":
                     extension = this.CM6.emacsKeymap ?? []; break ;
            }

            this.view.dispatch({
                effects: this.keymap_compartment.reconfigure(extension)
            });
        }

        setReadOnly ( is_readonly )
        {
            this.view.dispatch({
                effects: this.readonly_compartment.reconfigure(
                    this.CM6.EditorState.readOnly.of(Boolean(is_readonly))
                )
            });
        }

        focus ( ) {
            this.view.focus();
        }

        destroy ( ) {
            this.view.destroy();
        }
    }


    /*
     *  Editor
     */

    export function sim_cfg_editor_theme ( editor )
    {
            // check arguments
            if (null == editor) {
                return ;
            }

	    var theme = get_cfg('editor_theme') ;
	    editor.setOption('theme', theme);
    }

    export function sim_cfg_editor_mode ( editor )
    {
            // check arguments
            if (null == editor) {
                return ;
            }

	    var edt_mode = get_cfg('editor_mode');
            editor.setOption('keyMap', edt_mode);
    }

    export function sim_init_editor ( editor_id, editor_cfg )
    {
            // new editor
            var editor_obj = new ws_editor_cm6(editor_id, editor_cfg) ;

            // set default values...
            sim_cfg_editor_theme(editor_obj) ;
            sim_cfg_editor_mode(editor_obj) ;

            editor_obj.refresh();

            // return object
	    return editor_obj ;
    }


    /*
     *  Dialogs
     */

    // Error dialog

    export function goError ( editor, pos )
    {
         editor.highlightLine(pos - 1) ;
         setTimeout(function(){
                        editor.clearHighlight() ;
                    }, 3000) ;

         editor.scrollToLine(pos - 1) ;
    }

    export function showError ( Msg, editor )
    {
            var errorMsg = Msg.replace(/\t/g,' ').replace(/   /g,' ');

            var pos = errorMsg.match(/Problem around line \d+/);
            var lineMsg = '' ;
            if (null !== pos) {
                pos = parseInt(pos[0].match(/\d+/)[0]);
                lineMsg += '<button type="button" class="btn btn-danger" ' +
                           '        onclick="ws.wepsim_notify_close(); ' +
                           '                 ws.goError(ws.get_' + editor + '(), ' + pos + ');">' +
                           ' Go line ' + pos +
                           '</button>&nbsp;' ;
            }

            wepsim_notify_error('<strong>ERROR</strong>',
		                '<div class="container-fluid p-1 mb-1 mr-1 overflow-auto" ' +
                                '     style="-webkit-overflow-scrolling:touch; max-height:70vh; max-width:75vw;">' +
                                errorMsg + '<br>' +
		                '</div>' +
		                '<center>' +
		                lineMsg +
                                '<button type="button" class="btn btn-danger" ' +
                                '        onclick="ws.wepsim_notify_close();"><span data-langkey="Close">Close</span></button>' +
                                '</center>') ;
    }

    // Show binaries

    export function wepsim_get_binary_code ( )
    {
	 var inputfirm = get_inputfirm() ;
	 var inputasm  = get_inputasm() ;

         // compile if needed
	 if (false == inputasm.is_compiled)
         {
	     var textToCompile = inputasm.getValue() ;
	     var ok = wepsim_compile_assembly(textToCompile) ;
	     inputasm.is_compiled = ok ;
	 }

         // update content
         if (false == inputfirm.is_compiled)
         {
             if (inputfirm.getValue().trim() !== "") {
                 var wsi = get_cfg('ws_idiom') ;
                 var msg = i18n_get('gui', wsi, 'Microcode or Assembly are not compiled properly') ;
	         wait_if_uievents(function(){ wsweb_dlg_alert(msg + '.<br>\n') ; }, 50);
             }

             return null ;
	 }
         if (false == inputasm.is_compiled) {
             return null ;
	 }

	 return get_simware() ;
    }

    export function wepsim_get_binary_microcode ( )
    {
	 var inputfirm = get_inputfirm() ;
	 var inputasm  = get_inputasm() ;

         // microcompile if needed
	 if (false == inputfirm.is_compiled)
	 {
	     var textToMCompile = inputfirm.getValue() ;
	     var ok = wepsim_compile_firmware(textToMCompile) ;
	     inputfirm.is_compiled = ok ;
	      inputasm.is_compiled = false ;
	 }

         // update content
	 if (false == inputfirm.is_compiled) {
	     return null ;
	 }

	 return get_simware() ;
    }


    /*
     * Microcompile and compile
     */

    export function wepsim_compile_assembly ( textToCompile )
    {
        // get SIMWARE.firmware
        var SIMWARE = get_simware() ;
	if (SIMWARE.firmware.length === 0)
        {
            wsweb_dlg_alert('WARNING: please load the microcode first.');
            sim_change_workspace('#main3') ;
            return false;
	}

        // compile Assembly and show message
        var SIMWAREaddon = wsasm_src2mem(SIMWARE, textToCompile, {});
        if (SIMWAREaddon.error != null)
        {
            showError(SIMWAREaddon.error, "inputasm") ;
            return false;
        }

        wepsim_notify_success('<strong>INFO</strong>',
                              'Assembly was compiled and loaded.') ;

        // update memory and segments
        set_simware(SIMWAREaddon) ;
	update_memories(SIMWARE);

        // update UI
	asmdbg_update_assembly() ;

	simcore_reset();
        return true;
    }

    export function wepsim_compile_firmware ( textToMCompile )
    {
	var ret = simcore_compile_firmware(textToMCompile) ;
	if (false === ret.ok)
        {
            showError(ret.msg, "inputfirm") ;
            return false;
        }

        // update UI
        wepsim_notify_success('<strong>INFO</strong>',
                              'Microcode was compiled and loaded.') ;

	simcore_reset() ;
        return true;
    }

