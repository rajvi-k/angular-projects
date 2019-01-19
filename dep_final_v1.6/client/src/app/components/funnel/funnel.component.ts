import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProjectService } from '../../services/project-service';
import { AccordionModule } from 'primeng/primeng';
import { MenuItem } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';
import { Router, ActivatedRoute } from '@angular/router';
declare const $: any;
declare const Materialize: any;

@Component({
  selector: 'funnel',
  templateUrl: './funnel.component.html',
  styleUrls: ['./funnel.component.css']
})

export class FunnelComponent implements OnInit, AfterViewInit {
  ngAfterViewInit() {
    this.option1 = {
      // title: {
      //   text: 'Funnel Chart'
      // },
      tooltip: {
        trigger: 'item',
        formatter: "{b} <br/> Applications: {c}"
      },
      toolbox: {
        feature: {
          // dataView: { title: "View", show: true, readOnly: true, lang: ['Applications', 'Close'] },
          //restore: { title: "Refresh", show: true },
          saveAsImage: { title: "Save", type: "jpeg", show: true }
        }
      },
      legend: {
        data: ['Total Apps', 'score 0', 'score 1', 'score 2', 'score 3', 'score 4', 'score 5']
      },
      calculable: true,
      series: [
        {
          name: "score",
          type: 'funnel',
          left: '10%',
          top: 60,
          //x2: 80,
          bottom: 60,
          width: '80%',
          // height: {totalHeight} - y - y2,
          min: 0,
          max: 100,
          minSize: '5%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: "Apps : {c}",
              fontSize: 10
            },
            emphasis: {
              textStyle: {
                fontSize: 10
              }
            }
          },
          labelLine: {
            normal: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#fff',
              borderWidth: 1
            }
          },
          data: this.funneldata
        }
      ]
    };
    this.option2 = {
      // title: {
      //   text: 'Funnel Chart'
      // },
      tooltip: {
        trigger: 'item',
        formatter: "{b} <br/> Applications: {c}"
      },
      toolbox: {
        feature: {
          // dataView: { title: "View", show: true, readOnly: true, lang: ['Applications', 'Close'] },
          //restore: { title: "Refresh", show: true },
          saveAsImage: { title: "Save", type: "jpeg", show: true }
        }
      },
      legend: {
        data: ['Total Apps', 'score 0 to 1', 'score 0 to 2', 'score 0 to 3', 'score 0 to 4', 'score 0 to 5', 'score 1 to 2', 'score 1 to 3', 'score 1 to 4', 'score 1 to 5', 'score 2 to 3', 'score 2 to 4', 'score 2 to 5', 'score 3 to 4', 'score 3 to 5', 'score 4 to 5']
      },
      calculable: true,
      series: [
        {
          name: "score",
          type: 'funnel',
          left: '10%',
          top: 60,
          //x2: 80,
          bottom: 60,
          width: '80%',
          // height: {totalHeight} - y - y2,
          min: 0,
          max: 100,
          minSize: '5%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: "Apps : {c}",
              fontSize: 10
            },
            emphasis: {
              textStyle: {
                fontSize: 10
              }
            }
          },
          labelLine: {
            normal: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#fff',
              borderWidth: 1
            }
          },
          data: this.combined_funneldata
        }
      ]
    };
  }

  private projectsdata: any = [];
  private projecttemp: any;
  selectedproject: string = "";
  private scores: any;
  selectedscores: string = "";
  private subscores: any = [];
  selectedsubscores: string = "";
  private score_data: any;
  selectedscoredata: string = ""
  private score_from: any;
  selectedfrom: number
  private score_to: any;
  selectedto: number
  // private cars:any;
  //private option: any = {};
  private option1: any = {};
  private option2: any = {};
  private appcount: any = 0;
  private projectname: any;
  // private flag:boolean;
  //option data
  val1: string;
  option1count: number = 0;
  option2count: number = 0;

  count: number
  count1: number
  count2: number
  count3: number
  count4: number
  count5: number
  count_funnel: number
  count_funnel_comb: number

  //flags
  flag: boolean = false;
  flag1: boolean = false;

  //extra
  scoredata: any = [];
  funneldata: any = [];
  combined_funneldata: any = [];
  constructor(private projSvc: ProjectService, private route: ActivatedRoute) {
    this.scores = [
      { label: 'Select score', value: null },
      { label: 'optimize_scores', value: 'optimize_scores' },
      { label: 'digitalize_scores', value: 'digitalize_scores' },
      { label: 'expedite_scores', value: 'expedite_scores' },
      { label: 'monetize_scores', value: 'monetize_scores' },
      { label: 'innovation_scores', value: 'innovation_scores' }
    ]

    this.projecttemp = this.route.snapshot.data['projectname']
    var obj1 = {
      label: 'Select Project',
      value: null
    }
    this.projectsdata.push(obj1)
    this.projecttemp.map((data) => {
      var projectname;
      projectname = data.project_name
      var obj = {
        label: data.project_name,
        value: data.project_name
      }
      this.projectsdata.push(obj)
    })

    this.score_data = [
      { label: 'select number', value: null },
      { label: '0', value: '0' },
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' }
    ]

    this.score_from = [
      { label: 'select number', value: null },
      { label: '0', value: '0' },
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' }
    ]

    this.score_to = [
      { label: 'select number', value: null },
      { label: '0', value: '0' },
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' }
    ]

    //console.log("data is here",this.projecttemp)
    // this.projSvc.getProjects()
    //   .subscribe(res => {
    //     res.map((data) => {
    //       var projectname;
    //       projectname = data.project_name;
    //       var obj = {
    //         label: data.project_name,
    //         value: data.project_name
    //       }
    //       this.projectsdata.push(obj)

    //     })
    //     //console.log("projectname", this.projectsdata)
    //   },
    //   err => console.log(err)
    //   )
  }

  ngOnInit() {
  }

  combidata(data) {
    //console.log("hello there",data)
    if (data === "1") {
      this.option1count = 1;
      this.option2count = 0;
      this.flag = true;
      this.flag1 = false;
      // console.log('flag',this.flag)
    }
    else {
      this.option1count = 0;
      this.option2count = 1;
      this.flag = false;
      this.flag1 = true;
    }
  }

  public getdata() {
    this.scoredata = []
    this.appcount = 0;
    this.count = 0;
    this.count_funnel = 0;
    this.count_funnel_comb = 0;
    this.count1 = 0;
    this.count2 = 0;
    this.count3 = 0;
    this.count4 = 0;
    this.count5 = 0

    if (this.selectedproject && this.selectedscores && this.selectedsubscores) {

      if (this.selectedscoredata) {
        //console.log("Hello")
        this.projSvc.getprojectcount()
          .subscribe(res => {
            res.map((data) => {
              if (data.project_name == this.selectedproject) {
                this.appcount = data.numberOfApplications;
                this.projectname = data.project_name
              }
            })
            this.projSvc.getprojectscore(this.selectedproject, this.selectedscores)
              .subscribe(res => {
                // console.log("response",res)
                res.map((data) => {
                  if (this.selectedscores == 'optimize_scores') {
                    if (this.selectedsubscores == 'stability') {
                      data.applications.map((application) => {
                        if (application.scores.optimize_scores.stability == this.selectedscoredata) {
                          this.count_funnel++;
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                    }
                    else if (this.selectedsubscores == 'maturity') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        console.log("application", application.scores.optimize_scores.maturity)
                        if (application.scores.optimize_scores.maturity == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      // console.log("scoredata", this.scoredata)
                    }
                    else if (this.selectedsubscores == 'availibility') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        console.log("application", application.scores.optimize_scores.availibility)
                        if (application.scores.optimize_scores.availibility == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                    else if (this.selectedsubscores == 'scalability') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        console.log("application", application.scores.optimize_scores.scalability)
                        if (application.scores.optimize_scores.scalability == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                    else if (this.selectedsubscores == 'cloud_applicabilty') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        console.log("application", application.scores.optimize_scores.cloud_applicabilty)
                        if (application.scores.optimize_scores.cloud_applicabilty == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                    else if (this.selectedsubscores == 'current_cloud') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        console.log("application", application.scores.optimize_scores.current_cloud)
                        if (application.scores.optimize_scores.current_cloud == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                    else if (this.selectedsubscores == 'license_optimization') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        console.log("application", application.scores.optimize_scores.license_optimization)
                        if (application.scores.optimize_scores.license_optimization == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                    else if (this.selectedsubscores == 'redundency') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        console.log("application", application.scores.optimize_scores.redundency)
                        if (application.scores.optimize_scores.redundency == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                    else if (this.selectedsubscores == 'technical_debt') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        console.log("application", application.scores.optimize_scores.technical_debt)
                        if (application.scores.optimize_scores.technical_debt == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                  }
                  else if (this.selectedscores == 'digitalize_scores') {
                    //console.log(data)
                    if (this.selectedsubscores == 'straight_through_processing_adoption') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        //console.log("application", application.scores.digitalize_scores.straight_through_processing_adoption)
                        if (application.scores.digitalize_scores.straight_through_processing_adoption == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                    }
                    else if (this.selectedsubscores == 'api_applicability') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        //console.log("application", application.scores.digitalize_scores.api_applicability)
                        if (application.scores.digitalize_scores.api_applicability == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                    else if (this.selectedsubscores == 'current_api_adoption') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        console.log("application", application.scores.digitalize_scores.current_api_adoption)
                        if (application.scores.digitalize_scores.current_api_adoption == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                    else if (this.selectedsubscores == 'technology_obsolecence') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        console.log("application", application.scores.digitalize_scores.technology_obsolecence)
                        if (application.scores.digitalize_scores.technology_obsolecence == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)

                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                    else if (this.selectedsubscores == 'mobility_enablement_scope') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        console.log("application", application.scores.digitalize_scores.mobility_enablement_scope)
                        if (application.scores.digitalize_scores.mobility_enablement_scope == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                    else if (this.selectedsubscores == 'current_mobility_adoption_level') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        console.log("application", application.scores.digitalize_scores.current_mobility_adoption_level)
                        if (application.scores.digitalize_scores.current_cloud == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                    else if (this.selectedsubscores == 'self_service_adoption') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        //console.log("application", application.scores.digitalize_scores.self_service_adoption)
                        if (application.scores.digitalize_scores.self_service_adoption == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                  }
                  else if (this.selectedscores == 'expedite_scores') {
                    //console.log(data)
                    if (this.selectedsubscores == 'testing_automation_adoption') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        console.log("application", application.scores.expedite_scores.testing_automation_adoption)
                        if (application.scores.expedite_scores.testing_automation_adoption == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      // console.log("scoredata", this.scoredata)
                    }
                    else if (this.selectedsubscores == 'devops_applicability') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        console.log("application", application.scores.expedite_scores.devops_applicability)
                        if (application.scores.expedite_scores.devops_applicability == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                    else if (this.selectedsubscores == 'current_dev_ops_adoption') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        console.log("application", application.scores.expedite_scores.current_dev_ops_adoption)
                        if (application.scores.expedite_scores.current_dev_ops_adoption == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                  }
                  else if (this.selectedscores == 'monetize_scores') {
                    //console.log(data)
                    if (this.selectedsubscores == 'unique_functionality') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        console.log("application", application.scores.monetize_scores.unique_functionality)
                        if (application.scores.monetize_scores.unique_functionality == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      // console.log("scoredata", this.scoredata)
                    }
                    else if (this.selectedsubscores == 'monetization_model') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        //console.log("application", application.scores.monetize_scores.monetization_model)
                        if (application.scores.monetize_scores.monetization_model == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                    else if (this.selectedsubscores == 'registered_as_ip') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        console.log("application", application.scores.monetize_scores.registered_as_ip)
                        if (application.scores.monetize_scores.registered_as_ip == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                    else if (this.selectedsubscores == 'current_roi_realization_model') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        // console.log("application", application.scores.monetize_scores.current_roi_realization_model)
                        if (application.scores.monetize_scores.current_roi_realization_model == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                    else if (this.selectedsubscores == 'market_potential') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        console.log("application", application.scores.monetize_scores.market_potential)
                        if (application.scores.monetize_scores.market_potential == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                    else if (this.selectedsubscores == 'current_mobility_adoption_level') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        //console.log("application", application.scores.monetize_scores.current_mobility_adoption_level)
                        if (application.scores.monetize_scores.current_mobility_adoption_level == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                    else if (this.selectedsubscores == 'ease_of_monetization') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        //console.log("application", application.scores.monetize_scores.ease_of_monetization)
                        if (application.scores.monetize_scores.ease_of_monetization == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                  }
                  else if (this.selectedscores == 'innovation_scores') {
                    //console.log(data)
                    if (this.selectedsubscores == 'ai_or_ml_applicability') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        // console.log("application", application.scores.innovation_scores.ai_or_ml_applicability)
                        if (application.scores.innovation_scores.ai_or_ml_applicability == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                    else if (this.selectedsubscores == 'chat_bot_applicability') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        //console.log("application", application.scores.innovation_scores.chat_bot_applicability)
                        if (application.scores.innovation_scores.chat_bot_applicability == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                    else if (this.selectedsubscores == 'rpa_applicability') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        //console.log("application", application.scores.innovation_scores.rpa_applicability)
                        if (application.scores.innovation_scores.rpa_applicability == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                    else if (this.selectedsubscores == 'block_chain_applicability') {
                      // console.log("data",data.applications)
                      data.applications.map((application) => {
                        //console.log("application", application.scores.innovation_scores.block_chain_applicability)
                        if (application.scores.innovation_scores.block_chain_applicability == this.selectedscoredata) {
                          this.count_funnel++;
                          //console.log("count", this.count)
                        }
                      })
                      this.funneldata = [
                        { value: this.appcount, name: 'Total Apps' },
                        { value: this.count_funnel, name: `score ${this.selectedscoredata}` }
                      ]
                      this.ngAfterViewInit();
                      //console.log("scoredata", this.scoredata)
                    }
                  }
                })
              },
              err => console.log(err)
              )
          })

      }
      if (this.selectedfrom && this.selectedto) {
        // console.log("hi there ", this.selectedfrom,this.selectedto)
        if (this.selectedfrom <= this.selectedto) {
          this.projSvc.getprojectcount()
            .subscribe(res => {
              res.map((data) => {
                if (data.project_name == this.selectedproject) {
                  this.appcount = data.numberOfApplications;
                  this.projectname = data.project_name
                }
              })
              this.projSvc.getprojectscore(this.selectedproject, this.selectedscores)
                .subscribe(res => {
                  res.map((data) => {
                    if (this.selectedscores == 'optimize_scores') {
                      if (this.selectedsubscores == 'stability') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.optimize_scores.stability == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'maturity') {
                        // console.log("data",data.applications)
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.optimize_scores.maturity == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'availibility') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.optimize_scores.availibility == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'scalability') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.optimize_scores.scalability == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'cloud_applicabilty') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.optimize_scores.cloud_applicabilty == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'current_cloud') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.optimize_scores.current_cloud == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'license_optimization') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.optimize_scores.license_optimization == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'redundency') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.optimize_scores.redundency == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'technical_debt') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.optimize_scores.technical_debt == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                    }
                    else if (this.selectedscores == 'digitalize_scores') {
                      //console.log(data)
                      if (this.selectedsubscores == 'straight_through_processing_adoption') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.digitalize_scores.straight_through_processing_adoption == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'api_applicability') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.digitalize_scores.api_applicability == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'current_api_adoption') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.digitalize_scores.current_api_adoption == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'technology_obsolecence') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.digitalize_scores.technology_obsolecence == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'mobility_enablement_scope') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.digitalize_scores.mobility_enablement_scope == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'current_mobility_adoption_level') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.digitalize_scores.current_mobility_adoption_level == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'self_service_adoption') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.digitalize_scores.self_service_adoption == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                    }
                    else if (this.selectedscores == 'expedite_scores') {
                      //console.log(data)
                      if (this.selectedsubscores == 'testing_automation_adoption') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.expedite_scores.testing_automation_adoption == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'devops_applicability') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.expedite_scores.devops_applicability == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'current_dev_ops_adoption') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.expedite_scores.current_dev_ops_adoption == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                    }
                    else if (this.selectedscores == 'monetize_scores') {
                      //console.log(data)
                      if (this.selectedsubscores == 'unique_functionality') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.monetize_scores.unique_functionality == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'monetization_model') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.monetize_scores.monetization_model == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'registered_as_ip') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.monetize_scores.registered_as_ip == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'current_roi_realization_model') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.monetize_scores.current_roi_realization_model == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'market_potential') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.monetize_scores.market_potential == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'current_mobility_adoption_level') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.monetize_scores.current_mobility_adoption_level == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'ease_of_monetization') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.monetize_scores.ease_of_monetization == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                    }
                    else if (this.selectedscores == 'innovation_scores') {
                      //console.log(data)
                      if (this.selectedsubscores == 'ai_or_ml_applicability') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.innovation_scores.ai_or_ml_applicability == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'chat_bot_applicability') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.innovation_scores.chat_bot_applicability == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'rpa_applicability') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.innovation_scores.rpa_applicability == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                      else if (this.selectedsubscores == 'block_chain_applicability') {
                        data.applications.map((application) => {
                          for (var i = this.selectedfrom; i <= this.selectedto; i++) {
                            if (application.scores.innovation_scores.block_chain_applicability == i) {
                              this.count_funnel_comb++;
                            }
                          }
                        })
                        this.combined_funneldata = [
                          { value: this.appcount, name: 'Total Apps' },
                          { value: this.count_funnel_comb, name: `score ${this.selectedfrom} to ${this.selectedto}` }
                        ]
                        this.ngAfterViewInit();
                      }
                    }
                  })
                },
                err => console.log(err)
                )
            })
        }
        else {
          Materialize.toast('Please Select a Valid Range', 4000, 'rounded')
        }
      }
      // console.log("value", this.val1)
      if (this.val1 == undefined) {
        Materialize.toast('Please Select one of the options', 4000, 'rounded')
      }
    }
    else {
      Materialize.toast('Please Select a Subscore', 4000, 'rounded')
      //console.log("selected score", this.selectedscores)
    }

  }

  data(data) {
    // console.log("data",data)
    this.subscores = [];
    if (data == 'optimize_scores') {
      // console.log("hi");
      this.subscores = [
        { label: 'select subscore', value: null },
        { label: 'stability', value: 'stability' },
        { label: 'maturity', value: 'maturity' },
        { label: 'availibility', value: 'availibility' },
        { label: 'scalability', value: 'scalability' },
        { label: 'cloud_applicabilty', value: 'cloud_applicabilty' },
        { label: 'current_cloud', value: 'current_cloud' },
        { label: 'redundency', value: 'redundency' },
        { label: 'license_optimization', value: 'license_optimization' },
        { label: 'technical_debt', value: 'technical_debt' }
      ]
    }
    else if (data == 'digitalize_scores') {
      console.log("hello")
      this.subscores = [
        { label: 'straight_through_processing_adoption', value: 'straight_through_processing_adoption' },
        { label: 'api_applicability', value: 'api_applicability' },
        { label: 'current_api_adoption', value: 'current_api_adoption' },
        { label: 'technology_obsolecence', value: 'technology_obsolecence' },
        { label: 'mobility_enablement_scope', value: 'mobility_enablement_scope' },
        { label: 'current_mobility_adoption_level', value: 'current_mobility_adoption_level' },
        { label: 'self_service_adoption', value: 'self_service_adoption' }
      ]
    }
    else if (data == 'expedite_scores') {
      this.subscores = [
        { label: 'testing_automation_adoption', value: 'testing_automation_adoption' },
        { label: 'devops_applicability', value: 'devops_applicability' },
        { label: 'current_dev_ops_adoption', value: 'current_dev_ops_adoption' }
      ]

    }
    else if (data == 'monetize_scores') {

      this.subscores = [
        { label: 'unique_functionality', value: 'unique_functionality' },
        { label: 'monetization_model', value: 'monetization_model' },
        { label: 'registered_as_ip', value: 'registered_as_ip' },
        { label: 'current_roi_realization_model', value: 'current_roi_realization_model' },
        { label: 'market_potential', value: 'market_potential' },
        { label: 'current_mobility_adoption_level', value: 'current_mobility_adoption_level' },
        { label: 'ease_of_monetization', value: 'ease_of_monetization' }
      ]

    }
    else if (data == 'innovation_scores') {

      this.subscores = [
        { label: 'ai_or_ml_applicability', value: 'ai_or_ml_applicability' },
        { label: 'chat_bot_applicability', value: 'chat_bot_applicability' },
        { label: 'rpa_applicability', value: 'rpa_applicability' },
        { label: 'block_chain_applicability', value: 'block_chain_applicability' }
      ]
    }



  }



}

