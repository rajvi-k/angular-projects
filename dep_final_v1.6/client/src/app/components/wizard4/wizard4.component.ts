import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'wizard4',
  templateUrl: './wizard4.component.html',
  styleUrls: ['./wizard4.component.css']
})
export class Wizard4Component implements OnInit {

 isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  pastProj: any = {}; projects:any[]=[]
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.projects=["Transformation","Visualisation"]
    
    this.pastProj = {['attribute_details']:[{ key: 'xyz', label: 'xyz', type: 'email', category_type: 'xyz'}]}
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', ]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', ]
    });
  }


}

