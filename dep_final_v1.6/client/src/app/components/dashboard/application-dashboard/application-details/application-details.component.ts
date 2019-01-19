import * as _ from "lodash";
import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css']
})
export class ApplicationDetailsComponent implements OnInit, DoCheck {
  categories: string[];
  makeData() {
    if (this.oldData) {
      this.appData.applications[0].attribute_details.forEach(attr => {
       if(attr.category_type=="general_attributes")
       {
         console.log(attr.value)
         this.details[attr.key]=attr.value
        
       }
      })
      this.categories=Object.getOwnPropertyNames(this.details)
      this.ngOnInit()
      
    }
    
  }
  @Input() appData: any
  oldData
  constructor() { }
  details:any={}
  colors=['light-green darken-2',' teal darken-4',' purple darken-1 ']
  ngOnInit() {
  }

  ngDoCheck() {
    if (this.oldData != this.appData && this.appData) {
      // console.log("received", this.appData.applications)
      this.oldData = this.appData
      this.makeData()
    }
  }
}
