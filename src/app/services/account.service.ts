import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError  } from 'rxjs';
import { map } from 'rxjs/operators';

import { handleError, httpOptions } from '../_helpers/http.util';
import { Account, User } from '../document.schema';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  
  constructor(
    private router: Router,
    private http: HttpClient
  ) { 
      this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      this.user = this.userSubject.asObservable(); 
  }

  public get userValue() {
    return this.userSubject.value;
  }
  
  deleteUser(user: User): Observable<User> {
    const url = `${environment.API_URL_USER}/${user._id}`;
    return this.http.delete<User>(url).pipe(
      catchError(handleError)
    );
  }

  updateUser(user: User): Observable<User> {
    const url = `${environment.API_URL_USER}/${user._id}`;
    return this.http.put<User>(url, user, httpOptions).pipe(
      catchError(handleError)
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(environment.API_URL_USER, user, httpOptions).pipe(
      catchError(handleError)
    );
  }

  login(username: string, password: string) {
    return this.http.post<User>(`${environment.API_URL_ACCOUNT}/authenticate`, { username, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));
  }

  logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('user');
      this.userSubject.next(null);
      this.router.navigate(['/account/login']);
  }
}
