import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

export const anyRole = ['CUSTOMER', 'CLERK', 'ADMIN', 'SUPERADMIN'];

@Injectable({ providedIn: 'root' })
export class LoginActivate implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }

    const currentUserRoles = this.authService.getRoles();
    const userMustChangePassword = currentUserRoles.includes('PASSWORD_CHANGE_REQUIRED');
    const userHasAppropriateRole = currentUserRoles.some((role) =>
      route.data['role'].includes(role)
    );
    if (userHasAppropriateRole) {
      return true;
    }
    if (userMustChangePassword) {
      this.router.navigate(['/login/forced-password-change']);
      return false;
    }

    this.router.navigate(['']);
    return false;
  }
}
