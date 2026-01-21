import { ColumnDef } from './column.model';

export class DataEngine {
  data: any[];
  errors = new Map<string, string>();

  constructor(rows: any[], private cols: ColumnDef[]) {
    this.data = rows;
    this.validateAll();
  }

  get(r: number, field: string) {
    return this.data[r][field];
  }

  set(r: number, field: string, value: any) {
    this.data[r][field] = value;
    this.validateRow(r);
  }

  validateRow(r: number) {
    const row = this.data[r];
    this.cols.forEach((col, c) => {
      const key = `${r}:${c}`;
      const err = col.validator?.(row[col.field], row);
      if (err) this.errors.set(key, err);
      else this.errors.delete(key);
    });
  }

  validateAll() {
    for (let r = 0; r < this.data.length; r++) {
      this.validateRow(r);
    }
  }

  getError(r: number, c: number) {
    return this.errors.get(`${r}:${c}`);
  }
}
