import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from '@app/account/account.component';
import { LoginComponent } from '@app/account/login/login.component';
import { AddAccountComponent } from '@app/account/add-account/add-account.component';

const routes: Routes = [
    {
        path: '', component: AccountComponent,
        children: [
            { path: 'login', component: LoginComponent },
            //{ path: 'logout', component: LoginComponent },
            { path: 'register', component: AddAccountComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }