
   import { basicSetup, EditorView }                    from "codemirror"
// import { languages }                                 from "@codemirror/language-data"
   import { javascript }                                from "@codemirror/lang-javascript"
   import { keymap }                                    from "@codemirror/view"
   import { defaultKeymap, history, historyKeymap }     from "@codemirror/commands"
// import { syntaxHighlighting, defaultHighlightStyle } from "@codemirror/language"
   import { autocompletion }                            from "@codemirror/autocomplete"


   var view = new EditorView({
		      doc: "\n\n\n\n\n\n\n\n\n\n",
		      extensions: [
			 basicSetup,
			 history(),
			 keymap.of([...defaultKeymap, ...historyKeymap]),
			 javascript(),
			 syntaxHighlighting(defaultHighlightStyle),
		      ],
                      parent: document.body
	      }) ;

