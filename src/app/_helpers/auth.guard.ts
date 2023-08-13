import { Injectable, OnDestroy, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '@app/services';
import { catchError, map, of } from 'rxjs';

export const canActivate = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const authService = inject(AccountService);
    const router = inject(Router);
  
    return authService.isLoggedIn().pipe(
      map(() => true),
      catchError(() => {
        router.navigate(['/account/login']);
        return of(false);
      })
    );
};