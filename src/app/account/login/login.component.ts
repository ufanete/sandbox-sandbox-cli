import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faApple, faGoogle, faGithub, IconDefinition } from '@fortawesome/free-brands-svg-icons';


import { AccountService, RouterService, UiFormService } from '@app/services';
import { FormField } from '@app/models/form-field.model';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faApple: IconDefinition = faApple;
  faGoogle: IconDefinition = faGoogle;
  faGithub: IconDefinition = faGithub;
  faLightbulb: IconDefinition = faLightbulb;
  loading = false;
  submitted = false;
  title: String = environment.title;
  questions: FormField<any>[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: RouterService,
    private service: UiFormService
  ) {
    this.service.getQuestionsLogin().subscribe((question) => {
      this.questions = question;
    });
  }

  ngOnInit() { }

  onSubmit(form: FormGroup<any>): void {
    // stop here if form is invalid
    if (form.invalid) {
      return;
    }

    this.submitted = true;
    this.loading = true;
    //this.loading.emit(true);
    this.accountService.login(form.value['email'], form.value['password'])
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl(environment.PAGE_HOME);
        },
        error: (err) => {
          console.log("LoginComponent ->")
          console.dir(err.error);
          this.loading = false;
          this.submitted = false;
        }
      });
  }

  log(args: IArguments): void {
    console.log("LoginComponent ->")
    console.dir(args);
  }
}
