import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageReceivingDetailComponent } from './manage-receiving-detail.component';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { ManageOrderService } from '../manage-order.service';
import { mockManageOrderService } from '../../../../Test/mockManageOrderService';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { SharedService } from '../../../shared/services/shared.service';
import { MatModule } from '../../../core/mat-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('ManageReceivingDetailComponent', () => {
  let component: ManageReceivingDetailComponent;
  let fixture: ComponentFixture<ManageReceivingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageReceivingDetailComponent ],
      imports: [MatModule,BrowserAnimationsModule],
      providers: [{provide:SharedService,useClass:mockSharedService},{provide:ManageOrderService,useClass:mockManageOrderService},
      {provide:Util,useClass:mockUtil}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageReceivingDetailComponent);
    component = fixture.componentInstance;
    component.data={
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
      "cardInfo": {"securityOne":"test","requestorId":10,"cardId":1},
      "creditDetails":{"number":123},
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

  it('should call getOrders() method',()=>{
    let data={
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

  it('should call submitReceivingDetails() method if block',()=>{
    let fun=function fn(params:any) {
      return true;
    };
    component.submitReceivingDetails(fun);
    fixture.detectChanges();
    expect(component.submitReceivingDetails).toBeTruthy();
  });

  it('should call submitReceivingDetails() method else block',()=>{
    component.isFormSubmitted=true;
    let fun=function fn(params:any) {
      return true;
    };
    component.submitReceivingDetails(fun);
    fixture.detectChanges();
    expect(component.submitReceivingDetails).toBeTruthy();
  });

  it('should call submitReceivingDetails() method should throw error',()=>{
    component.data.orderId=10;
    let fun=function fn(params:any) {
      return true;
    };
    component.submitReceivingDetails(fun);
    fixture.detectChanges();
    expect(component.submitReceivingDetails).toBeTruthy();
  });

  it('should call checkValid() method if block',()=>{
    component.data.warehouseId=null;
    component.checkValid();
    fixture.detectChanges();
    expect(component.checkValid).toBeTruthy();
  });

  it('should call checkValid() method else block',()=>{
    component.data.orderReceiveDate=null;
    component.checkValid();
    fixture.detectChanges();
    expect(component.checkValid).toBeTruthy();
  });

  it('should call changeStatusToReturned() method if block',()=>{
    let fun=function fn(params:any) {
      return true;
    };
    component.changeStatusToReturned(fun);
    fixture.detectChanges();
    expect(component.changeStatusToReturned).toBeTruthy();
  });

  it('should call changeStatusToReturned() method else block',()=>{
    component.isFormSubmitted=true;
    let fun=function fn(params:any) {
      return true;
    };
    component.changeStatusToReturned(fun);
    fixture.detectChanges();
    expect(component.changeStatusToReturned).toBeTruthy();
  });

  it('should call changeStatusToReturned() method should throw error',()=>{
    component.data.orderId=10;
    let fun=function fn(params:any) {
      return true;
    };
    component.changeStatusToReturned(fun);
    fixture.detectChanges();
    expect(component.changeStatusToReturned).toBeTruthy();
  });

  it('should call submit() method should throw error',()=>{
    component.data.orderId=10;
    let fun=function fn(params:any) {
      return true;
    };
    component.submit(fun);
    fixture.detectChanges();
    expect(component.submit).toBeTruthy();
  });

  it('should call changeStatusToComplete() method if block',()=>{
    let fun=function fn(params:any) {
      return true;
    };
    component.changeStatusToComplete(fun);
    fixture.detectChanges();
    expect(component.changeStatusToComplete).toBeTruthy();
  });

  it('should call changeStatusToComplete() method else block',()=>{
    component.isFormSubmitted=true;
    let fun=function fn(params:any) {
      return true;
    };
    component.changeStatusToComplete(fun);
    fixture.detectChanges();
    expect(component.changeStatusToComplete).toBeTruthy();
  });

  it('should call changeStatusToComplete() method should throw error',()=>{
    component.data.orderId=10;
    let fun=function fn(params:any) {
      return true;
    };
    component.changeStatusToComplete(fun);
    fixture.detectChanges();
    expect(component.changeStatusToComplete).toBeTruthy();
  });
});
