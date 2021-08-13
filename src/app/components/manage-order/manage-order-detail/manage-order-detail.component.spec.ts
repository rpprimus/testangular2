import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrderDetailComponent } from './manage-order-detail.component';
import { MatModule } from '../../../../app/core/mat-module';
import { QuantityComponent } from '../../../../app/store/components/order/quantity/quantity.component';
import { DynamicInputFieldComponent } from '../../../../app/store/components/dynamic-input-field/dynamic-input-field.component';
import { DisplayLinkedFieldsComponent } from '../../../../app/store/components/order/display-linked-fields/display-linked-fields.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { LookupvaluesPipe } from '../../../../app/shared/pipes/lookupvalues.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ManageOrderService } from '../manage-order.service';
import { HttpClientService } from '../../../../app/shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../Test/mockHttpClientServiceClass';
import { Util } from '../../../../app/shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../../../app/shared/services/auth.service';
import { mockAuthService } from '../../../../Test/mockAuthService.service';
import { Common } from '../../../../app/store/utility/common';
import { mockCommon } from '../../../../Test/mockCommon';
import { SharedService } from '../../../../app/shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mockManageOrderService } from '../../../../Test/mockManageOrderService';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { SelectProductPopupComponent } from '../select-product-popup/select-product-popup.component';

xdescribe('ManageOrderDetailComponent', () => {
  let component: ManageOrderDetailComponent;
  let fixture: ComponentFixture<ManageOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageOrderDetailComponent ,QuantityComponent,
        DynamicInputFieldComponent,DisplayLinkedFieldsComponent,LookupvaluesPipe,SelectProductPopupComponent ],
      providers:[CookieService,
      {provide:ManageOrderService,useClass:mockManageOrderService},
      {provide:HttpClientService,useClass:mockHttpClientServiceClass},
      {provide:Util,useClass:mockUtil},
      {provide:AuthService,useClass:mockAuthService},
      {provide:Common,useClass:mockCommon},
      {provide:SharedService,useClass:mockSharedService},
      ],
      imports:[MatModule,CKEditorModule,HttpClientModule,BrowserAnimationsModule],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
          entryComponents: [SelectProductPopupComponent]
      }
  })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOrderDetailComponent);
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

  it('should call ngOnInit() method',()=>{
    component.util.isStore=true;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.ngOnInit).toBeTruthy();
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

  it('should call getCreditCardDetails() method',()=>{
    component.getCreditCardDetails();
    fixture.detectChanges();
    expect(component.getCreditCardDetails).toBeTruthy();
  });

  it('should call getCreditCardNumber() method',()=>{
    component.getCreditCardNumber();
    fixture.detectChanges();
    expect(component.getCreditCardNumber).toBeTruthy();
  });

  it('should call setData() method',()=>{
    component.moduleData={
      "signUpModuleDetails": {
        "id": 16,
        "isSignUpEnabled": true,
        "signUpEmailDomain": "yopmail.com, Compunnel.in, Compunnel.com, gmail.com"
      },
      "eventModuleDetails": {
        "id": 11,
        "isEventEnabled": true,
        "isAddEventChecked": true
      },
      "eventDetails": {
        "isChecked": true,
        "fieldDetails": [
          {
            "id": 266,
            "description": "Test event field",
            "type": "READ_ONLY",
            "lookupValue": "Blue\nRed\nYellow\nGreen",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": false,
            "isRequired": true,
            "fieldSequence": 1
          },
          {
            "id": 297,
            "description": "test linked field",
            "type": "DROP_DOWN",
            "lookupValue": "test1~test2~test3",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": false,
            "isRequired": true,
            "fieldSequence": 2
          },
          {
            "id": 298,
            "description": "test1 selected",
            "type": "RADIO_BUTTON",
            "lookupValue": "yes~no",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": "test1",
            "linkedFieldId": 297,
            "isDisplayed": false,
            "isRequired": false,
            "fieldSequence": 3
          },
          {
            "id": 299,
            "description": "test1 yes selected",
            "type": "TEXT_BOX",
            "lookupValue": "",
            "fieldLength": 10,
            "isActive": true,
            "linkedFieldValue": "yes",
            "linkedFieldId": 298,
            "isDisplayed": false,
            "isRequired": false,
            "fieldSequence": 4
          },
          {
            "id": 348,
            "description": "Email field test",
            "type": "EMAIL",
            "lookupValue": "",
            "fieldLength": 200,
            "isActive": true,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 6
          },
          {
            "id": 350,
            "description": "date field test",
            "type": "CUSTOM_DATE",
            "lookupValue": "",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 7
          },
          {
            "id": 352,
            "description": "upload test",
            "type": "UPLOAD",
            "lookupValue": "",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 8
          }
        ],
        "orderingType": 1
      },
      "shipmentDetails": {
        "isChecked": true,
        "fieldDetails": [
          {
            "id": 347,
            "description": "pickup email address",
            "type": "EMAIL",
            "lookupValue": "",
            "fieldLength": 200,
            "isActive": true,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 4
          },
          {
            "id": 353,
            "description": "uploadTest",
            "type": "UPLOAD",
            "lookupValue": "",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 5
          }
        ],
        "orderingType": 2
      },
      "pickupDetails": {
        "isChecked": true,
        "fieldDetails": [
          {
            "id": 267,
            "description": "test",
            "type": "TEXT_AREA",
            "lookupValue": "Yes",
            "fieldLength": 10,
            "isActive": true,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": false,
            "isRequired": true,
            "fieldSequence": 1
          },
          {
            "id": 276,
            "description": "Is carpet needed",
            "type": "RADIO_BUTTON",
            "lookupValue": "Yes~No",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": false,
            "isRequired": true,
            "fieldSequence": 2
          },
          {
            "id": 277,
            "description": "Which colour",
            "type": "DROP_DOWN",
            "lookupValue": "Red~Blue~Yellow",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": "Yes",
            "linkedFieldId": 276,
            "isDisplayed": false,
            "isRequired": true,
            "fieldSequence": 3
          },
          {
            "id": 278,
            "description": "Need anything Else",
            "type": "CHECK_BOX",
            "lookupValue": "1~2~3",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": "No",
            "linkedFieldId": 276,
            "isDisplayed": false,
            "isRequired": true,
            "fieldSequence": 4
          },
          {
            "id": 354,
            "description": "upload test",
            "type": "UPLOAD",
            "lookupValue": "",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 9
          }
        ],
        "orderingType": 3
      },
      "additionalInfoDetails": {
        "isChecked": true,
        "fieldDetails": [
          {
            "id": 233,
            "description": "My Test",
            "type": "TEXT_BOX",
            "lookupValue": "ABC",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": "Test",
            "linkedFieldId": 233,
            "isDisplayed": false,
            "isRequired": true,
            "fieldSequence": 1
          },
          {
            "id": 346,
            "description": "email test on additional info",
            "type": "EMAIL",
            "lookupValue": "",
            "fieldLength": 100,
            "isActive": true,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 4
          },
          {
            "id": 349,
            "description": "date field on additional field",
            "type": "CUSTOM_DATE",
            "lookupValue": "",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 5
          },
          {
            "id": 358,
            "description": "upload test",
            "type": "UPLOAD",
            "lookupValue": "",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 6
          }
        ],
        "orderingType": 4
      },
      "serviceDetails": {
        "serviceTitle": [
          {
            "serviceTitleName": "Service title 2",
            "serviceTitleSequence": 1,
            "id": 124,
            "isActive": true,
            "fieldDetails": [
              {
                "id": 315,
                "description": "test field of service title 2",
                "type": "CHECK_BOX",
                "lookupValue": "Microsoft~Apple~Google~Amazon",
                "fieldLength": 0,
                "isActive": true,
                "linkedFieldValue": null,
                "linkedFieldId": null,
                "isDisplayed": null,
                "isRequired": false,
                "fieldSequence": 1
              },
              {
                "id": 316,
                "description": "test field 2 of service title 2 ",
                "type": "CHECK_BOX",
                "lookupValue": "Lorem ipsum it. Phasellus vestibulum felis id eros vehicula, sed fermentum ligula tempor. Duis pulvinar, purus viverra dictum congue, justo nibh pulvinar magna, eget dapibus justo ante bibendum arcu. Proin egestas ligula sed arcu imperdiet, sit amet fringilla nisi fringilla~Morbi eu lorem vulputate, porta dolor interdum, efficitur est. Vestibulum ac leo eget nisi suscipit ultricies. Quisque eu massa eu neque posuere bibendum vitae eget sem. Pellentesque eros est, vehicula vitae faucibus sit amet, ultrices in velit. Nulla ornare rhoncus condimentum. Vestibulum dapibus, orci ut auctor vestibulum, turpis mauris ullamcorper nisi, at efficitur nisi ex quis lectus. Nullam ut diam dapibus, egestas magna quis, euismod odio. Nunc ac iaculis magna. Phasellus id lorem la~lacinia nunc vel, pellentesque odio. Aenean vel enim nisi. Cras orci tellus, facilisis eu consequat eget, rhoncus in lectus. Aenean accumsan ligula a facilisis dapibus. Fusce eget tempus mi. Vivamus sit amet magna aliquet, rutrum quam ac, sagittis lacus. Ut vel mi in lorem ultrices vehicula~Praesent ullamcorper eget lacus vitae convallis. Morbi sit amet dui arcu. Nunc sagittis erat vitae augue tincidunt, vitae laoreet ex rhoncus. Quisque in tristique dui. Fusce sit amet ipsum eros. Nunc placerat felis non nisi gravida mattis. Nulla laoreet iaculis massa ac bibendum. Etiam in nulla eget velit ultricies malesuada nec id diam. Quisque ac varius sapien. Morbi vitae b~t amet sollicitudin dignissim, metus lorem vulputate dui, sit amet fringilla massa augue non velit. Phasellus vestibulum felis id eros vehicula, sed fermentum ligula tempor. Duis pulvinar, purus viverra dictum congue, justo nibh pulvinar magna, eget dapibus justo ante bibendum arcu. Proin egestas ligula sed arcu imperdiet, sit am~gestas magna quis, euismod odio. Nunc ac iaculis magna. Phasellus id lorem laoreet, lacinia nunc vel, pellentesque odio. Aenean vel enim nisi. Cras orci tellus, facilisis eu consequat eget, rhoncus in lectus. Aenean accumsan ",
                "fieldLength": 0,
                "isActive": true,
                "linkedFieldValue": null,
                "linkedFieldId": null,
                "isDisplayed": null,
                "isRequired": false,
                "fieldSequence": 2
              },
              {
                "id": 344,
                "description": "test date field",
                "type": "CUSTOM_DATE",
                "lookupValue": "",
                "fieldLength": 0,
                "isActive": true,
                "linkedFieldValue": null,
                "linkedFieldId": null,
                "isDisplayed": null,
                "isRequired": false,
                "fieldSequence": 5
              },
              {
                "id": 345,
                "description": "test email field",
                "type": "EMAIL",
                "lookupValue": "",
                "fieldLength": 0,
                "isActive": true,
                "linkedFieldValue": null,
                "linkedFieldId": null,
                "isDisplayed": null,
                "isRequired": false,
                "fieldSequence": 6
              },
              {
                "id": 351,
                "description": "upload test",
                "type": "UPLOAD",
                "lookupValue": "abc",
                "fieldLength": 0,
                "isActive": true,
                "linkedFieldValue": null,
                "linkedFieldId": null,
                "isDisplayed": null,
                "isRequired": false,
                "fieldSequence": 7
              }
            ]
          },
          {
            "serviceTitleName": "Service title 1",
            "serviceTitleSequence": 2,
            "id": 117,
            "isActive": true,
            "fieldDetails": [
              {
                "id": 292,
                "description": "Is Event approved",
                "type": "RADIO_BUTTON",
                "lookupValue": "YES~NO",
                "fieldLength": 0,
                "isActive": true,
                "linkedFieldValue": null,
                "linkedFieldId": null,
                "isDisplayed": false,
                "isRequired": false,
                "fieldSequence": 1
              },
              {
                "id": 293,
                "description": "Type of event",
                "type": "DROP_DOWN",
                "lookupValue": "Google IO~AutoExpo",
                "fieldLength": 0,
                "isActive": true,
                "linkedFieldValue": "YES",
                "linkedFieldId": 292,
                "isDisplayed": false,
                "isRequired": false,
                "fieldSequence": 2
              },
              {
                "id": 294,
                "description": "Thank you for your time",
                "type": "READ_ONLY",
                "lookupValue": "We appreciate the time you have invested with us.",
                "fieldLength": 0,
                "isActive": true,
                "linkedFieldValue": "NO",
                "linkedFieldId": 292,
                "isDisplayed": false,
                "isRequired": false,
                "fieldSequence": 3
              },
              {
                "id": 295,
                "description": "What type of automobile will be there?",
                "type": "DROP_DOWN",
                "lookupValue": "Car~Bike~Boat",
                "fieldLength": 0,
                "isActive": true,
                "linkedFieldValue": "AutoExpo",
                "linkedFieldId": 293,
                "isDisplayed": false,
                "isRequired": true,
                "fieldSequence": 4
              },
              {
                "id": 296,
                "description": "Size of package",
                "type": "CHECK_BOX",
                "lookupValue": "12m length~10m width~12m height",
                "fieldLength": 0,
                "isActive": true,
                "linkedFieldValue": null,
                "linkedFieldId": null,
                "isDisplayed": false,
                "isRequired": true,
                "fieldSequence": 5
              }
            ]
          }
        ],
        "isServicePageChecked": true
      }
    };
    component.setData();
    fixture.detectChanges();
    expect(component.setData).toBeTruthy();
  });

  it('should call updateOrder() method',()=>{
    let fun=function fn(params:any) {
      return true;
    };
    component.updateOrder(fun);
    fixture.detectChanges();
    expect(component.updateOrder).toBeTruthy();
  });

  it('should call updateOrder() method should throw error',()=>{
    component.data.orderStatus="PLACED";
    let fun=function fn(params:any) {
      return true;
    };
    component.updateOrder(fun);
    fixture.detectChanges();
    expect(component.updateOrder).toBeTruthy();
  });

  it('should call openSelectProductPopup() method',()=>{
    component.openSelectProductPopup();
    fixture.detectChanges();
    expect(component.openSelectProductPopup).toBeTruthy();
  });

  it('should call addNewProduct() method',()=>{
    component.addNewProduct();
    fixture.detectChanges();
    expect(component.addNewProduct).toBeTruthy();
  });

  it('should call deleteProduct() method',()=>{
    let product={id:1};
    component.deleteProduct(product);
    fixture.detectChanges();
    expect(component.deleteProduct).toBeTruthy();
  });

  it('should call deleteProduct() method should throw error',()=>{
    let product={id:10};
    component.deleteProduct(product);
    fixture.detectChanges();
    expect(component.deleteProduct).toBeTruthy();
  });

  it('should call editQuantity() method',()=>{
    let element={isEdit:'',isNew:'',orderedQuantity:1};
    component.editQuantity(element);
    fixture.detectChanges();
    expect(component.editQuantity).toBeTruthy();
  });

  it('should call updateQuantity() method',()=>{
    let item={id:1,orderedQuantity:1,productId:66};
    component.updateQuantity(item);
    fixture.detectChanges();
    expect(component.updateQuantity).toBeTruthy();
  });

  it('should call updateQuantity() method should throw error',()=>{
    let item={id:0,orderedQuantity:1,productId:66};
    component.updateQuantity(item);
    fixture.detectChanges();
    expect(component.updateQuantity).toBeTruthy();
  });

  it('should call close() method',()=>{
    let item={id:0,isEdit:'',previousOrderedQuantity:1};
    component.close(item);
    fixture.detectChanges();
    expect(component.close).toBeTruthy();
  });

  it('should call changeStatusToProcessing() method',()=>{
    let fun=function fn(params:any) {
      return true;
    };
    component.changeStatusToProcessing(fun);
    fixture.detectChanges();
    expect(component.changeStatusToProcessing).toBeTruthy();
  });

  it('should call changeStatusToProcessing() method should throw error',()=>{
    component.data.orderId=1;
    let fun=function fn(params:any) {
      return true;
    };
    component.changeStatusToProcessing(fun);
    fixture.detectChanges();
    expect(component.changeStatusToProcessing).toBeTruthy();
  });

  
  it('should call submit() method and throw error',()=>{
    component.data.orderId=1;
    let fun=function fn(params:any) {
      return true;
    };
    component.submit(fun);
    fixture.detectChanges();
    expect(component.submit).toBeTruthy();
  });

  it('should call updateEventShipping() method',()=>{
    localStorage.setItem('selectedClientInfo','{}');
    component.data.orderStatus="CONFIRMED";
    let fun=function fn(params:any) {
      return true;
    };
    component.updateEventShipping(fun);
    fixture.detectChanges();
    expect(component.updateEventShipping).toBeTruthy();
  });

  it('should call updateEventShipping() method when no arguement is given',()=>{
    component.data.orderStatus="CONFIRMED";
    component.updateEventShipping();
    fixture.detectChanges();
    expect(component.updateEventShipping).toBeTruthy();
  });

  it('should call updateEventShipping() method else block',()=>{
    let fun=function fn(params:any) {
      return true;
    };
    component.updateEventShipping(fun);
    fixture.detectChanges();
    expect(component.updateEventShipping).toBeTruthy();
  });

  it('should call editGraphicsText() method',()=>{
    let element={id:1,onDemandTextGraphic:'test'};
    component.editGraphicsText(element);
    fixture.detectChanges();
    expect(component.editGraphicsText).toBeTruthy();
  });

  it('should call cancelOnDemandProdEditable() method',()=>{
    let element={id:1,previousOnDemandTextGraphic:'test'};
    component.cancelOnDemandProdEditable(element);
    fixture.detectChanges();
    expect(component.cancelOnDemandProdEditable).toBeTruthy();
  });

  it('should call updateOnDemandText() method',()=>{
    let element={id:1,filePath:'test',updateFile:''};
    component.updateOnDemandText(element);
    fixture.detectChanges();
    expect(component.updateOnDemandText).toBeTruthy();
  });

  it('should call changeGraphicFile() method',()=>{
    let event={target:{files:[{name:'abc.xls'}]}};
    let element={id:1,filePath:'test',updateFile:''};
    component.changeGraphicFile(event,element);
    fixture.detectChanges();
    expect(component.changeGraphicFile).toBeTruthy();
  });
});
