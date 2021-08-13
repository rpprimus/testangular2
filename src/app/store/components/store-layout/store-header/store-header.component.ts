import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Common } from '../../../utility/common';
import { StoreService } from '../../../service/store.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Util } from '../../../../shared/services/util';

@Component({
  selector: 'app-store-header',
  templateUrl: './store-header.component.html',
  styleUrls: ['./store-header.component.scss']
})
export class StoreHeaderComponent implements OnInit {

  firstChar: string = "";
  name: string = '';

  constructor(private util : Util, private router: Router, public common: Common, private service: StoreService, 
    private authService: AuthService, public _domSanitizationService: DomSanitizer) { }


  ngOnInit() {
    this.service.getUserInfo().subscribe(response => {
      if (response.responseCode == 'S0001') {
        this.common.storeUserInfo.next(response.response.userInfo); // set store user info
        
      } else if (response.errorCode == 'E1009' || response.errorCode == 'E1018' || response.errorCode == 'E1007') {
        this.authService.sessionExpired();
      }
     
    });

    this.common.storeUserInfo.subscribe(response => {
        if (response.name) {
          this.name = response.name;
          this.firstChar = this.name.charAt(0).toUpperCase();
        }
    });
  }

  logout() {
    this.authService.logOut();
    // this.cookieService.deleteAll();
    // localStorage.clear();
    // this.router.navigate(['store-login']);
    // this.common.isStoreloggedIn.next(false);
  }


  // feedback(){
  //   window.open(this.util.feedbackLink.getValue(), "_blank");
  // }
  onLogoClick(){
    this.router.navigate(['store-dashboard']);
  }

}
