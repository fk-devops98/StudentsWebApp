import { StudentsService } from './services/students.service';
import { Component } from '@angular/core';
import { StudentsTable } from './class/students-table';
import { IStudent } from './models/istudent';
import { DialogService } from 'primeng/dynamicdialog';
import { StudentComponent } from './components/student/student.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.scss'],
})
export class StudentsComponent extends StudentsTable {
    constructor(
        private studentsService$: StudentsService,
        public dialogService$: DialogService,
        private confirmationService$: ConfirmationService,
        private messageService$: MessageService
    ) {
        super();
    }

    get students(): Array<IStudent> {
        return this.studentsService$.students;
    }

    public editStudent(student: IStudent) {
        const ref = this.dialogService$.open(StudentComponent, {
            data: {
                student,
            },
            header: 'Edit Student',
            width: '25vw',
        });

        ref.onClose.subscribe((resp: boolean) => {
            if (resp) {
                this.studentsService$.Search();
            }
        });
    }

    public newStudent(): void {
        const ref = this.dialogService$.open(StudentComponent, {
            header: 'Create Student',
            width: '25vw',
        });

        ref.onClose.subscribe((resp: boolean) => {
            if (resp) {
                this.studentsService$.Search();
            }
        });
    }

    public deleteStudent(student: IStudent) {
        const { id } = student || {};

        if (!id) {
            return;
        }

        this.confirmationService$.confirm({
            key: 'confirm1',
            accept: () =>
                this.studentsService$.deleteStudent(student).subscribe(() => {
                    this.messageService$.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Student eliminated successfully',
                    });
                    this.studentsService$.Search();
                }),
        });
    }
}
