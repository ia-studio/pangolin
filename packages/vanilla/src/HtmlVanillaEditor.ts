import {
  HtmlEditor,
  type Component,
  type Tool,
  ADD_BUTTON_CSS_CLASS_NAME,
  PREVIEW_CSS_CLASS_NAME,
} from "pangolin-core";

export class HtmlVanillaEditor extends HtmlEditor {
  constructor({
    components,
    tools,
  }: {
    components: Component[];
    tools: Tool[];
  }) {
    super({ components, tools });
  }

  static create({
    id,
    components,
    tools,
  }: {
    id: string;
    components: Component[];
    tools: Tool[];
  }) {
    const editor = new HtmlVanillaEditor({ components, tools });

    editor.init({ id });

    const preview = document.querySelector(`.${PREVIEW_CSS_CLASS_NAME}`);

    if (preview) {
      preview.addEventListener("drop", (event) => {
        event.preventDefault();

        preview.innerHTML = "";
        preview.appendChild(editor.render());
      });

      const addButtons = document.querySelectorAll(
        `.${ADD_BUTTON_CSS_CLASS_NAME}`
      );

      addButtons?.forEach((button) => {
        button.addEventListener("click", () => {
          preview.innerHTML = "";
          preview.appendChild(editor.render());
        });
      });
    }

    return editor;
  }

  render() {
    const fragment = new DocumentFragment();

    this.getComponents().forEach((component, index) => {
      const tool = this.getTool(component.type);

      if (!tool) {
        return;
      }

      const element = document.createElement("div");

      element.innerHTML = tool.render(component.props);
      element.dataset.id = component.props.id;
      element.dataset.index = String(index);
      element.draggable = true;

      element.addEventListener("drop", (event) => {
        const fromIndex = parseInt(
          event.dataTransfer?.getData("text/plain") ?? "",
          10
        );

        if (Number.isNaN(fromIndex)) {
          return;
        }

        this.sortComponent({ fromIndex, toIndex: index });
      });

      fragment.appendChild(element);
    });

    return fragment;
  }
}

export default HtmlVanillaEditor;
