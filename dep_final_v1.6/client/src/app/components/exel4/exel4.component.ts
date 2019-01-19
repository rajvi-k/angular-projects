import { Component, OnInit, OnChanges, ElementRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { JsonPipe } from '@angular/common';
import { ExelSettingsModule } from '../../modules/exel-settings/exel-settings.module';
import { AppService } from '../../services/app.service';
import { Observable } from 'rxjs';
import { ProjectApp } from '../../models/app-model';
import { ActivatedRoute } from '@angular/router';
import { MappingService } from '../../services/mapping.service';
import { UUID } from 'angular2-uuid';
import { LocalStorageService } from 'ng2-webstorage';
import { WorkBook } from 'xlsx/types';
import { utils } from 'xlsx';
import { write } from 'xlsx';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-exel4',
  templateUrl: './exel4.component.html',
  styleUrls: ['./exel4.component.css']
})
export class Exel4Component implements OnInit {
  pname: any;
  selected: any;
  role: any;
  ppage:12;
  username: String;
  source: LocalDataSource;
  private appObsvr: Observable<any[]>;
  private newApp: ProjectApp;
  private apps: ProjectApp[];
  public apps$: Observable<ProjectApp[]>;
  public exelData: any[] = [];
  columnObj: object = {}; settingsExec: object = {}; columnObj2: object = {}
  config: ExelSettingsModule = new ExelSettingsModule()
  currentData: any[] = []
  temp: any
  constructor(private appSvc: AppService, private el: ElementRef, private route: ActivatedRoute, private mappingSvc: MappingService, private localStorageSvc: LocalStorageService) {
    this.role = this.localStorageSvc.retrieve("role")
    this.username = this.localStorageSvc.retrieve("username")

  }

  ngOnInit() {
    let app = this.route.snapshot.data["appResolve"];
    this.pname = app[0].project_name
    console.log("proj", this.pname)
    this.currentData = app

    this.exelData = this.mappingSvc.convertToExel(app);
    console.log("coo1", this.exelData)
    for (let x of app[0].attribute_details) {
      let x1: object = {
        [x.key]: {
          'title': x.label
        }
      }
      Object.assign(this.columnObj, x1)
      Object.assign(this.columnObj2, x1)
    }
    Object.assign(this.columnObj, {
      ['stability']: {
        'title': 'Scores: Stability'
      },
      ['maturity']: {
        'title': 'Scores: Maturity'
      },
      ['scalability']: {
        'title': 'Scores: Scalability'
      },
      ['availibility']: {
        'title': 'Scores: Availibility'
      },
      ['current_cloud']: {
        'title': 'Scores: Current cloud'
      },
      ['redundency']: {
        'title': 'Scores: Redundency'
      },
      ['cloud_applicabilty']: {
        'title': 'Scores: Cloud Applicabilty'
      },
      ['license_optimization']: {
        'title': 'Scores: License Optimization'
      },
      ['technical_debt']: {
        'title': 'Scores: Technical Debt'
      },
      ['straight_through_processing_adoption']: {
        'title': 'Scores: Straight-through Processing Adoption'
      },
      ['api_applicability']: {
        'title': 'Scores: Api Applicability'
      },
      ['current_api_adoption']: {
        'title': 'Scores: Current Api Adoption'
      },
      ['technology_obsolecence']: {
        'title': 'Scores: Technology Obsolecence'
      },
      ['mobility_enablement_scope']: {
        'title': 'Scores: Mobility Enablement Scope'
      },
      ['current_mobility_adoption_level']: {
        'title': 'Mobility Adoption Level'
      },
      ['self_service_adoption']: {
        'title': 'Scores: Self Service Adoption'
      },
      ['testing_automation_adoption']: {
        'title': 'Scores: Testing Automation Adoption'
      },
      ['devops_applicability']: {
        'title': 'Scores: DevOps Applicability'
      },
      ['current_dev_ops_adoption']: {
        'title': 'Scores: Current Dev Ops Adoption Score'
      },
      ['unique_functionality']: {
        'title': 'Unique Functionality'
      },
      ['registered_as_ip']: {
        'title': 'Scores: Registered as Ip'
      },
      ['current_roi_realization_model']: {
        'title': 'Scores: Current ROI  Realization Model'
      },
      ['market_potential']: {
        'title': 'Scores: Market Potential'
      },
      ['ease_of_monetization']: {
        'title': 'Scores: Ease of Monetization'
      },
      ['monetization_model']: {
        'title': 'Scores: Monetization Model'
      },
      ['ai_or_ml_applicability']: {
        'title': 'Scores: AI/ML Applicability'
      },
      ['chat_bot_applicability']: {
        'title': 'Scores: Chatbot Applicability'
      },
      ['block_chain_applicability']: {
        'title': 'Scores: Blockchain Applicability'
      },
      ['rpa_applicability']: {
        'title': 'Scores: RPA Applicability'
      }
    })
    console.log("cool", this.columnObj)
    this.columnObj = {
      ['columns']: this.columnObj
    }
    this.columnObj2 = {
      ['columns']: this.columnObj2
    }
    Object.assign(this.settings, this.columnObj)
    Object.assign(this.settingsExec, this.settings, this.columnObj2)
  }

  public onAddCall(event) {
    console.log("Add Event", event)
    let appid = UUID.UUID();
    var date = new Date().toLocaleString()
    event.newData.application_id = appid;
    console.log("Event after appid", event)
    event.confirm.resolve(event.newData);
    console.log("onadd", event.newData)
    //console.log("this1", event.newData);
    var exData2: object[] = [], optimize_scores: object = {}, exelGeneral: object[] = [], exel_classification: object[] = [], exel_application_type: object[] = [], exel_ticket: object[] = [], exel_integration: object[] = [], scoresArr: object = {}, digitalize_scores: object = {}, monetize_scores: object = {}, innovation_scores: object = {}, expedite_scores: object = {}
    var exData: any[] = this.mappingSvc.convertToMap(event.newData, event.newData.application_id)
    console.log("cc", exData)
    for (let x1 in exData) {
      if (exData[x1].category_type != 'scores') {
        var y: object = {
          ['key']: exData[x1].key1,
          ['value']: exData[x1].value,
          ['label']: this.mappingSvc.getLabelExel(exData[x1].key1, event.newData.application_id),
          ['controlType']: 'textbox',
          ['category_type']: exData[x1].category_type,
          ['type']: "email"

        }
        exData2.push(y)
      }
      if (exData[x1].category_type == 'scores') {

        if (exData[x1].key1 == "stability") {
          console.log("d", exData[x1].value)
          if (exData[x1].value != null && exData[x1].value != undefined) {
            Object.assign(optimize_scores, {
              ['stability']: +exData[x1].value
            })
          } else {
            Object.assign(optimize_scores, {
              ['stability']: null
            })
          }
        }

        if (exData[x1].key1 == "maturity") {
          Object.assign(optimize_scores, {
            ['maturity']: +exData[x1].value
          })
        }

        if (exData[x1].key1 == "availibility") {
          Object.assign(optimize_scores, {
            ['availibility']: +exData[x1].value
          })
        }

        if (exData[x1].key1 == "scalability") {
          Object.assign(optimize_scores, {
            ['scalability']: +exData[x1].value
          })
        }

        if (exData[x1].key1 == "cloud_applicabilty") {
          Object.assign(optimize_scores, {
            ['cloud_applicabilty']: +exData[x1].value
          })
        }

        if (exData[x1].key1 == "current_cloud") {
          Object.assign(optimize_scores, {
            ['current_cloud']: +exData[x1].value
          })
        }

        if (exData[x1].key1 == "redundency") {
          Object.assign(optimize_scores, {
            ['redundency']: +exData[x1].value
          })
        }
        if (exData[x1].key1 == "stability") {
          Object.assign(optimize_scores, {
            ['stability']: +exData[x1].value
          })
        }
        if (exData[x1].key1 == "license_optimization") {
          Object.assign(optimize_scores, {
            ['license_optimization']: +exData[x1].value
          })
        }
        if (exData[x1].key1 == "technical_debt") {
          Object.assign(optimize_scores, {
            ['technical_debt']: +exData[x1].value
          })
        }
        //digitalize_scores
        if (exData[x1].key1 == "self_service_adoption") {
          Object.assign(digitalize_scores, {
            ['self_service_adoption']: +exData[x1].value
          })
        }

        if (exData[x1].key1 == "current_mobility_adoption_level") {
          Object.assign(digitalize_scores, {
            ['current_mobility_adoption_level']: +exData[x1].value
          })
        }

        if (exData[x1].key1 == "mobility_enablement_scope") {
          Object.assign(digitalize_scores, {
            ['mobility_enablement_scope']: +exData[x1].value
          })
        }

        if (exData[x1].key1 == "technology_obsolecence") {
          Object.assign(digitalize_scores, {
            ['technology_obsolecence']: +exData[x1].value
          })
        }
        if (exData[x1].key1 == "current_api_adoption") {
          Object.assign(digitalize_scores, {
            ['current_api_adoption']: +exData[x1].value
          })
        }

        if (exData[x1].key1 == "api_applicability") {
          Object.assign(digitalize_scores, {
            ['api_applicability']: +exData[x1].value
          })
        }

        if (exData[x1].key1 == "straight_through_processing_adoption") {
          Object.assign(digitalize_scores, {
            ['straight_through_processing_adoption']: +exData[x1].value
          })
        }


        //expedite_scores
        if (exData[x1].key1 == "current_dev_ops_adoption") {
          Object.assign(expedite_scores, {
            ['current_dev_ops_adoption']: +exData[x1].value
          })
        }

        if (exData[x1].key1 == "devops_applicability") {
          Object.assign(expedite_scores, {
            ['devops_applicability']: +exData[x1].value
          })
        }

        if (exData[x1].key1 == "testing_automation_adoption") {
          Object.assign(expedite_scores, {
            ['testing_automation_adoption']: +exData[x1].value
          })
        }

        //monetize_scores
        if (exData[x1].key1 == "ease_of_monetization") {
          Object.assign(monetize_scores, {
            ['ease_of_monetization']: +exData[x1].value
          })
        }
        if (exData[x1].key1 == "market_potential") {
          Object.assign(monetize_scores, {
            ['market_potential']: +exData[x1].value
          })
        }
        if (exData[x1].key1 == "registered_as_ip") {
          Object.assign(monetize_scores, {
            ['registered_as_ip']: +exData[x1].value
          })
        }
        if (exData[x1].key1 == "current_roi_realization_model") {
          Object.assign(monetize_scores, {
            ['current_roi_realization_model']: +exData[x1].value
          })
        }
        if (exData[x1].key1 == "monetization_model") {
          Object.assign(monetize_scores, {
            ['monetization_model']: +exData[x1].value
          })
        }
        if (exData[x1].key1 == "unique_functionality") {
          Object.assign(monetize_scores, {
            ['unique_functionality']: +exData[x1].value
          })
        }

        //innovation_scores
        if (exData[x1].key1 == "block_chain_applicability") {
          Object.assign(innovation_scores, {
            ['block_chain_applicability']: +exData[x1].value
          })
        }

        if (exData[x1].key1 == "rpa_applicability") {
          Object.assign(innovation_scores, {
            ['rpa_applicability']: +exData[x1].value
          })
        }

        if (exData[x1].key1 == "chat_bot_applicability") {
          Object.assign(innovation_scores, {
            ['chat_bot_applicability']: +exData[x1].value
          })
        }
        if (exData[x1].key1 == "ai_or_ml_applicability") {
          Object.assign(innovation_scores, {
            ['ai_or_ml_applicability']: +exData[x1].value
          })
        }


      }
    }
    console.log("exData", exData)
    for (let p of exData) {
      if (p.category_type == 'general_attributes') {
        exelGeneral.push(p)
      }
      if (p.category_type == 'classification_attributes') {
        exel_classification.push(p)
      }
      if (p.category_type == 'application_type') {
        exel_application_type.push(p)
      }
      if (p.category_type == 'ticket_attributes') {
        exel_ticket.push(p)
      }
      if (p.category_type == 'integration_attributes') {
        exel_integration.push(p)
      }
    }
    scoresArr = {
      ['optimize_scores']: optimize_scores,
      ['digitalize_scores']: digitalize_scores,
      ['expedite_scores']: expedite_scores,
      ['monetize_scores']: monetize_scores,
      ['innovation_scores']: innovation_scores,

    }
    //completeion
    var attribute_category_completion = this.mappingSvc.convertToExelCat(exelGeneral, exel_classification, exel_application_type, exel_ticket, exel_integration)



    let attribute_details: object[] = exData2
    let x: object = {
      ['attribute_details']: exData2,
      ['application_id']: event.newData.application_id,
      ['application_name']: event.newData.name,
      ['attribute_category_completion']: attribute_category_completion,
      ['scores']: scoresArr,
      created_by: this.username,
      created_at: date,
      modified_by: "",
      modified_at: ""

      //       ['optimize_scores']:{
      //     ['stability']:0,
      //     ["maturity"]: 0,
      //     ["availibility"]: 0,
      //     ["scalability"]: 0,
      //     ["cloud_applicabilty"]:0,
      //     ["current_cloud"]: 0,
      //     ["redundency"]: 0,
      //     ["license_optimization"]: 0,

      //     ["technical_debt"]: 0},
      //     ['digitalize_scores']:{
      //     //digitalise 
      //     ["self_service_adoption"]: 0,
      //     ["current_mobility_adoption_level"]: 0,

      //     ["mobility_enablement_scope"]: 0,
      //     ["technology_obsolecence"]: 0,
      //     ["current_api_adoption"]: 0,
      //     ["api_applicability"]: 0,

      //     ["straight_through_processing_adoption"]: 0,
      //     },

      //     ['expedite_scores']:{
      //     //expedite_scores
      //     ["current_dev_ops_adoption"]: 0,
      //     ["devops_applicability"]: 0,

      //     ["testing_automation_adoption"]: 0,
      //     },
      //     //monetize_scores
      //     ['monetize_scores']:{
      //     ["monetization_model"]: 0,
      //     ["ease_of_monetization"]: 0,

      //     ["market_potential"]: 0,
      //     ["current_roi_realization_model"]: 0,
      //     ["registered_as_ip"]: 0,
      //     ["unique_functionality"]: 0,
      //     },
      // //innovation_scores
      // ['innovation_scores']:{
      //     ["block_chain_applicability"]: 0,
      //     ["rpa_applicability"]: 0,
      //     ["chat_bot_applicability"]:0,
      //     ["ai_or_ml_applicability"]: 0}
      //     }
      //   }

      // Object.assign(addObj,exData)
    }
    console.log("onadd", x)
    this.appSvc.addApp(x).subscribe(res => { this.appSvc.getApps().subscribe(_ => console.log("post add", _)) },

      err => alert(err))
  }

  onEditCall(event) {
    console.log("Edit event :", event)
    event.confirm.resolve(event.newData);
    var date = new Date().toLocaleString()
    var exData2: object[] = [], optimize_scores: object = {}, scoresArr: object = {}, digitalize_scores: object = {}, monetize_scores: object = {}, innovation_scores: object = {}, expedite_scores: object = {}, exelGeneral: object[] = [], exel_classification: object[] = [], exel_application_type: object[] = [], exel_ticket: object[] = [], exel_integration: object[] = []
    var exData: any[] = this.mappingSvc.convertToMap(event.newData, event.newData.application_id)
    console.log("x", exData)
    //console.log(exData)
    for (let x in exData) {
      if (exData[x].category_type != 'scores') {
        var y: object = {
          ['key']: exData[x].key1,
          ['value']: exData[x].value,
          ['label']: this.mappingSvc.getLabelExel(exData[x].key1, event.newData.application_id),
          ['controlType']: 'textbox',
          ['category_type']: exData[x].category_type,
          ['type']: "email"

        }
        exData2.push(y)
      }
      if (exData[x].category_type == 'scores') {

        if (exData[x].key1 == "stability") {
          if (exData[x].value != null && exData[x].value != undefined) {
            Object.assign(optimize_scores, {
              ['stability']: +exData[x].value
            })
          } else {
            Object.assign(optimize_scores, {
              ['stability']: null
            })
          }
        }

        if (exData[x].key1 == "maturity") {
          Object.assign(optimize_scores, {
            ['maturity']: +exData[x].value
          })
        }

        if (exData[x].key1 == "availibility") {
          Object.assign(optimize_scores, {
            ['availibility']: +exData[x].value
          })
        }

        if (exData[x].key1 == "scalability") {
          Object.assign(optimize_scores, {
            ['scalability']: +exData[x].value
          })
        }

        if (exData[x].key1 == "cloud_applicabilty") {
          Object.assign(optimize_scores, {
            ['cloud_applicabilty']: +exData[x].value
          })
        }

        if (exData[x].key1 == "current_cloud") {
          Object.assign(optimize_scores, {
            ['current_cloud']: +exData[x].value
          })
        }

        if (exData[x].key1 == "redundency") {
          Object.assign(optimize_scores, {
            ['redundency']: +exData[x].value
          })
        }
        if (exData[x].key1 == "stability") {
          Object.assign(optimize_scores, {
            ['stability']: +exData[x].value
          })
        }
        if (exData[x].key1 == "license_optimization") {
          Object.assign(optimize_scores, {
            ['license_optimization']: +exData[x].value
          })
        }
        if (exData[x].key1 == "technical_debt") {
          Object.assign(optimize_scores, {
            ['technical_debt']: +exData[x].value
          })
        }
        //digitalize_scores
        if (exData[x].key1 == "self_service_adoption") {
          Object.assign(digitalize_scores, {
            ['self_service_adoption']: +exData[x].value
          })
        }

        if (exData[x].key1 == "current_mobility_adoption_level") {
          Object.assign(digitalize_scores, {
            ['current_mobility_adoption_level']: +exData[x].value
          })
        }

        if (exData[x].key1 == "mobility_enablement_scope") {
          Object.assign(digitalize_scores, {
            ['mobility_enablement_scope']: +exData[x].value
          })
        }

        if (exData[x].key1 == "technology_obsolecence") {
          Object.assign(digitalize_scores, {
            ['technology_obsolecence']: +exData[x].value
          })
        }
        if (exData[x].key1 == "current_api_adoption") {
          Object.assign(digitalize_scores, {
            ['current_api_adoption']: +exData[x].value
          })
        }

        if (exData[x].key1 == "api_applicability") {
          Object.assign(digitalize_scores, {
            ['api_applicability']: +exData[x].value
          })
        }

        if (exData[x].key1 == "straight_through_processing_adoption") {
          Object.assign(digitalize_scores, {
            ['straight_through_processing_adoption']: +exData[x].value
          })
        }


        //expedite_scores
        if (exData[x].key1 == "current_dev_ops_adoption") {
          Object.assign(expedite_scores, {
            ['current_dev_ops_adoption']: +exData[x].value
          })
        }

        if (exData[x].key1 == "devops_applicability") {
          Object.assign(expedite_scores, {
            ['devops_applicability']: +exData[x].value
          })
        }

        if (exData[x].key1 == "testing_automation_adoption") {
          Object.assign(expedite_scores, {
            ['testing_automation_adoption']: +exData[x].value
          })
        }

        //monetize_scores
        if (exData[x].key1 == "ease_of_monetization") {
          Object.assign(monetize_scores, {
            ['ease_of_monetization']: +exData[x].value
          })
        }
        if (exData[x].key1 == "market_potential") {
          Object.assign(monetize_scores, {
            ['market_potential']: +exData[x].value
          })
        }
        if (exData[x].key1 == "registered_as_ip") {
          Object.assign(monetize_scores, {
            ['registered_as_ip']: +exData[x].value
          })
        }
        if (exData[x].key1 == "current_roi_realization_model") {
          Object.assign(monetize_scores, {
            ['current_roi_realization_model']: +exData[x].value
          })
        }
        if (exData[x].key1 == "monetization_model") {
          Object.assign(monetize_scores, {
            ['monetization_model']: +exData[x].value
          })
        }
        if (exData[x].key1 == "unique_functionality") {
          Object.assign(monetize_scores, {
            ['unique_functionality']: +exData[x].value
          })
        }

        //innovation_scores
        if (exData[x].key1 == "block_chain_applicability") {
          Object.assign(innovation_scores, {
            ['block_chain_applicability']: +exData[x].value
          })
        }

        if (exData[x].key1 == "rpa_applicability") {
          Object.assign(innovation_scores, {
            ['rpa_applicability']: +exData[x].value
          })
        }

        if (exData[x].key1 == "chat_bot_applicability") {
          Object.assign(innovation_scores, {
            ['chat_bot_applicability']: +exData[x].value
          })
        }
        if (exData[x].key1 == "ai_or_ml_applicability") {
          Object.assign(innovation_scores, {
            ['ai_or_ml_applicability']: +exData[x].value
          })
        }


      }
    }
    scoresArr = {
      ['optimize_scores']: optimize_scores,
      ['digitalize_scores']: digitalize_scores,
      ['expedite_scores']: expedite_scores,
      ['monetize_scores']: monetize_scores,
      ['innovation_scores']: innovation_scores,

    }
    //console.log("scores",scoresArr)
    for (let p of exData) {
      if (p.category_type == 'general_attributes') {
        exelGeneral.push(p)
      }
      if (p.category_type == 'classification_attributes') {
        exel_classification.push(p)
      }
      if (p.category_type == 'application_type') {
        exel_application_type.push(p)
      }
      if (p.category_type == 'ticket_attributes') {
        exel_ticket.push(p)
      }
      if (p.category_type == 'integration_attributes') {
        exel_integration.push(p)
      }
    }

    //completeion
    var attribute_category_completion = this.mappingSvc.convertToExelCat(exelGeneral, exel_classification, exel_application_type, exel_ticket, exel_integration)


    let attribute_details: object[] = exData2
    let x: object = {
      ['attribute_details']: exData2,
      ['application_id']: event.newData.application_id,
      ['application_name']: event.newData.name,
      ['scores']: scoresArr,
      ['attribute_category_completion']: attribute_category_completion,
      modified_by: this.username,
      modified_at: date
    }
    // Object.assign(addObj,exData)

    console.log("onedit", x)

    this.appSvc.updateAppById(event.newData.application_id, x).subscribe(res => { this.appSvc.getApps().subscribe(_ => console.log("post edit", _)) },

      err => alert(err))



  }

  //languages_supported buggy!!!!!!!!!!!
  onDeleteCall(event) {

    event.confirm.resolve(event.data);

    this.appSvc.deleteApps(event.data.application_id).subscribe(res => { this.appSvc.getApps().subscribe(_ => console.log("post delete", _)) },

      err => alert(err))
  }


  //data = this.exelData
  //data=this.config.data

  settings = {

    selectMode: 'multi',
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
    delete: {
      confirmDelete: true,
    },
    pager: {
      perPage: 12,
    }

  }
  //executive view
  public onAddExecCall(event) {


    let appid = UUID.UUID();
    var date = new Date().toLocaleString()
    event.newData.application_id = appid;
    //console.log("Event after appid", event)
    event.confirm.resolve(event.newData);
    //console.log("onadd", event.newData)
    //console.log("this1", event.newData);
    var exData2: object[] = [], optimize_scores: object = {}, exelGeneral: object[] = [], exel_classification: object[] = [], exel_application_type: object[] = [], exel_ticket: object[] = [], exel_integration: object[] = [], scoresArr: object = {}, digitalize_scores: object = {}, monetize_scores: object = {}, innovation_scores: object = {}, expedite_scores: object = {}


    var exData: any[] = this.mappingSvc.convertToMap(event.newData, event.newData.application_id)

    for (let x1 in exData) {
      if (exData[x1].category_type != 'scores') {
        var y: object = {
          ['key']: exData[x1].key1,
          ['value']: exData[x1].value,
          ['label']: this.mappingSvc.getLabelExel(exData[x1].key1, event.newData.application_id),
          ['controlType']: 'textbox',
          ['category_type']: exData[x1].category_type,
          ['type']: "email"

        }
        exData2.push(y)
      }
    }


    for (let p of exData) {
      if (p.category_type == 'general_attributes') {
        exelGeneral.push(p)
      }
      if (p.category_type == 'classification_attributes') {
        exel_classification.push(p)
      }
      if (p.category_type == 'application_type') {
        exel_application_type.push(p)
      }
      if (p.category_type == 'ticket_attributes') {
        exel_ticket.push(p)
      }
      if (p.category_type == 'integration_attributes') {
        exel_integration.push(p)
      }
    }

    var attribute_category_completion = this.mappingSvc.convertToExelCat(exelGeneral, exel_classification, exel_application_type, exel_ticket, exel_integration)


    let x: object = {
      ['attribute_details']: exData2,
      // ['application_id']: this.formGeneral.value.application_id,
      ['application_id']: event.newData.application_id,
      ['application_name']: event.newData.name,
      ['attribute_category_completion']: attribute_category_completion,
      created_by: this.username,
      created_at: date,
      modified_by: "",
      modified_at: "",

      ['scores']: {
        ['optimize_scores']: {
          ['stability']: 0,
          ["maturity"]: 0,
          ["availibility"]: 0,
          ["scalability"]: 0,
          ["cloud_applicabilty"]: 0,
          ["current_cloud"]: 0,
          ["redundency"]: 0,
          ["license_optimization"]: 0,

          ["technical_debt"]: 0
        },
        ['digitalize_scores']: {
          //digitalise 
          ["self_service_adoption"]: 0,
          ["current_mobility_adoption_level"]: 0,

          ["mobility_enablement_scope"]: 0,
          ["technology_obsolecence"]: 0,
          ["current_api_adoption"]: 0,
          ["api_applicability"]: 0,

          ["straight_through_processing_adoption"]: 0,
        },

        ['expedite_scores']: {
          //expedite_scores
          ["current_dev_ops_adoption"]: 0,
          ["devops_applicability"]: 0,

          ["testing_automation_adoption"]: 0,
        },
        //monetize_scores
        ['monetize_scores']: {
          ["monetization_model"]: 0,
          ["ease_of_monetization"]: 0,

          ["market_potential"]: 0,
          ["current_roi_realization_model"]: 0,
          ["registered_as_ip"]: 0,
          ["unique_functionality"]: 0,
        },
        //innovation_scores
        ['innovation_scores']: {
          ["block_chain_applicability"]: 0,
          ["rpa_applicability"]: 0,
          ["chat_bot_applicability"]: 0,
          ["ai_or_ml_applicability"]: 0
        }
      }
    }
    console.log("onadd", x)
    this.appSvc.addApp(x).subscribe(res => { this.appSvc.getApps().subscribe(_ => console.log("post add", _)) },

      err => alert(err))
  }

  public onEditExecCall(event) {

    event.confirm.resolve(event.newData);
    var date = new Date().toLocaleString()
    var exData2: object[] = [], optimize_scores: object = {}, scoresArr: object = {}, digitalize_scores: object = {}, monetize_scores: object = {}, innovation_scores: object = {}, expedite_scores: object = {}, exelGeneral: object[] = [], exel_classification: object[] = [], exel_application_type: object[] = [], exel_ticket: object[] = [], exel_integration: object[] = []
    var exData: any[] = this.mappingSvc.convertToMap(event.newData, event.newData.application_id)

    //console.log(exData)
    for (let x in exData) {
      if (exData[x].category_type != 'scores') {
        var y: object = {
          ['key']: exData[x].key1,
          ['value']: exData[x].value,
          ['label']: this.mappingSvc.getLabelExel(exData[x].key1, event.newData.application_id),
          ['controlType']: 'textbox',
          ['category_type']: exData[x].category_type,
          ['type']: "email"

        }
        exData2.push(y)
      }
      // console.log("x", exData2)

    }
    for (let p of exData) {
      if (p.category_type == 'general_attributes') {
        exelGeneral.push(p)
      }
      if (p.category_type == 'classification_attributes') {
        exel_classification.push(p)
      }
      if (p.category_type == 'application_type') {
        exel_application_type.push(p)
      }
      if (p.category_type == 'ticket_attributes') {
        exel_ticket.push(p)
      }
      if (p.category_type == 'integration_attributes') {
        exel_integration.push(p)
      }
    }

    //completeion
    var attribute_category_completion = this.mappingSvc.convertToExelCat(exelGeneral, exel_classification, exel_application_type, exel_ticket, exel_integration)
    console.log("coo1", this.currentData[0])

    var scoresExec = {}

    for (let x of this.currentData[0].applications) {
      console.log("scores", x.application_id, event.newData.application_id)
      if (x.application_id == event.newData.application_id) {
        scoresExec = x.scores
        console.log("scores", scoresExec)
      }
    }

    let attribute_details: object[] = exData2
    let x: object = {
      ['attribute_details']: exData2,
      ['application_id']: event.newData.application_id,
      ['application_name']: event.newData.name,
      ['scores']: scoresExec,
      ['attribute_category_completion']: attribute_category_completion,
      modified_by: this.username,
      modified_at: date
    }
    // Object.assign(addObj,exData)
    console.log("on edit", x)


    this.appSvc.updateAppById(event.newData.application_id, x).subscribe(res => { this.appSvc.getApps().subscribe(_ => console.log("post edit", _)) },

      err => alert(err))
  }



  onUserRowSelect(event) {
    console.log(event.selected)
    this.temp = event.selected

  }

  export() {
    // if(this.temp){
    var  d  =  new  Date();
    var  date = d.toDateString();
    const ws_name = 'Sheet1';
    const wb: WorkBook = { SheetNames: [], Sheets: {} };
    const ws: any = utils.json_to_sheet(this.temp);
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
    function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
      };
      return buf;
    }
    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), `${this.pname}_${date}.xlsx`);

    // else{
    //   alert('please select the rows')
    // }
  }
  exportAll() {
    // if(this.temp){
    var  d  =  new  Date();
    var  date = d.toDateString();
    const ws_name = 'Sheet1';
    const wb: WorkBook = { SheetNames: [], Sheets: {} };
    const ws: any = utils.json_to_sheet(this.exelData);
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
    function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
      };
      return buf;
    }
    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), `${this.pname}_${date}.xlsx`);

    // else{
    //   alert('please select the rows')
    // }
  }

}








