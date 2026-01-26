export interface GridOptions {
    data: any[][];
    defaultColWidth
    : number;
    rowHeight: number;
    columns: any[][];
}

export class Grid {
    constructor(
        container: HTMLElement,
        options: GridOptions
    );

    container: HTMLElement;
    options: GridOptions;
    header: HTMLElement;
    body: HTMLElement;
    renderer: any;
    headerRenderer: any;
    resizeObserver: ResizeObserver;

    registerPlugin(plugin: any): void;
    destroy(): void;
    onScroll(): void;
    onResize(): void;
}

export class HighlightPlugin {
    constructor();
    init(grid: Grid): void;
}