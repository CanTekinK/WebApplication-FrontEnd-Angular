import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
  providers:[AuthService]
})
export class ApplicationComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
    if(this.isOnline())
    {
      this.authService.logOut();

    }

  }
  isOnline()
  {
    return this.authService.loggedIn();
  }

}
