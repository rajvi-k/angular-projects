import { Component, OnInit } from '@angular/core';
// import { IStepChangeEvent, StepState } from '@covalent/core';

@Component({
  selector: 'wizard3',
  templateUrl: './wizard3.component.html',
  styleUrls: ['./wizard3.component.css']
})
export class Wizard3Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // activeDeactiveStep1Msg: string = 'No select/deselect detected yet';
  // stateStep2: StepState = StepState.Required;
  // stateStep3: StepState = StepState.Complete;
  // disabled: boolean = false;

  // toggleRequiredStep2(): void {
  //   this.stateStep2 = (this.stateStep2 === StepState.Required ? StepState.None : StepState.Required);
  // }

  // toggleCompleteStep3(): void {
  //   this.stateStep3 = (this.stateStep3 === StepState.Complete ? StepState.None : StepState.Complete);
  // }

  // activeStep1Event(): void {
  //   this.activeDeactiveStep1Msg = 'Active event emitted.';
  // }

  // deactiveStep1Event(): void {
  //   this.activeDeactiveStep1Msg = 'Deactive event emitted.';
  // }

  // change(event: IStepChangeEvent): void {
    
  // };

}
