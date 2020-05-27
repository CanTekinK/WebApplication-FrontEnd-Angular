import { Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http';

import { GlobalUser } from './User';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers:[UserService,AuthService]
})
export class UsersComponent implements OnInit {



  constructor(private userService:UserService,private authService:AuthService,private router:Router) { }

  users:GlobalUser[];

  ngOnInit() {
    console.log()
    
    this.userService.getUsers(this.authService.token).subscribe(data=>
      {
     
        
        this.users=data;
      });

    
   


    
    
    
  }
  isOnline()
  {
    return this.authService.loggedIn();

  }
  


}
