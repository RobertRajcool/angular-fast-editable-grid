import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
export type CellType = 'text' | 'textarea' | 'select' | 'date';

export interface GridColumn {
  field: string;
  header: string;
  width?: number;
  type: CellType;
  options?: { label: string; value: any }[];
}
@Component({
  selector: 'app-fast-grid',
  imports: [ScrollingModule],
  templateUrl: './fast-grid.html',
  styleUrl: './fast-grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FastGrid {
  @Input() columns: GridColumn[] = [];
  @Input() rows: any[] = [];

  trackRow = (_: number, row: any) => row.id;
}
