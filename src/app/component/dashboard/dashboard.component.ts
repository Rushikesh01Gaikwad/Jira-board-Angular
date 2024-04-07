import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Projectinterface } from '../projectinterface';
import { ProjectjsonService } from '../projectjson.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  allprojects: Projectinterface[] = [];
  totalLength: number = 0;
  formValue!:FormGroup;

  
  formdata: Projectinterface = {
    id: 0,
    name: '',
    description: '',
    status: '',
    date: '',
    time: ''
  };

  constructor(
    private router: Router,
    private projectjsonservice: ProjectjsonService,
    private fb :FormBuilder
  ) {}

  ngOnInit(): void {
    this.formValue=this.fb.group(
      {
        title:[''],
        descrip:['']
      }
    )
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectjsonservice.getAll().subscribe((data) => {
      this.allprojects = data;
      this.totalLength = data.length;
    });
  }

  loginpage(): void {
    this.router.navigate(['/']);
  }

  addprojects(): void {
    this.router.navigate(['Addproject']);
  }

  viewstatus(): void {
    this.router.navigate(['status']);
  }

  deleteItem(data: any)
  {
    this.projectjsonservice.delete(data.id).subscribe((res)=>
    {
      this.loadProjects();
    })
  }
}
