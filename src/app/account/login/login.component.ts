import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, RouterService } from '@app/services/';
import { environment } from '@environments/environment';

@Component({
  //selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private accountService: AccountService,
      private router: RouterService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['bill34@email.com', Validators.required],
      password: ['WPd8dBAq4HrhDvS', Validators.required]
    });
  }
  
  onSubmit() {
    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.submitted = true;
    this.loading = true;
    this.accountService.login(this.form.value['email'], this.form.value['password'])
        .pipe(first())
        .subscribe({
            next: () => {
                this.router.navigateByUrl(environment.PAGE_HOME);
            },
            error: error => {
                console.dir(error);
                this.loading = false;
                this.submitted = false;
            }
        });
    }
}
