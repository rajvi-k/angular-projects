import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { user } from '../../../models/user';
declare var $: any;
@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  private editform: FormGroup;
  
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private userSvc: UserService, private router: Router) { }

  ngOnInit() {
  
    let UserId = this.route.snapshot.params.id;
    let user=this.route.snapshot.data['user'];
    
    this.editform = this.fb.group({
      id: [UserId],
      project_name:[user.project_name, Validators.required],
      user_email:[user.user_email, Validators.required],
      role:[user.role, Validators.required],
      username: [user.username, Validators.required],
      password:[user.password, Validators.required]
    },
    err => console.log("Error :" + err)
    )
    $(document).ready(function () {
      $('select').material_select();
    });
    $('.input-field label').addClass('active');
    setTimeout(function(){ $('.input-field label').addClass('active'); }, 1);
    $('select').change((e) => {
      this.editform.value.role = e.currentTarget.value;
 });
  }

  public userEdit() {
    var id=this.route.snapshot.params.id;
    var obj = {
      "project_name": this.editform.value.project_name,
      "user_email": this.editform.value.user_email,
      "role": this.editform.value.role,
      "username":  this.editform.value.username,
      "password": this.editform.value.password,
    }
    console.log(obj)
    console.log("uid",id)
    this.userSvc.editUser(obj,id)
      .subscribe(
      res => {alert("User details updated sucessfully")
      this.router.navigate(['/dashboard/view-user']);
    },
      err => alert("Error Occured While Updation")

      )
     
    }
   

}
