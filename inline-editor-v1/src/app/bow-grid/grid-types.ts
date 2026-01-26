import { ValidatorFn } from '@angular/forms';

export interface GridColumn {
    field: string;
    header: string;
    type: 'text' | 'select' | 'date' | 'radio';
    options?: { label: string; value: any }[];
    validators?: ValidatorFn[];
    width?: number;
}
