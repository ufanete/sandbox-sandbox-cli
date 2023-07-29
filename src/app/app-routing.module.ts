import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsComponent } from './components/posts/posts.component';
import { AddUserComponent } from './components/add-user/add-user.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'signup', component: AddUserComponent },
  { path: 'login', component: AddUserComponent },
  { path: '**', redirectTo: '', component: PostsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
