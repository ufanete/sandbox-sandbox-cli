import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';

import { AccountService } from '@app/services/account.service';
import { Account } from '@app/document.schema';
import { environment } from '@environments/environment';
import { first } from 'rxjs';
import { RouterService } from '@app/services';

@Component({
  selector: 'app-personal-info-edit',
  templateUrl: './personal-info-edit.component.html',
  styleUrls: ['./personal-info-edit.component.css']
})
export class PersonalInfoEditComponent {
  account: Account;
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, 
    private accountService: AccountService,
    private router: RouterService) {
      // set the account value
      this.account = accountService.accountValue;
      // init the form
      this.form = this.formBuilder.group({
        firstname: new FormControl(this.account.firstname, [Validators.required]),
        lastname: new FormControl(this.account.lastname, [Validators.required]),
        nickname: new FormControl(this.account.nickname),
        email: new FormControl(this.account.email, [Validators.required])
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  onSubmit(): void {
    console.debug("submit");
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.submitted = true;

    const account: Account = this.form.value;
    this.accountService.update(account)
      .pipe(first())
      .subscribe({
        next: (account: Account) => {
          console.debug(PersonalInfoEditComponent.name, account);
          if (account != null) {
            this.router.navigateByUrl(environment.PAGE_HOME);
          }
        },
        error: error => {
            console.dir(error);
            this.loading = false;
            this.submitted = false;
        }
      });}

  goBack() : void {
      // redirect to home page
    this.router.navigateByUrl(environment.PAGE_HOME);
  }
}
