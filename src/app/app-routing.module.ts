import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsComponent } from './components/posts/posts.component';
import { AddAccountComponent } from './account/add-account/add-account.component';
import { LoginComponent } from './account/login/login.component';

import { AuthGuard } from '@app/_helpers';

const accountModule = () => import('@app/account/account.module').then(x => x.AccountModule);
//const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'signup', component: AddAccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', loadChildren: accountModule },
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
