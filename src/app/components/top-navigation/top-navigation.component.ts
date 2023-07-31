import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {  NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { Account } from '@app/document.schema';
import { AccountService } from '@app/services/account.service';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css']
})
export class TopNavigationComponent {
  backgroundTheme = "bg-body-tertiary"
  faBars = faBars;
  closeResult = '';
  isLoggedIn: boolean = false;

  @Input()
  title!: string;

  @Input()
  account?: Account | null;
  
  constructor(
    private accountService: AccountService,
    private router: Router,
    private offcanvasService: NgbOffcanvas) {
    this.accountService.account.subscribe(account => this.account = account);
    this.accountService.isUserLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = true;
    });
  }
  
  /** The logout function */
  logout(): void {
    this.accountService.logout()
      .subscribe(() => {
        this.offcanvasService.dismiss();
      });
  }

  /** OpenS the side navigation panel */
	open(content: any) {
		this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
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

}
