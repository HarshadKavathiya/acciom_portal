import { Component, OnInit } from '@angular/core';
import {UploadserviceService} from '../uploadservice.service';
import { Routes, RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-navbarlogout',
  templateUrl: './navbarlogout.component.html',
  styleUrls: ['./navbarlogout.component.css']
})
export class NavbarlogoutComponent implements OnInit {
  login1:boolean=true;
  constructor(private fileUploadService:UploadserviceService,
    private router:Router) { }

  ngOnInit() {
  }

  logout(){
    this.fileUploadService.logout();
    this.router.navigate(['/login']);
      this.login1=false
  }
  dashboard(){
    this.router.navigate(['/dashboard'])
  }
  refresh(){
    this.router.navigate(['/startup'])
  }
  Userdetail(){
    this.router.navigate(['/user'])
  }

  upload(){
    this.router.navigate(['home'])
  }
  

}
