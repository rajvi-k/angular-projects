import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.collapsible').collapsible();
  }

}
