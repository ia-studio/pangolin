import { PREVIEW_CSS_CLASS_NAME } from "pangolin-core";
import { HtmlVanillaEditor } from "pangolin-vanilla";

import "./style.css";

const editor = HtmlVanillaEditor.create({
  id: "app",
  tools: [
    {
      type: "header",
      defaultValues: {
        text: "This is a header",
      },
      render: ({ text }) => `<h1>${text}</h1>`,
    },
    {
      type: "text",
      defaultValues: {
        text: "This is a text",
      },
      render: ({ text }) => `<p>${text}</p>`,
    },
  ],
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
