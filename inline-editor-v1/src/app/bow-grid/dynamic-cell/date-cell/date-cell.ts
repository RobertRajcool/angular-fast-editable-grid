import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GridColumn } from '../../grid-types';

@Component({
  selector: 'app-date-cell',
  templateUrl: './date-cell.html',
  styleUrl: './date-cell.css',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateCell implements OnInit {
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
    if (this.control.errors['required']) return 'Date is required';
    if (this.control.errors['futureDate']) return 'Future date not allowed';
    return 'Invalid date';
  }
}