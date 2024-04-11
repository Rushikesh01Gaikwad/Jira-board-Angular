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

  allprojects: Projectinterface[] = [];
  totalLength: number = 0;

  constructor(
    private router: Router,
    private projectjsonservice: ProjectjsonService,
  ) {}

  formdata: Projectinterface = {
    name: '',
    description: '',
    status: '',
    date: '',
    time: ''
  };

  selectedItem: any;

  ngOnInit(): void {
    this.loadProjects();
  }

  create(): void {
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

  viewstatus(): void {
    this.router.navigate(['status']);
  }

  setSelectedItem(item: any): void {
    this.selectedItem = item;
    this.formdata = { ...item };
  }

  editItem(item: any): void {
    if (!item) return; // Ensure there is a selected item
    this.selectedItem.name = this.formdata.name;
    this.selectedItem.description = this.formdata.description;
    this.projectjsonservice.update(this.selectedItem).subscribe({
      next: (res) => {
        this.loadProjects();
      },
      error: console.error // Use console.error to log errors
    });
  }
  

  deleteItem(item: any): void {
    if (!item) return; // Ensure there is a selected item
    this.projectjsonservice.delete(item.id).subscribe({
      next: (res) => {
        this.loadProjects();
      },
      error: console.error // Use console.error to log errors
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
