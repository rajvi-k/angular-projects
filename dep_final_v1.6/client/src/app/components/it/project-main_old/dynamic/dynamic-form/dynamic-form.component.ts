import { Component, OnInit, Input } from '@angular/core';
import { QuestionBase } from '../../question-base';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '../../question-control.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  
  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) { }

  ngOnInit() {
    //generates form group with validations
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    //form data
    this.payLoad = JSON.stringify(this.form.value);
  }

}
