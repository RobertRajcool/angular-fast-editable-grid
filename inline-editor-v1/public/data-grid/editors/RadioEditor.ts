import { BaseEditor } from './BaseEditor';

export class RadioEditor extends BaseEditor {
    open(rect: DOMRect, value: any, col: any) {
        const wrapper = document.createElement('div');
        wrapper.className = 'ht-editor ht-radio-editor';

        (col.source || []).forEach((opt: string) => {
            const label = document.createElement('label');
            label.style.display = 'block';

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'ht-radio';
            input.value = opt;
            input.checked = opt === value;

            input.addEventListener('change', () => this.commit(opt));

            label.appendChild(input);
            label.appendChild(document.createTextNode(opt));
            wrapper.appendChild(label);
        });

        this.el = wrapper;
        this.position(rect);

        this.host.appendChild(wrapper);
        this.opened = true;
    }
}
