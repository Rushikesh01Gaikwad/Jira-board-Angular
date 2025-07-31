import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projectinterface } from './projectinterface'
import { map, Observable } from 'rxjs';
import { AuthTokenService } from './auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectjsonService {

  constructor(private httpClient: HttpClient, private authTokenService: AuthTokenService) { }
  //private baseUrl = 'http://localhost:3000/projectData';
  private baseUrl = 'http://localhost:5227/api/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${this.authTokenService.getToken()}`
    })
  };

  getAll(url: string) {
    return this.httpClient.get<Projectinterface[]>(`${this.baseUrl}${url}`, this.httpOptions);
  }

  get(url: string, record?: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}${url}`, { params: record, headers: this.httpOptions.headers });
  }

  post(url: string, record: Projectinterface) {
    return this.httpClient.post(`${this.baseUrl}${url}`, record, this.httpOptions);
  }

  update(url: string, data: any) {
    //return this.httpClient.put<Projectinterface>('http://localhost:3000/projectData/' + data.id, data);
    return this.httpClient.put<Projectinterface>(`${this.baseUrl}${url}` + data.id, data, this.httpOptions);
  }

  delete(url: string, data: any) {
    //return this.httpClient.delete(`http://localhost:3000/projectData/${data}`);
    return this.httpClient.delete(`${this.baseUrl}${url}` + data.id, this.httpOptions);
  }

}
