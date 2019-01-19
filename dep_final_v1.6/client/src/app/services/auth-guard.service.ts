import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import {LocalStorageService} from 'ng2-webstorage'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
@Injectable()
export class AuthGuardService implements CanActivate{
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if(this.localStorageSvc.retrieve('authkey') && this.localStorageSvc.retrieve('role'))
    return true;
else
    return false
  }

  constructor(private localStorageSvc:LocalStorageService) { }

}
