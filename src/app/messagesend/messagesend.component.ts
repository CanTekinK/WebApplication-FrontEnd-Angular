import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HtmlParser } from '@angular/compiler';
import { messageSend } from '../models/messageSend';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-messagesend',
  templateUrl: './messagesend.component.html',
  styleUrls: ['./messagesend.component.css']
})
export class MessagesendComponent implements OnInit {

  constructor(private authService:AuthService,private userService:UserService) { }

  message:messageSend=new messageSend();
  htmlContent;
  htmlContent2;
  
  jsonDoc2;
  ngOnInit() {
 
    this.htmlContent2="asda<b>ddddd</b>";
    

  }
  sendMessage()
  {
    this.message.mState=0;
    this.message.userId=this.authService.getCuurentUserId();
    this.userService.sendAMessage(this.authService.token,this.message);


    console.log(this.htmlContent);
  }

  
 
}
