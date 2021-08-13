import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageShipmentDetailComponent } from './manage-shipment-detail.component';
import { MatModule } from '../../../core/mat-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { ManageOrderService } from '../manage-order.service';
import { mockManageOrderService } from '../../../../Test/mockManageOrderService';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';

describe('ManageShipmentDetailComponent', () => {
  let component: ManageShipmentDetailComponent;
  let fixture: ComponentFixture<ManageShipmentDetailComponent>;
  var originalTimeout;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageShipmentDetailComponent],
      imports: [MatModule, BrowserAnimationsModule],
      providers: [{ provide: SharedService, useClass: mockSharedService }, { provide: ManageOrderService, useClass: mockManageOrderService },
      { provide: Util, useClass: mockUtil }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageShipmentDetailComponent);
    component = fixture.componentInstance;
    component.data = {
      "orderId": 51,
      "orderDate": "12-14-2018",
      "ampProjectNo": 2432,
      "workOrderTaskNo": "erww",
      "orderNumber": "12345",
      "notes": "wff",
      "orderStatus": "COMPLETE",
      "toDate": null,
      "fromDate": null,
      "orderReceiveDate": "12-14-2018",
      "fixedEventDetails": null,
      "fixedShipmentDetails": null,
      "fixedPickupDetails": null,
      "fixedAdditionalInfoDetails": null,
      "fixedServiceInfos": null,
      "productInfoList": [
        {
          "id": 115,
          "productId": 66,
          "productName": "Apple iPhone XR (Black, 64 GB)",
          "productNumber": "XR_Iphone1",
          "categories": "iPhone, test 1",
          "availableQuantity": 2992,
          "maxOrderQuantity": 20,
          "receiveQuantity": 1,
          "lostQuantity": 1,
          "damageQuantity": 3,
          "orderId": null,
          "isShipped": true,
          "reasonId": 0,
          "isReturnable": true,
          "fileName": null,
          "filePath": null,
          "onDemandTextGraphic": null,
          "orderedQuantity": 5
        }
      ],
      "orderCarrierDetails": [
        {
          "carrierId": 53,
          "carrier": "blue dart",
          "trackingNumber": "122232221",
          "isActive": true
        }
      ],
      "warehouseId": 72,
      "requestorName": "Sakshi",
      "receivingNote": null,
      "eventDetails": {
        "venue": "Logix ",
        "city": "Delhi",
        "stateId": 113,
        "stateName": "Algiers",
        "countryId": 3,
        "countryName": "Algeria",
        "customFieldValues": [],
        "clientId": null,
        "id": 73,
        "title": "Excursion",
        "start": "12-17-2018",
        "end": "12-24-2018",
        "addressOne": "Logix ",
        "addressTwo": "Logix ",
        "eventZip": "225566"
      },
      "additionalInfoDetails": {
        "customFieldValues": []
      },
      "serviceInfoDetails": {
        "customFieldValues": [
          {
            "customFieldId": 296,
            "customFieldValue": "10m width"
          }
        ]
      },
      "shipmentDetails": {
        "name": "Logix ",
        "eventVenue": "Logix ",
        "addressOne": "Logix ",
        "addressTwo": "Logix ",
        "city": "sdfdsf",
        "countryId": 5,
        "countryName": "Andorra",
        "stateId": 170,
        "stateName": "Encamp",
        "zip": "43543543",
        "arrivalDate": "12-20-2018",
        "arrivalTime": "",
        "customFieldValues": [],
        "id": 38
      },
      "pickupDetails": {
        "name": "Logix ",
        "eventVenue": "Logix ",
        "addressOne": "Logix ",
        "addressTwo": "Logix ",
        "city": "Delhi",
        "countryId": 6,
        "countryName": "Angola",
        "stateId": 178,
        "stateName": "Cabinda",
        "zip": "454354353",
        "customFieldValues": [],
        "id": 42,
        "pickupDate": "12-13-2018",
        "pickupTime": ""
      },
      "productInfoWithGraphicsList": [],
      "cardInfo": { "securityOne": "test", "requestorId": 10, "cardId": 1 },
      "creditDetails": { "number": 123 },
      "isorderCarrierDetailDisable": false,
      "freightDetailDisable": false,
      "freightDetails": {
        "boxCount": 1,
        "notes": "",
        "dimensionDetails": [
          {
            "id": 43,
            "height": "4",
            "width": "3",
            "weight": "",
            "isActive": true,
            "length": "3"
          }
        ],
        "freightDetailDisable": false
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getOrders() method', () => {
    let data = {
      "orderId": 51,
      "orderDate": "12-14-2018",
      "ampProjectNo": 2432,
      "workOrderTaskNo": "erww",
      "orderNumber": "12345",
      "notes": "wff",
      "orderStatus": "COMPLETE",
      "toDate": null,
      "fromDate": null,
      "orderReceiveDate": "12-14-2018",
      "fixedEventDetails": null,
      "fixedShipmentDetails": null,
      "fixedPickupDetails": null,
      "fixedAdditionalInfoDetails": null,
      "fixedServiceInfos": null,
      "productInfoList": [
        {
          "id": 115,
          "productId": 66,
          "productName": "Apple iPhone XR (Black, 64 GB)",
          "productNumber": "XR_Iphone1",
          "categories": "iPhone, test 1",
          "availableQuantity": 2992,
          "maxOrderQuantity": 20,
          "receiveQuantity": 1,
          "lostQuantity": 1,
          "damageQuantity": 3,
          "orderId": null,
          "isShipped": true,
          "reasonId": 0,
          "isReturnable": true,
          "fileName": null,
          "filePath": null,
          "onDemandTextGraphic": null,
          "orderedQuantity": 5
        }
      ],
      "orderCarrierDetails": [
        {
          "carrierId": 53,
          "carrier": "blue dart",
          "trackingNumber": "122232221",
          "isActive": true
        }
      ],
      "warehouseId": 72,
      "requestorName": "Sakshi",
      "receivingNote": null,
      "eventDetails": {
        "venue": "Logix ",
        "city": "Delhi",
        "stateId": 113,
        "stateName": "Algiers",
        "countryId": 3,
        "countryName": "Algeria",
        "customFieldValues": [],
        "clientId": null,
        "id": 73,
        "title": "Excursion",
        "start": "12-17-2018",
        "end": "12-24-2018",
        "addressOne": "Logix ",
        "addressTwo": "Logix ",
        "eventZip": "225566"
      },
      "additionalInfoDetails": {
        "customFieldValues": []
      },
      "serviceInfoDetails": null,
      "shipmentDetails": {
        "name": "Logix ",
        "eventVenue": "Logix ",
        "addressOne": "Logix ",
        "addressTwo": "Logix ",
        "city": "sdfdsf",
        "countryId": 5,
        "countryName": "Andorra",
        "stateId": 170,
        "stateName": "Encamp",
        "zip": "43543543",
        "arrivalDate": "12-20-2018",
        "arrivalTime": "",
        "customFieldValues": [],
        "id": 38
      },
      "pickupDetails": {
        "name": "Logix ",
        "eventVenue": "Logix ",
        "addressOne": "Logix ",
        "addressTwo": "Logix ",
        "city": "Delhi",
        "countryId": 6,
        "countryName": "Angola",
        "stateId": 178,
        "stateName": "Cabinda",
        "zip": "454354353",
        "customFieldValues": [],
        "id": 42,
        "pickupDate": "12-13-2018",
        "pickupTime": ""
      },
      "productInfoWithGraphicsList": [],
      "cardInfo": null,
      "isorderCarrierDetailDisable": false,
      "freightDetailDisable": false,
      "freightDetails": {
        "boxCount": 1,
        "notes": "",
        "dimensionDetails": [
          {
            "id": 43,
            "height": "4",
            "width": "3",
            "weight": "",
            "isActive": true,
            "length": "3"
          }
        ],
        "freightDetailDisable": false
      }
    };
    component.getOrders(data);
    fixture.detectChanges();
    expect(component.getOrders).toBeTruthy();
  });

  it('should call onAddCarrierDetailItems() method if block', () => {
    component.onAddCarrierDetailItems();
    fixture.detectChanges();
    expect(component.onAddCarrierDetailItems).toBeTruthy();
  });

  it('should call onRemoveCarrierDetailItems() method if block', () => {
    let index = 0;
    component.onRemoveCarrierDetailItems(index);
    fixture.detectChanges();
    expect(component.onRemoveCarrierDetailItems).toBeTruthy();
  });

  it('should call submitShipmentDetails() method if block', () => {
    let fun = function fn(params: any) {
      return true;
    };
    component.submitShipmentDetails(fun);
    fixture.detectChanges();
    expect(component.submitShipmentDetails).toBeTruthy();
  });

  it('should call submitShipmentDetails() method else block', () => {
    component.isFormSubmitted = true;
    let fun = function fn(params: any) {
      return true;
    };
    component.submitShipmentDetails(fun);
    fixture.detectChanges();
    expect(component.submitShipmentDetails).toBeTruthy();
  });

  it('should call submitShipmentDetails() method should throw error', () => {
    component.data.orderId = 10;
    let fun = function fn(params: any) {
      return true;
    };
    component.submitShipmentDetails(fun);
    fixture.detectChanges();
    expect(component.submitShipmentDetails).toBeTruthy();
  });

  it('should call checkValid() method if block', () => {
    component.data.isorderCarrierDetailDisable = true;
    component.checkValid();
    fixture.detectChanges();
    expect(component.checkValid).toBeTruthy();
  });

  it('should call changeStatusToShipped() method if block', () => {
    component.data.productInfoList[0].isShipped = false;
    let fun = function fn(params: any) {
      return true;
    };
    component.changeStatusToShipped(fun);
    fixture.detectChanges();
    expect(component.changeStatusToShipped).toBeTruthy();
  });

  it('should call changeStatusToShipped() method else block', () => {
    component.data.productInfoList[1] = {
      "id": 115,
      "productId": 66,
      "productName": "Apple iPhone XR (Black, 64 GB)",
      "productNumber": "XR_Iphone1",
      "categories": "iPhone, test 1",
      "availableQuantity": 2992,
      "maxOrderQuantity": 20,
      "receiveQuantity": 1,
      "lostQuantity": 1,
      "damageQuantity": 3,
      "orderId": null,
      "isShipped": false,
      "reasonId": 0,
      "isReturnable": true,
      "fileName": null,
      "filePath": null,
      "onDemandTextGraphic": null,
      "orderedQuantity": 5
    };
    let fun = function fn(params: any) {
      return true;
    };
    component.changeStatusToShipped(fun);
    fixture.detectChanges();
    expect(component.changeStatusToShipped).toBeTruthy();
  });

  it('should call changeStatusToShipped() method else block', () => {
    let fun = function fn(params: any) {
      return true;
    };
    component.changeStatusToShipped(fun);
    fixture.detectChanges();
    expect(component.changeStatusToShipped).toBeTruthy();
  });

  it('should call shipped() method if block', () => {
    let fun = function fn(params: any) {
      return true;
    };
    component.shipped(fun);
    fixture.detectChanges();
    expect(component.shipped).toBeTruthy();
  });

  it('should call shipped() method else block', () => {
    component.isFormSubmitted = true;
    let fun = function fn(params: any) {
      return true;
    };
    component.shipped(fun);
    fixture.detectChanges();
    expect(component.shipped).toBeTruthy();
  });

  it('should call shipped() method should throw error', () => {
    component.data.orderId = 10;
    let fun = function fn(params: any) {
      return true;
    };
    component.shipped(fun);
    fixture.detectChanges();
    expect(component.shipped).toBeTruthy();
  });

  it('should call submit() method should throw error', () => {
    component.data.orderId = 10;
    let fun = function fn(params: any) {
      return true;
    };
    component.submit(fun);
    fixture.detectChanges();
    expect(component.submit).toBeTruthy();
  });

  it('should call toggleShipped() method', () => {
    let item = { isShipped: true };
    component.toggleShipped(item);
    fixture.detectChanges();
    expect(component.toggleShipped).toBeTruthy();
  });

  it('should call markAllShipped() method', () => {
    component.markAllShipped();
    fixture.detectChanges();
    expect(component.markAllShipped).toBeTruthy();
  });
});
