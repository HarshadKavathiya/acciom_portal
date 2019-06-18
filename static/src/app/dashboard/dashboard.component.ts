import { Component, OnInit, Input } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MyDialogComponentComponent} from '../my-dialog-component/my-dialog-component.component';
// ES6 Modules or TypeScript
// import Swal from 'sweetalert2';
import swal from 'sweetalert'
import { Button } from 'protractor';
// import Swal from 'sweetalert2'
import Swal from 'sweetalert2/dist/sweetalert2.js'



// CommonJS
// const Swal = require('sweetalert2')

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    window.onunload = function () {
      alert('You are trying to leave.');
      return false;
    }
  }
  


  simple(){
    // Swal({
    //   title: 'Give name for the suite',
    //   input: 'text',
    //   showConfirmButton: true,
    //   showCancelButton: true,
    //   preConfirm: () => {
    //     return fetch('')
    //       .then(response => {
    //          {
    //           console.log("hi")
            
    //         }
          
    //       })
    //   },
      
    // })
    swal({
      title: 'Hello',
      text: 'Give suite name',
      content: {
        element: 'input',
        attributes: {
          defaultValue: 'Qulity suite',
        }

      }
    }).then(movie => console.log(movie))
    
  }
 





    
  
}
