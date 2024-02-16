import HtmlEditor from "../HtmlEditor";
import { ADD_BUTTON_CSS_CLASS_NAME } from "../constants";

export const createMenu = (
  editor: InstanceType<typeof HtmlEditor>,
  preview: HTMLElement
) => {
  const list = document.createElement("ul");

  editor.getTools().forEach((item) => {
    const listItem = document.createElement("li");

    const tool = document.createElement("span");

    tool.dataset.type = item.type;
    tool.setAttribute("draggable", "true");

    const toolText = document.createTextNode(`${item.type.toUpperCase()} `);
    tool.appendChild(toolText);

    const addButton = document.createElement("button");
    addButton.classList.add(ADD_BUTTON_CSS_CLASS_NAME);

    addButton.addEventListener("click", function () {
      editor.addComponent({ type: item.type });
    });

    const addButtonText = document.createTextNode("+");
    addButton.appendChild(addButtonText);

    listItem.appendChild(tool);
    listItem.appendChild(addButton);

    list.appendChild(listItem);
  });

  list.addEventListener("dragstart", (event) => {
    if (!event.dataTransfer) {
      return;
    }

    event.dataTransfer.setData(
      "text/plain",
      (event.target as HTMLElement).dataset.type ?? ""
    );

    preview.dataset.action = "add";
    preview.classList.add(preview.dataset.action);
  });

  list.addEventListener("dragend", () => {
    preview.classList.remove(preview.dataset.action ?? "");
    delete preview.dataset.action;
  });

  return list;
};

export default createMenu;
