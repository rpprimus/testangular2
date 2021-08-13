import { Injectable } from '@angular/core';
import { CanDeactivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { StoreDashboardComponent } from '../components/store-dashboard/store-dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class StoreCanDeactivateGuard implements CanDeactivate<StoreDashboardComponent> {

  //this guard is implemented to navigate back to the store-dashboard if user only hits the base url
  canDeactivate(component: StoreDashboardComponent): boolean {
    if (!component.canDeactivate()) {
      return true;
    } else {
      return false;
    }

    return true;
  }
}
