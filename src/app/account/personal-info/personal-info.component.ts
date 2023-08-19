import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { first } from 'rxjs';

import { AccountService, RouterService} from '@app/services';
import { Account } from '@app/models';;
import { environment } from '@environments/environment';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent {
  account: Account;
  loading = false;

  constructor(private formBuilder: FormBuilder, 
    private accountService: AccountService,
    private router: RouterService) {
      // set the account value
      this.account = accountService.accountValue;
  }

  

  goToProfileEdit(): void {
    this.router.navigateByUrl(environment.PAGE_ACCOUNT_INFO_EDIT);
  }

}
