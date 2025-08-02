import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { AuthTokenService } from './auth-token.service';
import { catchError, switchMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProjectjsonService } from './projectjson.service';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authTokenService = inject(AuthTokenService);
  const http = inject(ProjectjsonService);
  const router = inject(Router);

  const accessToken = authTokenService.getAccessToken();
  const refreshToken = authTokenService.getRefreshToken();

  let authReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });

    const params = {
      accessToken: accessToken,
      refreshToken: refreshToken
    };
//authTokenService.refreshTokenRequest()
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('refresh-token')) {
        return http.post('Login/RefreshToken', params)
        .pipe(
          switchMap((newToken: any) => {
            authTokenService.setToken(newToken);
            const clonedReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken.AccessToken}`
              }
            });
            return next(clonedReq);
          }),
          catchError(err => {
            authTokenService.clearToken();
            router.navigate(['']);
            return throwError(() => err);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
