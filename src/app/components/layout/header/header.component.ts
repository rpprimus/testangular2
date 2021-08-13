import { Component, OnInit } from '@angular/core';
import { Util } from '../../../shared/services/util';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Common } from '../../../store/utility/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name : string = "";
  firstChar : string  = "";
  defaultLogoUrl = "../assets/images/logo.png";
  constructor(private util : Util, private auth : AuthService,private router: Router,public _domSanitizationService: DomSanitizer,public common : Common) { }

  ngOnInit() {
    this.util.userInfo.subscribe(response => {
          if(response.name) {
            this.name = response.name;
            this.firstChar = this.name.charAt(0).toUpperCase();
          }
    });
  }

  //log out user from application
  logOut(){
    this.auth.logOut();
  }


  feedback(){
    window.open(this.util.feedbackLink.getValue(), "_blank"); 
  }
  onLogoClick(){
    this.router.navigate(['dashboard']);
  }


}
