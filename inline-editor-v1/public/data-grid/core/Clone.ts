import { Store } from './Store';
import { ColumnDef } from '../types';

export type CloneType =
    | 'master'
    | 'left'
    | 'top'
    | 'top-left';

export class Clone {
    root = document.createElement('div');
    holder = document.createElement('div');
    spreader = document.createElement('div');
    table = document.createElement('table');
    colgroup = document.createElement('colgroup');
    thead = document.createElement('thead');
    tbody = document.createElement('tbody');

    constructor(
        public type: CloneType,
        private store: Store,
        public columns: ColumnDef[],
        private rowHeight: number
    ) {
        this.root.className = `grid-clone grid-${type}`;
        this.holder.className = 'grid-holder';
        this.spreader.className = 'grid-spreader';
        this.table.className = 'grid-table';

        this.columns.forEach(() =>
            this.colgroup.appendChild(document.createElement('col'))
        );

        this.table.append(
            this.colgroup,
            this.thead,
            this.tbody
        );
        this.spreader.appendChild(this.table);
        this.holder.appendChild(this.spreader);
        this.root.appendChild(this.holder);

        this.buildHeader();
    }

    setSize(rows: number) {
        this.spreader.style.height =
            `${rows * this.rowHeight}px`;
    }

    buildHeader() {
        if (this.type === 'left') return;

        const tr = document.createElement('tr');

        this.columns.forEach(col => {
            const th = document.createElement('th');
            th.textContent = col.title;

            const handle = document.createElement('div');
            handle.className = 'col-resize-handle';
            th.appendChild(handle);

            tr.appendChild(th);
        });

        this.thead.innerHTML = '';
        this.thead.appendChild(tr);
    }

    renderRows(start: number, end: number) {
        this.tbody.innerHTML = '';

        for (let r = start; r < end; r++) {
            const tr = document.createElement('tr');
            tr.style.height = `${this.rowHeight}px`;

            this.columns.forEach((_, c) => {
                const td = document.createElement('td');
                td.textContent =
                    String(this.store.getCell(r, c) ?? '');
                tr.appendChild(td);
            });

            this.tbody.appendChild(tr);
        }

        this.table.style.transform =
            `translateY(${start * this.rowHeight}px)`;
    }
}
