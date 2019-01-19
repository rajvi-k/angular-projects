import { Component, OnInit, Input, OnChanges, AfterViewInit, DoCheck, ChangeDetectionStrategy } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import * as _ from "lodash";
import { BiDataService } from '../../../../../services/bi-data.service';
import { Observable } from 'rxjs/Observable';
declare const $


@Component({
  selector: 'app-business-criticality',
  templateUrl: './business-criticality.component.html',
  styleUrls: ['./business-criticality.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class BusinessCriticalityComponent implements OnInit,DoCheck, AfterViewInit {
  status: boolean = false
  changelog: any = []



  @Input() projectId
  @Input() selectedAppNames
  @Input() selectedEvent
  oldselectedEvent
  DocheckCount = 0;
  oldSelectedNames = []
  appDataAsync: Observable<any>;
  observer: any;
  appData: any[] = []
  // appDataAsync: Observable<any>;
  key = "business_critically";

  values: any[];
  count: number;
  group: any
  total = 0;
  single = []
  viewZoom: any[] = [500, 400]
  legendZoom = false
  view: any[] = [400, 250];

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
    domain: ['#00E676', "#40C4FF", "#E53935"]
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
        console.log("checking for changes")
        // console.log("detected", this.oldSelectedNames, this.selectedAppNames)
        const changeLog = `Do Check from ${this.oldSelectedNames.length} to ${this.selectedAppNames.length}`
        // console.log("detected",this.oldSelectedNames,this.selectedAppNames)
        this.changelog.push(changeLog);
        this.status = true
        console.log("calling")
        const that = this
        this.single = []
        this.total = 0
        this.groups = {}
        this.count = 0
        this.values = []
    
        this.biSvc.getSingleApp(this.selectedAppNames,this.projectId).subscribe(apps => {
    
          that.appData = apps
          setTimeout(function () {
            //  console.log(JSON.stringify(that.appData))
            that.appData.forEach((data, count = 0) => {
              count++
              data.attribute_details.forEach(attr => {
                // console.log(that.key,"compare to",attr.key)
                if (attr.key == that.key) {
                  // console.log(JSON.stringify(attr.value))
                  if (!that.groups.hasOwnProperty(attr.value)) {
                    if (attr.value == "") {
                      that.groups["N/A"] = 1
                    }
                    else {
                      that.groups[attr.value] = 1
                    }
    
                  }
                  else if (that.groups.hasOwnProperty(attr.value)) {
                    if (attr.value == "") {
                      that.groups["N/A"]++
                    }
                    else {
                      that.groups[attr.value]++
                    }
                  }
                }
              })
            })
            that.ngAfterViewInit()
           
          }, 1500)
      
          console.log("yo", JSON.stringify(that.appData))
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
    this.groups = {}
    this.count = 0
    this.values = []
    this.biSvc.getSingleApp(this.selectedAppNames,this.projectId).subscribe(apps => {
      
            that.appData = apps
            setTimeout(function () {
              //  console.log(JSON.stringify(that.appData))
              that.appData.forEach((data, count = 0) => {
                count++
                data.attribute_details.forEach(attr => {
                  // console.log(that.key,"compare to",attr.key)
                  if (attr.key == that.key) {
                    // console.log(JSON.stringify(attr.value))
                    if (!that.groups.hasOwnProperty(attr.value)) {
                      if (attr.value == "") {
                        that.groups["N/A"] = 1
                      }
                      else {
                        that.groups[attr.value] = 1
                      }
      
                    }
                    else if (that.groups.hasOwnProperty(attr.value)) {
                      if (attr.value == "") {
                        that.groups["N/A"]++
                      }
                      else {
                        that.groups[attr.value]++
                      }
                    }
                  }
                })
              })
              that.ngAfterViewInit()
             
            }, 1500)
        
            console.log("yo", JSON.stringify(that.appData))
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

      console.log(this.values)
      this.single.push({ name: group, value: this.values[this.count] })
      this.count++
    }
  }

  onSelect(event) {
    console.log(event);
  }
}
