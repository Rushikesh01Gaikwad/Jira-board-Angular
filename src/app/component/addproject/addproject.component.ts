import { Component } from '@angular/core';
import { Router } from '@angular/router';
import 'bootstrap/dist/css/bootstrap.min.css';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrl: './addproject.component.scss'
})
export class AddprojectComponent {

  constructor(private router:Router){}

  loginpage(): void{
    this.router.navigate(['/']);
  }

  dashboardPage(): void{
    this.router.navigate(['/Dashboard']);
  }
}
