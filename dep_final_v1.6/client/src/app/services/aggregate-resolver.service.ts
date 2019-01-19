import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppService } from './app.service';

@Injectable()
export class AggregateResolverService implements Resolve<any[]>{
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any[] | Observable<any[]> | Promise<any[]> {
    
    var aggData:any[];
    // this.appSvc.getCategories('56a1d7e5-d0c7-24bf-cf8c-618d5e657f52').subscribe(_ => {aggData = _,console.log("Aaa", aggData)})

    let ProjectId = route.params.id;
    console.log("service", ProjectId)
    return this.appSvc.getCategories(ProjectId)
  }

  constructor(private appSvc: AppService) { }

}
