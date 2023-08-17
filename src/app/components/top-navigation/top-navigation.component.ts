import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {  NgbOffcanvas, OffcanvasDismissReasons, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { Account, JwtToken } from '@app/document.schema';
import { AccountService, RouterService } from '@app/services';
import {environment} from '@environments/environment';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css']
})
export class TopNavigationComponent {
  @Input() navClass = "sticky-top";
  @Input() backgroundClass:string = "bg-body-tertiary";
  faBars = faBars;
  closeResult = '';
  isUserLoggedIn: BehaviorSubject<boolean>;
  title: string = environment.title;
  account: Account;
  /** The side panel options */
  panelOptions:Object = {
    panelClass: ".sb-light-blur text-black", 
    ariaLabelledBy: 'offcanvas-basic-title',
    backdrop: false,
    scroll: true
  };
  
  constructor(
    private accountService: AccountService,
    private router: RouterService,
    private offcanvasService: NgbOffcanvas
  ) {

    this.isUserLoggedIn = new BehaviorSubject(false);
    this.account = this.accountService.accountValue;

    this.accountService.isUserLoggedIn.subscribe((token: JwtToken) => {
      this.isUserLoggedIn.next(token.isSignedIn);
    });
    
    this.accountService.isSignedIn().subscribe((token: JwtToken) => {
      console.log(token);
      this.isUserLoggedIn.next(token.isSignedIn);
    });

  }

  /**
   * Check if User Account is signedOn
   */
  public get isSignedIn() : boolean {
    return this.isUserLoggedIn.value;
  }

  // this.offcanvasService.dismiss();
  /** Opens the side navigation panel */
	open(content: any): void {
		this.offcanvasService.open(content, this.panelOptions).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === OffcanvasDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === OffcanvasDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on the backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  /** 
   * The logout function 
   */
  logout(): void {
    this.accountService.signout()
      .subscribe((response) => {
        console.debug("logging out", response);
        this.router.navigateByUrl(environment.PAGE_HOME);
      });
  }

  goToLogin(): void {
    this.router.navigateByUrl(environment.PAGE_LOGIN);
  }

  goToProfile(): void {
    this.router.navigateByUrl(environment.PAGE_ACCOUNT_INFO);
  }

  goToRegister() : void {
    this.router.navigateByUrl(environment.PAGE_SIGNUP);
  }
}
