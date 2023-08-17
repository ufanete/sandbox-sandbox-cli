import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(
      private route: ActivatedRoute,
      private router: Router
  ) { 

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }
  navigateByUrl(url: string): Promise<boolean> {
    // get return url from query parameters or default to home page
    //const returnUrl = this.route.snapshot.queryParams['returnUrl'] || url;
    return this.router.navigateByUrl(url, {onSameUrlNavigation: "reload"});
  }

  navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> {
    //const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    return this.router.navigate(commands, {onSameUrlNavigation: "reload"});
  }

}
