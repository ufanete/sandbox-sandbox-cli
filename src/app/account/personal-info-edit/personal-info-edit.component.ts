import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AccountService } from '@app/services/account.service';
import { Account } from '@app/models';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable, first } from 'rxjs';
import { RouterService } from '@app/services';

@Component({
  selector: 'app-personal-info-edit',
  templateUrl: './personal-info-edit.component.html',
  styleUrls: ['./personal-info-edit.component.css']
})
export class PersonalInfoEditComponent {
  account: Account;
  form!: FormGroup;
  photo: BehaviorSubject<File>;
  loading = false;
  submitted = false;
  selectedFile!: ImageSnippet;

  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: RouterService) {
    this.photo = new BehaviorSubject(new File([], ""));
    // set the account value
    this.account = accountService.accountValue;
    // init the form
    this.form = this.formBuilder.group({
      firstname: new FormControl(this.account.firstname, [Validators.required]),
      lastname: new FormControl(this.account.lastname, [Validators.required]),
      nickname: new FormControl(this.account.nickname),
      email: new FormControl(this.account.email, [Validators.required])
    });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void { }

  onSubmit(): void {
    console.debug("submit");
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.submitted = true;

    const account: Account = this.form.value;
    console.log(account)
    this.accountService.update(account)
      //.pipe(first())
      .subscribe({
        next: (account: Account) => {
          console.debug(PersonalInfoEditComponent.name, account);
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
/*
    if (this.photo.getValue.length > 0) {
      const fd = new FormData();
      const photo = this.photo.getValue();
      fd.append(photo.type, photo, photo.name);
      this.accountService.updatePhoto(this.photo)
        //.pipe(first())
        .subscribe({
          next: (account: Account) => {
            console.debug(PersonalInfoEditComponent.name, account);
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

    }*/
  }
  
  processFile(imageInput: any) {
    const file: File = imageInput.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.accountService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
        
        },
        (err) => {
        
        })
    });

    reader.readAsDataURL(file);
  }

  goBack(): void {
    // redirect to home page
    this.router.navigateByUrl(environment.PAGE_HOME);
  }

  onFileSelected(file: any) {
    console.log(file);
    try {
      this.photo.next(file.target.files[0]);
    } catch (e) {
      console.log(e);
    }

  }
}


class ImageSnippet {
  constructor(public src: string, public file: File) {}
}