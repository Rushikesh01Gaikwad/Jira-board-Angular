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
  currentPage: number = 1;
  itemsPerPage: number = 13;
  totalPages = 0;
  pages: number[] = [];
  pagedProjects: Projectinterface[] = [];
  

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
    // Load the current page of projects
    this.loadPage();
  }

  loadProjects(): void {
    this.projectjsonservice.getAll().subscribe((data) => {
      this.allprojects = data;
      this.totalLength = data.length;
      // Calculate total pages and generate page numbers
      this.totalPages = Math.ceil(this.totalLength / this.itemsPerPage);
      console.log(this.totalPages)
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.loadPage(); // Load the current page of projects after updating data
    });
  }

  loadPage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage - 1, this.totalLength - 1);
    this.pagedProjects = this.allprojects.slice(startIndex, endIndex + 1);  
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.loadPage();
    }
  }

  create(): void {
    this.projectjsonservice.add(this.formdata).subscribe({
      next: (data) => {
        this.loadProjects();
      },
      error: (er) => {
        console.log(er);
      }
    });
  }

  onStatusChange(event: any): void {
    this.formdata.status = event.target.value;
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

  changeStatus(item: any, newStatus: string): void {
    // Prepare the updated item with new status
    const updatedItem = {
        ...item,
        status: newStatus
    };

    // Call the service's update method with the updated item
    this.projectjsonservice.update(updatedItem).subscribe({
        next: (res) => {
            // Reload projects after successful update
            this.loadProjects();
        },
        error: console.error // Log errors to console
    });
}

}
