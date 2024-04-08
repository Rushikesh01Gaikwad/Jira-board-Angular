import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Projectinterface } from '../projectinterface';
import { ProjectjsonService } from '../projectjson.service';
import { FormBuilder, FormGroup, Validator, FormControl } from '@angular/forms';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  registerForm!:FormGroup
  submited = false
  allprojects: Projectinterface[] = [];
  totalLength: number = 0;
  addprojectform = FormGroup;

  formdata: Projectinterface = {
    name: '',
    description: '',
    status: '',
    date: '',
    time: ''
  };

  constructor(
    private router: Router,
    private projectjsonservice: ProjectjsonService,
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  create(): void {
    this.submited = true;
    this.projectjsonservice.add(this.formdata).subscribe({
      next: (data) => {
        this.loadProjects();
        this.clearFormData(); // Clear form data after successful creation
      },
      error: (er) => {
        console.log(er);
      }
    });
  }

  onStatusChange(event: any): void {
    this.formdata.status = event.target.value;
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

  deleteItem(data: any): void {
    this.projectjsonservice.delete(data.id).subscribe((res) => {
      this.loadProjects();
    });
  }

  clearFormData(): void {
    // Reset form data object to initial state
    this.formdata = {
      name: '',
      description: '',
      status: '',
      date: '',
      time: ''
    };
  }
}
