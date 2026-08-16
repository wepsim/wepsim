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

/* CM6

    const {
      EditorState, Compartment, StateField, StateEffect,
      EditorView, Decoration, keymap,
      showMinimap
    } = window.CM6 ;

    export class ws_editor_cm6
    {
        constructor ( editor_id, editor_cfg )
        {
            // is_modified, is_compiled, and is_refreshed
            this.is_modified  = true;
            this.is_compiled  = false;
            this.is_refreshed = false;

            const updateListener = EditorView.updateListener.of((update) => {
                if (update.docChanged) {
                    this.is_modified  = true;
                    this.is_compiled  = false;
                    this.is_refreshed = false;
                }
            });

            // Para opciones modificables dinámicamente con setOption()
            this.theme_compartment  = new Compartment();
            this.keymap_compartment = new Compartment();

            // Decoraciones usadas por addLineClass/removeLineClass
            this.lineDecorations = Decoration.none;

            const extensions = [
                                 updateListener,
				 basicSetup,
				 javascript(),

                                 // let dynamic decorators
                                 EditorView.decorations.of(() => this.lineDecorations),

                                 this.theme_compartment.of([]),
                                 this.keymap_compartment.of([]),

                                 showMinimap.compute(['doc'], (state) => {
                                   return {
                                     create,
                                     displayText: 'blocks',
                                     showOverlay: 'always',
                                     gutters: [ { 1: '#00FF00', 2: '#00FF00' } ],
                                   }
                                 }),

                                 ...(editor_cfg.extensions || [])
                               ] ;

            const state = EditorState.create({
                doc: "\n\n\n\n\n\n\n\n\n\n",
                extensions
            });

            const parent = document.getElementById(editor_id);

            // new EditorView
            this.view = new EditorView({ state, parent });
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

        lineChToOffset ( line, ch )
        {
            const l = this.view.state.doc.line(line + 1);
            return Math.min(l.from + ch, l.to);
        }

        setCursor ( {line, ch} )
        {
            const pos = this.lineChToOffset(line, ch);

            this.view.dispatch({
                selection: {anchor: pos},
                scrollIntoView: true
            });
        }


        getWrapperElement () {
            return this.view.dom;
        }

        setOption ( name, value )
        {
            switch (name)
            {
                case "theme":
                     this.setTheme(value);
                     break;

                case "keyMap":
                     this.setKeyMap(value);
                     break;

                default:
                     console.warn("ws_editor_cm6.setOption(...): unsupported option " + name) ;
            }
        }

        setTheme ( theme )
        {
            const extension = this.themeToExtension(theme);

            this.view.dispatch({
                effects: this.theme_compartment.reconfigure(extension)
            });
        }


        setKeyMap ( name )
        {
            const extension = this.keyMapToExtension(name);

            this.view.dispatch({
                effects: this.keymap_compartment.reconfigure(extension)
            });
        }

        scrollToLine ( line )
        {
            var lineBase   = Math.min(line + 1, this.view.state.doc.lines) ;
            var lineNumber = Math.max(1, lineBase) ;

            const docLine = this.view.state.doc.line(lineNumber) ;

            this.view.dispatch({
                effects: EditorView.scrollIntoView( docLine.from, { y: "center" })
            }) ;
        }

        highlightLine ( line )
        {
            var lineBase   = Math.min(line + 1, this.view.state.doc.lines) ;
            var lineNumber = Math.max(1, lineBase) ;

            const line = this.view.state.doc.line(lineNumber);

            this.view.dispatch({
                selection: {
                    anchor: line.from
                },

                effects: setLineHighlight.of(line.from)
            });
        }

        clearHighlight ( )
        {
            this.view.dispatch({
                effects: clearLineHighlight.of(null)
            }) ;
        }

        focus ( ) {
            this.view.focus();
        }

        destroy ( ) {
            this.view.destroy();
        }
    }
*/

    export class ws_editor_cm5
    {
        constructor ( editor_id, editor_cfg )
        {
            // new EditorView
            this.view = CodeMirror.fromTextArea(document.getElementById(editor_id), editor_cfg) ;

            // default values
            this.view.setValue("\n\n\n\n\n\n\n\n\n\n") ;

            // event onChange -> update is_* attributes
	    this.is_modified  = true ;
	    this.is_compiled  = false ;
	    this.is_refreshed = false ;

            this.view.on("change", () => {
                this.is_modified  = true;
                this.is_compiled  = false;
                this.is_refreshed = false;
            });

            // line marked
            this.marked = 0 ;
        }

        setSize ( width, height ) {
            return this.view.setSize(width, height);
        }

        refresh ( ) {
            this.view.refresh();
        }

        getValue ( ) {
            return this.view.getValue() ;
        }

        setValue ( text ) {
            return this.view.setValue(text) ;
        }

        getCursor ( ) {
            return this.view.getCursor() ;
        }

        setCursor ( line_ch ) {
            return this.view.setCursor( line_ch ) ;
        }

        getWrapperElement () {
            return this.view.getWrapperElement() ;
        }

        setOption ( name, value ) {
            return this.view.setOption(name, value) ;
        }

        scrollToLine ( line ) {
            var topHeight    = this.view.charCoords({line: line, ch: 0}, 'local').top ;
            var middleHeight = this.view.getScrollerElement().offsetHeight / 2 ;
            this.view.scrollTo(null, topHeight - middleHeight - 5) ;
        }

        highlightLine ( line ) {
            this.view.setCursor({ line: line, ch: 0 }) ;
            this.marked = this.view.addLineClass(line, 'background', 'CodeMirror-selected') ;
        }

        clearHighlight ( ) {
	    this.view.removeLineClass(this.marked, 'background', 'CodeMirror-selected');
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

	    editor.getWrapperElement().style['text-shadow'] = '0.0em 0.0em';
	    editor.getWrapperElement().style['font-weight'] = 'bold';

	    if (theme === 'blackboard') {
		editor.getWrapperElement().style['font-weight'] = 'normal';
	    }

	    editor.setOption('theme', theme);
    }

    export function sim_cfg_editor_mode ( editor )
    {
            // check arguments
            if (null == editor) {
                return ;
            }

	    var edt_mode   = get_cfg('editor_mode');
            var aval_modes = [ 'vim', 'emacs', 'sublime' ] ;

            if (aval_modes.includes(edt_mode)) {
		editor.setOption('keyMap', edt_mode);
            }
    }

    export function sim_cm_get_firmcfg ( )
    {
	    return {
			value: "\n\n\n\n\n\n\n\n\n\n\n\n",

			lineNumbers:   true,
			lineWrapping:  true,
			matchBrackets: true,
			tabSize:       2,

			foldGutter: {
			   rangeFinder: new CodeMirror.fold.combine(CodeMirror.fold.brace, CodeMirror.fold.comment)
			},
			gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],

			mode: "text/javascript"
		   } ;
    }

    export function sim_cm_get_asmcfg ( )
    {
	    return {
			value: "\n\n\n\n\n\n\n\n\n\n\n\n",

			lineNumbers:   true,
			lineWrapping:  true,
			matchBrackets: true,
			tabSize: 2,

			extraKeys: {
			  "Ctrl-Space": function(cm) {
			      CodeMirror.showHint(cm, function(cm, options) {
				      var simware = get_simware();
				      var cur = cm.getCursor();
				      var result = [];
				      for (var i=0; i<simware.firmware.length; i++) {
					   if (simware.firmware[i].name != "begin") {
						result.push(simware.firmware[i].signatureUser) ;
					   }
				      }
				      return { list: result, from: cur, to: cur } ;
			      });
			  },
			  "Ctrl-/": function(cm) {
			      cm.execCommand('toggleComment');
			  }
			},

			mode: "gas"
		   } ;
    }

    export function sim_init_editor ( editor_id, editor_cfg )
    {
            var useCM6 = false ; // DEBUG: for debugging purposes
            var EditorClass = useCM6 ? ws_editor_cm6 : ws_editor_cm5;

            // new editor
            var editor_obj = new EditorClass(editor_id, editor_cfg) ;

            // set default values...
            sim_cfg_editor_theme(editor_obj) ;
            sim_cfg_editor_mode(editor_obj) ;

            editor_obj.setSize("auto", "75vh");
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

