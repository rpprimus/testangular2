import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { LoaderService } from './core/loader-interceptor';
import { AuthService } from './shared/services/auth.service';
import { Util } from './shared/services/util';
import { Common } from './store/utility/common';
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush, // Using this just to avoid the expression changed error. Please use this if required.
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('drawer') drawer: any;
  status: boolean = false;
  backgroundOverlay: boolean = false;
  navigationSubscription: Subscription;

  clickEvent($event: any) {
    if ($event.target.id == 'menubtn') {
      this.status = !this.status;
    } else if (this.status) {
      this.status = false;
    }
  }

  isLoggedIn: boolean = false;
  isStoreLoggedIn: boolean = false;
  isLandingPage:boolean = false;

  constructor(public loaderService: LoaderService, private authService: AuthService, public util: Util, private router: Router, private common
    : Common) { }

  ngOnInit() {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {       //this is done to refresh the page on browser back if url is changed
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationStart) {
        if (window.performance && window.performance.navigation.type == 2) {
          window.location.reload();
        }
      }
    });
    this.authService.checkLoggedIn();

    // it will happen when store Login button click
    this.common.isStoreloggedIn.subscribe(value => {
      this.isStoreLoggedIn = value;
    });

    this.util.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
    });

    this.util.backgroundOverlay.subscribe(value => {
      this.backgroundOverlay = value;
    });

    this.util.isLandingPage.subscribe(value => {
      this.isLandingPage = value;
    });

    //change the logo of the selected client
    if (localStorage.getItem('selectedClientId') != "null" && localStorage.getItem('selectedClientId') != undefined) {
      let selectedValue = JSON.parse(localStorage.getItem('selectedClientId'));
      this.common.getLogo(selectedValue);
    }
  }


  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }

}


