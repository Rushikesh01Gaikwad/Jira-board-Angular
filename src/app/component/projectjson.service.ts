import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Projectinterface} from './projectinterface'
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectjsonService {

  getLatestId(): Observable<number> {
    return this.httpClient.get<Projectinterface[]>('http://localhost:3000/projectData').pipe(
      map(data => {
        // Find the maximum ID
        const maxId = data.reduce((max, item) => item.id > max ? item.id : max, 0);
        return maxId + 1; // Increment the maximum ID by 1
      })
    );
  }

  constructor(private httpClient : HttpClient) {}

  getAll()
  {
    return this.httpClient.get<Projectinterface[]>('http://localhost:3000/projectData');
  }

  create(record: Projectinterface)
  {
    return this.httpClient.post('http://localhost:3000/projectData', record);
  }

  edit(id:number) 
  {
    return this.httpClient.get<Projectinterface>(`http://localhost:3000/projectData?id=${id}`);
  }

  delete(id:number)
  {
    return this.httpClient.delete(`http://localhost:3000/projectData?id=${id}`)
  }

}
