import { Component, OnInit} from '@angular/core';
// import { UserService } from '../../../services/user-service';
import { UUID } from 'angular2-uuid';
import { Router } from '@angular/router';
import { ProjectService } from '../../../services/project-service';
import { project } from '../../../models/project';
import { LocalStorageService } from 'ng2-webstorage';

declare var $: any;

@Component({
  selector: 'project-admin',
  templateUrl: './project-admin.component.html',
  styleUrls: ['./project-admin.component.css']
})
export class ProjectAdminComponent implements OnInit {
  username: String;
  private project:project=new project();

  constructor( private projSvc: ProjectService, private router: Router,private localStorageSvc: LocalStorageService) { 
    // this.projSvc.getProjects()
    this.username = this.localStorageSvc.retrieve("username")
  }

  ngOnInit() {
    $('select').material_select();
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false // Close upon selecting a date,
    });
  }

  // Adding a new Project
  public addProject( pname, description, ptype, pstatus, pbudget, phours, sdate, edate) {
   
    if(pname!=undefined && pname!="" && pname!=null ){
    let puuid = UUID.UUID();
    console.log(puuid);
    var date=new Date().toLocaleString()
    console.log("date",date)
    var obj = {
      project_id: puuid,
      project:pname,
      project_name: pname+"|v0",
     // var a=version+".0"
      version:0,
      version_flag:false,
      description: description,
      project_type: ptype,
      project_status: pstatus,
      project_budget: pbudget,
      project_budget_hours: phours,
      start_date: sdate,
      delivery_date: edate,
      attribute_details:[],
      map_config: [],
      created_by:this.username,
      created_at:date,
       modified_by:"",
       modified_at:""
    }
    console.log(obj)
  
    this.projSvc.addProjects(obj)
      .subscribe( data=>{
        res=> alert("Project Added Successfully")
        this.router.navigate(['/dashboard/view'])
      },
      err =>{ alert("Error Occured While Adding Project");console.log("res",err)}
      
    )
    
  }
  else{
    alert('Please fill the project name')
  }
}

}
