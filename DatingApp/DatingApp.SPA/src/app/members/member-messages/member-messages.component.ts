import { AlertifyService } from './../../services/alertify.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models/message';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() userId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.laodMessages();
  }

  laodMessages() {
    this.userService.getMessageThreaad(this.authService.decodedToken.nameid, this.userId)
      .subscribe(messages => {
        this.messages = messages;
      }, error => {
        this.alertify.error(error);
      });
  }

  sendMessage() {
    this.newMessage.recipientId = this.userId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe(message => {
        this.messages.unshift(message);
        this.newMessage.content = '';
      }, error => {
        this.alertify.error(error);
      });
  }
}
