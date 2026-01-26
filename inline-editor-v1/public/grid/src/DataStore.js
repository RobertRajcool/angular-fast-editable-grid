export class Store {
    constructor(data = [], columns = []) {
        this.data = data;
        this.columns = columns;
    }

    rows() {
        return this.data.length;
    }

    cols() {
        return this.columns.length;
    }

    column(index) {
        return this.columns[index];
    }

    get(rowIndex, colIndex) {
        const row = this.data[rowIndex];
        const col = this.columns[colIndex];
        return row?.[col.field];
    }

    set(rowIndex, colIndex, value) {
        const row = this.data[rowIndex];
        const col = this.columns[colIndex];
        if (row && col) row[col.field] = value;
    }
}
