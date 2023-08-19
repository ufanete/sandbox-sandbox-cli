import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormField } from '@app/models/form-field.model';


@Component({
  selector: 'app-account-form-field',
  templateUrl: './account-form-field.component.html',
  styleUrls: ['./account-form-field.component.css']
})
export class AccountFormFieldComponent {

  @Input() question!: FormField<string>;
  @Input() form!: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }
}
