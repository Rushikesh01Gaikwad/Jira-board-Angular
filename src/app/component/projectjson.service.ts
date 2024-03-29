import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Projectinterface} from './projectinterface'

@Injectable({
  providedIn: 'root'
})
export class ProjectjsonService {

  constructor(private httpClient : HttpClient) {}

  getAll()
  {
    return this.httpClient.get<Projectinterface[]>('http://localhost:3000/projectData');
  }

  create(data: Projectinterface)
  {
    return this.httpClient.post('http://localhost:3000/projectData', data);
  }

  edit(id:number) 
  {
    this.httpClient.get<Projectinterface[]>(`http://localhost:3000/projectData/${id}`);
  }
}
