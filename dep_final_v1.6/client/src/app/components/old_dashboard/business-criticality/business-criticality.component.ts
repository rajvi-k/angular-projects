import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-criticality',
  templateUrl: './business-criticality.component.html',
  styleUrls: ['./business-criticality.component.css']
})
export class BusinessCriticalityComponent implements OnInit {

  constructor() { }

  public polarAreaChartLabels: string[] = ['Critical',"Not Critical","Missoin Critcal"];
  public polarAreaChartData: number[] = [60, 30, 50];
  public polarAreaLegend: boolean = true;

  public polarAreaChartType: string = 'polarArea';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  ngOnInit() {
  }

}
