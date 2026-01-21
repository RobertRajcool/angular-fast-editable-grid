import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ColumnDef } from './grid.types';
import { DataEngine } from './data-engine';

@Component({
  selector: 'app-canvas-grid',
  imports: [],
  templateUrl: './canvas-grid.html',
  styleUrl: './canvas-grid.scss',
})
export class CanvasGrid implements AfterViewInit {

  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('editor') editor!: ElementRef<HTMLDivElement>;

  rowHeight = 28;
  headerHeight = 32;

  viewport = { w: 0, h: 0 };
  scrollTop = 0;
  scrollLeft = 0;

  active: { r: number; c: number } | null = null;

  columns: ColumnDef[] = [];
  rows: any[] = [];
  data!: DataEngine;

  ngOnInit() {
    // Example: 200 columns
    this.columns = Array.from({ length: 200 }, (_, i) => ({
      field: 'col' + i,
      width: 120,
      editor: 'text',
      validator: v => v ? null : 'Required'
    }));

    // Example: 500 rows
    this.rows = Array.from({ length: 500 }, (_, r) => {
      const row: any = {};
      this.columns.forEach(c => row[c.field] = `R${r}-${c.field}`);
      return row;
    });

    this.data = new DataEngine(this.rows, this.columns);
  }

  ngAfterViewInit() {
    this.setViewport();
    window.addEventListener('resize', () => {
      this.setViewport();
      this.draw();
    });
    const ctx = this.canvas.nativeElement.getContext('2d')!;
    this.draw();
  }

  setViewport() {
    const container = this.canvas.nativeElement.parentElement!;
    this.viewport.w = container.clientWidth;
    this.viewport.h = container.clientHeight;
    this.canvas.nativeElement.width = this.viewport.w;
    this.canvas.nativeElement.height = this.viewport.h;
  }

  onScroll(e: Event) {
    const el = e.target as HTMLElement;
    this.scrollTop = el.scrollTop;
    this.scrollLeft = el.scrollLeft;
    requestAnimationFrame(() => this.draw());
  }

  draw() {
    const ctx = this.canvas.nativeElement.getContext('2d')!;
    ctx.clearRect(0, 0, this.viewport.w, this.viewport.h);
    ctx.font = '13px Arial';

    const startRow = Math.floor(this.scrollTop / this.rowHeight);
    const visibleRows = Math.ceil(this.viewport.h / this.rowHeight);

    // Column virtualization
    let startCol = 0, accWidth = 0;
    while (accWidth < this.scrollLeft && startCol < this.columns.length) {
      accWidth += this.columns[startCol].width;
      startCol++;
    }

    let x = accWidth - this.scrollLeft;
    let cIndex = startCol;

    while (cIndex < this.columns.length && x < this.viewport.w) {
      const col = this.columns[cIndex];

      // Header
      ctx.fillStyle = '#f3f3f3';
      ctx.fillRect(x, 0, col.width, this.headerHeight);
      ctx.fillStyle = '#000';
      ctx.fillText(col.field, x + 6, 20);

      // Rows
      for (let i = 0; i < visibleRows; i++) {
        const r = startRow + i;
        if (!this.data.data[r]) continue;

        const y = this.headerHeight + i * this.rowHeight;
        const val = this.data.get(r, col.field);
        const err = this.data.getError(r, cIndex);

        if (err) {
          ctx.fillStyle = '#fdecea';
          ctx.fillRect(x, y, col.width, this.rowHeight);
        }

        ctx.strokeStyle = '#ddd';
        ctx.strokeRect(x, y, col.width, this.rowHeight);

        ctx.fillStyle = '#000';
        ctx.fillText(val ?? '', x + 6, y + 18);
      }

      x += col.width;
      cIndex++;
    }
  }

  onClick(e: MouseEvent) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = e.clientX - rect.left + this.scrollLeft;
    const y = e.clientY - rect.top + this.scrollTop;

    let colX = 0, cIndex = 0;
    for (let i = 0; i < this.columns.length; i++) {
      colX += this.columns[i].width;
      if (x < colX) { cIndex = i; break; }
    }

    const rIndex = Math.floor((y - this.headerHeight) / this.rowHeight);
    this.active = { r: rIndex, c: cIndex };
    this.openEditor();
  }

  openEditor() {
    if (!this.active) return;
    const col = this.columns[this.active.c];
    const field = col.field;
    const val = this.data.get(this.active.r, field);

    const ed = this.editor.nativeElement;
    ed.innerHTML = '';
    let input: HTMLElement;

    if (col.editor === 'text') {
      const i = document.createElement('input');
      i.value = val; input = i;
    } else if (col.editor === 'date') {
      const i = document.createElement('input');
      i.type = 'date'; i.value = val; input = i;
    } else if (col.editor === 'select') {
      const s = document.createElement('select');
      col.options!.forEach(o => { const opt = document.createElement('option'); opt.value = o; opt.text = o; s.appendChild(opt); });
      s.value = val; input = s;
    } else {
      const d = document.createElement('div');
      col.options!.forEach(o => {
        const r = document.createElement('input'); r.type = 'radio'; r.name = 'r'; r.value = o;
        if (o === val) r.checked = true;
        d.appendChild(r); d.append(o);
      });
      input = d;
    }

    input.onblur = () => this.commit(input, col);
    ed.appendChild(input);

    ed.style.display = 'block';
    ed.style.left = `${this.getX(this.active.c) - this.scrollLeft}px`;
    ed.style.top = `${this.headerHeight + this.active.r * this.rowHeight - this.scrollTop}px`;
  }

  commit(input: HTMLElement, col: ColumnDef) {
    let value = '';
    if (input instanceof HTMLInputElement || input instanceof HTMLSelectElement) value = input.value;

    this.data.set(this.active!.r, col.field, value);
    this.editor.nativeElement.style.display = 'none';
    this.draw();
  }

  getX(c: number) {
    return this.columns.slice(0, c).reduce((s, c) => s + c.width, 0);
  }
}