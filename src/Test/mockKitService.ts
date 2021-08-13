import { Observable, of, throwError } from "rxjs";

export class mockKitService{

    getKitList(param:any):Observable<any>{
      
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "results": [
                {
                  "id": 29,
                  "kitId": "133",
                  "kitName": "New test kit",
                  "category": "Sports T-Shirt, Pop-up Displays, Banners, test 1, TCS 3rd Child, TCS 4rth Child, Birlasoft 3rd Child, Birlasoft 4rth Child, Birla 2nd Level, Birlasoft, Great Parent 3rd Child, Great child 2, Great child 6, Great child 10, AF, AF, AFc, AD, AE, AB, ABc, Development branch",
                  "visibilityGroup": "Visiblity One, Visiblity Two, Visiblity Three, Visiblity Four, Visiblity Five, Visiblity Five, ALL",
                  "status": "ACTIVE"
                },
                {
                  "id": 30,
                  "kitId": "134",
                  "kitName": "Kits test",
                  "category": "Sports T-Shirt",
                  "visibilityGroup": "Visiblity One, Visiblity Two, Visiblity Three, Visiblity Four, Visiblity Five, Visiblity Five, ALL",
                  "status": "ACTIVE"
                },
                {
                  "id": 31,
                  "kitId": "2321",
                  "kitName": "My Test Kit",
                  "category": "Sub-Test",
                  "visibilityGroup": "Visiblity One, Visiblity Two, Visiblity Three, Visiblity Four, Visiblity Five, Visiblity Five, ALL",
                  "status": "ACTIVE"
                },
                {
                  "id": 24,
                  "kitId": "APPLOO1",
                  "kitName": "AppleCoverKIT",
                  "category": "iPhone, Birlasoft 4rth Child, AF",
                  "visibilityGroup": "Visiblity One, Visiblity Two, Visiblity Three, Visiblity Four",
                  "status": "ACTIVE"
                }
              ],
              "paginationInfo": {
                "pageSize": 10,
                "totalPages": 1,
                "totalRecords": 4,
                "curPage": 1
              }
            }
          });
    }

    getClientSetting(param:any):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({pathVariable:"4"}))
      {
        return throwError(new Error('Fake error'));
      }
      else if(JSON.stringify(param)==JSON.stringify({pathVariable:"3"}))
      {
        return of({"response": {
          "settings": {
            "isClientProductName": true,
            "clientProductName": "MFG Number",
            "isVisibilityRestriction": false,}}});
      }
      else {
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "settings": {
                "isClientProductName": true,
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
            }});
      }
    }

    changeStatus(param:any):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({pathVariable:2,status:"INACTIVE"}))
      {
        return throwError(new Error('Fake error'));
      }
      else{
        return of(true);
      }
    }

    getCategoryList(param:any):Observable<any>{
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
              },
              {
                "id": 110,
                "name": "T-Shirts",
                "checked": false
              },
              {
                "id": 111,
                "name": "Sports T-Shirt",
                "checked": false
              },
              {
                "id": 123,
                "name": "Testing",
                "checked": false
              }]});
    }

    getVisibilityGroup(param:any):Observable<any>{
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

    getKit(param:any):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({kitId:"2"}))
      {
        return throwError(new Error('Fake error'));
      }
      else{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "id": 29,
              "kitId": "133",
              "clientId": 37,
              "kitName": "New test kit",
              "kitDescription": "<p>This is a new test kit&nbsp;</p>\n",
              "kitCategory": [
                111,
                129,
                128,
                142,
                152,
                153,
                147,
                148,
                645,
                154,
                158,
                585,
                587,
                589,
                636,
                637,
                644,
                632,
                633,
                635,
                643,
                669
              ],
              "kitVisibilityGroup": [
                81,
                82,
                83,
                95,
                118,
                119,
                139
              ],
              "kitProduct": [
                {
                  "id": 58,
                  "productId": 66,
                  "quantity": 4,
                  "productNumber": "XR_Iphone",
                  "productName": "Apple iPhone XR (Black, 64 GB)",
                  "categories": "iPhone, test 1",
                  "resouceId": 41
                },
                {
                  "id": 59,
                  "productId": 74,
                  "quantity": 2,
                  "productNumber": "XR_Iphone112",
                  "productName": "Iphone",
                  "categories": "iPhone",
                  "resouceId": 37
                }
              ],
              "kitResouces": [
                {
                  "id": 11,
                  "kitId": 29,
                  "fileName": "Bird-Pic-Wallpapers-025.jpg",
                  "type": 0,
                  "isPrimary": true
                },
                {
                  "id": 13,
                  "kitId": 29,
                  "fileName": "abc.png",
                  "type": 1,
                  "isPrimary": false
                }
              ]
            }
          });
        }
    }

    saveKit(param:any,type:string):Observable<any>{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "id": 29
            }
          });
    }

    markPrimaryImage(param:any):Observable<any>{
    if(JSON.stringify(param)==JSON.stringify({pathVariable: 1, resourceId: 133}))
    {
      return throwError(new Error('Fake error'));
    }
    else{
      return of(true);
    }
    }

    deleteKitResource(param:any):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({pathVariable: 1, resourceId: 133}))
      {
        return throwError(new Error('Fake error'));
      }
      else{
        return of(true);
      }
    }

    renameFile(param:any):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({pathVariable: 1, id: 133, newName: "abc1.xls"}))
      {
        return throwError(new Error('Fake error'));
      }
      else{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "id": 29
            }
          });
        }
    }

    getThumbnailImage(param:any):Observable<any>{
        return of({"url":"google.com/img",
                    "body": new Blob(['image'], {type: "application/octet-stream"})});
    }
}