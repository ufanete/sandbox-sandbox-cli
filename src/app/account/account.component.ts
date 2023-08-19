import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '@app/services';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html'
  })
export class AccountComponent {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {
        console.debug("AccountComponent redirecting home if logged in");
        // redirect to home if already logged in
        if (this.accountService.accountValue) {
            this.router.navigate(['/']);
        }
    }
}