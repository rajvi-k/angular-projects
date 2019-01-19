import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

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
