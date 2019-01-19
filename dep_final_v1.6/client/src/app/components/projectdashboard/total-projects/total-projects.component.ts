import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-total-projects',
  templateUrl: './total-projects.component.html',
  styleUrls: ['./total-projects.component.css']
})
export class TotalProjectsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public doughnutChartLabels: string[] = ['Completed', 'In-complete'];
  public doughnutChartData: number[] = [12, 8];
  public doughnutChartType: string = 'doughnut';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
