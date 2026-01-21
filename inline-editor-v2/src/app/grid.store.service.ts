import { Injectable, signal } from '@angular/core';

export interface GridRow { id: number;[key: string]: any; }

@Injectable({ providedIn: 'root' })
export class GridStore {
    // Initialize 100 rows with 25 columns
    data = signal<GridRow[]>(Array.from({ length: 100 }, (_, i) => ({
        id: i,
        ...Object.fromEntries(Array.from({ length: 25 }, (_, j) => [`col${j}`, `Val ${i}-${j}`]))
    })));

    updateCell(rowId: number, field: string, value: any) {
        this.data.update(rows => rows.map(r => r.id === rowId ? { ...r, [field]: value } : r));
    }
}
