import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { GridColumn } from '../../grid-types';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-radio-cell',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './radio-cell.html',
  styleUrl: './radio-cell.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioCell implements OnInit {
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
    if (this.control.errors['required']) return 'Please choose an option';
    return 'Invalid value';
  }
}
