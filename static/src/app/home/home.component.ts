import { Component, OnInit,Inject,ViewChild,ElementRef, EventEmitter } from '@angular/core';
import {UploadserviceService} from '../uploadservice.service';
import * as XLSX from 'xlsx';
import { Router, ActivatedRoute, Params } from "@angular/router";
import Swal from 'sweetalert2'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginatorModule} from '@angular/material';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import {Observable} from "rxjs"
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

export interface DialogData {
  suitename: string;
  Suite_own_name:string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit  {
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
  resfinal_test:any;
  all_cases:any=[]
  allcases:any=[]
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
  miss_column=[]
  testname_map=[]
  temp_db_detailarr=[]
  temp_table_detail=[]
  temp_column_detail=[]
  arr_db_each_detail=[]
  all_db_detail_value=[]
  Suite_own_name:String;
  url='/home/akhil/acciom_portal/static/src/assets/test_cases.xlsx';
  column_dict=[{0:'Test Case ID'}, {1:'Details'},{ 2:'Columns'},
    {3:'Table Source:Target'}, {4:'Test Class'},
    {5:'Test queries'}];
  constructor(private fileUploadService:UploadserviceService,
    private route:ActivatedRoute,
    private router:Router,
    private spinnerService: Ng4LoadingSpinnerService
,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.afterupload=true;
    this.changessaved = true
      
  }

  // canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
 
  //   if (!this.changessaved) {
  //     return confirm('Do you want to discard the changes?');
  //   } else {
  //     return true;
  //   }
  // }
//TODO
downloadFile(){
  let link = document.createElement("a");
   link.download = "demo_file.xlsx";
   link.setAttribute('type', 'hidden');
        link.href = "assets/demo_file.xlsx";
link.click();
link.remove();
  }
OnClick(v) {
  console.log(this.suitename)
  this.spinnerService.show();

    this.MyModel=null;
  this.show=false;
   this.show1=false;
   // v value specifies to upload or upload+execute
   if (v==0){
     this.executevalue = 0
   }
   else{
     this.executevalue = 1
   }
   this.changessaved=true;
     this.fileUploadService.postFile(this.file,this.selectedradio,this.selectedValue,this.suitename,this.executevalue).subscribe(data => {
    this.name=data['message']
    this.filevalue=null;
    this.disable=true;
    this.disable2=true;
    Swal("Success","Succesfully Uploaded the file","success")
    this.all_cases=[];
    this.initialisecases();
    this.response=this.name;
    this.router.navigate(['/startup'])
    this.selectedValue=[]
    this.spinnerService.hide();

    }, error => {
          this.spinnerService.hide();

      Swal("error"," filecannot be uploaded","error")
      this.filevalue=null;
      this.all_cases=[];    
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

  pass_suite_name(){
    console.log("passed")
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
    }
    fileReader.readAsArrayBuffer(this.file);
  }
selectBadge (e, x) {
  console.log(typeof(e.target.value))
  if (e.target.checked) {
    this.disable2=false;
    this.selectedValue.push(x.toString());
  }  else { 
    this.selectedValue.splice(this.selectedValue.indexOf(x.toString()), 1);
  }
  console.log(this.selectedValue.indexOf(x.toString()))

  this.selectedtestcases=this.selectedValue
console.log(this.selectedValue)
  var totalSelected =  0;
  for (let i = 0; i < this.all_cases.length; i++) {
        if(this.all_cases[i].selected) totalSelected++;
    } 
this.selectedAll = totalSelected === this.all_cases.length;
return true;
 }
 selectradio(x){
   this.Suite_own_name=x;
    this.disable=false;
     this.selectedradio=x
 }

 closed(){
  this.router.navigate(['/startup'])

}
 testselect(){
   this.dis=true
   this.afterupload=false;
 }

 
 selectAll() {
  this.selectedValue =[]
  this.disable2=false;

  this.selectedAll = !this.selectedAll
if (this.selectedAll){
  for (var i = 0; i < this.all_cases.length; i++) {
      this.all_cases[i].selected = this.selectedAll;
     this.selectedValue.push(this.all_cases[i].id.toString());
    //  this.selectedValue.push(this.all_cases[i].name);

  } 
}
  else if (!this.selectedAll){
    for (let i = 0; i < this.all_cases.length; i++) {
      this.all_cases[i].selected = this.selectedAll;

  }    
  this.selectedValue = []
}
}

 Next(s){
   console.log("came here")
   this.show=false;
   this.show1=true;
   this.i=this.Pages.findIndex(k=>k==s)
    this.sheet_name = this.workbook.SheetNames[this.i];
     this.sheet = this.workbook.Sheets[this.sheet_name];
    this.resfinal=(XLSX.utils.sheet_to_json(this.sheet,{raw:true}))
    for(var i=0;i<this.resfinal.length;i++)
    {
      console.log(this.resfinal[i]['Description'])
      this.temp_db_detailarr.push(this.resfinal[i]['DB Details']) //TO DO:HARD CODED.['Test Class']
      this.all_cases.push({'id':i,'name':this.resfinal[i]['Test Class'],'selected':false, 'description':this.resfinal[i]['Description']}) //TO DO:HARD CODED.['Test Class']
      this.temp_table_detail.push(this.resfinal[i]['Source Table:Target Table'])
      this.temp_column_detail.push(this.resfinal[i]['Columns'])
      console.log(this.all_cases)
    }
   // below func validate the 1st column all row
  if(!this.validate_case_name(this.all_cases)){
    console.log("2")
    this.clearAll("Filecannot be Uploaded, Case name is not Valid")
    return;
  }
  //below func validate db details
  if(!this.validate_db_detail(this.temp_db_detailarr)){
      this.clearAll("filecannot be uploaded, db details are not valid")
      return;
  }
  // below func to validate table name
 if(!this.validate_table_names(this.temp_table_detail)){
      this.clearAll("filecannot be uploaded, Table Names are not valid")
      return;
 }
    this.prog=75;                                        
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {   
      width: '350px',
      data : {suitename :this.suitename, Suite_own_name:this.Suite_own_name}
      
    });

    // dialogRef.componentInstance.onAdd.subscribe(result => {
      
    //   console.log("282")
    //   console.log(this.Suite_own_name)
    //   this.suitename=this.Suite_own_name
    // });

    dialogRef.afterClosed().subscribe(result => {
      console.log('290')
      console.log(result)
      if(result.event == 'close'){
        console.log("came here292")
        this.suitename=this.Suite_own_name
      }
      else{
        console.log("came here 297")
        this.suitename = result
      }
    });
 }
 clearAll(msg){
        Swal("error",msg,"error")
        this.filevalue=null;
        this.all_cases=[];
        this.initialisecases();
        this.router.navigate(['/home'])
        this.selectedValue=[]
        this.show=false;
        this.show1=false;
 }
 validate_case_name(case_name)
 {
      var status=true;
      var standard_cases=['CountCheck','Datavalidation','DuplicateCheck',
      'NullCheck','DDLCheck','Datavalidation-link']
      for(let i=0;i<case_name.length;i++){
          if(standard_cases.includes(case_name[i].name) && case_name[i] != undefined)
          {
              status=true;
          }
        else{
          status= false;
          break;
        }
      }  
      return status          
 }
 validate_db_detail(db_Detail)
 {  
      var valid_dbtypes=['mysql','sqlserver','postgres','oracle']
      var valid_keys=['sourcedbtype', 'sourceserver',
      'sourcedb','sourceuser','targetdbtype','targetdb','targetserver','targetuser']
      let status=true;
      let temp_Arr:String;
      for(let i=0;i<db_Detail.length;i++)
      {   
          var dict1= new Map();
          temp_Arr= db_Detail[i].replace(/(\r\n|\n|\r)/gm, "");
          if (temp_Arr[temp_Arr.length-1] == ";")
          {
            temp_Arr=temp_Arr.slice(0,-1)
          }
          this.arr_db_each_detail= (temp_Arr).split(";")
          for(let i=0;i<this.arr_db_each_detail.length;i++)
          { 
              let key1 =this.arr_db_each_detail[i].split(":",2)[0]
              let val = this.arr_db_each_detail[i].split(":",2)[1]
              dict1.set(key1.toLowerCase(),val.toLowerCase())   
          }
          for(let i=0;i<valid_keys.length;i++){
            if(!(dict1.has(valid_keys[i]))){
              status=false;
              break;
            }
          }
          if(!(valid_dbtypes.includes(dict1.get('sourcedbtype'))) 
          || !(valid_dbtypes.includes(dict1.get('targetdbtype')))
          ){
            status=false;
            break;
          }  
      }
      return status;
 }
 validate_table_names(table_Arr)
 {
      let new_temp_Arr=[];
      let final_temp_Arr=[]
      let status=true;

        for(let i=0;i<table_Arr.length;i++)
        {
          let temp_arr=[]
          if(!(/^((.+):(.+))$/.test(table_Arr[i]))){
                status=false;
                break;    
          }
        }
      return status;
  }
  validate_column_name(temp_column_detail){
      let status=true;
        let temp_Arr=[]
        for(let i=0;i<temp_column_detail.length;i++){
          let each_col_row=temp_column_detail[i]
          if (each_col_row!=undefined){
            temp_Arr=each_col_row.split(":")
            if(temp_Arr.includes("")){
              status=false;
              break;
            }
          }
        }
        return status;
  }
 
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
suite_own_name:string;
onAdd = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close({event:'two'});
  }
  // submit(){
  // this.onAdd.emit();
  // this.dialogRef.close();

  // }
submit(){
   this.dialogRef.close({'event':'close'});

}

  
}




