import { Component, OnInit } from '@angular/core';
import { getToken } from '@angular/router/src/utils/preactivation';
import {UploadserviceService} from '../uploadservice.service';

@Component({
  selector: 'app-access-token',
  templateUrl: './access-token.component.html',
  styleUrls: ['./access-token.component.css']
})
export class AccessTokenComponent implements OnInit {
   token:string;
   show:boolean=false;

  constructor(private fileUploadService:UploadserviceService) { }

  ngOnInit() {
  }
  generateToken(){
    this.fileUploadService.getToken().subscribe(data => {
      this.show=true;
      console.log(data)
      this.token=data.access_token
    })
  }
  copyToken(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }


}
