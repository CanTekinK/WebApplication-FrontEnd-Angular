import { Component, OnInit, ɵConsole } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Message } from '../models/Message';
import { ActivatedRoute, Router } from '@angular/router';
import { messageState } from '../models/messageState';



@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
  providers: [UserService, AuthService]
})
export class ManagerComponent implements OnInit {


  constructor(private userService: UserService, private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) { }

  countingState=false;
  items = [];
  unAcceptedMessagesCount;
  AcceptedMessagesCount;
  stanByMessagesCount;
  messages: Message[];
  MessageState: messageState = new messageState();
  acceptedMessages: Message[] = [];
  unAcceptedMessages: Message[] = [];
  stanByMessages: Message[] = [];
  messageId: number = -1;

  ngOnInit() {




    
    this.activatedRoute.params.subscribe(params => {
      this.getMessages(params["managerId"]);


    });



  }

  getMessages(managerId: number) {
    this.userService.getMessages(managerId, this.authService.token).subscribe(data => {
      this.messages = data;

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
      console.log(this.acceptedMessages.length)
    
      this.unAcceptedMessagesCount=this.unAcceptedMessages.length;
      this.AcceptedMessagesCount=this.acceptedMessages.length;
      this.stanByMessagesCount=this.stanByMessages.length;
      this.countingState=true;
      console.log(this.items)
      

    }
    )




    //=[{'nameSurname':'Can','id':this.acceptedMessages[2].id.toString},{'nameSurname':'Tekin','id':1}]

    console.log(this.acceptedMessages)
    console.log("BURASSII")

  }
  messageStateSet(messageId: number, state: boolean, messageEmail: string) {

    if (state == true) {
      this.MessageState.mState = true;
      this.MessageState.email = messageEmail;
      this.userService.setStateToMassage(this.authService.token, messageId, this.MessageState, this.authService.getCuurentUserId())






    }
    else {
      this.MessageState.mState = false;
      this.MessageState.email = messageEmail;
      this.userService.setStateToMassage(this.authService.token, messageId, this.MessageState, this.authService.getCuurentUserId());



    }


  }



}
