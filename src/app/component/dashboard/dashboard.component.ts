import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Projectinterface } from '../projectinterface';
import { ProjectjsonService } from '../projectjson.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
  editForm!: FormGroup;

  constructor(
    private router: Router,
    private projectjsonservice: ProjectjsonService,
    private formBuilder: FormBuilder,
  ) {}

  formdata: Projectinterface = {
    name: '',
    description: '',
    location: '',
    department: '',
    status: '',
    date: '',
    time: ''
  };

  selectedItem: any;

  ngOnInit(): void {
    this.loadProjects();
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
  });
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
    this.editForm.patchValue({
      name: item.name,
      description: item.description
  });
  }

  editItem(): void {
    const editedItem = {
        ...this.selectedItem,
        name: this.editForm.value.name,
        description: this.editForm.value.description
    };

    this.projectjsonservice.update(editedItem).subscribe({
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
      location: '',
      department:'',
      date: '',
      time: ''
    };
  }
}
