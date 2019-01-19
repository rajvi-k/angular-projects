import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'ui-demo',
  templateUrl: './ui-demo.component.html',
  styleUrls: ['./ui-demo.component.css']
})

export class UiDemoComponent implements OnInit {
 

  constructor() { }
  title = 'app';
  private messages:Array<any> = [];
  ngOnInit() {

  $('.modal').modal();
  $('.collapsible').collapsible();
  // for(let i = 0; i < 6; i++) {
  //   this.messages.push({
  //     firstName: `ProjectName-${i}`,
  //     lastName: `lastName-${i}`,
  //     empId: Math.floor(Math.random()*1000)
  //   })
   
  // }

}

}
