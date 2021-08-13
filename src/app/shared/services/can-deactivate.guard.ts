import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AddClientComponent } from '../../components/client/add-client/add-client.component';
import { Util } from './util';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<AddClientComponent> {

  constructor(private util:Util){}

  //this guard is implemented for the client module section that if any changes are in cliemt modules then ALERT the user
  canDeactivate(component: AddClientComponent): boolean {
    if (!component.canDeactivate()) {
      if (confirm("You have unsaved changes! If you leave, your changes will be lost.")) {
      this.util.isServiceDirty = this.util.isEventDirty = this.util.isShipmentDirty = this.util.isPickupDirty =
      this.util.isAdditionalDirty = false;
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}

