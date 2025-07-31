// auth-token.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  private accessToken: string = '';
  private expiration: Date | null = null;
  private refreshToken: string = '';

  setToken(token: any): void {
    this.accessToken = token.accessToken;
    this.expiration = token.expiration;
    this.refreshToken = token.refreshToken;
  }

  getAccessToken(): string {
    return this.accessToken;
  }
  getRefreshToken(): string {
    return this.refreshToken;
  }
  getExpiration() {
    return this.expiration;
  }

  clearToken(): void {
    this.accessToken = '';
  }
}
