import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User, Post } from '../document.schema';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  /**
   * NB: For any of the HTTP methods that return an observable, 
   * the caller, Component.update() must subscribe()
   */
  private USER_API_URL = '/api/users';
  private POST_API_URL = '/api/posts';

  constructor(private http: HttpClient) {}

  /** Error Handler */
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  /** Posts */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.POST_API_URL).pipe(
      catchError(this.handleError)
    );
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.POST_API_URL, post, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  /** Users */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.USER_API_URL).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(user: User): Observable<User> {
    const url = `${this.USER_API_URL}/${user._id}`;
    return this.http.delete<User>(url).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.USER_API_URL}/${user._id}`;
    return this.http.put<User>(url, user, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.USER_API_URL, user, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

}
