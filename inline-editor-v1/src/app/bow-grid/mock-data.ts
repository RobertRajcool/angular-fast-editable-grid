import { GridColumn } from './grid-types';

export const COLUMNS: GridColumn[] = Array.from({ length: 35 }).map((_, i) => {
    if (i % 4 === 0) {
        return { field: 'col' + i, header: 'Text ' + i, type: 'text', width: 140 };
    }
    if (i % 4 === 1) {
        return {
            field: 'col' + i,
            header: 'Select ' + i,
            type: 'select',
            width: 160,
            options: [
                { label: 'A', value: 'A' },
                { label: 'B', value: 'B' },
                { label: 'C', value: 'C' }
            ]
        };
    }
    if (i % 4 === 2) {
        return { field: 'col' + i, header: 'Date ' + i, type: 'date', width: 160 };
    }
    return {
        field: 'col' + i,
        header: 'Radio ' + i,
        type: 'radio',
        width: 180,
        options: [
            { label: 'Yes', value: true },
            { label: 'No', value: false }
        ]
    };
});

export const ROWS = Array.from({ length: 500 }).map((_, r) => {
    const row: any = { id: r };
    for (let c = 0; c < 35; c++) {
        row['col' + c] = `R${r}C${c}`;
    }
    return row;
});
