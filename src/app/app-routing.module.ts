import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IsSignedIn } from '@app/helpers';
import { PostsComponent, ChatRoomComponent, UsersComponent, ChatPrivateComponent } from '@app/components';

const accountModule = () => import('@app/account/account.module').then(x => x.AccountModule);
//const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const routes: Routes = [
  { path: 'chat', component: ChatRoomComponent, canActivate: [IsSignedIn] },
  { path: 'chat-private', component: ChatPrivateComponent, canActivate: [IsSignedIn] },
  { path: 'users', component: UsersComponent, canActivate: [IsSignedIn] },
  { path: 'account', loadChildren: accountModule  },
  { path: '', component: PostsComponent},
  
  // otherwise redirect to home
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: true, onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
