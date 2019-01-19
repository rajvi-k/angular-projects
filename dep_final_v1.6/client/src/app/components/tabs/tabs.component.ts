import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $('ul.tabs').tabs();
    });
  }

}
