import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-bar-chart',
  templateUrl: './ui-bar-chart.component.html',
  styleUrls: ['./ui-bar-chart.component.css']
})
export class UiBarChartComponent implements OnInit {
  private options
  private dummy

  constructor() {
    this.dummy = [{
      name: 'Mobile',
      weight: 20
    }, {
      name: 'Desktop',
      weight: 15
    }, {
      name: 'Mobile Desktop',
      weight: 20
    },
    {
      name: 'Browser',
      weight: 25
    },
    {
      name: 'Browser Desktop',
      weight: 20
    }, {
      name: 'All',
      weight: 20
    },
    {
      name: 'Mobile Browser',
      weight: 10
    }

    ]
  }


  ngOnInit() {
    this.options = {

      series: [{
        type: 'wordcloud',
         height:500,
        width:400,
        data: this.dummy,
        point: {
          events: {
            click: function () {
              var abc = this.category
            }
          }
        }
      }],
      title: {
        text: 'UI Type '
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 400
            
          },
          chartOptions: {
            
              chart:{
                type:"bar",
                height:200,
                width:200
              }
              
            
          }
        }]
      }
    }


  }
}
