import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';
import { GridStore } from '../grid.store.service';

@Component({
  selector: 'app-fast-grid',
  imports: [ScrollingModule, FormsModule],
  templateUrl: './fast-grid.html',
  styleUrl: './fast-grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FastGrid {
  store = inject(GridStore);
  columnKeys = Array.from({ length: 25 }, (_, i) => `col${i}`);

  trackById(index: number, item: any) { return item.id; }

  getColumnType(col: string) {
    if (col === 'col1') return 'textarea';
    if (col === 'col2') return 'dropdown';
    if (col === 'col3') return 'date';
    return 'text';
  }

  onSelectChange(event: Event, rowId: number, col: string) {
    const val = (event.target as HTMLSelectElement).value;
    this.store.updateCell(rowId, col, val);
  }
}
