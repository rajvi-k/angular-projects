import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { NgProgress } from 'ngx-progressbar';
import { BiDataService } from '../../../services/bi-data.service';

@Component({
  selector: 'app-application-dashboard',
  templateUrl: './application-dashboard.component.html',
  styleUrls: ['./application-dashboard.component.css']
})
export class ApplicationDashboardComponent implements OnInit {
  app_name: any;
  apps: any;
  busy: Subscription
  appData
  flag: boolean = false
  app_id
  proj_id
  sendData
  constructor(route: ActivatedRoute, private biSvc: BiDataService, public ngProgress: NgProgress) {
    this.app_name = route.snapshot.params.app_name;
    this.apps = route.snapshot.data["app_data"].appData
    this.proj_id = route.snapshot.params.proj_id
    // console.log(this.app_id, this.proj_id)
    // console.log("resolver", this.apps)
  }

  ngOnInit() {
    this.ngProgress.start();
    const that = this
    this.busy = this.biSvc.getAppById(this.proj_id, this.app_name).subscribe(
      (data) => {
        // console.log(data)
        that.appData = data

        that.flag = true

        setTimeout(function () {
          if (that.flag) {
            
            // console.log("after subscribe", that.sendData, that.appData)

          }
        }, 1000)

      },
      (err) => { console.log("error") },
      () => {
        // console.log("complete"),
          that.ngProgress.done()
          // console.log("in complete",that.appData)
          that.sendData = that.appData
      }
    )

  }

}
