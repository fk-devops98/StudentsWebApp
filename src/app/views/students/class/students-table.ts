import { Table } from 'primeng/table';
import { IStudent } from '../models/istudent';

export class StudentsTable {
    columnsTable: { field: string; header: string }[] = [
        { field: 'username', header: 'UserName' },
        { field: 'firstName', header: 'Price' },
        { field: 'lastName', header: 'Category' },
        { field: 'age', header: 'Reviews' },
        { field: 'career', header: 'Status' },
    ];

    selectedItem: IStudent | undefined | unknown;

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
