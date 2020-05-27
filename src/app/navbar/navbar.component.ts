import { Component, OnInit } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AuthService } from '../services/auth.service';
import { LoginUser } from '../models/loginUser';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[UserService,AuthService]
})
export class NavbarComponent implements OnInit {


  constructor(private authService:AuthService,private http:HttpClient,private userDeneme:UserService,private userService:UserService ) { }
  currentUserId="";
  currentUser:User;

  loginUser:LoginUser=new LoginUser();
  ngOnInit() {
    this.getCurrentUserName()

    this.currentUserId=this.authService.getCuurentUserId();
    console.log(this.currentUserId)
    

  }
  login()
  {

    console.log(this.loginUser.password+"     "+this.loginUser.nameSurname)
    this.authService.login(this.loginUser);
  }
  logout()
  {
    this.authService.logOut();
  }
  isAuthanticated()
  {
  
    return this.authService.loggedIn();
   
  }
  denemeApiFunck()
  {
    this.userDeneme.denemeApi(2);
  }
  getCurrentUserName()
  {
    this.userService.getUsersById(this.authService.getCuurentUserId(),this.authService.token).subscribe(data=>{
      this.currentUser=data;
    }

    )
  }

}
