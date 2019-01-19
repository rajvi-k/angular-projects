import { Component, OnInit } from '@angular/core';
import { project } from '../../../models/project';
import { ProjectService } from '../../../services/project-service';
import { AppService } from '../../../services/app.service';
import { LocalStorageService } from 'ng2-webstorage';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-by-project',
  templateUrl: './app-by-project.component.html',
  styleUrls: ['./app-by-project.component.css']
})
export class AppByProjectComponent implements OnInit {
  flag1: boolean=false;
  proj_Name: string;
  projects:any=[];
  proj_name: string;
  role;
  constructor(private projSvc: ProjectService,private router: Router, private appSvc: AppService, private localStorageSvc: LocalStorageService) {
    this.role = this.localStorageSvc.retrieve('role');
    this.proj_Name = this.localStorageSvc.retrieve('project_name')
  }

  ngOnInit() {
    $('select').material_select();
    this.projSvc.getLatestProjects()
      .subscribe(data => {
        // this.projects = data
        data.map(elem=>{
          
          this.projects.push(elem.project_name)
        })
        console.log("hi",this.projects)
        setTimeout(function () {
          $('select').material_select();
        }, 5)
      },
      err => console.log(err)
      )
      
  }

  setProjName(name) {
    console.log("entewr",$('#pname1 option:selected').text())
   if( this.localStorageSvc.retrieve('proj_id')==null && this.localStorageSvc.retrieve('proj_id')==undefined){
     console.log("xx",this.localStorageSvc.retrieve('proj_id'))
    if($('#pname1 option:selected').text()=='Select Project' || $('#pname1 option:selected').text()==undefined){
      alert("Please select Project")
    }
    else{
      
            this.proj_name = $('#pname1 option:selected').text()
            console.log("Project Name Selected :", this.proj_name)
            this.appSvc.getProjId(this.proj_name)
              .subscribe()
            console.log(name)
            this.flag1=true;
            if (name === "ui") {
              this.router.navigate(['/dashboard/inputforms'])
            }
            if (name === "excel") {
              this.router.navigate(['/dashboard/excel'])
            }
          }
   }
   else{
    if($('#pname1 option:selected').text()!='Select Project' && $('#pname1 option:selected').text()!=undefined){
      this.proj_name = $('#pname1 option:selected').text()
      console.log("Project Name Selected :", this.proj_name)
      this.appSvc.getProjId(this.proj_name)
        .subscribe()
      console.log(name)
      this.flag1=true;
      if (name === "ui") {
        this.router.navigate(['/dashboard/inputforms'])
      }
      if (name === "excel") {
        this.router.navigate(['/dashboard/excel'])
      }
    }
    else{
      this.flag1=true;
      if (name === "ui") {
        this.router.navigate(['/dashboard/inputforms'])
      }
      if (name === "excel") {
        this.router.navigate(['/dashboard/excel'])
      }
    }
   
   }
 
  
 
  }

  setProjNameE() {
    this.flag1=true;
    this.appSvc.getProjId(this.proj_Name)
      .subscribe()
  }




  // isSetProject(){
  //   if($(`#pname1 option:selected`).text().trim() === "Select Project")
  //     return false;
  //   else
  //     return true;
  // }
}
