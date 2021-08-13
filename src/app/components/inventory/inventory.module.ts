import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryHistoryListComponent } from './inventory-history-list/inventory-history-list.component';
import { InventoryDetailsComponent } from './inventory-details/inventory-details.component';
import { InventoryAvailabilityComponent } from './inventory-availability/inventory-availability.component';
import { CheckInventoryComponent } from './check-inventory/check-inventory.component';
import { SharedModule } from '../../core/shared-module';
import { InventoryService } from './inventory.service';

@NgModule({
  imports: [
    CommonModule,
    InventoryRoutingModule,
    SharedModule
  ],
  declarations: [
    InventoryListComponent, 
    InventoryHistoryListComponent, 
    InventoryDetailsComponent, 
    InventoryAvailabilityComponent, 
    CheckInventoryComponent
  ],
  providers: [InventoryService]
})
export class InventoryModule { }
