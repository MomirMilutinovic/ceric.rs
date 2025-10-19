import { AfterContentInit, AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponsiveComponent } from '../../shared/responsive-component.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../model/login-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent extends ResponsiveComponent implements AfterViewInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    public res: BreakpointObserver,
    private authService: AuthService,
    private router: Router
  ) {
    super(res);
  }

  @ViewChild("username") usernameField?: ElementRef;
  ngAfterViewInit() {
    this.usernameField?.nativeElement.focus();
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe(
      (data: LoginResponse) => {
          this.router.navigate(['']);
      },
      (error) => {
        this.loginForm.get('password')?.setErrors({ wrongCredentials: true });
      }
    );
  }
}
