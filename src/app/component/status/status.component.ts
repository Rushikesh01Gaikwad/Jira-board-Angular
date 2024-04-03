import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {

  constructor (private router: Router) {}

  viewgraph(): void{
    this.router.navigate(['Graph']);
  }

  loginpage(): void{
    this.router.navigate(['/']);
  }

  addprojects(): void{
    this.router.navigate(['Addproject']);
  }

}
