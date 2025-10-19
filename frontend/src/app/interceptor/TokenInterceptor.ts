import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpEvent,
  HttpHandlerFn,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';

export function TokenInterceptor(
  request: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const auth: AuthService = inject(AuthService);
  if (auth.tokenIsPresent()) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${auth.getToken()}`,
      },
    });
  }
  return next(request);
}
