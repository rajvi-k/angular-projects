import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main-report',
  templateUrl: './main-report.component.html',
  styleUrls: ['./main-report.component.css']
})
export class MainReportComponent implements OnInit {


  private percent
  private status
  private score
  constructor() {
    this.percent = 80;
    this.status = 'Delayed'
    this.score = 29
  }

  ngOnInit() {
  }

}
