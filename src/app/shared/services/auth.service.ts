import { Injectable, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppUrl } from '../config/app-url.enum';
import { HttpClientService } from './http-client.service';
import { Util } from './util';
import { CookieService } from 'ngx-cookie-service';
import { Common } from '../../store/utility/common';
import { Enum } from '../config/enum.enum';
@Injectable()
export class AuthService {
  //static Enum: any;

  constructor(private router: Router, private util: Util, private ngZone: NgZone, private httpClient: HttpClientService,
    private cookieService: CookieService, private common: Common) { }

  /**
   * Check User is already logged In or not
   * If User is logged in then get user info else rediect to Login screen
   */
  checkLoggedIn() {
    let testEnv = ['qa', 'dev', 'uat'];
    let url: any = location.host;
    if (url.includes('www.')) {
      url = url.replace('www.', '');
    }
    var isTestEnv: boolean = false;
    for (let i = 0; i < testEnv.length; i++) {
      if (url.indexOf(testEnv[i]) > -1) {
        isTestEnv = true;
        break;
      }
    }

    let lenthCount = isTestEnv ? 4 : 3;
    let arr = url.split('.');
    let len = arr.length;
    //  If length is 4 it means 0 part is client
    let store = this.getRequestedParamter(location.href, 'store') || false; // TEMP : this is for Local testing only
    let client = this.getRequestedParamter(location.href, 'client') || false; // TEMP : this is for Local testing only
    let goToStoreToken = this.getRequestedParamter(location.href, 'token') || ''; // Check that coming from go to store button clicked 
    let clientSubDomain = this.getRequestedParamter(location.href, 'clientSubDomain') // for signup varification
    let isImported = this.getRequestedParamter(location.href,'isImported');  //url contains isImported: true for imported store user, redirected through email
    //To open store in local change the below line to
    //if(store || client || clientSubDomain || 4 === 4){   //enable store for local development
     if (store || client || clientSubDomain || len === lenthCount) {
      this.util.isStore = true;
      this.util.isLandingPage.next(false);
      // If user is already logged In
      if (this.cookieService.check('storeAccessToken')) {
        this.common.isStoreloggedIn.next(true);
      }
      this.common.storeClientInfo.id = this.cookieService.get('storeClientId');
      if (this.cookieService.get('storeClientInfo') != '') {
        this.common.storeClientInfo = JSON.parse(this.cookieService.get('storeClientInfo'));
      }
      if (!clientSubDomain) { // for authstore URl we don't need to call check domain

        if (goToStoreToken) {
          this.common.isGoToStore = true;
          // set store login access Token
          this.cookieService.set('storeAccessToken', goToStoreToken);
          this.common.isStoreloggedIn.next(true);
          this.common.checkDomain();
        } else {
          this.common.alreadyLoggedIn();
        }
      }
      //if user is imported through excel sheet, directly route him to reset password page
      else if(isImported=="true"){ //isImported is in string format from queryParams
        this.router.navigate(['verification/:id'],{ skipLocationChange: true });
      }
    }

    else if (localStorage.getItem('isLoggedIn')) {
      if (location.pathname == '/') {
        this.util.isLandingPage.next(true);
        this.router.navigate(['/']);
      } else {
        this.util.isLandingPage.next(false);
        this.util.accessToken = localStorage.getItem('accessToken');
        this.getUserInfo();
      }

    }
    else if (location.pathname == "/admin") {
      localStorage.clear();
      this.util.isLandingPage.next(true);
      this.router.navigate(['/admin']);
    }
    else {
      if (location.pathname == '/' && this.util.isStore) {
        this.common.alreadyLoggedIn();
      } else {
        localStorage.clear();
        // this.router.navigate(['/admin']);
        this.router.navigate(['/']);
      }
    }
  }

  //This is done using regex because UrlSearchParam is not working in IE, Safari and Samsung S8 
  getRequestedParamter(url: string, key): any {
    let value = '';
    let queryString = url.split('?')[1]
    if (!queryString) {
      queryString = url
    }
    if (queryString) {
      let keyValuePairs = queryString.split('&')
      for (let i = 0; i < keyValuePairs.length; i++) {
        let keyValuePair = keyValuePairs[i].split('=')
        let paramName = keyValuePair[0];
        let paramValue = keyValuePair[1] || '';
        if (paramName == key) {
          value = decodeURIComponent(paramValue.replace(/\+/g, ' '));
          break;
        }

      }
    }
    return value ? value : false;

  }

  /**
   * After successful Login - get user info & set into util.userInfo object
   * If User Logged In then route to path URL
   * If he try to go on Login screen then route to dashboard page
   * If not logged In , then route to Login page
   */
  getUserInfo() {
    this.httpClient.get(AppUrl.getUserInfo).subscribe(response => {
      if (response.response) {
        this.util.isLoggedIn.next(true);
        this.util.userInfo.next(response.response.userInfo);
        response.response.userInfo.roles.push(Enum.Store_Admin); //this is added for store user mgmt which should be visible to store admin
        localStorage.setItem('user', JSON.stringify(response.response.userInfo));
        this.ngZone.run(() => {
          if (location.pathname.toLowerCase() == '/admin') {
            this.ngZone.run(() => {
              this.router.navigate(['/dashboard']); // TODO redirect to dashboard page
            })
          }
        })
      } else {
        this.router.navigate(['/admin']);
        localStorage.clear();
      }
    });
  }


  /**
   * Pass arrays of role Codes : If role exists it will return true
   */
  isRoleExists(codes: any): boolean {
    let exists: boolean = false;
    //let user: any = this.util.userInfo.getValue();
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user || this.isEmpty(user)) {
      // Object is empty (Would return true in this example)
      user = {};
      user.roles = [Enum.CreditCard_Admin, Enum.ADMIN, Enum.MANAGER, Enum.TEAM, Enum.Store_Admin];
    }
    user.roles.some((element: any) => {
      if (codes.indexOf(element) > -1) { // check role exists
        return exists = true;
      }
    });

    return exists;
  }

  // log out user functionality
  logOut() {
    this.httpClient.delete(AppUrl.logout).subscribe(response => {
      if (response.responseCode == 'S0001' || response.errorCode == 'E1009' || response.errorCode == 'E1007' ) {
        this.sessionExpired();
      }
    },
      error => { console.log(error) });
  }

  //check for empty object
  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  /**
   * Google sign out only from the application not from all google accounts
   */
  sessionExpired() {
    if (this.util.isStore && !this.common.isGoToStore) {
      this.storeLogOut();
    } else {
      this.adminLogOut();
    }
  }

  // Store user login with their own credential so simply clear data for storage
  storeLogOut() {
    this.cookieService.deleteAll();
    this.util.isStore = false;
    localStorage.clear();
    window.location.href = '/store-login';
    this.common.isStoreloggedIn.next(false);
  }

  // Admin login with his Gmail so we have to logout with gmail aswell.
  adminLogOut() {
    localStorage.clear();
    (<any>window).gapi.load('auth2', () => {
      (<any>window).gapi.auth2.init().then(() => {
        var auth2 = (<any>window).gapi.auth2.getAuthInstance();
        auth2.signOut().then((res) => {
          this.util.isLoggedIn.next(false);
          window.location.href = '/admin';
        })
          .catch((err) => { console.log('error is ', err); });
      }, () => {    //if admin user logs out then its Go to store client will also be log out so it will come in the callback function because google auth will not initialize
        this.storeLogOut();
      });
    });
  }
}


