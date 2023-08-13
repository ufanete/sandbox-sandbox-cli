import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/services/account.service';
import { Account } from '@app/document.schema';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  account: Account;
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, 
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router) {
      this.account = accountService.userValue;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: new FormControl(this.account.username, Validators.required),
      email: new FormControl(this.account.email, Validators.required),
      password: new FormControl(this.account.password),
      password_conf: new FormControl(this.account.password)
    });
  }
  
  ngOnDestroy(): void {}

  onSubmit(): void {}
}
