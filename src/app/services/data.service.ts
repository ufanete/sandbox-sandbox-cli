import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { handleError, getHeader } from '@app/helpers/http.util';
import { User, Post } from '@app/models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  
  /**
   * NB: For any of the HTTP methods that return an observable, 
   * the caller, Component.update() must subscribe()
   */

  constructor(private http: HttpClient) {}

  /** Posts */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.API_URL_POST).pipe(
      catchError(handleError)
    );
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(environment.API_URL_POST, post, getHeader(null)).pipe(
      catchError(handleError)
    );
  }

  /** 
   * Users 
   * 
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.API_URL_USER).pipe(
      catchError(handleError)
    );
  }

  doUserSearch(value: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.API_URL_USER}/search/${value}`).pipe(
      catchError(handleError)
    );
  }
  
  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${environment.API_URL_USER}/${userId}`).pipe(
      catchError(handleError)
    );
  }
  
  /**
   * Chat history
   * @returns 
   */
  getMessages(): Observable<any[]> {
    return this.http.get<any[]>(environment.API_URL_CHAT);
  }
  

}
