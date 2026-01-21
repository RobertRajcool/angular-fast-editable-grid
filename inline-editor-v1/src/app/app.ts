import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridColumn } from './fast-grid/fast-grid';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('inline-editor-v1');
  columns: GridColumn[] = Array.from({ length: 25 }).map((_, i) => ({
    field: 'col' + i,
    header: 'Col ' + (i + 1),
    width: 140,
    type: i % 4 === 0 ? 'text' :
      i % 4 === 1 ? 'textarea' :
        i % 4 === 2 ? 'select' : 'date',
    options: i % 4 === 2
      ? [
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
        { label: 'C', value: 'C' }
      ]
      : undefined
  }));

  rows = Array.from({ length: 500 }).map((_, r) => {
    const row: any = { id: r };
    for (let c = 0; c < 25; c++) {
      row['col' + c] = `R${r}C${c}`;
    }
    return row;
  });
}
