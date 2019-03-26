import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms'
import {UploadserviceService} from '../uploadservice.service';
import { Routes, RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-viewdb',
  templateUrl: './viewdb.component.html',
  styleUrls: ['./viewdb.component.css']
})
export class ViewdbComponent implements OnInit {
  db_connection=[]
  constructor(private fb:FormBuilder,private fileUploadService:UploadserviceService,
    private router:Router) {}
  ngOnInit() {
    this.fileUploadService.get_db_connect().subscribe(data=>{
      this.db_connection=(data.connection)
      console.log(data)

  })
  console.log(this.db_connection.length)
  }
  add_db(){
    this.router.navigate(['add-db'])
  }
  edit_detail(db_id){
    this.router.navigate([`editdb/${db_id}`])
  }

}
