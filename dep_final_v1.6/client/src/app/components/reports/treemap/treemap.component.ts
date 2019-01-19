import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-treemap',
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.css']
})
export class TreemapComponent implements OnInit {
  private options
  private dummyData = [{
    name: 'Optimize Scores',
    value: 4,
    colorValue: 1
  }, {
    name: 'Digitize Scores',
    value: 3,
    colorValue: 2
  }, {
    name: 'Expediate Scores',
    value: 7,
    colorValue: 3
  }, {
    name: 'Monitize Scores',
    value: 9,
    colorValue: 4
  }, {
    name: 'Innovation Scores',
    value: 3,
    colorValue: 5
  }]

  constructor() {

  }

  ngOnInit() {
    this.options = {
      chart: {
        height: 400,
        width: 400
      },
      series: [{
        type: 'treemap',

        layoutAlgorithm: 'squarified',
        data: this.dummyData
      }],
      title: {
        text: 'Highcharts Treemap'
      }
    }
  }

}
