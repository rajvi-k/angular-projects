import { Component, Input, OnChanges, OnInit, SimpleChanges, SimpleChange, DoCheck } from '@angular/core';
import { BiDataService } from '../../../../services/bi-data.service';

@Component({
  selector: 'app-project-front',
  templateUrl: './project-front.component.html',
  styleUrls: ['./project-front.component.css']
})
export class ProjectFrontComponent implements OnInit, DoCheck {
  changelog: any = []

  @Input() projectId
  @Input() selectedApps
  @Input() eventInput
  oldSelectedNames
  oldeventInput
  selectedAppNames
  selectedEvent
  DocheckCount = 0;

  constructor(private biSvc: BiDataService) {
    // this.selectedApps=this.selectedApps
    this.oldSelectedNames = this.selectedApps
   
    // this.appData=this.biSvc.getSingleApp("All Applications")
  }

  ngDoCheck(): void {
    if (this.oldeventInput !== this.eventInput) {
      // this.oldSelectedNames=this.selectedApps
      console.log("How you doin? ",this.projectId)
      this.DocheckCount++;
      console.log("hey again")
      const changeLog = `Do Check from ${this.oldSelectedNames} to ${this.selectedApps}`
      this.changelog.push(changeLog);
      console.log("old",this.oldSelectedNames,"selected",this.selectedApps)
      
      this.selectedAppNames = this.selectedApps
      this.selectedEvent=this.eventInput
      this.oldeventInput=this.eventInput

    }
  

  }
  // ngOnChanges() {
  // // console.log("change", this.selectedApps)
  //   // this.selectedAppNames=this.selectedApps
  //   // // console.log("changed",this.selectedAppNames)

  // }
  ngOnInit() {
    console.log("How you doin? ",this.projectId)
    this.selectedEvent=this.eventInput
      this.selectedAppNames =this.selectedApps
    this.oldSelectedNames = this.selectedApps
    // console.log(this.appData)
    console.log("front-OLD", this.oldSelectedNames)
    console.log("front", this.selectedApps)
  }


}
