import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms'
import {UploadserviceService} from '../uploadservice.service';
import { Routes, RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  createForm:FormGroup;

  constructor(private fb:FormBuilder,private fileUploadService:UploadserviceService,
    private router:Router) {
      this.createForm=fb.group({
        email:['',[Validators.required,Validators.email]],
        first_name:['',Validators.required],
        last_name:['',Validators.required],
        password:['',Validators.required],
        cpassword:['',Validators.required],
      });
     }

  ngOnInit() {
    if((this.fileUploadService.loggedIn())) {
      this.router.navigate(['home'])
  }
}

  signIn(){
    if(!this.createForm.valid || (this.createForm.controls.password.value != this.createForm.controls.cpassword.value))
    { 
    alert("Please enter correct passwords") 
     return;
    }
  console.log(this.createForm.controls.email.value)
    this.fileUploadService.register(this.createForm.value).subscribe(data=>{
      if (data.success){
        Swal("Success",data.message,"success")
        this.router.navigate(['login'])
      }
    },err=>{
      console.log(err.success)
      Swal("error",err.error.message,"error")
     
     

  });

}
GoBack(){
  this.router.navigate(['login'])
}
}
