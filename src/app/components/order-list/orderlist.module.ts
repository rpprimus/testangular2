import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from '../../core/shared-module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrdersService } from './orders.service';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ],
  declarations: [
    OrderListComponent
  ],
  providers: [OrdersService]
})
export class OrderListModule { }
