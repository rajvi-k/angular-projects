import { Component, OnInit } from '@angular/core';
import { XlsxToJsonService } from '../../services/xlsx-to-json-service';
import { Http } from '@angular/http';
import { MappingService } from '../../services/mapping.service';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { WorkBook } from 'xlsx/types';
import { utils } from 'xlsx';
import { write } from 'xlsx';
import { saveAs } from 'file-saver/FileSaver';
import { UUID } from 'angular2-uuid';
declare var $: any;

@Component({
  selector: 'excel-inc',
  templateUrl: './excel-inc.component.html',
  styleUrls: ['./excel-inc.component.css']
})
export class ExcelIncComponent implements OnInit {

  private typeofimp;

  private xlsxToJsonService: XlsxToJsonService = new XlsxToJsonService();
  public exe_general: any[] = []; exe_classification: any[] = []; exe_application_type: any[] = []; exe_ticket: any[] = []; exe_integration: any[] = []; public appArray: any[] = []
  private sheet_names: any[] = [];
  private complete_excel_data: any;
  private selected_excel_sheet_data;
  private selected_excel_sheet_name: string;
  private project_system_attributes;
  private project_system_attributes_names = [];
  private project_system_attributes_names_with_cat=[];
  private project_attribute_details: any;
  private final_data_structure: any = [];
  private excel_header_names: any[] = [];
  private mapping_with_value: any = [];
  private mapping_with_value_inc: any = [];
  private mapping: any = {};
  private psname = [];
  private repeatancy: any = {};

  constructor(private http: Http, private mappingSvc: MappingService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    $('.collapsible').collapsible();
    $(".one").hide();
    $(".two").hide();
    $(".three").hide();
    $(".four").hide();
    $(".five").hide();
    $(".six").hide();

    console.log("project = ", this.route.snapshot.params["pname"])
  }
  importExcel(typ) {
    this.typeofimp = typ;
  }
  getSystemAttributes() {
    // this.route.snapshot.params["pname"] = $(`#pname1 option:selected`).text().trim();
    console.log("project = ", )
    this.http.get(`http://172.17.111.16:3500/transform/projects/pname/` + this.route.snapshot.params["pname"]).subscribe(data => {
      // Read the result field from the JSON response.
      data = data.json();
      this.project_system_attributes = data;
      console.log("Shashank Data = ", this.project_system_attributes)
      this.project_attribute_details = this.project_system_attributes[0].attribute_details;
    });
  }

  handleFile(event) {
    this.sheet_names = [];
    this.getSystemAttributes();
    console.log("reaching")
    let file = event.target.files[0];
    this.xlsxToJsonService.processFileToJson({}, file).subscribe(data => {
      data.sheets = this.cleanSheetNames(data);
      this.complete_excel_data = data;
      // console.log("complete Data From Excel = ",this.complete_excel_data);
      $.each(data.sheets, (key, value) => {
        this.sheet_names.push(key);
      })
      $('.first').hide('slide', { direction: 'left' }, 1000);
      $('.two').show('slide', { direction: 'right' }, 1000);
      setTimeout(function () {
        $('select').material_select();
      }, 50);
    });
  }

  selectSheet(id) {
    this.selected_excel_sheet_name = $(`#${id} option:selected`).text();
    // console.log(this.selected_excel_sheet_name);
    this.getDataForSheet(this.selected_excel_sheet_name);
  }
  getDataForSheet(sheet_name) {
    // console.log("Sheet=",sheet_name
    this.selected_excel_sheet_data = this.cleanCompleteDataKeys(this.complete_excel_data.sheets[sheet_name])
    console.log("selected Excel Sheet Data = ", this.selected_excel_sheet_data);
    // if (this.typeofimp === "Incremental") {
    //   console.log("Inc");
    //   this.getSystemAttributeKey();
    // }
    // else {
    this.getSystemAttributeKey();
    // }
  }
  getSystemAttributeKey() {
    this.excel_header_names = [];
    this.project_system_attributes_names = [];
    for (var systemAttr of this.project_system_attributes) {
      // console.log("System = ", systemAttr.attribute_details);
      for (var attr of systemAttr.attribute_details) {
        var obj = {};
        this.project_system_attributes_names.push(attr.key);
        obj["key"] = attr.key;
        obj["cat"] = attr.category_type;
        this.project_system_attributes_names_with_cat.push(obj);
      }
    }
    for (var tempAttr of this.selected_excel_sheet_data) {
      $.each(tempAttr, (key, value) => {
        if ($.inArray(key, this.excel_header_names) === -1) {
          this.excel_header_names.push(key);
        }
      })
    }
    // console.log("unique Excel Header Names = ",this.excel_header_names);
    // console.log("All System Attribute Names ",this.project_system_attributes_names);
    $('.two').hide('slide', { direction: 'left' }, 1000);
    $('.three').show('slide', { direction: 'right' }, 1000);
    setTimeout(function () {
      $('select').material_select();
    })
  }
  cleanSheetNames(sheetObj) {
    // console.log("REceived Obj = ", sheetObj);
    var temp = {};
    $.each(sheetObj["sheets"], (key, value) => {
      temp[this.cleanAndProcessKeys(key)] = value;
    })
    return temp;
  }
  cleanCompleteDataKeys(arr) {
    // console.log("Arr received for cleaning = ",arr);
    var rearr = [];
    for (var each of arr) {
      var temp = {};
      $.each(each, (key, value) => {
        temp[this.cleanAndProcessKeys(key)] = value;
      })
      rearr.push(temp);
    }
    // console.log("Cleaned Array = ",rearr);
    return rearr;
  }
  cleanAndProcessKeys(string) {
    return string.replace(/(\r\n|\n|\r)/gm, "_").replace(/ /g, "_").replace(/[()]/g, "_").replace(/\t/g, "_").toLowerCase();
  }
  getAllMappingValuesFrmSelect() {
    var success = 0;
    this.repeatancy = {};
    this.mapping = {};
    for (var getMaps of this.project_system_attributes_names) {
      // console.log("get Mapping Data = ",getMaps)
      if ($(`#${getMaps} option:selected`).text() === "Select Excel Header") {
        success = 1;
        alert("Check Mapping !! You Missed Some");
        break;
      }
      else {
        success = 0;
        this.mapping[getMaps] = $(`#${getMaps} option:selected`).text();
      }
    }
    console.log("Mapping = ", this.mapping);
    if (success === 0) {
      this.calculateRepeatancy();
      this.mappingWithValue();
    }
  }
  mappingWithValue() {
    // this.mapping_with_value={};
    this.psname = this.project_system_attributes_names;
    for (var i = 0; i < this.selected_excel_sheet_data.length; i++) {
      this.mapping_with_value[i] = this.mapping;
    }
    // console.log("Map1 = ", this.mapping_with_value)
    // console.log("Length = ", this.mapping_with_value.length)
    var mpw = this.mapping_with_value;
    var newOBJ = [];
    for (var i = 0; i < this.mapping_with_value.length; i++) {
      var temp = mpw[i]
      var obj = {};
      _.map(temp, (value, key) => {
        // console.log("Key = " + key + " Value = " + value)
        if (value === "N/A" || value === "") {
          // temp[key] = "";
          obj[key] = "";
        }
        else {
          // console.log("Key = " + key + " Value = " + value)
          // console.log("this.mapping[key] = ", this.mapping[key])
          // console.log("this.mapping with data = ", this.selected_excel_sheet_data[i][this.mapping[key]]);
          obj[key] = this.selected_excel_sheet_data[i][this.mapping[key]];
          // temp[key]="value";
        }
      })
      // console.log("OBJ = ", obj);
      newOBJ.push(obj);
      // console.log("Temp = ", temp)
    }
    // console.log("NewObj = ",newOBJ);
    this.mapping_with_value = newOBJ;
    console.log("Final mapping with value = ", this.mapping_with_value);
    // this.generateDataAccordingToProject();
  }
  calculateRepeatancy() {
    $.each(this.mapping, (key, value) => {
      // if(value === "Select Excel Header"){
      //   alert("Check Mapping !! You Missed Some");
      //   return false;
      // }
      // else{
      if (this.repeatancy[value] === undefined || this.repeatancy[value] === null) {
        this.repeatancy[value] = [];
      }
      this.repeatancy[value].push(key);
      // }
      // console.log(this.repeatancy[value]);
    })
    console.log("Repeatancy = ", this.repeatancy);
    $('.three').hide('slide', { direction: 'left' }, 1000);
    $('.four').show('slide', { direction: 'right' }, 1000);
  }
  generateDataAccordingToProject() {
    // console.log("this.project_attribute_details", this.project_attribute_details);
    // console.log("this.mapping_With_Value", this.mapping_with_value);
    var obj = {
      data: this.mapping_with_value,
      mapping:this.mapping
    }

    console.log("final OBJ = ", obj)
    this.http.put("http://172.17.111.16:3500/api/apps/pname/excelinc/" + this.route.snapshot.params["pname"], obj)
      .subscribe((data) => {
        var finaldata = data["_body"]
        console.log("Final Data = ", finaldata);
        //------------------------------------------------------------
      });
  }
  generateExcel() {
    const ws_name = 'Sheet1';
    const wb: WorkBook = { SheetNames: [], Sheets: {} };
    const ws: any = utils.json_to_sheet([this.mapping]);
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
    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), `mapping_for_${this.route.snapshot.params["pname"]}.xlsx`);
  }
}
