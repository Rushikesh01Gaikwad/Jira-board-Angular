import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Projectinterface } from '../projectinterface';
import { ProjectjsonService } from '../projectjson.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AlertService } from '../../alert.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  allprojects: Projectinterface[] = [];
  editForm!: FormGroup;

  dataSource = new MatTableDataSource<Projectinterface>();
  displayedColumns: string[] = ['name', 'description', 'department', 'date', 'status', 'action', 'changeStatus'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedItem: any = null; // Initialize selectedItem here

  constructor(
    private router: Router,
    private projectjsonservice: ProjectjsonService,
    private _liveAnnouncer: LiveAnnouncer,
    private formBuilder: FormBuilder,
    private alert: AlertService,
    private loader: NgxUiLoaderService
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  formdata: Projectinterface = {
    name: '',
    description: '',
    location: '',
    department: '',
    status: '',
    date: '',
    time: ''
  };

  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.loadProjects(); // Load the current page of projects
  }

  FilterChange(event: Event) {
    const filValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filValue
  }

  loadProjects(): void {
    this.loader.start(); // Start the loader
    this.projectjsonservice.getAll('projectData/Get').subscribe((data: any) => {
      this.allprojects = data.data;
      this.dataSource.data = data.data; // Assign fetched data to dataSource
      this.loader.stop(); // Stop the loader
    }, error => {
      this.alert.error('Error loading projects', error); // Show error alert
      this.loader.stop(); // Stop the loader even on error
    });

  }

  create(): void {
    this.projectjsonservice.post('', this.formdata).subscribe({
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
    this.loader.start(); // Start the loader
    this.projectjsonservice.update('projectData/Update', editedItem).subscribe({
      next: (res) => {
        this.loader.stop(); // Stop the loader
        this.alert.success('Updated successful');
        this.loadProjects();
      },
      error: (error) => {
        this.loader.stop(); // Stop the loader even on error
        this.alert.error('Error updating item');
        console.error(error); // Log the error to console
      }
    });
  }

  deleteItem(item: any): void {
    if (!item) return; // Ensure there is a selected item
    this.projectjsonservice.delete('projectData/delete', item.id).subscribe({
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
    this.projectjsonservice.update('projectData/Update', updatedItem).subscribe({
      next: (res) => {
        // Reload projects after successful update
        this.loadProjects();
      },
      error: console.error // Log errors to console
    });
  }
}
