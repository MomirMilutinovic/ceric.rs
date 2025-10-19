import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MaterialModule } from '../infrastructure/material/material.module';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth.routing.module';
import { ForcedPasswordChangeComponent } from './forced-password-change/forced-password-change.component';
import { UserListModule } from '../user-list/user-list.module';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    LoginComponent,
    ForcedPasswordChangeComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule,
    UserListModule
  ],
  exports: [
    LoginComponent,
    ForcedPasswordChangeComponent,
    SignupComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AuthModule { }