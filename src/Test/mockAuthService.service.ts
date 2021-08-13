import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';

import { of, Observable, throwError } from 'rxjs';

@Injectable()
export class mockAuthService {

  constructor() { }
  getRequestedParamter(param :any, k:any): any {
    let key = 'v';
    let url = 'http://sparkslinkdev.compunnel.com/authstore?v=1&clientSubDomain=amazonuat';
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
  isRoleExists(codes: any) {
    if(codes=="WORKSTAION_ADMIN"){
      return throwError(new Error('Fake error'));
    }
    else{
    return of(true);
    }
  }

  logOut(){
    return true;
  }

  checkLoggedIn(){
    return true;
  }

  sessionExpired(){
    return true;
  }

}
