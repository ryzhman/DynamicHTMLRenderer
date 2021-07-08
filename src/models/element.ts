export enum FieldType {
  SELECT = 'SELECT',
  TEXT_INPUT = 'TEXT_INPUT'
}

export interface Element {
  renderedHtml: any;
  vertical: number;
  horizontal: number;
  elementType: FieldType;
  options: string;
  label: string
}
