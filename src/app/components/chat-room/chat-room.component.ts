import { Component, OnInit } from '@angular/core';
import { Account } from '@app/models';
import { AccountService, DataService } from '@app/services';

// declare the javascript function here
declare function chatapp(account: Account, messages: any[]): any;

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  account: Account;
  messages: any[] = [];


  constructor(
    private accountService: AccountService,
    private dataService: DataService) {

    this.account = this.accountService.accountValue;

  }
  ngOnInit(): void {

    this.dataService.getMessages()
      .subscribe({
        next: (messages: any[]) => {
          console.dir(messages);
          this.messages = messages;
          chatapp(this.account!, this.messages);
        },
        error: (err) => {
          console.dir(err, this.messages);
          chatapp(this.account!, []);
        }
      }
      );


  }

}
