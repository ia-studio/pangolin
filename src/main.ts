import { PREVIEW_CSS_CLASS_NAME } from "./constants";
import "./style.css";

import HtmlVanillaEditor from "./vanilla/HtmlVanillaEditor";

const editor = HtmlVanillaEditor.create({
  id: "app",
  tools: [{ type: "h1" }, { type: "p" }, { type: "div" }],
  components: [],
});

const clearBtn = document.querySelector(".clear-btn");

clearBtn?.addEventListener("click", () => {
  editor.setComponents([]);

  const preview = document.querySelector(`.${PREVIEW_CSS_CLASS_NAME}`);

  if (preview) {
    preview.innerHTML = "";
    preview.appendChild(editor.render());
  }
});

const exportBtn = document.querySelector(".export-btn");

exportBtn?.addEventListener("click", () => {
  console.log(JSON.stringify(editor.getComponents()));
});
