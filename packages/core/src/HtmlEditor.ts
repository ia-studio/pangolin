import createMenu from "./helpers/createMenu";
import createPreview from "./helpers/createPreview";

export * from "./constants";

type FieldValue = string;

type RenderProps = {
  [key: string]: FieldValue;
};

export type Tool<T extends RenderProps = RenderProps> = {
  type: string;
  defaultValues?: T;
  render: (props: T) => string;
};

export type Component = {
  type: string;
  props: { id: string } & Record<string, FieldValue>;
};

type Entity<T> = {
  ids: string[];
  entities: Record<string, T>;
};

export class HtmlEditor {
  tools: Tool[] = [];
  toolEntity: Entity<Tool> = {
    ids: [],
    entities: {},
  };

  components: Component[] = [];

  constructor({
    components,
    tools,
  }: {
    components: Component[];
    tools: Tool[];
  }) {
    this.components = components;
    this.tools = tools;

    this.toolEntity = tools.reduce<Entity<Tool>>(
      (acc, tool) => {
        acc.ids.push(tool.type);
        acc.entities[tool.type] = tool;

        return acc;
      },
      { ids: [], entities: {} }
    );
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
        ...this.getTool(type).defaultValues,
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

  getTool(componentType: string) {
    return this.toolEntity.entities[componentType];
  }

  getComponents() {
    return this.components;
  }
}

export default HtmlEditor;
