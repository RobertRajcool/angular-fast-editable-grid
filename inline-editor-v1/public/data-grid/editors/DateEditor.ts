import { BaseEditor } from './BaseEditor';

export class DateEditor extends BaseEditor {
    open(rect: DOMRect, value: any) {
        const input = document.createElement('input');
        input.type = 'date';
        input.className = 'ht-editor';

        if (value) input.value = value;

        this.el = input;
        this.position(rect);
        this.bindKeys(input, () => input.value);

        input.addEventListener('blur', () => this.commit(input.value));

        this.host.appendChild(input);
        input.focus();

        this.opened = true;
    }
}
