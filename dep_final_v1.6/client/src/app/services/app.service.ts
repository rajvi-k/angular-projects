import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from "@angular/http";

import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ProjectApp } from '../models/app-model';
import { MappingService } from './mapping.service';
import { BehaviorSubject } from 'rxjs/Rx';
import { LocalStorageService } from 'ng2-webstorage';


@Injectable()
export class AppService {

  readonly API_URL: string = "http://172.17.111.16:3500/api/apps"
  private appsSubject: BehaviorSubject<ProjectApp[]> = new BehaviorSubject([]);
  private apps: any[] = [];

  constructor(private http: Http, private mappingSvc: MappingService,private localStorageSvc: LocalStorageService) {
    //this.appsSubject.subscribe(_ => this.apps = _); // assigning values to the array
    // get project id from local storage
    if(this.localStorageSvc.retrieve('proj_id')!=null){
      this.proj_id=this.localStorageSvc.retrieve('proj_id')
    }
    // else{
    //   alert("please select proj_id")
    // }

  }

  //get categories
  public getCategories(project_id): Observable<any> {
    let url = `${this.API_URL}/aggregate/categories/${project_id}`
    return this.http.get(url)
      .map(res => res.json())
      
      .catch(err => Observable.throw(err))
  }
  //get project id 
  proj_id: string ;
  public getProjId(project_name): Observable<any> {
    var response;
    let url = `${this.API_URL}/p/prname/${project_name}`
    return this.http.get(url)
      .map(res => {
        var data=res.json()
        this.proj_id=data.project_id
        //push proj id to local storage
        this.localStorageSvc.store('proj_id', data.project_id)
        console.log("id",this.proj_id);
      })
      .catch(err => Observable.throw(err))

  }
  
  public newApp: ProjectApp;
  //get all apps in a single project
  public getApps(): Observable<any[]> {
    console.log(this.proj_id);
   
    var url = `${this.API_URL}/${this.proj_id}`

    return this.http.get(url).map(res =>res.json()).catch(err => Observable.throw(err))
    // this.appsSubject.next(this.apps)
    // return this.appsSubject
    // this.http.get(url)
    //   .map(res => res.json())
    //   .catch(err => Observable.throw(err)).subscribe(_=>this.apps.push(_))
    // this.appsSubject.next(this.apps)
    // return this.appsSubject
  }
  // get a single app
  public getSingleApp(application_id): Observable<ProjectApp> {
    var url = `${this.API_URL}/${this.proj_id}/${application_id}`
    return this.http.get(url)
      .map(res => { res.json(), console.log("res", res.json()) })
      .catch(err => Observable.throw(err));
  }
  public updateAppById(application_id: string, data: any): Observable<ProjectApp> {

    var url = `${this.API_URL}/${this.proj_id}/${application_id}`
    // var convertedApp = this.mappingSvc.convertToApp(data)
    // console.log("Edit entry ", convertedApp)

    //replaces entire application
    return this.http.put(url, data)
      .map(res => res.json())
      .catch(err => Observable.throw(err));
  }
  //add scores
  public addScoresById(application_id: string, data: any): Observable<ProjectApp> {

    var url = `${this.API_URL}/${this.proj_id}/${application_id}/scores`
    // var convertedApp = this.mappingSvc.convertToApp(data)
    // console.log("Edit entry ", convertedApp)

    //replaces entire application
    return this.http.put(url, data)
      .map(res => res.json())
      .catch(err => Observable.throw(err));
  }
  //Add application 
  public addApp(data: any): Observable<any> {

    var url = `${this.API_URL}/${this.proj_id}`
    return this.http.put(url, data)

      .map(res => { res.json(), console.log("kk", res.json()) })

      .catch(err => Observable.throw(err));

  }
  //delete app by app_id
  public deleteApps(application_id: string): Observable<any> {

    var url = `${this.API_URL}/${this.proj_id}/${application_id}`
    return this.http.delete(url)
      .map(res => res.json())
      .catch(err => Observable.throw(err));
  }

}