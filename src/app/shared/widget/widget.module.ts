import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { PaginateModule } from './paginate/paginate.module';
import { DirectiveUserModule } from './directives/directive-user.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb'; 

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PaginateModule,
        DirectiveUserModule,
        NzBreadCrumbModule
    ],
    declarations: [
        BreadCrumbComponent,
        FieldErrorDisplayComponent
    ],
    exports: [
        BreadCrumbComponent,
        FieldErrorDisplayComponent,
        PaginateModule,
        DirectiveUserModule,
    ]
})
export class WidgetModule { }