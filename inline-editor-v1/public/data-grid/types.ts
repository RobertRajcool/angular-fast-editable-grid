export type CellType =
    | 'text'
    | 'number'
    | 'readonly'
    | 'dropdown'
    | 'radio'
    | 'date';

export interface ColumnDef {
    key: string;
    title: string;
    width: number;
    frozen?: boolean;
    type?: CellType;
    source?: string[];
    readOnly?: boolean;
}

export type RowData = Record<string, any>;
export interface CellContext {
    row: number;
    col: number;
    key: string;
    value: any;
    rowData: any;
}

export type CellRenderer =
    | ((value: any, ctx: CellContext) => string)
    | ((value: any, ctx: CellContext) => HTMLElement);

export interface CellMeta {
    className?: string;
    renderer?: CellRenderer;
    readOnly?: boolean;
}