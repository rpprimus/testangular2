import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SelectClientPopupComponent } from '../../components/layout/side-nav/select-client-popup/select-client-popup.component';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Util } from './util';

@Injectable({
  providedIn: 'root'
})
export class ClientSelectionService {

  constructor(private dialog: MatDialog, private router: Router, public util: Util) {
  }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    if (!this.util.isStore) {
      if (localStorage.getItem('selectedClientId') == "null" || !localStorage.getItem('selectedClientId')) {
        this.openClientPopUp(route.routeConfig.path);
        return Promise.resolve(false);
      }
      else {
        return Promise.resolve(true);
      }
    } else {
      return Promise.resolve(true);
    }
  }

  openClientPopUp(path) {
    this.dialog.open(SelectClientPopupComponent, {
      data: {
        previousPath: '/dashboard',
        isClientSelected: false //to disable the select btn on popup till the client is not selected
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/' + path]);
      } else {
        this.router.navigate([location.pathname]);
      }
    });
  }
}
