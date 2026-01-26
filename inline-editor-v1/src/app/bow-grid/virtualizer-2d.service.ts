import { Injectable } from '@angular/core';

export interface GridColumn {
    key: string;
    label: string;
    width: number;
    editor?: 'text' | 'radio' | 'select' | 'date';
    options?: string[];
}

@Injectable({ providedIn: 'root' })
export class Virtualizer2DService {
    colBuffer = 3;

    getVisibleColumns(columns: GridColumn[], scrollLeft: number, viewportWidth: number): GridColumn[] {
        let accWidth = 0;
        let startIndex = 0;

        for (let i = 0; i < columns.length; i++) {
            if (accWidth + columns[i].width > scrollLeft) {
                startIndex = Math.max(0, i - this.colBuffer);
                break;
            }
            accWidth += columns[i].width;
        }

        let visibleWidth = 0;
        let endIndex = startIndex;
        while (endIndex < columns.length && visibleWidth < viewportWidth) {
            visibleWidth += columns[endIndex].width;
            endIndex++;
        }

        // Add 1 extra buffer column to prevent empty space
        return columns.slice(startIndex, Math.min(endIndex + this.colBuffer + 1, columns.length));
    }
}
