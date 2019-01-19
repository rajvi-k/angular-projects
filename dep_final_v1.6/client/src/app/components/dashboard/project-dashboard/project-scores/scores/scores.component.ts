import { Component, OnInit, Input, OnChanges, AfterViewInit, ElementRef } from '@angular/core';
import { ScoresDataService } from '../../../../../services/scores-data.service';

@Component({
  selector: 'scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit, AfterViewInit, OnChanges {

  ngOnChanges() {
    this.series_data = [];
    this.legend_data = [];
    this.radar_indicators = [];
    if (this.proj) {
      this.scDataSvc.getAppScoresData(this.proj).subscribe(data => {

        switch (this.type) {

          case 'Optimize':
            this.categories = ["Technical Debt", "License Optimization", "Redundancy", "Scalability", "Availibility", "Maturity", "Current Cloud", "Cloud Applicability", "Stability"]
            for (let app of data[0].applications) {
              let app_name = app.application_name;
              let technical_debt = app.scores.optimize_scores.technical_debt;
              let license_optimization = app.scores.optimize_scores.license_optimization;
              let redundancy = app.scores.optimize_scores.redundancy;
              let current_cloud = app.scores.optimize_scores.current_cloud;
              let cloud_applicabilty = app.scores.optimize_scores.cloud_applicabilty;
              let scalability = app.scores.optimize_scores.scalability;
              let availibility = app.scores.optimize_scores.availibility;
              let maturity = app.scores.optimize_scores.maturity;
              let stability = app.scores.optimize_scores.stability;

              this.series_data.push({ value: [technical_debt, license_optimization, redundancy, scalability, availibility, maturity, current_cloud, cloud_applicabilty, stability], name: app_name, total: technical_debt + license_optimization + redundancy + scalability + availibility + maturity + current_cloud + cloud_applicabilty + stability });

            }
            break;

          case 'Digitalize':
            this.categories = ["Straight-through Processing Adoption", "API Applicability", "Current API Adoption", "Technology Obsolecence", "Mobility Enablement Scope", "Current Mobility Adoption Level", "Self Service Adoption"]
            for (let app of data[0].applications) {
              let app_name = app.application_name;
              let self_service_adoption = app.scores.digitalize_scores.self_service_adoption;
              let current_mobility_adoption_level = app.scores.digitalize_scores.current_mobility_adoption_level;
              let straight_through_processing_adoption = app.scores.digitalize_scores.straight_through_processing_adoption;
              let mobility_enablement_scope = app.scores.digitalize_scores.mobility_enablement_scope;
              let technology_obsolecence = app.scores.digitalize_scores.technology_obsolecence;
              let current_api_adoption = app.scores.digitalize_scores.current_api_adoption;
              let api_applicability = app.scores.digitalize_scores.api_applicability;

              this.series_data.push({ value: [straight_through_processing_adoption, api_applicability, current_api_adoption, technology_obsolecence, mobility_enablement_scope, current_mobility_adoption_level, self_service_adoption], name: app_name, total: straight_through_processing_adoption + api_applicability + current_api_adoption + technology_obsolecence + mobility_enablement_scope + current_mobility_adoption_level + self_service_adoption });

            }
            break;

          case 'Expedite':
            this.categories = ["Current Dev Ops Adoption Score", "DevOps Applicability", "Testing Automation Adoption"]
            for (let app of data[0].applications) {
              let app_name = app.application_name;
              let current_dev_ops_adoption = app.scores.expedite_scores.current_dev_ops_adoption;
              let devops_applicability = app.scores.expedite_scores.devops_applicability;
              let testing_automation_adoption = app.scores.expedite_scores.testing_automation_adoption;

              this.series_data.push({ value: [current_dev_ops_adoption, devops_applicability, testing_automation_adoption], name: app_name, total: current_dev_ops_adoption + devops_applicability + testing_automation_adoption });

            }
            break;

          case 'Monetize':
            this.categories = ["Unique Functionality", "Registered as ip", "Current ROI Realization Model", "Market Potential", "Ease of Monetization", "Monetization Model"]
            for (let app of data[0].applications) {
              let app_name = app.application_name;
              let unique_functionality = app.scores.monetize_scores.unique_functionality;
              let registered_as_ip = app.scores.monetize_scores.registered_as_ip;
              let current_roi_realization_model = app.scores.monetize_scores.current_roi_realization_model;
              let market_potential = app.scores.monetize_scores.market_potential;
              let ease_of_monetization = app.scores.monetize_scores.ease_of_monetization;
              let monetization_model = app.scores.monetize_scores.monetization_model;

              this.series_data.push({ value: [unique_functionality, registered_as_ip, current_roi_realization_model, market_potential, ease_of_monetization, monetization_model], name: app_name, total: unique_functionality + registered_as_ip + current_roi_realization_model + market_potential + ease_of_monetization + monetization_model });

            }
            break;

          case 'Innovation':
            this.categories = ["AI/ML Applicability", "Chatbot Applicability", "RPA Applicability", "Blockchain Applicability"]

            for (let app of data[0].applications) {
              let app_name = app.application_name;
              let ai_or_ml_applicability = app.scores.innovation_scores.ai_or_ml_applicability;
              let chat_bot_applicability = app.scores.innovation_scores.chat_bot_applicability;
              let rpa_applicability = app.scores.innovation_scores.rpa_applicability;
              let block_chain_applicability = app.scores.innovation_scores.block_chain_applicability;

              this.series_data.push({ value: [ai_or_ml_applicability, chat_bot_applicability, rpa_applicability, block_chain_applicability], name: app_name, total: ai_or_ml_applicability + chat_bot_applicability + rpa_applicability + block_chain_applicability });

            }
            break;
        }
        for (let cat of this.categories) {
          this.radar_indicators.push({ name: cat, max: 5 })
        }
        this.ngAfterViewInit();
      }, err => console.log(err));
    }
  }

  ngAfterViewInit() {

    this.series_data.sort(function (a, b) { return (a.total > b.total) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0); }).reverse();
    this.series_data.map((elem, count = 0) => {
      this.legend_data.push({ label: elem.name, value: { id: elem.name, name: elem.name } })
      if (count < 5) {
        this.forSelected[elem.name] = true
      }
      else {
        this.forSelected[elem.name] = false
      }
    })

    this.chartOption = {
      title: {
        text: ''
      },
      tooltip: {

      },
      legend: {
        type: "scroll",
        orient: "vertical",
        left: 10,
        top: 20,
        bottom: 20,
        data: this.legend_data,
        // show: false,
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
        indicator: this.radar_indicators
      },
      series: [{
        name: 'Applications',
        type: 'radar',
        // areaStyle: {normal: {}},
        data: this.series_data
      }]
    }
  }

  @Input() type: string;
  @Input() proj: any;

  chartOption: any;
  categories: any;
  series_data = [];
  legend_data = [];
  radar_indicators;
  forSelected: any = {};

  constructor(private scDataSvc: ScoresDataService) { }

  ngOnInit() { }

}