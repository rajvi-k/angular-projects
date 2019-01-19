import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ng2-webstorage';
import { NgxPermissionsService } from 'ngx-permissions';
declare var $: any;

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  private role: string;
  private username: string;
  private project_name: string
  constructor(private route: ActivatedRoute, private router: Router, private localStorageSvc: LocalStorageService, private permissionsService: NgxPermissionsService) {

    this.username = this.localStorageSvc.retrieve("username")
    const perm = []
    perm.push(this.localStorageSvc.retrieve('role'))
    this.permissionsService.loadPermissions(perm)
    console.log("perm", perm)
  }

  ngOnInit() {
    // console.log(this.username)
    this.username = this.localStorageSvc.retrieve("username")
    this.project_name = this.localStorageSvc.retrieve("project_name")
    this.role = this.localStorageSvc.retrieve("role")
    $(".button-collapse").sideNav({
      menuWidth: 240,
    });

    // loading permissions

  }

  public isValid() {

    var authkey = this.localStorageSvc.retrieve('authkey')

    // console.log(authkey)
    if (authkey) {
      // console.log("hit")  
      return true
    }
    else {
     
      return false
    }
  }

  public isRole() {
    var role=this.localStorageSvc.retrieve('role')
    if ((role =="TPC") || (role =="ADMIN")) {
      // console.log("hit")  
      return false
    }
    else {
  
      return true
    }
  }

  public logout() {
    this.username = this.localStorageSvc.retrieve("role")
    this.localStorageSvc.clear('role')
    this.localStorageSvc.clear('authkey')
    this.localStorageSvc.clear('project_name')
    this.localStorageSvc.clear('username')
    this.localStorageSvc.clear('proj_id')
    this.permissionsService.flushPermissions()

    this.router.navigate([''])
  }
}
