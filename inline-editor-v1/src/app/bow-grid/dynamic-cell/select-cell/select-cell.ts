import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GridColumn } from '../../grid-types';

@Component({
  selector: 'app-select-cell',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './select-cell.html',
  styleUrl: './select-cell.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectCell implements OnInit {
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
    if (this.control.errors['required']) return 'Please select a value';
    return 'Invalid value';
  }
}
