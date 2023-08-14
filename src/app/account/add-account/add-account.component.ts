import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/services/account.service';
import { Account } from '@app/document.schema';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
  account: Account | undefined;
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, 
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: new FormControl('Barak'),//, Validators.required),
      email: new FormControl('barak@email.com'),
      password: new FormControl('WPd8dBAq4HrhDvS'),
      password_conf: new FormControl('WPd8dBAq4HrhDvS')
    });
  }
  
  ngOnDestroy(): void {}

  onSubmit(): void {
    
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.submitted = true;

    const newUser: Account = this.form.value;
    this.accountService.register(newUser)
      .pipe(first())
      .subscribe({
        next: (account: Account) => {
          console.debug(account);
          if (account != null) {
            this.account = account;
            // redirect to home page
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || environment.PAGE_HOME;
            this.router.navigateByUrl(returnUrl);
          }
        },
        error: error => {
            console.dir(error);
            this.loading = false;
        }
      });
  }

  goBack() : void {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || environment.PAGE_LOGIN;
    console.debug("in here", returnUrl);
      // redirect to home page
    this.router.navigateByUrl(returnUrl);
  }
}
