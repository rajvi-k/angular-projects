import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { Router } from '@angular/router';
import { project } from '../../../models/project';
import { ProjectService } from '../../../services/project-service';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'ng2-webstorage';
import { UUID } from 'angular2-uuid';
declare const $, Materialize: any;

@Component({
  selector: 'view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css'],
  providers: [ProjectService]
})

export class ViewProjectComponent implements OnInit {
  projectsAll:project [];
  pp1: any;
  pp: any;
  pFromId: any;
  proj_Name: string;
  role: string;
  pNames: any = [];
  fromId: string;
  projectsVersion:any;
  private projects: project[];

  constructor(private projSvc: ProjectService, private router: Router, private localStorageSvc: LocalStorageService) {
    this.role = this.localStorageSvc.retrieve('role');
    this.proj_Name = this.localStorageSvc.retrieve('project_name')

  }

  ngOnInit() {
    // $('.modal').modal();
    $(document).ready(function () {
      // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
      $('.modal').modal();
    });
    this.projSvc.getLatestProjects()
      .subscribe(data => {
        this.projects = data
        console.log(this.projects)
      },
      err => console.log(err)
      )
      this.projSvc.getProjects()
      .subscribe(data => {
        this.projectsAll = data
        console.log(this.projectsAll)
      },
      err => console.log(err)
      )

  }

  delete(id) {
    console.log(id)
    this.projSvc.deleteProject(id)
      .subscribe(data => {
        this.projSvc.getLatestProjects()
          .subscribe(data => {
            this.projects = data
            console.log("deleted project", this.projects)
            this.localStorageSvc.clear('proj_id')

          },
          err => console.log(err)
          )

      },
      err => alert("Error Occured While Deleting")
      )



  }

  vversion(a){
    console.log(a)
    this.router.navigate(['/dashboard/view-version/a'])
    // this.projSvc.getProjects()
    // .subscribe(data => {
    //   data.map(ver=>{
    //     ver.version_of==a
    //   })
    //   this.projectsVersion = a
   
    //   console.log(this.projectsVersion)

    // },
    // err => console.log(err)
    // )
    // this.router.navigate(['/dashboard/view-version'])
  }
  version(id) {
    $('.modal').modal();
    this.projSvc.getProjectById(id)
      .subscribe(data => {
        this.projects = data.project_name
        this.pp = data
        this.pp1 = data
        console.log(this.projects)

      },
      err => console.log(err)
      )
  }

  versionAdd() {
    console.log()
    var obj1 = this.pp1
    obj1.version_flag = true
    obj1.version_of=""
    var id2 = this.pp1._id

    console.log("iddd", obj1)
    this.projSvc.editProject(obj1, id2).subscribe(res => {
      console.log("edited", res)
    },
      err => alert("Error Occured While Updation")
    )

    if (this.pp.version == 0) {
      this.pp.version++;
    }
    else {
      //console.log("hioiiiiii")
      var i = this.pp.version
      i = parseFloat(i)
      // console.log("iii",i)
      i = (i + 0.1);
      i = i.toFixed(1)
      this.pp.version = i;
    }

    let id = UUID.UUID();
    this.pp.project_id = id
    this.pp.version_flag = false
    // this.pp.version_of=this.pp.project_name
    // this.pp.project_name.substring(this.pp.project_name.indexOf('_')
    // if (this.pp.project_name.indexOf("|") === -1) {

    // }
    // else {
    //   this.pp.project_name = this.pp.project_name.substring(0, this.pp.project_name.indexOf("|"));
    // }
    // this.pp.project_name = `${this.pp.project_name}|v${this.pp.version}`

    var obj = this.pp
    obj.project_name=obj.project+"|v"+this.pp.version
    delete obj._id
    console.log("aftr edit", obj)
    // console.log("idddbeforeadd", obj1,id2)
    this.projSvc.addProjects(obj)
      .subscribe(res => {
        this.ngOnInit()
        // this.projSvc.getLatestProjects()
        //   .subscribe(data => {

        //     this.projects = data
        //     // this.router.navigate(['/dashboard/view'])
        //   },
        //   err => alert("Error Occured While Updation")
        //   )
        console.log("iddd111", res)
      }
      ,
      err => { alert("Error Occured While Adding Project"); console.log("res", err) })




    //   console.log("idddbefore", obj1,id2)
    // this.projSvc.editProject(obj1, id2).subscribe(res => {
    //   console.log("edited", res)
    // },
    //   err => alert("Error Occured While Updation")
    // )









    // this.router.navigate(['/dashboard/view'])
  }


  copyFrom(id) {
    // $("#cpbtn").removeClass("yes");
    // this.pFromId;
    for (let project of this.projects) {
      if (project["_id"] === id) {
        this.pFromId = project;
      }
      else {
        this.pNames.push(project);
      }
    }
    setTimeout(function () {
      $('select').material_select();
    }, 50);
    $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '2%', // Starting top style attribute
      endingTop: '20%', // Ending top style attribute
    });
    $("#caution").hide();
    $("#cpydiv").show();
    $('#modal11').modal('open');
    $("#sPname").change(function () {
      $("#cpbtn").removeClass("disabled");
    })
    // $("#cpbtn").click(function () {
    //   Materialize.toast("Copying Attributes ...",2000);
    //   this.fromId = $(".sPname :selected").val();
    //   console.log("Frm=",this.fromId)
    //   this.projSvc.getProjectById(this.fromId)
    //   .subscribe(data => {
    //     this.projects = data.project_name
    //     // this.pp = data
    //     console.log(this.projects)

    //   },
    //   err => console.log(err)
    //   )
    // });


  }


  copyAttrData() {
    Materialize.toast("Copying Attributes ...", 2000);
    this.fromId = $(".sPname :selected").val();
    console.log("Frm=", this.fromId)
    this.projSvc.getProjectById(this.fromId)
      .subscribe(data => {
        this.pp1 = data.attribute_details
        // this.pp = data
        console.log(this.pp1, this.pFromId._id)

        this.projSvc.editProjectAttr(this.pp1, this.pFromId._id)
          .subscribe(
          res => {
            this.projSvc.getProjects()
              .subscribe(data => {
                this.projects = data
                // console.log(this.projects)

              },
              err => console.log(err)
              )
          },
          err => console.log(err)

          )
      },
      err => console.log(err)
      )

  }


}
