import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ProjectjsonService } from '../projectjson.service';
import { Projectinterface } from '../projectinterface';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements AfterViewInit, OnInit {

  dataSource = new MatTableDataSource<Projectinterface>();
  displayedColumns: string[] = ['registered', 'inprogress', 'completed', 'cancelled'];
  reg_count = 0;
  prog_count = 0;
  comp_count = 0;
  canc_count = 0;
  formdata: Projectinterface = {
    name: '',
    description: '',
    location: '',
    department: '',
    status: '',
    date: '',
    time: ''
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private projectservice: ProjectjsonService
  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  onStatusChange(event: any): void {
    this.formdata.status = event.target.value;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  create(): void {
    this.projectservice.post('projectData/Insert', this.formdata).subscribe({
      next: () => {
        this.loadProjects();
        this.clearFormData();
      },
      error: (error) => {
        console.error('Error adding project:', error);
      }
    });
  }

  loadProjects(): void {
    this.projectservice.getAll('projectData/Get').subscribe((data: Projectinterface[]) => {
      this.dataSource.data = data;
      this.updateCounts();
    });
  }

  clearFormData(): void {
    this.formdata = {
      name: '',
      description: '',
      location: '',
      department: '',
      status: '',
      date: '',
      time: ''
    };
  }

  updateCounts(): void {
    this.reg_count = this.getCountByStatus('Registered');
    this.prog_count = this.getCountByStatus('In progress');
    this.comp_count = this.getCountByStatus('Completed');
    this.canc_count = this.getCountByStatus('Cancelled');
  }

  getCountByStatus(status: string): number {
    return this.dataSource.data.filter(item => item.status === status).length;
  }

  viewgraph(): void {
    this.router.navigate(['Graph']);
  }

  loginpage(): void {
    this.router.navigate(['/']);
  }

  addprojects(): void {
    this.router.navigate(['Addproject']);
  }
}
