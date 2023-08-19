import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


import { FormField } from '@app/models';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiFormService {

  constructor() { }

  toFormGroup(questions: FormField<string>[]) {
    const group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
  private ordered(questions: FormField<string>[]) {
    return of(questions.sort((a, b) => a.order - b.order))
  }

  // TODO: get from a remote source of question metadata
  getQuestions() {

    const questions: FormField<string>[] = [

      new FormField({
        key: 'brave',
        label: 'Bravery Rating',
        controlType: 'dropdown',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' }
        ],
        order: 3
      }),

      new FormField({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1,
        controlType: 'textbox'
      })
    ];

    return this.ordered(questions);
  }


  // TODO: get from a remote source of question metadata
  getQuestionsLogin() {

    const questions: FormField<string>[] = [

      new FormField({
        key: 'email',
        label: 'Email',
        type: 'email',
        controlType: 'textbox',
        placeholder: "Your Email",
        autocomplete: "current-email",
        value: 'bill34@email.com',
        required: true,
        order: 1
      }),
      new FormField({
        key: 'password',
        label: 'Password',
        type: 'password',
        controlType: 'textbox',
        required: true,
        placeholder: "Your Password",
        autocomplete: "current-password",
        title: "Minimum 6 characters at least 1 Alphabet and 1 Number",
        pattern: "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$",
        value: 'WPd8dBAq4HrhDvS',
        order: 2
      })
    ];

    return this.ordered(questions);
  }



  // TODO: get from a remote source of question metadata
  getQuestionsRegister() {

    const questions: FormField<string>[] = [

      new FormField({
        key: 'firstname',
        type: 'firstname',
        label: 'FIRST NAME',
        controlType: 'textbox',
        placeholder: "First Name",
        autocomplete: "name",
        value: 'Joe',
        required: true,
        order: 1
      }),
      new FormField({
        key: 'lastname',
        type: 'lastname',
        label: 'LAST NAME (OPTIONAL)',
        controlType: 'textbox',
        placeholder: "Last Name",
        autocomplete: "family-name",
        title: "Last Name",
        pattern: "",
        value: 'Rogue',
        required: false,
        order: 2
      }),
      new FormField({
        key: 'email',
        label: 'EMAIL',
        type: 'email',
        controlType: 'textbox',
        placeholder: "Your Email",
        autocomplete: "current-password",
        value: 'bill34@email.com',
        required: true,
        order: 3
      }),
      new FormField({
        key: 'password',
        type: 'password',
        label: 'PASSWORD',
        controlType: 'textbox',
        placeholder: "Your Password",
        autocomplete: "current-password",
        title: "Minimum 6 characters at least 1 Alphabet and 1 Number",
        pattern: "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$",
        value: 'WPd8dBAq4HrhDvS',
        required: true,
        order: 4
      }),
      new FormField({
        key: 'password_conf',
        type: 'password',
        label: 'REPEAT PASSWORD',
        controlType: 'textbox',
        placeholder: "Your Password",
        autocomplete: "current-password",
        title: "Minimum 6 characters at least 1 Alphabet and 1 Number",
        pattern: "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$",
        value: 'WPd8dBAq4HrhDvS',
        required: true,
        order: 5
      })
    ];

    return this.ordered(questions);
  }

}


