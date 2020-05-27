import { Component, OnInit, ɵConsole } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css'],
  providers:[AuthService]
})
export class UserloginComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router) {  }
  
 

  color: ThemePalette;
  state=false;
  userIdLoggedIn;

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
   
    this.authService.login(this.loginUser);
  }
  isOnline()
  {
    return this.authService.loggedIn();

  }

}
