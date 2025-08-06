import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectjsonService } from '../projectjson.service';
import { Router } from '@angular/router';
import { AuthTokenService } from '../auth-token.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLogin = true;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private loader: NgxUiLoaderService, private http: ProjectjsonService, private router: Router, private authTokenService: AuthTokenService) {
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
      this.loader.start();
      this.http.get(`Login/Login`, this.loginForm.value).subscribe({
        next: (res: any) => {

          if (res.statusCd == 1) {
            this.authTokenService.setToken(res.data.token);
            this.router.navigate(['/dashboard']);
            this.loader.stop();

          }
          else if (res.statusCd == 0) {
            alert(res.message); // or handle error
            this.loader.stop();

          }

        }, error: (err: any) => {
          console.error('Login error:', err);
          this.loader.stop();
        }
      })
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.http.post(`User/Insert`, this.registerForm.value).subscribe({
        next: (res: any) => {
          if (res.statusCd == 1) {

          } else if (res.statusCd == 0) {

          }
        },
        error: (err: any) => {

        }
      });
    }
  }
}
