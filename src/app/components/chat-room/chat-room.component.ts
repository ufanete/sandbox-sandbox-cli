import { Component, OnInit } from '@angular/core';
import { Account } from '@app/models';
import { AccountService } from '@app/services';

// declare the javascript function here
declare function chatapp(account: Account): any;

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  account: Account;

  constructor(
    private accountService: AccountService) {
      
    this.account = this.accountService.accountValue;
  }
  ngOnInit(): void {
    chatapp(this.account!);
  }

  //TODO add flag to preserve conversation
}
