import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
  email:any;
  name:any;
  constructor() { }

  ngOnInit() {
    this.email=localStorage.getItem('user')
    this.name=localStorage.getItem('name')
  }
  
  

}
