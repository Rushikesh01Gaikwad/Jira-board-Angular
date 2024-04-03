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

  totalLength: number = 0;

  constructor(private router: Router, private projecjsonservice: ProjectjsonService) {}

  ngOnInit(): void {
    this.projecjsonservice.getAll().subscribe((data)=>
    {
      this.allprojects = data;
      this.totalLength = data.length;
    })
  }

  loginpage(): void{
    this.router.navigate(['/']);
  }

  addprojects(): void{
    this.router.navigate(['Addproject'])
  }

  viewstatus(): void{
    this.router.navigate(['status'])
  }
  deleteItem(id: number): void{
    this.projecjsonservice.delete(id).subscribe((data) => {
      this.allprojects = this.allprojects.filter(_ => _.id != id)
        console.log(data)
    },
    (error) => {
      console.log(error)
    })
  }

}
