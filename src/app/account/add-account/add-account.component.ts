import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Account } from '@app/document.schema';
import { environment } from '@environments/environment';
import { AccountService, RouterService } from '@app/services';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, 
    private accountService: AccountService,
    private router: RouterService) {
      this.form = this.formBuilder.group({
        firstname: new FormControl('Barak', [Validators.required]),
        lastname: new FormControl('Shelly', [Validators.required]),
        nickname: new FormControl('Shelly'),
        email: new FormControl('bill34@email.com', [Validators.required]),
        password: new FormControl('WPd8dBAq4HrhDvS'),
        password_conf: new FormControl('WPd8dBAq4HrhDvS')
      });
    }

  ngOnInit(): void {}
  
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
          console.debug(AddAccountComponent.name, account);
          if (account != null) {
            this.router.navigateByUrl(environment.PAGE_HOME);
          }
        },
        error: error => {
            console.dir(error);
            this.loading = false;
            this.submitted = false;
        }
      });
  }

  goBack() : void {
      // redirect to home page
    this.router.navigateByUrl(environment.PAGE_LOGIN);
  }
}
