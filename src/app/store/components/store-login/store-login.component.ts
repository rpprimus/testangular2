import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { MyErrorStateMatcher } from '../../../core/error-state-matcher';
import { AppConstant } from '../../../shared/config/app-constant';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { AppUrl } from '../../../shared/config/app-url.enum';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { SharedService } from '../../../shared/services/shared.service';
import { Util } from '../../../shared/services/util';
import { Common } from '../../utility/common';
import { ContactEmailPopupComponent } from './contact-email-popup/contact-email-popup.component';
import { MatDialog } from '@angular/material';
import { TwoFactorAuthComponent } from '../two-factor-auth/two-factor-auth.component';

@Component({
  selector: 'app-store-login',
  templateUrl: './store-login.component.html',
  styleUrls: ['./store-login.component.scss']
})
export class StoreLoginComponent implements OnInit {

  storeLoginForm: FormGroup;
  appMessage = AppMessage;
  matcher = new MyErrorStateMatcher();
  isFormSubmitted: boolean = false;
  accManager: any;


  constructor(private http: HttpClientService, private sharedService: SharedService, private dialog: MatDialog, private cookieService: CookieService,
    public _domSanitizationService: DomSanitizer,
    private router: Router, public util: Util, public common: Common) { }

  ngOnInit() {

    this.storeLoginForm = new FormGroup({
      userEmail: new FormControl('', [Validators.required, Validators.pattern(AppConstant.emailRegex)]),
      userCredential: new FormControl('', [Validators.required])
    });
  }

  onKeyPress($event) {
    //Enter button 
    if ($event.keyCode == 13) {
      this.loginUser();
    }

  }

  //After successful logging in of store user
  loginUser() {
    if (!this.isFormSubmitted) {
      // stop here if form is invalid
      if (this.storeLoginForm.invalid) {
        // mark form all field touched in case user click on save button
        this.util.markFormGroupTouched(this.storeLoginForm);
        return;
      }
      this.isFormSubmitted = true;
      let formValue = this.storeLoginForm.value;
      formValue.clientId = this.cookieService.get('storeClientId');
      this.http.post(AppUrl.storeLogin, this.storeLoginForm.value).subscribe(response => {
        this.isFormSubmitted = false;
        this.sharedService.onSuccess(response, null, (value) => {
          if (value) {
            // set store login access Token
            if(this.common.storeClientInfo && this.common.storeClientInfo.twoFactor){
              this.showOtpPopUp(response);
            }else{
              this.login(response);
            }
          }
        });
      }, error => { this.sharedService.onError(error) });
    }
  }

  login(response) {
    this.common.displayWelcomeMessage = true;
    this.cookieService.set('storeAccessToken', response.response.token);
    //if user is imported, route him to reset password page
    //if user is imported, no need to login him before he has reset his password, that is why, isStoreloggedIn will remain false
    if (response.response.isImported) {
      this.common.importedStoreUserInfo.next(response.response);
      this.common.importedStoreUserInfo.email = this.storeLoginForm.get('userEmail');
      this.router.navigate(['verification']);
    }
    else {
      this.common.isStoreloggedIn.next(true);
      this.router.navigate(['/store-dashboard']);
    }
  }

  showOtpPopUp(response) {
    this.dialog.open(TwoFactorAuthComponent, {
      data: response.response.token
    }).afterClosed().subscribe(result => {
      if (result) {
        this.login(response);
      }
    });
  }

  contactEmailPopup() {
    this.dialog.open(ContactEmailPopupComponent, {});
  }


}
