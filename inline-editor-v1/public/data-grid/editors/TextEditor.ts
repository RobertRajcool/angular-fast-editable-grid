import { BaseEditor } from './BaseEditor';

export class TextEditor extends BaseEditor {
    open(rect: DOMRect, value: any, col: any) {
        const input = document.createElement('input');
        input.type = col.type === 'number' ? 'number' : 'text';
        input.value = value ?? '';
        input.className = 'ht-editor';

        this.el = input;
        this.position(rect);
        this.bindKeys(input, () => input.value);

        input.addEventListener('blur', () => this.commit(input.value));

        this.host.appendChild(input);
        input.focus();
        input.select();

        this.opened = true;
    }
}
