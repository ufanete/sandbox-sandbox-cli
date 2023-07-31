import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Account, JwtToken } from '@app/document.schema';
import { AccountService } from '@app/services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements OnDestroy {
    
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log("1 - canActivate");
        return this.accountService.isLoggedIn2().then((isLoggedIn)=>{
            
        console.log("3 - canActivate", isLoggedIn);
        
        if (isLoggedIn) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login'], 
            { queryParams: { returnUrl: state.url }});
        
        return false;
        });
    }
    
    ngOnDestroy() { }
}