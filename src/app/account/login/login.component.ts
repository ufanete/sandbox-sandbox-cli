import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faApple, faGoogle, faGithub, IconDefinition } from '@fortawesome/free-brands-svg-icons';


import { AccountService, RouterService } from '@app/services/';
import { environment } from '@environments/environment';

@Component({
  //selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faApple: IconDefinition = faApple;
  faGoogle: IconDefinition = faGoogle;
  faGithub: IconDefinition = faGithub;
  faLightbulb: IconDefinition = faLightbulb;
  form!: FormGroup;
  loading = false;
  submitted = false;
  title: String = environment.title;

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
