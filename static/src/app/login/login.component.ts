import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms'
import {UploadserviceService} from '../uploadservice.service';
import { Routes, RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  createForm:FormGroup;

  constructor(private fb:FormBuilder,private fileUploadService:UploadserviceService,
    private router:Router) {
    this.createForm=fb.group({
      email:['',[Validators.email,Validators.required]],
      password:['',Validators.required]
    });
   }

  ngOnInit() {
     if((this.fileUploadService.loggedIn())) {
     this.router.navigate(['home'])
     }
}

  LogIn()
{
  console.log(this.createForm.value);
  this.fileUploadService.authenticateUser(this.createForm.value).subscribe((data) => {
    if(data.success==true){
      Swal("success",data.message,"success")

      console.log(data.expires_time)
    this.fileUploadService.storeUserData(data.access_token, data.user,data.uid,data.refresh_token,data.name);
     this.router.navigate(['startup']); 
    }

   
 },err=>{
   console.log(err.success)
   Swal("error",err.error.message,"error")
  
  });


}

signup(){
  this.router.navigate(['register'])
}
}
