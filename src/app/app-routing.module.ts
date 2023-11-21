import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './shared/components/layout/layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'students',
                    component: LayoutComponent,
                    loadChildren: () =>
                        import('./views/students/students.module').then(
                            (m) => m.StudentsModule
                        ),
                },
                {
                    path: '',
                    redirectTo: 'students',
                    pathMatch: 'full',
                },
            ],
            {
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
