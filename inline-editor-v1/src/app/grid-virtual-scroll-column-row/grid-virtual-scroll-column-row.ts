import { GridColumn } from './grid.types';
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  signal,
  computed
} from '@angular/core';
@Component({
  selector: 'app-grid-virtual-scroll-column-row',
  imports: [],
  templateUrl: './grid-virtual-scroll-column-row.html',
  styleUrl: './grid-virtual-scroll-column-row.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridVirtualScrollColumnRow {
  @Input() rows: any[] = [];
  @Input() columns: GridColumn[] = [];

  rowHeight = 36;
  viewportWidth = 1000;
  scrollLeft = signal(0);

  visibleCols = computed(() => {
    let start = 0;
    let offset = 0;

    while (offset < this.scrollLeft() && start < this.columns.length) {
      offset += this.columns[start].width;
      start++;
    }

    let width = 0;
    let end = start;
    while (width < this.viewportWidth && end < this.columns.length) {
      width += this.columns[end].width;
      end++;
    }

    return this.columns.slice(start, end).map((c, i) => ({
      ...c,
      left: this.columns
        .slice(0, start + i)
        .reduce((a, b) => a + b.width, 0)
    }));
  });

  onScroll(e: Event) {
    this.scrollLeft.set((e.target as HTMLElement).scrollLeft);
  }

  update(r: number, col: GridColumn, value: any) {
    const error = col.validator?.(value, this.rows[r]);
    if (error) return;

    this.rows = this.rows.map((row, i) =>
      i === r ? { ...row, [col.field]: value } : row
    );
  }
}
