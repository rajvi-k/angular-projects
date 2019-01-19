import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { project } from '../models/project';

@Injectable()
export class ScoresDataService {

  readonly  API_URL:  string  =  "http://172.17.111.16:3500/score"
  constructor(private http: Http) { }

  public getScoresData(): Observable<project[]> {
    var url = `${this.API_URL}/allscores`;
    return this.http.get(url).map(res => res.json()).catch(err => err.json())
  }

  public getAppScoresData(pname: any) {
    let url = `${this.API_URL}/allscores`;
    var obj = {
      project_name: pname
    }
    return this.http.post(url, obj).map(res => res.json()).catch(err => err.json())
  }

  public getProjectName(): Observable<project[]>{
    let url = `${this.API_URL}/allprojectnames`;
    return this.http.get(url).map(res => res.json()).catch(err => err.json())
  }
}
