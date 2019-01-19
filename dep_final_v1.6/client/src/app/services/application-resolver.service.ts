import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BiDataService } from './bi-data.service';

@Injectable()
export class ApplicationResolverService implements Resolve<any[]> {
  appData
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any | Observable<any[]> | Promise<any[]> {
    var pid = route.params.proj_id
    var app_id=route.params.app_id
    const that=this
    this.biSvc.getAppById(pid,app_id).subscribe(data=>that.appData=data)
    return { project_id: pid, appData:this.appData}
  }

  constructor(private biSvc: BiDataService) { }
}
