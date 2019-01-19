import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

declare const $
@Component({
  selector: 'view-project-version',
  templateUrl: './view-project-version.component.html',
  styleUrls: ['./view-project-version.component.css']
})
export class ViewProjectVersionComponent implements OnInit {
  
  projectd;
  attrlabels=[];
  appnames=[];
  constructor( private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let project = this.route.snapshot.data['project'];
    this.projectd=project
    console.log(this.projectd)
    
    this.projectd.attribute_details.map(data=>{
      
      if(data.label !="Application Id"){
        this.attrlabels.push(data.label)  
      }
      // console.log("data is here",data.label)
    })

    this.projectd.applications.map(data=>{
      this.appnames.push(data.application_name)  
     console.log("data is here", this.appnames)
    })
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
  }
 
 
}
