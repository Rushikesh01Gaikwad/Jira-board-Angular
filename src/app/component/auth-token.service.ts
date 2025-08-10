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
  private userId: number | null = null;

  setToken(token: any): void {
    this.accessToken = token.accessToken;
    this.expiration = token.expiration;
    this.refreshToken = token.refreshToken;
  }

  setUserId(userId: number): void {
    this.userId = userId;
  }

  getAccessToken(): string {
    return this.accessToken;
  }
  getRefreshToken(): string {
    return this.refreshToken;
  }
  getUserId(): number | null {
    return this.userId;
  }

  isTokenExpired(): boolean {
    if (!this.expiration) return true;
    return new Date() > this.expiration;
  }

  clearToken(): void {

    this.accessToken = '';
    this.expiration = null;
    this.refreshToken = '';
    this.userId = null;
  }

  //   refreshTokenRequest(): Observable<any> {
  //   return this.http.post('http://localhost:5227/api/Login/refresh-token', {
  //     accessToken: this.getAccessToken(),
  //     refreshToken: this.getRefreshToken(),
  //   });
  // }

}
