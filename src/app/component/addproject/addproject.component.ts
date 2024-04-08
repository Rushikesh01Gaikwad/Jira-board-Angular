import { Component } from '@angular/core';
import { Router } from '@angular/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProjectjsonService } from '../projectjson.service';
import { Projectinterface } from '../projectinterface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrl: './addproject.component.scss'
})
export class AddprojectComponent {

  constructor(private router:Router, private projectjsonservice: ProjectjsonService){}

  formdata : Projectinterface =
  {
    name:'',
    description: '',
    status: 'Registered',
    date: '',
    time: '',
  }

  onStatusChange(event: any) {
    this.formdata.status = event.target.value;
}

create()
  {
    this.projectjsonservice.add(this.formdata).subscribe(
      {
        next:(data)=>
        {
          this.router.navigate(['/Dashboard']);
        },
        error:(er)=>
        {
          console.log(er)
        }
      }
    )
  }

  loginpage(): void{
    this.router.navigate(['/']);
  }
}
