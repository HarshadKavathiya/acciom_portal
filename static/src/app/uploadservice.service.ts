import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
import { HttpHeaders } from '@angular/common/http';


import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})


export class UploadserviceService {
  authToken: any;
  user: any;
  newtoken:any
  
  url='http://127.0.0.1:8000';

  constructor(private http:HttpClient) { }
  
  

  inputFile:File

  postFile(fileToUpload: File,selectedsheet:any,selectedCase:any,suitename:any,executevalue:any):Observable<any>{
    const upload=new FormData()
    console.log(selectedCase)
    console.log(suitename)
    upload.append('inputFile',fileToUpload)
    upload.append('sheet',selectedsheet)
    upload.append('selectedcase',selectedCase)
    upload.append('suitename',suitename)
    upload.append('exvalue',executevalue)
    this.loadToken()
    this.newtoken='Bearer'+" "+this.authToken
    console.log(this.newtoken)
    console.log(upload)
    let headers = new HttpHeaders().set('Authorization',this.newtoken)

    
    return this.http.post<any>(`${this.url}/upload`,upload,{headers: headers}); 
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
  // const helper = new JwtHelperService();
  //   const isExpired = helper.isTokenExpired('id_token');
    return !!localStorage.getItem('id_token'); 

    //  return isExpired ;debugger
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
  
    let headers= new HttpHeaders().set('Content-Type','application/json')
    return this.http.post<any>(`${this.url}/add`,createForm,{headers:headers})
  }
  getSuiteById(id){
    let headers=new HttpHeaders().set('Content-Type','application/json')
    return this.http.get<any>(`${this.url}/getsuite/${id}`,{headers:headers});
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
    // headers = headers.append('Content-Type','application/json')
    // // let headers = new HttpHeaders().set('Authorization',this.newtoken)

    // headers = headers.append('Authorization',this.newtoken)
    run.append("suite_id",suite_id)

    return this.http.post<any>(`${this.url}/testdb/`,run,{headers: headers}); 

  }
  ExecuteTestbyCaseId(case_id:any):Observable<any>{
    const run = new FormData()
    run.append('case_id',case_id)
    this.loadToken()
    this.newtoken='Bearer'+" "+this.authToken
    // let headers = new HttpHeaders()
    // headers.append('Content-Type','application/json')
    // headers.append('Authorization',this.newtoken)
    let headers =new HttpHeaders({
      'Authorization':this.newtoken,
      // 'Content-Type':'application/json',
      
    })
    return this.http.post<any>(`${this.url}/testdb/`,run,{headers:headers});
  }





}
