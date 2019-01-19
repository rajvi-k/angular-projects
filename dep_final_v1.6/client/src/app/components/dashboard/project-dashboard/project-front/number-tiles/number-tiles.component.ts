import { Component, OnInit, Input, OnChanges, AfterViewInit, DoCheck, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import * as _ from "lodash";
import { BiDataService } from '../../../../../services/bi-data.service';
import { Observable } from 'rxjs/Observable';
declare const $


@Component({
  selector: 'app-number-tiles',
  templateUrl: './number-tiles.component.html',
  styleUrls: ['./number-tiles.component.css']
})
export class NumberTilesComponent implements OnInit, AfterViewInit, OnChanges {
  total: any
  ngOnChanges(changes: SimpleChanges): void {
    this.ngAfterViewInit()
  }
  ngAfterViewInit(): void {
    console.log("ab yaha problem hai", this.multi)
    console.log("ab yaha problem hai", this.single)
    Object.assign(this, { single: this.single })
  }

  single = []
  multi = []
  appData = []
  view: any[] = [200, 100];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C']
  };

  constructor(private biSvc: BiDataService) {
    
    this.single = [{ name: "Apps", value: this.total }]
 
    const that = this
    // Object.assign(this, { single: this.single })
  
  
  }
  ngOnInit() {
    const that=this
  }
  onSelect(event) {
    console.log(event);
  }

}
