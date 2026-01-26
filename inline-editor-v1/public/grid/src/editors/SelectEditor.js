export class DropdownEditor {
  constructor(cell, data, col) {
    const select = document.createElement('select');

    col.options.forEach(o => {
      const opt = document.createElement('option');
      opt.value = o;
      opt.textContent = o;
      select.appendChild(opt);
    });

    select.value = cell.textContent;

    cell.innerHTML = '';
    cell.appendChild(select);
    select.focus();

    select.onchange = () => {
      data[cell.dataset.row][col.field] = select.value;
      cell.textContent = select.value;
    };

    select.onblur = () => select.onchange();
  }
}
