import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, firstValueFrom  } from 'rxjs';
import { map } from 'rxjs/operators';

import { handleError, getHeader } from '../_helpers/http.util';
import { Account, AccountObject, JwtTokenObject, JwtToken } from '../document.schema';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public ACCOUNT_TAG: string = "account";
  private accountSubject: BehaviorSubject<Account>;
  public account: Observable<Account | null>;
  public isUserLoggedIn: BehaviorSubject<JwtToken>;
  
  constructor(
    private router: Router,
    private http: HttpClient
  ) { 
      let fromCache = localStorage.getItem(this.ACCOUNT_TAG);
      this.accountSubject = new BehaviorSubject(JSON.parse(fromCache!));
      this.account = this.accountSubject.asObservable();
      this.isUserLoggedIn = new BehaviorSubject(new JwtTokenObject());

      if (fromCache == null) {
        // set dummy account
        this.setAccountValue(new AccountObject());
      }
  }

  /** Get user in session */
  public get userValue(): Account {
    return this.accountSubject.value;
  }

  /** store user details and jwt token in local storage 
   * to keep Account logged in between page refreshes */
  private setAccountValue(account: Account): void {
    console.debug("Set account", account);
    localStorage.setItem(this.ACCOUNT_TAG, JSON.stringify(account));
    this.accountSubject.next(account);
  }

  /** Remove user from local storage and set current user to null */
  private removeAccountValue(): void {
    localStorage.removeItem(this.ACCOUNT_TAG);
    this.accountSubject.next(new AccountObject());
  }
  
  deleteUser(user: Account): Observable<Account> {
    const url = `${environment.API_URL_USER}/${user._id}`;
    return this.http.delete<Account>(url).pipe(
      catchError(handleError)
    );
  }

  updateUser(user: Account): Observable<Account> {
    const url = `${environment.API_URL_USER}/${user._id}`;
    return this.http.put<Account>(url, user, getHeader(this.userValue)).pipe(
      catchError(handleError)
    );
  }

  register(account: Account): Observable<Account> {
    return this.http.post<Account>(`${environment.API_URL_ACCOUNT}/register`, account, getHeader(this.userValue))
      .pipe(catchError(handleError))
      .pipe(map(account => {
          this.setAccountValue(account);
          return account;
          
      }));
  }

  login(email: string, password: string): Observable<Object> {
    return this.http.post<Account>(`${environment.API_URL_ACCOUNT}/authenticate`, 
      { email, password })
      .pipe(catchError(handleError))
      .pipe(map(account => {
        this.setAccountValue(account);
        return account;
      }));
  }

  /**
   * 
   * @returns 
   */
  isLoggedIn():  Observable<JwtToken>  {
    return this.http.post<JwtToken>(`${environment.API_URL_ACCOUNT}/isSignedIn`, null, getHeader(this.userValue))
      .pipe(catchError(handleError))
      .pipe(map(token => {
        this.isUserLoggedIn.next(token);
        return token;
      }));
  }

  /**
   * Logout from user account.
   * 
   * @returns 
   */
  logout(): Observable<Object> {
    return this.http.get<Object>(`${environment.API_URL_ACCOUNT}/signout`)
      .pipe(
        catchError(handleError)
      ).pipe(map(response => {
        console.debug("logout - response -> ", response);
        this.removeAccountValue();
        this.router.navigate([environment.URL_LOGIN]);
        return response;
      }));
  }
}
