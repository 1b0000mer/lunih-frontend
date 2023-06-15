import { Routes } from '@angular/router';
import { ListStudentComponent } from './list-student/list-student.component';
import { ApproveStudentComponent } from './approve-student/approve-student.component';

export const StudentRoutes: Routes = [
    {
        path: '',
        component: ListStudentComponent
    },
    {
        path: 'approve',
        component: ApproveStudentComponent
    }
];