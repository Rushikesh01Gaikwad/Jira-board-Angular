import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Projectinterface} from './projectinterface'
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectjsonService {

  constructor(private httpClient : HttpClient) {}

  getAll()
  {
    return this.httpClient.get<Projectinterface[]>('http://localhost:3000/projectData');
  }

  add(record: Projectinterface)
  {
    return this.httpClient.post('http://localhost:3000/projectData', record);
  }

  update(data: any) 
  {
    return this.httpClient.put('http://localhost:3000/projectData/', data).pipe(map((res: any)=>
    {
      return res;
    }))
  }

  delete(data :any)
  {
    return this.httpClient.delete("http://localhost:3000/projectData/"+data).pipe(map((res: any)=>
    {
      return res;
    }));
  }

}
