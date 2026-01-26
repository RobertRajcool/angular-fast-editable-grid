export class Selection {
  startRow = 0;
  startCol = 0;
  endRow = 0;
  endCol = 0;

  constructor() {}

  set(row: number, col: number) {
    this.startRow = this.endRow = row;
    this.startCol = this.endCol = col;
  }

  extend(row: number, col: number) {
    this.endRow = row;
    this.endCol = col;
  }

  contains(row: number, col: number): boolean {
    return (
      row >= Math.min(this.startRow, this.endRow) &&
      row <= Math.max(this.startRow, this.endRow) &&
      col >= Math.min(this.startCol, this.endCol) &&
      col <= Math.max(this.startCol, this.endCol)
    );
  }
}
