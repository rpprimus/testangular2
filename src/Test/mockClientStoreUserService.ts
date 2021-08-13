import { Observable, of, throwError } from "rxjs";

export class mockClientStoreUserService {
  getStoreUserList(param: any): Observable<any> {
    return of({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": {
        "results": [
          {
            "name": "Abc",
            "email": "abc@gmail.com",
            "workPhone": "99999999",
            "role": "User",
            "hierarchy": "",
            "status": "VERIFICATION_PENDING",
            "id": 114951
          },
          {
            "name": "Ajay Gupta",
            "email": "ajay@compunnel.in",
            "workPhone": "987-159-1523",
            "role": "User",
            "hierarchy": "",
            "status": "LOCKED",
            "id": 114946
          },
          {
            "name": "Amisha",
            "email": "amisha@yopmail.com",
            "workPhone": "012-087-6767",
            "role": "User",
            "hierarchy": "Technology",
            "status": "ACTIVE",
            "id": 114958
          },
          {
            "name": "Amit Thakur",
            "email": "atakur@yopmail.com",
            "workPhone": "9876544563",
            "role": "Store Admin, Regional Manager, User",
            "hierarchy": "Creative",
            "status": "ACTIVE",
            "id": 335
          },
          {
            "name": "Amit Thakur",
            "email": "amit@yopmail.com",
            "workPhone": "989-158-6238",
            "role": "Store Admin, Regional Manager, User",
            "hierarchy": "",
            "status": "ACTIVE",
            "id": 114947
          },
          {
            "name": "Atest",
            "email": "atest@yopmail.com",
            "workPhone": "989-158-6238",
            "role": "User",
            "hierarchy": "Technology",
            "status": "ACTIVE",
            "id": 114920
          },
          {
            "name": "Aziz",
            "email": "aziz@yopmail.com",
            "workPhone": "987-159-1528",
            "role": "Store Admin",
            "hierarchy": "",
            "status": "ACTIVE",
            "id": 114940
          },
          {
            "name": "Deep",
            "email": "deep@yopmail.com",
            "workPhone": "989-145-4354",
            "role": "User, Store Admin",
            "hierarchy": "Creative",
            "status": "ACTIVE",
            "id": 114921
          },
          {
            "name": "Demo User",
            "email": "demo@yopmail.com",
            "workPhone": "21567611004234",
            "role": "User",
            "hierarchy": "Technology",
            "status": "ACTIVE",
            "id": 384
          },
          {
            "name": "Divya1",
            "email": "divya1@yopmail.com",
            "workPhone": "345-675-4345",
            "role": "User",
            "hierarchy": "Creative",
            "status": "ACTIVE",
            "id": 114973
          },
          {
            "name": "F11",
            "email": "f11@yopmail.com",
            "workPhone": "989-158-6238",
            "role": "User",
            "hierarchy": "",
            "status": "ACTIVE",
            "id": 114922
          },
          {
            "name": "Faiz",
            "email": "faiz.krm121@yopmail.com",
            "workPhone": "99999993242",
            "role": "User",
            "hierarchy": "Technology",
            "status": "ACTIVE",
            "id": 348
          }
        ],
        "paginationInfo": {
          "pageSize": 12,
          "totalPages": 4,
          "totalRecords": 47,
          "curPage": 1
        }
      }
    });
  }

  getRoles(param: any): Observable<any> {
    return of({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": {
        "results": [
          {
            "id": 4,
            "name": "Store Admin",
            "checked": true
          },
          {
            "id": 5,
            "name": "Regional Manager",
            "checked": false
          },
          {
            "id": 6,
            "name": "User",
            "checked": false
          }
        ]
      }
    })
  }

  getHierarchy(param: any): Observable<any> {
    return of({
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
    })
  }

  changeStatus(param: any): Observable<any> {
    return of({ "response": { "responseDescription": "Success" } });
  }

  resendEmailVerification(param: any): Observable<any> {
    return of({ "response": { "responseDescription": "Success" } });
  }

  getStoreUser(param: any): Observable<any> {
    return of({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": {
        "clientId": 37,
        "id": 114951,
        "regionalManagerId": null,
        "name": "Abc",
        "email": "abc@gmail.com",
        "password": null,
        "confirmPassword": null,
        "mobileNumber": "999999999",
        "workPhoneNumber": "99999999",
        "designation": null,
        "isLowThreshold": null,
        "isOrderWithoutPayment": true,
        "isAssociateOrdering": false,
        "roleIds": [
          6
        ],
        "visibilityGroupIds": [
          95
        ],
        "hierarchyId": null,
        "userStatusCode": "VERIFICATION_PENDING",
        "isOrderNotification": null,
        "city": "Noida",
        "stateId": 1,
        "countryId": 2,
        "addressOne": "Address 1",
        "addressTwo": "Address 2",
        "eventZip": "110020"
      }
    })
  }

  getRegionalManager(param: any): Observable<any> {
    return of({
      "responseCode": "S0001",
      "responseDescription": "Success",
      "response": [
        {
          "id": 335,
          "name": "Amit Thakur",
          "checked": false
        },
        {
          "id": 392,
          "name": "Noida",
          "checked": false
        },
        {
          "id": 114947,
          "name": "Amit Thakur",
          "checked": false
        },
        {
          "id": 114926,
          "name": "Satish",
          "checked": false
        }
      ]
    })
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
        }
      ]
    })
  }

  addClientStoreUser(param: any): Observable<any> {
    if(JSON.stringify(param)==JSON.stringify({id: "1", roleIds: [4], pathVariable: "1"}))
    {
      //return of({"errorCode": "E1002","errorDescription": "Required Field Missing Parameter :{0}"});
      return throwError(new Error('Fake error'));
    }

    else{
    return of(true);
    }
  }

  getClientSetting(param: any): Observable<any> {
    if(param)
    {
      return of({
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
          })
    }
  }

}