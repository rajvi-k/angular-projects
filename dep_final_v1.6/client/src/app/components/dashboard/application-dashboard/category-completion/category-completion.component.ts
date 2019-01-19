import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import * as _ from "lodash";
@Component({
  selector: 'app-category-completion',
  templateUrl: './category-completion.component.html',
  styleUrls: ['./category-completion.component.css']
})
export class CategoryCompletionComponent implements OnInit, DoCheck {
  categorySelected: any
  chartOption: any

  // ngDoCheck(changes: SimpleChanges): void {
  //   console.log("received",this.appData.applications)
  // }
  single: any[] = [{}]
  multi: any[];

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
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: this.categories
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'value'
        }
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: { show: true },
          data: this.categories
        }
      ],
      series: [
        {
          name: 'Total',
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'right',
              color: 'red'
            }
          },
          data: this.total
        },
        {
          name: 'Completed',
          type: 'bar',
          stack: 'Status',
          label: {
            normal: {
              show: true
            }
          },
          data: this.completed
        },
        {
          name: 'InComplete',
          type: 'bar',
          stack: 'Status',
          label: {
            normal: {
              show: true,
              position: 'left',
              color: "#039be5"
            }
          },
          data: this.incomplete
        }
      ],
      color: ["#2196f3", "#4caf50", "#f44336"],
    };

  }
  makeData() {
    if (this.oldData) {
      _.map(this.oldData.applications[0].attribute_category_completion, (attr: any) => {
        // console.log(attr.category_type)
        this.categories.push(attr.category_type)
        if (attr.completed_fields == 0) {
          this.completed.push('')
        }
        else {
          this.completed.push(attr.completed_fields)
        }
        if (attr.total_fields == 0) {
          this.total.push(0)
        }
        else {
          this.total.push(attr.total_fields)
        }

        if (attr.total_fields == attr.completed_fields) {
          this.incomplete.push('')
        }
        else {
          this.incomplete.push(- (attr.total_fields - attr.completed_fields))
        }
      })
      this.ngOnInit()

    }
  }

  onChartClick(e) {
  //  console.log(this.categories[e.dataIndex]) 
   this.categorySelected=this.categories[e.dataIndex]
  //  console.log(this.categorySelected)
  }
  ngDoCheck() { 
    if (this.oldData != this.appData && this.appData) {
      // console.log("received", this.appData.applications)
      this.oldData = this.appData
      this.makeData()
    }
  }

}
