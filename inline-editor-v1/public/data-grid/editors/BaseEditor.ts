export abstract class BaseEditor {
    protected el!: HTMLElement;
    protected opened = false;

    constructor(
        protected host: HTMLElement,
        protected commit: (value: any) => void,
        protected cancel: () => void
    ) { }

    abstract open(rect: DOMRect, value: any, col: any): void;

    close() {
        if (!this.opened) return;
        this.el.remove();
        this.opened = false;
    }

    protected position(rect: DOMRect) {
        this.el.style.position = 'fixed';
        this.el.style.left = `${rect.left}px`;
        this.el.style.top = `${rect.top}px`;
        this.el.style.width = `${rect.width}px`;
        this.el.style.height = `${rect.height}px`;
        this.el.style.zIndex = '9999';
    }

    protected bindKeys(input: HTMLElement, getValue: () => any) {
        input.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.commit(getValue());
            }
            if (e.key === 'Escape') {
                e.preventDefault();
                this.cancel();
            }
        });
    }
}
