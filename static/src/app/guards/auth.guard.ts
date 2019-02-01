import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import {UploadserviceService} from '../uploadservice.service';


@Injectable()
export class AuthGuard implements CanActivate{
    
    constructor(private fileUploadService:UploadserviceService,
        private router:Router){

        }
        canActivate():boolean{
            if(this.fileUploadService.loggedIn()){
                return true;
            }else{
                this.router.navigate(['/login']);
                return false;
            }
        }
}