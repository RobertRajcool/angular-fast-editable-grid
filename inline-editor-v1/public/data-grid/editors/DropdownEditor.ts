import { BaseEditor } from './BaseEditor';

export class DropdownEditor extends BaseEditor {
    open(rect: DOMRect, value: any, col: any) {
        const select = document.createElement('select');
        select.className = 'ht-editor';

        (col.source || []).forEach((opt: string) => {
            const o = document.createElement('option');
            o.value = opt;
            o.textContent = opt;
            if (opt === value) o.selected = true;
            select.appendChild(o);
        });

        this.el = select;
        this.position(rect);
        this.bindKeys(select, () => select.value);

        select.addEventListener('change', () => this.commit(select.value));
        select.addEventListener('blur', () => this.commit(select.value));

        this.host.appendChild(select);
        select.focus();

        this.opened = true;
    }
}
