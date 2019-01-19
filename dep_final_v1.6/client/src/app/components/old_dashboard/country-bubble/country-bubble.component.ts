import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-country-bubble',
  templateUrl: './country-bubble.component.html',
  styleUrls: ['./country-bubble.component.css']
})
export class CountryBubbleComponent implements OnInit {
  ngOnInit() {

  }

  point: any;
  title = 'app';
  options: Object;
  to;
  from;
  constructor() {
    this.options = {
      chart: {
        height: 200,
        width:250,
        type: 'pyramid'
      },
      title: {
        text: 'Pyramid'
    },
      plotOptions: {
        series: {
          dataLabels: { 
            enabled: false, 
            format: '<b>{point.name}</b>({point.y:,.0f})',
            softConnector: true
          },
          center: ['40%', '50%'],
          width: '80%'
        }
      },
      legend: {
        enabled: false
      },
      series: [{
        name: 'Number of Apps',
        data: [
          ['GBR', 30],
          ['USA', 70],
          ['Global', 40],
        ]
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

}
