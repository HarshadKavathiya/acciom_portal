import { Component, OnInit, Input } from '@angular/core';
import {UploadserviceService} from '../uploadservice.service';
import { Routes, RouterModule, Router, NavigationEnd } from '@angular/router';
import swal from 'sweetalert';
import { ViewtestcaseComponent } from '../viewtestcase/viewtestcase.component';



@Component({
  selector: 'app-navbarlogout',
  templateUrl: './navbarlogout.component.html',
  styleUrls: ['./navbarlogout.component.css']
})
export class NavbarlogoutComponent implements OnInit {
  // @Input() navigated;
  login1:boolean=true;
  constructor(private fileUploadService:UploadserviceService,
    private router:Router) { }
path:string;
  ngOnInit() {
  }

//   logout(){
//     let xyz = this.fileUploadService.get();
//     console.log(xyz);

//     if(xyz){ 
//       swal({
//         title:"Want to leave the page?",
//         text:'Changes were not saved, Click "No" to stay in the page.',
//        icon: "warning",
//        buttons:['Yes','No'], 
//        })
//        .then((buttons) => {
//          if (buttons) {
//            return;
//          } else {
//           this.fileUploadService.put(false);
//           this.fileUploadService.logout();
//           this.router.navigate(['/login']);
//             this.login1=false
//          }
//        });
//    }
//  else{
//   this.fileUploadService.logout();
//   this.router.navigate(['/login']);
//     this.login1=false
//    }
// }

//   dashboard(){
//     let xyz = this.fileUploadService.get();
//     console.log(xyz);

  
//     if(xyz){ 
//        swal({
//         title:"Want to leave the page?",
//         text:'Changes were not saved, Click "No" to stay in the page.',
//        icon: "warning",
//        buttons:['Yes','No'], 
//         })
//         .then((buttons) => {
//           if (buttons) {
//             return;
//           } else {
//             this.fileUploadService.put(false);
//             this.router.navigate(['/dashboard'])
//           }
//         });
//     }
//   else{
//     this.router.navigate(['/dashboard'])
//     }
//     console.log(!xyz)

//   }

//   refresh(){
//     let xyz = this.fileUploadService.get();
//     console.log(xyz);
//     if(xyz){ 
//       swal({
//         title:"Want to leave the page?",
//         text:'Changes were not saved, Click "No" to stay in the page.',
//        icon: "warning",
//        buttons:['Yes','No'], 
//        })
//        .then((buttons) => {
//          if (buttons) {
//            return;
//          } else {
//            this.fileUploadService.put(false);
//            this.router.navigate(['/startup'])
//          }
//        });
//    }
//  else{
//   this.router.navigate(['/startup'])
//    }
//   }

//   Userdetail(){
//     let xyz = this.fileUploadService.get();
//     console.log(xyz);
//     if(xyz){ 
//       swal({
//         title:"Want to leave the page?",
//         text:'Changes were not saved, Click "No" to stay in the page.',
//        icon: "warning",
//        buttons:['Yes','No'], 
//        })
//        .then((buttons) => {
//          if (buttons) {
//            return;
//          } else {
//           this.fileUploadService.put(false);
//           this.router.navigate(['/user'])
//          }
//        });
//    }
//  else{
//   this.router.navigate(['/user'])
//    }
// }

//   upload(){
//     let xyz = this.fileUploadService.get();
//     console.log(xyz);
//     if(xyz){ 
//       swal({
//         title:"Want to leave the page?",
//         text:'Changes were not saved, Click "No" to stay in the page.',
//        icon: "warning",
//        buttons:['Yes','No'], 
//        })
//        .then((buttons) => {
//          if (buttons) {
//            return;
//          } else {
//           this.fileUploadService.put(false);
//           this.router.navigate(['home'])
//          }
//        });
//    }
//  else{
//   this.router.navigate(['home'])
//    }
// }

//   changepassword(){
//     let xyz = this.fileUploadService.get();
//     console.log(xyz);
//     if(xyz){ 
//       swal({
//         title:"Want to leave the page?",
//         text:'Changes were not saved, Click "No" to stay in the page.',
//        icon: "warning",
//        buttons:['Yes','No'], 
//        })
//        .then((buttons) => {
//          if (buttons) {
//            return;
//          } else {
//           this.fileUploadService.put(false);
//           this.router.navigate(['changepassword'])
//          }
//        });
//    }
//  else{
//   this.router.navigate(['changepassword'])
//    }
// }

//   view_connection(){
//     let xyz = this.fileUploadService.get();
//     console.log(xyz);
//     if(xyz){ 
//       swal({
//         title:"Want to leave the page?",
//         text:'Changes were not saved, Click "No" to stay in the page.',
//        icon: "warning",
//        buttons:['Yes','No'],  
//        })
//        .then((buttons) => {
//          if (buttons) {
//            return;
//          } else {
//           this.fileUploadService.put(false);
//           this.router.navigate(['Viewdb'])
//          }
//        });
//    }
//  else{
//   this.router.navigate(['Viewdb'])
//    }
// }
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
upload(){
  this.router.navigate(['home'])
}
Userdetail(){
  this.router.navigate(['/user'])
}
changepassword(){
  this.router.navigate(['changepassword'])
}
view_connection(){
  this.router.navigate(['Viewdb'])
}
view_testsuitedetail(){
  this.router.navigate(['/Viewtestcase'])
  
}




 

}
