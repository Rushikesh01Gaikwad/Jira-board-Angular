import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectjsonService } from '../projectjson.service';
import { Router } from '@angular/router';
import { AuthTokenService } from '../auth-token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLogin = true;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: ProjectjsonService, private router: Router, private authTokenService: AuthTokenService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.http.add(`login/login`, this.loginForm.value).subscribe({
        next: (res: any) => {
          if (res.status_cd == 1) {
            this.authTokenService.setToken(res.data.token, res.data.refreshToken);
            this.router.navigate(['/dashboard']);
          }
          else if (res.status_cd == 0) {

          }

        }, error: (err: any) => {

        }
      })
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.http.add(`User/Insert`, this.registerForm.value).subscribe({
        next: (res: any) => {
          if (res.status_cd == 1) {

          } else if (res.status_cd == 0) {

          }
        },
        error: (err: any) => {

        }
      });
    }
  }
}
