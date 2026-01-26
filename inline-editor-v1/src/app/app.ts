import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BowGrid } from './bow-grid/bow-grid';
import { GridColumn } from './bow-grid/grid-types';
import { COLUMNS, ROWS } from './bow-grid/mock-data';
import { FastGrid } from './fast-grid/fast-grid';
import { HandsonGrid } from './handson-grid/handson-grid';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FastGrid, HandsonGrid],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  rows = signal<any[]>([]);
  //columns = signal<GridColumn[]>([]);
  rendering = signal(false);
  progress = signal(0);
  data = Array.from({ length: 500 }).map((_, r) => ({
    id: r + 1,
    name: `User ${r + 1}`,
    email: `user${r + 1}@example.com`,
    age: 20 + (r % 30),
    status: ['Active', 'Inactive', 'Pending'][r % 3],
    gender: r % 2 === 0 ? 'Male' : 'Female',
    dob: `199${r % 10}-0${(r % 9) + 1}-15`,
    ...Object.fromEntries(
      Array.from({ length: 18 }).map((_, i) => [
        `extra${i}`,
        i % 3 === 0
          ? `Text ${r}-${i}`
          : i % 3 === 1
            ? ['A', 'B', 'C'][r % 3]
            : `2023-0${(i % 9) + 1}-01`
      ])
    )
  }));
  columns = [
    { field: 'id', header: 'ID', width: 80, editor: 'text' },
    { field: 'name', header: 'Name', width: 160, editor: 'text' },
    { field: 'email', header: 'Email', width: 220, editor: 'text' },
    { field: 'age', header: 'Age', width: 80, editor: 'text' },

    {
      field: 'status',
      header: 'Status',
      width: 120,
      editor: 'dropdown',
      options: ['Active', 'Inactive', 'Pending']
    },

    {
      field: 'gender',
      header: 'Gender',
      width: 140,
      editor: 'radio',
      options: ['Male', 'Female']
    },

    {
      field: 'dob',
      header: 'DOB',
      width: 140,
      editor: 'date'
    },

    ...Array.from({ length: 18 }).map((_, i) => ({
      field: `extra${i}`,
      header: `Extra ${i + 7}`,
      width: 120,
      editor: i % 3 === 0
        ? 'text'
        : i % 3 === 1
          ? 'dropdown'
          : 'date',
      options: ['A', 'B', 'C']
    }))
  ];
  rcolumns: any[] = [
    { key: 'id', title: 'ID', width: 80, frozen: true },
    { key: 'name', title: 'Name', width: 200 },
    { key: 'price', title: 'Price', width: 120 }
  ];

  rrdata = Array.from({ length: 10000 }, (_, r) => [
    r + 1,
    `Product ${r + 1}`,
    (Math.random() * 1000).toFixed(2)
  ]);
  ngOnInit() {
    // this.loadGrid();
  }
  private createData() {
    return Array.from({ length: 10000 }, (_, r) =>
      [r, `User ${r}`, Math.floor(Math.random() * 80)]
    );
  }

  /* async loadGrid() {
    this.rendering.set(true);
    this.progress.set(0);

    const total = ROWS.length * COLUMNS.length;
    let done = 0;

    this.columns.set(COLUMNS);
    this.rows.set([]);

    for (const row of ROWS) {
      this.rows.update(r => [...r, row]);
      done += COLUMNS.length;
      this.progress.set(Math.floor((done / total) * 100));
      await new Promise(r => requestAnimationFrame(r));
    }

    this.rendering.set(false);
  } */
}
