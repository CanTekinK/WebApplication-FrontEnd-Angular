import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {ThemePalette} from '@angular/material/core';
import { LoginUser } from 'src/app/models/loginUser';

@Component({
  selector: 'app-managerlogin',
  templateUrl: './managerlogin.component.html',
  styleUrls: ['./managerlogin.component.css'],
  providers:[AuthService]
})
export class ManagerloginComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router) { }

  color: ThemePalette;
  state=false;
  loginUser:LoginUser=new LoginUser();
  ngOnInit() {
    if(this.isOnline())
    {
      this.authService.logOut();

    }
  }


  isSpinnerExist()
  {
    this.color='accent'
    
   
    return this.state;
  }
  login()
  {
    this.state=true;
    console.log(this.loginUser.nameSurname+"  %%%%  "+this.loginUser.password)
    this.authService.managerLogin(this.loginUser);
  }
  isOnline()
  {
    return this.authService.loggedIn();

  }


}
