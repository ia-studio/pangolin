export type FieldValues = { [name: string]: string | Record<string, string> };

export type Tool<T = any> = {
  type: string;
  defaultValues: T;
  render: (props: T) => unknown;
};

export type Component = {
  type: string;
  props: { id: string } & FieldValues;
};

export type Entity<T> = {
  ids: string[];
  entities: Record<string, T>;
};
