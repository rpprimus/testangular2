import { Observable, of, throwError } from "rxjs";
import { MatTableDataSource } from "@angular/material";

export class mockProductsService {

  getClientSetting(param: any) {
    return new Promise(resolve => setTimeout(() => resolve({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": {
        "settings": {
          "isClientProductName": false,
          "clientProductName": "MFG Number",
          "isVisibilityRestriction": true,
          "visibilityRestriction": [
            {
              "id": 81,
              "visibilityGroupName": "Visiblity One",
              "isDefault": false
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
              "isDefault": true
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
            }
          ],
          "isHierarchy": true,
          "hierarchyLabelName": "Department",
          "hierarchy": [
            {
              "id": 75,
              "hierarchyName": "Technology"
            },
            {
              "id": 76,
              "hierarchyName": "Creative"
            },
            {
              "id": 77,
              "hierarchyName": "Events"
            }
          ],
          "isEventEnable": true,
          "primaryAccountManagerId": null,
          "primaryAccountManagerName": null,
          "welcomeTxt": "<p>This is dummy content for testing purpose, please ignore it.&nbsp;This is dummy content for <a href=\"https://www.google.com/\" target=\"_blank\">testing</a> purpose, please ignore it. <a href=\"https://www.google.com/\">It is link testing content.</a></p>\n\n<p>bbn</p>\n\n<p>This is bullet&nbsp;text content:</p>\n\n<ul>\n\t<li>Test 1 txtx</li>\n\t<li>Test 1 txtx</li>\n\t<li>Test 1 txtx</li>\n\t<li>Test 1 txtx</li>\n</ul>\n\n<p>This is bulleteted text content:</p>\n\n<ol>\n\t<li>Test txt only 1</li>\n\t<li>Test txt only 1</li>\n\t<li>Test txt only 1</li>\n\t<li>Test txt only 1</li>\n\t<li>Test txt only 1</li>\n</ol>\n\n<p>Rest all is dummy x<sup>2&nbsp;</sup><strong>&nbsp;</strong></p>\n\n<p><strong>This is bold text.</strong></p>\n\n<p><font color=\"#C0392B\"><u><strong>This is bold text.</strong></u></font></p>\n\n<p><em><strong>This is bold text.</strong></em></p>\n",
          "welcomeTitle": "Lorem ipsum dolor sit amet, consectetur adipiscing",
          "creditCardPayment": true,
          "welcome": true
        }
      }
    }), 100));


  }

  getProductList(param: any): Observable<any> {
    return of({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": {
        "results": [
          {
            "id": 1893,
            "productNumber": "1",
            "productName": "Csdvbgfv",
            "category": "X11",
            "warehouse": "LA Warehouse",
            "isNewProduct": "Yes",
            "visibilityGroup": "Visiblity Four",
            "status": "ON HOLD"
          },
          {
            "id": 1969,
            "productNumber": "11111",
            "productName": "Test Product123",
            "category": "Sub-Test",
            "warehouse": "PHL Warehouse",
            "isNewProduct": "Yes",
            "visibilityGroup": "Visiblity One, ALL, Visiblity Four",
            "status": "ACTIVE"
          },
          {
            "id": 212,
            "productNumber": "19012019",
            "productName": "Handkerchief",
            "category": "Development branch, Pop-up Displays, Sports T-Shirt, X11",
            "warehouse": "LA Warehouse",
            "isNewProduct": "Yes",
            "visibilityGroup": "Visiblity One, Visiblity Two, Visiblity Three, Visiblity Five, Visiblity Five, Visiblity Four",
            "status": "ACTIVE"
          },
          {
            "id": 1970,
            "productNumber": "223",
            "productName": "New Product",
            "category": "Sub-Test",
            "warehouse": "PHL Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two, Visiblity Three, Visiblity Five, Visiblity Five, ALL, Visiblity Four",
            "status": "ACTIVE"
          },
          {
            "id": 196,
            "productNumber": "80001",
            "productName": "PRO_90013",
            "category": "AF, test 1",
            "warehouse": "PHL Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity Five",
            "status": "ACTIVE"
          },
          {
            "id": 1194,
            "productNumber": "999999",
            "productName": "Qunatity test",
            "category": "Pop-up Displays, Sports T-Shirt",
            "warehouse": "LA Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two, Visiblity Three, Visiblity Four",
            "status": "ACTIVE"
          },
          {
            "id": 206,
            "productNumber": "a9891",
            "productName": "ATESTing",
            "category": "Sports T-Shirt, Development branch, X11",
            "warehouse": "LA Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One",
            "status": "ACTIVE"
          },
          {
            "id": 142,
            "productNumber": "APL00031",
            "productName": "APL00031",
            "category": "AB, AF",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One",
            "status": "ACTIVE"
          },
          {
            "id": 145,
            "productNumber": "APL00034",
            "productName": "APL00034",
            "category": "AF",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 146,
            "productNumber": "APL00035",
            "productName": "APL00035",
            "category": "AF",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 149,
            "productNumber": "APL00040",
            "productName": "APL00040",
            "category": "AF",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 150,
            "productNumber": "APL00041",
            "productName": "APL00041",
            "category": "AF",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 152,
            "productNumber": "APL000411",
            "productName": "APLO25",
            "category": "AF",
            "warehouse": "",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two, Visiblity Three, Visiblity Four, Visiblity Five, Visiblity Five, ALL",
            "status": "ACTIVE"
          },
          {
            "id": 137,
            "productNumber": "APL30",
            "productName": "APL30",
            "category": "AF",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 138,
            "productNumber": "APL31",
            "productName": "APL31",
            "category": "AF, Birlasoft 4rth Child",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 124,
            "productNumber": "APLO20",
            "productName": "APLO20",
            "category": "AF, Birlasoft 4rth Child, TCS 4rth Child",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 125,
            "productNumber": "APLO21",
            "productName": "APLO21",
            "category": "AF, Birlasoft 4rth Child",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 126,
            "productNumber": "APLO22",
            "productName": "APLO22",
            "category": "AFc",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 127,
            "productNumber": "APLO23",
            "productName": "APLO23",
            "category": "AE",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 164,
            "productNumber": "APLO232323",
            "productName": "APLO25",
            "category": "AF",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 128,
            "productNumber": "APLO25",
            "productName": "APLO25",
            "category": "AF",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 153,
            "productNumber": "APLO2511",
            "productName": "APLO25",
            "category": "AF",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 154,
            "productNumber": "APLO2512",
            "productName": "APLO25",
            "category": "AF",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 161,
            "productNumber": "APLO25555",
            "productName": "APLO25",
            "category": "AE",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 129,
            "productNumber": "APLO26",
            "productName": "APLO26",
            "category": "AFc, Sub-Test",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 130,
            "productNumber": "APLO27",
            "productName": "APLO27",
            "category": "AF",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 131,
            "productNumber": "APLO28",
            "productName": "APLO28",
            "category": "AF",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 132,
            "productNumber": "APLO29",
            "productName": "APLO29",
            "category": "AF",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 133,
            "productNumber": "APLO30",
            "productName": "APLO30",
            "category": "AF",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 110,
            "productNumber": "APLOO1",
            "productName": "APLOO1",
            "category": "Birlasoft 4rth Child",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One",
            "status": "ACTIVE"
          },
          {
            "id": 111,
            "productNumber": "APLOO2",
            "productName": "APLOO2",
            "category": "Birlasoft 4rth Child",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 120,
            "productNumber": "APLOO616",
            "productName": "APLOO616",
            "category": "Great Parent 3rd Child",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 121,
            "productNumber": "APLOO617",
            "productName": "APLOO617",
            "category": "Great Parent 3rd Child",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 122,
            "productNumber": "APLOO618",
            "productName": "APLOO618",
            "category": "Great Parent 3rd Child",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 123,
            "productNumber": "APLOO619",
            "productName": "APLOO619",
            "category": "Great Parent 3rd Child",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "status": "ACTIVE"
          },
          {
            "id": 68,
            "productNumber": "APPLOO9",
            "productName": "I-Phone9",
            "category": "iPhone, Testing",
            "warehouse": "PHL Warehouse",
            "isNewProduct": "Yes",
            "visibilityGroup": "Visiblity One, Visiblity Two, Visiblity Three, Visiblity Five, Visiblity Five, Visiblity Four",
            "status": "ACTIVE"
          },
          {
            "id": 210,
            "productNumber": "AS9891",
            "productName": "AS TEST",
            "category": "Sports T-Shirt",
            "warehouse": "LA Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two, Visiblity Three, Visiblity Four",
            "status": "ACTIVE"
          },
          {
            "id": 93,
            "productNumber": "AWS-001",
            "productName": "AWS Logo Banner",
            "category": "Banners",
            "warehouse": "PHL Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two, Visiblity Three, Visiblity Four",
            "status": "ACTIVE"
          },
          {
            "id": 94,
            "productNumber": "AWS-002",
            "productName": "AWS Banner #2",
            "category": "Banners",
            "warehouse": "PHL Warehouse",
            "isNewProduct": "Yes",
            "visibilityGroup": "Visiblity One, Visiblity Two, Visiblity Three, Visiblity Four",
            "status": "ON HOLD"
          },
          {
            "id": 96,
            "productNumber": "B-001",
            "productName": "10 x 10 Booth",
            "category": "Pop-up Displays",
            "warehouse": "PHL Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "Visiblity One, Visiblity Two, Visiblity Three, Visiblity Four",
            "status": "ACTIVE"
          },
          {
            "id": 1894,
            "productNumber": "CAN-007",
            "productName": "Nicole Quilted Travel Utility Kit",
            "category": "Giveaways",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "ALL",
            "status": "ACTIVE"
          },
          {
            "id": 1895,
            "productNumber": "CAN-010",
            "productName": "Titleist Golf Balls with Discover and Diners Club Logos",
            "category": "Giveaways",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "ALL",
            "status": "ACTIVE"
          },
          {
            "id": 1896,
            "productNumber": "CAN-014",
            "productName": "Discover Grey T-Shirt\nSize: XL",
            "category": "Giveaways",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "ALL",
            "status": "ACTIVE"
          },
          {
            "id": 1897,
            "productNumber": "CAN-017",
            "productName": "Discover Black T-Shirt\nSize: XL",
            "category": "Giveaways",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "ALL",
            "status": "ACTIVE"
          },
          {
            "id": 1898,
            "productNumber": "CAN-019",
            "productName": "Discover Long Sleeve Black Shirt\nSize: XXL",
            "category": "Giveaways",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "ALL",
            "status": "ACTIVE"
          },
          {
            "id": 1899,
            "productNumber": "CAN-020",
            "productName": "Discover Black Long Sleeve Shirt\nSize: XL",
            "category": "Giveaways",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "ALL",
            "status": "ACTIVE"
          },
          {
            "id": 1900,
            "productNumber": "CAN-021",
            "productName": "Discover Black Long Sleeve Shirt\nSize: LG",
            "category": "Giveaways",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "ALL",
            "status": "ACTIVE"
          },
          {
            "id": 1901,
            "productNumber": "CAN-024",
            "productName": "Discover Laptop Bag",
            "category": "Giveaways",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "ALL",
            "status": "ACTIVE"
          },
          {
            "id": 1902,
            "productNumber": "CAN-039",
            "productName": "Discover Orange Fleece Blanket",
            "category": "Giveaways",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "ALL",
            "status": "ACTIVE"
          },
          {
            "id": 1903,
            "productNumber": "CAN-048",
            "productName": "Discover Lanyards",
            "category": "Giveaways",
            "warehouse": "Canada Warehouse",
            "isNewProduct": "No",
            "visibilityGroup": "ALL",
            "status": "ACTIVE"
          }
        ],
        "paginationInfo": {
          "pageSize": 50,
          "totalPages": 4,
          "totalRecords": 181,
          "curPage": 1
        }
      }
    });
  }

  changeStatus(status: any): Observable<any> {
    return of(true);
  }

  getCategoryList(param: any): Observable<any> {
    return of({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": [
        {
          "id": 90,
          "name": "Electronics",
          "checked": false
        },
        {
          "id": 91,
          "name": "Mobiles",
          "checked": false
        },
        {
          "id": 92,
          "name": "iPhone",
          "checked": false
        },
        {
          "id": 96,
          "name": "Car Spare Part",
          "checked": false
        },
        {
          "id": 97,
          "name": "Steering wheel",
          "checked": false
        },
        {
          "id": 109,
          "name": "Men",
          "checked": false
        }]
    });
  }

  getWarehouseList(param: any): Observable<any> {
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

  getVisibilityGroup(param: any): Observable<any> {
    return of({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": [
        {
          "id": 81,
          "name": "Visiblity One",
          "checked": false
        },
        {
          "id": 82,
          "name": "Visiblity Two",
          "checked": false
        },
        {
          "id": 83,
          "name": "Visiblity Three",
          "checked": false
        },
        {
          "id": 95,
          "name": "Visiblity Four",
          "checked": false
        },
        {
          "id": 118,
          "name": "Visiblity Five",
          "checked": false
        },
        {
          "id": 119,
          "name": "Visiblity Five",
          "checked": false
        },
        {
          "id": 139,
          "name": "ALL",
          "checked": false
        }
      ]
    });
  }

  saveProduct(param: any, type: string): Observable<any> {
    return of({ response: { id: 10 } });
  }

  getProductById(param: any): Observable<any> {
    if (JSON.stringify(param) == JSON.stringify({ pathVariable: 10,clientId: null })) {
      return throwError(new Error('Fake error'));
    }
    else{
    return of({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": {
        "id": 196,
        "clientId": 37,
        "productName": "PRO_90013",
        "clientProductLabel": null,
        "clientProductName": "MFG-001",
        "productPrice": '$1,000.00',
        "productMaxPrice": null,
        "isPriceRange": false,
        "showPrice": false,
        "productExpirationDate": "09-26-2019",
        "categoryId": [
          636,
          142
        ],
        "briefDescription": "<p>testing</p>\n",
        "lowThresholdLimit": null,
        "maxOrderQuantity": null,
        "visibilityGroup": [
          119
        ],
        "dimensions": {
          "length": "9",
          "width": "158",
          "height": "55",
          "weight": "4"
        },
        "wareHouses": [
          {
            "id": 72,
            "quantity": 10
          }
        ],
        "otherFeatures": {
          "newProduct": false,
          "returnableProduct": false,
          "itemOnHold": false
        },
        "productResources": [
          {
            "id": 54,
            "fileName": "car.jpeg",
            "type": "PRODUCT_IMAGES",
            "isPrimary": false,
            "fileNameOnServer": "dc6051aa-2361-45d5-809a-6e46808dd026car.jpeg",
            "thumbnailFileNameOnServer": "352c4a1c-3e63-4392-a643-d25dff749db1car.jpeg",
            "thumbnailDimension": {
              "imgWidth": 300,
              "imgHeight": 199
            },
            "actualImgDimension": {
              "imgWidth": 179,
              "imgHeight": 119
            }
          },
          {
            "id": 78,
            "fileName": "download.jpg",
            "type": "PRODUCT_IMAGES",
            "isPrimary": false,
            "fileNameOnServer": "43f2360a-c541-4cf1-9548-9c74e0403305download.jpg",
            "thumbnailFileNameOnServer": "ea5c391c-43e7-497d-8016-18381680a45edownload.jpg",
            "thumbnailDimension": {
              "imgWidth": 300,
              "imgHeight": 156
            },
            "actualImgDimension": {
              "imgWidth": 311,
              "imgHeight": 162
            }
          },
          {
            "id": 79,
            "fileName": "Screenshot (3).png",
            "type": "PRODUCT_IMAGES",
            "isPrimary": false,
            "fileNameOnServer": "7dff75ce-2d31-44e7-a07c-96a7cb0cc0a4Screenshot (3).png",
            "thumbnailFileNameOnServer": "2089abe3-6a86-4823-a2d3-56464390ec00Screenshot (3).png",
            "thumbnailDimension": {
              "imgWidth": 300,
              "imgHeight": 169
            },
            "actualImgDimension": {
              "imgWidth": 1920,
              "imgHeight": 1080
            }
          },
          {
            "id": 80,
            "fileName": "Screenshot (4).png",
            "type": "OTHER_RESOURCES",
            "isPrimary": false,
            "fileNameOnServer": "5394d8c8-74e9-4020-a6f5-f1b4cee67cd7Screenshot (4).png"
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
        "textGraphicCount": null,
        "steps": [
          {
            "id": 8,
            "stepName": "tesijnfgd",
            "stepDescription": "tesijnfgdnn",
            "isRequired": true,
            "products": new MatTableDataSource([
              {
                "id": 43,
                "productId": 0,
                "productNumber": "XR_Iphone",
                "productName": "Apple iPhone XR (Black, 64 GB)",
                "minQuantity": 1,
                "resouceId": 41,
                "categories": "iPhone, test 1",
                "maxOrderQuantity": 20,
              },
              {
                "id": 57,
                "productId": 66,
                "productNumber": "XR_Iphone",
                "productName": "Apple iPhone XR (Black, 64 GB)",
                "minQuantity": 1,
                "resouceId": 41,
                "categories": "iPhone, test 1",
                "maxOrderQuantity": 20,
              }
            ]),
            "associateBrowseProduct": null,
            "isProductAdded": false,
            "quantity": null
          },
          {
            "id": 39,
            "stepName": "Step N3",
            "stepDescription": "Step3 Desc Detail for testing",
            "isRequired": true,
            "products": new MatTableDataSource([
              {
                "id": 116,
                "productId": 66,
                "productNumber": "XR_Iphone",
                "productName": "Apple iPhone XR (Black, 64 GB)",
                "minQuantity": 1,
                "resouceId": 41,
                "categories": "iPhone, test 1",
                "maxOrderQuantity": 20
              },
              {
                "id": 117,
                "productId": 74,
                "productNumber": "XR_Iphone112",
                "productName": "Iphone",
                "minQuantity": 1,
                "resouceId": 37,
                "categories": "iPhone",
                "maxOrderQuantity": 10
              }
            ]),
            "associateBrowseProduct": null,
            "isProductAdded": false,
            "quantity": 2
          },
          {
            "id": 40,
            "stepName": "Step N4",
            "stepDescription": "Step 4 Description detail",
            "isRequired": true,
            "products": new MatTableDataSource([
              {
                "id": 118,
                "productId": 66,
                "productNumber": "XR_Iphone",
                "productName": "Apple iPhone XR (Black, 64 GB)",
                "minQuantity": 1,
                "resouceId": 41,
                "categories": "iPhone, test 1",
                "maxOrderQuantity": 20
              },
              {
                "id": 119,
                "productId": 74,
                "productNumber": "XR_Iphone112",
                "productName": "Iphone",
                "minQuantity": 1,
                "resouceId": 37,
                "categories": "iPhone",
                "maxOrderQuantity": 10
              },
              {
                "id": 120,
                "productId": 1471,
                "productNumber": "XR_Iphone_123",
                "productName": "XR_Iphone113",
                "minQuantity": 1,
                "resouceId": null,
                "categories": "Sports T-Shirt",
                "maxOrderQuantity": 4
              }
            ]),
            "associateBrowseProduct": null,
            "isProductAdded": false,
            "quantity": 4
          }
        ],
        "isSteps": null,
        "productNumber": "80001"
      }
    });
  }
  }

  deleteProductResource(param: any): Observable<any> {
    return of(true);
  }

  markPrimaryImage(param: any): Observable<any> {
    return of(true);
  }

  getThumbnailImage(param: any): Observable<any> {
    return of({
      "url": "google.com/img",
      "body": new Blob(['image'], { type: "application/octet-stream" })
    });
  }

  deleteAssociatedProduct(param: any): Observable<any> {
    if (JSON.stringify(param) == JSON.stringify({ stepIds: [2],clientId: null })) {
      return throwError(new Error('Fake error'));
    }
    else{
    return of(true);
    }
  }

  deleteAssociatedStep(param: any): Observable<any> {
    if (JSON.stringify(param) == JSON.stringify({ pathVariable: 9,id: 9,clientId: null })) {
      return throwError(new Error('Fake error'));
    }
    else {
      return of(true);
    }
  }

  searchProduct(param: any): Observable<any> {
    if (JSON.stringify(param) == JSON.stringify({clientId: null,productName:"testt"})) {
      return throwError(new Error('Fake error'));
    }
    else{
    return of({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": []
    });
  }
  }

}