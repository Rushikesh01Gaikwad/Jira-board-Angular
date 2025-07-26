import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projectinterface } from './projectinterface'
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectjsonService {

  constructor(private httpClient: HttpClient) { }

  //private baseUrl = 'http://localhost:3000/projectData';
  private baseUrl = 'http://localhost:5227/swagger/api';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': Bearer ${this.provider.token}
    })
  };

  getAll() {
    return this.httpClient.get<Projectinterface[]>(`${this.baseUrl}/Get`, this.httpOptions);
  }

  add(record: Projectinterface) {
    return this.httpClient.post(`${this.baseUrl}/Insert`, record, this.httpOptions);
  }

  update(data: any) {
    //return this.httpClient.put<Projectinterface>('http://localhost:3000/projectData/' + data.id, data);
    return this.httpClient.put<Projectinterface>(`${this.baseUrl}/Update` + data.id, data, this.httpOptions);
  }

  delete(data: any) {
    //return this.httpClient.delete(`http://localhost:3000/projectData/${data}`);
    return this.httpClient.delete(`${this.baseUrl}/delete/${data.id}`, this.httpOptions);
  }

}
