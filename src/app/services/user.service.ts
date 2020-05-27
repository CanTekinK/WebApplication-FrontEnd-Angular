import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalUser } from '../users/User';
import { Message } from '../models/Message';
import { Photo } from '../models/Photo';
import { User } from '../models/User';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';
import { UserRegister } from '../models/UserRegister';
import { NewPassword } from '../models/newPassword';
import { messageState } from '../models/messageState';
import { NgxGalleryActionComponent } from 'ngx-gallery';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/catch';
import { messageSend } from '../models/messageSend';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private http:HttpClient, private alertifyService:AlertifyService, private router:Router,private authService:AuthService) { }

  path:string="http://localhost:53147/";
  getUsers(userToken:string):Observable<GlobalUser[]>{


    let headers=new HttpHeaders();
  
    headers=headers.append("Authorization","Bearer "+userToken);
    return this.http.get<GlobalUser[]>(this.path+"home/users",{headers:headers});
  }
  getUsersById(userId:number,userToken:string):Observable<User>
  {
    let headers=new HttpHeaders();
 
    headers=headers.append("Authorization","Bearer "+userToken);
    return this.http.get<User>(this.path+"home/users/details/"+userId,{headers:headers});
  }

  getPhotosByUser(userId:number):Observable<Photo[]>
  {
    return this.http.get<Photo[]>(this.path+"home/users/photos/"+userId);
  }
  addPhotoByUser(userPhoto)
  {
    
    this.http.post(this.path+"home/photo/add",userPhoto).subscribe(data=>
      {

        
        this.alertifyService.success("New photo is added successfully!");
      }
      
    );
  }
  RegisterUser(user)
  {
    this.http.post(this.path+"auth/register",user).subscribe(data=>{
      this.alertifyService.success("Register process is completed successfully!");
     // this.router.navigateByUrl('/usersdetails/'+data["id"]);
   
    });
  }
  updateUser(user:UserRegister,userToken:string)
  {

    let headers=new HttpHeaders();
    headers=headers.append("Authorization","Bearer "+userToken);
    this.http.post(this.path+"home/users/details/update",user,{headers:headers}).subscribe(data=>{
      this.alertifyService.success("User is updated successfully!")
    })
  }
  denemeApi(id:number)//////////////////////////////////// DENEME
  {
    this.http.post(this.path+"auth/deneme",id).subscribe(data=>{
     
    })
    
  }


  getMessagesByUser(userId:number,userToken:string):Observable<Message[]>
  {
    let headers=new HttpHeaders();
    
    headers=headers.append("Authorization","Bearer "+userToken);
    return this.http.get<Message[]>(this.path+"home/users/messages/"+userId,{headers:headers});
  }

  getMessages(managerId:number,userToken:string):Observable<Message[]>
  {
    let headers=new HttpHeaders()
    
    headers=headers.append("Authorization","Bearer "+userToken);
    return this.http.get<Message[]>(this.path+"manager/messages/"+managerId,{headers:headers});
  }
  updatePassword(userId:number,newPassword:NewPassword,userToken:string)
  {
    let headers=new HttpHeaders();
    headers=headers.append("Authorization","Bearer "+userToken);
    this.http.post(this.path+"auth/user/passwordEdit/"+userId,newPassword,{headers:headers}).subscribe(
      
     )

  }
  setStateToMassage(userToken:string,messageId:number,mState:messageState,managerId:number)
  {
    let headers=new HttpHeaders();
    headers=headers.append("Authorization","Bearer "+userToken);
    this.http.post(this.path+"manager/messages/"+managerId+"/setstate/"+messageId,mState,{headers:headers}).subscribe(data=>{

      this.alertifyService.success("Message send!");
      this.router.navigateByUrl("manager/"+this.authService.getCuurentUserId());
      
    }
      
      
      )
  }
  sendAMessage(userToken:string,message:messageSend)
  {
    let headers=new HttpHeaders();
    headers=headers.append("Authorization","Bearer "+userToken);
    this.http.post(this.path+"home/user/sendmessage",message,{headers:headers}).subscribe(data=>
      {
        this.alertifyService.success("Message send!");
        
      })

  }
}
