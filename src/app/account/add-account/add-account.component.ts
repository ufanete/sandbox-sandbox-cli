import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountService } from '@app/services/account.service';
import { Account } from '@app/document.schema';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
  account: Account | undefined;
  signupForm!: FormGroup
  

  constructor(private formBuilder: FormBuilder, 
    private accountService: AccountService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: new FormControl('Barak'),//, Validators.required),
      email: new FormControl('barak@email.com'),
      password: new FormControl('WPd8dBAq4HrhDvS'),
      password_conf: new FormControl('WPd8dBAq4HrhDvS')
    });
  }
  
  ngOnDestroy(): void {}

  onSubmit(): void {
    if (!this.signupForm.value.username) {
      alert('Please add a Username!');
      return;
    }

    const newUser: Account = this.signupForm.value;

    console.warn('Your order has been submitted', this.signupForm.value);

    //this.onAddTask.emit(newTask);
    this.accountService.register(newUser).subscribe((account: Account) => {
      console.log(account);
      if (account != null) {
        this.account = account;
        this.signupForm.reset();
        this.router.navigate(['/']);
      }
    });
  }
}
