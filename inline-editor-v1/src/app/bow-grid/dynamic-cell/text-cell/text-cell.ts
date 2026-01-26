import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GridColumn } from '../../grid-types';

@Component({
  selector: 'app-text-cell',
  templateUrl: './text-cell.html',
  styleUrl: './text-cell.css',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class TextCell {
  @Input() row!: any;
  @Input() column!: GridColumn;

  control = new FormControl('');

  ngOnInit() {
    this.control.setValue(this.row[this.column.field]);
    this.control.setValidators(this.column.validators || []);

    this.control.valueChanges.subscribe(v => {
      this.row[this.column.field] = v;
    });
  }

  errorMessage(): string {
    if (!this.control.errors) return '';
    if (this.control.errors['required']) return 'Required';
    if (this.control.errors['minlength']) return 'Too short';
    if (this.control.errors['maxlength']) return 'Too long';
    return 'Invalid value';
  }
}
