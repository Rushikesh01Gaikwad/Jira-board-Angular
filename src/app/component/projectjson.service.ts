import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Projectinterface} from './projectinterface'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectjsonService {

  constructor(private httpClient : HttpClient) {}

  getAll()
  {
    return this.httpClient.get<Projectinterface[]>('http://localhost:3000/projectData');
  }

  create(record: Projectinterface)
  {
    return this.httpClient.post('http://localhost:3000/projectData', record);
  }

  update(id:number, data: any) 
  {
    return this.httpClient.put('http://localhost:3000/projectData/' +id, data).pipe(map((res: any)=>
    {
      return res;
    }))
  }

  delete(id:number)
  {
    return this.httpClient.delete("http://localhost:3000/projectData/"+id).pipe(map((res: any)=>
    {
      return res;
    }));
  }

}
