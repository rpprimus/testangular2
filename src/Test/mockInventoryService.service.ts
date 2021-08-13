import { of, Observable } from "rxjs";

export class MockInventoryService {
  getClientSetting() {
    return of({ "responseCode": "S0001", "responseDescription": "Success", "response": { "settings": { "isClientProductName": false, "clientProductName": "MFG Number", "isVisibilityRestriction": true, "visibilityRestriction": [{ "id": 81, "visibilityGroupName": "Visiblity One", "isDefault": false }, { "id": 82, "visibilityGroupName": "Visiblity Two", "isDefault": false }, { "id": 83, "visibilityGroupName": "Visiblity Three", "isDefault": false }, { "id": 95, "visibilityGroupName": "Visiblity Four", "isDefault": true }, { "id": 118, "visibilityGroupName": "Visiblity Five", "isDefault": false }, { "id": 119, "visibilityGroupName": "Visiblity Five", "isDefault": false }, { "id": 139, "visibilityGroupName": "ALL", "isDefault": false }], "isHierarchy": true, "hierarchyLabelName": "Department", "hierarchy": [{ "id": 75, "hierarchyName": "Technology" }, { "id": 76, "hierarchyName": "Creative" }, { "id": 77, "hierarchyName": "Events" }], "isEventEnable": true, "primaryAccountManagerId": null, "primaryAccountManagerName": null, "welcomeTxt": "<p>This is dummy content for testing purpose, please ignore it.&nbsp;This is dummy content for <a href=\"https://www.google.com/\" target=\"_blank\">testing</a> purpose, please ignore it. <a href=\"https://www.google.com/\">It is link testing content.</a></p>\n\n<p>bbn</p>\n\n<p>This is bullet&nbsp;text content:</p>\n\n<ul>\n\t<li>Test 1 txtx</li>\n\t<li>Test 1 txtx</li>\n\t<li>Test 1 txtx</li>\n\t<li>Test 1 txtx</li>\n</ul>\n\n<p>This is bulleteted text content:</p>\n\n<ol>\n\t<li>Test txt only 1</li>\n\t<li>Test txt only 1</li>\n\t<li>Test txt only 1</li>\n\t<li>Test txt only 1</li>\n\t<li>Test txt only 1</li>\n</ol>\n\n<p>Rest all is dummy x<sup>2&nbsp;</sup><strong>&nbsp;</strong></p>\n\n<p><strong>This is bold text.</strong></p>\n\n<p><font color=\"#C0392B\"><u><strong>This is bold text.</strong></u></font></p>\n\n<p><em><strong>This is bold text.</strong></em></p>\n", "welcomeTitle": "Lorem ipsum dolor sit amet, consectetur adipiscing", "creditCardPayment": true, "welcome": true } } })
  }
  getInventoryList(param): Observable<any> {
    return of({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": {
        "results": [
          {
            "id": 206,
            "productNumber": "A9891",
            "productName": "ATESTing",
            "category": "Sports T-Shirt, Development branch, X11",
            "warehouse": "LA Warehouse",
            "visibilityGroup": "Visiblity One",
            "totalQuantity": 73
          },
          {
            "id": 122,
            "productNumber": "APLOO618",
            "productName": "APLOO618",
            "category": "Great Parent 3rd Child",
            "warehouse": "Canada Warehouse",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "totalQuantity": 0
          },
          {
            "id": 123,
            "productNumber": "APLOO619",
            "productName": "APLOO619",
            "category": "Great Parent 3rd Child",
            "warehouse": "Canada Warehouse",
            "visibilityGroup": "Visiblity One, Visiblity Two",
            "totalQuantity": 0
          },
          {
            "id": 68,
            "productNumber": "APPLOO9",
            "productName": "I-Phone9",
            "category": "iPhone, Testing",
            "warehouse": "PHL Warehouse",
            "visibilityGroup": "Visiblity One, Visiblity Two, Visiblity Three, Visiblity Five, Visiblity Five, Visiblity Four",
            "totalQuantity": 3000
          },
          {
            "id": 210,
            "productNumber": "AS9891",
            "productName": "AS TEST",
            "category": "Sports T-Shirt",
            "warehouse": "LA Warehouse",
            "visibilityGroup": "Visiblity One, Visiblity Two, Visiblity Three, Visiblity Four",
            "totalQuantity": 90
          },
          {
            "id": 93,
            "productNumber": "AWS-001",
            "productName": "AWS Logo Banner",
            "category": "Banners",
            "warehouse": "PHL Warehouse",
            "visibilityGroup": "Visiblity One, Visiblity Two, Visiblity Three, Visiblity Four",
            "totalQuantity": 6
          },
          {
            "id": 94,
            "productNumber": "AWS-002",
            "productName": "AWS Banner #2",
            "category": "Banners",
            "warehouse": "PHL Warehouse",
            "visibilityGroup": "Visiblity One, Visiblity Two, Visiblity Three, Visiblity Four",
            "totalQuantity": 3
          },
        ],
        "paginationInfo": {
          "pageSize": 50,
          "totalPages": 4,
          "totalRecords": 179,
          "curPage": 1
        }
      }
    })
  }
  getCategoryList(param) {
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
          "id": 142,
          "name": "test 1",
          "checked": false
        },
        {
          "id": 155,
          "name": "Great Parent",
          "checked": false
        },
        {
          "id": 588,
          "name": "Great child 9",
          "checked": false
        },
      ]
    });
  }
  getWarehouseList() {
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
          "name": "TestWarehouse_009!@#$^%$^%&^*^"
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
  getVisibilityGroup(param) {
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
  getUpdateInventoryReason() {
    return of({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": [
        {
          "id": 33,
          "reason": "Inventory Mismatch"
        },
        {
          "id": 31,
          "reason": "New Products Added"
        },
        {
          "id": 36,
          "reason": "Others"
        },
        {
          "id": 34,
          "reason": "Product Damaged"
        },
        {
          "id": 32,
          "reason": "Product Lost"
        },
        {
          "id": 35,
          "reason": "Warehouse Changed"
        }
      ]
    })
  }
  getInventoryDetail(param) {
    return of({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": {
        "results": [
          {
            "id": 258,
            "warehouseName": "LA Warehouse",
            "totalQuantity": 90
          }
        ],
        "paginationInfo": {
          "pageSize": 50,
          "totalPages": 1,
          "totalRecords": 1,
          "curPage": 1
        }
      }
    });
  }
  getInventoryHistory(param): Observable<any> {
    return of({
      "responseCode": "S0001",
      "response": {
        "results": [],
        "paginationInfo": {
          "pageSize": 50,
          "totalPages": 0,
          "totalRecords": 0,
          "curPage": 1
        }
      }
    });
  }
  getInventoryAvailability(param) {
    return of({
      "responseCode": "S0001",
      "response": {
        "id": 210,
        "totalQuantity": 90,
        "availableQuantity": 86,
        "onOrderQuantity": 4,
        "productId": "AS9891"
      }
    })
  }
  updateInventoryDetail(item:any):Observable<any>{
   return of(true); 
  }

}