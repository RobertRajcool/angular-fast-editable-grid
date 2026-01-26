export class HeaderRenderer {
  constructor(inner, columns, viewport) {
    this.columns = columns;
    this.viewport = viewport;

    this.el = document.createElement('div');
    this.el.className = 'grid-header';

    inner.appendChild(this.el);
  }

  render() {
    const [cs, ce] = this.viewport.cols();
    this.el.innerHTML = '';

    for (let c = cs; c <= ce; c++) {
      const col = this.columns[c];
      if (!col) continue;

      const cell = document.createElement('div');
      cell.className = 'header-cell';
      cell.textContent = col.header ?? col.field;

      cell.style.left = this.viewport.colOffsets[c] + 'px';
      cell.style.width = (col.width || 120) + 'px';

      this.el.appendChild(cell);
    }
  }
}
