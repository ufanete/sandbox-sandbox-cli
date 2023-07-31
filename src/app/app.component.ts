import { Component, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Account } from '@app/document.schema';
import { AccountService } from '@app/services/account.service';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  account?: Account | null; 
  title = 'sandbox-node-cli';
  subscription: Subscription;
  
  constructor(
    private accountService: AccountService,
    private router: Router) {
      this.accountService.account.subscribe(account => this.account = account);
      this.subscription = router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          browserRefresh = !router.navigated;
        }
    });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
