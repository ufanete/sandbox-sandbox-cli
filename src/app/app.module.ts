import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { TopNavigationComponent } from './components/top-navigation/top-navigation.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    PostsComponent,
    PostItemComponent,
    TopNavigationComponent,
    ChatRoomComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NgbDatepickerModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
