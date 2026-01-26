export class CellEditor {
    constructor(container, store) {
        this.store = store;

        this.input = document.createElement("input");
        this.input.className = "cell-editor";
        this.input.style.display = "none";
        container.appendChild(this.input);

        this.input.addEventListener("blur", () => this.commit());
        this.input.addEventListener("keydown", e => {
            if (e.key === "Enter") this.commit();
        });
    }

    open(cell) {
        const r = +cell.dataset.r;
        const c = +cell.dataset.c;
        const rect = cell.getBoundingClientRect();
        const parent = cell.offsetParent.getBoundingClientRect();

        this.r = r;
        this.c = c;

        Object.assign(this.input.style, {
            display: "block",
            top: `${rect.top - parent.top}px`,
            left: `${rect.left - parent.left}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`
        });

        this.input.value = this.store.get(r, c);
        this.input.focus();
    }

    commit() {
        if (this.r == null) return;
        this.store.set(this.r, this.c, this.input.value);
        this.input.style.display = "none";
    }
}
