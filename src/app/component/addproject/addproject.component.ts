import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Projectinterface } from '../projectinterface';
import { ProjectjsonService } from '../projectjson.service';
import { Router } from '@angular/router';

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
    private router: Router) { }

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
    if (this.projectForm.valid) {
      this.formData = this.projectForm.value;
      this.projectService.add(this.formData).subscribe((response) => {
        console.log('Record added successfully:', response);
        this.router.navigate(['/Dashboard'])
      }, (error) => {
        console.error('Error adding record:', error);
      });
    } else {
      // Handle form validation errors here
    }
  }
}
