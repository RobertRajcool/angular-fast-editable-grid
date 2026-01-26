export class Viewport {
    constructor(
        private rowHeight: number,
        private viewportHeight: number
    ) { }

    getRange(scrollTop: number, totalRows: number) {
        const start = Math.floor(scrollTop / this.rowHeight);
        const visible = Math.ceil(this.viewportHeight / this.rowHeight) + 2;

        return {
            start,
            end: Math.min(totalRows, start + visible)
        };
    }
}
