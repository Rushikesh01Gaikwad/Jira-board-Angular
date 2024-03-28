import { Component } from '@angular/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private router: Router) {}

  loginpage(): void{
    this.router.navigate(['/']);
  }

  addprojects(): void{
    this.router.navigate(['Addproject'])
  }

}
