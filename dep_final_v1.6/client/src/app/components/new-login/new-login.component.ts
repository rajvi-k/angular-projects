import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service';
import { LocalStorageService } from 'ng2-webstorage';

declare var Materialize: any;

@Component({
  selector: 'new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.css']
})
export class NewLoginComponent implements OnInit {

  private form: FormGroup;
  private username: string;
  private password: string;
  constructor(private router: Router, private fb: FormBuilder, private userSvc: UserService, private localStorageSvc: LocalStorageService) { }

  ngOnInit() {
    this.form = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  public login() {
    // if(event.keyCode == 13){
      if (this.form.valid) {
        var obj = {
          username: this.form.value.username,
          password: this.form.value.password
        }
        //check if user is stored in db
        // console.log("uname", obj)
        this.userSvc.getUser(obj).subscribe(data => {
          // console.log("data", data)
          // console.log("roles", data.role)
          if (data.role == 'invalid User') {
            // alert('Entered username or password is incorrect')
            Materialize.toast('Entered username or password is incorrect', 3000, 'rounded')
          }
  
          else if (data.role == "Executive") {
            this.localStorageSvc.store('authkey', data.authkey)
            this.localStorageSvc.store('role', data.role)
            this.localStorageSvc.store('project_name', data.project_name)
            this.localStorageSvc.store('username', data.username)
            // this.router.navigate(['/dashboard/project',data.project_name])
            this.router.navigate(['/dashboard/input'])
          }
  
          else if (data.role == "TPC") {
            this.localStorageSvc.store('authkey', data.authkey)
            this.localStorageSvc.store('role', data.role)
            this.localStorageSvc.store('project_name', data.project_name)
            this.localStorageSvc.store('username', data.username)
            // this.router.navigate(['/dashboard/project',data.project_name])
            this.router.navigate(['/dashboard/view'])
          }
  
          else if (data.role != "") {
            this.localStorageSvc.store('authkey', data.authkey)
            this.localStorageSvc.store('role', data.role)
            this.localStorageSvc.store('project_name', data.project_name)
            this.localStorageSvc.store('username', data.username)
            // this.router.navigate(['/dashboard/project',data.project_name])
            this.router.navigate(['/dashboard/allprojects'])
          }
        })
      }
      else {
        Materialize.toast("Please fill up the details", 3000, 'rounded');
      }
    // }
  }  
}
