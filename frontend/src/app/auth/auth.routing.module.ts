import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ForcedPasswordChangeComponent } from './forced-password-change/forced-password-change.component';
import { LoginActivate } from './guard/login-activate';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: LoginComponent, data: { hideNavbar: true } },
  { path: 'signup', component: SignupComponent, data: { hideNavbar: true } },
  {
    path: 'forced-password-change',
    component: ForcedPasswordChangeComponent,
    canActivate: [LoginActivate],
    data: { role: ['PASSWORD_CHANGE_REQUIRED'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
