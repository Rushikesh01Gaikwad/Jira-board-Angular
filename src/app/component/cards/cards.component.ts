import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProjectjsonService } from '../projectjson.service';
import { Projectinterface } from '../projectinterface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {

  dataSource = new MatTableDataSource<Projectinterface>();
  totalLength: number = 0;
  reg_count = 0;
  prog_count = 0;
  comp_count = 0;
  canc_count = 0;

  constructor(private router: Router, private projectjsonservice: ProjectjsonService) { }
  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectjsonservice.getAll('projectData/Get').subscribe((data) => {
      this.dataSource.data = data; // Assign data to dataSource
      this.totalLength = data.length;
      this.updateCounts();
    });
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

}
