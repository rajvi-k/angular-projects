import { Component, OnInit, Input, OnChanges, AfterViewInit, DoCheck, ChangeDetectionStrategy } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import * as _ from "lodash";
import { Observable } from 'rxjs/Observable';
import { BiDataService } from '../../../../../../services/bi-data.service';

declare const $

@Component({
    selector: 'app-lti-owner',
    templateUrl: './lti-owner.component.html',
    styleUrls: ['./lti-owner.component.css']
})
export class LtiOwnerComponent implements OnInit ,DoCheck{
    status: boolean;
    changelog: any=[]
    appData

    @Input() projectId
    @Input() selectedAppNames
    @Input() selectedEvent
    oldselectedEvent=''
    DocheckCount = 0;
    oldSelectedNames = []
    chartOption: any
    key = "owner"
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

                        that.ngAfterViewInit()

                    }, 2000)

                    console.log("yo", JSON.stringify(that.appData))
                }


                )
            }
            this.oldSelectedNames = this.selectedAppNames
            this.oldselectedEvent = this.selectedEvent

        }

    }
    ngOnInit() {
        
        const that = this
        this.biSvc.getSingleApp(this.selectedAppNames,this.projectId).subscribe(apps => {
            that.appData = apps
            that.seriesdata=[]
            that.labels=[]
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

                that.ngAfterViewInit()

            }, 2000)

            console.log("yo", JSON.stringify(that.appData))
        }


        )



    }

    ngAfterViewInit() {
    //    this.chartOption.series[0].data=[]
    //    this.chartOption.xAxis[0].data=[]
        this.chartOption = {
            color: ['#3949ab',"#42a5f5","#00e676"],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: this.labels,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Apps',
                    type: 'bar',
                    barWidth: '60%',
                    data: this.seriesdata
                }
            ],
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        title: { zoom: "Zoom", back: "Back" },
                        yAxisIndex: 'none'
                    },
                    magicType: { "title": "Change to Line Chart", type: ['line', 'bar'] },
                    restore: { title: "Refresh", show: true },
                    saveAsImage: { title: "Save", type: "jpeg", show: true }
                }
            }
        };
        this.seriesdata=[]
        this.labels=[]
    }
    onChartClick(e) {
        console.log(e)
    }


}
