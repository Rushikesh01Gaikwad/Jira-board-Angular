import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent {

  constructor (private router: Router) {}

  addprojects(): void{
    this.router.navigate(['Addproject'])
  }

  loginpage(): void{
    this.router.navigate(['/'])
  }

  home(): void{
    this.router.navigate(['Dashboard'])
  }

}
