import { Injectable } from '@angular/core';
import { ProjectApp } from '../models/app-model';
import { ExelSettingsModule } from '../modules/exel-settings/exel.settings2.module';

@Injectable()
export class MappingService {
  mainApp: any[] = []
  config: ExelSettingsModule = new ExelSettingsModule()
  constructor() {

  }



  mapScores(scoreObj) {

    //scores:{

    var scores: object = {


      // optimize_scores

      ['optimize_scores']: {

        stability: scoreObj.stability,
        maturity: scoreObj.maturity,
        availibility: scoreObj.availibility,
        scalability: scoreObj.scalability,
        cloud_applicabilty: scoreObj.cloud_applicabilty,
        current_cloud: scoreObj.current_cloud,
        redundency: scoreObj.redundency,
        license_optimization: scoreObj.license_optimization,

        technical_debt: scoreObj.technical_debt
      },

      // digitalize_scores
      ['digitalize_scores']: {

        straight_through_processing_adoption: scoreObj.straight_through_processing_adoption,
        api_applicability: scoreObj.api_applicability,
        current_api_adoption: scoreObj.current_api_adoption,
        technology_obsolecence: scoreObj.technology_obsolecence,
        mobility_enablement_scope: scoreObj.mobility_enablement_scope,
        current_mobility_adoption_level: scoreObj.current_mobility_adoption_level,
        self_service_adoption: scoreObj.self_service_adoption
      },

      // expedites

      ['expedite_scores']: {


        testing_automation_adoption: scoreObj.testing_automation_adoption,
        devops_applicability: scoreObj.devops_applicability,
        current_dev_ops_adoption: scoreObj.current_dev_ops_adoption

      },
      // monetize_scores
      ['monetize_scores']: {

        unique_functionality: scoreObj.unique_functionality,
        monetization_model: scoreObj.monetization_model,
        registered_as_ip: scoreObj.registered_as_ip,
        current_roi_realization_model: scoreObj.current_roi_realization_model,
        market_potential: scoreObj.market_potential,
        ease_of_monetization: scoreObj.ease_of_monetization
      },

      // innovation_scores
      ['innovation_scores']: {
        ai_or_ml_applicability: scoreObj.ai_or_ml_applicability,
        chat_bot_applicability: scoreObj.chat_bot_applicability,
        rpa_applicability: scoreObj.rpa_applicability,
        block_chain_applicability: scoreObj.block_chain_applicability
      }


    }

    return scores
  }



  public convertToExel(app: any[]) {
    this.mainApp = app
    //console.log( 'this.mainApp',this.mainApp[0])
    // let exelApps:any[]=app[0].applications ;console.log("data0", app[0])
    var i = 0, k = 0, data: object = {}, trial: object = {}, trialArr: object[] = [], data3: object, dataGeneral: object = {}, dataTrialArr: object[] = [], dataInt: object = {}
    // let obj1=[{['gen']:[{a:'name',b:'2'},{a:'owner',b:'3'},{a:'keylogger',b:'4'}]},{['gen']:[{a:'name',b:'55'},{a:'owner',b:'111'},{a:'keylogger',b:'333'}]}]
    // var obj3:object={};
    // for(let x in obj1){
    //   i++;
    //     for(let y of obj1[x].gen){
    //       let j=0;
    //       let obj3={
    //         [y.a]:y.b
    //       }
    //       //console.log("obj31",obj3);
    //       //obj3=Object.assign(trial,obj3);console.log("obj313",obj3);
    //       Object.assign(trial,obj3)
    //       console.log("j",j++)
    //       //console.log("trial111",trial)
    //     }
    //     trialArr.push(trial)
    //     trial={}
    //    console.log("i",i,trialArr)
    // }
    // console.log("trial",trial1);
    var scores = {}
    for (let x of this.mainApp[0].applications) {
      for (let i of x.attribute_details) {
        let data3 = {
          [i.key]: i.value
        }
        Object.assign(dataGeneral, data3)
        //console.log("dataGeneral",dataGeneral)
      }
      if (x.scores != undefined) {
        //console.log('x.scores defined',x.scores,x.application_id,scores)
        scores = {
          ['stability']: x.scores.optimize_scores.stability,
          ['maturity']: x.scores.optimize_scores.maturity,
          ['availibility']: x.scores.optimize_scores.availibility,
          ['scalability']: x.scores.optimize_scores.scalability,
          ['cloud_applicabilty']: x.scores.optimize_scores.cloud_applicabilty,
          ['current_cloud']: x.scores.optimize_scores.current_cloud,
          ['redundency']: x.scores.optimize_scores.redundency,
          ['license_optimization']: x.scores.optimize_scores.license_optimization,
          ['consolidation']: x.scores.optimize_scores.consolidation,
          ['technical_debt']: x.scores.optimize_scores.technical_debt,

          //digitalise 
          ["self_service_adoption"]: x.scores.digitalize_scores.self_service_adoption,
          ["current_mobility_adoption_level"]: x.scores.digitalize_scores.current_mobility_adoption_level,

          ["mobility_enablement_scope"]: x.scores.digitalize_scores.mobility_enablement_scope,
          ["technology_obsolecence"]: x.scores.digitalize_scores.technology_obsolecence,
          ["current_api_adoption"]: x.scores.digitalize_scores.current_api_adoption,
          ["api_applicability"]: x.scores.digitalize_scores.api_applicability,

          ["straight_through_processing_adoption"]: x.scores.digitalize_scores.straight_through_processing_adoption,


          //expedite_scores
          ["current_dev_ops_adoption"]: x.scores.expedite_scores.current_dev_ops_adoption,
          ["devops_applicability"]: x.scores.expedite_scores.devops_applicability,

          ["testing_automation_adoption"]: x.scores.expedite_scores.testing_automation_adoption,

          //monetize_scores
          ["monetization_model"]: x.scores.monetize_scores.monetization_model,
          ["ease_of_monetization"]: x.scores.monetize_scores.ease_of_monetization,

          ["market_potential"]: x.scores.monetize_scores.market_potential,
          ["current_roi_realization_model"]: x.scores.monetize_scores.current_roi_realization_model,
          ["registered_as_ip"]: x.scores.monetize_scores.registered_as_ip,
          ["unique_functionality"]: x.scores.monetize_scores.unique_functionality,

          //innovation_scores
          ["block_chain_applicability"]: x.scores.innovation_scores.block_chain_applicability,
          ["rpa_applicability"]: x.scores.innovation_scores.rpa_applicability,
          ["chat_bot_applicability"]: x.scores.innovation_scores.chat_bot_applicability,
          ["ai_or_ml_applicability"]: x.scores.innovation_scores.ai_or_ml_applicability


        }
        //console.log(' defined',scores)
      }
      else {
        scores = {
          ['stability']: null,
          ["maturity"]: null,
          ["availibility"]: null,
          ["scalability"]: null,
          ["cloud_applicabilty"]: null,
          ["current_cloud"]: null,
          ["redundency"]: null,
          ["license_optimization"]: null,
          ["consolidation"]: null,


          //digitalise 
          ["self_service_adoption"]: null,
          ["current_mobility_adoption_level"]: null,
          ["technical_debt"]: null,
          ["mobility_enablement_scope"]: null,
          ["technology_obsolecence"]: null,
          ["current_api_adoption"]: null,
          ["api_applicability"]: null,

          ["straight_through_processing_adoption"]: null,


          //expedite_scores
          ["current_dev_ops_adoption"]: null,
          ["devops_applicability"]: null,

          ["testing_automation_adoption"]: null,

          //monetize_scores
          ["monetization_model"]: null,
          ["ease_of_monetization"]: null,

          ["market_potential"]: null,
          ["current_roi_realization_model"]: null,
          ["registered_as_ip"]: null,
          ["unique_functionality"]: null,

          //innovation_scores
          ["block_chain_applicability"]: null,
          ["rpa_applicability"]: null,
          ["chat_bot_applicability"]: null,
          ["ai_or_ml_applicability"]: null
        }
        //console.log(' undefined for check',scores)
      }
      let x1 = Object.assign(dataGeneral, scores)
      dataTrialArr.push(x1)
      dataGeneral = {}; scores = {}
    } //console.log("dataTrialArr",dataTrialArr)

    Object.assign(dataTrialArr, scores)
    console.log("dataTrialArr", dataTrialArr)
    return dataTrialArr
  }



  convertToMap(ex, id) {
    //var inputMapper:InputMap
    var inputMapps: InputMap[] = Object.getOwnPropertyNames(ex)
      .map((key: string) => new InputMap(key, ex[key], ex[key], this.getCategoryExel(key, id)));
    return inputMapps;
  }

  getCategoryExel(key, id) {
  
    for (let j of this.mainApp[0].attribute_details) {
      if (j.key == key) {

        return j.category_type
      }
    }
    return "scores"
  }
  getCategoryCustom(key, app) {
    console.log("th", this.mainApp)
    if (app != '' || app != undefined || app != null){
      this.mainApp = app
    }
   
    
      console.log("app11", app, this.mainApp)
    for (let j of this.mainApp) {
      if (j.key == key) {

        return j.category_type
      }
    }
    return "scores"
  }


  getLabelExel(key, id) {
    for (let i of this.mainApp[0].attribute_details) {

      if (i.key == key) {

        return i.label
      }
    }
    return "scores"
  }

  convertToFormMap(general, classification, application_type, ticket, integration,others,app) {
    //var inputMapper:InputMap

    var general1: InputMap[] = Object.getOwnPropertyNames(general)
      .map((key: string) => new InputMap(key, general[key], general[key], 'general_attributes'));

    var classification1: InputMap[] = Object.getOwnPropertyNames(classification)
      .map((key: string) => new InputMap(key, classification[key], classification[key], 'classification_attributes'));

    var integration1: InputMap[] = Object.getOwnPropertyNames(integration)
      .map((key: string) => new InputMap(key, integration[key], integration[key], 'integration_attributes'));

    var application_type1: InputMap[] = Object.getOwnPropertyNames(application_type)
      .map((key: string) => new InputMap(key, application_type[key], application_type[key], 'application_type'));

    var ticket1: InputMap[] = Object.getOwnPropertyNames(ticket)
      .map((key: string) => new InputMap(key, ticket[key], ticket[key], 'ticket_attributes'));

    var others1: InputMap[] = Object.getOwnPropertyNames(others)
      .map((key: string) => new InputMap(key, others[key], others[key], 'others'));
    
    for (let x of others1){
      x.category_type = this.getCategoryCustom(x.key1, app)

    }
    
    var inputMapps: InputMap[] = [...general1, ...classification1, ...application_type1, ...ticket1, ...integration1,...others1];
    
    return inputMapps;
  }


  convertToExelCat(general, classification, application_type, ticket, integration) {
    var attribute_category_completion_exel: object[] = []

    var genFilled = 0, genEmpty = 0; var gen=0;

    for (let x of general) {

      if (x == null || x.value == null || x.value == undefined || x.value == '') {
        genEmpty += 1

      }
      else {

        genFilled += 1
      }
    }
    gen = genFilled / (genEmpty + genFilled)


    //integration
    var intFilled = 0, intEmpty = 0; var int=0;
 
    for (let x of integration) {
      if (x == null || x.value == null || x.value == undefined || x.value == '') {
        intEmpty += 1

      }
      else {

        intFilled += 1
      }
    }
    int = intFilled / (intEmpty + intFilled)
console.log("int",integration)
    //ticket
    var tickFilled = 0, tickEmpty = 0; var tick=0;
    for (let x of ticket) {
      if (x == null || x.value == null || x.value == undefined || x.value == '') {
        tickEmpty += 1

      }
      else {

        tickFilled += 1
      }
    }
    tick = tickFilled / (tickEmpty + tickFilled)
    //class
    var claFilled = 0, claEmpty = 0; var cla=0;
    for (let x of classification) {
      if (x == null || x.value == null || x.value == undefined || x.value == '') {
        claEmpty += 1

      }
      else {

        claFilled += 1
      }
    }
    cla = claFilled / (claEmpty + claFilled)

    //apptype
    var appFilled = 0, appEmpty = 0; var app=0;
    for (let x of application_type) {
      if (x == null || x.value == null || x.value == undefined || x.value == '') {
        appEmpty += 1

      }
      else {

        appFilled += 1
      }
    }
    app = appFilled / (appEmpty + appFilled)

    attribute_category_completion_exel.push(Object.assign({}, {
      "category_type": "general_attributes",
      "total_fields": genEmpty + genFilled,
      "completed_fields": genFilled,
      "percent": Math.ceil(100 * genFilled / (genEmpty + genFilled))
    }))

    attribute_category_completion_exel.push(Object.assign({}, {
      "category_type": "integration_attributes",
      "total_fields": intEmpty + intFilled,
      "completed_fields": intFilled,
      "percent": Math.ceil(100 * intFilled / (intEmpty + intFilled))
    }))
    attribute_category_completion_exel.push(Object.assign({}, {
      "category_type": "ticket_attributes",
      "total_fields": tickEmpty + tickFilled,
      "completed_fields": tickFilled,
      "percent": Math.ceil(100 * tickFilled / (tickEmpty + tickFilled))
    }))

    attribute_category_completion_exel.push(Object.assign({}, {
      "category_type": "application_type",
      "total_fields": appEmpty + appFilled,
      "completed_fields": appFilled,
      "percent": Math.ceil(100 * appFilled / (appEmpty + appFilled))
    }))
    attribute_category_completion_exel.push(Object.assign({}, {
      "category_type": "classification_attributes",
      "total_fields": claEmpty + claFilled,
      "completed_fields": claFilled,
      "percent": Math.ceil(100 * claFilled / (claEmpty + claFilled))
    }))

    attribute_category_completion_exel.push(Object.assign({}, {
      "category_type": "custom_applications_attributes",
      "total_fields": 5,
      "completed_fields": 0,
      "percent": 0
    }))
    console.log("attribute_category_completion_exel", attribute_category_completion_exel)
    return attribute_category_completion_exel
  }

  convertToFormCat(general, classification, application_type, ticket, integration,others,app) {
    //var inputMapper:InputMap
    console.log("in", integration)
    var attribute_category_completion: object[] = []
    var general12: InputMap[] = Object.getOwnPropertyNames(general)
      .map((key: string) => new InputMap(key, general[key], general[key], 'general_attributes'));

    var classification12: InputMap[] = Object.getOwnPropertyNames(classification)
      .map((key: string) => new InputMap(key, classification[key], classification[key], 'classification_attributes'));

    var integration12: InputMap[] = Object.getOwnPropertyNames(integration)
      .map((key: string) => new InputMap(key, integration[key], integration[key], 'integration_attributes'));

    var application_type12: InputMap[] = Object.getOwnPropertyNames(application_type)
      .map((key: string) => new InputMap(key, application_type[key], application_type[key], 'application_type'));

    var ticket12: InputMap[] = Object.getOwnPropertyNames(ticket)
      .map((key: string) => new InputMap(key, ticket[key], ticket[key], 'ticket_attributes'));

    var others12: InputMap[] = Object.getOwnPropertyNames(others)
      .map((key: string) => new InputMap(key, ticket[key], ticket[key], 'others')); 
    for (let x of others12) {
      x.category_type = this.getCategoryCustom(x.key1, app)

    }
    console.log("others121111111", others12)
//others 
    var othFilled = 0, othEmpty = 0; var oth;
    for (let x of others12) {
      console.log("others12", x)
      if (x == null || x.value == null || x.value == undefined || x.value == '') {
       
        othEmpty += 1
      }
      else {
        othFilled += 1
      }
    }
    oth = othFilled / (othEmpty + othFilled)
    //general
    var genFilled = 0, genEmpty = 0; var gen;
    for (let x of general12) {
      if (x == null || x.value == null || x.value == undefined || x.value == '') {
        genEmpty += 1
      }
      else {
        genFilled += 1
      }
    }
    gen = genFilled / (genEmpty + genFilled)


    //integration
    var intFilled = 0, intEmpty = 0; var int;
    for (let x of integration12) {
      if (x == null || x.value == null || x.value == undefined || x.value == '') {
        intEmpty += 1

      }
      else {

        intFilled += 1
      }
    }
    int = intFilled / (intEmpty + intFilled)

    //ticket
    var tickFilled = 0, tickEmpty = 0; var tick;
    for (let x of ticket12) {
      if (x == null || x.value == null || x.value == undefined || x.value == '') {
        tickEmpty += 1

      }
      else {

        tickFilled += 1
      }
    }
    tick = tickFilled / (tickEmpty + tickFilled)
    //class
    var claFilled = 0, claEmpty = 0; var cla;
    for (let x of classification12) {
      if (x == null || x.value == null || x.value == undefined || x.value == '') {
        claEmpty += 1

      }
      else {

        claFilled += 1
      }
    }
    cla = claFilled / (claEmpty + claFilled)

    //apptype
    var appFilled = 0, appEmpty = 0; var app;
    for (let x of application_type12) {
      if (x == null || x.value == null || x.value == undefined || x.value == '') {
        appEmpty += 1

      }
      else {

        appFilled += 1
      }
    }
    app = appFilled / (appEmpty + appFilled)
    attribute_category_completion.push(Object.assign({}, {
      "category_type": "general_attributes",
      "total_fields": genEmpty + genFilled,
      "completed_fields": genFilled,
      "percent": Math.ceil(100 * genFilled / (genEmpty + genFilled))
    }))

    attribute_category_completion.push(Object.assign({}, {
      "category_type": "integration_attributes",
      "total_fields": intEmpty + intFilled,
      "completed_fields": intFilled,
      "percent": Math.ceil(100 * intFilled / (intEmpty + intFilled))
    }))
    attribute_category_completion.push(Object.assign({}, {
      "category_type": "ticket_attributes",
      "total_fields": tickEmpty + tickFilled,
      "completed_fields": tickFilled,
      "percent": Math.ceil(100 * tickFilled / (tickEmpty + tickFilled))
    }))

    attribute_category_completion.push(Object.assign({}, {
      "category_type": "application_type",
      "total_fields": appEmpty + appFilled,
      "completed_fields": appFilled,
      "percent": Math.ceil(100 * appFilled / (appEmpty + appFilled))
    }))
    attribute_category_completion.push(Object.assign({}, {
      "category_type": "classification_attributes",
      "total_fields": claEmpty + claFilled,
      "completed_fields": claFilled,
      "percent": Math.ceil(100 * claFilled / (claEmpty + claFilled))
    }))

    attribute_category_completion.push(Object.assign({}, {
      "category_type": "custom_applications_attributes",
      "total_fields": 5,
      "completed_fields": 0,
      "percent": '0'
    }))
    attribute_category_completion.push(Object.assign({}, {
      "category_type": "others",
      "total_fields": othEmpty + othFilled,
      "completed_fields": othFilled,
      "percent": Math.ceil(100 * othFilled / (othEmpty + othFilled))
    }))
    console.log("attribute_category_completion", attribute_category_completion, othFilled, othEmpty)
    return attribute_category_completion

  }
  getInputLabel(id, key, app) {
    this.mainApp = app

    for (let y of this.mainApp[0].attribute_details) {



      if (y.key == key) {
        if (y.key == 'affinity_score') {
          console.log("aff", y)
        }
        return y.label


      }
    }
  }
  getLabel(key) {
    console.log("label", key)
    return this.mainApp[0].attribute_details[key].label
  }


}
class InputMap {
  constructor(
    public key1: string,
    public label: string,
    public value: string,
    public category_type: string
  ) { }
}


