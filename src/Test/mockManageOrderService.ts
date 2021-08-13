import { Observable, of, throwError } from "rxjs";

export class mockManageOrderService{

    getOrders(param):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({orderId: "1"})){
        return of({
          "responseCode": "S0001",
          "responseDescription": "Success",
          "response": {
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
          }
        });
      }
      else{
        return throwError(new Error('Fake error'));
      }
    }

    updateOrder(param):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({orderId: 51, ampProjectNo: 2432, workOrderTaskNo: "erww", notes: "wff"})){
        return of(true);
      }
      else{
        return throwError(new Error('Fake error'));
      }
    }

    updateOrderDetail(param):Observable<any>{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "id": 259
            }
          });
    }

    searchProduct(param):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({productName: "AMC",clientId: null})){
        return throwError(new Error('Fake error'));
      }
      else{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": [
              {
                "productId": 1971,
                "resouceId": 10,
                "productNumber": "12786657",
                "productName": "Iphone XI_X1_test",
                "categories": "X11",
                "maxOrderQuantity": 1
              },
              {
                "productId": 1972,
                "resouceId": 11,
                "productNumber": "12786658",
                "productName": "Iphone XI_X1_test1",
                "categories": "X12",
                "maxOrderQuantity": 1
              }
            ]
          });
        }
    }

    getProductInfo(param):Observable<any>{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "id": null,
              "productId": 1971,
              "productName": "Iphone XI_X1_test",
              "productNumber": "12786657",
              "categories": "X11",
              "availableQuantity": 88,
              "maxOrderQuantity": 1,
              "receiveQuantity": null,
              "lostQuantity": null,
              "damageQuantity": null,
              "orderId": null,
              "isShipped": null,
              "reasonId": null,
              "isReturnable": null,
              "fileName": null,
              "filePath": null,
              "onDemandTextGraphic": null,
              "orderedQuantity": null
            }
          });
    }

    updateQuantity(param):Observable<any>{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "id": 259
            }
          });
    }

    updateOrderToConfirm(param):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({orderId: 51, ampProjectNo: 2432, workOrderTaskNo: "erww", notes: "wff"})){
        return throwError(new Error('Fake error'));
        }
        else{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "id": 259
            }
          });
        }
    }

    addNewProduct(param):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({orderId: 51, orderedQuantity: 1, productId: 66, id: 0})){
        return throwError(new Error('Fake error'));
        }
        else{
          return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "id": 259
            }
          });
        }
    }

    changeStatustoProcessing(param):Observable<any>{
        if(JSON.stringify(param)==JSON.stringify({pathVariable: 1})){
          return throwError(new Error('Fake error'));
        }
        else{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "id": 314
            }
          });
        }
        
    }

    updateFreigthDetails(param):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({pathVariable: 219, boxCount: 1, dimensionDetails: [{id: 10,length: "100px",width: "100px",height: "100px",weight: "20",isActive: true}], notes: "", freightDetailDisable: false})){
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "id": 314
            }
          });
        }
        else{
          return throwError(new Error('Fake error'));
        }
    }

    changeStatustoReadyToShip(param):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({pathVariable: 219})){
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "id": 314
            }
          });
        }
        else{
          return throwError(new Error('Fake error'));
        }
    }

    getShipmentReasons(param):Observable<any>{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": [
              {
                "id": 48,
                "name": "OTHER",
                "checked": false
              },
              {
                "id": 47,
                "name": "Product Damaged",
                "checked": false
              },
              {
                "id": 46,
                "name": "Product Not Available",
                "checked": false
              }
            ]
          });
    }

    updateCarrierDetails(param):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({pathVariable: 10,orderShipmentDetails: [],orderCarrierDetails: [],isorderCarrierDetailDisable: false})){
        return throwError(new Error('Fake error'));
        }
        else{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "id": 314
            }
          });
        }
    }

    changeStatustoShipped(param):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({pathVariable: 10,})){
        return throwError(new Error('Fake error'));
        }
        else{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "id": 314
            }
          });
        }
    }

    getWarehouseList(param):Observable<any>{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": [
              {
                "id": 63,
                "isEdit": null,
                "checked": false,
                "name": "LA Warehouse"
              },
              {
                "id": 72,
                "isEdit": null,
                "checked": false,
                "name": "PHL Warehouse"
              },
              {
                "id": 73,
                "isEdit": null,
                "checked": false,
                "name": "LVA Warehouse"
              },
              {
                "id": 74,
                "isEdit": null,
                "checked": false,
                "name": "ATL Warehouse"
              },
              {
                "id": 75,
                "isEdit": null,
                "checked": false,
                "name": "UK Warehouse"
              },
              {
                "id": 76,
                "isEdit": null,
                "checked": false,
                "name": "Canada Warehouse"
              },
              {
                "id": 77,
                "isEdit": null,
                "checked": false,
                "name": "TestWarehouse_009!@#$^%$^%"
              },
              {
                "id": 78,
                "isEdit": null,
                "checked": false,
                "name": "Testunfg"
              },
              {
                "id": 79,
                "isEdit": null,
                "checked": false,
                "name": "1234"
              },
              {
                "id": 80,
                "isEdit": null,
                "checked": false,
                "name": "Test123"
              }
            ]
          });
    }

    updateReceivingDetail(param):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({receivingNote: null,returnDetails: [],pathVariable: 10,})){
        return throwError(new Error('Fake error'));
        }
        else{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "id": 314
            }
          });
        }
    }

    changeStatusToReturned(param):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({pathVariable: 10,})){
        return throwError(new Error('Fake error'));
        }
        else{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "id": 314
            }
          });
        }
    }

    changeStatusToComplete(param):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({receivingNote: null,returnDetails: [],pathVariable: 10,})){
        return throwError(new Error('Fake error'));
        }
        else{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "id": 314
            }
          });
        }
    }

    cancelOrder(param):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({pathVariable: "1"})){
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "id": 314
            }
          });
        }
        else{
          return throwError(new Error('Fake error'));
        }
    }

    printOrder(param):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({orderId: "1"})){
        return of({body:{type:"application/octat"}});
    }
    else{
      return throwError(new Error('Fake error'));
    }
    }

    deleteProductOnOrder(param):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({orderId: 51, id: 10})){
        return throwError(new Error('Fake error'));
      }
      else{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "id": 314
            }
          });
        }
    }

    getCreditCardForCardAdmin(param):Observable<any>{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "id": 314,
              "result":{"securityTwo":"test"}
            }
          });
    }

    getClientSetting(param):Observable<any>{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "settings": {
                "isClientProductName": true,
                "clientProductName": "string",
                "isVisibilityRestriction": true,
                "visibilityRestriction": [
                  {
                    "id": 81,
                    "visibilityGroupName": "Visiblity One",
                    "isDefault": true
                  },
                  {
                    "id": 82,
                    "visibilityGroupName": "Visiblity Two",
                    "isDefault": false
                  },
                  {
                    "id": 83,
                    "visibilityGroupName": "Visiblity Three",
                    "isDefault": false
                  },
                  {
                    "id": 95,
                    "visibilityGroupName": "Visiblity Four",
                    "isDefault": false
                  },
                  {
                    "id": 118,
                    "visibilityGroupName": "Visiblity Five",
                    "isDefault": false
                  },
                  {
                    "id": 119,
                    "visibilityGroupName": "Visiblity Five",
                    "isDefault": false
                  },
                  {
                    "id": 139,
                    "visibilityGroupName": "ALL",
                    "isDefault": false
                  },
                  {
                    "id": 141,
                    "visibilityGroupName": "string",
                    "isDefault": false
                  }
                ],
                "isHierarchy": true,
                "hierarchyLabelName": "string",
                "hierarchy": [
                  {
                    "id": 88,
                    "hierarchyName": "string"
                  }
                ],
                "isEventEnable": true,
                "primaryAccountManagerId": null,
                "primaryAccountManagerName": null,
                "welcomeTxt": "string",
                "welcomeTitle": "string",
                "expirationDaysLimit": 60,
                "creditCardPayment": true,
                "welcome": true
              }
            }
          });
    }

    loadModulesCustomFields(fn):Observable<any>{
        return of({
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
          });
    }
}