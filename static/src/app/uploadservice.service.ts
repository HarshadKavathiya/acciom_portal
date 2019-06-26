import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';


import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})

export class UploadserviceService {
  authToken: any;
  user: any;
  newtoken:any

  ;
  url= environment.APIUrl+'/api';

  constructor(private http:HttpClient) { }
  inputFile:File

  postFile(fileToUpload: File,selectedsheet:any,selectedCase:any,suitename:any,executevalue:any):Observable<any>{
    console.log("came in service")
    const upload=new FormData()
    upload.append('inputFile',fileToUpload)
    upload.append('sheet',selectedsheet)
    upload.append('selectedcase',selectedCase)
    upload.append('suitename',suitename)
    upload.append('exvalue',executevalue)
    this.loadToken()
    this.newtoken='Bearer'+" "+this.authToken
    let headers = new HttpHeaders().set('Authorization',this.newtoken)
    return this.http.post<any>(`${this.url}/test-suite`,upload,{headers: headers}); 
  }

  authenticateUser(createForm){
    console.log(createForm)

    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this.http.post<any>(`${this.url}/login`,createForm,{headers: headers})
  }

  storeUserData(token, user,uid,refresh_token,name){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    localStorage.setItem('id',uid)
    localStorage.setItem('refresh_token',refresh_token)
    localStorage.setItem('name',name)
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return !!localStorage.getItem('id_token'); 

  }
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  register(createForm){
    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this.http.post<any>(`${this.url}/register`,createForm,{headers: headers})
  }

  StoreDB(createForm){
    this.loadToken()
    this.newtoken='Bearer'+" "+this.authToken
    console.log(this.newtoken)
    let headers =new HttpHeaders({
      'Authorization':this.newtoken
    })
    return this.http.post<any>(`${this.url}/db-detail`,createForm,{headers:headers})
  }
  get_db_connect(){
    this.loadToken()
    this.newtoken='Bearer'+" "+this.authToken
    let headers =new HttpHeaders({
      'Authorization':this.newtoken
    })
    return this.http.get<any>(`${this.url}/db-detail`,{headers:headers})

  }
  get_db_connect_byid(db_id){
    this.loadToken()
    this.newtoken='Bearer'+" "+this.authToken
    let headers =new HttpHeaders({
      'Authorization':this.newtoken
    })
    return this.http.get<any>(`${this.url}/db-detail/${db_id}`,{headers:headers})

  }
  update_db_details(db_id,createForm){
    this.loadToken()
    this.newtoken='Bearer'+" "+this.authToken
    let headers =new HttpHeaders({
      'Authorization':this.newtoken
    })
    return this.http.put<any>(`${this.url}/db-detail-update/${db_id}`,createForm,{headers:headers})

  }
  getSuiteById(id){
    this.loadToken()
    this.newtoken='Bearer'+" "+this.authToken
    let headers =new HttpHeaders({
      'Authorization':this.newtoken,
      
    })
    return this.http.get<any>(`${this.url}/test-suite`,{headers:headers});
  }

  ExecuteTestbySuiteId(suite_id:any):Observable<any>{
    const run=new FormData()
    this.loadToken()
    this.newtoken='Bearer'+" "+this.authToken
    console.log(this.newtoken)
    let headers =new HttpHeaders({
      'Authorization':this.newtoken,
      // 'Content-Type':'application/json',
      
    })
    run.append("suite_id",suite_id)

    return this.http.post<any>(`${this.url}/test-case-job/`,run,{headers: headers}); 

  }
  ExecuteTestbyCaseId(case_id:any):Observable<any>{
    const run = new FormData()
    run.append('case_id',case_id)
    this.loadToken()
    this.newtoken='Bearer'+" "+this.authToken
    
    let headers =new HttpHeaders({
      'Authorization':this.newtoken,      
    })
    return this.http.post<any>(`${this.url}/test-case-job/`,run,{headers:headers});
  }

  exportinexcel(case_log_id){
    this.loadToken()
    this.newtoken='Bearer'+" "+this.authToken
    
    let headers =new HttpHeaders({
      'Authorization':this.newtoken,
    })
    return this.http.get<any>(`${this.url}/export/${case_log_id}/`,{headers:headers})
  }
  testcase_log_byid(test_case_log){
    this.loadToken()
    this.newtoken='Bearer'+" "+this.authToken
    
    let headers =new HttpHeaders({
      'Authorization':this.newtoken,
    })
    return this.http.get<any>(`${this.url}/test-case-log/${test_case_log}/`,{headers:headers})
  }

  getcasedetails(case_id){
    this.loadToken()
    this.newtoken='Bearer'+" "+this.authToken
    
    let headers =new HttpHeaders({
      'Authorization':this.newtoken,
    })
    return this.http.get<any>(`${this.url}/edit-test-case/${case_id}`,{headers:headers})
  }
  mail_for_reset_password(form){
    console.log(form)
    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this.http.post<any>(`${this.url}/reset-password-email`,form,{headers: headers})
  }
  reset_password(password,confirm_password,token){
    const Reset=new FormData()
    console.log(password,confirm_password,token)
    Reset.append('password',password)
    Reset.append('confirm_password',confirm_password)
    Reset.append('token',token)
    console.log(Reset)
    let headers = new HttpHeaders().set('Content-Type','application/json')

    return this.http.post<any>(`${this.url}/reset-password`,{"password":password,"confirm_password":confirm_password,"token":token},{headers: headers})
  }
  check_reset_password_token(token){
    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this.http.get<any>(`${this.url}/reset-password-link/${token}`,{headers: headers})
  }
  change_password(old_password,password){
    this.loadToken()
    this.newtoken='Bearer'+" "+this.authToken
    
    let headers =new HttpHeaders({
      'Authorization':this.newtoken,
    })    
    return this.http.post<any>(`${this.url}/change-password/`,{"old_password":old_password,"new_password":password},{headers: headers})


  }
  verify_user(){
    this.loadToken()
    this.newtoken='Bearer'+" "+this.authToken
    
    let headers =new HttpHeaders({
      'Authorization':this.newtoken,
    }) 
    return this.http.get<any>(`${this.url}/verify-user`,{headers: headers})

  }
  check_verify_account_token(token){
    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this.http.get<any>(`${this.url}/verify-account/${token}`,{headers: headers})
  }
  check_connection(form){
    return this.http.post<any>(`${this.url}/check-connection`,form)
  }
  get_all_connections(suite_id){
    this.loadToken()
    this.newtoken='Bearer'+" "+this.authToken
    let headers =new HttpHeaders({
      'Authorization':this.newtoken,
    }) 
    return this.http.get<any>(`${this.url}/connection-detail/${suite_id}`,{headers: headers})
  }
  select_connections(type, cases, connection_id){  
    this.loadToken()
    this.newtoken='Bearer'+" "+this.authToken
    let headers =new HttpHeaders({
      'Authorization':this.newtoken,
    }) 
    return this.http.post<any>(`${this.url}/select-connection`,{
      "connection_type":type,
      "case_id":cases,
      "db_id":connection_id
    },{headers: headers})
  }
  update_case_details(case_id,src_db_id,target_db_id, src_table, target_table, src_qry, target_qry,column){
    console.log(column)
    this.loadToken()
    this.newtoken='Bearer'+" "+this.authToken
    let headers =new HttpHeaders({
      'Authorization':this.newtoken,
    }) 
    return this.http.put<any>(`${this.url}/edit-test-case/${case_id}`,{
      "src_db_id":src_db_id,
      "target_db_id":target_db_id,
      "src_table":src_table,
      "target_table":target_table,
      "src_query":src_qry,
      "target_query":target_qry,
      "column":column
    },{headers: headers})
  }
}

