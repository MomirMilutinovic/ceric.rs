import { Component, ViewChild } from '@angular/core';
import { UserRegistrationFormComponent } from '../../user-list/user-registration-from/user-registration-form.component';
import { User } from '../../user-list/user-management.service';
import { AuthService } from '../service/auth.service';
import { ResponsiveComponent } from '../../shared/responsive-component.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent extends ResponsiveComponent {
  @ViewChild('form')
  userRegistrationFrom!: UserRegistrationFormComponent;
  canSubmit = false;
  user!: User;

  constructor(
    private auth: AuthService,
    public res: BreakpointObserver,
    private snack: MatSnackBar,
    private router: Router
  ) {
    super(res);
  }

  ngAfterViewInit(): void {
    this.userRegistrationFrom.isValid.subscribe((isValid) => {
      this.canSubmit = isValid;
    });
    this.userRegistrationFrom.user.subscribe((user) => (this.user = user));
  }

  signUp() {
    this.auth.signup(this.user).subscribe(
      (_) => {
        this.snack.open("You have signed up successfully. Check your email for a verification link to activate your account.");
        this.router.navigate(['']);
      },
      (_) => {
        this.snack.open("A user with that username already exists.");
      }
    )
  }
}
