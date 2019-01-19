import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BiDataService } from './bi-data.service';

@Injectable()
export class FilterResolverService implements Resolve<any[]>  {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any | Observable<any[]> | Promise<any[]> {
    var pid=route.params.proj_id
    return {project_id:pid,names:this.biSvc.getAllApplicationsName(pid),description:this.biSvc.getProjectDescription(pid)}
  }

  constructor(private biSvc:BiDataService) { }

}
