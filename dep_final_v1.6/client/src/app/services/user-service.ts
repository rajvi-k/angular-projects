import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { user } from '../models/user';
import 'rxjs/Rx';
// import { project } from '../models/project';


@Injectable()
export class UserService {

  readonly API_URL: string = "http://172.17.111.16:3500/transform"
  constructor(private http: Http) { }

  public addUser(obj): Observable<user> {
    return this.http.post(this.API_URL, obj)
      .map(res => res.json())
      .catch(err => err.json())
  }

  public getUser(obj): Observable<user> {
    var login = "login";
    var url = `${this.API_URL}/${login}`;
    console.log(url)
    return this.http.post(url, obj)
      .map(res => res.json())
      .catch(err => err.json())
  }

  public getUsers(): Observable<user[]> {
    var users = "users";
    var url = `${this.API_URL}/${users}`;
    return this.http.get(url)
      .map(res => res.json())
      .catch(err => err.json())
  }

  public delete(id): Observable<any> {
    var users = "users";
    var x = `${this.API_URL}/${users}/${id}`
    return this.http.delete(x)
      .map(res => res.json())
      .catch(err => Observable.throw(err))


  }

  // public deleteProject(id): Observable<any> {
  //   var projects = "projects";
  //   var x = `${this.API_URL}/${projects}/${id}`
  //   return this.http.delete(x)
  //     .map(res => res.json())
  //     .catch(err => Observable.throw(err))


  // }

  public editUser(data: any, id: string): Observable<any> {
    var users = "users";
    var x = `${this.API_URL}/${users}/${id}`
    return this.http.put(x, data)
      .map(res => res.json())
      .catch(err => Observable.throw(err))

  }

  // public getProjectsUsers(): Observable<any> {
  //   var projects = "projects/users";
  //   var url = `${this.API_URL}/${projects}`;
  //   return this.http.get(url)
  //     .map(res => res.json())
  //     .catch(err => err.json())
  // }


  // public addProjects(obj): Observable<[project]> {
  //   var projects = "projects/addproject";
  //   var url = `${this.API_URL}/${projects}`;
  //   return this.http.post(url, obj)
  //     .map(res => res.json())
  //     .catch(err => err.json())
  // }


  public getUserById(id: string): Observable<user> {
    var users = "users";
    var url = `${this.API_URL}/${users}/${id}`;
    return this.http.get(url)
      .map(res => res.json())
      .catch(err => Observable.throw(err));
  }

  // public getProjectById(id: string): Observable<[project]> {
  //   var projects = "projects";
  //   var url = `${this.API_URL}/${projects}/${id}`;
  //   return this.http.get(url)
  //     .map(res => res.json())
  //     .catch(err => Observable.throw(err));
  // }


}
