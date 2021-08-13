import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../service/store.service';
import { SharedService } from '../../../shared/services/shared.service';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { Util } from '../../../shared/services/util';
import { MyErrorStateMatcher } from '../../../core/error-state-matcher';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppConstant } from '../../../shared/config/app-constant';
import { DomSanitizer } from '@angular/platform-browser';
import { Common } from '../../utility/common';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  isResetPassword: boolean = false;
  key: string = "";
  appMessage = AppMessage;
  matcher = new MyErrorStateMatcher();
  isFormSubmitted: boolean = false;
  email = new FormControl('', [Validators.required, Validators.pattern(AppConstant.emailRegex)]);
  v: any;
  clientId: string = "";

  constructor(private storeService: StoreService, private sharedService: SharedService, private activatedRoute: ActivatedRoute,
    private router: Router, public _domSanitizationService: DomSanitizer, public common: Common, public util: Util, private authService: AuthService) { }

  ngOnInit() {
    this.v = this.authService.getRequestedParamter(location.href, 'v');
    let message = '';
    let snap = this.activatedRoute.snapshot;
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.pattern(AppConstant.passwordRegex)]),
      confirmPassword: new FormControl('', [Validators.required])
    });
    if (this.v && Number(this.v) != 1) {                          //value of v=1 only when password is not been reset else show link expired and redirect to store login page.
      message = AppMessage.U0088;
      this.sharedService.openDialog('s', message, () => {
        location.href = `http://${location.host}/store-login`;
      });
    }
    else if (snap.routeConfig.path == 'resetpassword/:id') {
      this.isResetPassword = true;
      this.key = snap.params['id'] ? snap.params['id'] : 0;
      this.clientId = snap.queryParams['clientId'];
      this.email.setValue(snap.queryParams['userEmail']);
    }
    //When imported user gets an account verification mail, route him to reset password page, setting following params 
    else if (snap.routeConfig.path == 'verification/:id') {
      this.isResetPassword = true;
      this.key = this.authService.getRequestedParamter(location.href, 'secretKey')
      this.clientId = this.authService.getRequestedParamter(location.href, 'clientId')
      this.email.setValue(this.authService.getRequestedParamter(location.href, 'userEmail'));
    }
    //When imported user is activated by internal user, set the params as following, while directing him to reset password page
    else if (snap.routeConfig.path == 'verification') {
      this.isResetPassword = true;
      this.key = this.common.importedStoreUserInfo.value.secretKey;
      this.clientId = this.common.storeClientInfo.id;
      this.email.setValue(this.common.importedStoreUserInfo.email);
    }

  }


  resetPasswordRequest() {
    if (this.email.value.trim() != "") {
      let param = {
        userEmail: this.email.value.trim(),
        clientId: this.common.storeClientInfo.id
      }
      this.storeService.passwordResetRequest(param).subscribe(response => {
        this.sharedService.onSuccess(response, null, (value) => {
          if (value) {
            this.sharedService.openDialog('s', AppMessage.U0075, () => {
              this.router.navigate(['/store-login']);
            });
          }
        });
      });
    }
    else {
      this.email.markAsDirty();
    }
  }

  resetPassword() {
    if (!this.isFormSubmitted) {
      // stop here if form is invalid
      if (this.resetPasswordForm.invalid) {
        // mark form all field touched in case user click on save button
        this.util.markFormGroupTouched(this.resetPasswordForm);
        return;
      }
      let param = {
        password: this.resetPasswordForm.get('password').value,
        repeatPassword: this.resetPasswordForm.get('confirmPassword').value,
        secrectKey: this.key,
        userEmail: this.email.value.trim(),
        clientId: this.clientId
      }
      this.isFormSubmitted = true;
      this.storeService.resetPassword(param).subscribe(response => {
        this.isFormSubmitted = false;
        let isImported = this.authService.getRequestedParamter(location.href, 'isImported');
        this.sharedService.onSuccess(response, 'U0078', (value) => {
          if (value || response.errorCode == 'E1106') { // If it return success then move to store-login page OR if reset link expired then also move to store-login
            if (isImported=="true") {
              let url: any = location.host;
              let clientSubDomain = this.authService.getRequestedParamter(location.href, 'clientSubDomain')
              if (url.includes('www.')) {
                url = url.replace('www.', '');
              }
              if (clientSubDomain != "null") {
                location.href = `http://${clientSubDomain}.${url}/store-login`;
              }
            }
            else {
              this.router.navigate(['/store-login']);
            }
          }
        });

      });
    }
  }

}
