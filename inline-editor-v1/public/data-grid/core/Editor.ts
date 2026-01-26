import { Store } from './Store';

export class Editor {
    input = document.createElement('input');
    private r = 0;
    private c = 0;

    constructor(
        root: HTMLElement,
        private store: Store,
        private onCommit: () => void
    ) {
        this.input.className = 'grid-editor';
        this.input.style.display = 'none';
        root.appendChild(this.input);

        this.input.onkeydown = e => {
            if (e.key === 'Enter') this.commit();
            if (e.key === 'Escape') this.hide();
        };
    }

    open(cell: HTMLElement, r: number, c: number) {
        const rect = cell.getBoundingClientRect();
        const base = cell.offsetParent!.getBoundingClientRect();

        Object.assign(this.input.style, {
            display: 'block',
            top: `${rect.top - base.top}px`,
            left: `${rect.left - base.left}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`
        });

        this.r = r;
        this.c = c;
        this.input.value =
            String(this.store.getCell(r, c) ?? '');
        this.input.focus();
    }

    commit() {
        this.store.setCell(this.r, this.c, this.input.value);
        this.hide();
        this.onCommit();
    }

    hide() {
        this.input.style.display = 'none';
    }
}
