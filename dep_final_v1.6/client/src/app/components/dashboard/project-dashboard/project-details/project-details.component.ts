import { Component, OnInit, Input, OnChanges, AfterViewInit, DoCheck, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import * as _ from "lodash";

import { Observable } from 'rxjs/Observable';
import { BiDataService } from '../../../../services/bi-data.service';

declare const $

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit, AfterViewInit {
  

  @Input() project_details_data
  details: {number_apps:string, description: string; project_budget: string; project_budget_hours: string; project_name: string; project_status: string; start_date: string; project_type: string; };
  appData
  project_details: any
  constructor(private biSvc: BiDataService) {
    this.details= {number_apps: 'N/A', description: 'N/A', project_budget: 'N/A', project_budget_hours: 'N/A', project_name: 'N/A', project_status: 'N/A', start_date: 'N/A', project_type: 'N/A' }
  }

  ngOnInit() {
    
  $(document).ready(function(){
    $('.collapsible').collapsible();
  });
        
    // console.log("back here",this.project_details_data)
    const that = this
    this.details = this.project_details_data
    // console.log("hey", this.biSvc.getProjectDescription("P6"))
    // this.biSvc.getProjectById("P6").subscribe((data: any) => {
    //   that.appData = data
    //   that.project_details = { number_apps: 'N/A', description: 'N/A', project_budget: 'N/A', project_budget_hours: 'N/A', project_name: 'N/A', project_status: 'N/A', start_date: 'N/A', project_type: 'N/A' }
    //   setTimeout(function () {
    //     that.project_details.description = that.appData[0].description
    //     that.project_details.project_budget = that.appData[0].project_budget
    //     that.project_details.project_name = that.appData[0].project_name
    //     that.project_details.start_date = that.appData[0].start_date
    //     that.project_details.project_type = that.appData[0].project_type
    //     that.project_details.project_budget_hours = that.appData[0].project_type
    //     that.project_details.project_status = that.appData[0].project_status
    //     that.project_details.number_apps = that.appData[0].applications.length
    //   }, 2000)
    //   that.ngAfterViewInit()
    //   this.details = this.project_details



    // })
  }
  ngAfterViewInit(): void {
   
  }

}
