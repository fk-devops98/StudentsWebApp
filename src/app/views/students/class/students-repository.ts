import { IStudent } from './../models/istudent';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';

export class StudentsRepository {
    public new(): FormGroup {
        return new FormBuilder().group({
            username: new FormControl(null, [Validators.required]),
            firstName: new FormControl(null, [Validators.required]),
            lastName: new FormControl(null, [Validators.required]),
            age: new FormControl(null, [Validators.required]),
            career: new FormControl(null, [Validators.required]),
        });
    }

    public edit(student: IStudent): FormGroup {
        return new FormBuilder().group({
            id: new FormControl(student.id, [Validators.required]),
            username: new FormControl(student.username, [Validators.required]),
            firstName: new FormControl(student.firstName, [
                Validators.required,
            ]),
            lastName: new FormControl(student.lastName, [Validators.required]),
            age: new FormControl(student.age, [Validators.required]),
            career: new FormControl(student.career, [Validators.required]),
        });
    }
}
