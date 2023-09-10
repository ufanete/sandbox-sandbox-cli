import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@app/models';
import { AccountService, DataService, RouterService } from '@app/services';
import { BehaviorSubject, Observable } from 'rxjs';
//import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-chat-private',
  templateUrl: './chat-private.component.html',
  styleUrls: ['./chat-private.component.css']
})
export class ChatPrivateComponent implements OnInit {

  user$: Observable<User> | null = null;

  constructor(
    private accountService: AccountService,
    private dataService: DataService,
    private router: RouterService,
    private route: ActivatedRoute
  ) {

    const userId: string | null = this.route.snapshot.paramMap.get('id');
    if (userId && userId.length > 0) {
      this.user$ = this.dataService.getUser(userId);
    }

  }



  ngOnInit() { }



}
