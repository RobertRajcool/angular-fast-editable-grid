export class TextEditor {
  constructor(cell, data, col) {
    const input = document.createElement('input');
    input.value = cell.textContent;
    input.style.width = '100%';

    cell.innerHTML = '';
    cell.appendChild(input);
    input.focus();

    input.onblur = () => {
      data[cell.dataset.row][col.field] = input.value;
      cell.textContent = input.value;
    };
  }
}
