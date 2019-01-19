import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ScoresDataService } from '../../../../services/scores-data.service';

@Component({
  selector: 'application-scores',
  templateUrl: './application-scores.component.html',
  styleUrls: ['./application-scores.component.css']
})
export class ApplicationScoresComponent implements OnInit, AfterViewInit {
  forSelected={}
  ngAfterViewInit() {
    this.series_data.sort(function(a,b) {return (a.total > b.total) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0);}).reverse(); 
    this.series_data.map((element,count=0)=>{
      this.leg.push({label:element.name, value:{id:element.name, name: element.name}});
      if(count<5)
      {
        this.forSelected[element.name]=true
      }
      else{
        this.forSelected[element.name]=false
      }
    })
    this.chartOption = {
      title: {
        text: ''
      },
      tooltip: { },
      legend: {
        // show: false,
        type: "scroll",
        data: this.leg,
        orient: "vertical",
        left: 10,
        top: 20,
        selected: this.forSelected
      },
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        axisLabel: {
          show: true
        },
        indicator: [
          { name: 'Optimise', max: 5 },
          { name: 'Digitise', max: 5 },
          { name: 'Expedite', max: 5 },
          { name: 'Monitize', max: 5 },
          { name: 'Innovation', max: 5 },
        ]
      },
      series: [{
        name: 'Application-Level',
        type: 'radar',
        // areaStyle: {normal: {}},
        data: this.series_data
      }]
    }

  }
  selected: string;
  chartOption: any;
  projects: any = [];
  series_data = [];
  leg = [];
  selectedApps: any;
  
  constructor(private scDataSvc: ScoresDataService) { }

  ngOnInit() {
    this.scDataSvc.getProjectName().subscribe(data => {
      for(let project of data){
        this.projects.push(project.project_name)
      }
    }, err => console.log(err));
    if(this.selected)
      this.getAppScores();
  }

  getAppScores() {
    // console.log(this.selected)
    this.scDataSvc.getAppScoresData(this.selected).subscribe(data => {
      
      for (let app of data[0].applications) {
        let app_name = app.application_name;
        let opt_value = (app.scores.optimize_scores.technical_debt +
          app.scores.optimize_scores.license_optimization +
          app.scores.optimize_scores.cloud_applicabilty +
          app.scores.optimize_scores.redundency +
          app.scores.optimize_scores.current_cloud +
          app.scores.optimize_scores.availibility +
          app.scores.optimize_scores.scalability +
          app.scores.optimize_scores.stability +
          app.scores.optimize_scores.maturity) / 9;
        let dig_value = (app.scores.digitalize_scores.straight_through_processing_adoption +
          app.scores.digitalize_scores.api_applicability +
          app.scores.digitalize_scores.current_api_adoption +
          app.scores.digitalize_scores.technology_obsolecence +
          app.scores.digitalize_scores.mobility_enablement_scope +
          app.scores.digitalize_scores.current_mobility_adoption_level +
          app.scores.digitalize_scores.self_service_adoption) / 7;
        let exp_value = (app.scores.expedite_scores.testing_automation_adoption +
          app.scores.expedite_scores.devops_applicability +
          app.scores.expedite_scores.current_dev_ops_adoption) / 3;
        let mon_value = (app.scores.monetize_scores.unique_functionality +
          app.scores.monetize_scores.registered_as_ip +
          app.scores.monetize_scores.current_roi_realization_model +
          app.scores.monetize_scores.market_potential +
          app.scores.monetize_scores.ease_of_monetization +
          app.scores.monetize_scores.monetization_model) / 6;
        let inn_value = (app.scores.innovation_scores.ai_or_ml_applicability +
          app.scores.innovation_scores.chat_bot_applicability +
          app.scores.innovation_scores.block_chain_applicability +
          app.scores.innovation_scores.rpa_applicability) / 4;

        this.series_data.push({ value: [opt_value, dig_value, exp_value, mon_value, inn_value], name: app_name, total: opt_value+dig_value+exp_value+mon_value+inn_value });

      }
      
      this.ngAfterViewInit();
    }, err => console.log(err));

    
  }

}