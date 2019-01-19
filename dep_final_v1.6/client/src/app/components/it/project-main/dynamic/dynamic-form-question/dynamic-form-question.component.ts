import { Component, OnInit ,Input} from '@angular/core';
import { QuestionBase } from '../../question-base';
import { FormGroup } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'df-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent implements OnInit {

  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;

  get isValid() { return this.form.controls[this.question.key].valid; }
  
  private name:string
  constructor() {
    $(document).ready(function() {
      $('select').material_select();
  });


   }

  ngOnInit() {
    
  }

  click(){
  //console.log("name",this.name)
  }
  isDisabled(){
    if(this.question.key !=="application_id")
    return false;
    else if(this.question.key=="application_id")
    return true;
  }
}
