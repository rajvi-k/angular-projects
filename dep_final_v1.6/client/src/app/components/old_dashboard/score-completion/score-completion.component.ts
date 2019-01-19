import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-score-completion',
  templateUrl: './score-completion.component.html',
  styleUrls: ['./score-completion.component.css']
})
export class ScoreCompletionComponent implements OnInit {
  point: any;
  title = 'app';
  options: Object;
  to;
  from;
  constructor() {
    this.options = {
      chart: {
        type: 'pie',
        height:365,
        width:400,
        options3d: {
          enabled: true,
          alpha: 45
        },
        responsive: {
          rules: [{
            condition: {
              maxWidth: 300
            },
            chartOptions: {
              legend: {
                enabled: false
              }
            }
          }]
        }
      },
      colors: ['#2196f3','#f44336 '],
      title: {
        text: 'Number of Apps'
      },
      subtitle: {
        text: 'With completed score'
      },
      plotOptions: {
        pie: {
          innerSize: 100,
          depth: 45
        }
      },
      series: [{
        name: 'Delivered amount',
        data: [
          ['Completed',90],
          ['Un-complete',70]
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





  ngOnInit() {
  }

}
