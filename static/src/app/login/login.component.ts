import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms'
import {UploadserviceService} from '../uploadservice.service';
import { Routes, RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2'
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  createForm:FormGroup; 

  constructor(private fb:FormBuilder,private fileUploadService:UploadserviceService,
    private router:Router, private _snackBar: MatSnackBar) {
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
  this.fileUploadService.authenticateUser(this.createForm.value).subscribe((data) => {
    if(data.success==true){
      // Swal("Success",data.message,"success")
    this.fileUploadService.storeUserData(data.access_token, data.user,data.uid,data.refresh_token,data.name);
     this.router.navigate(['startup']); 
    }
 },err=>{
   console.log(err.success)
   if(err.error.message == 'Verify User'){
     console.log("go to some page")
  this.openSnack();
     
   }
else if (err.error.message == undefined){
  Swal("Error","Connectivity lost","error")

}

   else{
   Swal("Error",err.error.message,"error")
   }
  });


}



forgot_password(){
  this.router.navigate(['forgot-password']);
}
signup(){
  this.router.navigate(['register'])
}

 openSnack(){
    this._snackBar.open('User Not verified! an email has been sent to your mail to verify ', 'Close', {
          duration: 19000,
          panelClass: ['blue-snackbar'],
          verticalPosition: 'top'

        })
      }
  
  

}
