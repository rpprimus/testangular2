import { Component, NgZone, OnInit } from '@angular/core';

import { AppMessage } from '../../shared/config/app-message.enum';
import { AppStorageService } from '../../shared/services/app-storage.service';
import { AuthService } from '../../shared/services/auth.service';
import { SharedService } from '../../shared/services/shared.service';
import { Util } from '../../shared/services/util';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService, AppStorageService]
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private sharedService: SharedService,
    private appStoreService: AppStorageService, private util: Util,
    private authService: AuthService, private ngZone: NgZone
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      (<any>window).gapi.signin2.render('sparksLink-signin', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': (data) => { this.onSignIn(data); },
        'onfailure': (data) => { this.onFailure(data) }
      })
    }, 1000);
  }

  /**
   * success callback function
   * @param googleUser - google authenticated data of user
   */
  onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    let email = profile.getEmail();
    this.authorizeUser(email);
  }

  /**
   * authorization from api after google authentication
   * @param email user email id
   */
  authorizeUser(email) {
    let param = {
      userEmail: email
    }
    document.getElementById('sparksLink-signin').click();
    this.loginService.authenticateUser(param).subscribe(response => {
      if (response.responseCode == "S0001") {
        this.appStoreService.setToken(response.response.token);
        this.authService.checkLoggedIn();
      } else {
        this.ngZone.run(() => {
          this.sharedService.openToast('e', AppMessage[response.errorCode] ? AppMessage[response.errorCode] : response.errorDescription);
        });

      }
    });
  }
  /**
   * called when google authentication fail
   * @param error failure data
   */
  onFailure(error) {
    console.log('error ', error);
    console.log('Failure : User could not be verified by Google ');
    console.log(error);
    if(error.error !== "popup_closed_by_user"){  //we dont have to show the error message in case of user closed the google sign in popup
      this.sharedService.openToast('e', AppMessage.E1010);
    }
    let ua = window.navigator.userAgent;
    let msie = ua.indexOf('MSIE ') + ua.indexOf('Trident/') + ua.indexOf('Edge/');
    if (msie > 0) {
      console.log("this is microsoft browser IE or Edge");
      window.location.reload();
    }
    else {
      console.log("this is non-microsoft browser");
    }
  }

}
