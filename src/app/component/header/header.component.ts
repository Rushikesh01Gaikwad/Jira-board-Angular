import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router) {}

  loginpage(): void{
    this.router.navigate(['/']);
  }

  addprojects(): void{
    this.router.navigate(['Addproject']);
  }

  viewstatus(): void{
    this.router.navigate(['status']);
  }

}
