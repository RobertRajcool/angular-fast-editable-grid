import { CellValue } from '../types';

export class Store {
  private listeners = new Set<() => void>();

  constructor(private data: CellValue[][]) {}

  getCell(r: number, c: number) {
    return this.data[r]?.[c];
  }

  setCell(r: number, c: number, v: CellValue) {
    this.data[r][c] = v;
    this.emit();
  }

  getRowCount() {
    return this.data.length;
  }

  subscribe(fn: () => void) {
    this.listeners.add(fn);
  }

  private emit() {
    this.listeners.forEach(fn => fn());
  }
}
