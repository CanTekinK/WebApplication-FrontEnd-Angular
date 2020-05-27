import { Injectable } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { HttpHandler, HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt'
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router:Router,private alertifyService:AlertifyService) { }
  path="http://localhost:53147/auth/";
  userToken:any;
  decodedToken:any;
  response:Response;
 
 
  jwtHelper:JwtHelper=new JwtHelper();
  
  TOKEN_KEY='token';
  managerLogin(loginUser:LoginUser)
  {
    let headers=new HttpHeaders();
    headers=headers.append("Content-Type","application/json");
    this.http.post(this.path+"manager/login",loginUser,{headers:headers}).subscribe(data=>
      {

      this.saveToken(data["tokenString"]);
    
      this.userToken=data["tokenString"];
      this.decodedToken=this.jwtHelper.decodeToken(data["tokenString"].toString());
      this.alertifyService.success("Welcome!")
      this.router.navigateByUrl('manager/'+this.getCuurentUserId())
 
    }
    );
  }
  errorHandler(): Observable<any>
  {
    
    this.alertifyService.error("Welcome!")
   
    
    return throwError("aa");
  }
  
  




  login(loginUser:LoginUser)
  {

    
    let headers=new HttpHeaders();
    headers=headers.append("Content-Type","application/json");
    this.http.post(this.path+"login",loginUser,{headers:headers}).subscribe(data=>{

      this.saveToken(data["tokenString"]);
    
      this.userToken=data["tokenString"];
      this.decodedToken=this.jwtHelper.decodeToken(data["tokenString"].toString());
      this.alertifyService.error("Welcome!")
      this.router.navigateByUrl('usersdetails/'+this.getCuurentUserId())
      
  
      

    });

  }
 

  saveToken(token)
  {
    localStorage.setItem(this.TOKEN_KEY,token);
  }
  logOut()
  {
    localStorage.removeItem(this.TOKEN_KEY);
  }
  loggedIn()
  {

    return tokenNotExpired(this.TOKEN_KEY);
    
  }
  
  get token()
  {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCuurentUserId()
  {
    return this.jwtHelper.decodeToken(localStorage.getItem(this.TOKEN_KEY)).nameid;
  }

}
