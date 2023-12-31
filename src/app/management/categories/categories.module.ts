import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesRoutes } from './categories.routing';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,

        // Routes
        RouterModule.forChild(CategoriesRoutes),
    ]
})
export class CategoriesModule { }