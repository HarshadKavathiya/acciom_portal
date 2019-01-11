import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms'
import {UploadserviceService} from '../uploadservice.service';
import { Routes, RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-dbdetails',
  templateUrl: './dbdetails.component.html',
  styleUrls: ['./dbdetails.component.css']
})
export class DbdetailsComponent implements OnInit {
  createForm:FormGroup;
  constructor(private fb:FormBuilder,private fileUploadService:UploadserviceService,
    private router:Router) {
      this.createForm=fb.group({
        type:['',[Validators.required]],
        name:['',[Validators.required]],
        hostname:['',Validators.required],
        username:['',Validators.required],
        password:['',Validators.required]
      });
    }

  ngOnInit() {
  }
  Update(){
    console.log(this.createForm.invalid)
    this.fileUploadService.StoreDB(this.createForm.value).subscribe(data => {
      console.log(data)
      if(data.Success){
      console.log(data)
      Swal("Success","Succesfully Updated Details","success")
      }else{
      console.log("error")
      Swal("error","Something went wrong","error")
     }
   });
  }

}
