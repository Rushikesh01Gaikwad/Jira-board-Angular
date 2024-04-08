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

  constructor(private router: Router, private _liveAnnouncer: LiveAnnouncer, private projectservice: ProjectjsonService) {}

  dataSource = new MatTableDataSource<Projectinterface>();

  displayedColumns: string[] = ['registered', 'inprogress', 'completed', 'cancelled'];

  reg_count : number = 0;
  prog_count : number = 0;
  comp_count : number = 0;
  canc_count : number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.projectservice.getAll().subscribe((data: Projectinterface[]) => {
      this.dataSource.data = data;
      // Calculate count of registered projects
      this.reg_count = this.dataSource.data.filter(item => item.status === 'Registered').length;
      this.prog_count = this.dataSource.data.filter(item => item.status === 'In progress').length;
      this.comp_count = this.dataSource.data.filter(item => item.status === 'Completed').length;
      this.canc_count = this.dataSource.data.filter(item => item.status === 'Cancelled').length;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
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
