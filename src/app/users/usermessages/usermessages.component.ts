import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Message } from 'src/app/models/Message';

@Component({
  selector: 'app-usermessages',
  templateUrl: './usermessages.component.html',
  styleUrls: ['./usermessages.component.css'],
  providers:[UserService,AuthService]
})
export class UsermessagesComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private userService:UserService,private authService:AuthService) { }

  unAcceptedMessagesCount;
  AcceptedMessagesCount;
  stanByMessagesCount;
  messages:Message[]=[];
  acceptedMessages: Message[] = [];
  unAcceptedMessages: Message[] = [];
  stanByMessages: Message[] = [];
  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{

      this.getMessagesByUser(params["userId"]);
    })
  }
  getMessagesByUser(userId:number)
  {
    this.userService.getMessagesByUser(userId,this.authService.token).subscribe(data=>
      {
        this.messages=data;
        data.forEach(element => {
          if (element.mState == 1) {
            this.unAcceptedMessages.push(element);
          }
          else if (element.mState == 2) {
  
  
  
            this.acceptedMessages.push(element);
          }
          else {
            this.stanByMessages.push(element);
          }
  
        });
        this.unAcceptedMessagesCount=this.unAcceptedMessages.length;
        this.AcceptedMessagesCount=this.acceptedMessages.length;
        this.stanByMessagesCount=this.stanByMessages.length;
        
      }
    );

  }

}
