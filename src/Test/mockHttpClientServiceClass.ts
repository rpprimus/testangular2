import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class mockHttpClientServiceClass {

  constructor() { }

  post(param: any, param1: any): Observable<any> {
    console.log(param1);
    if (param1 && param1['userEmail'] == "xyz1@compunnel.in") {
      console.log("error");
      return throwError(new Error('Fake error'));
    }
    else {
      return of({
        response: { token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzODQiLCJDTEFJTV9UT0tFTl9WRVJTSU9OIjowLjIwNjY2ODY3NzA2NjE2NDU0LCJST0xFUyI6WyJVU0VSIl0sInVzZXJJZCI6Mzg0fQ.97GYLaljrFY7Sz-WQGYokvA_WEQsSpjmiYSQXmeqwOnylhCEc2_ITdTd7iRCytlbJ09j1ZemkSUh2vCyED4-tQ" },
        responseCode: "S0001",
        responseDescription: "Success"
      });

    }
  }

  get(param:any,params?):Observable<any>{
    if(JSON.stringify(params)==JSON.stringify({clientId: null,productName: "kitt"}))
      {
        return throwError(new Error('Fake error'));
      }
      else if(JSON.stringify(param)==JSON.stringify("user/v1/userinfo")){
        return of({
          "responseCode": "S0001",
          "responseDescription": "Success",
          "response": {
            "userInfo": {
              "id": 114953,
              "name": "Anjuli Maya",
              "email": "anjuli.maya@compunnel.in",
              "status": 0,
              "roles": [
                "ADMIN"
              ],
              "isPaymentDisable": false,
              "isAssociateOrdering": false
            }
          }
        })
      }
      else if(JSON.stringify(params)==JSON.stringify({clientId: undefined})){
        return of({
          "responseCode": "S0001",
          "responseDescription": "Success",
          response :
          JSON.stringify({"cart":{
          "eventDetails": {
              venue: "Test",
              city: "New Delhi",
              stateId: 10,
              stateName: "Delhi",
              countryId: 101,
              countryName: "India",
              customFieldValues: [{ customFieldId: 297, customFieldValue: "test2" }],
              clientId: 37,
              id: null,
              title: "Test2",
              start: "12-20-2020",
              end: "12-25-2020",
              addressOne: "Test2",
              addressTwo: "",
              eventZip: "112303",
          },
          additionalInfoDetails: { customFieldValues: [] },
          orderDetails: [{
              id: 212,
              orderedQuantity: 1,
              productId: 212,
              productName: "Handkerchief",
              productNumber: "19012019",
              resourceId: 45,
              availableQuantity: 100,
              maxOrderQuantity: 50,
              isKit: false,
              isPriceRange: true,
              productPrice: 1200.88,
              productMaxPrice: 1598.68,
              showPrice: false,
              onDemandTextGraphic: "",
              fileName: "bugatti_veyron_grand_sport_white.jpg",
              filePath: "a39e1910-decf-4675-a38d-febc0ff0aefdbugatti_veyron_grand_sport_white.jpg"
          }],
          pickupDetails: { customFieldValues: [] },
          serviceDetails: { customFieldValues: [] },
          shipmentDetails: { customFieldValues: [] },
          clientId: 37,
          fromDate: "12-20-2020",
          toDate: "12-25-2020",
          eventId: 186,
          requestorId: 114997,
          requestorName: "Anjuli Maya"
      }})
    })
  }
  else{
    return of({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": [
        {
          "id": 13,
          "clientId": 37,
          "resourceName": "gallery1.png",
          "file": null,
          "resouceId":39
        }
      ]
    })
  }
  }

  upload(param:any): Observable<any>{
    return of({
      response:{
        availableQuantity: 64,
        fileName: "",
        filePath: "",
        id: 207,
        isKit: false,
        isPriceRange: true,
        maxOrderQuantity: 200,
        onDemandTextGraphic: "<p>asedrtyuisedrftghyujidsfrtghyu</p>↵",
        orderedQuantity: 3,
        productId: 207,
        productMaxPrice: 434.35,
        productName: "FATest",
        productNumber: "F9891",
        productPrice: 9891.55,
        resourceId: null,
        showPrice: false,
      }
    });
  }

  delete(param:any):Observable<any>{
    return of();
  }
  getFiles(param :any): Observable<any> {
    if(JSON.stringify(param)==JSON.stringify({pathVariable: 1, kitId: 1, type: 1}))
      {
        return throwError(new Error('Fake error'));
      }
      else if(JSON.stringify(param)==JSON.stringify({pathVariable: 10})){
        return of({body:{body: Blob,
          size: 8483,
          type: "application/octate"},url:"google.com/10"}) ;
      }
      else{
    return of({body:{body: Blob,
      size: 8483,
      type: "application/json"},url:"google.com/img"}) ;
    }
  }
  loadModulesCustomFields(fn){
    return({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": {
        "modulesData": {
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
        }
      }
    });
  }
  
  put(url, urlParams?): any {
   return of(true);
  }

}