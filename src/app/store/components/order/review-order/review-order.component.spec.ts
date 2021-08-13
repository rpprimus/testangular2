import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ReviewOrderComponent } from './review-order.component';
import { HeaderFooterNote } from '../header-footer-note';
import { MatModule } from '../../../../core/mat-module';
import { QuantityComponent } from '../quantity/quantity.component';
import { CreditCardComponent } from '../../credit-card/credit-card.component';
import { LookupvaluesPipe } from '../../../../shared/pipes/lookupvalues.pipe';
import { DynamicDisplayFieldComponent } from '../../dynamic-display-field/dynamic-display-field.component';
import { Common } from '../../../../store/utility/common';
import { mockCommon } from '../../../../../Test/mockCommon';
import { StoreService } from '../../../../store/service/store.service';
import { mockStoreService } from '../../../../../Test/mockStoreService';
import { SharedService } from '../../../../shared/services/shared.service';
import { mockSharedService } from '../../../../../Test/mockSharedService';
import { Router, RouterModule } from '@angular/router';
import { Location } from "@angular/common";
import { Util } from '../../../../shared/services/util';
import { mockUtil } from '../../../../../Test/mockUtil';
import { HttpClientService } from '../../../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../../Test/mockHttpClientServiceClass';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EncryptionService } from '../../../../shared/services/encryption.service';
import { mockEncryptionService } from '../../../../../Test/mockEncryptionService';
import { ElementRef } from '@angular/core';
import { mockElementRef } from '../../../../../Test/mockElementRef';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DemandGraphicsComponent } from '../demand-graphics/demand-graphics.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreDashboardComponent } from '../../store-dashboard/store-dashboard.component';

xdescribe('ReviewOrderComponent', () => {
  let component: ReviewOrderComponent;
  let fixture: ComponentFixture<ReviewOrderComponent>;
  let router:Router;
  let location:Location;

  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoreDashboardComponent ,LookupvaluesPipe, ReviewOrderComponent, HeaderFooterNote,DemandGraphicsComponent,
        QuantityComponent, CreditCardComponent, DynamicDisplayFieldComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: 'store-dashboard', component: StoreDashboardComponent }
      ]),MatModule,BrowserAnimationsModule,CKEditorModule],
      providers: [{ provide: MatDialog, useClass: mockDialogRef },{provide:EncryptionService,useClass:mockEncryptionService},{provide:Common,useClass:mockCommon},{provide:StoreService,useClass:mockStoreService},
        {provide:SharedService,useClass:mockSharedService}
        ,{provide:Util,useClass:mockUtil},
        {provide:HttpClientService,useClass:mockHttpClientServiceClass},{ provide: ElementRef, useClass: mockElementRef }]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
          entryComponents: [DemandGraphicsComponent]
      }
    })
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(ReviewOrderComponent);
    component = fixture.componentInstance;
    component.userInfo={id:1};
    fixture.detectChanges();
    router.initialNavigation();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onChangeQuantity() method',()=>{
    let item=[];
    component.onChangeQuantity(item);
    fixture.detectChanges();
    expect(component.onChangeQuantity).toBeTruthy();
  })

  it('should call onPlaceOrder() method',()=>{
    component.onPlaceOrder();
    fixture.detectChanges();
    expect(component.onPlaceOrder).toBeTruthy();
  })

  it('should call scroll() method',()=>{
    
    let num:number;
    component.scroll(1);
    component.scroll(2);
    component.scroll(3);
    component.scroll(4);
    component.scroll(5);
    component.scroll(num);
    fixture.detectChanges();
    expect(component.scroll).toBeTruthy();
  })

  it('should call editOnDemandGraphics() method',()=>{
    let item={
      availableQuantity: 88,
      fileName: "",
      filePath: "",
      id: 210,
      isKit: true,
      isPriceRange: false,
      maxOrderQuantity: null,
      onDemandTextGraphic: "",
      orderedQuantity: 2,
      productId: 210,
      productMaxPrice: null,
      productName: "AS TEST",
      productNumber: "AS9891",
      productPrice: 98.91,
      resourceId: 67,
      showPrice: true
    }
    
    component.editOnDemandGraphics(item);
    fixture.detectChanges();
    expect(component.editOnDemandGraphics).toBeTruthy();
  });

  it('should call cancelOrder() method',fakeAsync(()=>{
    
    component.cancelOrder();
    router.navigate(['store-dashboard']); 
    tick();
    expect(location.path()).toBe('/store-dashboard'); 
    fixture.detectChanges();
    expect(component.cancelOrder).toBeTruthy();
  }));

  it('should call onRemoveProduct() method',()=>{
    let productId= 210;
    component.onRemoveProduct(productId);
    fixture.detectChanges();
    expect(component.onRemoveProduct).toBeTruthy();
  });
});
export class mockDialogRef{
  open() {
    return {
        afterClosed: () => of( true )
    };
}
}
