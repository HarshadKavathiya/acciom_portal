import { Component, OnInit,OnChanges, SimpleChanges,ChangeDetectionStrategy,HostListener } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import {UploadserviceService} from '../uploadservice.service';
import Swal from 'sweetalert2'
import {trigger,state,style,transition,animate  } from '@angular/animations'
import { Observable,interval } from 'rxjs';
// import { interval } from 'rxjs';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations:[
    trigger('divState',[
      state('normal',style({
        'background-color':'transarent',
        transform:'translateX(0px)'
      })),
      state('high',
      style({
        backgroundColor:'black',
        transform:'translateX(0px)'
      })),
      transition('normal => high', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
    ]),
     
    ])
  ]
})


export class StartupComponent implements OnInit {
  panelOpenState = false;
  id:any;
  all_test_suite:any=[]
  arr1:any=[]
  playButtons: Array<boolean>=[]
  playButtons2: Boolean[][] = new Array();
  temparr:Array<Boolean>=[]
  p: number = 1;
  show:Array<boolean>=[]
  show2:Array<Boolean>=[]
  z:number;
  q:number=1;
  constructor( private router:Router,
    private fileUploadService:UploadserviceService,
    private spinnerService: Ng4LoadingSpinnerService) { }


  ngOnInit() {
    this.Initialize()
  }


  Initialize(){
    this.id=localStorage.getItem('id')
    this.fileUploadService.getSuiteById(this.id).subscribe(data => {
      if(data.success){
      // console.log(data.suites.user) 
      //  console.log(data.suites.user.length)
      // for(var x=0;x<data.suites.user.length;x++)
      // {
      //   // console.log(data.suites.user[x].test_case_list)

      //   for(var y=0;y<data.suites.user[x].test_case_list.length;y++)
      //   {
      //   }
      //  console.log(this.playButtons1)
      // }
      this.all_test_suite=data.suites.user
       this.arr1=[]
      // console.log(this.all_test_suite)
      for (var i=0;i<this.all_test_suite.length;i++)
      {
        this.arr1.push(this.all_test_suite[i]['test_case_list']) //TO DO:HARD CODED.['Test Class']
        this.playButtons[i]=true;
        this.show[i]=true;
      }
   
      this.playButtons2 = new Array();
      this.show2=[]
      // console.log(this.arr1)
      for(var i=0;i<this.arr1.length;i++)
      {
        this.temparr=[]
        this.show2.push(true)
        for(var j=0;j<this.arr1[i].length;j++)
        {
          this.temparr.push(true)
          
        }
        this.playButtons2.push(this.temparr)
      }
      // console.log(this.playButtons2)

      }
   });
  }


  ngOnChanges(changes:SimpleChanges){
    this.Initialize()
    // console.log(changes)
    
  }


  ToHome(){
    this.router.navigate(['home'])
  }


  ToDB(){
    this.router.navigate(['db'])
  }


  executeTestCase(test_Suite_id,event:Event,x){
    event.stopPropagation();
    // this.spinnerService.show();
    this.show2[x]=false;
    this.playButtons[x]=!this.playButtons[x]
    this.fileUploadService.ExecuteTestbySuiteId(test_Suite_id).subscribe(data=>{
      if(data.success)
      { this.ngOnInit()
        // this.spinnerService.hide();       
this.playButtons[x]=!this.playButtons[x]
      this.show2[x]=true;

        Swal("Success","Test Done Succesfully","success")
  
      }
      else{
      
        Swal("error","Something went wrong","error")

      }
    })
  }

  
  executeTestByCaseId(test_case_id,event:Event,z,x){
    event.stopPropagation();
    console.log(x)
    this.playButtons2[x][z]=false
    this.show[x]=false;
    // this.spinnerService.show();
    this.fileUploadService.ExecuteTestbyCaseId(test_case_id).subscribe(data=>{
      if(data.success)
      {
        // this.show=true;
        this.show[x]=true;
        // this.spinnerService.hide();
        this.playButtons2[x][z]=true
        this.ngOnInit()

        Swal("Success","Test Done Succesfully","success")
  
      }
      else{
        Swal("error","Something went wrong","error")

      }
    })
  }

  getcolor(x){
    switch(x){
      case 0:
      return 'blue';
      case 1:
      return '#45CE30';
      case 2:
      return "#E84342";
      case 3:
      case 4:
      return 'red';
    }

  }
  @HostListener("window:scroll", []) onWindowScroll() {
    this.scrollFunction();
  }
  // When the user scrolls down 20px from the top of the document, show the button
scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 

}
