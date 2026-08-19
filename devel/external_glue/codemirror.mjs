
   // import
   import { basicSetup }          from "codemirror";
   import { EditorState,
            Compartment,
            StateField,
            StateEffect }         from "@codemirror/state";
   import { EditorView,
            keymap,
            Decoration }          from "@codemirror/view";
   import { defaultKeymap,
            historyKeymap,
            indentLess,
            indentMore,
            toggleComment }       from "@codemirror/commands";
   import { autocompletion,
            startCompletion,
            completeFromList }    from "@codemirror/autocomplete";
   import { syntaxHighlighting,
            defaultHighlightStyle,
            HighlightStyle,
            indentUnit,
            StreamLanguage }      from "@codemirror/language";
   import { javascript }          from "@codemirror/lang-javascript";
   import { gas }                 from "@codemirror/legacy-modes/mode/gas";
   import { languages }           from "@codemirror/language-data";
   import { showMinimap }         from "@replit/codemirror-minimap";
   import { vim }                 from "@replit/codemirror-vim";
   import { emacs }               from "@replit/codemirror-emacs";


   function createSetup ( options = {} )
   {
         const extensions = [ basicSetup ] ;

         // CM5: mode: javascript | gas
         if (options.mode === 'javascript')
         {
             extensions.push( javascript() ) ;
             extensions.push(
                               keymap.of([
                                   { key: 'Ctrl-/',    run: toggleComment },
                                   { key: 'Tab',       run: indentMore, shift: indentLess },
                               ])
                            ) ;
         }
         else if (options.mode === 'gas' || options.mode === 'assembly')
         {
             extensions.push(StreamLanguage.define(gas)) ;
             extensions.push(
                               keymap.of([
                                   { key: 'Ctrl-Space', run: startCompletion },
                                   { key: 'Ctrl-/',     run: toggleComment },
                                   { key: 'Tab',        run: indentMore, shift: indentLess },
                               ])
                            ) ;
         }

         // CM5: lineWrapping: true
         if (options.lineWrapping) {
             extensions.push( EditorView.lineWrapping ) ;
         }

         // CM5: minimap
         if (options.showMinimap)
         {
              const create = () => {
                  const dom = document.createElement("div");
                  return { dom };
              };

              extensions.push(
                  showMinimap.compute(
                      ["doc"],
                      () => ({
                          create,
                          displayText: "blocks",
                          showOverlay: "always"
                      })
                  )
              );
         }

         // identUnit
         if (options.indentUnit > 0)
         {
             var spaces = ' '.repeat(options.indentUnit) ;
             extensions.push(
                  indentUnit.of(spaces)
              );
         }

         return extensions;
   }


   // themes
   const blackboardTheme = EditorView.theme({
       "&": {
           backgroundColor: "#0c1021",
           color: "#f8f8f8"
       },
   
       ".cm-content": {
           caretColor: "#ffffff"
       },
   
       ".cm-cursor, .cm-dropCursor": {
           borderLeftColor: "#ffffff"
       },
   
       "&.cm-focused .cm-selectionBackground, .cm-selectionBackground": {
           backgroundColor: "#253b76"
       },
   
       ".cm-activeLine": {
           backgroundColor: "#151b2f"
       },
   
       ".cm-gutters": {
           backgroundColor: "#0c1021",
           color: "#888888",
           border: "none"
       },
   
       ".cm-activeLineGutter": {
           backgroundColor: "#151b2f"
       }
   }, {
       dark: true
   });

   const eclipseTheme = EditorView.theme({
       "&": {
           backgroundColor: "#ffffff",
           color: "#000000"
       },
   
       ".cm-content": {
           caretColor: "#000000"
       },
   
       ".cm-cursor, .cm-dropCursor": {
           borderLeftColor: "#000000"
       },
   
       "&.cm-focused .cm-selectionBackground, .cm-selectionBackground": {
           backgroundColor: "#d7d4f0"
       },
   
       ".cm-activeLine": {
           backgroundColor: "#f3f3f3"
       },
   
       ".cm-gutters": {
           backgroundColor: "#f7f7f7",
           color: "#999999",
           borderRight: "1px solid #dddddd"
       },
   
       ".cm-activeLineGutter": {
           backgroundColor: "#e8e8e8"
       }
   });


   // export
   export {
       EditorState,
       Compartment,
       StateField,
       StateEffect,

       EditorView,
       Decoration,
       keymap,

       defaultKeymap,
       historyKeymap,
       indentLess,
       indentMore,
       toggleComment,

       syntaxHighlighting,
       defaultHighlightStyle,
       HighlightStyle,
       indentUnit,

       autocompletion,
       completeFromList,
       StreamLanguage,
       javascript,
       gas,

       vim,
       emacs,
       blackboardTheme,
       eclipseTheme,

       showMinimap,
       createSetup
   } ;

