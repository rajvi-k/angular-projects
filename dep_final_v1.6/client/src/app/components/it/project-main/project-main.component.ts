import { Component, OnInit, ElementRef, Input, Renderer } from '@angular/core';
import { QuestionService } from './question.service';
import { LocalStorageService } from 'ng2-webstorage';
import { NgxPermissionsService } from 'ngx-permissions';
import { AppService } from '../../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MappingService } from '../../../services/mapping.service';
import { QuestionBase } from './question-base';
import { FormGroup, FormBuilder } from '@angular/forms';
import { QuestionControlService } from './question-control.service';
import { UUID } from 'angular2-uuid';
import { ProjectService } from '../../../services/project-service';
import { project } from '../../../models/project';
import { Http } from '@angular/http';
import { WorkBook } from 'xlsx/types';
import { utils } from 'xlsx';
import { write } from 'xlsx';
import { saveAs } from 'file-saver/FileSaver';

// import {uuidv1} from 'uuid/v1';
declare var $: any;
// const uuidv1 = require('uuid/v1');

//import {RatingModule} from "ng2-rating";
@Component({
  selector: 'project-main',
  templateUrl: './project-main.component.html',
  styleUrls: ['./project-main.component.css'],

})
export class ProjectMainComponent implements OnInit {
  files: any;
  url=`http://172.17.111.16:3500/api/uploads/`
  filesToUpload: Array<File> = [];
  fieldname:string;
  scores1: object = {}
  generalDynamicAttributes: any[] = [];
  integrationDynamicAttributes: any[] = []; missAttArrayExport: any[] = []
  ticketDynamicAttributes: any[] = [];
  application_typeAttributes: any[] = [];
  packageDynamicAttributes: any[] = []; customDynamicAttributes: any[] = [];
  classificationDynamicAttributes: any[] = [];
  role: string;
  projectreport: any[] = []; common: string[] = []; projectreportAll: any[] = []
  username: String;
  pagesize:number;statHeads = [];
  data: any[] = []; apps: any[] = []; columns: any[] = []
  customCat: any[] = []; customCatAttributes: any[] = []
  customColumns: any[] = [];
  x1: any[] = [];
  xx = "100%";
  formGeneral: FormGroup;
  form_classification: FormGroup;
  form_application_type: FormGroup;
  form_integration: FormGroup;
  form_ticket: FormGroup;
  form_scores: FormGroup;
  form_others: FormGroup;
  addRow: boolean = false
  //scores
  scores: object = {}; stability: number = 0; optimize_scores = {}
  digitalize_scores = {}
  expedite_scores = {}
  monetize_scores = {}
  innovation_scores = {}

  generalColumns1: any[] = []
  generalColumns2: any[] = []
  classificationColumns1: any[] = []
  classificationColumns2: any[] = []
  application_typeColumns1: any[] = []
  application_typeColumns2: any[] = []
  integrationColumns: any[] = []
  ticketColumns1: any[] = []
  ticketColumns2: any[] = []
  reportArray: any[] = [];customCol:any[]=[]
pname:string
  config= {itemsPerPage: 10};
  
  x: any = -1; scor_app_id: string;
  constructor(service: QuestionService,private projSvc: ProjectService, private localStorageSvc: LocalStorageService, private permissionsService: NgxPermissionsService, private appSvc: AppService, private elementRef: ElementRef, private renderer: Renderer, private route: ActivatedRoute, private mappingSvc: MappingService, private qcs: QuestionControlService, private router: Router, private formBuilder: FormBuilder, private http: Http ) {
    //this.generalDynamicAttributes = service.getGeneralQuestions();

    // this.pagesize=7
    const perm = [];
    this.username = this.localStorageSvc.retrieve("username")
    this.role = this.localStorageSvc.retrieve('role')
    perm.push(this.localStorageSvc.retrieve('role'))
    this.permissionsService.loadPermissions(perm)
    //this.apps = this.route.snapshot.data["appResolve"];
    this.data = this.route.snapshot.data["appResolve"];
    this.pname=this.data[0].project_name
    console.log("proj",this.data)
    this.apps = this.data[0].applications
    // this.columns = this.data[0].attributesMaster
    this.columns = this.data[0].attribute_details
    //colummns attribute_details
    for (let y of this.columns) {
      if (y.category_type != "application_type" && y.category_type != "ticket_attributes" && y.category_type != "integration_attributes" && y.category_type != "general_attributes" && y.category_type != "classification_attributes") {
        if (this.customCol.length != 0) {
          for (let i in this.customCol) {
            if (y.category_type == this.customCol[i].category_type) {

              this.customCol[i].attributes.push(y)

              //console.log("customColegoryAtts!0", this.customCol[y].attributes, this.customCol[y].category_type)
              break;
            }
            if (+i == this.customCol.length - 1) {
              //console.log("customColegoryAtts!0final", this.customCol[y].attributes, this.customCol[y].category_type)
              this.customCol.push(
                {
                  ['category_type']: y.category_type,
                  ['attributes']: [y]
                }
              )
            }
          }
        }

        else {

          this.customCol.push(
            {
              ['category_type']: y.category_type,
              ['attributes']: [y]
            }
          )
        }
      
    }
  }

    var g = 0, a = 0, t = 0, c = 0;
    for (let x of this.columns) {
      //console.log("v",x)
      if (x.category_type == "general_attributes" && g % 2 == 0) {
        this.generalColumns1.push(x);
        g += 1;

      }
      else if (x.category_type == "general_attributes" && g % 2 != 0) {
        this.generalColumns2.push(x);
        g += 1
      }
      else if (x.category_type == "classification_attributes" && c % 2 != 0) {
        this.classificationColumns1.push(x)
        c += 1

      }
      else if (x.category_type == "classification_attributes" && c % 2 == 0) {
        this.classificationColumns2.push(x)
        c += 1

      }
      else if (x.category_type == "application_type" && a % 2 == 0) {
        this.application_typeColumns1.push(x);

        a += 1;
      }
      else if (x.category_type == "application_type" && a % 2 != 0) {
        this.application_typeColumns2.push(x)

        a += 1;
      }
      else if (x.category_type == "integration_attributes") {
        this.integrationColumns.push(x)

      }

      else if (x.category_type == "ticket_attributes") {
        // console.log("helll");
        this.ticketColumns1.push(x)


      }
      else {
        this.customColumns.push(x)
      }


      }
      // else if(x.category_type=="ticket" && t%2!=0){
      //   console.log("helll");
      //   this.ticketColumns2.push(x)
      //   t+=1
      // }

     //console.log("ticketColumns", this.integrationColumns)

    //  this.classificationDynamicAttributes = service.getGeneralQuestions();
    //  this.integrationDynamicAttributes = service.getGeneralQuestions();
    //  this.packageDynamicAttributes = service.getGeneralQuestions();
    //  this.customDynamicAttributes = service.getGeneralQuestions();
    //  this.ticketDynamicAttributes = service.getGeneralQuestions();


  }

  round(x) {
    return Math.round(x)
  }
  ngOnInit() {
    //select initialize for project name


this.fieldname=this.pname
    this.scores = {}
    $('.modal').modal();
    $('ul.tabs').tabs();
    $('#label').click(function (e) {
      //alert("click")
      $("#modal1").modal('open');
      $("#modal2").modal('open');
    });

    this.formGeneral = this.qcs.toFormGroup([...this.generalColumns1, ...this.generalColumns2])


    this.form_classification = this.qcs.toFormGroup([...this.classificationColumns1, ...this.classificationColumns2])
    this.form_application_type = this.qcs.toFormGroup([...this.application_typeColumns1, ...this.application_typeColumns2])
    this.form_integration = this.qcs.toFormGroup(this.integrationColumns)
    this.form_ticket = this.qcs.toFormGroup([...this.ticketColumns1, ...this.ticketColumns2])
    this.form_others = this.qcs.toFormGroup(this.customColumns)
    this.form_scores = this.formBuilder.group({
      optimize_scores_stability: '',
      optimize_scores_maturity: '',
      optimize_scores_availibility: '',
      optimize_scores_scalability: '',
      optimize_scores_cloud_applicabilty: '',
      optimize_scores_current_cloud: '',
      optimize_scores_redundency: '',
      optimize_scores_license_optimization: '',
      optimize_scores_consolidation_score: '',
      optimize_scores_technical_debt: '',
      //digitize
      straight_through_processing_adoption_score: '',
      api_applicability_score: '',
      current_api_adoption_score: '',
      technology_obsolecence: '',
      mobility_enablement_scope: '',
      current_mobility_adoption_level: '',
      self_service_adoption: '',
      //expedite
      current_dev_ops_adoption_score: '',
      devops_applicability_score: '',
      testing_automation_adoption: '',

      //monetize
      unique_functionality: '',
      registered_as_ip: '',
      current_roi_realization_model: '',
      market_potential: '',
      ease_of_monetization: '',
      monetization_model: '',

      //innovation
      ai_or_ml_applicability: '',
      chat_bot_applicability: '',
      innovation_scores_rpa_applicability: '',
      innovation_scores_block_chain_applicability: '',
    })


  }

  report() {
    this.projectreport = []
    var all: string[] = [], all2: any[] = []
    for (let x of this.apps) {
      //console.log("id", id, x.application_id)

      this.projectreport.push({
        ['application_id']: x.application_name,
        ['atts']: [...x.attribute_details]
      })
    }

    for (let x of this.projectreport) {

      x.atts = x.atts.filter((key) => key.value == '' || key.value == undefined)

    }

    for (let x of this.projectreport) {
      all = []
      for (let y of x.atts) {
        all.push(y.label)
      }
      all2.push(all)
    }

    // console.log(all2, "this.projectreport")
    var arrays = []; this.missAttArrayExport = []
    var comm: any[] = []
    comm = this.getCommonElements(all2)
    //console.log("all2", this.common);
    //this.common = this.common.filter((key) => key.substring(1, key.length - 1))

    for (let x of comm) {
      this.common.push(x.substring(1, x.length - 1))
    }
    console.log("all22", this.common);

    for (let x of this.common) {
      for (let y of this.columns) {
        // console.log("y", y.label, x)
        if (y.label == x) {
          this.missAttArrayExport.push(y)
        }
      }

    }
    console.log(this.missAttArrayExport, "this.projectreport")



  }
  getCommonElements(arrays) {//Assumes that we are dealing with an array of arrays of integers
    var currentValues = {};
    var commonValues = {};
    for (var i = arrays[0].length - 1; i >= 0; i--) {//Iterating backwards for efficiency
      currentValues[arrays[0][i]] = 1; //Doesn't really matter what we set it to
    }
    for (var i = arrays.length - 1; i > 0; i--) {
      var currentArray = arrays[i];
      for (var j = currentArray.length - 1; j >= 0; j--) {
        if (currentArray[j] in currentValues) {
          commonValues[currentArray[j]] = 1; //Once again, the `1` doesn't matter
        }
      }
      currentValues = commonValues;
      commonValues = {};
    }

    return Object.keys(currentValues).map(function (value) {
      return JSON.stringify(value);
    });
  }

  //proj wise report export
  exportToMissingExcel() {
    var d = new Date();
    var date = d.toDateString();



    var count = 0;
    console.log("Data 1 = ", this.missAttArrayExport);
    this.statHeads = [];
    var temp = "{"
    for (var a of this.missAttArrayExport) {
      if (count === 0) {
        count = 1
        temp = temp + `"${a.key}":" "`
      }
      else {
        temp = temp + ","
        temp = temp + `"${a.key}":" "`
      }
    }
    temp = temp + "}";
    const ws_name = 'Sheet1';
    const wb: WorkBook = { SheetNames: [], Sheets: {} };
    const ws: any = utils.json_to_sheet([JSON.parse(temp)]);
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

  }
  //app wise report and export
  exportToExcel() {
    var d = new Date();
    var date = d.toDateString();



    var count = 0;
    console.log("Data 1 = ", this.reportArray);
    this.statHeads = [];
    var temp = "{"
    for (var a of this.reportArray) {
      if (count === 0) {
        count = 1
        temp = temp + `"${a.key}":" "`
      }
      else {
        temp = temp + ","
        temp = temp + `"${a.key}":" "`
      }
    }
    temp = temp + "}";
    const ws_name = 'Sheet1';
    const wb: WorkBook = { SheetNames: [], Sheets: {} };
    const ws: any = utils.json_to_sheet([JSON.parse(temp)]);
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



  }
  generate(id) {
    this.reportArray = []

    for (let x of this.apps) {
      //console.log("id", id, x.application_id)
      if (x.application_id == id) {
        console.log("id11", id, x.attribute_details)
        for (let y of x.attribute_details) {
          if (y.value == "" || y.value == null || y.value == undefined) {
            this.reportArray.push(y)
          }
        }
      }
    }

    console.log("reportArray", this.reportArray)
  }
  //report and export ends
  scoreFunc(id) {
    this.scor_app_id = id;
  }

  onAdd() {
    if ((this.formGeneral.value.name === "") || (this.formGeneral.value.application === "")) {
      alert("Please fill up the Form")
    }
    else {
      var date=new Date().toLocaleString()
      let appid = UUID.UUID();
      
      // this.date=new Date().toLocaleString();
      console.log("appid :", appid);
      var exData2: object[] = []
      var exData: any[] = this.mappingSvc.convertToFormMap(this.formGeneral.value, this.form_classification.value, this.form_application_type.value, this.form_ticket.value, this.form_integration.value, this.form_others.value, this.columns)
      console.log("added data", exData2)
      var attribute_category_completion = this.mappingSvc.convertToFormCat(this.formGeneral.value, this.form_classification.value, this.form_application_type.value, this.form_ticket.value, this.form_integration.value, this.form_others.value, this.columns)
      for (let x of exData) {
        let tempkey = { ['key']: x.key1 }
        if (tempkey.key == 'application_id') {
          var y: object = {
            ['key']: x.key1,
            ['value']: appid,
            ['label']: this.mappingSvc.getInputLabel(this.formGeneral.value.application_id, x.key1, this.data),
            ['controlType']: 'textbox',
            ['category_type']: x.category_type,
            ['type']: 'email'
          }
          exData2.push(y)
        } else {
          var y: object = {
            ['key']: x.key1,
            ['value']: x.value,
            ['label']: this.mappingSvc.getInputLabel(this.formGeneral.value.application_id, x.key1, this.data),
            ['controlType']: 'textbox',
            ['category_type']: x.category_type,
            ['type']: 'email',

          }
          exData2.push(y)
        }

      }
      let attribute_details: object[] = exData2
      let x: object = {
        ['attribute_details']: exData2,
        // ['application_id']: this.formGeneral.value.application_id,
        ['application_id']: appid,
        ['application_name']: this.formGeneral.value.name,
        ['attribute_category_completion']: attribute_category_completion,
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
        },
        created_by: this.username,
        created_at:date,
        modified_by: "",
        modified_at:""
        
      }
      
      
      console.log("onadd", x)
      this.appSvc.addApp(x).subscribe(res => {
        this.appSvc.getApps().subscribe(_ => {
          this.data = _; this.apps = this.data[0].applications;
          console.log("onedit", this.data)
        })
      },
        err => alert(err))
    }
  }

  onEdit() {
    //console.log("edited", this.formGeneral.value)
     var date=new Date().toLocaleString()
    // console.log("added date",this.date)
    // console.log("added user",this.addedUser)
    var exData2: object[] = [], attribute_category_completion: any[] = []
    var exData: any[] = this.mappingSvc.convertToFormMap(this.formGeneral.value, this.form_classification.value, this.form_application_type.value, this.form_ticket.value, this.form_integration.value, this.form_others.value, this.columns)
    // console.log("edited",exData2)
     attribute_category_completion =  this.mappingSvc.convertToFormCat(this.formGeneral.value, this.form_classification.value, this.form_application_type.value, this.form_ticket.value, this.form_integration.value, this.form_others.value, this.columns)
    //console.log(attribute_category_completion)
    for (let x in exData) {
      var y: object = {
        ['key']: exData[x].key1,
        ['value']: exData[x].value,
        ['label']: this.mappingSvc.getInputLabel(this.formGeneral.value.application_id, exData[x].key1, this.data),
        ['controlType']: 'textbox',
        ['category_type']: exData[x].category_type,
        ['type']: 'email'


      }
      exData2.push(y)
    }



    let attribute_details: object[] = exData2
    let x: object = {
      ['attribute_details']: exData2,
      ['application_id']: this.formGeneral.value.application_id,
      ['application_name']: this.formGeneral.value.name,
      ['attribute_category_completion']: attribute_category_completion,
      ['scores']: this.mappingSvc.mapScores(this.scores),
      modified_by:this.username,
      modified_at:date
    }
    // Object.assign(addObj,exData)
    console.log("check",x)

    this.appSvc.updateAppById(this.formGeneral.value.application_id, x).subscribe(res => {
      this.appSvc.getApps().subscribe(_ => {
        this.data = _;
        this.apps = this.data[0].applications;
        console.log("onedit",_)

      }, err => alert(err))
    })
  }
  onDelete() {
    this.appSvc.deleteApps(this.formGeneral.value.application_id).subscribe(res => {
      this.appSvc.getApps().subscribe(_ => {
        this.data = _;
        this.apps = this.data[0].applications;
        console.log("delete", this.data)
      })
    },

      err => alert(err))
  }
  submitScores(debt, optimization, cloud_applicabilty, redundency, current_cloud, availibility, scalability, stability, maturity, self_service_adoption, current_mobility_adoption_level, mobility_enablement_scope, technology_obsolecence, current_api_adoption_score, api_applicability_score, straight_through_processing_adoption_score, testing_automation_adoption, current_dev_ops_adoption_score, devops_applicability_score, unique_functionality, registered_as_ip, current_roi_realization_model, market_potential, ease_of_monetization, monetization_model, ai_or_ml_applicability, chat_bot_applicability, innovation_scores_rpa_applicability, innovation_scores_block_chain_applicability, scor_app_id) {
    var scoresObj: object = {}

    scoresObj = {
      ['optimize_scores']: {
        ['technical_debt']: debt.value,
        ['license_optimization']: optimization.value,
        ['cloud_applicabilty']: cloud_applicabilty.value,
        ['redundency']: redundency.value,
        ['current_cloud']: current_cloud.value,
        ['availibility']: availibility.value,
        ['scalability']: scalability.value,
        ['stability']: stability.value,
        ['maturity']: maturity.value
      },
      ['digitalize_scores']: {
        ['straight_through_processing_adoption']: straight_through_processing_adoption_score.value,
        ['api_applicability']: api_applicability_score.value,
        ['current_api_adoption']: current_api_adoption_score.value,
        ['technology_obsolecence']: technology_obsolecence.value,
        ['mobility_enablement_scope']: mobility_enablement_scope.value,
        ['current_mobility_adoption_level']: current_mobility_adoption_level.value,
        ['self_service_adoption']: self_service_adoption.value
      },
      ['expedite_scores']: {
        ['testing_automation_adoption']: testing_automation_adoption.value,
        ['devops_applicability']: devops_applicability_score.value,
        ['current_dev_ops_adoption']: current_dev_ops_adoption_score.value,

      },
      ['monetize_scores']: {
        ['unique_functionality']: unique_functionality.value,
        ['registered_as_ip']: registered_as_ip.value,
        ['current_roi_realization_model']: current_roi_realization_model.value,
        ['market_potential']: current_roi_realization_model.value,
        ['ease_of_monetization']: ease_of_monetization.value,
        ['monetization_model']: monetization_model.value
      },
      ['innovation_scores']: {
        ['ai_or_ml_applicability']: ai_or_ml_applicability.value, ['chat_bot_applicability']: chat_bot_applicability.value,
        ['block_chain_applicability']: innovation_scores_block_chain_applicability.value,
        ['rpa_applicability']: innovation_scores_rpa_applicability.value


      }

    }

    console.log("scor_app_id", this.scor_app_id, scoresObj)
    this.appSvc.addScoresById(this.scor_app_id, scoresObj).subscribe(res => {
      this.appSvc.getApps().subscribe(_ => {
        this.data = _; this.apps = this.data[0].applications; this.tempFunc("", '', _[0].applications)
        console.log("onscores", this.data)
      }, err => alert(err))
    })


  }
  tabsInit(){
   
    $('ul.tabs').tabs();
  }
  
 
    tempFunc = (id1, x1, apps) => {
      this.customCat = []
      this.customCatAttributes=[]
      console.log("init", this.apps)  
      $('ul.tabs').tabs();
      if (id1 != null) {
        $('ul.tabs').tabs('select_tab', id1)
        console.log(id1,"tab")
        $('ul.tabs').tabs();
      }
      this.scor_app_id = x1; var apps1;
      if (apps == undefined || apps == null || apps == '') {
        apps1 = this.apps
      }
      else {
        apps1 = apps
      }
      for (let x of this.apps) {
        if (x.application_id == x1) {
  
          for (let y of x.attribute_details) {
  
            if (y.category_type == "general_attributes") {
              this.generalDynamicAttributes.push(y);
            }
            else if (y.category_type == "classification_attributes") {
              this.classificationDynamicAttributes.push(y)
            }
            else if (y.category_type == "application_type") {
              this.application_typeAttributes.push(y)
            }
            else if (y.category_type == "integration_attributes") {
              this.integrationDynamicAttributes.push(y)
            } else if (y.category_type == "ticket_attributes") {
              this.ticketDynamicAttributes.push(y)
            }
            else {
                console.log("yy",y)
              if(y.category_type!='scores'){
              if (this.customCat.length != 0) {
                for (let i in this.customCat) {
                  if (y.category_type == this.customCat[i].category_type) {
  
                    this.customCat[i].attributes.push(y)
  
                    //console.log("customCategoryAtts!0", this.customCat[y].attributes, this.customCat[y].category_type)
                    break;
                  }
                  if (+i == this.customCat.length - 1) {
                    //console.log("customCategoryAtts!0final", this.customCat[y].attributes, this.customCat[y].category_type)
                    this.customCat.push(
                      {
                        ['category_type']: y.category_type,
                        ['attributes']: [y]
                      }
                    )
                  }
                }
              }
              
              else {
  
                this.customCat.push(
                  {
                    ['category_type']: y.category_type,
                    ['attributes']: [y]
                  }
                )
              }
            }
            }
          }
  
          //console.log("this.optimize_scores", this.scores)
          break;
        }
        // else{
        //   this.form=this.qcs.toFormGroup(this.columns)
        // }
      }
      console.log("custom push00", this.customCatAttributes, this.customCat)
      for (let i of this.customCat) {
        for (let j of i.attributes) {
          console.log("jj",j.label)
          this.customCatAttributes.push(j)
        }
      }
  
      console.log("custom push", this.customCatAttributes,this.customCat)
      for (let x of this.columns) {
        if (x.category_type == "general_attributes") {
          for (let y in this.generalDynamicAttributes) {
            if (this.generalDynamicAttributes[y].key == x.key) {
              break;
            }
            if (+y == this.generalDynamicAttributes.length - 1) {
              this.generalDynamicAttributes.push(x)
            }
          }
  
        }
  
        else if (x.category_type == "integration_attributes") {
          for (let y in this.integrationDynamicAttributes) {
            if (this.integrationDynamicAttributes[y].key == x.key) {
              break;
            }
            if (+y == this.integrationDynamicAttributes.length - 1) {
              this.integrationDynamicAttributes.push(x)
            }
          }
  
        }
  
  
        else if (x.category_type == "classification_attributes") {
          for (let y in this.classificationDynamicAttributes) {
            if (this.classificationDynamicAttributes[y].key == x.key) {
              break;
            }
            if (+y == this.classificationDynamicAttributes.length - 1) {
              this.classificationDynamicAttributes.push(x)
            }
          }
  
        }
  
  
        else if (x.category_type == "ticket_attributes") {
          for (let y in this.ticketDynamicAttributes) {
            if (this.ticketDynamicAttributes[y].key == x.key) {
              break;
            }
            if (+y == this.ticketDynamicAttributes.length - 1) {
              this.ticketDynamicAttributes.push(x)
            }
          }
  
        }
        else if (x.category_type == "application_type") {
          for (let y in this.application_typeAttributes) {
            if (this.application_typeAttributes[y].key == x.key) {
              break;
            }
            if (+y == this.application_typeAttributes.length - 1) {
              this.application_typeAttributes.push(x)
            }
          }
  
        }
  
        else {

          //cust cat null
          if (this.customCatAttributes.length!=0){
          for (let y in this.customCatAttributes) {
            if (this.customCatAttributes[y].key == x.key) {
              break;
            }
            if (+y == this.customCatAttributes.length - 1) {
              if (this.customCat.length != 0) {
              for (let i in this.customCat) {
                if (x.category_type == this.customCat[i].category_type) {
  
                  this.customCat[i].attributes.push(x)
  
                  //console.log("customCategoryAtts!0", this.customCat[y].attributes, this.customCat[y].category_type)
                  break;
                }
                if (+i == this.customCat.length - 1) {
                  //console.log("customCategoryAtts!0final", this.customCat[y].attributes, this.customCat[y].category_type)
                  this.customCat.push(
                    {
                      ['category_type']: x.category_type,
                      ['attributes']: [x]
                    }
                  )
                }
              }
              }
              else{
                
                  this.customCat.push(
                    {
                      ['category_type']: x.category_type,
                      ['attributes']: [x]
                    }
                  )
              }
            
          }
          
        
        }
      }
          else {
            if (this.customCat.length != 0) {
              for (let i in this.customCat) {
                if (x.category_type == this.customCat[i].category_type) {

                  this.customCat[i].attributes.push(x)

                  //console.log("customCategoryAtts!0", this.customCat[y].attributes, this.customCat[y].category_type)
                  break;
                }
                if (+i == this.customCat.length - 1) {
                  //console.log("customCategoryAtts!0final", this.customCat[y].attributes, this.customCat[y].category_type)
                  this.customCat.push(
                    {
                      ['category_type']: x.category_type,
                      ['attributes']: [x]
                    }
                  )
                }
              }
            }
            else{
            this.customCat.push(
              {
                ['category_type']: x.category_type,
                ['attributes']: [x]
              }
            )
          }
        }
     
    }
      }
      this.customCatAttributes=[]
      console.log("pp", this.customCat)
      for (let i of this.customCat) {
        for (let j of i.attributes) {
         
          this.customCatAttributes.push(j)
        }
      }
      this.formGeneral = this.qcs.toFormGroup(this.generalDynamicAttributes)
  this.form_classification = this.qcs.toFormGroup(this.classificationDynamicAttributes)
  this.form_application_type = this.qcs.toFormGroup(this.application_typeAttributes)
  this.form_integration = this.qcs.toFormGroup(this.integrationDynamicAttributes)
  this.form_ticket = this.qcs.toFormGroup(this.ticketDynamicAttributes)
  this.form_others = this.qcs.toFormGroup(this.customCatAttributes)
      // $('ul.tabs').tabs();
  console.log("classcust", this.form_others, this.customCat)
  //scores
  // $('.modal').modal();
  // $('ul.tabs').tabs();
  // $('#label').click(function (e) {
  //   //alert("click")
  
  //   $("#modal2").modal('open');
  // });
  
  this.scores = {}
  
  
  // console.log("id", this.scor_app_id, x1)
  
  for (let x of this.apps) {
    this.scores = {}
    if (x.application_id == x1) {
  
      if (x.scores != undefined) {
        // console.log('x.scores defined', x.scores, x.application_id, this.scores)
        this.scores = {
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
        //console.log(' defined', this.scores)
        break;
      }
      else {
        this.scores = {
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
        // console.log(' undefined for check', this.scores)
        break;
      }
    }
  
  
  
  }
    }
  addRows() {
    // console.log("entered ",this.x)
    //   //if(this.role=="Admin"||this.role=="TPC"){
    this.addRow = true
    this.formGeneral = this.qcs.toFormGroup([...this.generalColumns1, ...this.generalColumns2])
    this.form_classification = this.qcs.toFormGroup([...this.classificationColumns1, ...this.classificationColumns2])
    this.form_application_type = this.qcs.toFormGroup([...this.application_typeColumns1, ...this.application_typeColumns2])
    this.form_integration = this.qcs.toFormGroup(this.integrationColumns)
    this.form_ticket = this.qcs.toFormGroup([...this.ticketColumns1, ...this.ticketColumns2])
    this.form_others = this.qcs.toFormGroup(this.customColumns)
   
  }

  //file 
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload)
    //this.product.photo = fileInput.target.files[0]['name'];
  }
  upload() {
    $('#btadd').click(function(){
      $('#cin').val('');
   });
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);

    formData.append("path", this.fieldname)
    for (let i = 0; i < files.length; i++) {

      //add project name to name
      var name = this.pname + "_" + files[i].name;
      formData.append("uploads[]", files[i], name);

    }
    console.log('form data variable :   ' + formData.toString());
    // formData.append("uploads[]", files[0], files[0]['name']);
    // this.address.documents = files.toString();

    this.http.post('http://172.17.111.16:3500/api/uploads', formData)
      .map(files => files.json())
      .subscribe(files => console.log('files', files))
      alert('Files Uploaded Successfully')
  }

  download(){
  
      var url=`http://172.17.111.16:3500/api/uploads/download`
      var arg=this.pname
      var urltosend=`${url}/${arg}`
      console.log(urltosend)
    
      this.http.get(urltosend)
      .map(res => res.json())
      .subscribe(res =>{this.files=res,console.log('files', this.files)})
  
  }

  

}