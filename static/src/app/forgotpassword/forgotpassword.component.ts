import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms'
import {UploadserviceService} from '../uploadservice.service';
import { Routes, RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2'
import swal from 'sweetalert2';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  createForm:FormGroup;

  constructor(private fb:FormBuilder,private fileUploadService:UploadserviceService,
    private router:Router) {
    this.createForm=fb.group({
      email:['',[Validators.email,Validators.required]],
    });
   }

  ngOnInit() {
  }
  reset_password_request(){
    this.fileUploadService.mail_for_reset_password(this.createForm.value).subscribe(data =>{
      if(data.success){
        Swal("success", "Link sent to your mail to Reset Password", "success")
      }
    },err=>{

      Swal("error", err.error.message, "error")
    })
  }

}
