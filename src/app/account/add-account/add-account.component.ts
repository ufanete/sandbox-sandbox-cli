import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup  } from '@angular/forms';
import { first } from 'rxjs/operators';
import { faApple, faGoogle, faGithub, IconDefinition } from '@fortawesome/free-brands-svg-icons';

import { Account, FormField } from '@app/models';;
import { environment } from '@environments/environment';
import { AccountService, RouterService, UiFormService } from '@app/services';
import { UiAlertService } from '@app/shared/services';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
  faApple: IconDefinition = faApple;
  faGoogle: IconDefinition = faGoogle;
  faGithub: IconDefinition = faGithub;
  loading = false;
  submitted = false;
  questions: FormField<any>[] = [];

  constructor(
    private accountService: AccountService,
    private router: RouterService,
    private service: UiFormService,
    private alertService: UiAlertService) {
      this.service.getQuestionsRegister().subscribe((question) => {
        this.questions = question;
      });
    }

  ngOnInit(): void {}
  
  ngOnDestroy(): void {}

  onSubmit(form: FormGroup<any>): void {
    
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (form.invalid) {
      this.alertService.error("Error with inputs");
      return;
    }

    this.loading = true;
    this.submitted = true;

    const newUser: Account = form.value;
    this.accountService.register(newUser)
      .pipe(first())
      .subscribe({
        next: (account: Account) => {
          console.debug(AddAccountComponent.name, account);
          if (account != null) {
            this.router.navigateByUrl(environment.PAGE_HOME);
          }
        },
        error: err => {
          this.alertService.error(err.error);
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
