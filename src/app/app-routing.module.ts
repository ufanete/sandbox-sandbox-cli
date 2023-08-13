import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsComponent } from './components/posts/posts.component';
import { isSignedIn, isSignedOut } from '@app/_helpers';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

const accountModule = () => import('@app/account/account.module').then(x => x.AccountModule);
//const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const routes: Routes = [
  //{ path: 'signup', redirectTo: 'account/register'},//component: AddAccountComponent},
  { path: 'profile', component: EditProfileComponent, canActivate: [isSignedIn] },
  { path: 'chat', component: ChatRoomComponent, canActivate: [isSignedIn] },
  { path: 'account', loadChildren: accountModule, canActivate: [isSignedOut]  },
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
