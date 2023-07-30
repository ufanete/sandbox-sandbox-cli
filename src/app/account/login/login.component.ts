import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { browserRefresh } from '@app/app.component';
import { AccountService } from '@app/services/account.service';
import { Account } from '@app/document.schema';

@Component({
  //selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public browserRefresh!: boolean;
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private accountService: AccountService,
      private route: ActivatedRoute,
      private router: Router
  ) { }

  ngOnInit() {
    this.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);
    
    this.form = this.formBuilder.group({
      email: ['barak@email.com', Validators.required],
      password: ['WPd8dBAq4HrhDvS', Validators.required]
    });
  }
  
  onSubmit() {
    console.log(arguments);
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.accountService.login(this.form.value['email'], this.form.value['password'])
        .pipe(first())
        .subscribe({
            next: () => {
                // get return url from query parameters or default to home page
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigateByUrl(returnUrl);
            },
            error: error => {
                console.dir(error);
                this.loading = false;
            }
        });
    }
}
