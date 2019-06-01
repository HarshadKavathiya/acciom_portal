import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms'
import {UploadserviceService} from '../uploadservice.service';
import { Routes,ActivatedRoute, RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {
  createForm:FormGroup;
  token:String;
  constructor(private fb:FormBuilder,private fileUploadService:UploadserviceService,
    private router:Router, private route1: ActivatedRoute) {
    this.createForm=fb.group({
      password:['',[Validators.required]],
      confirm_password:['',[Validators.required]],
    });
   }
  ngOnInit() {
    this.route1.params.forEach((urlParameters) => {
      this.token = (urlParameters['token']);
    });
    console.log(this.token)
    this.fileUploadService.check_reset_password_token(this.token).subscribe(data=>{
    if(data.success){
      console.log("ok")
    }
    },err=>{
      Swal("error",err.error.message,"error")
      this.router.navigate(['login'])
    })
  }
  reset_password(){
    if(!this.createForm.valid || (this.createForm.controls.password.value != this.createForm.controls.confirm_password.value))
    { alert("please enter correct passwords")
  }
  console.log(this.createForm.controls.password.value)
    this.fileUploadService.reset_password(this.createForm.controls.password.value,
      this.createForm.controls.confirm_password.value,this.token).subscribe(data=>{
        if(data.success){
          Swal("success","Password changed","success")
          this.router.navigate(['login'])
        }
      },err=>{
        Swal("error","Error","error")
        this.router.navigate(['login'])

      })
    }

}
