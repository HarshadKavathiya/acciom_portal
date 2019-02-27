import { Component, OnInit,OnChanges,Inject, SimpleChanges,ChangeDetectionStrategy,HostListener } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import {UploadserviceService} from '../uploadservice.service';
import Swal from 'sweetalert2'
import {trigger,state,style,transition,animate  } from '@angular/animations'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import {ExcelService} from '../services/excel.service';


export interface DialogData {
  
  source_log: string;
  destination_countcheck:boolean;
  countcheck:boolean;
  nullcheck:boolean;
  duplicate:boolean;
  datavalidation:boolean;log:string;
  datavalidation_pass:boolean;
  ddlcheck_pass:boolean;
  ddlcheck:boolean;
  key_src:Array<any>;
  value_src:Array<any>;
  case_log_id:number;
  execution_status:number;
  src_value_dataduplication:Array<any>;
  src_table:string;
  target_table:string;
  value_src_nullcheck:Array<any>;
}

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
  res:string="sas"
  countcheck:boolean=true;
  nullcheck:boolean=true;
  duplicate:boolean=true;
  datavalidation_pass:boolean=true;
  ddlcheck_pass:boolean=true;
  datavalidation:boolean=true;
  ddlcheck:boolean=true;
  keys_src=[]
  value_src=[]
  first_obj=[]
  value_src_nullcheck=[]
  parsed_obj=""
  stilload=false;
  t:number;
  times:any;
  execution_status:number;
  src_value_dataduplication:Array<any>;

  len:number;
  constructor( private router:Router,
    private fileUploadService:UploadserviceService,
    private spinnerService: Ng4LoadingSpinnerService,
    public dialog: MatDialog) { }


  ngOnInit() {
    this.Initialize()
    
  }

  suitestatusopen(x){
    console.log("suite"+x+"is opened")
    localStorage.setItem('suite'+x,x)
  }  
  suitestatusclose(x){
    console.log("suite"+x+"is closed")
    localStorage.removeItem('suite'+x)
  }
  checkstatus(x){
    if(x == localStorage.getItem('suite'+x)){
      return 'true'
    }

  }

  starttimer(){
    clearInterval(this.times)
 this.times=setInterval(()=>{this.Initialize();},39000)

  }

  Initialize(){
    this.id=localStorage.getItem('id')
    this.fileUploadService.getSuiteById(this.id).subscribe(data => {
      if(data.success){
        this.stilload=false;    
      this.all_test_suite=data.suites.user
      // this.all_test_suite.expandCol = localStorage.getItem("col");
      console.log(this.all_test_suite)
       this.arr1=[]
      for (var i=0;i<this.all_test_suite.length;i++)
      {
        this.arr1.push(this.all_test_suite[i]['test_case_list']) //TO DO:HARD CODED.['Test Class']
        this.playButtons[i]=true;
        this.show[i]=true;
      }
   
      this.playButtons2 = new Array();
      this.show2=[]
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

      }
   });
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

      {   this.Initialize();
              this.starttimer();

        // this.spinnerService.hide();       
        this.playButtons[x]=!this.playButtons[x]
      this.show2[x]=true;

        Swal("Success","Test Done Succesfully","success")
  
      }
      else{
        this.Initialize();
        this.starttimer();
        Swal("error","Something went wrong","error")

      }
    },err=>{
      console.log("error")
    })
  }
  executeTestByCaseId(test_case_id,event:Event,z,x){
    event.stopPropagation();
    console.log(x)
    this.playButtons2[x][z]=false
    this.show[x]=false;
    this.fileUploadService.ExecuteTestbyCaseId(test_case_id).subscribe(data=>{
      if(data.success)
      {
        this.show[x]=true;
        this.playButtons2[x][z]=true
        this.Initialize();
        this.starttimer();
        Swal("Success","Test Done Succesfully","success")
  
      }else{
        this.Initialize();
        this.starttimer();

      }
      
      
    },err=>{
      Swal("error",err.error.msg,"error")

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
      return '#F7861B'
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
 isNull(val){
   return val == null
      
}

show_logdialog(test_name){
  this.countcheck=true
    this.nullcheck=true
    this.datavalidation=true
    this.datavalidation_pass=true
    this.ddlcheck_pass=true
    this.duplicate=true
    this.ddlcheck=true
    if(test_name =='CountCheck'){
      this.countcheck=false
    }
    if(test_name =='NullCheck'){
      this.nullcheck=false
    }
    if(test_name =='DuplicateCheck'){
      this.duplicate=false
    }
    if(test_name =='Datavalidation'){
      this.datavalidation_pass=false
    }
    if(test_name =='DDLCheck'){
      this.ddlcheck_pass=false    }
}

showlog(test_name,src_table,target_table,case_log){
  if (test_name =='CountCheck'){
    this.show_logdialog(test_name)
  }
  else if (test_name == 'NullCheck'){
    this.value_src_nullcheck=[]
    this.show_logdialog(test_name)
    
    if(case_log.destination_log==null){
      console.log("in null")
    }else{
      this.len=eval(case_log.destination_log).length
      for(var i=0;i<this.len;i++){
        var temp=[]
        temp=Object.values(eval(case_log.destination_log)[i])
        if(temp.some(this.isNull)){
          console.log('come inside')
          temp.forEach(function(item){
            var index = temp.indexOf(null)
            if (~index){
          temp[index]= "null"
            }
          }); }
        this.value_src_nullcheck.push(temp)
    } 
  }
}
  else if (test_name == "DuplicateCheck"){
    this.src_value_dataduplication=[]
    this.show_logdialog(test_name)
    if(case_log.destination_log==null 
      || case_log.destination_log == "No Duplicate Records Available"
    ){
      console.log("in null")
    }else{
      this.len=eval(case_log.destination_log).length
      for(var i=0;i<this.len;i++){
        var temp=[]
        temp=Object.values(eval(case_log.destination_log)[i])
        if(temp.some(this.isNull)){
          console.log('come inside')
          temp.forEach(function(item){
            var index = temp.indexOf(null)
            if (~index){
              temp[index]= "null"
                }
          }); }
        this.src_value_dataduplication.push(temp)
        console.log(this.src_value_dataduplication)
    } 
  }

  }
  else if (test_name == "Datavalidation"){
    this.value_src=[]
    this.keys_src=[]
    if(case_log.source_log=='none'){
      this.show_logdialog(test_name)
    }
    else{
      this.parsed_obj=(eval(case_log.source_log)[0])
    this.first_obj=(JSON.parse(String(this.parsed_obj)))
    this.keys_src=(Object.keys(this.first_obj))
    //console.log(this.keys_src.leng
     this.len=eval(case_log.source_log).length
     //console.log((Object.values(this.first_obj)))
     console.log(this.len)
    for(var i=0;i<this.len;i++){
        this.parsed_obj=(eval(case_log.source_log)[i])
        this.first_obj=(JSON.parse(String(this.parsed_obj)))
        this.value_src.push(Object.values(this.first_obj))
      }
      console.log(this.value_src)
      this.countcheck=true
      this.nullcheck=true
      this.datavalidation=false
      this.datavalidation_pass=true
      this.ddlcheck_pass=true
      this.duplicate=true
      this.ddlcheck=true

    }
  }
  else if(test_name == 'DDLCheck'){
  
   if(case_log.source_log=='none1')
    {
      this.show_logdialog(test_name)
    }
   else if(case_log.destination_log=='none1')
    {
      this.show_logdialog(test_name)

    }
   else {
    this.countcheck=true
    this.nullcheck=true
    this.datavalidation=true
    this.datavalidation_pass=true
    this.ddlcheck_pass=true
    this.duplicate=true
    this.ddlcheck=false
   }
  }
  const dialogRef = this.dialog.open(DialogOverviewExampleDialogstartup, {    //break
    width: '48%',
    height:'50%',
    data : {countcheck:this.countcheck,nullcheck:this.nullcheck,duplicate:this.duplicate,
      datavalidation:this.datavalidation,source_log :case_log.source_log,destination_log:case_log.destination_log,
    key_src:this.keys_src,value_src:this.value_src,datavalidation_pass:this.datavalidation_pass,ddlcheck_pass:this.ddlcheck_pass,ddlcheck:this.ddlcheck,
  case_log_id:case_log.test_case_log_id, execution_status:case_log.test_execution_status,
      src_table:src_table,target_table:target_table,value_src_nullcheck:this.value_src_nullcheck,src_value_dataduplication:this.src_value_dataduplication}
   
  });
  dialogRef.afterClosed().subscribe(result => {
   });}}
@Component({
  selector: 'dialog-overview-example-startup-dialog',
  templateUrl: 'dialog-overview-example-startup-dialog.html',
})
export class DialogOverviewExampleDialogstartup {

  constructor( private fileUploadService:UploadserviceService,
    private excelService:ExcelService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogstartup>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {this.dialogRef.close();}
  onexport(case_log_id){

    if(confirm("Download Excel!")){
    this.fileUploadService.exportinexcel(case_log_id).subscribe(data=>{
      this.excelService.exportAsExcelFile(data, 'sample');
},err=>{console.log(err)})
}else{
  return;
}}}