import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from '@app/account/account-routing.module';
import { AccountComponent } from '@app/account/account.component';
import { LoginComponent } from '@app/account/login/login.component';
import { AddAccountComponent } from '@app/account/add-account/add-account.component';
import { HomeComponent } from './home/home.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PersonalInfoEditComponent } from './personal-info-edit/personal-info-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule
    ],
    declarations: [
        AccountComponent,
        LoginComponent,
        AddAccountComponent,
        HomeComponent,
        PersonalInfoComponent,
        PersonalInfoEditComponent
    ]
})
export class AccountModule { }