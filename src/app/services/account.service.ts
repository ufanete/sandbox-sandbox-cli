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
  private accountSubject: BehaviorSubject<Account | null>;
  public account: Observable<Account | null>;
  
  constructor(
    private router: Router,
    private http: HttpClient
  ) { 
      this.accountSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      this.account = this.accountSubject.asObservable(); 
  }

  public get userValue() {
    return this.accountSubject.value;
  }

  private setAccountValue(account: Account): void {
    console.dir("Set account in attempt", account);
    // store user details and jwt token in local storage to keep Account logged in between page refreshes
    localStorage.setItem('account', JSON.stringify(account));
    this.accountSubject.next(account);
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

  register(account: Account): Observable<User> {
    return this.http.post<Account>(`${environment.API_URL_ACCOUNT}/register`, account, httpOptions)
      .pipe(catchError(handleError))
      .pipe(map(account => {
          this.setAccountValue(account);
          return account;
          
      }));
  }

  login(email: string, password: string) {
    return this.http.post<Account>(`${environment.API_URL_ACCOUNT}/authenticate`, 
      { email, password })
      .pipe(catchError(handleError))
      .pipe(map(account => {
        this.setAccountValue(account);
        return account;
      }));
  }

  logout() {
    
    return this.http.get<Account[]>(`${environment.API_URL_ACCOUNT}/signout`)
      .pipe(
        catchError(handleError)
      ).pipe(map(response => {
        // remove user from local storage and set current user to null
        localStorage.removeItem('account');
        this.accountSubject.next(null);
        this.router.navigate(['/account/login']);
      }));

  }
}
