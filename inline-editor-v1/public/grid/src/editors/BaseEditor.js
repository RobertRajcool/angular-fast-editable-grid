export class BaseEditor {
    mount(container) {
        this.container = container;
        this.el = this.create();
        this.el.style.position = "absolute";
        this.el.style.zIndex = 50;
        this.el.style.display = "none";
        container.appendChild(this.el);
    }

    open({ value, rect }) {
        this.el.style.display = "block";
        this.el.style.top = rect.top + "px";
        this.el.style.left = rect.left + "px";
        this.el.style.width = rect.width + "px";
        this.el.style.height = rect.height + "px";
        this.setValue(value);
        this.focus();
    }

    close() {
        this.el.style.display = "none";
    }

    create() { }
    getValue() { }
    setValue(v) { }
    focus() { }
}
