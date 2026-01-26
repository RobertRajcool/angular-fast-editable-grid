import { CommonModule } from '@angular/common';
import {
  Component, ChangeDetectionStrategy,
  ViewChild, AfterViewInit,
  ElementRef
} from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DynamicCell } from './dynamic-cell/dynamic-cell';
import { GridColumn, Virtualizer2DService } from './virtualizer-2d.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-bow-grid',
  imports: [CommonModule, ScrollingModule, DynamicCell, FormsModule, ReactiveFormsModule],
  templateUrl: './bow-grid.html',
  styleUrl: './bow-grid.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BowGrid implements AfterViewInit {
  @ViewChild('hScroll', { static: true }) hScroll!: ElementRef<HTMLDivElement>;

  readonly ROW_CAP = 500;
  scrollLeft = 0;
  scrollTimeout: any;
  translateX = 0; // For smooth transform translation

  columns: GridColumn[] = [
    { key: 'col0', label: 'Text', width: 140, editor: 'text' },
    { key: 'col1', label: 'Radio', width: 140, editor: 'radio', options: ['Yes', 'No'] },
    { key: 'col2', label: 'Select', width: 140, editor: 'select', options: ['Option A', 'Option B', 'Option C'] },
    { key: 'col3', label: 'Date', width: 140, editor: 'date' },
    ...Array.from({ length: 21 }).map((_, i) => ({
      key: `col${i + 4}`,
      label: `Column ${i + 4}`,
      width: 140,
      editor: 'text' as const
    }))
  ];

  rows: any = Array.from({ length: this.ROW_CAP }).map((_, i) => ({
    id: i,
    col0: `Text ${i}`,
    col1: i % 2 === 0 ? 'Yes' : 'No',
    col2: 'Option A',
    col3: new Date().toISOString().substring(0, 10),
    ...Object.fromEntries(Array.from({ length: 21 }).map((_, j) => [`col${j + 4}`, `R${i}C${j + 4}`]))
  }));

  visibleCols: GridColumn[] = [];
  totalWidth = this.columns.reduce((a, c) => a + c.width, 0);
  offsetColIndex = 0; // Index of first column before buffer

  constructor(private v2d: Virtualizer2DService) { }

  ngAfterViewInit() {
    this.updateVisibleCols(0);
    window.addEventListener('resize', () => {
      this.updateVisibleCols(this.scrollLeft);
    });
  }

  onHorizontalScroll() {
    const el = this.hScroll.nativeElement;
    this.scrollLeft = el.scrollLeft;

    if (this.scrollTimeout) cancelAnimationFrame(this.scrollTimeout);

    this.scrollTimeout = requestAnimationFrame(() => {
      this.updateVisibleCols(this.scrollLeft);
    });
  }

  updateVisibleCols(scrollLeft: number) {
    const viewportWidth = this.hScroll.nativeElement.clientWidth;

    // Find starting column index
    let accWidth = 0;
    let startColIndex = 0;

    for (let i = 0; i < this.columns.length; i++) {
      if (accWidth + this.columns[i].width > scrollLeft) {
        startColIndex = Math.max(0, i - this.v2d.colBuffer);
        break;
      }
      accWidth += this.columns[i].width;
    }

    // Calculate offset width before visible columns (including buffer)
    const offsetWidth = this.columns
      .slice(0, startColIndex)
      .reduce((sum, col) => sum + col.width, 0);

    // translateX should be: actual scroll position - offset of first visible column
    this.translateX = scrollLeft - offsetWidth;
    this.offsetColIndex = startColIndex;

    this.visibleCols = this.v2d.getVisibleColumns(this.columns, scrollLeft, viewportWidth);
  }

  trackRow = (_: number, row: any) => row.id;
  trackCol = (_: number, col: GridColumn) => col.key;
}