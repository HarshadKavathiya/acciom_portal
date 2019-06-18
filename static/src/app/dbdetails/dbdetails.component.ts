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
  db_connection=[];
  constructor(private fb:FormBuilder,private fileUploadService:UploadserviceService,
    private router:Router) {
      this.createForm=fb.group({
        connection_name:['', Validators.required],
        type:['',[Validators.required]],
        name:['',[Validators.required]],
        hostname:['',Validators.required],
        username:['',Validators.required],
        password:['',Validators.required]
      });
    }

  ngOnInit() {
    this.fileUploadService.get_db_connect().subscribe(data=>{
        console.log(data)
    })
  }
  Update(){
    console.log(this.createForm.invalid)
    this.fileUploadService.StoreDB(this.createForm.value).subscribe(data => {
      console.log(data)
      if(data.success){
      Swal("success","Succesfully Updated Details","success")
      this.router.navigate(['Viewdb'])

      }  
   },err=>{
      Swal("error","Something went wrong","error")
   });
  }
  viewconnection(){
    this.router.navigate(['Viewdb'])
  }
  Cancel(){
    this.router.navigate(['Viewdb'])


  }

}
