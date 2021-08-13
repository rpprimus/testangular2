import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOrderPageComponent } from './main-order-page.component';
import { MatModule } from '../../../../app/core/mat-module';
import { ManageOrderDetailComponent } from '../manage-order-detail/manage-order-detail.component';
import { ManageShipmentDetailComponent } from '../manage-shipment-detail/manage-shipment-detail.component';
import { ManageReceivingDetailComponent } from '../manage-receiving-detail/manage-receiving-detail.component';
import { QuantityComponent } from '../../../store/components/order/quantity/quantity.component';
import { DynamicInputFieldComponent } from '../../../store/components/dynamic-input-field/dynamic-input-field.component';
import { DisplayLinkedFieldsComponent } from '../../../store/components/order/display-linked-fields/display-linked-fields.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { LookupvaluesPipe } from '../../../../app/shared/pipes/lookupvalues.pipe';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../app/shared/services/auth.service';
import { mockAuthService } from '../../../../Test/mockAuthService.service';
import { SharedService } from '../../../../app/shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { ManageOrderService } from '../manage-order.service';
import { HttpClientService } from '../../../../app/shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../Test/mockHttpClientServiceClass';
import { Util } from '../../../../app/shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { Common } from '../../../../app/store/utility/common';
import { mockCommon } from '../../../../Test/mockCommon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mockManageOrderService } from '../../../../Test/mockManageOrderService';
import { ManageFreightDetailComponent } from '../manage-freight-detail/manage-freight-detail.component';
import { By } from 'protractor';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
declare var CKEDITOR;
xdescribe('MainOrderPageComponent', () => {
  let component: MainOrderPageComponent;
  let fixture: ComponentFixture<MainOrderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainOrderPageComponent,ManageOrderDetailComponent,ManageFreightDetailComponent,
        ManageShipmentDetailComponent,
        ManageReceivingDetailComponent,QuantityComponent,
        DynamicInputFieldComponent,DisplayLinkedFieldsComponent,LookupvaluesPipe],
        schemas: [ NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
        providers:[CookieService,
        {provide:ManageOrderService,useClass:mockManageOrderService},
        {provide:AuthService,useClass:mockAuthService},
        {provide:SharedService,useClass:mockSharedService},
        {provide:HttpClientService,useClass:mockHttpClientServiceClass},
        {provide:Common,useClass:mockCommon},
        {provide:Util,useClass:mockUtil},
        {provide: ActivatedRoute, useValue: {
          snapshot: {
            // routeConfig: {
            //   path: "eventcalendar"
            // },
            params: {
              id: "1",

            },
            queryParams: {
              ClientId: "2",
            }
          },
        }
      }
      ],
      imports:[MatModule,CKEditorModule,HttpClientModule,BrowserAnimationsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainOrderPageComponent);
    component = fixture.componentInstance;
    const childComponent = jasmine.createSpyObj('ManageOrderDetailComponent', ['getOrders']);
    component.orderDetail=childComponent;
    const childComponent1 = jasmine.createSpyObj('ManageFreightDetailComponent', ['getOrders']);
    component.freightDetail=childComponent1;
    const childComponent2 = jasmine.createSpyObj('ManageShipmentDetailComponent', ['getOrders']);
    component.shipmentDetail=childComponent2;
    const childComponent3 = jasmine.createSpyObj('ManageReceivingDetailComponent', ['getOrders']);
    component.receivingDetail=childComponent3;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should call updateOrderStatus method case "PLACED"', () => {
    component.updateOrderStatus();
    fixture.detectChanges();
    expect(component.updateOrderStatus).toBeTruthy();
  });
  it('should call updateOrderStatus method case "CONFIRMED"', () => {
    component.data.orderStatus="CONFIRMED";
    component.updateOrderStatus();
    fixture.detectChanges();
    expect(component.updateOrderStatus).toBeTruthy();
  });
  it('should call updateOrderStatus method case "PROCESSING"', () => {
    component.data.orderStatus="PROCESSING";
    const childComponent1 = jasmine.createSpyObj('ManageFreightDetailComponent', ['submitFreightDetails']);
    component.freightDetail=childComponent1;
    component.updateOrderStatus();
    fixture.detectChanges();
    expect(component.updateOrderStatus).toBeTruthy();
  });
  it('should call updateOrderStatus method case "READY_TO_SHIP"', () => {
    component.data.orderStatus="READY_TO_SHIP";
    component.updateOrderStatus();
    fixture.detectChanges();
    expect(component.updateOrderStatus).toBeTruthy();
  });
  it('should call updateOrderStatus method case "SHIPPED"', () => {
    component.data.orderStatus="SHIPPED";
    component.updateOrderStatus();
    fixture.detectChanges();
    expect(component.updateOrderStatus).toBeTruthy();
  });
  it('should call updateOrderStatus method case "RECEIVED"', () => {
    component.data.orderStatus="RECEIVED";
    component.updateOrderStatus();
    fixture.detectChanges();
    expect(component.updateOrderStatus).toBeTruthy();
  });

  it('should call releaseToWorkShop method', () => {
    component.releaseToWorkShop();
    fixture.detectChanges();
    expect(component.releaseToWorkShop).toBeTruthy();
  });

  it('should call readyToShip method', () => {
    const childComponent1 = jasmine.createSpyObj('ManageFreightDetailComponent', ['changeStatusToReadyToShip']);
    component.freightDetail=childComponent1;
    fixture.detectChanges();
    component.readyToShip();
    fixture.detectChanges();
    expect(component.readyToShip).toBeTruthy();
  });
  it('should call shipped method', () => {
    component.shipmentDetail.data={
      "orderId": 219,
      "orderDate": "09-09-2019",
      "ampProjectNo": null,
      "workOrderTaskNo": null,
      "orderNumber": "SL_000219",
      "notes": null,
      "orderStatus": "COMPLETE",
      "toDate": null,
      "fromDate": null,
      "orderReceiveDate": "",
      "fixedEventDetails": null,
      "fixedShipmentDetails": null,
      "fixedPickupDetails": null,
      "fixedAdditionalInfoDetails": null,
      "fixedServiceInfos": null,
      "productInfoList": [
        {
          "id": 259,
          "productId": 66,
          "productName": "Apple iPhone XR (Black, 64 GB)",
          "productNumber": "XR_Iphone1",
          "categories": "iPhone, test 1",
          "availableQuantity": 2975,
          "maxOrderQuantity": 20,
          "receiveQuantity": 0,
          "lostQuantity": 0,
          "damageQuantity": 0,
          "orderId": null,
          "isShipped": false,
          "reasonId": null,
          "isReturnable": true,
          "fileName": null,
          "filePath": null,
          "onDemandTextGraphic": null,
          "orderedQuantity": 4
        },
        {
          "id": 260,
          "productId": 74,
          "productName": "Iphone",
          "productNumber": "XR_Iphone2",
          "categories": "iPhone",
          "availableQuantity": 5,
          "maxOrderQuantity": 10,
          "receiveQuantity": 0,
          "lostQuantity": 0,
          "damageQuantity": 0,
          "orderId": null,
          "isShipped": false,
          "reasonId": null,
          "isReturnable": true,
          "fileName": null,
          "filePath": null,
          "onDemandTextGraphic": null,
          "orderedQuantity": 2
        }
      ],
      "orderCarrierDetails": [],
      "warehouseId": null,
      "requestorName": "Sakshi",
      "receivingNote": null,
      "eventDetails": {
        "venue": "jfk",
        "city": "grh",
        "stateId": 3947,
        "stateName": "Mississippi",
        "countryId": 231,
        "countryName": "United States",
        "customFieldValues": [
          {
            "customFieldId": 297,
            "customFieldValue": "test2"
          }
        ],
        "clientId": null,
        "id": 164,
        "title": "new beginning",
        "start": "09-27-2019",
        "end": "10-02-2019",
        "addressOne": "bvbgf",
        "addressTwo": null,
        "eventZip": "543534"
      },
      "additionalInfoDetails": {
        "customFieldValues": [
          {
            "customFieldId": 233,
            "customFieldValue": "vcxv"
          }
        ]
      },
      "serviceInfoDetails": {
        "customFieldValues": [
          {
            "customFieldId": 296,
            "customFieldValue": "10m width"
          }
        ]
      },
      "shipmentDetails": null,
      "pickupDetails": {
        "name": "ccccc",
        "eventVenue": null,
        "addressOne": "bvbgf",
        "addressTwo": null,
        "city": "grh",
        "countryId": 231,
        "countryName": "United States",
        "stateId": 3947,
        "stateName": "Mississippi",
        "zip": "543534",
        "customFieldValues": [],
        "id": 137,
        "pickupDate": "09-29-2019",
        "pickupTime": ""
      },
      "dimensionDetails" : [{ id: 10, length: '100px', width: '100px', height: '100px', weight: '20', isActive: true }],
      "productInfoWithGraphicsList": [],
      "cardInfo": null,
      "isorderCarrierDetailDisable": false,
      "freightDetailDisable": false,
      "freightDetails": {dimensionDetails : [{ id: 10, length: '100px', width: '100px', height: '100px', weight: '20', isActive: true }]}
    };
    const childComponent2 = jasmine.createSpyObj('ManageShipmentDetailComponent', ['changeStatusToShipped']);
    component.freightDetail=childComponent2;
    const childComponent5 = jasmine.createSpyObj('ManageFreightDetailComponent', ['getOrders']);
    component.freightDetail=childComponent5;
    component.shipped();
    fixture.detectChanges();
    expect(component.shipped).toBeTruthy();
  });
  it('should call returned method', () => {
    const childComponent3 = jasmine.createSpyObj('ManageReceivingDetailComponent', ['changeStatusToReturned']);
    component.freightDetail=childComponent3;
    const childComponent5 = jasmine.createSpyObj('ManageFreightDetailComponent', ['getOrders']);
    component.freightDetail=childComponent5;
    fixture.detectChanges();
    component.returned();
    fixture.detectChanges();
    expect(component.returned).toBeTruthy();
  });
  it('should call complete method if block', () => {
    const childComponent4 = jasmine.createSpyObj('ManageReceivingDetailComponent', ['changeStatusToComplete']);
    component.freightDetail=childComponent4;
    const childComponent5 = jasmine.createSpyObj('ManageFreightDetailComponent', ['getOrders']);
    component.freightDetail=childComponent5;
    fixture.detectChanges();
    component.complete();
    fixture.detectChanges();
    expect(component.complete).toBeTruthy();
  });
  it('should call complete method else block', () => {
    component.isEventEnabled=false;
    const childComponent4 = jasmine.createSpyObj('ManageReceivingDetailComponent', ['changeStatusToComplete']);
    component.freightDetail=childComponent4;
    const childComponent5 = jasmine.createSpyObj('ManageFreightDetailComponent', ['getOrders']);
    component.freightDetail=childComponent5;
    fixture.detectChanges();
    component.complete();
    fixture.detectChanges();
    expect(component.complete).toBeTruthy();
  });
  it('should call cancelOrder method', () => {
    component.cancelOrder();
    fixture.detectChanges();
    expect(component.cancelOrder).toBeTruthy();
  });
  it('should call cancelOrder method should throw error', () => {
    component.id=2;
    component.cancelOrder();
    fixture.detectChanges();
    expect(component.cancelOrder).toBeTruthy();
  });
  it('should call printOrder method', () => {
    component.printOrder();
    fixture.detectChanges();
    expect(component.printOrder).toBeTruthy();
  });
  it('should call printOrder method should throw error', () => {
    component.id=2;
    component.printOrder();
    fixture.detectChanges();
    expect(component.printOrder).toBeTruthy();
  });
  it('should call productDeleteChange method', () => {
    let event=true;
    component.productDeleteChange(event);
    fixture.detectChanges();
    expect(component.productDeleteChange).toBeTruthy();
  });
  it('should call checkToEnableReadyToShip method', () => {
    component.checkToEnableReadyToShip();
    fixture.detectChanges();
    expect(component.checkToEnableReadyToShip).toBeTruthy();
  });
  it('should call checkToEnableShipped method if block', () => {
    component.checkToEnableShipped();
    fixture.detectChanges();
    expect(component.checkToEnableShipped).toBeTruthy();
  });
  it('should call checkToEnableShipped method else block', () => {
    component.hasPermission=false;
    component.checkToEnableShipped();
    fixture.detectChanges();
    expect(component.checkToEnableShipped).toBeTruthy();
  });
});
 