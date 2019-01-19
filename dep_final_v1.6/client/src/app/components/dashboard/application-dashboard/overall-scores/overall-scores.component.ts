import * as _ from "lodash";
import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';

@Component({
  selector: 'app-overall-scores',
  templateUrl: './overall-scores.component.html',
  styleUrls: ['./overall-scores.component.css']
})
export class OverallScoresComponent implements OnInit {
  dataObj: any=[]

  categorySelected: any
  chartOption: any

  // ngDoCheck(changes: SimpleChanges): void {
  //   console.log("received",this.appData.applications)
  // }
  single: any[] = [{}]
  multi: any[];

  pathSymbols = {
    optimize_scores: 'image://https://image.flaticon.com/icons/png/512/600/600582.png',
    expedite_scores: 'path://M-244.396,44.399c0,0,0.47-2.931-2.427-6.512c2.819-8.221,3.21-15.709,3.21-15.709s5.795,1.383,5.795,7.325C-237.818,39.679-244.396,44.399-244.396,44.399z M-260.371,40.827c0,0-3.881-12.946-3.881-18.319c0-2.416,0.262-4.566,0.669-6.517h17.684c0.411,1.952,0.675,4.104,0.675,6.519c0,5.291-3.87,18.317-3.87,18.317H-260.371z M-254.745,18.951c-1.99,0-3.603,1.676-3.603,3.744c0,2.068,1.612,3.744,3.603,3.744c1.988,0,3.602-1.676,3.602-3.744S-252.757,18.951-254.745,18.951z M-255.521,2.228v-5.098h1.402v4.969c1.603,1.213,5.941,5.069,7.901,12.5h-17.05C-261.373,7.373-257.245,3.558-255.521,2.228zM-265.07,44.399c0,0-6.577-4.721-6.577-14.896c0-5.942,5.794-7.325,5.794-7.325s0.393,7.488,3.211,15.708C-265.539,41.469-265.07,44.399-265.07,44.399z M-252.36,45.15l-1.176-1.22L-254.789,48l-1.487-4.069l-1.019,2.116l-1.488-3.826h8.067L-252.36,45.15z',
    digitalize_scores:'image://https://image.flaticon.com/icons/svg/204/204334.svg',
    monetize_scores: 'image://https://image.flaticon.com/icons/svg/138/138281.svg',
    innovation_scores: 'image://https://image.flaticon.com/icons/svg/413/413781.svg'
  }
  view: any[] = [700, 400];
  categories = []
  total = []
  completed =  []
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

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;

  @Input() appData: any
  oldData

  constructor() {
    // Object.assign(this, {single:[{"name":"hey",value:10}]})   
  }

  ngOnInit() {

    var flag = false
    this.chartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'none'
        },
        formatter: function (params) {
          return params[0].name + ': ' + params[0].value+'%';
        }
      },
      xAxis: {
        data: this.categories,
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          textStyle: {
            color: '#e54035'
          }
        }
      },
      yAxis: {
        splitLine: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: { show: false }
      },
      color: ['#03a9f4','#00e676','#303f9f','#f4511e','#00bcd4'],
      series: [{
        name: 'hill',
        type: 'pictorialBar',
        barCategoryGap: '-130%',
        // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
        itemStyle: {
          normal: {
            opacity: 0.5
          },
          emphasis: {
            opacity: 1
          }
        },
        data: this.total,
        z: 10
      }, {
        name: 'glyph',
        type: 'pictorialBar',
        barGap: '-100%',
        symbolPosition: 'end',
        symbolSize: 50,
        symbolOffset: [0, '-120%'],
        data: this.dataObj
      }]
    };
  }
  makeData() {
    var index
    var score_total
    var number_scores
    if (this.oldData) {
      Object.getOwnPropertyNames(this.oldData.applications[0].scores).forEach(score_cat => {
        this.categories.push(score_cat)
        score_total = 0
        number_scores=0
        _.map(this.oldData.applications[0].scores[score_cat], (score: any) => {
          index = this.categories.indexOf(score_cat)
          number_scores++
          // console.log(score)
          if (isNaN(score)) {
            score_total += Math.random()*5
          }
          else {
            score_total += parseInt(score)
          }
        }
        )
        // console.log(score_cat,score_total)
        this.total.push(Math.round(score_total*100/(number_scores*5)))
        this.dataObj.push({value:Math.round(score_total*100/(number_scores*5)),symbol:this.pathSymbols[score_cat],symbolSize: [50, 50]})
      })
      
      this.ngOnInit()
    }
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


  onChartClick(e) {
    // console.log(this.categories[e.dataIndex])
    this.categorySelected = this.categories[e.dataIndex]
    // console.log(this.categorySelected)
  }
  ngDoCheck() {
    if (this.oldData != this.appData && this.appData) {
      // console.log("received", this.appData.applications)
      this.oldData = this.appData
      this.makeData()
    }
  }
}
