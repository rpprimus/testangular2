import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class mockStoreService {

  constructor() { }

  getHierarchy(param: any): Observable<any> {
    return of(
      {
        "responseCode": "S0001",
        "responseDescription": "Success",
        "response": {
          "hierachyLabelName": "Department",
          "hierarchies": [
            {
              "id": 75,
              "checked": false,
              "name": "Technology"
            },
            {
              "id": 76,
              "checked": false,
              "name": "Creative"
            },
            {
              "id": 77,
              "checked": false,
              "name": "Events"
            }
          ]
        }
      }
    );
  }
  getCategories(param: any): Observable<any> {
    return of({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": [
        {
          "id": 90,
          "parentId": null,
          "name": "Electronics",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 127
        },
        {
          "id": 91,
          "parentId": 90,
          "name": "Mobiles",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 91
        },
        {
          "id": 92,
          "parentId": 91,
          "name": "iPhone",
          "title": "<p>Testing 1</p>\n",
          "description": "<p>Testing 2</p>\n",
          "isActive": "true",
          "isInfoAvailable": "true",
          "sequenceNumber": 92
        },
        {
          "id": 123,
          "parentId": 92,
          "name": "Testing",
          "title": "<p>Testing&nbsp;</p>\n",
          "description": "<p>Testing 2</p>\n",
          "isActive": "true",
          "isInfoAvailable": "true",
          "sequenceNumber": 123
        },
        {
          "id": 142,
          "parentId": 123,
          "name": "test 1",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 142
        },
        {
          "id": 109,
          "parentId": null,
          "name": "Men",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 96
        },
        {
          "id": 110,
          "parentId": 109,
          "name": "T-Shirts",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 110
        },
        {
          "id": 111,
          "parentId": 110,
          "name": "Sports T-Shirt",
          "title": "<p>Test Title</p>\n",
          "description": "<p>This is a test description</p>\n",
          "isActive": "true",
          "isInfoAvailable": "true",
          "sequenceNumber": 111
        },
        {
          "id": 127,
          "parentId": null,
          "name": "Exhibit Components",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 109
        },
        {
          "id": 128,
          "parentId": 127,
          "name": "Banners",
          "title": "<p><strong><font color=\"null\">Banner Info</font></strong></p>\n",
          "description": "<ul>\n\t<li><strong>Bacon </strong><strong>ipsum</strong> dolor amet turkey boudin pork, pork loin hamburger ham hock tenderloin ham brisket pastrami kevin. Short ribs burgdoggen jerky, boudin cow meatball ball tip kevin ham tenderloin. Brisket pork chop chuck sirloin andouille ham hock short ribs shank tenderloin jowl pastrami short loin. Picanha sirloin ground round ribeye ham brisket.</li>\n\t<li>Jerky ham hock short ribs prosciutto landjaeger sirloin hamburger pancetta filet mignon. Pork loin shoulder hamburger capicola sausage, beef ribs ham boudin rump jowl leberkas. Drumstick filet mignon capicola rump tri-tip biltong short ribs bacon ham hock short loin chicken swine andouille. Ribeye jerky leberkas, drumstick pancetta pork chop kevin flank kielbasa ham hock tenderloin ground round. Tongue burgdoggen jerky andouille short loin meatloaf. Tri-tip meatball pork belly jowl meatloaf pork loin turkey rump prosciutto chicken venison. Chuck turducken pork chop jowl meatloaf meatball ball tip alcatra beef ribs hamburger salami andouille.</li>\n\t<li>Swine meatball kielbasa, hamburger pork loin alcatra chuck. Tri-tip shoulder spare ribs burgdoggen tail leberkas swine landjaeger jerky short ribs. Ham hock sirloin andouille shankle ribeye ground round fatback doner chuck rump. Ribeye flank shank andouille.</li>\n</ul>\n",
          "isActive": "true",
          "isInfoAvailable": "true",
          "sequenceNumber": 129
        },
        {
          "id": 129,
          "parentId": 127,
          "name": "Pop-up Displays",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 128
        },
        {
          "id": 144,
          "parentId": null,
          "name": "Birlasoft",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 149
        },
        {
          "id": 145,
          "parentId": 144,
          "name": "Birlasoft child",
          "title": "Testing throug 2nd Time API",
          "description": "The Qcuik brown fox jumps over a little lazy dog.",
          "isActive": "true",
          "isInfoAvailable": "true",
          "sequenceNumber": 145
        },
        {
          "id": 146,
          "parentId": 145,
          "name": "Birlasoft 2nd Child",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 645
        },
        {
          "id": 147,
          "parentId": 146,
          "name": "Birlasoft 3rd Child",
          "title": "Testing throug 2nd Time API",
          "description": "The Qcuik brown fox jumps over a little lazy dog.",
          "isActive": "true",
          "isInfoAvailable": "true",
          "sequenceNumber": 148
        },
        {
          "id": 148,
          "parentId": 146,
          "name": "Birlasoft 4rth Child",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 147
        },
        {
          "id": 645,
          "parentId": 145,
          "name": "Birla 2nd Level",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 146
        },
        {
          "id": 149,
          "parentId": null,
          "name": "TCS",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 144
        },
        {
          "id": 150,
          "parentId": 149,
          "name": "TCS child",
          "title": "Testing throug 2nd Time API",
          "description": "The Qcuik brown fox jumps over a little lazy dog.",
          "isActive": "true",
          "isInfoAvailable": "true",
          "sequenceNumber": 150
        },
        {
          "id": 151,
          "parentId": 150,
          "name": "TCS 2nd Child",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 151
        },
        {
          "id": 152,
          "parentId": 151,
          "name": "TCS 3rd Child",
          "title": "Testing throug 2nd Time API",
          "description": "The Qcuik brown fox jumps over a little lazy dog.",
          "isActive": "true",
          "isInfoAvailable": "true",
          "sequenceNumber": 152
        },
        {
          "id": 153,
          "parentId": 151,
          "name": "TCS 4rth Child",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 153
        },
        {
          "id": 154,
          "parentId": null,
          "name": "Birlasoft",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 154
        },
        {
          "id": 155,
          "parentId": null,
          "name": "Great Parent",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 155
        },
        {
          "id": 156,
          "parentId": 155,
          "name": "Great Parent child",
          "title": "Testing throug 2nd Time API",
          "description": "The Qcuik brown fox jumps over a little lazy dog.",
          "isActive": "true",
          "isInfoAvailable": "true",
          "sequenceNumber": 156
        },
        {
          "id": 157,
          "parentId": 156,
          "name": "Great Parent 2nd Child",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 157
        },
        {
          "id": 158,
          "parentId": 157,
          "name": "Great Parent 3rd Child",
          "title": "Testing throug 2nd Time API",
          "description": "The Qcuik brown fox jumps over a little lazy dog.",
          "isActive": "true",
          "isInfoAvailable": "true",
          "sequenceNumber": 158
        },
        {
          "id": 584,
          "parentId": null,
          "name": "Great Grea",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 584
        },
        {
          "id": 585,
          "parentId": 584,
          "name": "Great child 2",
          "title": "Testing throug 2nd Time API",
          "description": "The Qcuik brown fox jumps over a little lazy dog.",
          "isActive": "true",
          "isInfoAvailable": "true",
          "sequenceNumber": 585
        },
        {
          "id": 586,
          "parentId": null,
          "name": "Main",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 586
        },
        {
          "id": 587,
          "parentId": 586,
          "name": "Great child 6",
          "title": "Testing throug 2nd Time API",
          "description": "The Qcuik brown fox jumps over a little lazy dog.",
          "isActive": "true",
          "isInfoAvailable": "true",
          "sequenceNumber": 587
        },
        {
          "id": 588,
          "parentId": 586,
          "name": "Great child 9",
          "title": "Testing throug 2nd Time API",
          "description": "The Qcuik brown fox jumps over a little lazy dog.",
          "isActive": "true",
          "isInfoAvailable": "true",
          "sequenceNumber": 588
        },
        {
          "id": 589,
          "parentId": 588,
          "name": "Great child 10",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 589
        },
        {
          "id": 630,
          "parentId": null,
          "name": "AB",
          "title": "",
          "description": "",
          "isActive": "true",
          "isInfoAvailable": "true",
          "sequenceNumber": 630
        },
        {
          "id": 631,
          "parentId": 630,
          "name": "AC",
          "title": "",
          "description": "",
          "isActive": "true",
          "isInfoAvailable": "true",
          "sequenceNumber": 631
        },
        {
          "id": 632,
          "parentId": 630,
          "name": "AD",
          "title": "Testing throug 2nd Time API",
          "description": "The Qcuik brown fox jumps over a little lazy dog.",
          "isActive": "true",
          "isInfoAvailable": "true",
          "sequenceNumber": 632
        },
        {
          "id": 633,
          "parentId": 630,
          "name": "AE",
          "title": "Testing throug 2nd Time API",
          "description": "The Qcuik brown fox jumps over a little lazy dog.",
          "isActive": "true",
          "isInfoAvailable": "true",
          "sequenceNumber": 633
        },
        {
          "id": 636,
          "parentId": 631,
          "name": "AF",
          "title": "",
          "description": "",
          "isActive": "true",
          "isInfoAvailable": "true",
          "sequenceNumber": 634
        },
        {
          "id": 637,
          "parentId": 631,
          "name": "AF",
          "title": "",
          "description": "",
          "isActive": "true",
          "isInfoAvailable": "true",
          "sequenceNumber": 637
        },
        {
          "id": 644,
          "parentId": 631,
          "name": "AFc",
          "title": "Testing throug 2nd Time API",
          "description": "The Qcuik brown fox jumps over a little lazy dog.",
          "isActive": "true",
          "isInfoAvailable": "true",
          "sequenceNumber": 644
        },
        {
          "id": 635,
          "parentId": null,
          "name": "AB",
          "title": "Testing throug 2nd Time API",
          "description": "The Qcuik brown fox jumps over a little lazy dog.",
          "isActive": "true",
          "isInfoAvailable": "true",
          "sequenceNumber": 635
        },
        {
          "id": 643,
          "parentId": null,
          "name": "ABc",
          "title": "Testing throug 2nd Time API",
          "description": "The Qcuik brown fox jumps over a little lazy dog.",
          "isActive": "true",
          "isInfoAvailable": "true",
          "sequenceNumber": 643
        },
        {
          "id": 669,
          "parentId": null,
          "name": "Development branch",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 669
        },
        {
          "id": 765,
          "parentId": null,
          "name": "IphoneX",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 0
        },
        {
          "id": 766,
          "parentId": 765,
          "name": "Xperia",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 0
        },
        {
          "id": 767,
          "parentId": 766,
          "name": "X11",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 0
        },
        {
          "id": 768,
          "parentId": 766,
          "name": "X12",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 0
        },
        {
          "id": 769,
          "parentId": 766,
          "name": "X13",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 0
        },
        {
          "id": 770,
          "parentId": 766,
          "name": "X14",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 0
        },
        {
          "id": 771,
          "parentId": 766,
          "name": "X15",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 0
        },
        {
          "id": 772,
          "parentId": 766,
          "name": "X16",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 0
        },
        {
          "id": 773,
          "parentId": 766,
          "name": "X17",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 0
        },
        {
          "id": 774,
          "parentId": 766,
          "name": "X18",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 0
        },
        {
          "id": 775,
          "parentId": 766,
          "name": "X19",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 0
        },
        {
          "id": 777,
          "parentId": null,
          "name": "Moto",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 0
        },
        {
          "id": 778,
          "parentId": 777,
          "name": "GX",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 0
        },
        {
          "id": 779,
          "parentId": 778,
          "name": "Xperia",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 0
        },
        {
          "id": 780,
          "parentId": 779,
          "name": "X11",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 0
        },
        {
          "id": 791,
          "parentId": 779,
          "name": "X22",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 0
        },
        {
          "id": 792,
          "parentId": 779,
          "name": "X23",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 0
        },
        {
          "id": 793,
          "parentId": 779,
          "name": "X24",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 0
        },
        {
          "id": 794,
          "parentId": 779,
          "name": "X25",
          "title": null,
          "description": null,
          "isActive": "true",
          "isInfoAvailable": "false",
          "sequenceNumber": 0
        }
      ]
    })
  }
  signUpClient(param: any): Observable<any> {
    return of(true);
  }
  getAllEvents(param: any): Observable<any> {
    return of({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": [
        {
          "id": 71,
          "venue": "Logix Cyber ",
          "address": "Logix Cyber Park, Logix Cybe, delhi, Algiers, Algeria, 43543543",
          "title": "Trade Fair",
          "start": "12-16-2018",
          "end": "12-20-2018"
        },
        {
          "id": 72,
          "venue": "India Gate",
          "address": "India Gate, India Gate, Delhi, Karnataka, India, 110001",
          "title": "Trade Fair2",
          "start": "12-20-2018",
          "end": "12-30-2018"
        },
        {
          "id": 73,
          "venue": "Logix ",
          "address": "Logix , Logix , Delhi, Algiers, Algeria, 225566",
          "title": "Excursion",
          "start": "12-17-2018",
          "end": "12-24-2018"
        },
        {
          "id": 123,
          "venue": null,
          "address": "noida, test, Arizona, United States, 23981",
          "title": "Good Friday",
          "start": "05-24-2019",
          "end": "05-31-2019"
        },
        {
          "id": 124,
          "venue": null,
          "address": "Indianapolis 500, Indianapolis 500, Indianapolis 500, Byram, United States, 1111",
          "title": "Test",
          "start": "05-10-2019",
          "end": "05-10-2019"
        }
      ]
    });
  }
  getOrderList(param: any): Observable<any> {
    return of({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": {
        "results": [
          {
            "id": 252,
            "orderNumber": "SL_000252",
            "orderDate": "11-15-2019",
            "arrivalDate": "11-15-2019",
            "eventName": "Newq twx",
            "requestedBy": "New tst",
            "status": "Placed",
            "statusCode": "PLACED",
            "orderStatusId": 37
          },
          {
            "id": 251,
            "orderNumber": "SL_000251",
            "orderDate": "11-15-2019",
            "arrivalDate": "11-22-2019",
            "eventName": "Newq twx",
            "requestedBy": "Faiz Akam",
            "status": "Placed",
            "statusCode": "PLACED",
            "orderStatusId": 37
          }
        ],
        "paginationInfo": {
          "pageSize": 5,
          "totalPages": 16,
          "totalRecords": 76,
          "curPage": 1
        }
      }
    })
  }
  getEvent(param: any): Observable<any> {
    return of({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": {
        "venue": null,
        "city": "fdvd",
        "stateId": 3922,
        "stateName": "Arkansas",
        "countryId": 231,
        "countryName": "United States",
        "customFieldValues": [
          {
            "customFieldId": 297,
            "customFieldValue": "test3"
          }
        ],
        "clientId": 37,
        "id": null,
        "title": "newq twx",
        "start": "11-30-2019",
        "end": "11-30-2019",
        "addressOne": "tdsdjc",
        "addressTwo": null,
        "eventZip": "vdfv"
      }
    });
  }
  getUserInfo(param: any): Observable<any> {
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
          "isPaymentDisable": true,
          "isAssociateOrdering": false
        }
      }
    });
  }
  resetPasswordRequest(param: any): Observable<any> {
    return of(true);
  }

  resetPassword(param: any): Observable<any> {
    return of(true);
  }

  getHelpAndResourceList(param: any): Observable<any> {
    return of({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": [
        {
          "id": 13,
          "clientId": 37,
          "resourceName": "gallery1.png",
          "file": null
        }
      ]
    });
  }
  downloadHelpAndResourceList(param: any): Observable<any> {
    return of({body:"Download 'gallery1.png'",type:"application/octate"});
  }
  getProductDetail(param: any): Observable<any> {
    return of({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": {
        "id": 145,
        "clientId": 37,
        "productName": "APL00034",
        "clientProductLabel": null,
        "clientProductName": "MFG Number",
        "productPrice": 15000,
        "productMaxPrice": null,
        "isPriceRange": false,
        "showPrice": true,
        "productExpirationDate": "09-09-2023",
        "categoryId": [
          636
        ],
        "briefDescription": "<p>Checking through mirgration</p>\n",
        "lowThresholdLimit": 10,
        "maxOrderQuantity": 50,
        "visibilityGroup": [
          81,
          82
        ],
        "dimensions": {
          "length": "12'",
          "width": "3'",
          "height": "4'",
          "weight": "170 Grams"
        },
        "wareHouses": [
          {
            "id": 76,
            "quantity": 100
          }
        ],
        "otherFeatures": {
          "newProduct": false,
          "returnableProduct": true,
          "itemOnHold": false
        },
        "productResources": [
          {
            "id": 51,
            "fileName": "r675675.xlsx",
            "type": "OTHER_RESOURCES",
            "isPrimary": false,
            "fileNameOnServer": "1e568dcb-1544-4f8d-98ce-355b6b2af30er675675.xlsx"
          },
          {
            "id": 52,
            "fileName": "Current_Sonar_10-05-2019.PNG",
            "type": "PRODUCT_IMAGES",
            "isPrimary": true,
            "fileNameOnServer": "0766ba08-89d3-465b-80dc-4c5912b1a1eeCurrent_Sonar_10-05-2019.PNG",
            "thumbnailFileNameOnServer": "9efa3ca9-918b-4033-89cb-e63b12706512Current_Sonar_10-05-2019.PNG",
            "thumbnailDimension": {
              "imgWidth": 300,
              "imgHeight": 159
            },
            "actualImgDimension": {
              "imgWidth": 1338,
              "imgHeight": 708
            }
          }
        ],
        "productInfo": null,
        "totalQuantity": null,
        "availableQuantity": null,
        "categoryName": null,
        "productStatus": null,
        "isKit": null,
        "isTextGraphic": false,
        "isUploadGraphic": false,
        "steps": [],
        "isSteps": null,
        "productNumber": "APL00034"
      }
    });
  }
  addToCart(param: any): Observable<any> {
    return of(true);
  }

  placeOrder(param: any): Observable<any> {
    return of(true);
  }

  getHeaderFooter(param: any): Observable<any> {
    return of({
      "errorCode": "E1018",
      "errorDescription": "Session Expired, Please login again"
    });
  }

  getRequestor(param: any): Observable<any> {
    return of({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": [
        {
          "id": 114939,
          "name": "0",
          "checked": false
        },
        {
          "id": 391,
          "name": "Amanda Lovelady",
          "checked": false
        },
        {
          "id": 114958,
          "name": "Amisha",
          "checked": false
        },
      ]
    })
  }

  addEvent(param: any) {
    return ({});
  }
  updateEvent(param: any): Observable<any> {
    return of({});
  }
  browseProductList(param: any): Observable<any> {
    return of({

      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": {
        "results": [
          {
            "id": 206,
            "resourceId": 48,
            "fileNameOnServer": "fec6c0b5-de62-4d82-a3f5-b695ab18efecimages.jpeg",
            "thumbnailDimension": {
              "imgWidth": 300,
              "imgHeight": 300
            },
            "clientId": 37,
            "productName": "ATESTing",
            "isNewProduct": false,
            "isPriceVisible": true,
            "productPrice": 120,
            "productMaxPrice": 150,
            "isPriceRange": true,
            "isReturnableProduct": false,
            "productStatus": "ACTIVE",
            "isKit": false,
            "productInfo": null,
            "briefDescription": null,
            "isSteps": true,
            "steps": null,
            "isTextGraphic": false,
            "isUploadGraphic": false,
            "textGraphicCount": null,
            "productNumber": "a9891",
            "totalQuantity": 73,
            "availableQuantity": 73,
            "maxOrderQuantity": 20
          },
          {
            "id": 1893,
            "resourceId": 62,
            "fileNameOnServer": "6d1dec83-d8fa-4d39-9e02-e80d0480534aimage.png",
            "thumbnailDimension": {
              "imgWidth": 300,
              "imgHeight": 144
            },
            "clientId": 37,
            "productName": "Csdvbgfv",
            "isNewProduct": true,
            "isPriceVisible": true,
            "productPrice": 0.07,
            "productMaxPrice": null,
            "isPriceRange": false,
            "isReturnableProduct": true,
            "productStatus": "ON_HOLD",
            "isKit": false,
            "productInfo": null,
            "briefDescription": null,
            "isSteps": false,
            "steps": null,
            "isTextGraphic": true,
            "isUploadGraphic": false,
            "textGraphicCount": 1000,
            "productNumber": "1",
            "totalQuantity": 34,
            "availableQuantity": 34,
            "maxOrderQuantity": 10
          },
          {
            "id": 1818,
            "resourceId": null,
            "fileNameOnServer": null,
            "thumbnailDimension": null,
            "clientId": 37,
            "productName": "MotoGX51",
            "isNewProduct": false,
            "isPriceVisible": false,
            "productPrice": 200,
            "productMaxPrice": null,
            "isPriceRange": false,
            "isReturnableProduct": false,
            "productStatus": "ACTIVE",
            "isKit": false,
            "productInfo": null,
            "briefDescription": null,
            "isSteps": false,
            "steps": null,
            "isTextGraphic": null,
            "isUploadGraphic": null,
            "textGraphicCount": null,
            "productNumber": "MotoGX51",
            "totalQuantity": 101,
            "availableQuantity": 101,
            "maxOrderQuantity": 10
          },
          {
            "id": 1876,
            "resourceId": null,
            "fileNameOnServer": null,
            "thumbnailDimension": null,
            "clientId": 37,
            "productName": "MotoGX51",
            "isNewProduct": false,
            "isPriceVisible": false,
            "productPrice": 20,
            "productMaxPrice": null,
            "isPriceRange": false,
            "isReturnableProduct": false,
            "productStatus": "ACTIVE",
            "isKit": false,
            "productInfo": null,
            "briefDescription": null,
            "isSteps": false,
            "steps": null,
            "isTextGraphic": null,
            "isUploadGraphic": null,
            "textGraphicCount": null,
            "productNumber": "MotoGX511",
            "totalQuantity": 100,
            "availableQuantity": 100,
            "maxOrderQuantity": null
          }
        ],
        "paginationInfo": {
          "pageSize": 11,
          "totalPages": 1,
          "totalRecords": 4,
          "curPage": 1
        }
      }
    }
    );
  }
  browseKitList(param: any) {
    return of({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": {
        "results": [],
        "paginationInfo": {
          "pageSize": 34,
          "totalPages": 0,
          "totalRecords": 0,
          "curPage": 1
        }
      }
    })
  }
  getKitDetail(param: any) {
    return of({

    })
  }

  getCreditCardInfo(param: any): Observable<any> {
    return of({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": {
        "result": {
          "cardId": 100,
          "requestorId": null,
          "securityOne": "U2FsdGVkX19Ah4+xMmINRAt/9/aBjElbGaOaEOuYCkjOjiEppLe0ScSx6I0ThJTEHVH9fG1OiVlRSjuIEK/Q3H7CiplBKyHPaakXuh6pKAXjvJVDwN/plx5+Pt7MSQJ6EsP5BESjcWAywZDyL821+Q==",
          "securityTwo": null
        }
      }
    });
  }

  getUserCreditCards(param: any): Observable<any> {
    return of({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": {
        "results": [{
          cardId: 100,
          requestorId: null,
          securityOne: { name: "Paulo Coehlo", number: "**** **** **** 8876", cvv: "123", expiryDate: "11/2021" },
          securityTwo: "U2FsdGVkX1+U99aSPy/zdlu9ud1tQsOUHgbpxPChVHi8LAaJmS1x1BvEEqLDhG8D4+d8swDwfeFbeojYdmxl4hWaVY/m/ZdKPshFZhkJuClKzP4+DLIiB36Hpx95Dftg+Fsmd5Rc6IGqx8018CYD7Q=="
        }]
      }
    });
  }
  saveCard(): Observable<any> {
    return of({
      response: { id: 103 },
      responseCode: "S0001",
      responseDescription: "Success"
    });
  }
}