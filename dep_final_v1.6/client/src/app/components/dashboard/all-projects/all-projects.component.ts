import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs';
import { BiDataService } from '../../../services/bi-data.service';
import { LocalStorageService } from 'ng2-webstorage';
declare const $
@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit , AfterViewInit{
  projectDescriptions: Observable<any>;
  ngAfterViewInit() {
    
  }
  single: any[]=[]
  multi: any[];

  view: any[] = [700, 400];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C']
  };
  numberProjects:Observable<number>

  constructor(private biSvc:BiDataService,private localStorageSvc: LocalStorageService) {
    $(document).ready(function(){
      $('.tooltipped').tooltip({delay: 50});
    });
   }

  ngOnInit() {
    this.numberProjects=this.biSvc.getTotalProjects()
    this.projectDescriptions=this.biSvc.getAllProjectsDescription()
    $(document).ready(function(){
      $('.tooltipped').tooltip({delay: 50});
    });
    }
    // console.log(this.numberProjects)

    projectRoute(data){
      console.log("project data",data)
      this.localStorageSvc.store('project_name',data)
    }
  
}
