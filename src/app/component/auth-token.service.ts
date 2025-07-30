// auth-token.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  private token: string = '';
  private refreshToken: string = '';

  setToken(token: string, refreshToken: string): void {
    this.token = token;
    this.refreshToken = refreshToken;
  }

  getToken(): string {
    return this.token;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  clearToken(): void {
    this.token = '';
    this.refreshToken = '';
  }
}
