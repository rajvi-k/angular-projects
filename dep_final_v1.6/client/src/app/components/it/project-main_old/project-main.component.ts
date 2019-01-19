import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';
import { LocalStorageService } from 'ng2-webstorage';
import { NgxPermissionsService } from 'ngx-permissions';
declare var $: any;
//import {RatingModule} from "ng2-rating";


@Component({
  selector: 'project-main',
  templateUrl: './project-main.component.html',
  styleUrls: ['./project-main.component.css']
})
export class ProjectMainComponent implements OnInit {

  generalDynamicAttributes: any[];
  integrationDynamicAttributes:any[];
  ticketDynamicAttributes:any[];
  customDynamicAttributes:any[];
  packageDynamicAttributes:any[];
  classificationDynamicAttributes:any[];
  role:string;
  constructor(service: QuestionService, private localStorageSvc:LocalStorageService, private permissionsService:NgxPermissionsService) { 
    this.generalDynamicAttributes = service.getGeneralQuestions();
    this.classificationDynamicAttributes= service.getGeneralQuestions();
    this.integrationDynamicAttributes= service.getGeneralQuestions();
    this.packageDynamicAttributes = service.getGeneralQuestions();
    this.customDynamicAttributes = service.getGeneralQuestions();
    this.ticketDynamicAttributes = service.getGeneralQuestions();

    const perm=[]
    this.role=this.localStorageSvc.retrieve('role')
    perm.push(this.localStorageSvc.retrieve('role'))
    this.permissionsService.loadPermissions(perm)
  
  
  }

  ngOnInit() {
    $('.modal').modal();
    $('ul.tabs').tabs();
    $('#label').click(function(e) {  
      //alert("click")
      $("#modal1").modal('open');
    });
  }
  tempFunc(id){
    $('ul.tabs').tabs('select_tab',id)
  }
  addRow(){
    //if(this.role=="Admin"||this.role=="TPC"){
    $("tbody").append(`
      <tr>
        <td><a class="waves-effect waves-light  modal-trigger" href="#modal1">Some Applications</a>
        </td>
        <td>
          <a class="modal-trigger" href="#modal1" (click)="tempFunc('test1')">
            <div id="progressbar">
              <div id="bar" style="width:0%" class="blue"></div>
              <div id="label" class="blue-text">0%</div>
            </div>
          </a>
        </td>
        <td>
        <a class="modal-trigger" href="#modal1" (click)="tempFunc('test2')">
          <div id="progressbar">
            <div id="bar" style="width:0%" class="blue"></div>
            <div id="label" class="blue-text">0%</div>
          </div>
          </a>
        </td>
        <td>
        <a class="modal-trigger" href="#modal1" (click)="tempFunc('test3')">
          <div id="progressbar">
            <div id="bar" style="width:0%" class="blue"></div>
            <div id="label" class="blue-text">0%</div>
          </div>
          </a>
        </td>
        <td>
        <a class="modal-trigger" href="#modal1" (click)="tempFunc('test4')">
          <div id="progressbar">
            <div id="bar" style="width:0%" class="blue"></div>
            <div id="label" class="blue-text">0%</div>
          </div>
          </a>
        </td>
        <td>
        <a class="modal-trigger" href="#modal1" (click)="tempFunc('test5')">
          <div id="progressbar">
            <div id="bar" style="width:0%" class="blue"></div>
            <div id="label" class="blue-text">0%</div>
          </div>
          </a>
        </td>
         <td>
         <a class="modal-trigger" href="#modal2">
            <div id="progressbar">
              <div id="label" class="blue-text">Scores</div>
            </div>
            </a>
          </td>
      </tr>
    `)
  }

// if(this.role=="Executive"){

//   $("tbody").append(`
//   <tr>
//     <td><a class="waves-effect waves-light  modal-trigger" href="#modal1">Some Applications</a>
//     </td>
//     <td>
//       <a class="modal-trigger" href="#modal1" (click)="tempFunc('test1')">
//         <div id="progressbar">
//           <div id="bar" style="width:0%" class="blue"></div>
//           <div id="label" class="blue-text">0%</div>
//         </div>
//       </a>
//     </td>
//     <td>
//     <a class="modal-trigger" href="#modal1" (click)="tempFunc('test2')">
//       <div id="progressbar">
//         <div id="bar" style="width:0%" class="blue"></div>
//         <div id="label" class="blue-text">0%</div>
//       </div>
//       </a>
//     </td>
//     <td>
//     <a class="modal-trigger" href="#modal1" (click)="tempFunc('test3')">
//       <div id="progressbar">
//         <div id="bar" style="width:0%" class="blue"></div>
//         <div id="label" class="blue-text">0%</div>
//       </div>
//       </a>
//     </td>
//     <td>
//     <a class="modal-trigger" href="#modal1" (click)="tempFunc('test4')">
//       <div id="progressbar">
//         <div id="bar" style="width:0%" class="blue"></div>
//         <div id="label" class="blue-text">0%</div>
//       </div>
//       </a>
//     </td>
//     <td>
//     <a class="modal-trigger" href="#modal1" (click)="tempFunc('test5')">
//       <div id="progressbar">
//         <div id="bar" style="width:0%" class="blue"></div>
//         <div id="label" class="blue-text">0%</div>
//       </div>
//       </a>
//     </td>
//     </tr>
//     `)
// }
}