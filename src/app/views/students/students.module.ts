import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsComponent } from './students.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StudentComponent } from './components/student/student.component';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
    declarations: [StudentsComponent, StudentComponent],
    imports: [CommonModule, StudentsRoutingModule, SharedModule],
    providers: [DialogService, MessageService, ConfirmationService],
})
export class StudentsModule {}
