import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms'
import {UploadserviceService} from '../uploadservice.service';
import { Routes,ActivatedRoute, RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-verifyuser',
  templateUrl: './verifyuser.component.html',
  styleUrls: ['./verifyuser.component.css']
})
export class VerifyuserComponent implements OnInit {
token:String;
  constructor(private fileUploadService:UploadserviceService,
    private router:Router,private route1: ActivatedRoute) { }

  ngOnInit(){
    
  }

}
