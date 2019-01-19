import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-score-gauge',
  templateUrl: './score-gauge.component.html',
  styleUrls: ['./score-gauge.component.css']
})
export class ScoreGaugeComponent implements OnInit {

  point: any;
  title = 'app';
  options: Object;
  to;
  from;
  constructor() {
    this.options = {

      chart: {
        type: 'solidgauge',
        marginTop:50,
        height:200,
        width:250
      },

      title: {
        text: 'Apps in Score Range  ',
        style: {
          fontSize: '16px'
        }
      },

      tooltip: {
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        style: {
          fontSize: '16px'
        },
        pointFormat: '{series.name}<br><span style="font-size:1em; color: {point.color}; font-weight: bold">{point.y}%</span>',
        positioner: function (labelWidth) {
          return {
            x: 125 - labelWidth / 2,
            y: 100
          };
        }
      },

      pane: {
        startAngle: 0,
        endAngle: 360,
        background: [{ // Track for Move
          outerRadius: '112%',
          innerRadius: '88%',
          backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0]),
          borderWidth: 0
        }, { // Track for Exercise
          outerRadius: '87%',
          innerRadius: '63%',
          backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1]),
          borderWidth: 0
        }, { // Track for Stand
          outerRadius: '62%',
          innerRadius: '38%',
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
        name: '100-150',
        data: [{
          color: Highcharts.getOptions().colors[0],
          radius: '112%',
          innerRadius: '88%',
          y: 80
        }]
      }, {
        name: '50-100',
        data: [{
          color: Highcharts.getOptions().colors[1],
          radius: '87%',
          innerRadius: '63%',
          y: 65
        }]
      }, {
        name: '10-50',
        data: [{
          color: Highcharts.getOptions().colors[2],
          radius: '62%',
          innerRadius: '38%',
          y: 50
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

        // Exercise icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8,
          'M', 8, -8, 'L', 16, 0, 8, 8])
          .attr({
            'stroke': '#ffffff',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': 2,
            'zIndex': 10
          })
          .translate(190, 61)
          .add(this.series[2].group);

        // Stand icon
        this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
          .attr({
            'stroke': '#303030',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': 2,
            'zIndex': 10
          })
          .translate(190, 96)
          .add(this.series[2].group);
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
