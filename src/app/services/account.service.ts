import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { handleError, getHeader } from '@app/helpers/http.util';
import { Account, JwtToken } from '@app/models';
import { environment } from '@environments/environment';
import { Session } from '@app/models/session.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public ACCOUNT_TAG: string = "account";
  public account: BehaviorSubject<Account>;
  public isUserLoggedIn: BehaviorSubject<JwtToken>;

  constructor(
    private http: HttpClient
  ) {
    let fromCache = localStorage.getItem(this.ACCOUNT_TAG);
    this.account = new BehaviorSubject(JSON.parse(fromCache!));
    this.isUserLoggedIn = new BehaviorSubject(new JwtToken());

    if (fromCache == null) {
      // set dummy account
      this.setAccountValue(new Account());
    }
  }

  /** Get user in session */
  public get accountValue(): Account {
    return this.account.value;
  }

  /** store user details and jwt token in local storage 
   * to keep Account logged in between page refreshes */
  private setAccountValue(account: Account): void {
    console.debug("Set account", account);
    localStorage.setItem(this.ACCOUNT_TAG, JSON.stringify(account));
    this.account.next(account);
  }

  /** Remove user from local storage and set current user to null */
  private removeAccountValue(): void {
    localStorage.removeItem(this.ACCOUNT_TAG);
    this.account.next(new Account());
  }

  deleteUser(user: Account): Observable<Account> {
    const url = `${environment.API_URL_USER}/${user._id}`;
    return this.http.delete<Account>(url).pipe(
      catchError(handleError)
    );
  }

  update(account: Account): Observable<Account> {
    const url = `${environment.API_URL_USER}/${this.accountValue._id}`;
    return this.http.put<Account>(url, account, getHeader(this.accountValue))
      //.pipe(catchError(handleError))
      .pipe(map(account => {
        console.debug("Update ->", account);
        this.setAccountValue(account);
        return account;
      }));
  }

  /**
   * {POST}
   * Create new User Account
   * @param account 
   * @returns 
   */
  register(account: Account): Observable<Account> {
    return this.http.post<Account>(`${environment.API_URL_ACCOUNT}/register`, account, getHeader(this.accountValue))
      //.pipe(catchError(handleError))
      .pipe(map(account => {
        console.debug("Register ->", account);
        this.setAccountValue(account);
        return account;
      }));
  }


  updatePhoto(photo: Observable<File>) {

  }


  uploadImage(file: File): Observable<Response> {
    const formData = new FormData();

    formData.append('image', file);

    console.log(formData);
    return this.http.post<any>(`${environment.API_URL_USER}/${this.accountValue._id}/photo`,
      formData, getHeader(this.accountValue))
      //.pipe(catchError(handleError))
      .pipe(map(account => {
        console.debug("Upoad Image ->", account);
        this.setAccountValue(account);
        return account;
      }));
  }


  /**
   * {POST}
   * Login to existing User Account
   * @param email 
   * @param password 
   * @returns 
   */
  public login(email: string, password: string): Observable<Object> {
    return this.http.post<Session>(`${environment.API_URL_ACCOUNT}/authenticate`,
      { email, password })
      .pipe(map(session => {
        console.dir(session);
        this.setAccountValue(session.user!);
        return session.user!;
      }));
  }

  /**
   * 
   * @returns JwtToken for the broswer session, 
   * isSignedIn is True if logged into an existing User Account
   */
  isSignedIn(): Observable<JwtToken> {
    return this.http.post<JwtToken>(`${environment.API_URL_ACCOUNT}/isSignedIn`, null, getHeader(this.accountValue))
      .pipe(
        catchError(handleError)
      ).pipe(
        map(token => {
          this.isUserLoggedIn.next(token);
          return token;
        })
      );
  }

  /**
   * SignOut from {@link User: User} Account.
   * 
   * @returns 
   */
  signout(): Observable<Object> {
    return this.http.post<Object>(`${environment.API_URL_ACCOUNT}/signout`, null, getHeader(this.accountValue))
      .pipe(
        catchError(handleError)
      ).pipe(
        map(response => {
          console.debug('logut', response);
          this.removeAccountValue();
          return response;
        })
      );
  }

  
}
