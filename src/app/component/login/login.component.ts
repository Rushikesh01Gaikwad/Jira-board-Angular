import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectjsonService } from '../projectjson.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLogin = true;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: ProjectjsonService) {
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
      this.http.add(this.loginForm.value).subscribe({
        next: (res: any) => {
          if (res.status_cd == 1) {

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
      this.http.add(this.registerForm.value).subscribe({
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
