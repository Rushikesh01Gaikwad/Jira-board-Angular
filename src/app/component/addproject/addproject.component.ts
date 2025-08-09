import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Projectinterface } from '../projectinterface';
import { ProjectjsonService } from '../projectjson.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AlertService } from '../../alert.service';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.scss']
})
export class AddprojectComponent implements OnInit {
  formData: Projectinterface = { name: '', description: '', department: '', location: '', status: '', date: '', time: '' };
  projectForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    department: ['', Validators.required],
    location: ['', Validators.required],
    status: ['Registered', Validators.required],
    date: [this.getCurrentDate(), Validators.required],
    time: [this.getCurrentTime(), Validators.required]
  });

  constructor(private projectService: ProjectjsonService,
    private formBuilder: FormBuilder,
    private router: Router, private loder: NgxUiLoaderService, private alert: AlertService) { }

  ngOnInit(): void {
    // You can remove the form initialization from here since it's already initialized above
  }

  getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().substring(0, 10); // Format: YYYY-MM-DD
  }

  getCurrentTime(): string {
    const today = new Date();
    const hours = today.getHours().toString().padStart(2, '0');
    const minutes = today.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  onStatusChange(event: any): void {
    this.formData.status = event.target.value;
    this.formData.department = event.target.value;
    this.formData.location = event.target.value;
  }

  create() {
    this.loder.start(); // Start the loader
    if (this.projectForm.valid) {
      this.formData = this.projectForm.value;
      this.projectService.post('projectData/Insert', this.formData).subscribe((response) => {
        this.projectForm.reset();
        this.loder.stop(); // Stop the loader
        this.alert.success('Project added successfully');
        this.router.navigate(['/Dashboard'])
      }, (error) => {
        this.loder.stop(); // Stop the loader on error
        this.alert.error('Error adding project', "error");
      });
    } else {
      this.loder.stop(); // Stop the loader if form is invalid
      this.alert.error('Please fill all required fields', "error");
    }
  }
}
