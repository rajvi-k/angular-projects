import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { Router } from '@angular/router';
import { user } from '../../../models/user';
import { ProjectService } from '../../../services/project-service';
import { project } from '../../../models/project';

declare var $: any;
@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  projects: [project];

  constructor(private userSvc: UserService, private router: Router,private projSvc:ProjectService) {
  }

  ngOnInit() {
    // $('select').material_select();
    // this.projSvc.getProjects()
    // .subscribe(data => {

    //     this.projects = data
    //     console.log(this.projects)

    // },
    // err => console.log(err)
    // )
    $('select').material_select();
    this.projSvc.getLatestProjects()
      .subscribe(data => {
        this.projects = data
        console.log(this.projects)
        setTimeout(function () {
          $('select').material_select();
        }, 20)
      },
      err => console.log(err)
      )

  }


  public addUser(project_name, user_email, username, password, role) {
    var obj = {
      project_name: project_name,
      user_email: user_email,
      username: username,
      password: password,
      role: role
    }
    console.log(obj)

    this.userSvc.addUser(obj)
      .subscribe(data => {
        res => alert("User added sucessfully")
        this.router.navigate(['/dashboard/view-user'])
      },
      err => alert("Error Occured While Adding User")
      )

  }
  // public mapUsers(){
  //   this.userSvc.getProjectsUsers()
  //   .subscribe(
  //     res => alert("Success 1")
  //     ,err => console.log(err)
  //   )
  // }
}
