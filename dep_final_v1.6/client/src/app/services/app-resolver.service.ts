import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProjectApp } from '../models/app-model';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Injectable()
export class AppResolverService implements Resolve<ProjectApp[]>{
  public apps:any[]=[]
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ProjectApp[] | Observable<ProjectApp[]> | Promise<ProjectApp[]>  {
    //throw new Error("Method not implemented.");,
    
    return this.appSvc.getApps()
  }

  constructor(private appSvc: AppService) { }

}
