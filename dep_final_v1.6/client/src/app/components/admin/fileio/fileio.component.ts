import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project-service';
import { project } from '../../../models/project';
import { Router } from '@angular/router';
import { WorkBook } from 'xlsx/types';
import { utils } from 'xlsx';
import { write } from 'xlsx';
import { saveAs } from 'file-saver/FileSaver';
import { LocalStorageService } from 'ng2-webstorage';
import { Http } from '@angular/http';
declare const $: any;
declare const Materialize: any;


@Component({
  selector: 'fileio',
  templateUrl: './fileio.component.html',
  styleUrls: ['./fileio.component.css']
})
export class FileioComponent implements OnInit {
  proj_Name: string;
  role: string;
  projects: [project];
  businessCriticallyList;
  bcItems;
  dropdownSettings;
  OnItemDeSelect;
  onSelectAll;
  statHeads=[];
  typeofimp;

  constructor(private projSvc: ProjectService, private router: Router,private http:Http,private localstoragesvc:LocalStorageService) { 
    this.role = this.localstoragesvc.retrieve('role');
    this.proj_Name = this.localstoragesvc.retrieve('project_name')
  }
  ngOnInit() {
    $('select').material_select();
    this.projSvc.getLatestProjects()
      .subscribe(data => {
        this.projects = data
        console.log(this.projects)
        setTimeout(function () {
          $('select').material_select();
        }, 20)
      },
      err => console.log(err)
      )
  }
  isSetProject(){
    if($(`#pname1 option:selected`).text().trim() === "Projects")
      return false;
    else
      return true;
  }
  exportToExcel(pname) {
    var d = new Date();
    var date=d.toDateString(); 
  
    if(this.isSetProject()){
      console.log(pname.value);
      this.http.get('http://172.17.111.16:3500/transform/projects/pname/' + $(`#pname1 option:selected`).text().trim()).subscribe(data => {
        data = data.json();
        var count= 0;
        console.log("Data 1 = ", data);
        this.statHeads = [];
        var temp = "{"
        for (var a of data[0].attribute_details) {
          if(count===0)
          {
            count=1
            temp = temp + `"${a.key}":" "`
          }
          else{
            temp = temp + ","
            temp = temp + `"${a.key}":" "`
          }
        }
        temp=temp+"}";
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
        saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), `${pname.value}_${date}.xlsx`);
      });
    }
    else{
      Materialize.toast('Please Select a Project', 3000, 'rounded')
    }
  }
  // init(){
  //   $(".one").show();
  //   $(".two").hide();
  //   $(".three").hide();
  //   $(".four").hide();
  //   $(".five").hide();
  // }
  // importExcel(toi){
  //   if(this.isSetProject()){
      
  //     // console.log("toi = ",toi)
  //     this.init();
  //     this.typeofimp=toi;
  //     $('#modal1').modal();
  //     $('#modal1').modal('open');
  //   }
  //   else{
  //     Materialize.toast('Please Select a Project', 3000, 'rounded')
  //   }
  importExcel(){
    if(this.isSetProject()){
      this.router.navigate(['/dashboard/excelImportNew/' , $(`#pname1 option:selected`).text().trim()])
    }
    else{
      Materialize.toast('Please Select a Project', 3000, 'rounded')
    }
  }
  importIncExcel(){
    if(this.isSetProject()){
      this.router.navigate(['/dashboard/excelImportInc/' , $(`#pname1 option:selected`).text().trim()])
    }
    else{
      Materialize.toast('Please Select a Project', 3000, 'rounded')
    }
  }
  
}
