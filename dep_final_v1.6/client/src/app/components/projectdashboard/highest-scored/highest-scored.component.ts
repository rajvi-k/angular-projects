import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-highest-scored',
  templateUrl: './highest-scored.component.html',
  styleUrls: ['./highest-scored.component.css']
})
export class HighestScoredComponent implements OnInit {

  point: any;
  title = 'app';
  options: Object;
  to;
  from;
  constructor() {
    this.options =
    {
      chart: {
          type: 'bar',
          height:400,
          width:400
      },
      title: {
          text: 'Highest vs Lowest Scored project',
          font:"20px"
      },
      xAxis: {
          categories: ['Score'],
          title: {
              text: null
          }
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Score',
              align: 'high'
          },
          labels: {
              overflow: 'justify'
          }
      },
      tooltip: {
          valueSuffix: ' millions'
      },
      plotOptions: {
          bar: {
              dataLabels: {
                  enabled: true
              }
          }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor: '#FFFFFF',
          shadow: true
      },
      credits: {
          enabled: false
      },
      series: [{
          name: 'Highest',
          data: [150]
      },
       {
          name: 'Lowest',
          data: [50]
      }]
  }
  }
  onChartSelection(e) {
    this.from = e.originalEvent.xAxis[0].min.toFixed(2);
    this.to = e.originalEvent.xAxis[0].max.toFixed(2);
  }
  onPointSelect(e) {
    this.point = e.context.y;
  }

  ngOnInit() {
  }

}
