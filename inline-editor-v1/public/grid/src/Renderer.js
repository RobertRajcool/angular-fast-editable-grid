export class Renderer {
  constructor(inner, columns, data, viewport) {
    this.columns = columns;
    this.data = data;
    this.viewport = viewport;

    this.spacer = document.createElement('div');
    this.spacer.className = 'grid-spacer';

    this.body = document.createElement('div');
    this.body.className = 'grid-body';

    this.spacer.appendChild(this.body);
    inner.appendChild(this.spacer);
  }

  render() {
    const [rs, re] = this.viewport.rows();
    const [cs, ce] = this.viewport.cols();

    this.spacer.style.height =
      this.data.length * this.viewport.rowHeight + 'px';
    this.spacer.style.width =
      this.viewport.colOffsets.at(-1) + 'px';

    this.body.innerHTML = '';

    for (let r = rs; r < re && r < this.data.length; r++) {
      for (let c = cs; c <= ce; c++) {
        const col = this.columns[c];
        if (!col) continue;

        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = this.data[r][col.field];

        cell.style.left = this.viewport.colOffsets[c] + 'px';
        cell.style.top = r * this.viewport.rowHeight + 'px';
        cell.style.width = (col.width || 120) + 'px';
        cell.style.height = this.viewport.rowHeight + 'px';

        this.body.appendChild(cell);
      }
    }
  }
}
