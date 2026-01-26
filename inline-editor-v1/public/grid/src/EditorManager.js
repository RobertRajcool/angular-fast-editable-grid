import { TextEditor } from './editors/TextEditor.js';
import { DropdownEditor } from './editors/SelectEditor.js';

export class EditorManager {
    constructor(container, columns, data) {
        this.container = container;
        this.columns = columns;
        this.data = data;

        this.editors = {
            text: TextEditor,
            dropdown: DropdownEditor
        };
    }

    activate(e) {
        const cell = e.target.closest('.cell');
        if (!cell || cell.dataset.editable === 'false') return;

        const col = this.columns[cell.dataset.col];
        const Editor = this.editors[col.type];
        if (!Editor) return;

        new Editor(cell, this.data, col);
    }
}
