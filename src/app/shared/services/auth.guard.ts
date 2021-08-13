import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Util } from './util';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public util: Util, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   let loggedIn = localStorage.getItem('isLoggedIn');
    let isStore = this.util.isStore;
    if (isStore) {
      this.router.navigate(['store-dashboard']);
      return false;
    } else if (loggedIn) {
      return true;
    }else {
      return true;
    }

  }
}
