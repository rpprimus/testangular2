import { Injectable } from '@angular/core';

@Injectable()
export class AppStorageService {

  constructor() { }

  setToken(token: string) {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('isLoggedIn', 'true');
  }

}
