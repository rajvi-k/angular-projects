import { Injectable } from '@angular/core';
import { project } from '../models/project';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user-service';
import { ProjectService } from './project-service';

@Injectable()
export class ProjectResolverService implements Resolve<project> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): project | Observable<project> | Promise<project> {
    return this.projSvc.getProjectById(route.params.id)
  }


  constructor(private projSvc: ProjectService) { }

}
