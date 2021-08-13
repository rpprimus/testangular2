import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Util } from '../../../shared/services/util';
import { MatDialog } from '@angular/material';
import { SelectClientPopupComponent } from './select-client-popup/select-client-popup.component';
import { AuthService } from '../../../shared/services/auth.service';
import { Enum } from '../../../shared/config/enum.enum';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  isAccountManager:boolean = false;
  isAdmin:boolean = false;
  currentDate  = new Date();
  constructor(private authService: AuthService,private router: Router, private dialog: MatDialog, public util: Util) { }

  ngOnInit() {
    this.isAdmin = this.authService.isRoleExists([Enum.ADMIN]);
    this.isAccountManager = this.authService.isRoleExists([Enum.CreditCard_Admin,Enum.MANAGER]);
  }

  /**
   * To stop user from navigating to client store user page if the client is not selected.
   * @param path contains the value of forward route where user want to navigate
   */
  menuItemClick(path) {
    if (path != "dashboard" && path != "users" && path != "clients" && path != "warehouse") {
      // if (path == "client-store-users" || path == "category" || path == "product" || path == "inventory" || path == "orders" || path == "damageproduct" || path == "reports") {
      if (localStorage.getItem('selectedClientId') == "null" || localStorage.getItem('selectedClientId') == undefined || localStorage.getItem('selectedClientId') == null) {
        //this.sharedService.openToast('e', AppMessage.U0026);
        this.openClientPopUp(path);
      }
      else {
        this.router.navigate(['/' + path]);
      }
    }
    else {
      this.router.navigate(['/' + path]);
    }
  }

  openClientPopUp(path) {
    this.dialog.open(SelectClientPopupComponent, {
      data: {
        previousPath: location.pathname,
        isClientSelected: false //to disable the select btn on popup till the client is not selected
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/' + path]);
      }
    });
  }

}
