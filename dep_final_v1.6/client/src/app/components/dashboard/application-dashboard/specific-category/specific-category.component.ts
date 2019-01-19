import * as _ from "lodash";
import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-specific-category',
  templateUrl: './specific-category.component.html',
  styleUrls: ['./specific-category.component.css']
})
export class SpecificCategoryComponent implements OnInit, DoCheck, AfterViewInit {
  ngAfterViewInit() {
    //  this.single=this.multi
    // // Object.assign(this, {single:this.single})   
    // this.ngOnInit()
  }
  dataObj: any = []

  categorySelected: any
  chartOption: any

  // ngDoCheck(changes: SimpleChanges): void {
  //   console.log("received",this.appData.applications)
  // }
  single: any[] = []
  multi: any = {}

  pathSymbols = {
    optimize_scores: 'image://https://www.promodel.com/Content/images/product-icons-optimize.png',
    expedite_scores: 'path://M-244.396,44.399c0,0,0.47-2.931-2.427-6.512c2.819-8.221,3.21-15.709,3.21-15.709s5.795,1.383,5.795,7.325C-237.818,39.679-244.396,44.399-244.396,44.399z M-260.371,40.827c0,0-3.881-12.946-3.881-18.319c0-2.416,0.262-4.566,0.669-6.517h17.684c0.411,1.952,0.675,4.104,0.675,6.519c0,5.291-3.87,18.317-3.87,18.317H-260.371z M-254.745,18.951c-1.99,0-3.603,1.676-3.603,3.744c0,2.068,1.612,3.744,3.603,3.744c1.988,0,3.602-1.676,3.602-3.744S-252.757,18.951-254.745,18.951z M-255.521,2.228v-5.098h1.402v4.969c1.603,1.213,5.941,5.069,7.901,12.5h-17.05C-261.373,7.373-257.245,3.558-255.521,2.228zM-265.07,44.399c0,0-6.577-4.721-6.577-14.896c0-5.942,5.794-7.325,5.794-7.325s0.393,7.488,3.211,15.708C-265.539,41.469-265.07,44.399-265.07,44.399z M-252.36,45.15l-1.176-1.22L-254.789,48l-1.487-4.069l-1.019,2.116l-1.488-3.826h8.067L-252.36,45.15z',
    digitalize_scores: 'image://http://www.ypitdata.com/wp-content/uploads/2016/02/Digitization-e1458611210844.png',
    monetize_scores: 'image://https://icon-icons.com/icons2/560/PNG/512/ROI_icon-icons.com_53750.png',
    innovation_scores: 'image://https://cdn.iconscout.com/public/images/icon/premium/png-512/startup-idea-innovation-business-bulb-big-thing-3aee10fbb532cc98-512x512.png'
  }
  view: any[] = [700, 400];
  categories = []
  total = []
  completed = []
  incomplete = []
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme1 = {
    domain: ['#d32f2f']
  };
  colorScheme2 = {
    domain: ['#4caf50']
  };

  // line, area
  autoScale = true;

  @Input() appData: any
  oldData

  constructor() {

  }

  ngOnInit() {
    Object.assign(this, { single: this.single })
    var flag = false

  }
  makeData() {
    console.log("data in making")
    var index=0
    var score_total
    var number_scores
    if (this.oldData) {
      Object.getOwnPropertyNames(this.oldData.applications[0].scores).forEach(score_category=>{
        console.log(score_category)
        var score_cat = "digitalize_scores"
        this.categories.push(score_category)
        // this.multi={}
        this.multi[score_category]=[]
        Object.getOwnPropertyNames(this.oldData.applications[0].scores[score_category]).forEach(score_type => {
         
          if (isNaN(this.oldData.applications[0].scores[score_category][score_type])) {
            
            this.multi[score_category].push({ name: score_type, value: Math.round(Math.random() * 5) })
          }
          else {
            this.multi[score_category].push({ name: score_type, value: parseInt(this.oldData.applications[0].scores[score_category][score_type]) })
          }

        })
        index++
      })
      
      {
        // console.log(score)
 


      }
      // console.log(this.multi)
      Object.assign(this, { single: this.multi[0] })
      this.ngAfterViewInit()
    }
    this.ngAfterViewInit()
  }
  //   this.categories.push(attr.category_type)
  //   if (attr.completed_fields == 0) {
  //     this.completed.push('')
  //   }
  //   else {
  //     this.completed.push(attr.completed_fields)
  //   }
  //   if (attr.total_fields == 0) {
  //     this.total.push(0)
  //   }
  //   else {
  //     this.total.push(attr.total_fields)
  //   }

  //   if (attr.total_fields == attr.completed_fields) {
  //     this.incomplete.push('')
  //   }
  //   else {
  //     this.incomplete.push(- (attr.total_fields - attr.completed_fields))
  //   }
  // })
  // this.ngOnInit()

  // }

  onSelect(event) {
    console.log(event);
  }
  onChartClick(e) {
    console.log(this.categories[e.dataIndex])
    this.categorySelected = this.categories[e.dataIndex]
    console.log(this.categorySelected)
  }
  ngDoCheck() {
    if (this.oldData != this.appData && this.appData) {
      console.log("received", this.appData.applications)
      this.oldData = this.appData
      this.makeData()
    }
  }


}
