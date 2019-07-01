import { Component, OnInit,OnChanges,Inject, SimpleChanges,ChangeDetectionStrategy,HostListener } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import {UploadserviceService} from '../uploadservice.service';
import Swal from 'sweetalert2'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ExcelService} from '../services/excel.service';
import { FormBuilder,FormGroup, Validators } from '@angular/forms'


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
 key_dest:Array<any>;
 value_dest:Array<any>;
 source_count:number;
 target_count:number;
 src_to_dest_count:number;
 dest_to_src_count:number;
 case_log_id:number;
 execution_status:number;
 src_value_dataduplication:Array<any>;
 src_table:string;
 target_table:string;
 value_src_nullcheck:Array<any>;
 show_src_table:boolean;
 show_dest_table:boolean;
 len_null:number;
 src_db_id:number;
 
}
export interface DialogDataCaseDetail {
 src_db_name:string;
 des_db_name:string;
 src_table_name:string;
 des_table_name:string;
 query:string;
 src_db_type:String;
 des_db_type:String;
 src_column:String
 des_column:String;
 src_qry:String;
 des_qry:String;
 casename:string;
 case_id:number;
}

export interface DialogManageConnection{
 connections:Array<any>;
 test_case:Array<any>;
}
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { $ } from 'protractor';
import { ShowHideDirective } from '@angular/flex-layout';
@Component({
 selector: 'app-startup',
 templateUrl: './startup.component.html',
 styleUrls: ['./startup.component.css'],
 changeDetection: ChangeDetectionStrategy.Default,
 
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
 keys_dest =[]
 value_dest=[]
 first_obj=[]
 first_obj1=[]
 value_src_nullcheck=[]
 parsed_obj=""
 parsed_obj1=""
 stilload=false;
 t:number;
 times:any;
 execution_status:number;
 src_value_dataduplication:Array<any>;
 src_db_name:String;
 des_db_name:String;
 src_table:String;
 target_table:String;
 src_db_type:String;
 des_db_type:String;
 // src_column:String
 column:String;
 src_qry:String;
 des_qry:String;
 len:number;
 case_name:String;
 show_dest_table:boolean;
 show_src_table:boolean;
 source_count:number;
 target_count:number;
 src_db_id:number;
 target_db_id:number;
 src_to_dest_count:number;
 dest_to_src_count:number;
 all_connection=[];
 all_connections=[];
 all_cases=[];
 len_null:number;
 
 constructor( private router:Router,
 private fileUploadService:UploadserviceService,
 private spinnerService: Ng4LoadingSpinnerService,
 public dialog: MatDialog) { }


 ngOnInit() {
 this.Initialize()
 
 }
 
 suitestatusopen(x){
 localStorage.setItem('suite'+x,x)
 } 
 suitestatusclose(x){
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
 console.log(data)
 if(data.success){
 this.stilload=false; 
 this.all_test_suite=data.suites.user
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
 }}
 },err=>{

 });
 }
 logout(){
 this.fileUploadService.logout();
 this.router.navigate(['/login']);
 }
 ToHome(){
 this.router.navigate(['home'])
 }
 ToDB(){
 this.router.navigate(['db'])
 }
 manage_connection(suite_id){
 this.all_cases=[]
 this.all_connection=[]
 event.stopPropagation();
 this.fileUploadService.get_all_connections(suite_id).subscribe(data=>{
 for(let i=0;i<data.all_cases.length;i++){
 this.all_cases.push({'case_id':data.all_cases[i][0], 'case_name':data.all_cases[i][1],'checked':false})
 }
 console.log(data.all_connection)
 this.all_connection=data.all_connections
 console.log(this.all_connection)
 this.show_connection(this.all_connection, this.all_cases)
 
 
 },err=>{
 })
 }
 show_connection(connections, cases){
 const dialogRef = this.dialog.open(DialogManageConnection, { //break
 panelClass: 'my-class',
 width: '40%',
 height:'auto',
 data:{
 connections:connections, test_case:cases
 }
 
 });
 dialogRef.afterClosed().subscribe(result => {
 });
 }
 executeTestCase(test_Suite_id,event:Event,x){
 event.stopPropagation();
 // this.spinnerService.show();
 this.show2[x]=false;
 this.playButtons[x]=!this.playButtons[x]
 this.fileUploadService.ExecuteTestbySuiteId(test_Suite_id).subscribe(data=>{
 if(data.success)

 { this.Initialize();
 this.starttimer();

 // this.spinnerService.hide(); 
 this.playButtons[x]=!this.playButtons[x]
 this.show2[x]=true;

 Swal("Success","Job Submitted Succesfully","success")
 
 }
 else{
 this.Initialize();
 this.starttimer();
 Swal("error","Something went wrong","error")

 }
 },err=>{
 })
 }
 executeTestByCaseId(test_case_id,event:Event,z,x){
 event.stopPropagation();
 this.playButtons2[x][z]=false
 this.show[x]=false;
 this.fileUploadService.ExecuteTestbyCaseId(test_case_id).subscribe(data=>{
 if(data.success)
 {
 this.show[x]=true;
 this.playButtons2[x][z]=true
 this.Initialize();
 this.starttimer();
 Swal("Success","Job Submitted Succesfully","success")
 
 }else{
 this.Initialize();
 this.starttimer();
 }
 },err=>{
 Swal("error",err.error.msg,"error")
 let temp="Token has expired"
 if (temp == err.error.msg){
 clearInterval(this.times)

 this.logout()
 }else{
 this.Initialize();
 this.starttimer();
 }
 })
 }

getcasedetails(case_id,case_name,test_suite_id){ 
  console.log(test_suite_id)
 this.fileUploadService.get_all_connections(test_suite_id).subscribe(data=>{
 // for(let i=0;i<data.all_cases.length;i++){
 // this.all_cases.push({'case_id':data.all_cases[i][0], 'case_name':data.all_cases[i][1],'checked':false})
 // }
 console.log(data.all_connections)
 this.all_connections=data.all_connections
 console.log(this.all_connections)
 })



 event.stopPropagation();
 this.fileUploadService.getcasedetails(case_id).subscribe(data=>{
 console.log(data)
 var strcolumn=JSON.stringify(data.res.column)
 var removequotes=strcolumn.split('"').join('')
 console.log(removequotes)
 var removebraces = removequotes.replace(/[{()}]/g, '');
 console.log(removebraces)
 var removecomma = removebraces.replace(/,/g ,";")
 console.log(removecomma)


this.src_db_name=data.res.src_db_name
this.des_db_name=data.res.des_db_name
this.src_table=data.res.src_table
this.target_table=data.res.target_table
// this.src_db_type=data.res.src_db_type
this.des_db_type=data.res.des_db_type
this.column=removecomma
console.log(this.column)
// this.des_column=data.res.des_column
this.src_qry=data.res.src_qry
this.des_qry=data.res.des_qry
this.src_db_id=data.res.src_db_id
this.target_db_id=data.res.target_db_id
this.case_name=case_name
 this.showcaseresult(case_id,this.src_db_name,this.des_db_name,this.src_table,this.target_table,this.src_db_type,
 this.des_db_type, this.column, this.src_qry, this.des_qry,this.case_name,this.src_db_id,this.target_db_id,this.all_connections)
 });
}
showcaseresult(case_id, src_db_name,des_db_name,src_table,target_table,src_db_type,des_db_type,column, src_qry, des_qry,case_name,src_db_id,target_db_id,all_connections){
 const dialogRef = this.dialog.open(DialogOverviewExampleDialogCaseDetail, { //break
 panelClass: 'my-class',
 width: '60%',
 height:'80%',
 
 data : {case_id:case_id,src_db_name:src_db_name,des_db_name:des_db_name,
 src_table_name:src_table,des_table_name:target_table,
 src_db_type:src_db_type,des_db_type:des_db_type,column:column,
 src_qry:src_qry, des_qry:des_qry,casename:case_name,src_db_id:src_db_id,target_db_id:target_db_id,all_connections}
 });
 
 
 dialogRef.afterClosed().subscribe(result => {
 });
}
 getcolor(x){
 switch(x){
 case 0:
 return 'blue';
 case 1:
 return '#4ac69b';
 case 2:
 return "#ef8160";
 case 3:
 return '#f3a563'
 case 4:
 return '#e56868';
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
 this.ddlcheck_pass=false }
}

getlog(test_name,src_table,target_table,case_log_id){
 //calls rest api with case_log_id and fetch the
 // case_name , case_src_log and case_des_log.
 this.fileUploadService.testcase_log_byid(case_log_id.test_case_log_id).subscribe(data=>{
console.log(data)
 this.showlog(test_name, src_table, target_table, data.test_case_log.data)
 });
}

showlog(test_name,src_table,target_table,case_log){
 if (test_name =='CountCheck'){
 this.show_logdialog(test_name)
 }
 else if (test_name == 'NullCheck'){
 this.len_null=0
 this.value_src_nullcheck=[]
 this.show_logdialog(test_name)
 if(case_log.destination_log==null){
 }else{
 this.len=eval(case_log.destination_log).length
 this.len_null=this.len - 1
 console.log(case_log.destination_log)
 for(var i=0;i<this.len;i++){
 var temp=[]
 temp=Object.values(eval(case_log.destination_log)[i])
 if(temp.some(this.isNull)){
 temp.forEach(function(item){
 var index = temp.indexOf(null)
 if (~index){
 temp[index]= "null"
 }
 }); }
 this.value_src_nullcheck.push(temp)
 } 
 console.log(this.value_src_nullcheck)
 }
}
 else if (test_name == "DuplicateCheck"){
 this.src_value_dataduplication=[]
 this.show_logdialog(test_name)
 if(case_log.destination_log==null 
 || case_log.destination_log == "No Duplicate Records Available"
 ){
 }else{
 this.len=eval(case_log.destination_log).length
 for(var i=0;i<this.len;i++){
 var temp=[]
 temp=Object.values(eval(case_log.destination_log)[i])
 if(temp.some(this.isNull)){
 temp.forEach(function(item){
 var index = temp.indexOf(null)
 if (~index){
 temp[index]= "null"
 }
 }); }
 this.src_value_dataduplication.push(temp)
 } 
 }

 }
 else if (test_name == "Datavalidation"){
 this.value_src=[]
 this.keys_src=[]
 this.keys_dest =[]
 this.value_dest=[]
 this.show_src_table=true;
 this.show_dest_table=true;
 if(case_log.source_log['res'] == 'none' && case_log.destination_log['res'] == 'none'){
 this.show_logdialog(test_name)
 this.source_count=case_log.source_log['src_count']
 this.src_to_dest_count = case_log.source_log['src_to_dest_count']
 this.target_count=case_log.destination_log['dest_count']
 this.dest_to_src_count=case_log.destination_log['dest_to_src_count']
 }
 else{
 if(case_log.source_log['res'] == 'none' ){
 this.source_count=case_log.source_log['src_count']
 this.src_to_dest_count = case_log.source_log['src_to_dest_count']
 this.show_src_table=false;
 }
 else{
 this.show_src_table=true;
 this.source_count=case_log.source_log['src_count']
 this.src_to_dest_count=case_log.source_log['src_to_dest_count']
 this.parsed_obj=(eval(case_log.source_log['res'])[0])
 this.first_obj=(JSON.parse(String(this.parsed_obj)))
 this.keys_src=(Object.keys(this.first_obj))
 this.len=eval(case_log.source_log['res']).length
 for(var i=0;i<this.len;i++){
 this.parsed_obj=(eval(case_log.source_log['res'])[i])
 this.first_obj=(JSON.parse(String(this.parsed_obj)))
 this.value_src.push(Object.values(this.first_obj))
 } 
 }
 
 if(case_log.destination_log['res'] == 'none' ){
 this.show_dest_table=false;
 this.target_count=case_log.destination_log['dest_count']
 this.dest_to_src_count=case_log.destination_log['dest_to_src_count']


 }
 else{
 this.show_dest_table=true;
 console.log(case_log.destination_log['res'])
 this.target_count=case_log.destination_log['dest_count']
 this.dest_to_src_count=case_log.destination_log['dest_to_src_count']

 this.parsed_obj1 = (eval(case_log.destination_log['res'])[0])
 this.first_obj1=(JSON.parse(String(this.parsed_obj1)))
 this.keys_dest = (Object.keys(this.first_obj1))
 this.len=eval(case_log.destination_log['res']).length
 for(var i=0;i<this.len;i++){
 this.parsed_obj1=(eval(case_log.destination_log['res'])[i])
 this.first_obj1=(JSON.parse(String(this.parsed_obj1)))
 this.value_dest.push(Object.values(this.first_obj1))
 }
 }
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
 
 if(case_log.source_log == 'none1' && case_log.destination_log=='none1')
 {
 this.show_logdialog(test_name)
 }
 else{
 console.log(typeof(case_log.source_log))
 var t = JSON.parse(case_log.source_log)
 case_log.source_log=t
 var t = JSON.parse(case_log.destination_log)
 case_log.destination_log=t
 this.countcheck=true
 this.nullcheck=true
 this.datavalidation=true
 this.datavalidation_pass=true
 this.ddlcheck_pass=true
 this.duplicate=true
 this.ddlcheck=false
 }
 
 
 }
 
 
 const dialogRef = this.dialog.open(DialogOverviewExampleDialogstartup, { //break
 panelClass: 'my-class',
 width: 'auto',
 height:'auto',
 data : {countcheck:this.countcheck,nullcheck:this.nullcheck,duplicate:this.duplicate,
 datavalidation:this.datavalidation,source_log :case_log.source_log,destination_log:case_log.destination_log,
 key_dest:this.keys_dest, value_dest:this.value_dest,key_src:this.keys_src,value_src:this.value_src,source_count:this.source_count,target_count:this.target_count,
 src_to_dest_count:this.src_to_dest_count,dest_to_src_count:this.dest_to_src_count,datavalidation_pass:this.datavalidation_pass,ddlcheck_pass:this.ddlcheck_pass,ddlcheck:this.ddlcheck,
 case_log_id:case_log.test_case_log_id, execution_status:case_log.test_execution_status,
 src_table:src_table,target_table:target_table,value_src_nullcheck:this.value_src_nullcheck,src_value_dataduplication:this.src_value_dataduplication
 ,show_src_table:this.show_src_table, show_dest_table:this.show_dest_table, len_null:this.len_null}
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
 return `/api/export/${case_log_id}`
}}
//<------------------------------------------------>
@Component({
 selector: 'dialog-overview-example-dialog-case-detail',
 templateUrl: 'dialog-overview-example-dialog-case-detail.html',
})
export class DialogOverviewExampleDialogCaseDetail {
card:boolean=true;
form:boolean=false;
src_db_id:number;
target_db_id:number;
createForm:FormGroup;

 constructor(
 public dialogRef: MatDialogRef<DialogOverviewExampleDialogCaseDetail>,
 @Inject(MAT_DIALOG_DATA) public data: DialogDataCaseDetail,
 private fileUploadService:UploadserviceService,
 private fb:FormBuilder) {
 this.createForm=fb.group({
 src_name:[''],
 target_table:[''],
 column:[''],
 src_query:[''],
 target_query:['']
 });
 }

 onNoClick(): void {
 this.dialogRef.close();
 }
 showform(){
 this.card=false;
 this.form=true;
 }
 showhome(){
 this.card=true;
 this.form=false;
 }
 selectsrcdb(i){
 this.src_db_id=i
 console.log(this.src_db_id)


 }
 selecttargetdb(i){
 this.target_db_id=i
 
 }
 Update(src_table, target_table, src_qry, target_qry,column, case_id){
 console.log(column.value)
 console.log(src_table.value, target_table.value, src_qry.value, target_qry.value, case_id,this.src_db_id,this.target_db_id)
 this.fileUploadService.update_case_details(case_id,this.src_db_id,this.target_db_id,src_table.value, target_table.value, src_qry.value, target_qry.value ,column.value).subscribe(result=>{
 Swal("success",result.message,"success")
 })
 }

}
@Component({
 selector: 'dialog-manage-connection',
 templateUrl: 'dialog-manage-connection.html',
})
export class DialogManageConnection {
connection:number;
selectedValue=[]
show:boolean=false;
show1:boolean=false;
disable2=true;

 constructor(private fileUploadService:UploadserviceService,
 public dialogRef: MatDialogRef<DialogManageConnection>,
 @Inject(MAT_DIALOG_DATA) public data: DialogManageConnection,
 ) {
 
 }
 onNoClick(): void {
 this.dialogRef.close();
 }
 changeselect(selectval){
 this.connection=selectval
 this.show=true;
 this.show1=true;
 }

 submit_connection(type){
 this.fileUploadService.select_connections(type,JSON.stringify(this.selectedValue),this.connection).subscribe(data=>{
 if(data.success){
 Swal("success",data.message,"success")
 this.selectedValue=[]
 this.connection;
 this.dialogRef.close();

 }
 },err=>{
 Swal("error",err.error.message,"error")
 })

 }
 selectBadge(e,x){
 if (e.target.checked) { 
 this.selectedValue.push(x);
 } else { 
 this.selectedValue.splice(this.selectedValue.indexOf(x), 1);
 }
 }
}
