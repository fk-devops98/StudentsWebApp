import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IStudent } from '../../models/istudent';
import { StudentsService } from '../../services/students.service';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.scss'],
})
export class StudentComponent {
    constructor(
        private studentsService$: StudentsService,
        private messageService$: MessageService,
        private config$: DynamicDialogConfig,
        private ref$: DynamicDialogRef
    ) {
        if (this.config$?.data) {
            const {
                data: { student },
            } = this.config$ || {};

            if (student) {
                this.init(student);
            }
        }
    }

    public init(student: IStudent): void {
        this.studentsService$.loadEdit(student);
    }

    public getForm(): FormGroup {
        return this.studentsService$.student;
    }

    public close(result?: boolean): void {
        this.ref$.close(result?? false);
    }

    public isInvalid(field: string): boolean {
        return (
            this.getForm().controls[field].dirty &&
            this.getForm().controls[field].touched &&
            this.getForm().controls[field].invalid
        );
    }

    public save(): void {
        if (!this.getForm().valid) {
            this.getForm().markAllAsTouched();
            this.messageService$.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Por favor verificar los campos obligatorios',
            });
        }

        this.studentsService$.saveStudent().subscribe(() => {
            this.messageService$.add({
                severity: 'success',
                summary: 'Guardado correctamente',
            });

            this.studentsService$.cleanForm();
            this.close(true);
        });
    }
}
