import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GridColumn } from '../grid-types';
import { CommonModule } from '@angular/common';
import { RadioCell } from './radio-cell/radio-cell';
import { DateCell } from './date-cell/date-cell';
import { TextCell } from './text-cell/text-cell';
import { SelectCell } from './select-cell/select-cell';

@Component({
  selector: 'app-dynamic-cell',
  imports: [CommonModule, TextCell, DateCell, RadioCell, SelectCell],
  templateUrl: './dynamic-cell.html',
  styleUrl: './dynamic-cell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicCell {
  @Input() row!: any;
  @Input() column!: GridColumn;
}
