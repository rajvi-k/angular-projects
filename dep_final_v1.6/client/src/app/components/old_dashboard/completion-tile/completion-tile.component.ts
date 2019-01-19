import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-completion-tile',
  templateUrl: './completion-tile.component.html',
  styleUrls: ['./completion-tile.component.css']
})
export class CompletionTileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public doughnutChartLabels: string[] = ['Completed', 'In-complete'];
  public doughnutChartData: number[] = [40,100];
  public doughnutChartType: string = 'doughnut';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
