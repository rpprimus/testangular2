import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { Util } from './../../../shared/services/util';
import { AppMessage } from './../../../shared/config/app-message.enum';
import { AppUrl } from './../../../shared/config/app-url.enum';
import { SharedService } from './../../../shared/services/shared.service';

@Component({
  selector: 'app-two-factor-auth',
  templateUrl: './two-factor-auth.component.html',
  styleUrls: ['./two-factor-auth.component.scss']
})
export class TwoFactorAuthComponent {

  @ViewChild('twoFacAuth') twoFacAuth;
  twoFacAuthKey: string = '';
  appMessage = AppMessage;
  invalidOTPerror: boolean = false;
  resendCount: number = 1;

  constructor(public dialogRef: MatDialogRef<TwoFactorAuthComponent>, private httpClient: HttpClient,
    private util: Util, private sharedService: SharedService,
    private cookieService: CookieService, @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;   //to disable click outside of angular material dialog area to close the dialog
  }

  validateOtp() {
    this.invalidOTPerror = false;
    let url = AppUrl.otpCheck + "?twoFacAuthKey=" + this.twoFacAuthKey;
    this.setRequest(url).subscribe(response => {
      if (response['response']) {
        this.dialogRef.close(true);
      } else {
        this.invalidOTPerror = true;
      }
    }, error => { this.sharedService.onError(error) });
  }

  resendOtp() {
    if (this.resendCount <= 3) {
      let url = AppUrl.resendOtp + "?clientId=" + this.cookieService.get('storeClientId');
      this.setRequest(url).subscribe(response => {
        if (response['response']) {
          this.resendCount++;
          this.sharedService.openToast('s', AppMessage.U0195);
        }
      }, error => { this.sharedService.onError(error) });
    }
  }

  setRequest(url) {
    let request = this.httpClient.get(this.util.baseUrl.getValue() + url, { headers: new HttpHeaders({ 'Accept': 'application/json', 'X-Auth-Token': this.data }) })
    return request;
  }

}
