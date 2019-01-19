import { Component, OnInit, Input, OnChanges, AfterViewInit, DoCheck, ChangeDetectionStrategy } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import * as _ from "lodash";
import { Observable } from 'rxjs/Observable';
import { BiDataService } from '../../../../../../services/bi-data.service';

declare const $

@Component({
  selector: 'app-storage-type',
  templateUrl: './storage-type.component.html',
  styleUrls: ['./storage-type.component.css']
})
export class StorageTypeComponent implements OnInit,DoCheck {
  dataObj2: any=[]
  seriesdata2: any[]=[]
  labels2: any[]=[]

  status: boolean;
  changelog: any=[]
  appData
  dataObj=[]

  @Input() projectId
  @Input() selectedAppNames
  @Input() selectedEvent
  oldselectedEvent
  DocheckCount = 0;
  oldSelectedNames = []
  chartOption: any
  key = "storage_type"
  key2="storage_product_and_version"
  values: any[];
  count: number;
  group: any
  labels = []
  seriesdata = []
  constructor(private biSvc: BiDataService) {

  }
  ngDoCheck() {

      // console.log("checking for changes")
      this.DocheckCount++;

      if (this.selectedEvent != this.oldselectedEvent) {
          {
              this.seriesdata=[]
              this.labels=[]
              this.labels2=[]
              this.seriesdata2=[]
              console.log("checking for changes")
              // console.log("detected", this.oldSelectedNames, this.selectedAppNames)
              const changeLog = `Do Check from ${this.oldSelectedNames.length} to ${this.selectedAppNames.length}`
              // console.log("detected",this.oldSelectedNames,this.selectedAppNames)
              this.changelog.push(changeLog);
              this.status = true
              console.log("calling")
              const that = this
             
              this.count = 0
              this.values = []

              this.biSvc.getSingleApp(this.selectedAppNames,this.projectId).subscribe(apps => {
                  that.appData = apps
                  setTimeout(function () {
                      //  console.log(JSON.stringify(that.appData))
                      that.appData.forEach((data, count = 0) => {
                          count++
                          var index = -1
                          data.attribute_details.forEach(attr => {
                              // console.log(that.key,"compare to",attr.key)
                              if (attr.key == that.key) {
                                  if (attr.value == "") {
                                      if (that.labels.indexOf("N/A") == -1) {
                                          that.labels.push("N/A")
                                          that.seriesdata.push(1)
                                      }
                                      else if (attr.value == "") {
                                          index = that.labels.indexOf("N/A")
                                          that.seriesdata[index]++

                                      }
                                  }
                                  // console.log(JSON.stringify(attr.value))
                                  else if (attr.value != "") {
                                      if (that.labels.indexOf(attr.value) == -1) {
                                          that.labels.push(attr.value)
                                          that.seriesdata.push(1)
                                      }
                                      else {
                                          index = that.labels.indexOf(attr.value)
                                          that.seriesdata[index]++
                                      }
                                  }

                              }
                          })

                      })

                

                  }, 1500)

                  console.log("yo", JSON.stringify(that.appData))
              }
              )
              this.biSvc.getSingleApp(this.selectedAppNames,this.projectId).subscribe(apps => {
                that.appData = apps
                setTimeout(function () {
                    //  console.log(JSON.stringify(that.appData))
                    that.appData.forEach((data, count = 0) => {
                        count++
                        var index = -1
                        data.attribute_details.forEach(attr => {
                            // console.log(that.key,"compare to",attr.key)
                            if (attr.key == that.key2) {
                                if (attr.value == "") {
                                    if (that.labels2.indexOf("N/A") == -1) {
                                        that.labels2.push("N/A")
                                        that.seriesdata2.push(1)
                                    }
                                    else if (attr.value == "") {
                                        index = that.labels2.indexOf("N/A")
                                        that.seriesdata2[index]++
        
                                    }
                                }
                                // console.log(JSON.stringify(attr.value))
                                else if (attr.value != "") {
                                    if (that.labels2.indexOf(attr.value) == -1) {
                                        that.labels2.push(attr.value)
                                        that.seriesdata2.push(1)
                                    }
                                    else {
                                        index = that.labels2.indexOf(attr.value)
                                        that.seriesdata2[index]++
                                    }
                                }
        
                            }
                        })
        
                    })
        
                    that.ngAfterViewInit()
        
                }, 1500)
        
                console.log("yo", JSON.stringify(that.appData))
            }
            )
          }
          this.oldSelectedNames = this.selectedAppNames
          this.oldselectedEvent = this.selectedEvent

      }

  }
  ngOnInit() {
    this.seriesdata=[]
    this.labels=[]
    this.labels2=[]
    this.seriesdata2=[]
      const that = this
      // this.biSvc.getSingleApp(this.selectedAppNames).subscribe(apps => {
      //     that.appData = apps
      

      //     console.log("yo", JSON.stringify(that.appData))
      // }
      // )
      this.biSvc.getSingleApp(this.selectedAppNames,this.projectId).subscribe(apps => {
        that.appData = apps
        setTimeout(function () {
          //  console.log(JSON.stringify(that.appData))
          that.appData.forEach((data, count = 0) => {
              count++
              var index = -1
              data.attribute_details.forEach(attr => {
                  // console.log(that.key,"compare to",attr.key)
                  if (attr.key == that.key) {
                      if (attr.value == "") {
                          if (that.labels.indexOf("N/A") == -1) {
                              that.labels.push("N/A")
                              that.seriesdata.push(1)
                          }
                          else if (attr.value == "") {
                              index = that.labels.indexOf("N/A")
                              that.seriesdata[index]++

                          }
                      }
                      // console.log(JSON.stringify(attr.value))
                      else if (attr.value != "") {
                          if (that.labels.indexOf(attr.value) == -1) {
                              that.labels.push(attr.value)
                              that.seriesdata.push(1)
                          }
                          else {
                             var index = that.labels.indexOf(attr.value)
                              that.seriesdata[index]++
                          }
                      }

                  }
              })

          })


      }, 1500)
        setTimeout(function () {
            //  console.log(JSON.stringify(that.appData))
            that.appData.forEach((data, count = 0) => {
                count++
                var index = -1
                data.attribute_details.forEach(attr => {
                    // console.log(that.key,"compare to",attr.key)
                    if (attr.key == that.key2) {
                        if (attr.value == "") {
                            if (that.labels2.indexOf("N/A") == -1) {
                                that.labels2.push("N/A")
                                that.seriesdata2.push(1)
                            }
                            else if (attr.value == "") {
                              var  index = that.labels2.indexOf("N/A")
                                that.seriesdata2[index]++

                            }
                        }
                        // console.log(JSON.stringify(attr.value))
                        else if (attr.value != "") {
                            if (that.labels2.indexOf(attr.value) == -1) {
                                that.labels2.push(attr.value)
                                that.seriesdata2.push(1)
                            }
                            else {
                               var index = that.labels2.indexOf(attr.value)
                                that.seriesdata2[index]++
                            }
                        }

                    }
                })

            })

            that.ngAfterViewInit()

        }, 1500)

        console.log("yo", JSON.stringify(that.appData))
    }
    )



  }

  ngAfterViewInit() {
    this.dataObj=[]
    this.dataObj2=[]
    this.labels.forEach((label,index)=>{
      this.dataObj.push({value:this.seriesdata[index],name:label})
    })
    this.labels2.forEach((label,index)=>{
      this.dataObj2.push({value:this.seriesdata2[index],name:label})
    })
      this.chartOption =  {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        // legend: {
        //     orient: 'vertical',
        //     x: 'left',
        //     data:this.labels
        // },
        toolbox: {
          show: true,
          feature: {
              restore: { title: "Refresh", show: true },
              saveAsImage: { title: "Save", type: "jpeg", show: true }
          }
      },
        series: [
            {
                name:'Database Type',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '30%'],
    
                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:this.dataObj.sort().reverse()
            },
            {
                name:'Product',
                type:'pie',
                radius: ['50%', '65%'],
                data:this.dataObj2.sort().reverse(),
                clockwise:false
                
            }
        ]
    };
  }
  onChartClick(e) {
      console.log(e)
  }


}
