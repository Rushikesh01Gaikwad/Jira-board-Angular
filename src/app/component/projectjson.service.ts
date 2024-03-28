import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Projectinterface} from './projectinterface'

@Injectable({
  providedIn: 'root'
})
export class ProjectjsonService {

  constructor(private httpclient : HttpClient) { }

  get()
  {
    return this.httpclient.get<Projectinterface[]>('http://localhost:3000/projectData')
  }
}
