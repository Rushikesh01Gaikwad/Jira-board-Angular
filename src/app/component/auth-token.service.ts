// auth-token.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {


  constructor(private http: HttpClient) { }

  private accessToken: string = '';
  private expiration: Date | null = null;
  private refreshToken: string = '';

  setToken(token: any): void {
    this.accessToken = token.AccessToken;
    this.expiration = token.Expiration;
    this.refreshToken = token.RefreshToken;
  }
  

  getAccessToken(): string {
    return this.accessToken;
  }
  getRefreshToken(): string {
    return this.refreshToken;
  }
  
  isTokenExpired(): boolean {
    if (!this.expiration) return true;
    return new Date() > this.expiration;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  clearToken(): void {

    this.accessToken = '';
    this.expiration = null;

    this.refreshToken = '';
  }

//   refreshTokenRequest(): Observable<any> {
//   return this.http.post('http://localhost:5227/api/Login/refresh-token', {
//     accessToken: this.getAccessToken(),
//     refreshToken: this.getRefreshToken(),
//   });
// }

}
