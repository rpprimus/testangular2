import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ReviewOrderComponent } from './review-order/review-order.component';
import { BrowseProductComponent } from './browse-product/browse-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ServicesComponent } from './services/services.component';
import { SharedModule } from '../../../core/shared-module';
import { StoreCategoriesComponent } from '../store-categories/store-categories.component';
import { EventPopUpComponent } from './event-pop-up/event-pop-up.component';
import { LeftPanelCategoryService } from './left-panel-category.service';
import { HeaderFooterNote } from './header-footer-note';
import { CreditCardComponent } from '../credit-card/credit-card.component';
import { CreditCardDetailsPopupComponent } from '../credit-card-details-popup/credit-card-details-popup.component';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ],
  declarations: [
    OrderDetailComponent, 
    PlaceOrderComponent, 
    ReviewOrderComponent,
    HeaderFooterNote,
    BrowseProductComponent, 
    ProductDetailComponent, 
    ServicesComponent, 
    StoreCategoriesComponent, 
    EventPopUpComponent,
    CreditCardComponent,
    CreditCardDetailsPopupComponent
  ],
  entryComponents: [EventPopUpComponent,CreditCardDetailsPopupComponent],
  providers: [LeftPanelCategoryService]
})
export class OrderModule { }
