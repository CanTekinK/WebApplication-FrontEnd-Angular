import { Component, OnInit } from '@angular/core';
import { UserRegister } from '../models/UserRegister';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User';
import { NewPassword } from '../models/newPassword';

@Component({
  selector: 'app-userupdate',
  templateUrl: './userupdate.component.html',
  styleUrls: ['./userupdate.component.css'],
  providers:[UserService,AuthService]
})
export class UserupdateComponent implements OnInit {

  constructor(private activetadRoute:ActivatedRoute, private userService:UserService,private authService:AuthService) { }

  currentuserId;
  currentUserId:number;
 
  user:User;
  userRegister:UserRegister=new UserRegister();
  newPassword:NewPassword=new NewPassword();
  authNewPassword:string;

  ngOnInit() {
    this.activetadRoute.params.subscribe(params=>
      {
        this.getUserDetails(params["userId"]);
        this.currentUserId=params["userId"];
     
        
    

      })
  }

  update()
  {

    console.log(this.userRegister.password);
    this.userService.updateUser(this.userRegister,localStorage.getItem('token').toString());
    
    console.log(this.userRegister.email+" "+this.userRegister.nameSurname);
  }
  getUserDetails(userId:number)
  {
    this.userService.getUsersById(userId,localStorage.getItem('token').toString()).subscribe(data=>
      {
        this.userRegister.email=data.email;
        this.userRegister.nameSurname=data.nameSurname;
        this.userRegister.phoneNumber=data.phoneNumber;
      
        this.userRegister.id=data.id;

      })
  }

  updatePassword()
  {
    if(this.authOfControl())
    {
      console.log(this.newPassword.currentPassword,this.newPassword.newPassword)
      this.userService.updatePassword(this.authService.getCuurentUserId(),this.newPassword,this.authService.token);
    }
  }
  authOfControl()
  {
    if(this.authNewPassword==this.newPassword.newPassword)
    {
      return true;
    }
  }
  isAuthenticated()
  {
    
    if(this.currentUserId==this.authService.getCuurentUserId())
    {
      return true;
    }
    return false;
    
  }

}
