import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AccountRoutingModule } from '@app/account/account-routing.module';
import { AccountComponent } from '@app/account/account.component';
import {
    LoginComponent, AddAccountComponent,
    HomeComponent, PersonalInfoComponent,
    PersonalInfoEditComponent, AccountFormComponent, AccountFormFieldComponent
} from '@app/account';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule,
        FontAwesomeModule,
        SharedModule,
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