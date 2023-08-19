import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormField } from '@app/models/form-field.model';
import { UiFormService } from '@app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {

  @Input() questions: FormField<string>[] = [];
  @Input() submitButtonValue: string = "Submit";
  @Input() loading: boolean = false;
  @Output() onSubmitForm: EventEmitter<FormGroup> = new EventEmitter();
  form!: FormGroup;
  payLoad = '';

  constructor(private qcs: UiFormService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as FormField<string>[]);
  }

   onSubmit() {
    return this.onSubmitForm.emit(this.form);
    //this.payLoad = JSON.stringify(this.form.getRawValue());
   }
}
