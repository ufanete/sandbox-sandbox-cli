import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AccountRoutingModule } from '@app/account/account-routing.module';
import { AccountComponent } from '@app/account/account.component';
import {
    LoginComponent, AddAccountComponent,
    HomeComponent, PersonalInfoComponent,
    PersonalInfoEditComponent
} from '@app/account';
import { AccountFormComponent } from './account-form/account-form.component';
import { AccountFormFieldComponent } from './account-form-field/account-form-field.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule,
        FontAwesomeModule
    ],
    declarations: [
        AccountComponent,
        LoginComponent,
        AddAccountComponent,
        HomeComponent,
        PersonalInfoComponent,
        PersonalInfoEditComponent,
        AccountFormComponent,
        AccountFormFieldComponent,
    ]
})
export class AccountModule { }