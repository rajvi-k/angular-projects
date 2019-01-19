import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  private options
  constructor() { }

  ngOnInit() {
    this.options = {
      chart: {
        type: 'solidgauge',
        marginTop: 50
      },

      title: {
        text: 'Form Progress',
        style: {
          fontSize: '24px'
        }
      },

      tooltip: {
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        style: {
          fontSize: '16px'
        },
        pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold"><pre>     </pre>{point.y}%</span>',
        positioner: function (labelWidth) {
          return {
            x: 245,
            y: 180
          };
        }
      },

      pane: {
        startAngle: 0,
        endAngle: 360,
        background: [{ // Track for Progress
          outerRadius: '112%',
          innerRadius: '88%',
          backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[2]),
          borderWidth: 0
        }]
      },

      yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: []
      },

      plotOptions: {
        solidgauge: {
          dataLabels: {
            enabled: false
          },
          linecap: 'round',
          stickyTracking: false,
          rounded: true
        }
      },

      series: [{
        name: 'Completed Form',
        data: [{
          color: Highcharts.getOptions().colors[2],
          radius: '112%',
          innerRadius: '88%',
          y: 80
        }]
      }]
    },

      /**
       * In the chart load callback, add icons on top of the circular shapes
       */
      function callback() {

        // Move icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
          .attr({
            'stroke': '#303030',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': 2,
            'zIndex': 10
          })
          .translate(190, 26)
          .add(this.series[2].group);
      }
  }
}
