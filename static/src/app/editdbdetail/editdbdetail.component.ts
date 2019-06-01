import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms'
import {UploadserviceService} from '../uploadservice.service';
import { Routes, RouterModule, Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-editdbdetail',
  templateUrl: './editdbdetail.component.html',
  styleUrls: ['./editdbdetail.component.css']
})
export class EditdbdetailComponent implements OnInit {
  createForm:FormGroup;
  db_id:number;
  db_detail: any = {};

  constructor(private fb:FormBuilder,private fileUploadService:UploadserviceService,
    private router:Router,private route: ActivatedRoute) {
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
    this.route.params.subscribe(params => {
      this.db_id = params.db_id
      this.fileUploadService.get_db_connect_byid(this.db_id).subscribe(data=>{
        this.db_detail=data
        this.createForm.get('connection_name').setValue(this.db_detail.connection_name)
        this.createForm.get('type').setValue(this.db_detail.db_type);
        this.createForm.get('name').setValue(this.db_detail.db_name);
        this.createForm.get('hostname').setValue(this.db_detail.db_hostname);
        this.createForm.get('username').setValue(this.db_detail.db_username);
        this.createForm.get('password').setValue(this.db_detail.db_password);
      })
    })
  }
  viewconnection(){
    this.router.navigate(['Viewdb'])
  }
  update_db_detail(){
    console.log(this.createForm.invalid)
    this.fileUploadService.update_db_details(this.db_id,this.createForm.value).subscribe(data => {
      console.log(data)
      if(data.success){
      Swal("success","Succesfully Updated Details","success")
      this.router.navigate(['Viewdb'])
      }  
   },err=>{
      Swal("error","Something went wrong","error")
   });
  }
  check_connection(){
    console.log(this.createForm.value)
    Swal("success","connection can be created for this")
    this.fileUploadService.check_connection(this.createForm.value).subscribe(data=>{
      console.log(data)
    },err=>{
      console.log("came here")
      console.log(err.error.message)
      Swal("error","Connection could not be Created for this details")
    })
  }

}
