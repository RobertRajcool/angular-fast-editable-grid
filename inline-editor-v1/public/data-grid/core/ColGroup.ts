import { ColumnDef } from '../types';

export function createColGroup(columns: ColumnDef[]): HTMLTableColElement {
    const colgroup = document.createElement('colgroup');

    for (const col of columns) {
        const colEl = document.createElement('col');
        colEl.style.width = `${col.width}px`;
        colgroup.appendChild(colEl);
    }

    return colgroup;
}
