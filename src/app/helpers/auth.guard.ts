import { Injectable, OnDestroy, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError, map, of } from 'rxjs';

import { AccountService } from '@app/services';
import { environment } from '@environments/environment';

export const IsSignedIn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const authService = inject(AccountService);
    const router = inject(Router);
  
    return authService.isSignedIn().pipe(
      map((jwt) => {
        return jwt.isSignedIn;
      }),
      catchError(() => {
        router.navigate([environment.PAGE_LOGIN]);
        return of(false);
      })
    );
};


export const IsSignedOut = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AccountService);
  const router = inject(Router);

  return authService.isSignedIn().pipe(
    map((jwt) => {
      return !jwt.isSignedIn;
    }),
    catchError(() => {
      // allow navigation
      return of(true);
    })
  );
};