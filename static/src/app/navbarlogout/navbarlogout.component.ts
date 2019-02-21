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
    // this.flashMessage.show("You are now logged Out", {cssClass: 'alert-success', timeout:3000})
    this.router.navigate(['/login']);
      this.login1=false
  }

  refresh(){
    this.router.navigate(['/startup'])
  }
  Userdetail(){
    this.router.navigate(['/user'])
  }
  

}
