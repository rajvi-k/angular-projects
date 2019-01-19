import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { XlsxToJsonService } from '../../../services/xlsx-to-json-service';
import { ViewEncapsulation } from '@angular/core'
import { LocalStorageService } from 'ng2-webstorage';
import * as _ from 'lodash';
import { MappingService } from '../../../services/mapping.service';
import { UUID } from 'angular2-uuid';
declare var $: any;

@Component({
  selector: 'app-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ImporterComponent implements OnInit {

  public exe_general: any[] = []; exe_classification: any[] = []; exe_application_type: any[] = []; exe_ticket: any[] = []; exe_integration: any[] = []; public appArray: any[] = []
  public compData: any = [];
  public dataDB: any = [];
  public result: any;
  public og: any;
  public success: number = 1;
  public finalStruct: any = [];
  remTmp = [];
  finalresult = [];
  // public statHeads = ["Application Id", "Name ", "Description", "LOB", "Business Function", "Owner", "Business Critically", "Application Age", "Planned DeCommission date Month / Year", "Functional Complexity", "Functional Fitment", "Operating Knowledge", "UI Type", "Country of Usage", "Languages Supported", "User Type", "No. Of Users", "Expected User Growth", "Usability Index", "Application Documentation ", "OS", "Deployment Type", "Production Release Frequency (Releases per Year)", "Vendor Dependency", "No. Of Integrations", "No. Of Point to Point Integrations", "No. of Middleware based Integrations", "No. Of API / Services Exposed", "% of Functionality avaiable as API", "Affinity Score", "Total No. of Tickets", "No. Of CRs.", "No. Of Bug fixes", "Application Type", "Custom applications Attributes", "UI Dev Language", "UI Library / Framework with Version", "Application Layer Dev Language", "Application Layer Library / Framework with Version", "Application Layer Products with Version", "MiddleWare with Version", "Storage Type", "Storage Product and Version", "Persistence (Database) Framework with Version", "SCM Tool", "Classification Attributes", "Pace Layer Category", "4Rs", "Stability", "Maturity", "Availibility Score", "Scalability Score", "Cloud Applicabilty Score", "Current Cloud  Score", "Redundency Score", "License Optimization score", "Consolidation Score", "Technical Debt Score", "Straight Through Processing adoption score", "API Applicability Score", "Current API Adoption Score", "Technology Obsolecence", "Mobility Enablement Scope", "Current Mobility Adoption Level ", "Self - Service Adoption", "Testing Automation Adoption", "DevOps Applicability Score", "Current Dev Ops Adoption Score", "Unique Functionality", "Registered as  IP", "Current ROI Realization Model", "Market Potential", "Ease Of Monetization", "Monetization Model", "AI / ML Applicability ", "Chat Bot Applicability ", "RPA Applicability Score", "Block Chain Applicability Score", "LTI Owner", "Redundant Application Name", "Impact of downtime", "TCO Score", "Devlopement Methodology"];
  public statHeads = ["Application Id", "Name ", "Description", "LOB", "Business Function", "Owner", "Business Critically", "Application Age", "Functional Complexity", "Functional Fitment"];
  private xlsxToJsonService: XlsxToJsonService = new XlsxToJsonService();
  public count: Number = 0;
  constructor(private http: Http, private localStorageSvc: LocalStorageService, private mappingSvc: MappingService) {
  }
  ngOnInit() {
    // $('select').material_select();
    $(".two").hide();
    $(".three").hide();
  }
  handleFile(event) {
    this.http.get(`http://localhost:3500/transform/projects/pname/` + $(`#pname1 option:selected`).text().trim()).subscribe(data => {
      // Read the result field from the JSON response.
      data = data.json();
      console.log("Shashank Data = ", data)
      this.statHeads = [];
      this.dataDB = data;
      for (var a of data[0].attribute_details) {
        // console.log(a.key);
        this.statHeads.push(a.key)
      }
    });
    setTimeout(() => {
      this.generateFirstDiv(event)
      // this.localStorageSvc.clear("project_name");
    }, 500)
    // console.log("hey")
  }
  processDataFrmSheet(data) {
    // console.log("In Process Func = ", data['sheets'].Sheet1);
    var tempob = [];
    for (let tp of data['sheets'].Sheet1) {
      let ed = {};
      $.each(tp, (key, value) => {
        // let a = key.
        let a = key.replace(/ /g, "_").replace(/\n/g,"_");
        // console.log("Key = ", a.toLowerCase() )
        // console.log("value = ",value);
        ed[a.toLowerCase()] = value;
      })
      tempob.push(ed);
      // console.log("Temp Obj = ",tempob)
      // console.log("Tp = ",tp)
    }
    data['sheets'].Sheet1.splice(0, data['sheets'].Sheet1.length);
    data['sheets'].Sheet1 = tempob;
    // console.log("Final Processed Data = ", data['sheets'].Sheet1);
    return data;
  }
  generateFirstDiv(event) {
    let file = event.target.files[0];
    this.xlsxToJsonService.processFileToJson({}, file).subscribe(data => {
      // console.log("data before processing = ",data);
      // setTimeout(()=>{
      data = this.processDataFrmSheet(data);
      console.log("data after processing = ", data);
      // }, 1000);
      var temp: any = [];
      this.result = JSON.stringify(data['sheets'].Sheet1);
      // console.log("Result For Analysis = ",this.result);
      this.compData = data;
      $.each(data['sheets'].Sheet1['0'], function (index, element) {
        console.log("Key = " + index + "\tValue = " + element)
        temp[temp.length] = index;
      })
      this.count = temp.length
      // console.log("****** Count = ", this.count)
      // console.log(temp);
      this.og = temp;
      this.result = [];
      for (var i of this.og) {
        var tp = this.generateDataStructure(i);
        this.result.push(tp);
      }
      // this.result=temp;
      // console.log(this.result);
      $('.one').hide('slide', { direction: 'left' }, 1000);
      $('.two').show('slide', { direction: 'right' }, 1000);
      setTimeout(function () {
        $('select').material_select();
      })
    })
  }
  generateDataStructure(colName) {
    var colid = colName.replace(/[^\w\s]/g, '').replace("  ", " ").replace(/ /g, "_")
    var tp = {
      column_name: colName,
      column_id: colid,
      mapped_name: ""
    }
    return tp;
  }
  validate() {
    // console.log(this.result);;
    var tmpz = [];
    var flag = 0;
    for (var tp of this.result) {
      var mapData = $(`#${tp.column_id} option:selected`).text();
      if (tmpz.length === 0) {
        tp.mapped_name = mapData
        tmpz.push(mapData);
      }
      else {
        // console.log(tmpz.indexOf(mapData));
        if (tmpz.indexOf(mapData) > -1 && mapData != "N/A") {
          // console.log("in if")
          flag = 1;
        }
        else {
          flag = 0;
        }
        if (flag === 0) {
          // tp.column_id = mapData
          tp.mapped_name = mapData;
          tmpz.push(mapData);
          this.success = 1;
        }
        else {
          this.success = 0;
          alert("please check all attributes");
          break;
        }
      }
    }
    console.log("Tmpz = ", tmpz);
    console.log("this.result = ", this.result);
    // console.log("success", this.success)
    if (this.success === 1) {
      $('.two').hide('slide', { direction: 'left' }, 1000);
      $('.three').show('slide', { direction: 'right' }, 1000);
      this.generateDivThree();
    }
  }
  generateDivThree() {

    var newTmp = [];
    var tpcount = this.compData["sheets"].Sheet1.length;
    for (let i = 0; i < tpcount; i++) {
      newTmp = []
      $.each(this.compData["sheets"].Sheet1[i], function (key, value) {
        newTmp.push(value);
      })
      this.remTmp.push(newTmp);
    }
    // console.log("remTmp = ", this.remTmp)
    // console.log("Comp data = ", this.compData["sheets"].Sheet1)
    // console.log("DataDB = ", this.dataDB[0].attribute_details)
    this.generateFinalData();
  }
  generateFinalData() {
    // this.getSingleStruct(0);
    // var obj = {
    //   ds: this.compData["sheets"].Sheet1,
    //   mapped: this.result,
    //   sd: this.dataDB[0].attribute_details
    // }
    // this.http.put("http://localhost:3500/api/apps/pname/" + $(`#pname1 option:selected`).text().trim(), obj)
    //   .subscribe(function (data) {
    //     console.log("Data from DB = ", data);
    //   })
    for (let i = 0; i < this.compData["sheets"].Sheet1.length; i++) {
      var dataFrmSheet = this.compData["sheets"].Sheet1[i];
      //  console.log("Result = ", dataFrmSheet)
      for (var sr of this.result) {
        // console.log("sr = ",sr)
        if (sr.mapped_name === "N/A") {
          dataFrmSheet[sr.mapped_name] = "";
        }
      }
      //  console.log("Data From Sheet After = ", dataFrmSheet)
      this.finalresult.push(dataFrmSheet);
    }
    var tpaba = [];
    for (let i = 0; i < this.finalresult.length; i++) {
      var tp = {};
      // console.log(this.finalresult[i]);
      for (let j = 0; j < this.result.length; j++) {
        // console.log("trying Seomtheing ", this.finalresult[i][this.result[j].column_id])
        tp[this.result[j].mapped_name] = this.finalresult[i][this.result[j].column_id]
      }
      tpaba.push(tp);
    }
    this.finalresult=tpaba;
    var obj = {
      attribs: this.dataDB[0].attribute_details,
      data: this.finalresult
    }

    console.log("final OBJ = ", obj)
    this.http.put("http://localhost:3500/api/apps/pname/temp/" + $(`#pname1 option:selected`).text().trim(), obj)
      .subscribe((data) => {
        // console.log("Data from DB = ", data["_body"]);
        var mod = "[" + data["_body"].slice(0, -1) + "]";
        console.log("mod = ", JSON.parse(mod))
        var finaldata = JSON.parse(mod)
        console.log("Final Data = ", finaldata);
        //------------------------------------------------------------



        var xx: any[];
        for (xx of finaldata) {
          var id = UUID.UUID();
          this.exe_general = []; this.exe_classification = []; this.exe_application_type = []; this.exe_ticket = []; this.exe_integration = [];
          //x= attribute detials array 
          var app_name: string
          for (let p of xx) {
            if (p.category_type == 'general_attributes') {
              this.exe_general.push(p)
              if (p.key == 'name') {
                app_name = p.value
                console.log('appy', app_name)
              
              }
              if (p.key == 'application_id') {
                 p.value = id
                console.log("idvalue", p.value)
              }
            }
            if (p.category_type == 'classification_attributes') {
            }
            this.exe_classification.push(p)
            if (p.category_type == 'application_type') {
              this.exe_application_type.push(p)
            }
            if (p.category_type == 'ticket_attributes') {
              this.exe_ticket.push(p)
            }
            if (p.category_type == 'integration_attributes') {
              this.exe_integration.push(p)
            }
          }
          var attribute_category_completion = this.mappingSvc.convertToExelCat(this.exe_general, this.exe_classification, this.exe_application_type, this.exe_ticket, this.exe_integration)



          let attribute_details: object[] = xx
          let x: object = {
            ['attribute_details']: xx,
            ['application_id']: id,
            ['application_name']: app_name,
            ['attribute_category_completion']: attribute_category_completion,
            ['scores']: {
              ['optimize_scores']: {
                ['stability']: '0',
                ["maturity"]: '0',
                ["availibility"]: '0',
                ["scalability"]: '0',
                ["cloud_applicabilty"]: '0',
                ["current_cloud"]: '0',
                ["redundency"]: '0',
                ["license_optimization"]: '0',

                ["technical_debt"]: '0'
              },
              ['digitalize_scores']: {
                //digitalise 
                ["self_service_adoption"]: '0',
                ["current_mobility_adoption_level"]: '0',

                ["mobility_enablement_scope"]: '0',
                ["technology_obsolecence"]: '0',
                ["current_api_adoption"]: '0',
                ["api_applicability"]: '0',

                ["straight_through_processing_adoption"]: '0',
              },

              ['expedite_scores']: {
                //expedite_scores
                ["current_dev_ops_adoption"]: '0',
                ["devops_applicability"]: '0',

                ["testing_automation_adoption"]: '0',
              },
              //monetize_scores
              ['monetize_scores']: {
                ["monetization_model"]: '0',
                ["ease_of_monetization"]: '0',

                ["market_potential"]: '0',
                ["current_roi_realization_model"]: '0',
                ["registered_as_ip"]: '0',
                ["unique_functionality"]: '0',
              },
              //innovation_scores
              ['innovation_scores']: {
                ["block_chain_applicability"]: '0',
                ["rpa_applicability"]: '0',
                ["chat_bot_applicability"]: '0',
                ["ai_or_ml_applicability"]: '0'
              }
            }
            //     // created_by: this.username,
            //     // created_at:date,
            //     // modified_by: "",
            //     // modified_at:"",


          }
          this.appArray.push(x)
        }

        console.log("Final app = ", this.appArray);

        for (let i = 0; i < this.appArray.length; i++) {
          if (this.appArray[i].application_name === "" || this.appArray[i].application_name === " " || this.appArray[i].application_name === undefined || this.appArray[i].application_name === null) {
            this.appArray.splice(i, 1);
          }
        }

        this.http.put("http://localhost:3500/api/apps/multiple/" + $(`#pname1 option:selected`).text().trim(), this.appArray)
          .subscribe(function (da) {
            console.log(da);
          })

        setTimeout(function () {
          $('.three').hide('slide', { direction: 'left' }, 1000);
          $(".content").text("Done")
        }, 4000)

      })
  }


}
  // pushingData(data,i){
  //   console.log("Data = ",data,i)
  //   if(i<this.compData["sheets"].Sheet1.length){
  //     this.finalresult.push(data);
  //     this.getSingleStruct(i+1);
  //     console.log("Array = ",this.finalresult);
  //   }
  // }
  // getSingleStruct(i) {
  //   var onerow = this.compData["sheets"].Sheet1[i]
  //   var temp = this.dataDB[0].attribute_details;
  //   for (var eachattr of temp) {
  //     // console.log("Complete Attribute = ",eachattr)
  //     // console.log(this.isAttrNA(eachattr.key))
  //     if (this.isAttrNA(eachattr.key)) {
  //       eachattr.value = onerow[eachattr.key]
  //     }
  //     console.log(eachattr);
  //   }
  //   return temp;
  // }
  // isAttrNA(key) {
  //   // console.log("Just Key = ",key)
  //   for (var a of this.result) {
  //     if (a.column_id === key) {
  //       if (a.mapped_name === "N/A") {
  //         return false;
  //       }
  //       else {
  //         return true;
  //       }
  //     }
  //   }
  // }
  // generateFinalData() {
  //   var finalresult = [];
  //   var count_i = 0;
  //   console.log("Data From Sheet = > ",this.compData["sheets"].Sheet1);
  //   for (let i = 0; i < this.compData["sheets"].Sheet1.length; i++) {
  //     var singleresultarr = this.dataDB[0].attribute_details;
  //     console.log("Single Result Array before = ",singleresultarr)
  //     console.log("Unkown Result = ",this.result)
  //     for (let a of this.result) {
  //       console.log("A = ",a)
  //       var mapname = a.mapped_name;
  //       console.log("Map Name = ", mapname);
  //       if (mapname === "N\A") {
  //         continue;
  //       }
  //       else {
  //         if (this.compData["sheets"].Sheet1[count_i]===undefined){
  //           break;
  //         }
  //         var data = [];
  //         data = this.compData["sheets"].Sheet1[count_i];
  //         console.log("Data = in else = ",data)
  //         data = data[mapname]
  //         console.log("Data Derived from mapname = ", data)
  //         for (var at of singleresultarr) {
  //           if (at.key === mapname) {
  //             console.log("At = ",at)
  //             at.value = data;
  //           }
  //         }

  //       }
  //     }
  //     finalresult.push(singleresultarr);

  //     count_i++;
  //   }
  //   console.log("Final Result = ", finalresult)
  //   // for(var a of finalresult){
  //   //   this.http.put("http://localhost:3500/api/apps/pname/"+$(`#pname1 option:selected`).text().trim(),a)
  //   //   .subscribe(function(data){
  //   //     console.log("Data from DB = ",data);
  //   //   })
  //   // }
  //   // setTimeout(function(){
  //   //   $('.three').hide('slide', { direction: 'left' }, 1000);
  //   //  $(".content").text("Done")
  //   // },5000)
  // }






// $.each(this.compData["sheets"].Sheet1[i], function (key, value) {
//   // console.log("key = ", key);
//   // console.log("value = ", value)

// })
// {
//   "required": false,
//     "type": "email",
//       "order": "",
//         "options": [],
//           "category_type": "general_attributes",
//             "value": "",
//               "controlType": "textbox",
//                 "label": "GPC Vendor",
//                   "key": "gpc_vendor"
