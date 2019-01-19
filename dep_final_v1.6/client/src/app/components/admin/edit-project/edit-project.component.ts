import { Component, OnInit, NgZone, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { UserService } from '../../../services/user-service';
import { ProjectService } from '../../../services/project-service';
import { LocalStorageService } from 'ng2-webstorage';
declare var $: any;
import { MaterializeAction } from 'angular2-materialize';
declare var Materialize: any;
@Component({
  selector: 'edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  username: String; params; actions
  private dateOptions;
  private editform: FormGroup;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private projSvc: ProjectService, private router: Router, private localStorageSvc: LocalStorageService) {
    this.username = this.localStorageSvc.retrieve("username")
  }

  ngOnInit() {
    let ProjectId = this.route.snapshot.params.id;
    let project = this.route.snapshot.data['project'];

    this.editform = this.fb.group({
      id: [ProjectId],
      project_id: [project.project_id, Validators.required],
      project_name: [project.project_name, Validators.required],
      project_type: [project.project_type, Validators.required],
      project_status: [project.project_status, Validators.required],
      start_date: [project.start_date, Validators.required],
      delivery_date: [project.delivery_date, Validators.required],
      project_budget_hours: [project.project_budget_hours, Validators.required],
      project_budget: [project.project_budget, Validators.required],
      description: [project.description, Validators.required],
      project_users:[project.project_users],
      applications:[project.applications],
      created_by:[project.created_by], 
      created_at:[project.created_at],
      modified_by:[project.modified_by],
      modified_at:[project.modified_at],
      attribute_details:[project.attribute_details]
      
    },
   
      (err) => console.log("Error :" + err),
     
    )
    console.log(this.editform.value)
    this.params = [{ selectMonths: false }];
    this.actions = new EventEmitter<string | MaterializeAction>();
    $('select').material_select();
    $('#project_type').change((e) => {
      this.editform.value.project_type = e.currentTarget.value;
    });
    $('#project_status').change((e) => {
      this.editform.value.project_status = e.currentTarget.value;
    });
    this.dateOptions = this.getDefaultPickaOption();

    this.editform.controls['start_date'].valueChanges.subscribe((value) => {
      $('#delivery_date').pickadate('picker').set('min', value);
    });
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false // Close upon selecting a date,

    });
    $('.input-field label').addClass('active');
    setTimeout(function () { $('.input-field label').addClass('active'); }, 1);
  }
  getDefaultPickaOption(): any {
    return {
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      selectTime: false,
      selectHours: false,
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false // Close upon selecting a date,
    };
  }

  public projectEdit() {
    if(this.editform.value.project_name!=undefined && this.editform.value.project_name!="" ){
    var id = this.route.snapshot.params.id;
    var date = new Date().toLocaleString()

    var obj = {
      "project_id": this.editform.value.project_id,
      "project_name": this.editform.value.project_name,
      "project_status": this.editform.value.project_status,
      "start_date": this.editform.value.start_date,
      "delivery_date": this.editform.value.delivery_date,
      "project_budget_hours": this.editform.value.project_budget_hours,
      "project_budget": this.editform.value.project_budget,
      "description": this.editform.value.description,
      "project_type": this.editform.value.project_type,
      "modified_by": this.username,
      "modified_at": date
    }

    console.log(obj)
    this.projSvc.editProject(obj, id).subscribe(res => {
        alert("Project Edited Successfully")
        this.router.navigate(['/dashboard/view'])
      },
      err => alert("Error Occured While Updation")
    )

  }
  else{
    alert('Please fill the project name')
  }
}

}
