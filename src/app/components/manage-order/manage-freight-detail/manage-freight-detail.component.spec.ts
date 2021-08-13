import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFreightDetailComponent } from './manage-freight-detail.component';
import { FormsModule } from '@angular/forms';
import { MatModule } from '../../../../app/core/mat-module';
import { SharedService } from '../../../../app/shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { ManageOrderService } from '../manage-order.service';
import { HttpClientService } from '../../../../app/shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../Test/mockHttpClientServiceClass';
import { Util } from '../../../../app/shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { CookieService } from 'ngx-cookie-service';
import { mockManageOrderService } from '../../../../Test/mockManageOrderService';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ManageFreightDetailComponent', () => {
  let component: ManageFreightDetailComponent;
  let fixture: ComponentFixture<ManageFreightDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFreightDetailComponent ],
      providers:[CookieService,
        {provide:ManageOrderService,useClass:mockManageOrderService},
        {provide:SharedService,useClass:mockSharedService},
        {provide:Util,useClass:mockUtil},
        {provide:HttpClientService,useClass:mockHttpClientServiceClass},
      ],
      imports:[FormsModule,MatModule,BrowserAnimationsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFreightDetailComponent);
    component = fixture.componentInstance;
    component.data={
      "orderId": 219,
      "orderDate": "09-09-2019",
      "ampProjectNo": null,
      "workOrderTaskNo": null,
      "orderNumber": "SL_000219",
      "notes": null,
      "orderStatus": "PLACED",
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getOrders() method', () => {
    let data={
      "orderId": 219,
      "orderDate": "09-09-2019",
      "ampProjectNo": null,
      "workOrderTaskNo": null,
      "orderNumber": "SL_000219",
      "notes": null,
      "orderStatus": "PLACED",
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
      "productInfoWithGraphicsList": [],
      "cardInfo": null,
      "isorderCarrierDetailDisable": false,
      "freightDetailDisable": false,
      "freightDetails": null
    };
    component.getOrders(data);
    fixture.detectChanges();
    expect(component.getOrders).toBeTruthy();
  });
  it('should call onAddDimensionItems method ', () => {
    component.onAddDimensionItems();
    fixture.detectChanges();
    expect(component.onAddDimensionItems).toBeTruthy();
  });
  it('should call onRemoveDimensionItems method ', () => {
    let index=[0][3];
    component.onRemoveDimensionItems(index);
    fixture.detectChanges();
    expect(component.onRemoveDimensionItems).toBeTruthy();
  });
  it('should call submitFreightDetails method if block', () => {
    let fun = function fn(param) {
      return param
    };
    component.submitFreightDetails(fun);
    fixture.detectChanges();
    expect(component.submitFreightDetails).toBeTruthy();
  });
  it('should call submitFreightDetails method else block', () => {
    component.isFormSubmitted=true;
    let fun = function fn(param) {
      return param
    };
    component.submitFreightDetails(fun);
    fixture.detectChanges();
    expect(component.submitFreightDetails).toBeTruthy();
  });
  it('should call changeStatusToReadyToShip method if block', () => {
    let fun = function fn(param) {
      return param
    };
    component.changeStatusToReadyToShip(fun);
    fixture.detectChanges();
    expect(component.changeStatusToReadyToShip).toBeTruthy();
  });

  it('should call changeStatusToReadyToShip method else block', () => {
    component.isFormSubmitted=true;
    let fun = function fn(param) {
      return param
    };
    component.changeStatusToReadyToShip(fun);
    fixture.detectChanges();
    expect(component.changeStatusToReadyToShip).toBeTruthy();
  });

  it('should call changeStatusToReadyToShip method should throw error', () => {
    component.data.orderId=1;
    let fun = function fn(param) {
      return param
    };
    component.changeStatusToReadyToShip(fun);
    fixture.detectChanges();
    expect(component.changeStatusToReadyToShip).toBeTruthy();
  });

  it('should call submit method should throw error', () => {
    component.data.orderId=1;
    let fun = function fn(param) {
      return param
    };
    component.submit(fun);
    fixture.detectChanges();
    expect(component.submit).toBeTruthy();
  });
});
