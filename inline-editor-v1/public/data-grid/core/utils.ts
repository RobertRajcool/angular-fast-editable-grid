import { ColumnDef } from '../types';

export function splitColumns(cols: ColumnDef[]) {
  return {
    frozen: cols.filter(c => c.frozen),
    scrollable: cols.filter(c => !c.frozen)
  };
}
