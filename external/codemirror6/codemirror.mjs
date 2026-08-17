
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
            historyKeymap }       from "@codemirror/commands";
   import { languages }           from "@codemirror/language-data";
   import { showMinimap }         from "@replit/codemirror-minimap";
   import { javascript }          from "@codemirror/lang-javascript";

   import { StreamLanguage }      from "@codemirror/language";
   import { gas }                 from "@codemirror/legacy-modes/mode/gas";


   // export
   window.CM6 = {
     EditorState,
     EditorView,
     Compartment,
     StateField,
     StateEffect,
     Decoration,
     keymap,
     showMinimap,

     createSetup: function(options = {}) {
       const extensions = [
         basicSetup,
         gutters(),         // CM5: gutters: [...]

         keymap.of([
           ...defaultKeymap,
           ...historyKeymap,
           ...(options.customKeys || [])
         ]),

         syntaxHighlighting(defaultHighlightStyle)
       ];

       // CM5: mode: javascript | gas
       if (options.mode === 'javascript') {
           extensions.push(javascript());
       } else if (options.mode === 'gas' || options.mode === 'assembly') {
           extensions.push(StreamLanguage.define(gas)); 
       }

       // CM5: lineWrapping: true
       if (options.lineWrapping) {
           extensions.push(EditorView.lineWrapping);
       }

       // CM5: minimap
       if (options.showMinimap) {
           extensions.push(minimap());
       }

       return extensions;
     }
   } ;

