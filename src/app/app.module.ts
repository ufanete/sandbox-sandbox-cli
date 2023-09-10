import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorInterceptor, JwtInterceptor, CustomReuseStrategy } from '@app/helpers';
import {
  ChatRoomComponent, TopNavigationComponent,
  PostsComponent, PostItemComponent, UsersComponent, 
  UserItemComponent
} from '@app/components';
import { SharedModule } from '@app/shared/shared.module';
import { NavigationFooterComponent } from './components/navigation-footer/navigation-footer.component';
import { NavigationTopComponent } from './components/navigation-top/navigation-top.component';
import { ChatPrivateComponent } from './components/chat-private/chat-private.component';
import { NavigationSearchBarComponent } from './components/navigation-search-bar/navigation-search-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostItemComponent,
    TopNavigationComponent,
    ChatRoomComponent,
    UsersComponent,
    UserItemComponent,
    NavigationFooterComponent,
    NavigationTopComponent,
    ChatPrivateComponent,
    NavigationSearchBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NgbDatepickerModule,
    FontAwesomeModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
