import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './user-table/user-table.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { LoginActivate } from '../auth/guard/login-activate';
import { UserRegistrationFormComponent } from './user-registration-from/user-registration-form.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';


const routes: Routes = [
  { path: '', component: UserListComponent, canActivate: [LoginActivate], data: {'role': ["ADMIN"] } }
];

@NgModule({
  declarations: [
    UserTableComponent,
    UserListComponent,
    UserRegistrationFormComponent,
    AddUserDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    UserTableComponent,
    UserListComponent,
    AddUserDialogComponent,
    UserRegistrationFormComponent
  ]
})
export class UserListModule { }
