import { BaseEditor } from "./BaseEditor.js";

export class RadioEditor extends BaseEditor {
    constructor(options) {
        super();
        this.options = options;
    }

    create() {
        const wrapper = document.createElement("div");
        this.inputs = [];

        this.options.forEach(o => {
            const label = document.createElement("label");
            const input = document.createElement("input");
            input.type = "radio";
            input.name = "grid-radio";
            input.value = o;
            label.append(input, o);
            wrapper.appendChild(label);
            this.inputs.push(input);
        });
        return wrapper;
    }

    getValue() {
        return this.inputs.find(i => i.checked)?.value;
    }

    setValue(v) {
        this.inputs.forEach(i => i.checked = i.value === v);
    }

    focus() {
        this.inputs[0]?.focus();
    }
}
