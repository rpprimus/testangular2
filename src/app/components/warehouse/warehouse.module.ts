import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { WarehouseService } from './warehouse.service';
import { SharedModule } from '../../core/shared-module';

@NgModule({
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    SharedModule
  ],
  declarations: [WarehouseListComponent],
  providers: [WarehouseService]
})
export class WarehouseModule { }
