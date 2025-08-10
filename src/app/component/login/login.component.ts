import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectjsonService } from '../projectjson.service';
import { Router } from '@angular/router';
import { AuthTokenService } from '../auth-token.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AlertService } from '../../alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLogin = true;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private loader: NgxUiLoaderService, private alert: AlertService, private http: ProjectjsonService, private router: Router, private authTokenService: AuthTokenService) {
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
            this.authTokenService.setUserId(res.data.user.id);
            this.router.navigate(['/dashboard']);
            this.loader.stop();

          }
          else if (res.statusCd == 0) {
            this.loader.stop();
            this.alert.error(res.message, 'Login Failed');

          }

        }, error: (err: any) => {
          console.error('Login error:', err);
          this.loader.stop();
          this.alert.error('An error occurred during login. Please try again.', 'Error');
        }
      })
    }
    else {
      this.alert.warning('Please fill in all required fields correctly.', 'Validation Error');
    }
  }

  onRegister() {
    this.loader.start();
    if (this.registerForm.valid) {
      this.http.post(`User/Insert`, this.registerForm.value).subscribe({
        next: (res: any) => {
          if (res.statusCd == 1) {
            this.loader.stop();
            this.isLogin = true;
            this.alert.success('Registration successful! You can now log in.', 'Registration Success');
          } else if (res.statusCd == 0) {
            this.loader.stop();
            this.alert.error(res.message, 'Registration Failed');
          }
        },
        error: (err: any) => {
          this.loader.stop();
          this.alert.error('An error occurred during registration. Please try again.', 'Error');
        }
      });
    }
  }
}
