import createMenu from "./helpers/createMenu";
import createPreview from "./helpers/createPreview";

export type Tool = { type: string };

export type Component = { type: string; props: { id: string; text: string } };

export class HtmlEditor {
  tools: Tool[] = [];
  components: Component[] = [];

  constructor({
    tools,
    components,
  }: {
    tools: Tool[];
    components: Component[];
  }) {
    this.tools = tools;
    this.components = components;
  }

  init({ id }: { id: string }) {
    const preview = createPreview(this);
    const menu = createMenu(this, preview);

    const app = document.querySelector(`#${id}`);

    if (app) {
      app.appendChild(menu);
      app.appendChild(preview);
    }
  }

  addComponent({ type }: { type: string }) {
    this.components.push({
      type,
      props: {
        id: crypto.randomUUID(),
        text: type.toUpperCase(),
      },
    });
  }

  setComponents(components: Component[]) {
    this.components = components;
  }

  sortComponent({
    fromIndex,
    toIndex,
  }: {
    fromIndex: number;
    toIndex: number;
  }) {
    const targetItem = this.components.splice(fromIndex, 1)[0];
    this.components.splice(toIndex, 0, targetItem);
  }

  getTools() {
    return this.tools;
  }

  getComponents() {
    return this.components;
  }
}

export default HtmlEditor;
