import { Component, OnInit} from '@angular/core';
import { UserService } from '../../../services/user-service';
import { user } from '../../../models/user';
import { Router } from '@angular/router';
import { ProjectService } from '../../../services/project-service';
import { project } from '../../../models/project';


@Component({
  selector: 'view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
  providers:[UserService]
})
export class ViewUserComponent implements OnInit {
  private projects: project[];
  private users: user[];
 
  constructor(private projSvc: ProjectService, private userSvc: UserService, private router: Router) {

  }

  ngOnInit() {
    this.userSvc.getUsers()
    .subscribe(data => {
     
        this.users = data,
        console.log("VIEW USER PAGE",this.users)
  
    },
    err => console.log(err)
    )
    this.projSvc.getLatestProjects()
     .subscribe(data => {
      
         this.projects = data,
         console.log("VIEW projects PAGE",this.projects)
   
     },
     err => console.log(err)
     )
  }

 
  delete(id) {
    // console.log(id)
    // this.projSvc.delete(id)
    // .subscribe(data => {
    //   this.projSvc.getProjects()
    //   .subscribe(data => {
       
    //       this.projects = data
    //       console.log("post delete",this.projects)
    
    //   },
    //   err => console.log(err)
    //   )
    // },
    // err => console.log(err)
    // )
    
    this.userSvc.delete(id)
      .subscribe(data => {
        this.userSvc.getUsers()
        .subscribe(data => {
         
            this.users = data
            console.log("post delete",this.users)
      
        },
        err => console.log(err)
        )
      },
      err => console.log(err)
      )
      
  }


}
