import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsComponent } from './components/posts/posts.component';
import { AddAccountComponent } from './account/add-account/add-account.component';
import { LoginComponent } from './account/login/login.component';

import { AuthGuard } from '@app/_helpers';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';

const accountModule = () => import('@app/account/account.module').then(x => x.AccountModule);
//const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const routes: Routes = [
  { path: 'signup', component: AddAccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatRoomComponent },
  { path: 'account', loadChildren: accountModule },
  { path: '', component: PostsComponent},//, canActivate: [AuthGuard]  },
  
  // otherwise redirect to home
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: true, onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
