import { Component, OnInit, Input } from '@angular/core';
declare const $
import * as _ from "lodash";
import { BiDataService } from '../../../../../services/bi-data.service';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";

@Component({
  selector: 'app-system-interface',
  templateUrl: './system-interface.component.html',
  styleUrls: ['./system-interface.component.css']
})
export class SystemInterfaceComponent implements OnInit {
  status: boolean = false
  changelog: any = []


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
  key = "os";

  values: any[];
  count: number;
  group: any
  total = 0;
  single = []
  viewZoom: any[] = [500, 400]
  legendZoom = false
  view: any[] = [300, 250];

  // options
  showLabels = true;
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Number of Apps';
  showYAxisLabel = true;
  yAxisLabel = 'OS';

  colorScheme = {
    domain: ['#00E676', "#40C4FF", "#E53935"]
  };
  groups: any = {}


  constructor(private router: Router, private biSvc: BiDataService) {

    this.single = []
    this.total = 0


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
                  if (attr.key.trim() == that.key.trim()) {
                    // console.log(JSON.stringify(attr.value))
                    if (!that.groups.hasOwnProperty(attr.value.trim())) {
                      if (attr.value.trim() == "") {
                        that.groups["N/A"] = 1
                      }
                      else {
                        that.groups[attr.value.trim()] = 1
                      }
      
                    }
                    else if (that.groups.hasOwnProperty(attr.value.trim())) {
                      if (attr.value == "") {
                        that.groups["N/A"]++
                      }
                      else {
                        that.groups[attr.value.trim()]++
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
