
import { ActivatedRouteSnapshot, RouterStateSnapshot,CanActivate,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService,private router:Router){}
 canActivate(routes:ActivatedRouteSnapshot,
    state:RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isAuthenticated()
        .then(
            (authenticated:boolean)=>{
                if(authenticated){
                    return true;
                }else{
                    this.router.navigate(['/login'])
                }
            }
        )

    }
}