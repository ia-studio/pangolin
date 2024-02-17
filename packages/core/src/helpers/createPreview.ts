import HtmlEditor from "../HtmlEditor";
import { PREVIEW_CSS_CLASS_NAME } from "../constants";

export const createPreview = (editor: InstanceType<typeof HtmlEditor>) => {
  const preview = document.createElement("div");
  preview.classList.add(PREVIEW_CSS_CLASS_NAME);

  preview.addEventListener("dragstart", function (event) {
    event.dataTransfer?.setData(
      "text/plain",
      (event.target as HTMLElement).dataset.index ?? ""
    );

    preview.dataset.action = "sort";
    preview.classList.add(preview.dataset.action);
  });

  preview.addEventListener("dragover", function (event) {
    event.preventDefault();

    if (preview.dataset.action === "add" && event.dataTransfer) {
      event.dataTransfer.dropEffect = "copy";

      return;
    }

    if (preview.dataset.action === "sort" && event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";

      return;
    }
  });

  preview.addEventListener("dragend", function () {
    preview.classList.remove(preview.dataset.action ?? "");

    delete preview.dataset.action;
  });

  preview.addEventListener("drop", function (event) {
    event.preventDefault();

    if (preview.dataset.action === "add" && event.dataTransfer) {
      editor.addComponent({ type: event.dataTransfer.getData("text/plain") });

      return;
    }
  });

  return preview;
};

export default createPreview;
