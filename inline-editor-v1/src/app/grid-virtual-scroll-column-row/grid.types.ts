export type EditorType = 'text' | 'select' | 'date' | 'radio';

export interface GridColumn {
    field: string;
    header: string;
    width: number;
    editor: EditorType;
    options?: { label: string; value: any }[];
    validator?: (value: any, row: any) => string | null;
}
