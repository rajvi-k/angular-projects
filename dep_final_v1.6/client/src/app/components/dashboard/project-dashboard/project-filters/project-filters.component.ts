import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import * as _ from "lodash";

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { BiDataService } from '../../../../services/bi-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
declare const $
@Component({
  selector: 'app-project-filters',
  templateUrl: './project-filters.component.html',
  styleUrls: ['./project-filters.component.css']
})
export class ProjectFiltersComponent implements OnInit, AfterViewInit {
  flagFilter: boolean = false
  //output
  project_details_data: any;
  eventInput
  selectedAppNames: string[]

  //variables
  NewChipOptions: any[];
  currentSelectedNames: string[];
  prevSelectedChip: "All Applications";
  project_id
  appDataAsync: Observable<any>;
  myControl: FormControl = new FormControl();
  options = [];
  changedStatus = false
  filteredOptions: Observable<string[]>;
  appNames: any
  selectedAppObj
  appData
  chipOptions: any[]

  //filter variables
  businessCriticallyList = [];
  countryOfUsageList = [];
  userTypeList = [];
  osList = [];
  storageType = [];
  paceLayerCategory = [];
  ApplicationName: string[]
  bcItems = [];
  couItems = [];
  utItems = [];
  osItems = [];
  stItems = [];
  plcItems = [];
  dropdownSettings = {};
  bcitem = [];

  constructor(private biSvc: BiDataService, private router: Router, private route: ActivatedRoute) {
    // console.log(this.biSvc.getAllApplicationsName())
    this.appNames = this.route.snapshot.data["project_data"].names
    this.project_id = this.route.snapshot.data["project_data"].project_id
    // console.log(this.biSvc.getProjectDescription("P6"))
    console.log("XXXXXXXXXXX", this.project_id)
    this.options = this.appNames
    this.selectedAppNames = []
    this.currentSelectedNames = []
    this.chipOptions = [{
      app: "All Applications",
      tag: "All Applications"
    }]
    this.NewChipOptions = []
    // this.appData = this.biSvc.getSingleApp("Sophia")
    // console.log(this.appData)
    // console.log(this.appNames)
    // this.appNames=this.biSvc.getAllApplicationsName()
  }

  ngOnInit() {
    this.businessCriticallyList = [
      { "id": 1, "itemName": "Administrative Service" },
      { "id": 2, "itemName": "Business Critical" },
      { "id": 3, "itemName": "Business Operational" },
    ];
    this.countryOfUsageList = [
      { "id": 4, "itemName": "US" },
      { "id": 5, "itemName": "UK" },
      { "id": 6, "itemName": "China" },
      { "id": 7, "itemName": "Japan" },
      { "id": 8, "itemName": "Sydney" },
    ];
    this.userTypeList = [
      { "id": 9, "itemName": "End User" },
      { "id": 10, "itemName": "Business User" },
    ];
    this.osList = [
      { "id": 11, "itemName": "Windows" },
      { "id": 12, "itemName": "Linux" },
    ];
    this.storageType = [
      { "id": 13, "itemName": "RDBMS" },
      { "id": 14, "itemName": "NoSQL" }
    ];
    this.paceLayerCategory = [
      { "id": 15, "itemName": "SoD" },
      { "id": 16, "itemName": "SoR" },
      { "id": 17, "itemName": "SoE" },
    ];
    this.dropdownSettings = {
      singleSelection: false,
      text: "All",
      enableCheckAll: false,
      enableSearchFilter: false,
      classes: "myclass custom-class"
    };


    //appnames from resolver
    this.appNames = new Observable(this.route.snapshot.data["project_data"].names)
    this.project_details_data = this.route.snapshot.data["project_data"].description
    console.log("i'm here", this.project_details_data)
    const that = this
    this.selectedAppNames = ["All Applications"]
    $('.chips').material_chip();
    $(document).ready(function () {
      $('select').material_select();
    });
    $('.chips').on('chip.delete', function (e, chip) {
      console.log("deleting", chip)
      that.changedStatus = false
      // var index = 0
      _.map(that.chipOptions, (option: any, index) => {

        // console.log(option, index)
        // if(chip.tag=="All Applications")
        //   {

        //   }
        if (option.tag == chip.tag) {
          console.log("before deleting", option.tag, index, chip.tag)
          that.chipOptions.splice(index, index + 1)
          that.currentSelectedNames.splice(index, index + 1)
          console.log("after deleting", that.currentSelectedNames)
          that.changedStatus = true
          that.selectedAppNames = that.currentSelectedNames
          that.eventInput = e
        }

      })
      // that.selectedAppNames=that.currentSelectedNames
      // that.changedStatus=true
      // that.ngAfterViewInit()
    });
    $('.chips').on('chip.select', function (e, chip) {
      console.log("selected", chip)
      if (chip.app == "All Applications") {
        alert("Select Single App")
      }
      else {
        that.router.navigate(['/dashboard','project', that.project_id, 'apps', chip.app]);
      }
    });

    // console.log(that.chipOptions)
    // console.log(that.selectedAppNames)

    this.filteredOptions = this.myControl.valueChanges
      .startWith('')
      .map(val => this.filter(val));

    // this.appData=
    // console.log(this.biSvc.getSingleApp(this.selectedAppNames))

    // .subscribe(app=>{
    //   console.log(app)
    //   this.appData=app
    // })
    // this.appDataAsync= this.biSvc.getSingleApp(this.selectedAppNames)
    // that.selectedAppNames=that.currentSelectedNames

  }
  ngAfterViewInit() {
    // this.selectedAppNames = this.currentSelectedNames
    console.log("after", this.chipOptions)
    $('.chips').material_chip({
      placeholder: 'Select an App',
      secondaryPlaceholder: 'Delete All Applications',
      data: this.chipOptions
    });
  }
  trying(event, option) {
    this.eventInput = event
    console.log("hey", event, "selected", option)
  }

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  // this.appNames.subscribe(data=>{
  addAppToChips(event, apps) {
    var flag = false
    this.changedStatus = false
    if (event.source.selected) {
      _.map(this.currentSelectedNames, appnames => {
        console.log("there", appnames)
        if (appnames == apps) {
          console.log("repated")
          flag = true;
        }

      })
      if (!flag) {

        this.prevSelectedChip = apps
        console.log("selected", apps)
        this.currentSelectedNames.push(apps)
        console.log("why?", this.currentSelectedNames)

        this.NewChipOptions.push({ app: apps, tag: apps })
        this.selectedAppNames = this.currentSelectedNames
        this.changedStatus = true
        this.chipOptions = this.NewChipOptions
        this.ngAfterViewInit()

      }
      // this.selectedAppNames = this.currentSelectedNames
      console.log(this.selectedAppNames)
      console.log(this.currentSelectedNames)

      // this.selectedAppNames=this.currentSelectedNames


    }
    console.log("onselect", event, apps)
    if (this.flagFilter) {
      flag = false
      if (event.source.selected) {
        _.map(this.currentSelectedNames, appnames => {
          console.log("there", appnames)
          if (appnames == apps) {
            console.log("repated")
            flag = true;
          }

        })
        if (!flag) {

          this.prevSelectedChip = apps
          console.log("selected", apps)
          this.currentSelectedNames.push(apps)
          console.log("why?", this.currentSelectedNames)

          this.NewChipOptions.push({ app: apps, tag: apps })
          this.selectedAppNames = this.currentSelectedNames
          this.changedStatus = true
          this.chipOptions = this.NewChipOptions
          this.ngAfterViewInit()
          
        }
        // this.selectedAppNames = this.currentSelectedNames
        console.log(this.selectedAppNames)
        console.log(this.currentSelectedNames)

        // this.selectedAppNames=this.currentSelectedNames


      }
    }
  }

  //filter events
  onItemSelect(item: any) {

    this.bcitem.push(item.itemName);
    this.biSvc.getBCItem(this.bcitem);
    this.onclick()
    this.selectedAppNames = this.ApplicationName;
    this.eventInput = event

  }
  OnItemDeSelect(item: any) {
    this.bcitem.splice(this.bcitem.indexOf(item.itemName), 1);
    this.biSvc.getBCItem(this.bcitem);
    this.onclick()
    // this.currentSelectedNames=this.ApplicationName;
    //  this.selectedAppNames=this.ApplicationName;
    this.eventInput = event

  }
  onclick() {
    this.ApplicationName = this.biSvc.getAllFilterAppName(this.project_id)
    console.log("onclick:", this.ApplicationName);
    this.options = this.ApplicationName;
    // this.currentSelectedNames=this.ApplicationName
    this.selectedAppNames = this.ApplicationName;
    // this.eventInput=event
    this.flagFilter = true
    // var filteredOptions=[{
    //   app: "Filters Applied",
    //   tag: "Filters Applied"
    // }]
    // this.chipOptions = filteredOptions
    this.ngOnInit()

  }



}
