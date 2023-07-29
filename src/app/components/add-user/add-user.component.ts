import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/document.schema';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: User | undefined;
  //@Output() onAddTask: EventEmitter<User> = new EventEmitter();
  signupForm: FormGroup = this.formBuilder.group({
    username: new FormControl('Barak'),//, Validators.required),
    email: new FormControl('barak@email.com'),
    password: new FormControl('WPd8dBAq4HrhDvS'),
    password_conf: new FormControl('WPd8dBAq4HrhDvS')
  });


  constructor(private formBuilder: FormBuilder, 
    private dataService: DataService,
    private router: Router) {
  }

  ngOnInit(): void {}
  
  ngOnDestroy(): void {}

  onSubmit(): void {
    if (!this.signupForm.value.username) {
      alert('Please add a Username!');
      return;
    }

    const newUser: User = this.signupForm.value;

    //this.onAddTask.emit(newTask);
    this.dataService.addUser(newUser).subscribe((user: User) => {
      if (user != null) {
        this.user = user;
        this.router.navigate(['/']);
      }
      console.log(user);
    });

    
    this.router.navigate(['/']);

    console.warn('Your order has been submitted', this.signupForm.value);
    console.dir(this.signupForm);
    //this.signupForm.reset();
  }
}
