import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms'
import {UploadserviceService} from '../uploadservice.service';
import { Routes, RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  createForm:FormGroup; 

  constructor(private fb:FormBuilder,private fileUploadService:UploadserviceService,
    private router:Router) {
    this.createForm=fb.group({
      old_password:['',[Validators.required]],
      password:['',Validators.required],
      confirm_password:['',Validators.required]
    });
   }
  ngOnInit() {
  }
  changepassword(){
    if(!this.createForm.valid || (this.createForm.controls.password.value != this.createForm.controls.confirm_password.value))
    { Swal("Error","Please enter correct passwords","error")

  }
  else{
  console.log(this.createForm)
  this.fileUploadService.change_password(this.createForm.controls.old_password.value,this.createForm.controls.password.value).subscribe(data=>{
    if(data.success){
      Swal("Success","Password changed","success")
      this.router.navigate(['login'])
    }
  },err=>{
    Swal("Error","Incorrect password","error")
    // this.router.navigate(['login'])

  })
}
  }
  gobacktohome(){
    this.router.navigate(['/start-up'])
  }

}
