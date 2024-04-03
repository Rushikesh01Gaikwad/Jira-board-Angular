import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private router: Router, private http: HttpClient) {}

  dashboardPage(): void{
    this.router.navigate(['/Dashboard']);
  }

  username: string = '';
  password: string = '';
  loginFailed: boolean = false;

  login() {
    this.http.get<any[]>('http://localhost:3000/logindata').subscribe(data => {
      const user = data.find(user => user.username === this.username && user.password === this.password);
      if (user) {
        this.loginFailed = false;
        // Perform redirection or any other action upon successful login
        console.log('Login successful');
        this.dashboardPage();
      } else {
        this.loginFailed = true;
      }
    });
  }
  
  

}
