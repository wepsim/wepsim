
import { EditorView, basicSetup } from "codemirror"

import { javascript } from "@codemirror/lang-javascript"

let editor = new EditorView({
  extensions: [basicSetup, javascript()],
  parent: document.body
})

