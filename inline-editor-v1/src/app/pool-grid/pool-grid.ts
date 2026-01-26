import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { GridColumn } from './grid.types';

@Component({
  selector: 'app-pool-grid',
  imports: [],
  templateUrl: './pool-grid.html',
  styleUrl: './pool-grid.scss',
})
export class PoolGrid implements AfterViewInit {
  @Input() rows: any[] = [];
  @Input() columns: GridColumn[] = [];

  @ViewChild('viewport') viewport!: ElementRef<HTMLDivElement>;

  rowHeight = 36;
  viewportHeight = 600;
  viewportWidth = 1000;

  poolRowCount = 25;   // visible + buffer
  poolColCount = 8;    // visible + buffer

  startRow = 0;
  startCol = 0;

  rowPool: number[] = [];
  colPool: number[] = [];

  ngAfterViewInit() {
    this.poolRowCount = Math.ceil(this.viewportHeight / this.rowHeight) + 4;
    this.rowPool = Array.from({ length: this.poolRowCount }, (_, i) => i);
    this.colPool = Array.from({ length: this.poolColCount }, (_, i) => i);
  }

  onScroll() {
    const el = this.viewport.nativeElement;
    this.startRow = Math.floor(el.scrollTop / this.rowHeight);
    this.startCol = this.getStartCol(el.scrollLeft);
  }

  getStartCol(scrollLeft: number) {
    let x = 0;
    for (let i = 0; i < this.columns.length; i++) {
      x += this.columns[i].width;
      if (x > scrollLeft) return i;
    }
    return 0;
  }

  colLeft(colIndex: number) {
    return this.columns.slice(0, colIndex).reduce((a, b) => a + b.width, 0);
  }

  update(r: number, c: GridColumn, value: any) {
    this.rows[r] = { ...this.rows[r], [c.field]: value };
  }
}