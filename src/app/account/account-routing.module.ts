import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsSignedIn, IsSignedOut } from '@app/helpers';
import { LoginComponent, AddAccountComponent, HomeComponent, PersonalInfoComponent, PersonalInfoEditComponent } from '@app/account';

const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [IsSignedOut] },
    { path: 'register', component: AddAccountComponent, canActivate: [IsSignedOut] },

    { path: 'home', component: HomeComponent, canActivate: [IsSignedIn] },
    { path: 'personal-info', component: PersonalInfoComponent, canActivate: [IsSignedIn] },
    { path: 'personal-info-edit', component: PersonalInfoEditComponent, canActivate: [IsSignedIn] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }