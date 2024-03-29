import { Component, OnInit } from '@angular/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from '@angular/router';
import { Projectinterface } from '../projectinterface';
import { ProjectjsonService } from '../projectjson.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  allprojects: Projectinterface[]=[];

  constructor(private router: Router, private projecjsonservice: ProjectjsonService) {}

  ngOnInit(): void {
    this.projecjsonservice.getAll().subscribe((data)=>
    {
      this.allprojects = data;
    })
  }

  loginpage(): void{
    this.router.navigate(['/']);
  }

  addprojects(): void{
    this.router.navigate(['Addproject'])
  }

}
