import { Component, OnDestroy, HostListener  } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';

import { Account } from '@app/document.schema';
import { AccountService } from '@app/services/account.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  account: Observable<Account>; 
  title = environment.title;
  
  constructor(
    private accountService: AccountService
    ) {
      
      this.account = this.accountService.account.asObservable();
      //this.accountService.account.subscribe(account => this.account = account);
  }

  
   // call this event handler before browser refresh
@HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
  console.debug("Processing beforeunload...", event);
}

  
  ngOnDestroy() {
  }


}
