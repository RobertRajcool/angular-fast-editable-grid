export interface ColumnDef {
  field: string;
  width: number;
  editor: 'text' | 'select' | 'date' | 'radio';
  options?: string[];
  validator?: (value: any, row: any) => string | null;
}
