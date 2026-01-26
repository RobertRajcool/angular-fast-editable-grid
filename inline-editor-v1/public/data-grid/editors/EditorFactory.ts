import { TextEditor } from './TextEditor';
import { DropdownEditor } from './DropdownEditor';
import { RadioEditor } from './RadioEditor';
import { DateEditor } from './DateEditor';
import { CellType } from '../types';
export function createEditor(
  type: CellType | undefined,
  host: HTMLElement,
  commit: (value: any) => void,
  cancel: () => void
) {
  switch (type) {
    case 'dropdown':
      return new DropdownEditor(host, commit, cancel);
    case 'radio':
      return new RadioEditor(host, commit, cancel);
    case 'date':
      return new DateEditor(host, commit, cancel);
    case 'number':
    case 'text':
    default:
      return new TextEditor(host, commit, cancel);
  }
}
