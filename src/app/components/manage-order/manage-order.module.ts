import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageOrderRoutingModule } from './manage-order-routing.module';
import { MainOrderPageComponent } from './main-order-page/main-order-page.component';
import { ManageOrderDetailComponent } from './manage-order-detail/manage-order-detail.component';
import { ManageFreightDetailComponent } from './manage-freight-detail/manage-freight-detail.component';
import { ManageShipmentDetailComponent } from './manage-shipment-detail/manage-shipment-detail.component';
import { ManageReceivingDetailComponent } from './manage-receiving-detail/manage-receiving-detail.component';
import { SharedModule } from '../../core/shared-module';
import { ManageOrderService } from './manage-order.service';
import { SelectProductPopupComponent } from './select-product-popup/select-product-popup.component';

@NgModule({
  imports: [
    CommonModule,
    ManageOrderRoutingModule,
    SharedModule
  ],
  declarations: [
    MainOrderPageComponent, 
    ManageOrderDetailComponent, 
    ManageFreightDetailComponent, 
    ManageShipmentDetailComponent, 
    ManageReceivingDetailComponent, 
    SelectProductPopupComponent
  ],
  providers: [ManageOrderService],
  entryComponents: [SelectProductPopupComponent],
})
export class ManageOrderModule { }
