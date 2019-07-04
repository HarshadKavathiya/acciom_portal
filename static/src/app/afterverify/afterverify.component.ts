import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms'
import {UploadserviceService} from '../uploadservice.service';
import { Routes,ActivatedRoute, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-afterverify',
  templateUrl: './afterverify.component.html',
  styleUrls: ['./afterverify.component.css']
})
export class AfterverifyComponent implements OnInit {
  token:String;
  constructor(private fileUploadService:UploadserviceService,
    private router:Router,private route1: ActivatedRoute) { }

 
    ngOnInit() {
      console.log('Welcome')
      this.route1.params.forEach((urlParameters) => {
        this.token = (urlParameters['token']);
      });
      console.log(this.token)
      this.fileUploadService.check_verify_account_token(this.token).subscribe(data=>{
        if(data.success){
          console.log("ok")
          console.log(data.message)
        }
        },err=>{
          this.router.navigate(['login'])
        })
    }
    tologin(){
      this.router.navigate(['login'])
    }

}
