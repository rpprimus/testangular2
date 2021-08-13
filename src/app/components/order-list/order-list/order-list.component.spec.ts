import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListComponent } from './order-list.component';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { OrdersService } from '../orders.service';
import { mockOrdersService } from '../../../../Test/mockOrdersService';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { CookieService } from 'ngx-cookie-service';
import { MatModule } from '../../../core/mat-module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterBoxComponent, MyFilterPipe } from '../../filter-box/filter-box.component';
import { Router } from '@angular/router';

describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderListComponent,FilterBoxComponent,MyFilterPipe],
      imports: [MatModule,InfiniteScrollModule,BrowserAnimationsModule],
      providers: [{provide:Util,useClass:mockUtil},{provide:OrdersService,useClass:mockOrdersService},
      {provide:SharedService,useClass:mockSharedService},CookieService,{provide:Router,useValue:router}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onChangeFilter() method',()=>{
    let data={};
    component.onChangeFilter(data);
    fixture.detectChanges();
    expect(component.onChangeFilter).toBeTruthy();
  });

  it('should call onScroll() method',()=>{
    component.dataSource.data= [
      {
        "id": 380,
        "orderNumber": "SL_000380",
        "orderDate": "02-04-2020",
        "arrivalDate": "02-11-2020",
        "eventName": "Test4",
        "requestedBy": "Gagan11",
        "status": "Placed",
        "statusCode": "PLACED",
        "orderStatusId": 37
      },
      {
        "id": 379,
        "orderNumber": "SL_000379",
        "orderDate": "01-28-2020",
        "arrivalDate": "01-31-2020",
        "eventName": "Test12123",
        "requestedBy": "Gagan11",
        "status": "Processing",
        "statusCode": "PROCESSING",
        "orderStatusId": 39
      },
      {
        "id": 378,
        "orderNumber": "SL_000378",
        "orderDate": "01-28-2020",
        "arrivalDate": "01-31-2020",
        "eventName": "Test12123",
        "requestedBy": "Gagan11",
        "status": "Canceled",
        "statusCode": "CANCELED",
        "orderStatusId": 44
      },
      {
        "id": 377,
        "orderNumber": "SL_000377",
        "orderDate": "01-28-2020",
        "arrivalDate": "01-31-2020",
        "eventName": "Test12123",
        "requestedBy": "Gagan11",
        "status": "Canceled",
        "statusCode": "CANCELED",
        "orderStatusId": 44
      },
      {
        "id": 376,
        "orderNumber": "SL_000376",
        "orderDate": "01-28-2020",
        "arrivalDate": "01-29-2020",
        "eventName": "Test4",
        "requestedBy": "Gagan11",
        "status": "Ready To Ship",
        "statusCode": "READY_TO_SHIP",
        "orderStatusId": 40
      },
      {
        "id": 374,
        "orderNumber": "SL_000374",
        "orderDate": "01-28-2020",
        "arrivalDate": "01-29-2020",
        "eventName": "Test4",
        "requestedBy": "Gagan11",
        "status": "Canceled",
        "statusCode": "CANCELED",
        "orderStatusId": 44
      },
      {
        "id": 373,
        "orderNumber": "SL_000373",
        "orderDate": "01-28-2020",
        "arrivalDate": "01-29-2020",
        "eventName": "Test4",
        "requestedBy": "Gagan11",
        "status": "Canceled",
        "statusCode": "CANCELED",
        "orderStatusId": 44
      },
      {
        "id": 372,
        "orderNumber": "SL_000372",
        "orderDate": "01-28-2020",
        "arrivalDate": "01-21-2020",
        "eventName": "Test4",
        "requestedBy": "Gagan11",
        "status": "Canceled",
        "statusCode": "CANCELED",
        "orderStatusId": 44
      },
      {
        "id": 371,
        "orderNumber": "SL_000371",
        "orderDate": "01-28-2020",
        "arrivalDate": "01-22-2020",
        "eventName": "Test4",
        "requestedBy": "Gagan11",
        "status": "Canceled",
        "statusCode": "CANCELED",
        "orderStatusId": 44
      },
      {
        "id": 370,
        "orderNumber": "SL_000370",
        "orderDate": "01-27-2020",
        "arrivalDate": "01-15-2020",
        "eventName": "Test5",
        "requestedBy": "Gagan11",
        "status": "Canceled",
        "statusCode": "CANCELED",
        "orderStatusId": 44
      }
    ];
    component.totalRecords=0;
    component.onScroll();
    fixture.detectChanges();
    expect(component.onScroll).toBeTruthy();
  });

  it('should call cancelOrder() method',()=>{
    let id=380;
    component.cancelOrder(id);
    fixture.detectChanges();
    expect(component.cancelOrder).toBeTruthy();
  });

  it('should call cancelOrder() method and throw error',()=>{
    let id=381;
    component.cancelOrder(id);
    fixture.detectChanges();
    expect(component.cancelOrder).toBeTruthy();
  });

  it('should call navigateToManageOrder() method',()=>{
    let event={target:{id:1}},id=10;
    component.navigateToManageOrder(event,id);
    fixture.detectChanges();
    expect(component.navigateToManageOrder).toBeTruthy();
  });
});
