import { Component, OnInit } from '@angular/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ActivatedRoute, Router } from '@angular/router';
import { Projectinterface } from '../projectinterface';
import { ProjectjsonService } from '../projectjson.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private router: Router, private projecservice: ProjectjsonService, private route: ActivatedRoute) {}

  formdata : Projectinterface = 
  {
    id:0,
    name:'',
    description: '',
    status: '',
    date: '',
    time: '',
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe((param)=>
    {
      let id = Number(param.get('id'))
      this.getByid(id)
    })
  }

  getByid(id: number)
  {
    this.projecservice.edit(id).subscribe((data)=>
    {
        this.formdata = data;
        console.log(data)
    })
  }


  loginpage(): void{
    this.router.navigate(['/']);
  }

}
