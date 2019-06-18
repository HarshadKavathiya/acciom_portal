import { Component, OnInit,Input} from '@angular/core';
import { UploadserviceService } from '../uploadservice.service';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
import { empty } from 'rxjs';
import swal from 'sweetalert';
import { stream } from 'xlsx/types';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import {CanComponentDeactivate} from './can-deactivate-guard.service'
import {Observable} from 'rxjs/Observable'
import { CanDeactivate } from '@angular/router/src/utils/preactivation';
import { validateBasis } from '@angular/flex-layout';



@Component({
  selector: 'app-viewtestcase',
  templateUrl: './viewtestcase.component.html',
  styleUrls: ['./viewtestcase.component.css']
})
export class ViewtestcaseComponent implements OnInit,CanComponentDeactivate {
  

  constructor(private fileUploadService: UploadserviceService,private router: Router,private route:ActivatedRoute) { }
  val:boolean;
  test_suite_id: number
  excel_name: string
  suite_list = []
  suite_detail = []
  disable1: boolean = false;
  show = [];
  show2: boolean = true;
  show3: boolean = false;
  show4:boolean = false;
  show5:boolean = true;
  show6:boolean = true;
  navigate:boolean=false;
  noofsuites: boolean;
  test_suite_number: number = null
  user_number: number = null
  case_detail = []
  src_db_type = []
  src_db_name = []
  src_db_hostname = []
  src_db_username = []
  target_db_type = []
  target_db_name = []
  target_db_hostname = []
  target_db_username = []
  table = [];
  src_query = [];
  target_query = [];
  column = [];
  table_obj;
  source_table;
  target_table;
  users = []
  mymodel: string;
  editedvalue;
  keys;
  update=[];
  update1=[];
  test_suite_name:string;
  notestcase:boolean=false;
  table1:boolean=false;
  changesSaved:boolean=false
  editvalue:boolean;
  k =0;
  l=0;
  hide=[[]];
  simple;
  all_connections=[];
  srctestcaseid;
  targettestcaseid;
  src_db_id;
  target_db_id;
  srcconname;
  suite_name;
  // showsrcconname1:boolean=true
  // showsrcconname2:boolean=false
  targetconname;
  // showtargetconname1:boolean=true
  // showtargetconname2:boolean=false
  test_case_id_checked=[]
  a=[]

  ngOnInit() {
  
    // if(this.editvalue){ 
      // swal({
      //   title:"Want to leave the page?",
      //   text:'Changes were not saved, Click "No" to stay in the page.',
      //  icon: "warning",
      //  buttons:['Yes','No'],  
      //  })
      //  .then((buttons) => {
        //  if (buttons) {
        //    this.show2=false
        //    this.show3=true
        //  } else {
          
    //       this.show2 = true
    // this.show3 = false
    // this.show5=true
    // this.show6=true
    // this.test_case_id_checked=[]
    // console.log(this.test_case_id_checked)

    // this.showsrcconname1=true
    // this.showsrcconname2=false
    // this.showtargetconname1=true
    // this.showtargetconname2=false
    this.editvalue=!this.editvalue
    // this.user_number = x

    // this.fileUploadService.get_all_suites().subscribe(data => {
    //   console.log(data)

    //   this.suite_list = (data.suites.user)
    //   if (this.suite_list[0] == null) {

    //     this.noofsuites = true
    //     this.show2 = false
    //   }
    //   else {
    //     this.noofsuites = false
    //     }
    //   })
    //  }
    // });
    // }
 
    this.show2 = true
    this.show3 = false
    this.show5=true
    this.show6=true
    this.test_case_id_checked=[]
    // this.editvalue=!this.editvalue
    this.editvalue = false
    console.log(this.test_case_id_checked)
    // this.user_number = x
    this.fileUploadService.get_all_suites().subscribe(data => {
      console.log(data)
      this.suite_list = (data.suites.user)
      if (this.suite_list[0] == null) {
        this.noofsuites = true
        this.show2 = false
      }
      else {
        this.noofsuites = false
      }
    })

    

  }
  get_connections(e,test_suite_id){
    this.all_connections=[]
    

  } 

  selectradio(x,y) {
    let i, j = 0;
    if(y=="Quality Suite")
    this.test_suite_name=y+x;
    if(y!="Quality Suite")
    this.test_suite_name=y;
    
    this.test_suite_number = x;
    
    this.show2 = false
    this.show3 = true
    this.show5 = true
    this.show6 = true
    this.test_case_id_checked=[]
    this.disable1=false

    this.fileUploadService.get_suite_details(this.test_suite_number).subscribe(data => {
  
      if (data.message=="false"){
        this.notestcase=true
        this.table1=false
      }
      else{
      this.suite_detail = (data.suites.user)
      this.notestcase=false
      this.table1=true

     

      for(let i = 0; i < this.suite_detail.length; i++){
      var tablekeys=Object.keys(this.suite_detail[i].test_case_detail.table)
      var tablevalues=Object.values(this.suite_detail[i].test_case_detail.table)
    
      this.suite_detail[i]["sourcetable"]=tablekeys
      this.suite_detail[i]["targettable"]=tablevalues
      }

      for(let i = 0; i < this.suite_detail.length; i++){
      var columnvalues=Object.values(this.suite_detail[0].test_case_detail.column)
      this.suite_detail[0]["targetcolumn"]=columnvalues
      
      }
    for(let i = 0; i < this.suite_detail.length; i++) {
        this.show[i] = [];
        for(let j = 0; j < 16; j++) {
            this.show[i][j] = false;
        }
    }
  }
  })
  this.all_connections=[]
  this.fileUploadService.get_all_connections(this.test_suite_number).subscribe(data=>{
    data.all_connections.unshift("*add new connection")
    console.log(data.all_connections) 
    this.all_connections=data.all_connections
    
   

    

  })


  }

  selectradio0(x) {
    //for selecting suites for particular user
   
  }

  edittd(i:number, j:number) {
    this.show[this.k][this.l]=false;
    this.show[i][j] = true;
    this.k = i;
    this.l =j;
  }
  get_srctestcaseid(i){
    this.srctestcaseid=i
  }
  get_targettestcaseid(i){
    this.targettestcaseid=i
  }
    
  editCell1(e,i){
    if(e==""){
      i.test_name=i.test_name;
    }
    else{
     this.navigate=true;
     this.editvalue=this.navigate
     
     var j ;
      this.disable1=true
      i.test_name = e;
      var updateTestName={"test_case_id":i.test_case_id,"test_name":e} 
      if(this.update[0] == null){
        this.update.push(updateTestName)
      }
      else{
      var isFlag= false;
      for(j=0;j<this.update.length;j++){
        if (this.update[j].test_case_id==updateTestName.test_case_id){
            this.update[j].test_name=updateTestName.test_name
            isFlag = true;
            break;
        }
      }
      if(!isFlag) {
        this.update.push(updateTestName)
      }
    }
    } 
  }
  editCell2(e,i){
    if(e==""){
      i.test_id=i.test_id;
    }
    else{
      this.navigate=true;
      this.editvalue=this.navigate
      var j;
      this.disable1=true
      i.test_id = e;
      var updateTestID={"test_case_id":i.test_case_id,"test_id":e} 
      if(this.update[0] == null){
        this.update.push(updateTestID)
      }
      else{
        var isFlag= false;
      for(j=0;j<this.update.length;j++){
        if (this.update[j].test_case_id==updateTestID.test_case_id){
            this.update[j].test_id=updateTestID.test_id
            isFlag=true
            break;
        }
      }
      if(!isFlag) {
        this.update.push(updateTestID)
      }
    }      
    }
  }
    
  selectradio_src(i){
    console.log(i)
    if(i=="*add new connection"){
      console.log("in if")
      this.router.navigate(['add-db'])
    }
    else{
      console.log("in else")

     this.srcconname="Connection"+i
    //  this.showsrcconname2=true
    //  this.showsrcconname1=false
     this.navigate=true;
     this.editvalue=this.navigate
     var j ;
      this.disable1=true
  
      var updateSrcDB={"test_case_id":this.srctestcaseid,"srcdbid":i,"srctype":"source"} 
      if(this.update[0] == null){
        this.update.push(updateSrcDB)
      }
      else{
      var isFlag= false;
      for(j=0;j<this.update.length;j++){
        if (this.update[j].test_case_id==updateSrcDB.test_case_id){
            this.update[j].srcdbid=updateSrcDB.srcdbid
            this.update[j].srctype="source"
            isFlag = true;
            break;
        }
      }
      if(!isFlag) {
        this.update.push(updateSrcDB)
      }
    }
  }  
  }


  selectradio_target(i){
    if(i=="*add new connection"){
      console.log("in if")
      this.router.navigate(['add-db'])
    }else{
    this.targetconname="Connection"+i
    // this.showtargetconname2=true
    // this.showtargetconname1=false
    this.navigate=true;
    this.editvalue=this.navigate
    var j ;
     this.disable1=true
 
     var updateTargetDB={"test_case_id":this.targettestcaseid,"targetdbid":i,"targettype":"target"} 
     if(this.update[0] == null){
       this.update.push(updateTargetDB)
     }
     else{
     var isFlag= false;
     for(j=0;j<this.update.length;j++){
       if (this.update[j].test_case_id==updateTargetDB.test_case_id){
           this.update[j].targetdbid=updateTargetDB.targetdbid
           this.update[j].targettype="target"
           isFlag = true;
           break;
       }
     }
     if(!isFlag) {
       this.update.push(updateTargetDB)
     }
   }
  }
    
 }
  
  editCell5(e,i){
    if(e==""){
       i.sourcetable=i.sourcetable
    }
    else{
      this.navigate=true;
      this.editvalue=this.navigate
      var j;
      this.disable1=true
      i.sourcetable = e;
      var updateSourceTaable={"test_case_id":i.test_case_id,"sourcetable":e}
      if(this.update[0] == null){
        this.update.push(updateSourceTaable) 
      }
      else{
      var isFlag= false;
      for(j=0;j<this.update.length;j++){
        if (this.update[j].test_case_id==updateSourceTaable.test_case_id){
            this.update[j].sourcetable=updateSourceTaable.sourcetable
            isFlag = true;
            break;
        }
      }
      if(!isFlag) {
        this.update.push(updateSourceTaable)
      }
    }
    } 
  }
  editCell6(e,i){
    if(e==""){
       i.targettable=i.targettable
    }
    else{
    this.navigate=true;
    this.editvalue=this.navigate
    var j;
    this.disable1=true
    i.targettable = e;
    var updateTargetTaable={"test_case_id":i.test_case_id,"targettable":e}
    if(this.update[0] == null){
      this.update.push(updateTargetTaable)
      
    }
    else{
    var isFlag= false;
    for(j=0;j<this.update.length;j++){
      if (this.update[j].test_case_id==updateTargetTaable.test_case_id){
          this.update[j].targettable=updateTargetTaable.targettable
          isFlag = true;
          break;
      }
    }
    if(!isFlag) {
      this.update.push(updateTargetTaable)
    }
  }
  } 
}
  editCell7(e,i){
    if(e==""){
      i.targetcolumn=i.targetcolumn;
    }
    else{
      this.navigate=true;
      this.editvalue=this.navigate
      var j;
      this.disable1=true
      i.targetcolumn = e;
      var updateTargetColumn={"test_case_id":i.test_case_id,"targetcolumn":e}
      if(this.update[0] == null){
        this.update.push(updateTargetColumn)
      }
      else{
      var isFlag= false;
      for(j=0;j<this.update.length;j++){
        if (this.update[j].test_case_id==updateTargetColumn.test_case_id){
            this.update[j].targetcolumn=updateTargetColumn.targetcolumn
            isFlag = true;
            break;
        }
      }
      if(!isFlag) {
        this.update.push(updateTargetColumn)
      }
    }
    } 
  }
   
  editCell8(e,i){
    if(e==""){
      i.test_case_detail.query.sourceqry=i.test_case_detail.query.sourceqry;
    }
    else{
      this.navigate=true;
      this.editvalue=this.navigate
      var j;
      this.disable1=true
      i.test_case_detail.query.sourceqry=e
      var updateSourceqry={"test_case_id":i.test_case_id,"sourceqry":e}
      if(this.update[0] == null){
        this.update.push(updateSourceqry)
      }
      else{
      var isFlag= false;
      for(j=0;j<this.update.length;j++){
        if (this.update[j].test_case_id==updateSourceqry.test_case_id){
            this.update[j].sourceqry=updateSourceqry.sourceqry
            isFlag = true;
            break;
        }
      }
      if(!isFlag) {
        this.update.push(updateSourceqry)
      }
    }
    } 
  }
  editCell9(e,i){
    if(e==""){
      i.test_case_detail.query.targetqry=i.test_case_detail.query.targetqry;
    }
    else{
      this.navigate=true;
      this.editvalue=this.navigate
      var j;
      this.disable1=true
      i.test_case_detail.query.targetqry=e
      var updateTargetqry={"test_case_id":i.test_case_id,"targetqry":e}
      if(this.update[0] == null){
        this.update.push(updateTargetqry)      
      }
      else{
      var isFlag= false;
      for(j=0;j<this.update.length;j++){
        if (this.update[j].test_case_id==updateTargetqry.test_case_id){
            this.update[j].targetqry=updateTargetqry.targetqry
            isFlag = true;
            break;
        }
      }
      if(!isFlag) {
        this.update.push(updateTargetqry)
      }
    }
    } 
  }
  
Submit1(){
       this.changesSaved=true
        var i;
        var keys;
        var values;
        console.log(this.update)
        for(i=0;i<this.update.length;i++){
        this.fileUploadService.update_test_suite_details(this.update[i].test_case_id,this.update[i]).subscribe(data => {  
       });
      }
      var j;
      var keys1;
      var values1;
      for(j=0;j<this.update1.length;j++){
        this.fileUploadService.update_test_suite_details1(this.update1[j].db_id,this.update1[j]).subscribe(data => {   
       });
      }

      swal("Good job!", "Data saved successfully!", "success");
      this.disable1=false
      this.editvalue=!this.editvalue
  }


 


  canDeactivate():Observable<boolean> | Promise<boolean> | boolean{
      if(!this.editvalue){
          return true;
      }
      // if(this.editvalue && !this.changesSaved){
      //   return confirm("do you want to leave the page")
      // }
      
      if(this.editvalue && !this.changesSaved){ 
        
         let  val1  =  swal({
                title:"Want to leave the page?",
                text:'Changes were not saved, Click "No" to stay in the page.',
               icon: "warning",
               buttons:['Yes','No'],  
               })
               .then((buttons) => {
                 if (buttons) {
                   this.val=false;
                   return this.val;
                 } else{
                  
                   this.val=true;
                   return this.val;
                   
                 } 
               });
        return val1;
           }

      else{
        return true;
      }
  }
  
  toggleInput(i: number, j: number) {
    this.show[i][j] = !this.show[i][j]
  }

  checkone(i){    
   function findequal(j) {
      if( j == i){
        return j;
      }
    }
    
    // console.log(this.test_case_id_checked)
    var k=this.test_case_id_checked.find(findequal)
    if(k==i){
       this.test_case_id_checked.splice(this.test_case_id_checked.indexOf(i),1)
       this.show5=true
       console.log(this.test_case_id_checked)
    }
    else{
      this.test_case_id_checked.push(i);
      this.show5=false;
     console.log(this.test_case_id_checked); 
      console.log("inelse")
    }
    if(this.test_case_id_checked[0]==null){
      this.show5 = true
    }
    else{
      this.show5=false
    }
    
  }
  Suitename(){
    swal({
      title: 'Hello',
      text: 'Please give the suite name',
      content: {
        element: 'input',
        attributes: {
          defaultValue: 'Qulity suite',
        }

      }
    }).then(movie =>{this.show6=false,
       this.suite_name=movie})
    
  }
  Create(){
   

    console.log(this.suite_name)
   
    this.fileUploadService.new_test_suite(JSON.stringify(this.test_case_id_checked),this.suite_name).subscribe(data => {
    
    })
    swal("Good job!", "New test suite is created successfully!", "success");
    this.show5=true
    this.show6=true
  }
  
    
  checkall(){ 
    
    if(this.test_case_id_checked==this.a && this.test_case_id_checked != []) {
      console.log("1")
      this.show5=true
      this.test_case_id_checked =[]
      
      
    }
      
    else if ( this.test_case_id_checked[0] == null){
      console.log("2")
      this.show5=false
      this.test_case_id_checked = []
     
      for(let i = 0; i < this.suite_detail.length; i++){
       this.test_case_id_checked.push(this.suite_detail[i].test_case_id)
       }
     console.log(this.test_case_id_checked)
     this.a=this.test_case_id_checked
     console.log(this.a)
    }

    else if(this.test_case_id_checked != [] && this.test_case_id_checked != this.a){
      console.log("3")
      this.show5=false
      this.test_case_id_checked = []
      for(let i = 0; i < this.suite_detail.length; i++){
        this.test_case_id_checked.push(this.suite_detail[i].test_case_id)
        }
        this.a=this.test_case_id_checked
        console.log(this.a)
      console.log(this.test_case_id_checked)
    }
     

    
    

  }
  goback(){
    // this.show2=true;
    // this.show3=false;
    console.log(this.editvalue)
    if(this.editvalue){ 
      swal({
        title:"Want to leave the page?",
        text:'Changes were not saved, Click "No" to stay in the page.',
       icon: "warning",
       buttons:['Yes','No'],  
       })
       .then((buttons) => {
         if (buttons) {
           this.show2=false
           this.show3=true
         } else {
          
      
           this.editvalue=false
           this.show2=true;
          this.show3=false;
     }
    });
    }
 else{
 
  this.show2=true;
  this.show3=false;
 }

    

  }
  
 


}