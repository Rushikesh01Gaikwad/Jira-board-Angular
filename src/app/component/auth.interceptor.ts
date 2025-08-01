import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { AuthTokenService } from './auth-token.service';
import { catchError, switchMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authTokenService = inject(AuthTokenService);
  const http = inject(HttpClient);
  const router = inject(Router);

  const accessToken = authTokenService.getAccessToken();

  let authReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('refresh-token')) {
        return authTokenService.refreshTokenRequest().pipe(
          switchMap((newToken: any) => {
            authTokenService.setToken(newToken);

            const clonedReq = req.clone({
              setHeaders: {
                'Authorization': `Bearer ${newToken.accessToken}`
              }
            });
            return next(clonedReq);
          }),
          catchError(err => {
            router.navigate(['']);
            authTokenService.clearToken();
            return throwError(() => err);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
