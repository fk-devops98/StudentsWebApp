import { HttpService } from './../../../core/services/http.service';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StudentsRepository } from '../class/students-repository';
import { IStudent } from '../models/istudent';
import { EStudents } from 'src/app/core/routes/e.students';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StudentsService extends StudentsRepository {
    public student: FormGroup = this.new();

    public students: Array<IStudent> = [];

    constructor(private httpService$: HttpService) {
        super();
        this.Search();
    }

    public async Search(): Promise<void> {
        this.httpService$
            .get(EStudents.main)
            .subscribe((response: Array<IStudent>) => {
                this.students = response;
            });
    }

    public loadEdit(student: IStudent): void {
        const { id } = student || {};

        if (id) {
            const route = `${EStudents.main}/${id}`;

            this.httpService$.get(route).subscribe((response: IStudent) => {
                this.student = this.edit(response);
            });
        }
    }

    public cleanForm(): void {
        this.student = this.new();
    }

    public deleteStudent({ id }: IStudent): Observable<any> {
        return this.httpService$.delete(`${EStudents.main}/${id}`);
    }

    public saveStudent(): Observable<any> {
        const student = this.student.value as IStudent;
        const { id } = student || {};

        if (id) {
            return this.httpService$.put<IStudent>(
                `${EStudents.main}/${id}`,
                student
            );
        }
        return this.httpService$.post<IStudent>(
            `${EStudents.main}`,
            student
        );
    }
}
