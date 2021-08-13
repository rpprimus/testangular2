import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { SharedService } from '../../../shared/services/shared.service';
import { StoreService } from '../../service/store.service';
import { Common } from '../../utility/common';
import { Router } from '@angular/router';
import { Enum } from '../../../shared/config/enum.enum';
import { AuthService } from '../../../shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { WelcomeComponent } from '../welcome/welcome.component';
import { AppMessage } from './../../../shared/config/app-message.enum';

@Component({
  selector: 'app-store-dashboard',
  templateUrl: './store-dashboard.component.html',
  styleUrls: ['./store-dashboard.component.scss']
})


export class StoreDashboardComponent implements OnInit {

  displayedColumns: string[] = ['OrderID', 'OrderDate', 'ArrivalDate', 'RequestedBy', 'EventName', 'Status'];
  dataSource = new MatTableDataSource();
  noRecords: boolean = false;
  totalRecords: number = 0;
  isStoreAdmin: boolean = false;
  isViewStore: boolean = false;
  newOrder: boolean = false;
  isViewReport: boolean = false;

  constructor(private sharedService: SharedService, private storeService: StoreService, private dialog: MatDialog,
    private auth: AuthService, public common: Common, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    //to check whether logged in user has role of an admin then only show the user management tab
    this.common.storeUserInfo.subscribe(response => {
      //this check is implemented because storeUserInfo is fetching data before storeClientInfo causing store dashboard with blank list
      this.common.userEventEnabled.subscribe(resp => {
        if (this.common.storeClientInfo && response.id) {
          this.isViewStore = this.common.isViewStore() ? true : false;
          if (response.roles) {
            // Workshop team user added for User Management functionality.
            this.isStoreAdmin = this.common.isStoreUserRoleExists([Enum.CreditCard_Admin, Enum.ADMIN, Enum.MANAGER, Enum.Store_Admin, Enum.TEAM]);
          }
          if (this.common.storeClientInfo.reportSetting) {  //if all the reports are disabled then hide the View Report section
            for (let key in this.common.storeClientInfo.reportSetting) {
              if (this.common.storeClientInfo.reportSetting[key]) {
                this.isViewReport = true;
                break;
              }
            }
          }
          this.checkForWelcomeMessage();
          this.getCart();
          this.getRecentOrderList();
        }
      });
    });
  }

  /**
   * Display the welcome message to store user on successful login if there is any welcome message
   * Since, we need to display the message only once, so set the displayWelcomeMessage flag to false
   */
  checkForWelcomeMessage() {
    if (this.common.storeClientInfo.welcome && this.common.displayWelcomeMessage) {
      this.common.displayWelcomeMessage = false;
      this.dialog.open(WelcomeComponent, {
        data: {
          title: this.common.storeClientInfo.welcomeTitle,
          description: this.common.storeClientInfo.welcomeTxt
        }
      });
    }
  }

  getCart() {
    //if event is enabled and cart is maintained the store event values in localstorage else remove it from them
    this.common.getCartJson((value) => {
      if (!value) {
        this.newOrder = false;
        if (this.common.storeClientInfo.isEventEnable && this.common.placeOrderObj.eventDetails.start) {
          localStorage.setItem('eventStartDate', this.common.placeOrderObj.eventDetails.start);
          localStorage.setItem('eventEndDate', this.common.placeOrderObj.eventDetails.end);
          localStorage.setItem('eventName', this.common.placeOrderObj.eventDetails.title);
          localStorage.setItem('eventId', this.common.placeOrderObj.eventId.toString());
        } else if (!this.common.storeClientInfo.isEventEnable) {
          localStorage.removeItem('eventStartDate');
          localStorage.removeItem('eventEndDate');
          localStorage.removeItem('eventName');
          localStorage.removeItem('eventId');
        }
      } else {
        this.newOrder = true;
      }
    });
  }

  getRecentOrderList() {
    let param: any = {
      pathVariable: 1,
      pageSize: 5,      //have to show only 5 records for this page
      clientId: this.common.storeClientInfo.id
    }
    this.storeService.getOrderList(param).subscribe(response => {
      if (response.response) {
        this.totalRecords = response.response.paginationInfo.totalRecords;
        this.dataSource.data = response.response.results;
        this.noRecords = response.response.results.length > 0 ? false : true;
      }
      else if (response.errorCode == 'E1009') {
        this.auth.sessionExpired();
      }
    }, error => this.sharedService.onError(error));

  }

  // openAddEventPopup() {
  //   this.router.navigate(['/events']);
  // }

  canDeactivate(): boolean {
    if (this.cookieService.get('storeAccessToken') && location.pathname == '/') {
      return true;
    } else {
      return false;
    }

  }

  /**
   * When a user clicks on the *Place New Order* Button, the system should check 
   *If there is an existing event? :* If YES*, then the system should check the event dates. 
   If *NO*, then show the pop-up where he can select or add the event and go with a fresh flow.

   *Is Event dates in Past? :* If YES*, terminate the incomplete order transaction and show the pop-up for a fresh flow. 
   If *NO*, show a pop-up saying "There is an existing event. Do you want to continue with that?"

   *There is an existing event. Do you want to discard that? :* If NO*, show the product page 
   *ELSE(YES)* terminate the existing order transaction and show the pop-up for a fresh flow.
   */
  checkForExistingCart() {
    if (this.common.userEventEnabled.value) {
      if (!localStorage.getItem('eventStartDate')) {
        this.router.navigate(['/order/placeorder']);
      }
      else {
        if (new Date(localStorage.getItem('eventStartDate')) >= new Date()) {
          this.sharedService.confirmBox(AppMessage.U0183, (value) => {
            if (value) {
              this.emptyCartAndNavigate();
            } else {
              this.router.navigate(['/order/placeorder']);
            }
          })
        } else {
          this.emptyCartAndNavigate();
        }
      }
    } else {
      this.emptyCartAndNavigate();
    }
  }

  emptyCartAndNavigate() {
    this.common.emptyCart();
    this.router.navigate(['/order/placeorder']);
  }
}
