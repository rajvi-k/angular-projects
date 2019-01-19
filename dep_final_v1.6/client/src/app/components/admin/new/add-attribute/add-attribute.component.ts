import { Component, OnInit } from '@angular/core';
import { attributes } from '../../../models/attribute';
import { fields } from '../../../models/fields';
import { DataService } from '../../../services/data.service';
import { ProjectService } from '../../../services/project-service';
import { Router, ActivatedRoute } from '@angular/router';
import snakeCasify from 'casify'
import { UpperCasePipe } from '@angular/common';
import { AppService } from '../../../services/app.service';

declare const $

@Component({
  selector: 'add-attribute',
  templateUrl: './add-attribute.component.html',
  styleUrls: ['./add-attribute.component.css', '../../../../../node_modules/bootstrap/dist/css/bootstrap.css'],
  providers: [DataService]
})
export class AddAttributeComponent implements OnInit {
  selectedAttr: any; newAtt: fields[] = []; newAtts: fields[] = []; custCount: number = 0
  showListBox:boolean=false
  customCat: any[] = []
  dirty:boolean=false
  old_customCat: any[] = []
  old_cutomCatAtt: any[] = []
  genCheck: boolean; intCheck: boolean; classCheck: boolean; appCheck: boolean; tickCheck: boolean;
  genLock: boolean=false; intLock: boolean=false; classLock: boolean=false; appLock: boolean=false; tickLock: boolean=false;
  genMiss: boolean=true; intMiss: boolean=false; classMiss: boolean=false; appMiss: boolean=false; tickMiss: boolean=false;
  lastField: fields[];
  finalTable: boolean;
  generalcheckbox: boolean = true;
  selectedValue: any; category: any;
  selectedField: any;
  general_attributes2: any[] = []
  integration_attributes2: any[] = []
  ticket_attributes2: any[] = []
  application_type2: any[] = []
  custom_applications_attributes2: any[] = []
  classification_attributes2: any[] = []
  classification_attributes: any[] = []; 
  newGenAtts: any[] = []; labelNew: string = "";keyNew:string ='';
  newIntAtts: any[] = []
  newAppAtts: any[] = []
  newCustomAtts: any[] = []
  newClassAtts: any[] = []
  newTicketAtts: any[] = []
  general_attributes: any[] = []
 oldData:any
  integration_attributes: any[] = [];  
 checkCustomCat:any[]=[]
  ticket_attributes: any[] = []
  hideAttribs:boolean=false;
  custom_applications_attributes: any[] = []
  application_type: any[] = []
  cusArray:any[]=[]
  pName: String = this.route.snapshot.params.pname;
  flagTable: boolean; tableData: any[];
  model: string[] = [];
  presetCat:any[]=[];
  disabled:boolean=true
project_id:string;
  finalAttributes = {
    general_attributes: {},
    integration_attributes: {},
    ticket_attributes: {},
    application_type: {},
    custom_applications_attributes: {},
    classification_attributes: {},
    optimize_scores: {},
    digitalize_scores: {},
    expedite_scores: {},
    monetize_scores: {},
    innovation_scores: {},
    other: {}
  }
  selectedTab:number=0
  selectedAttribute: attributes = new attributes('', 'general_attributes');
  attributes: any[] = [];
  fields: any[] = []; ProjectId: string
  fieldname: String[];
  oldAttributes: string[] = [];
  //checkedFields: any[] = []; 
  str: string = "";
  categories:any[]=[]
  sourceTemp: any[] = [];
  destinationTemp: number[] = [];
  studentDestination: any[] = [];
  allAttributes: any[] = [];
  finallist: any[] = [];
  a: any[] = [];
  b: any; providedAttributes:string[]=[]
  x:any[]=[]
  attrObj: any = [];
  pastProj:any[] = [];
  missingAtt: any[] = []
  ngOnInit() {
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip(); $('.collapsible').collapsible();
    });
    $('.modal').modal();
    $('.scrollspy').scrollSpy();
    this.ProjectId = this.route.snapshot.params.id;
    this.oldAttributes = []
    this.providedAttributes = ['general_attributes',
      'integration_attributes',
      'ticket_attributes',
      'application_type',
      'classification_attributes']
    this.pastProj =   [{
                "key": "application_id",
                "label": "Application_id",
                "controltype": "textbox",
                "value": "",
                "category_type": "general_attributes",
                "option": [],
                "order": "1",
                "required": "true",
                "type": "email"
            }]
    console.log("ccc", this.pastProj)
    // this.attributes = this._dataService.getAttributes();
    this.allAttributes = this.pastProj;
    if (this.oldAttributes.length==0 && this.tableData.length==0){
      console.log("1")
      this.oldAttributes=["general_attributes"]
      
      //this.providedAttributes
    }
    else if(this.oldAttributes.length==0 && this.tableData.length!=0){
      console.log("2")
       this.oldAttributes=this.providedAttributes
    }
    else{
      console.log("13")
    for (let x of this.providedAttributes){
      for(let y in this.oldAttributes){
        if (this.oldAttributes[y]==x){
          break
        }
        if(+y==this.oldAttributes.length-1){
          this.oldAttributes.push(x)
        }
      }
    }

  }
    this.oldData= this.route.snapshot.data['project']
    console.log("xxxxxxx",this.oldAttributes)
    this.genCheck = false; this.intCheck = false; this.classCheck = false; this.appCheck = false; this.tickCheck = false;
    for (let x of this.cusArray){
      x.check=false
    }
 this.segregateOldAttributes()
 
  }
  constructor(private _dataService: DataService, private route: ActivatedRoute, private projSvc: ProjectService, private appSvc: AppService, private router: Router) {

    this.tableData=[]
  
  }

changeTab(){
  this.selectedTab = 1;
  // if (this.selectedTab >= 2) this.selectedTab = 0;
}
changeLock(cats,value){
  
    if(value){
      for(let category of cats){
      if(category=="general_attributes"){
        this.genLock=true;
        this.genMiss=false;
        this.tickMiss=true;
      }
      else if(category=="ticket_attributes" ){
        this.tickLock=true
        this.tickMiss=false
        this.appMiss=true
      }
      else if(category=="integration_attributes"){
        console.log("intttt", this.intLock,this.intMiss)
        this.intLock=true
        this.intMiss=false
       
      }
      else if(category=="application_type" ){
        console.log("intapp", this.intLock,this.intMiss)
        this.appLock=true
        this.appMiss=false
        this.intMiss=true
      }
      else{
  
      }
    }
  }
    else{
      for(let category of cats){
        if(category=="general_attributes"){
          this.genLock=false;
          this.genMiss=true;
          this.tickMiss=false;
        }
        else if(category=="ticket_attributes" ){
          this.tickLock=false
          this.tickMiss=false
          this.appMiss=false
        }
        else if(category=="integration_attributes"){
          console.log("intttt", this.intLock,this.intMiss)
          this.intLock=false
          this.intMiss=false
         
        }
        else if(category=="application_type" ){
          console.log("intapp", this.intLock,this.intMiss)
          this.appLock=false
          this.appMiss=false
          this.intMiss=false
        }
        else{
    
        }
      }
      
    }
  
  
 
}
  hideAttributes(e){
    
       if (e.target.checked) {
         console.log("hide")
         this.hideAttribs=true
        
       }
       else {
         console.log("unhide")
         this.hideAttribs=false
       }
     }
  checkProjectType(e) {
    this.dirty=false
    this.selectedAttribute.id=''
    this.studentDestination=[]
    this.fields=[]
   
    if (e.target.checked) {
      this.changeLock(["general_attributes","ticket_attributes","application_type","integration_attributes"],true)
     
      console.log("standard", this.cusArray)
      this.showListBox=true
      var lazyFields: any[] = []
      this.disabled=false
      lazyFields = this._dataService.getFields()

      this.genCheck = true; this.intCheck = true; this.classCheck = true; this.appCheck = true; this.tickCheck = true;
      for (let x of this.cusArray) {
        x.check = true
      }
      for (let x of this.old_cutomCatAtt){
        console.log("custom push check",x)
        lazyFields.push(x)
      }
      for (let i = 0; i < lazyFields.length; i++) {
        var label = this.toTitleCase(lazyFields[i].label);
        console.log(lazyFields[i].value, lazyFields[i].key)
        var temp = lazyFields[i].key


        this.attrObj.push({
          "key": temp,
          "label": lazyFields[i].label,
          "controltype": "textbox",
          "value": "",
          "category_type": lazyFields[i].category_type,
          "option": [],
          "order": "",
          "required": "",
          "type": "email",
        });
        //console.log("data", this.attrObj)
      }
      // this.attrObj = [... this.attrObj,...lazyFields]
      this.tableData = this.attrObj;
      console.log("cc1111", this.old_cutomCatAtt, this.customCat, "gg",lazyFields)
     // console.log("checked", this.attrObj);
      this.adddata()
    }
    else {
     
      this.disabled=true
      this.changeLock(["general_attributes","ticket_attributes","application_type","integration_attributes"],false)
      console.log("this",this.disabled)
      this.showListBox=false
      this.selectedAttribute.id = ''
      this.general_attributes = []
      //this.old_cutomCatAtt=[]
      this.integration_attributes = []
      this.ticket_attributes = []
      this.classification_attributes = []
      this.application_type = []
      this.newClassAtts = []
      this.newTicketAtts = []
      this.newIntAtts = []
      this.newGenAtts = []
      this.newAppAtts = []
      this.attrObj=[]
      this.tableData=[]
      this.attrObj=[]
      this.customCat=[]
      this.genCheck = false; this.intCheck = false; this.classCheck = false; this.appCheck = false; this.tickCheck = false;
      this.fields=[]
      for (let x of this.cusArray) {
        x.check = false
      }
      this.studentDestination=[]
      console.log("custom", this.customCat, this.old_cutomCatAtt)
    }
  }
  selectAll(attribute) {

    console.log("selecta ll", attribute)
  }
  compareAttributes() {
    console.log("xx", this.oldAttributes, this.allAttributes)
    var missingAt = []
    if (this.tableData != null) {
      for (let oldAtt = 0; oldAtt < this.pastProj.length; oldAtt++) {
        for (let newAttr = 0; newAttr < this.tableData.length; newAttr++) {
          if (this.pastProj[oldAtt].key.toLowerCase() == this.tableData[newAttr].key.toLowerCase()) {
          
            break;
          }
          if (newAttr == this.tableData.length - 1) {
            console.log("unmatched", this.pastProj[oldAtt].key.toLowerCase())
            missingAt.push(this.pastProj[oldAtt])
          }
        }
      }
      return missingAt
    }
    else {
      alert("You haven't entered any attributes");
      return null
    }
  }

  toTitleCase(str) {
    return str.replace(/\w+/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  }

  addProp(e, category) {
    var lazyFields: any[] = []
    if (e.target.checked) {

      lazyFields = this._dataService.getFields().filter((item) => item.category_type == category);
      this.selectedAttribute.id=category
      this.showListBox=true
      var catVAl={['value']:category}
       this.onSelect(catVAl) 
      if(lazyFields.length==0){
        for(let x of this.old_customCat){
          if (x.category_type == category){
            for(let y of x.attributes){
              lazyFields.push(y)
            }
          break;
          }
        }
      }
      for (let x of this.cusArray) {
        if (x.category_type == category){
          x.check = true;
          break;
        }
       
      }

      console.log("checked1111", category, lazyFields);
      for (let i = 0; i < lazyFields.length; i++) {
        var label = this.toTitleCase(lazyFields[i].label);
        console.log(lazyFields[i].value, lazyFields[i].key)
        var temp = lazyFields[i].key


        this.attrObj.push({
          "key": temp,
          "label": lazyFields[i].label,
          "controltype": "textbox",
          "value": "",
          "category_type": category,
          "option": [],
          "order": "",
          "required": "",
          "type": "email",
        });
        //console.log("data", this.attrObj)
      }
      // this.attrObj = [... this.attrObj,...lazyFields]
      this.tableData = this.attrObj;

      console.log("checked", category, this.attrObj);
      this.adddata()

    }
    else {

      console.log("unchecked", category);
    
      for (let x of this.cusArray) {
        if (x.category_type == category) {
          x.check = false;
          break;
        }

      }

      if (category == 'general_attributes') {
       
        this.disabled=true
     
        this.tableData = this.tableData.filter(x => x.category_type != 'general_attributes')
        this.general_attributes = []
        this.newGenAtts = []
        // console.log("unchecked", category, this.tableData);
      }
      else if (category == 'integration_attributes') {
        this.tableData = this.tableData.filter(x => x.category_type != 'integration_attributes')
        this.integration_attributes = []
        this.newIntAtts = []


      }
       else if (category == 'ticket_attributes') {
        this.tableData = this.tableData.filter(x => x.category_type != 'ticket_attributes')
        //this.newTicketAtts = []
        this.ticket_attributes = []
        this.newTicketAtts = []

      }
      else if (category == 'classification_attributes') {
        this.tableData = this.tableData.filter(x => x.category_type != 'classification_attributes')
        //this.newClassAtts = []
        this.classification_attributes = []
        this.newClassAtts = []

      }
      else {
        this.tableData = this.tableData.filter(x => x.category_type != category)
        this.customCat=this.customCat.filter(x=>x.category_type!=category)
      }


      // if (category == 'cust') {
      //   this.tableData.filter(x => x.category_type != 'general_attributes')
      //   //this.newCustomAtts = []

      // }
      if (category == 'application_type') {
        this.tableData = this.tableData.filter(x => x.category_type != 'application_type')
        //this.newAppAtts = []
        this.application_type = []
        this.newAppAtts = []

      }

      //console.log("bef", this.general_attributes, this.integration_attributes, this.custom_applications_attributes, this.ticket_attributes)
      // this.tableData = [...  this.tableData,...this.newGenAtts,...this.newAppAtts,...this.newClassAtts,...this.newIntAtts,...this.newTicketAtts,...this.newCustomAtts]
      console.log("aft", this.tableData)
      this.attrObj = this.tableData
      this.selectedAttribute.id=''
      this.fields=[]
      this.destinationTemp=[]
    }
  }
  onSelect(attribute) {
    this.studentDestination=[];this.fields=[]
    this.category = attribute.value
    console.log("ccc", attribute.value)
    this.fields = this._dataService.getFields().filter((item) => item.category_type == this.category);
    console.log("all fields ds", this.fields, this.category)
    if (this.tableData.length!=0){
    this.studentDestination = this.tableData.filter((item) => item.category_type == this.category && item.key != 'application_id')
    }
    else{
      this.studentDestination=this.allAttributes.filter((item) => item.category_type == this.category && item.key != 'application_id')
    }
    var checkedFields: any[] = [];
    if (this.studentDestination.length <= 0) {
      checkedFields = this.fields;
    }
    for (let i = 0; i < this.fields.length; i++) {
      for (let j = 0; j < this.studentDestination.length; j++) {
        if (this.studentDestination[j].key.toLowerCase() == this.fields[i].key.toLowerCase()) {
          break;
        }
        if (j == this.studentDestination.length - 1) {
          checkedFields.push(this.fields[i])
        }
      }
    }
    this.selectedAttr = attribute.value
    this.lastField = this._dataService.getFields().slice(-1)
    this.str = this.category
    if (checkedFields != []) {
      this.fields = checkedFields;
    }
    console.log("this.checkedFields", this.category,this.fields)
  }
  showTable(x) {
    this.flagTable = true;
    this.selectedValue = x;
    console.log(this.selectedValue)
  }

  sourceEvent(event) {
    let id = event;
    this.sourceTemp = event;
    console.log("con", event, this.selectedAttribute.id)
  }
  destinationEvent(event) {
    this.destinationTemp = event;
    console.log("dest", this.destinationTemp)
  }
  AllSourceToDestination() {
    for (var i = 0; i < this.fields.length; i++) {
      this.studentDestination.push(this.fields[i]);
    }
    this.fields = []
    this.flagTable = false;
  }
  AllDestinationToSource() {
    for (var i = 0; i < this.studentDestination.length; i++) {
      this.fields.push(this.studentDestination[i]);
    }
    this.studentDestination = [];
    this.flagTable = false;
  }
  SourceToDestination() {
    if (this.sourceTemp.length > 0) {
      for (var st = 0; st < this.sourceTemp.length; st++) {
        for (var i = 0; i < this.fields.length; i++) {
          if (this.fields[i]['label'] === this.sourceTemp[st]) {
            this.studentDestination.push(this.fields[i]);

            this.fields.splice(i, 1);
            this.sourceTemp = [];
            this.flagTable = false;
          }

        }
      }
    } else {
      alert("Please Select an Item(s)!");
    }
  }
  DestinationToSource() {
    if (this.destinationTemp.length > 0) {
      for (var dt = 0; dt < this.destinationTemp.length; dt++) {
        for (var i = 0; i < this.studentDestination.length; i++) {
          console.log(this.studentDestination[i]["key"])
          console.log(this.destinationTemp[dt])
          if (this.studentDestination[i]['key'] == this.destinationTemp[dt]) {
            console.log("In if", this.destinationTemp[dt])
            this.fields.push(this.studentDestination[i]);
            this.studentDestination.splice(i, 1);
            this.destinationTemp = [];
            this.flagTable = false;
          }
        }
      }
    } else {
      alert("Please Select an Item(s)!");
    }
  }
  // showFields() {

  // }

  callCatEditSelect(category) {
    console.log(category)
    this.selectedAttribute.id=category
    this.fields=[];this.studentDestination=[]
    this.category = category
    var stdFields = this._dataService.getFields().filter((item) => item.category_type == this.category);
    //console.log("all fields ds", this.fields, this.category)
    this.studentDestination = this.tableData.filter((item) => item.category_type == this.category && item.key != 'application_id')
    var checkedFields: any[] = [];
    if (this.studentDestination.length > 0) {
      //console.log("enter")
      //edit mistake
      for (let i of  stdFields ) {
        for (let x in this.studentDestination){
          console.log("xx", i.key.toLowerCase(), stdFields[x].key.toLowerCase())
          if (i.key.toLowerCase() == this.studentDestination[x].key.toLowerCase()) {
            break
          }
          if (+x == this.studentDestination.length - 1) {
            this.fields.push(i)
        }
        }
      }
    }
    console.log("fields",this.fields)
    //       break;
    //     }
    //     if (j == this.studentDestination.length - 1) {
    //       checkedFields.push(this.fields[i])
    //     }
    //   }
    // }
    this.selectedAttr = category
    this.lastField = this._dataService.getFields().slice(-1)
    this.str = this.category
    // if (checkedFields != []) {
    //   this.fields = checkedFields;
    // }
    // console.log("this.checkedFields", this.category)

  }
  callCatSelect(category){
    console.log(category)
    this.selectedAttribute.id = category
   this.category=category
    this.fields = this._dataService.getFields().filter((item) => item.category_type == this.category);
    //console.log("all fields ds", this.fields, this.category)
    this.studentDestination = this.allAttributes.filter((item) => item.category_type == this.category && item.key != 'application_id')
    var checkedFields: any[] = [];
    if (this.studentDestination.length <= 0) {
      checkedFields = this.fields;
    }
    for (let i = 0; i < this.fields.length; i++) {
      for (let j = 0; j < this.studentDestination.length; j++) {
        if (this.studentDestination[j].key.toLowerCase() == this.fields[i].key.toLowerCase()) {
          break;
        }
        if (j == this.studentDestination.length - 1) {
          checkedFields.push(this.fields[i])
        }
      }
    }
    this.selectedAttr = category
    this.lastField = this._dataService.getFields().slice(-1)
    this.str = this.category
    if (checkedFields != []) {
      this.fields = checkedFields;
    }
   // console.log("this.checkedFields", this.category)

  }
  onSearchChange(event, customForm) {

    this.labelNew = customForm.value.fname.replace(/(\r\n|\n|\r)/gm, "_").replace(/ /g, "_").replace(/[()]/g, "_").replace(/\t/g, "_").toLowerCase();

    console.log("event", customForm.value,'|',this.keyNew)
  }
  addattribute(label, newattr: string, value, customForm) {
    console.log("enter", customForm.value)
    this.keyNew='';this.labelNew=''
    // this.model = new Hero(42, '', '');
    var valid = true;

    if (this.category == undefined) {
      valid = false;
      alert("PLease Select Category")
    }
    else{
      console.log("en tr")
      if (this.studentDestination.length!=0){
    for(let x in this.studentDestination){
      
      console.log("xxxx", this.studentDestination[x].key, customForm.value.key, this.category)
      if (this.studentDestination[x].key == customForm.value.key){
        break
      }
      if(+x==this.studentDestination.length-1){
        if (valid) {
          this.newAtt.push(new fields(0, 0, customForm.value.fname, value, customForm.value.key, 'textbox', this.category, [], '', 'email', false))
          if (newattr) {
            var obj = { id: 0, attributeid: 0, name: newattr, value: value }
            console.log("this.filter bef", this.attrObj, this.category, this.newAtt)
            this.newAtt = this.newAtt.filter((thing, index, self) =>
              index === self.findIndex((t) => (
                t.key.toLowerCase() === thing.key.toLowerCase()
              ))
            )
            console.log("this.filter new", this.attrObj, this.category, this.newAtt)
            this.studentDestination.push(new fields(0, 0, customForm.value.fname, value, customForm.value.key, 'textbox', this.category, [], '', 'email', false));

          }
        }
      }
    }
  }
  else{
        console.log("en tr222")
        if (valid) {
          this.newAtt.push(new fields(0, 0, customForm.value.fname, value, customForm.value.key, 'textbox', this.category, [], '', 'email', false))
          if (newattr) {
            var obj = { id: 0, attributeid: 0, name: newattr, value: value }
            console.log("this.filter bef", this.attrObj, this.category, this.newAtt)
            this.newAtt = this.newAtt.filter((thing, index, self) =>
              index === self.findIndex((t) => (
                t.key.toLowerCase() === thing.key.toLowerCase()
              ))
            )
            console.log("this.filter new", this.attrObj, this.category, this.newAtt)
            this.studentDestination.push(new fields(0, 0, customForm.value.fname, value, customForm.value.key, 'textbox', this.category, [], '', 'email', false));

          }
        }
  }
  }
    console.log("label", label, valid)
 
  }
  onSubmit(data) {
    this.dirty=false
    this.changeLock([this.category],true)
    this.selectedAttribute.id=''
    console.log("ObjData", this.oldAttributes, this.category)
    var obj = {}
    if (this.category == undefined) {
      alert("Please select the category")
    }
    else if (data.options.length == 0) {
      alert("Please select at least 1 attribute")
    }
    var myArray: any[] = []
    if (this.attrObj != null || this.attrObj.length != 0 || this.attrObj != undefined) {
      var x = this.category
      this.attrObj = this.attrObj.filter(function (obj) {
        return obj.category_type != x;
      });
    }

    for (let i = 0; i < data.options.length; i++) {
      if (data.options[i].selected = true) {
        var label = this.toTitleCase(data.options[i].label);
        var temp = data.options[i].value.substring(3).replace(/["']/g, "");
        var temp = temp.replace(/\s/g, '');
        console.log(temp)
        this.attrObj.push({
          "key": temp,
          "label": data.options[i].label,
          "controltype": "textbox",
          "value": "",
          "category_type": this.str,
          "option": [],
          "order": "",
          "required": "",
          "type": "email",
        });
        console.log("data", this.attrObj)
      }
    }
    for (let i = 0; i < this.attrObj.length; i++) {
      var a = this.attrObj[i].label;
      obj[a] = "";
      this.finalTable = true
    }
    for(let x of this.attrObj){
      if(x.category_type=="general_attributes"){
        this.disabled=false
        break;
      }
    }
    this.studentDestination = []
    
    this.fields=[]
    
       this.oldAttributes=this.providedAttributes
   
    this.adddata()
  }
  adddata() {
    this.customCat = []
    this.newGenAtts = []; this.newAppAtts = []; this.newClassAtts = []; this.newIntAtts = []; this.newTicketAtts = []; this.newCustomAtts = []
    this.general_attributes = []; this.ticket_attributes = []; this.integration_attributes = []; this.custom_applications_attributes = []; this.application_type = []; this.classification_attributes = []
    var id = this.route.snapshot.params.id;
    var b = this.attrObj;
    this.tableData = this.attrObj;
    this.tableData = this.tableData.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        t.key.toLowerCase() === thing.key.toLowerCase()
      ))
    )
    this.attrObj=this.tableData
    console.log("table",this.tableData,this.attrObj)
    this.tableData = this.attrObj;
    for (let x of this.tableData) {
      if (x.category_type == 'general_attributes') {

        this.general_attributes.push(x)

      }
      else if (x.category_type == 'integration_attributes') {
        this.integration_attributes.push(x)
      }
      else if (x.category_type == 'ticket_attributes') {
        this.ticket_attributes.push(x)
      }
      else if (x.category_type == 'application_type') {
        this.application_type.push(x)
      }
      else if (x.category_type == 'custom_applications_attributes') {
        this.custom_applications_attributes.push(x)
      }
      else if (x.category_type == 'classification_attributes') {
        this.classification_attributes.push(x)
      }
      else {
        //console.log("custom cat1", x)
        if (this.customCat.length != 0) {
          for (let y in this.customCat) {
            if (x.category_type == this.customCat[y].category_type) {

              this.customCat[y].attributes.push(x)

              console.log("customCategoryAtts!0", this.customCat[y].attributes, this.customCat[y].category_type)
              break;
            }
            if (+y == this.customCat.length - 1) {
              console.log("customCategoryAtts!0final", this.customCat[y].attributes, this.customCat[y].category_type)
              this.customCat.push(
                {
                  ['category_type']: x.category_type,
                  ['attributes']: [x]
                }
              )
            }
          }
        }
        else {

          this.customCat.push(
            {
              ['category_type']: x.category_type,
              ['attributes']: [x]
            }
          )

          console.log("custom push", this.customCat)
        }
        //-----end if not null
      }

    }
    console.log("custom cat22", this.customCat, this.attrObj)
    var xxx = this.general_attributes
    this.general_attributes2 = this.general_attributes
    for (let i of this.general_attributes2) {
      for (let j of this.newAtt) {
        console.log("nee", j.label, i.label.toLowerCase())
        if (j.label.toLowerCase() == i.label.toLowerCase()) {

          this.newGenAtts.push(i)

          this.general_attributes = this.general_attributes.filter((_) => _.label.toLowerCase() != i.label.toLowerCase())
        }
      }
    }
    this.integration_attributes2 = this.integration_attributes
    for (let i of this.integration_attributes2) {
      for (let j of this.newAtt) {
        if (j.label.toLowerCase() == i.label.toLowerCase()) {
          this.newIntAtts.push(i)
          this.integration_attributes = this.integration_attributes.filter((_) => _.label.toLowerCase() != i.label.toLowerCase())
        }
      }
    }

    this.ticket_attributes2 = this.ticket_attributes
    for (let i of this.ticket_attributes2) {
      for (let j of this.newAtt) {
        if (j.label.toLowerCase() == i.label.toLowerCase()) {
          this.newTicketAtts.push(i)
          this.ticket_attributes = this.ticket_attributes.filter((_) => _.label.toLowerCase() != i.label.toLowerCase())
        }
      }
    }

    this.application_type2 = this.application_type
    for (let i of this.application_type2) {
      for (let j of this.newAtt) {
        if (j.label.toLowerCase() == i.label.toLowerCase()) {
          this.newIntAtts.push(i)
          this.application_type = this.application_type.filter((_) => _.label.toLowerCase() != i.label.toLowerCase())
        }
      }
    }


    this.custom_applications_attributes2 = this.custom_applications_attributes
    for (let i of this.custom_applications_attributes2) {
      for (let j of this.newAtt) {
        if (j.label.toLowerCase() == i.label.toLowerCase()) {
          this.newCustomAtts.push(i)
          this.custom_applications_attributes = this.custom_applications_attributes.filter((_) => _.label.toLowerCase() != i.label.toLowerCase())
        }
      }
    }

    this.classification_attributes2 = this.classification_attributes
    for (let i of this.classification_attributes2) {
      for (let j of this.newAtt) {
        if (j.label.toLowerCase() == i.label.toLowerCase()) {
          this.newClassAtts.push(i)
          this.classification_attributes = this.classification_attributes.filter((_) => _.label.toLowerCase() != i.label.toLowerCase())
        }
      }
    }
  }

  onAdd() {
    var missing: any = []
    this.dirty = false
    if (this.tableData != undefined) {
      missing = this.compareAttributes()
      console.log("miss", missing)
      if (missing == 0) {
        $('#modal2').modal('open')
        this.missingAtt = [];

      }
      else if (missing != 0) {
        this.missingAtt = missing;
       
        this.missingAtt.splice(0, 1);
      
    
      
        for (let missing of this.missingAtt) {
          for (let x of this.oldData.applications) {
            for (let att of x.attribute_details) {
              console.log("final", att.key, missing.key)
              if (att.key == missing.key) {
                if (att.value != "" || att.value != null || att.value != undefined) {
                  this.dirty = true
                }
                else {
                  this.dirty = false
                }
              }
            }
          }
        }
        console.log("missing1", this.dirty, this.missingAtt)
        if (this.dirty) {
          alert("cannot delete attributes as data is present")
        }
        else{
          $('#modal1').modal('open');
        }
      }
    }
    else {
      alert("You haven't selected any attributes!")
    }
  }
  onFinalAdd() {
    var idObj = {
      "key": "application_id",
      "label": "Application Id",
      "controltype": "textbox",
      "value": "",
      "category_type": "general_attributes",
      "option": [],
      "order": "1",
      "required": "true",
      "type": "email"
    }
   
    this.tableData.splice(0, 0, idObj)
    this.projSvc.editProjectAttr(this.tableData, this.ProjectId)
      .subscribe(
      res => { this.router.navigate(['/dashboard/view']) },
      err => console.log(err)

     )
  }

  deletecustCat(category){
    console.log("category", category)
    this.tableData = this.tableData.filter(x => x.category_type != category)
    this.attrObj=this.tableData
    this.customCat = this.customCat.filter(x => x.category_type != category)
    console.log("vvvv", this.customCat)
    for (let x of this.cusArray) {
      if (x.category_type == category){
        x.check = false
        break;
      }
     
    }
    console.log(this.cusArray)
  }
  deleteCat(category) {
    var tableData2 = this.tableData; var indexFin = []
    if (category == 'gen') {
      this.general_attributes = []
      this.newGenAtts = []
      this.genCheck=false

    }
    if (category == 'int') {
      this.integration_attributes = []
      this.newIntAtts = []
      this.intCheck=false
    }
    if (category == 'tick') {
      this.ticket_attributes = []
      this.newTicketAtts = []
      this.tickCheck=false
    }
    if (category == 'class') {
      this.classification_attributes = []
      this.newClassAtts = []
      this.classCheck=false
    }


    if (category == 'cust') {
      this.custom_applications_attributes = []
      this.newCustomAtts = []
      //this.genCheck=false
    }
    if (category == 'app') {
      this.application_type = []
      this.newAppAtts = []
      this.appCheck=false
    }

    console.log("bef", this.general_attributes, this.integration_attributes, this.custom_applications_attributes, this.ticket_attributes)
    this.tableData = [...this.general_attributes, ...this.integration_attributes, ...this.custom_applications_attributes, ...this.ticket_attributes, ...this.application_type, ...this.classification_attributes]
    console.log("aft", this.tableData)
    this.attrObj = this.tableData
  }


  addCategory(newCategoryName) {
    this.oldAttributes.push(newCategoryName.value)
    console.log("new category", newCategoryName.value)
    this.selectedAttribute.id = newCategoryName.value
    this.category = this.selectedAttribute.id
    this.str=this.category
  }


  segregateOldAttributes(){
    this.cusArray=[]
      this.old_customCat = []
      // this.newGenAtts = []; this.newAppAtts = []; this.newClassAtts = []; this.newIntAtts = []; this.newTicketAtts = []; this.newCustomAtts = []
      
      console.log("this.pastProj", this.pastProj)
      for (let x of this.pastProj) {
        if(x.key!='application_id'){
       
          if (this.old_customCat.length != 0) {
            for (let y in this.old_customCat) {
              if (x.category_type == this.old_customCat[y].category_type) {

                this.old_customCat[y].attributes.push(x)

               // console.log("customCategoryAtts!0", this.old_customCat[y].attributes, this.old_customCat[y].category_type)
                break;
              }
              if (+y == this.old_customCat.length - 1) {
               // console.log("customCategoryAtts!0final", this.customCat[y].attributes, this.customCat[y].category_type)
                this.old_customCat.push(
                  {
                    ['category_type']: x.category_type,
                    ['attributes']: [x]
                  }
                )
              }
            }
          }
          else {

            this.old_customCat.push(
              {
                ['category_type']: x.category_type,
                ['attributes']: [x]
              }
            )

            
          }
          //----end if not null
        }
      
 
    }



      this.custCount=0
  for(let x of this.old_customCat){
    if (x.category_type != 'general_attributes' && x.category_type != 'integration_attributes' && x.category_type != 'ticket_attributes' && x.category_type != 'application_type' && x.category_type != 'classification_attributes' ){
 
      this.old_cutomCatAtt.push(...x.attributes)
      var y=x
      Object.assign(y,x, { count: this.custCount})
      this.checkCustomCat.push(y)
      this.custCount += 1
    }
  }
 
  for (let i of this.checkCustomCat) {
    this.cusArray.push({
      ['category_type']:i.category_type,
      ['check']:false
    })
  }
  console.log("CC", this.checkCustomCat,"||||",this.old_cutomCatAtt,this.cusArray)

}

}
