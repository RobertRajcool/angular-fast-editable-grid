// public/data-grid/core/Renderer.ts
import { ColumnDef } from '../types';

export class Renderer {
  private containerDiv!: HTMLDivElement;
  private frozenHeaderDiv!: HTMLDivElement;
  private scrollableHeaderDiv!: HTMLDivElement;
  private frozenBodyDiv!: HTMLDivElement;
  private scrollableBodyDiv!: HTMLDivElement;

  private frozenHeaderTable!: HTMLTableElement;
  private scrollableHeaderTable!: HTMLTableElement;
  private frozenBodyTable!: HTMLTableElement;
  private scrollableBodyTable!: HTMLTableElement;

  private frozenColumns: ColumnDef[] = [];
  private scrollableColumns: ColumnDef[] = [];

  constructor(
    private container: HTMLElement,
    private columns: ColumnDef[],
    private rows: any[]
  ) {
    this.splitColumns();
  }

  // =========================
  // SPLIT COLUMNS
  // =========================
  private splitColumns() {
    this.frozenColumns = this.columns.filter(col => col.frozen === true);
    this.scrollableColumns = this.columns.filter(col => col.frozen !== true);
  }

  render() {
    this.container.innerHTML = `
      <div class="ht-root">
        <div class="ht-header-wrapper">
          <div class="ht-frozen-header">
            <table class="ht-table"></table>
          </div>
          <div class="ht-scrollable-header">
            <table class="ht-table"></table>
          </div>
        </div>
        <div class="ht-body-wrapper">
          <div class="ht-frozen-body">
            <table class="ht-table"></table>
          </div>
          <div class="ht-scrollable-body">
            <table class="ht-table"></table>
          </div>
        </div>
      </div>
    `;

    this.containerDiv = this.container.querySelector('.ht-root')!;
    this.frozenHeaderDiv = this.container.querySelector('.ht-frozen-header')!;
    this.scrollableHeaderDiv = this.container.querySelector('.ht-scrollable-header')!;
    this.frozenBodyDiv = this.container.querySelector('.ht-frozen-body')!;
    this.scrollableBodyDiv = this.container.querySelector('.ht-scrollable-body')!;

    this.frozenHeaderTable = this.frozenHeaderDiv.querySelector('table')!;
    this.scrollableHeaderTable = this.scrollableHeaderDiv.querySelector('table')!;
    this.frozenBodyTable = this.frozenBodyDiv.querySelector('table')!;
    this.scrollableBodyTable = this.scrollableBodyDiv.querySelector('table')!;

    this.renderFrozenHeader();
    this.renderScrollableHeader();
    this.renderFrozenBody();
    this.renderScrollableBody();
    this.syncScroll();
  }

  // =========================
  // FROZEN HEADER
  // =========================
  private renderFrozenHeader() {
    if (this.frozenColumns.length === 0) return;

    this.frozenHeaderTable.innerHTML = `
      ${this.renderColGroup(this.frozenColumns)}
      <thead>
        <tr>
          ${this.frozenColumns
        .map(c => `<th class="ht-header-cell ht-frozen-cell">${c.title}</th>`)
        .join('')}
        </tr>
      </thead>
    `;
  }

  // =========================
  // SCROLLABLE HEADER
  // =========================
  private renderScrollableHeader() {
    const scrollbarWidth = this.getScrollbarWidth();

    this.scrollableHeaderTable.innerHTML = `
      ${this.renderColGroup(this.scrollableColumns)}
      <colgroup>
        <col style="width:${scrollbarWidth}px" />
      </colgroup>
      <thead>
        <tr>
          ${this.scrollableColumns
        .map(c => `<th class="ht-header-cell">${c.title}</th>`)
        .join('')}
          <th class="ht-header-spacer"></th>
        </tr>
      </thead>
    `;
  }

  // =========================
  // FROZEN BODY
  // =========================
  private renderFrozenBody() {
    if (this.frozenColumns.length === 0) return;

    this.frozenBodyTable.innerHTML = `
      ${this.renderColGroup(this.frozenColumns)}
      <tbody>
        ${this.rows
        .map(
          (row, r) => `
          <tr>
            ${this.frozenColumns
              .map(
                (c, idx) => {
                  const colIndex = this.columns.findIndex(col => col.key === c.key);
                  return `
              <td class="ht-cell ht-frozen-cell"
                  data-row="${r}"
                  data-col="${colIndex}">
                ${row[c.key]}
              </td>
            `;
                }
              )
              .join('')}
          </tr>
        `
        )
        .join('')}
      </tbody>
    `;
  }

  // =========================
  // SCROLLABLE BODY
  // =========================
  private renderScrollableBody() {
    this.scrollableBodyTable.innerHTML = `
      ${this.renderColGroup(this.scrollableColumns)}
      <tbody>
        ${this.rows
        .map(
          (row, r) => `
          <tr>
            ${this.scrollableColumns
              .map(
                (c) => {
                  const colIndex = this.columns.findIndex(col => col.key === c.key);
                  return `
              <td class="ht-cell"
                  data-row="${r}"
                  data-col="${colIndex}">
                ${row[c.key]}
              </td>
            `;
                }
              )
              .join('')}
          </tr>
        `
        )
        .join('')}
      </tbody>
    `;
  }

  // =========================
  // COL WIDTH SYNC
  // =========================
  private renderColGroup(cols: ColumnDef[]): string {
    return `
      <colgroup>
        ${cols
        .map(c => `<col style="width:${c.width}px">`)
        .join('')}
      </colgroup>
    `;
  }

  // =========================
  // SCROLL SYNC
  // =========================
  private syncScroll() {
    // Sync horizontal scroll between header and body
    this.scrollableBodyDiv.addEventListener('scroll', () => {
      this.scrollableHeaderDiv.scrollLeft = this.scrollableBodyDiv.scrollLeft;
    });

    // Sync vertical scroll between frozen and scrollable columns
    this.scrollableBodyDiv.addEventListener('scroll', () => {
      this.frozenBodyDiv.scrollTop = this.scrollableBodyDiv.scrollTop;
    });

    this.frozenBodyDiv.addEventListener('scroll', () => {
      this.scrollableBodyDiv.scrollTop = this.frozenBodyDiv.scrollTop;
    });
  }

  // =========================
  // SCROLLBAR WIDTH (CRITICAL)
  // =========================
  private getScrollbarWidth(): number {
    const div = document.createElement('div');
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.overflow = 'scroll';
    div.style.position = 'absolute';
    div.style.top = '-9999px';

    document.body.appendChild(div);
    const width = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);

    return width;
  }
}