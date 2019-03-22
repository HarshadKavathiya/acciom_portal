import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
  email:any;
  name:any;
  constructor(    private route:ActivatedRoute,
    private router:Router,) { }

  ngOnInit() {
    this.email=localStorage.getItem('user')
    this.name=localStorage.getItem('name')
  }
  closed(){
    this.router.navigate(['/startup'])
  
  }
  

}
