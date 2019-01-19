import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core'
import { Http } from '@angular/http';
import { WorkBook } from 'xlsx/types';
import { utils } from 'xlsx';
import { write } from 'xlsx';
import { saveAs } from 'file-saver/FileSaver';
import { LocalStorageService } from 'ng2-webstorage';
import { ProjectService } from '../../../services/project-service';

@Component({
  selector: 'app-exporter',
  templateUrl: './exporter.component.html',
  styleUrls: ['./exporter.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ExporterComponent implements OnInit {
  statHeads=[];
  proj_name
  constructor(private http:Http,private localStorageSvc:LocalStorageService,private projSvc: ProjectService) { 

  }

  ngOnInit() {

    
  }


}