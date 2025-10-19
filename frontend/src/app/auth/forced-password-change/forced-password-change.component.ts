import { Component } from '@angular/core';
import { ResponsiveComponent } from '../../shared/responsive-component.component';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorStateMatcher } from '@angular/material/core';

export class PasswordConfirmationErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (!!form && form?.hasError("passwordMismatch"));
  }
}

@Component({
  selector: 'app-forced-password-change',
  templateUrl: './forced-password-change.component.html',
  styleUrl: './forced-password-change.component.css',
})
export class ForcedPasswordChangeComponent extends ResponsiveComponent {
  passwordChangeForm: FormGroup;
  matcher = new PasswordConfirmationErrorStateMatcher();

  constructor(
    public res: BreakpointObserver,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    super(res);
    this.passwordChangeForm = formBuilder.group(
      {
        oldPassword: new FormControl<string>('', [Validators.required]),
        newPassword: new FormControl<string>('', [Validators.required]),
        newPasswordConfirmation: new FormControl<string>('', [
          Validators.required,
        ]),
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    const newPassword = form.get('newPassword')?.value;
    const newPasswordConfirmation = form.get('newPasswordConfirmation')?.value;
    return newPassword === newPasswordConfirmation
      ? null
      : { passwordMismatch: true };
  }

  changePassword(): void {
    if (this.passwordChangeForm.valid) {
      const oldPassword = this.passwordChangeForm.get('oldPassword')?.value;
      const newPassword = this.passwordChangeForm.get('newPassword')?.value;

      this.authService.changePassword(oldPassword, newPassword).subscribe({
        next: async (passwordChangeSuccessful) => {
          if (!passwordChangeSuccessful) {
            this.snackBar.open('Old password is incorrect.', 'OK', {
              duration: 3000,
            });
            this.passwordChangeForm
              .get('oldPassword')
              ?.setErrors({ wrongPassword: true });
            return;
          }
          this.snackBar.open('Password changed successfully!', 'OK', {
            duration: 3000,
          });
          // When testing locally the password change and login happen almost at the same
          // time leading the backend to think the user logged in with an old password
          this.logInAndRedirect(newPassword);
        },
        error: (_) => {
          this.snackBar.open(
            'An error occurred. Please try again later.',
            'OK',
            { duration: 3000 }
          );
        },
      });
    }
  }

  logInAndRedirect(newPassword: string) {
    this.authService
      .login(this.authService.getUsername(), newPassword)
      .subscribe(
        (_) => {
          this.router.navigate(['']);
        },
        (err) => {
          this.snackBar.open(
            'An error occurred. Please try again later.',
            'OK',
            { duration: 3000 }
          );
        }
      );
  }
}
