import { BaseEditor } from "./BaseEditor.js";

export class DateEditor extends BaseEditor {
    create() {
        const input = document.createElement("input");
        input.type = "date";
        return input;
    }

    getValue() { return this.el.value; }
    setValue(v) { this.el.value = v ?? ""; }
    focus() { this.el.focus(); }
}
