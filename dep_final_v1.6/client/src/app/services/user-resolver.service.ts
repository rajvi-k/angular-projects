import { Injectable } from '@angular/core';
import { user } from '../models/user';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user-service';


@Injectable()
export class UserResolverService implements Resolve<user>{

  constructor(private userSvc: UserService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): user | Observable<user> | Promise<user> {
    return this.userSvc.getUserById(route.params.id)
    
  }



}

