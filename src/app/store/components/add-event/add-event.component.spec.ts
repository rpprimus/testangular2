import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AddEventComponent } from './add-event.component';
import { DynamicInputFieldComponent } from '../dynamic-input-field/dynamic-input-field.component';
import { DisplayLinkedFieldsComponent } from '../order/display-linked-fields/display-linked-fields.component';
import { MatModule } from '../../../core/mat-module';
import { LookupvaluesPipe } from '../../../shared/pipes/lookupvalues.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { Common } from '../../utility/common';
import { mockCommon } from '../../../../Test/mockCommon';
import { StoreService } from '../../service/store.service';
import { mockStoreService } from '../../../../Test/mockStoreService';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EventCalendarComponent } from '../event-calendar/event-calendar.component';
import { Location } from "@angular/common";
import { FullCalendarModule } from 'ng-fullcalendar';
import { PlaceOrderComponent } from '../order/place-order/place-order.component';
import { ServicesComponent } from '../order/services/services.component';
import { HeaderFooterNote } from '../order/header-footer-note';
import { OrderDetailComponent } from '../order/order-detail/order-detail.component';
import { ProductDetailComponent } from '../order/product-detail/product-detail.component';
import { StoreCategoriesComponent } from '../store-categories/store-categories.component';
import { QuantityComponent } from '../order/quantity/quantity.component';
import { ReviewOrderComponent } from '../order/review-order/review-order.component';
import { CreditCardComponent } from '../credit-card/credit-card.component';
import { DynamicDisplayFieldComponent } from '../dynamic-display-field/dynamic-display-field.component';
import { BrowseProductComponent } from '../order/browse-product/browse-product.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../Test/mockHttpClientServiceClass';

xdescribe('AddEventComponent', () => {
  let component: AddEventComponent;
  let fixture: ComponentFixture<AddEventComponent>;
  let router: Router;
  let location: Location;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrowseProductComponent, DynamicDisplayFieldComponent, CreditCardComponent,
        ReviewOrderComponent, QuantityComponent, StoreCategoriesComponent, ProductDetailComponent, 
        OrderDetailComponent, HeaderFooterNote, ServicesComponent, PlaceOrderComponent, 
        EventCalendarComponent, LookupvaluesPipe, AddEventComponent, DynamicInputFieldComponent, 
        DisplayLinkedFieldsComponent],
      imports: [InfiniteScrollModule, MatModule, BrowserAnimationsModule, FullCalendarModule, 
        RouterTestingModule.withRoutes([
        { path: 'eventcalendar', component: EventCalendarComponent }, 
        { path: 'order/placeorder', component: PlaceOrderComponent
       }
      ]),],
      providers: [{ provide: Common, useClass: mockCommon }, 
        { provide: StoreService, useClass: mockStoreService },
      { provide: SharedService, useClass: mockSharedService },
      { provide: HttpClientService, useClass: mockHttpClientServiceClass },
      { provide: Util, useClass: mockUtil }, {
        provide: ActivatedRoute, useValue: {
          snapshot: {
            routeConfig: {
              path: "eventcalendar"
            },
            params: {
              id: "1",

            },
            queryParams: {
              ClientId: "2",
            }
          },
        }
      }]
    })
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AddEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router.initialNavigation();
  }));

  it('should create',() => {
    expect(component).toBeTruthy();
  });

  it('should call the addEvent() method', () => {
    component.addEvent();
    fixture.detectChanges();
    expect(component.addEvent).toBeTruthy();
  })

  it('should call the close() method', fakeAsync(() => {
    component.close();
    fixture.detectChanges();
    expect(component.close).toBeTruthy();
    router.navigate(['eventcalendar']);
    tick();
    expect(location.path()).toBe('/eventcalendar');
  }))

  it('should call the placeOrder() method', fakeAsync(() => {
    component.placeOrder();
    fixture.detectChanges();
    expect(component.placeOrder).toBeTruthy();
    router.navigate(['order/placeorder']);
    tick();
    expect(location.path()).toBe('/order/placeorder');
  }));
});
