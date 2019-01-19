import { Component, OnInit, Input, OnChanges, AfterViewInit, DoCheck, ChangeDetectionStrategy } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import * as _ from "lodash";
import { BiDataService } from '../../../../../services/bi-data.service';
import { Observable } from 'rxjs/Observable';
declare const $



@Component({
  selector: 'app-all-applications',
  templateUrl: './all-applications.component.html',
  styleUrls: ['./all-applications.component.css'],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class AllApplicationsComponent implements OnInit ,AfterViewInit{
  status: boolean = false
  changelog: any = []




  @Input() selectedAppNames
  @Input() selectedEvent
  @Input() projectId
  oldselectedEvent
  DocheckCount = 0;
  oldSelectedNames = []
  appDataAsync: Observable<any>;
  observer: any;
  appData: any[] = []
  // appDataAsync: Observable<any>;

  values: any[];
  count: number;
  group= {Complete:0,InComplete:0}
  total = 0;
  single = []
  viewZoom: any[] = [500, 400]
  legendZoom = false
  view: any[] = [600, 270];

  // options
  showLabels = true;
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Number of Apps';
  showYAxisLabel = true;
  yAxisLabel = 'Attribute Category';

  colorScheme = {
    domain: ['#1e88e5', "#f44336"]
  };
  groups: any = {}


  constructor(private router: Router, private biSvc: BiDataService) {
 
    this.single = []
    this.total = 0


  }
  ngDoCheck() {
    // console.log("checking for changes")
    this.DocheckCount++;

    if (this.selectedEvent != this.oldselectedEvent) {
      {
        console.log("checking for changesssssssssssssssssssssssss")
        // console.log("detected", this.oldSelectedNames, this.selectedAppNames)
        const changeLog = `Do Check from ${this.oldSelectedNames.length} to ${this.selectedAppNames.length}`
        // console.log("detected",this.oldSelectedNames,this.selectedAppNames)
        this.changelog.push(changeLog);
        this.status = true
        console.log("calling")
        const that = this
        this.single = []
        this.total = 0
        this.groups = {Complete:0,InComplete:0}
        this.count = 0
        this.values = []
        
        this.biSvc.getSingleApp(this.selectedAppNames,this.projectId).subscribe(apps => {
   
          that.appData = apps
          console.log("app11212123212211212122222222", JSON.stringify(that.appData))
          setTimeout(function () {
            //console.log("11111111111111111111111",JSON.stringify(that.appData))
           that.appData.forEach((data, count = 0) => {
             count++
             console.log("appname", data.application_name)

           
            for(let x in data.attribute_category_completion){
              if (data.attribute_category_completion[x].category_type!='custom_applications_attributes'){
              if (data.attribute_category_completion[x].completed_fields < data.attribute_category_completion[x].total_fields){
                that.groups["InComplete"]++;
                console.log("incom", data.attribute_category_completion[x].category_type,data.attribute_category_completion[x].completed_fields ,data.attribute_category_completion[x].total_fields)
                break;
              }
              else{
                console.log("lenght", data.attribute_category_completion.length,x)
                if (+x == (data.attribute_category_completion.length-2)){
                  that.groups["Complete"]++
                }
              }
             }

//        completed_fields":2,"total_fields

            }
           //  if( data.app_average_completion_percentage <100)
           //  {
           //    that.groups["InComplete"]++
           //  }
           //  else{
           //    that.groups["Complete"]++
           //  }
            
           })

           //console.log("att",that.groups)
           that.ngAfterViewInit()
          
         }, 1500)
      
          //console.log("yo", JSON.stringify(that.appData))
        }
    
        )

      }
      this.oldSelectedNames = this.selectedAppNames
      this.oldselectedEvent = this.selectedEvent

    }

  }
  ngOnInit(): void {
    this.oldSelectedNames = this.selectedAppNames
    this.oldselectedEvent = this.selectedEvent
    console.log("On Init input", this.selectedAppNames)
    // this.biSvc.getSingleApp(this.selectedAppNames)
    $(document).ready(function () {
      // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
      $('.modal').modal();
    });
    $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
    }
    
    );  
    const that = this
    this.single = []
    this.total = 0
    this.groups = {Complete:0,InComplete:0}
    this.count = 0
    this.values = []
    console.log(this.biSvc.getSingleApp(this.selectedAppNames,this.projectId))
    this.biSvc.getSingleApp(this.selectedAppNames,this.projectId).subscribe(apps => {
      
            that.appData = apps
            setTimeout(function () {
               //console.log("11111111111111111111111",JSON.stringify(that.appData))
              that.appData.forEach((data, count = 0) => {
                count++
                console.log("appname", data.application_name)

              
               for(let x in data.attribute_category_completion){
                 if (data.attribute_category_completion[x].category_type!='custom_applications_attributes'){
                 if (data.attribute_category_completion[x].completed_fields < data.attribute_category_completion[x].total_fields){
                   that.groups["InComplete"]++;
                   console.log("incom", data.attribute_category_completion[x].category_type,data.attribute_category_completion[x].completed_fields ,data.attribute_category_completion[x].total_fields)
                   break;
                 }
                 else{
                   console.log("lenght", data.attribute_category_completion.length,x)
                   if (+x == (data.attribute_category_completion.length-2)){
                     that.groups["Complete"]++
                   }
                 }
                }

//        completed_fields":2,"total_fields

               }
              //  if( data.app_average_completion_percentage <100)
              //  {
              //    that.groups["InComplete"]++
              //  }
              //  else{
              //    that.groups["Complete"]++
              //  }
               
              })

              console.log("att",that.groups)
              that.ngAfterViewInit()
             
            }, 1500)
        
            //console.log("yo", JSON.stringify(that.appData))
          }
      
          )
  }

  ngAfterViewInit() {
    this.single = []
    this.single = []
    this.count = 0;
    this.values = []
    Object.assign(this, { single: this.single })
    this.total = 0

    _.map(this.groups, value => {
      this.values.push(value)
      this.total++
    })
    this.count = 0
    for (let group in this.groups) {

      //console.log(this.values)
      this.single.push({ name: group, value: this.values[this.count] })
      this.count++
    }
  }

  onSelect(event) {
    console.log(event);
  }
}
