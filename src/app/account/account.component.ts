import { Component } from '@angular/core';

import { AccountService, RouterService } from '@app/services';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html'
  })
export class AccountComponent {
    constructor(
        private router: RouterService,
        private accountService: AccountService
    ) {
        console.debug("AccountComponent redirecting home if logged in");
        // redirect to home if already logged in
        if (this.accountService.accountValue) {
            this.router.navigate(['/']);
        }
    }
}