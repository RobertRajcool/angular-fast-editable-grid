export class Viewport {
  constructor(container, columns, rowHeight) {
    this.container = container;
    this.columns = columns;
    this.rowHeight = rowHeight;

    this.colOffsets = [0];
    columns.forEach(c =>
      this.colOffsets.push(this.colOffsets.at(-1) + (c.width || 120))
    );
  }

  rows() {
    const start = Math.floor(this.container.scrollTop / this.rowHeight);
    const count = Math.ceil(this.container.clientHeight / this.rowHeight);
    return [start, start + count + 1];
  }

  cols() {
    const { scrollLeft, clientWidth } = this.container;
    let start = 0;

    while (this.colOffsets[start + 1] < scrollLeft) start++;
    let end = start;

    while (this.colOffsets[end] < scrollLeft + clientWidth) end++;

    return [
      start,
      Math.min(end + 1, this.columns.length - 1)
    ];
  }
}
