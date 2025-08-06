// auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthTokenService } from './auth-token.service';
import { ProjectjsonService } from './projectjson.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authTokenService: AuthTokenService,
    private http: ProjectjsonService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authTokenService.getAccessToken();
    const refreshToken = this.authTokenService.getRefreshToken();

    const authReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    const params = {
      accessToken: accessToken,
      refreshToken: refreshToken
    };

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.http.post('Login/RefreshToken', params).pipe(
            switchMap((newToken: any) => {
              this.authTokenService.setToken(newToken);
              const clonedReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken.AccessToken}`
                }
              });
              return next.handle(clonedReq);
            }),
            catchError(err => {
              this.authTokenService.clearToken();
              this.router.navigate(['']);
              return throwError(() => err);
            })
          );
        }

        return throwError(() => error);
      })
    );
  }
}
