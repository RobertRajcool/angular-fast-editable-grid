import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Grid } from '../../../public/data-grid/core/Grid';
import { ColumnDef } from '../../../public/data-grid/types';

@Component({
  selector: 'app-handson-grid',
  imports: [],
  templateUrl: './handson-grid.html',
  styleUrl: './handson-grid.css', changeDetection: ChangeDetectionStrategy.OnPush
})
export class HandsonGrid implements AfterViewInit {
  @ViewChild('host', { static: true }) host!: ElementRef;

  columns: ColumnDef[] = [];
  rows: any[] = [];

  ngAfterViewInit() {
    this.buildColumns();
    this.buildRows();

    new Grid(
      this.host.nativeElement,
      this.columns,
      this.rows
    );
  }

  private buildColumns() {
    // ID column (frozen + readonly)
    this.columns.push({
      key: 'col0',
      title: 'ID',
      width: 150,
      frozen: true,
      type: 'readonly' as const
    });

    // 29 dynamic columns
    for (let i = 1; i < 30; i++) {
      this.columns.push({
        key: `col${i}`,
        title: `Column ${i}`,
        width: 300,
        type:
          i % 6 === 0 ? 'dropdown' as const :
            i % 5 === 0 ? 'date' as const :
              i % 4 === 0 ? 'radio' as const :
                i % 3 === 0 ? 'number' as const :
                  'text' as const,
        source:
          i % 6 === 0 || i % 4 === 0
            ? ['A', 'B', 'C']
            : undefined
      });
    }
  }

  private buildRows() {
    for (let r = 0; r < 500; r++) {
      const row: any = {};
      for (let c = 0; c < 30; c++) {
        if (c === 0) {
          row[`col${c}`] = r + 1;
        } else if (c % 6 === 0 || c % 4 === 0) {
          row[`col${c}`] = 'A';
        } else if (c % 5 === 0) {
          row[`col${c}`] = '2024-01-01';
        } else if (c % 3 === 0) {
          row[`col${c}`] = Math.floor(Math.random() * 1000);
        } else {
          row[`col${c}`] = `R${r}C${c}`;
        }
      }
      this.rows.push(row);
    }
  }
}