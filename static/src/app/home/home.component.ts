import { Component, OnInit,Inject,ViewChild,ElementRef } from '@angular/core';
import {UploadserviceService} from '../uploadservice.service';
import * as XLSX from 'xlsx';
import { Router, ActivatedRoute, Params } from "@angular/router";
import Swal from 'sweetalert2'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import {Observable} from "rxjs"

export interface DialogData {
  suitename: string;
}
    

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit,CanComponentDeactivate  {
  fileToUpload: File = null;
  MyModel:string
  arrayBuffer:any;
  file:File;
  selectedValue = [];
  fileName:String
  error:String
  show=false
  show1=false;
  Pages:any=[];
  copyarr:any=[];
  i:any;
  filevalue:any;
  m:any;
  msg:String
  response:string
  name:string
  res:any;
  dis:boolean
  selectedradio:any;
  workbook:any
  sheet_name:any;
  sheet:any;
  resfinal:any;
  all_cases:any=[]
  afterupload:boolean;
  disable:boolean=true;
  disable2:boolean=true;
  selectedtestcases=[]
  suitename:String;
  executevalue:Number;
  checkboxes:any=[]
  selectedAll: any;
  selectedNames: any;
  changessaved=false;
  prog=0
  constructor(private fileUploadService:UploadserviceService,
    private route:ActivatedRoute,
    private router:Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.afterupload=true;
    this.changessaved = true
      
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
 
    if (!this.changessaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }


OnClick(v) {
  console.log("the test cases are")
  // console.log(this.selectedValue)
  // console.log(this.selectedradio)
    console.log(v)
    this.MyModel=null;
  this.show=false;
   this.show1=false;
   console.log(this.suitename)
   if (v==0){
     this.executevalue = 0
   }
   else{
     this.executevalue = 1
   }
   this.changessaved=true;
     this.fileUploadService.postFile(this.file,this.selectedradio,this.selectedValue,this.suitename,this.executevalue).subscribe(data => {
    this.name=data['message']
    // console.log(data)
    this.filevalue=null;
    this.disable=true;
    this.disable2=true;
    Swal("Success","Succesfully Uploaded the file","success")
    this.all_cases=[];
    this.initialisecases();
    this.response=this.name;
    this.router.navigate(['/startup'])
    this.selectedValue=[]
    }, error => {
      Swal("error"," filecannot be uploaded","error")
      this.filevalue=null;
      this.all_cases=[];
      this.response="file Can not be Uploaded"
      this.initialisecases();
    });
  }

  initialisecases(){
    this.selectedValue=[];
  }


  incomingfile(event) 
  {
    this.filereadit(event)
  
  }


  filereadit(event){
    this.selectedValue =[]
    this.all_cases=[];
    this.changessaved =false
    this.file= event.target.files[0]; 
    this.show=true;
    this.prog=50;
    this.show1=false;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
         this.workbook = XLSX.read(bstr, {type:"binary"});
         if (typeof this.Pages !== 'undefined' && this.Pages.length > 0) {
            this.Pages=[]
        }
  
        for ( var x=0;x!=data.length;x++){

          if (this.workbook.SheetNames[x]==undefined){
            break;

          }else{
                     this.Pages.push(this.workbook.SheetNames[x]) //arr1 contains all the sheetnames
          }
        }
        console.log(this.Pages)
    }
    fileReader.readAsArrayBuffer(this.file);
  }


selectBadge (e, x) {
  if (e.target.checked) {
    this.disable2=false;

    this.selectedValue.push(x);
  }  else { 
    this.selectedValue.splice(this.selectedValue.indexOf(x), 1);
  }
  this.selectedtestcases=this.selectedValue
  console.log(this.selectedValue)

  var totalSelected =  0;
  for (var i = 0; i < this.all_cases.length; i++) {
        if(this.all_cases[i].selected) totalSelected++;
    } 
this.selectedAll = totalSelected === this.all_cases.length;

return true;


 }



 selectradio(x){
    this.disable=false;
     this.selectedradio=x
     console.log(this.selectedradio)

 }


 testselect(){
   console.log('trueeeee')
   this.dis=true
   console.log(this.selectedValue)
   this.afterupload=false;
 }

 
 selectAll() {
  this.selectedValue =[]
  this.disable2=false;

  this.selectedAll = !this.selectedAll
if (this.selectedAll){
  for (var i = 0; i < this.all_cases.length; i++) {
      this.all_cases[i].selected = this.selectedAll;
      console.log("runit in if")
     this.selectedValue.push(this.all_cases[i].name);
  } 
}
  else if (!this.selectedAll){
    for (var i = 0; i < this.all_cases.length; i++) {
      this.all_cases[i].selected = this.selectedAll;
      console.log("runit in elif ")
  }    
  this.selectedValue = []
}
  console.log(this.selectedValue)
}

 Next(s){
   this.show=false;
   this.show1=true;
  const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {   
    width: '250px',
    data : {suitename :this.suitename}
    
  });
  dialogRef.afterClosed().subscribe(result => {
   this.suitename = result
  });
   this.i=this.Pages.findIndex(k=>k==s)
    this.sheet_name = this.workbook.SheetNames[this.i];
     this.sheet = this.workbook.Sheets[this.sheet_name];

    this.resfinal=(XLSX.utils.sheet_to_json(this.sheet,{raw:true}))
   
    for(var i=0;i<this.resfinal.length;i++)
    {
      this.all_cases.push({'name':this.resfinal[i]['Test Case ID'],'selected':false}) //TO DO:HARD CODED.['Test Class']
    }
    console.log(this.all_cases)
   console.log(this.i)
      this.prog=75;
 }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}




