import { Observable, of, throwError } from "rxjs";

export class mockClientService{

    getClientList(param:any):Observable<any>{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "results": [
                {
                  "name": "@",
                  "status": "Active",
                  "id": 39,
                  "signUpModule": "No"
                },
                {
                  "name": "AFL",
                  "status": "Active",
                  "id": 48,
                  "signUpModule": "No"
                },
                {
                  "name": "Amazonuat",
                  "status": "Active",
                  "id": 37,
                  "signUpModule": "Yes"
                },
                {
                  "name": "Bausch+Lomb",
                  "status": "Active",
                  "id": 38,
                  "signUpModule": "No"
                },
                {
                  "name": "Boston Scientific",
                  "status": "Active",
                  "id": 31,
                  "signUpModule": "No"
                },
                {
                  "name": "Compunneluat",
                  "status": "Active",
                  "id": 43,
                  "signUpModule": "Yes"
                },
                {
                  "name": "Development Testing",
                  "status": "Active",
                  "id": 65,
                  "signUpModule": "No"
                },
                {
                  "name": "Gmail gmail",
                  "status": "Active",
                  "id": 42,
                  "signUpModule": "No"
                },
                {
                  "name": "Google1",
                  "status": "Active",
                  "id": 67,
                  "signUpModule": "No"
                },
                {
                  "name": "Incyte",
                  "status": "Active",
                  "id": 46,
                  "signUpModule": "No"
                }
              ],
              "paginationInfo": {
                "pageSize": 10,
                "totalPages": 4,
                "totalRecords": 34,
                "curPage": 1
              }
            }
          });
    }

    getClientSetting(param:any):Observable<any>{
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
                "reportSetting": {
                  "orderDetailReport": true,
                  "damageProductReport": false,
                  "orderMonthlyReport": false,
                  "productListingReport": true,
                  "productUsagesMothlyReport": true,
                  "orderSummaryReport": true,
                  "productUsagesReport": true,
                  "inventoryReport": false
                },
                "isEventEnable": true,
                "primaryAccountManagerId": null,
                "primaryAccountManagerName": null,
                "welcomeTxt": "<p>This is dummy content for testing purpose, please ignore it.&nbsp;This is dummy content for <a href=\"https://www.google.com/\" target=\"_blank\">testing</a> purpose, please ignore it. <a href=\"https://www.google.com/\" >It is link testing content.</a></p>\n\n<p>bbn</p>\n\n<p>This is bullet&nbsp;text content:</p>\n\n<ul>\n\t<li>Test 1 txtx</li>\n\t<li>Test 1 txtx</li>\n\t<li>Test 1 txtx</li>\n\t<li>Test 1 txtx</li>\n</ul>\n\n<p>This is bulleteted text content:</p>\n\n<ol>\n\t<li>Test txt only 1</li>\n\t<li>Test txt only 1</li>\n\t<li>Test txt only 1</li>\n\t<li>Test txt only 1</li>\n\t<li>Test txt only 1</li>\n</ol>\n\n<p>Rest all is dummy x<sup>2&nbsp;</sup><strong>&nbsp;</strong></p>\n\n<p><strong>This is bold text.</strong></p>\n\n<p><font color=\"#C0392B\"><u><strong>This is bold text.</strong></u></font></p>\n\n<p><em><strong>This is bold text.</strong></em></p>\n",
                "welcomeTitle": "Lorem ipsum dolor sit amet, consectetur adipiscing",
                "creditCardPayment": true,
                "welcome": true
              }
            }
          })
    }

    changeStatus(status:any):Observable<any>{
        return of(true);
    }

    getClientDetailById(param:any):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({pathVariable:1}))
      {
        return throwError(new Error('Fake error'));
      }
      else{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "client": {
                "name": "Amazonuat",
                "domain": "amazonuat",
                "isStoreCreated": true
              }
            }
          })
        }
    }

    submitClientDetail(param:any):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({name:'test',domain:'test',pathVariable:1}))
      {
        return throwError(new Error('Fake error'));
      }
      else{
        return of({
          "responseCode": "S0001",
          "responseDescription": "Success",
          "response": {
            "id": 69
          }
        });
      }
    }

    putClientSetting(param:any):Observable<any>{
        return of(true);
    }

    getThemeSettings(param:any):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({pathVariable:2}))
      {
        return of({
          "responseCode": "S0001",
          "responseDescription": "Success",
          "response": {
            "theme": null
          }
        })
      }
      else{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "theme": {
                "actionButtonColorCode": "#D11E47",
                "clientLogo": "fd6fc688-f5f6-4614-9b3b-b423c8b379b4pexels-photo-414612.jpeg",
                "footer": "<p>Footer Information goes in here</p>\n",
                "header": "<p>Header Information goes in here</p>\n",
                "headerColorCode": "#1C57B7",
                "bodyTextColorCode": "#616167"
              }
            }
          })
        }
    }

    uploadThemeSettings(param:any):Observable<any>{
        return of({"responseCode": "S0001", "responseDescription": "Success", "response": {"id": 31}});
    }

    downloadLogo(param:any):Observable<any>{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "fileName": "pexels-photo-414612.jpeg",
              "file": ""
            }
          })
    }

    createStore(param:any):Observable<any>{
        return of(true);
    }

    putModuleServicePage(param:any):Observable<any>{
        return of(true);
    }

    getClientModuleSetting(param:any):Observable<any>{
        return of({
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
                      "id": 340,
                      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin orci lorem, finibus imperdiet leo dignissim sed. In quis dolor consequat, ultricies mauris ac, dictum enim. Aenean volutpat sollicitudin enim eu iaculis. Suspendisse a tempus turpis. Curabitur tempor porta nunc a varius. Praese",
                      "type": "READ_ONLY",
                      "lookupValue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin orci lorem, finibus imperdiet leo dignissim sed. In quis dolor consequat, ultricies mauris ac, dictum enim. Aenean volutpat sollicitudin enim eu iaculis. Suspendisse a tempus turpis. Curabitur tempor porta nunc a varius. Praesent iaculis sem at orci placerat, vitae malesuada nibh scelerisque. In purus nulla, venenatis in aliquet hendrerit, vehicula vel leo. Aliquam posuere, nibh vitae hendrerit sollicitudin, lectus eros convallis augue, sit amet tincidunt diam velit maximus lectus. Nullam eget enim accumsan, imperdiet turpis vehicula, bibendum ante. Pellentesque mattis eros non risus tristique, ut sagittis dolor placerat. Aenean faucibus fermentum elementum.\n\nCurabitur vel dictum nisi. Morbi at pretium mauris. Sed tristique eros aliquet enim fringilla, nec vulputate elit maximus. Ut massa erat, sodales non blandit euismod, consequat in est. Maecenas posuere, felis eu tincidunt luctus, massa augue ultrices velit, at venenatis diam augue in diam. Mauris semper quam nec dictum lobortis. Nam in sapien lorem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a scelerisque nibh. Quisque luctus sed orci in semper. Aenean diam orci, rutrum sed ultrices eget, sollicitudin non augue. Ut eget massa quis neque congue egestas id ac arcu. Curabitur varius turpis eu orci luctus, quis vulputate purus sagittis. Pellentes",
                      "fieldLength": 0,
                      "isActive": false,
                      "linkedFieldValue": null,
                      "linkedFieldId": null,
                      "isDisplayed": null,
                      "isRequired": false,
                      "fieldSequence": 5
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
                      "id": 338,
                      "description": "R",
                      "type": "CHECK_BOX",
                      "lookupValue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin orci lorem, finibus imperdiet leo dignissim sed. In quis dolor consequat, ultricies mauris ac, dictum enim. Aenean volutpat sollicitudin enim eu iaculis. Suspendisse a tempus turpis. Curabitur tempor porta nunc a varius. Praesent iaculis sem at orci placerat, vitae malesuada nibh scelerisque. In purus nulla, venenatis in aliquet hendrerit, vehicula vel leo. Aliquam posuere, nibh vitae hendrerit sollicitudin, lectus eros convallis augue, sit amet tincidunt diam velit maximus lectus. Nullam eget enim accumsan, imperdiet turpis vehicula, bibendum ante. Pellentesque mattis eros non risus tristique, ut sagittis dolor placerat. Aenean faucibus fermentum elementum.  Curabitur vel dictum nisi. Morbi at pretium mauris. Sed tristique eros aliquet enim fringilla, nec vulputate elit maximus. Ut massa erat, sodales non blandit euismod, consequat in est. Maecenas posuere, felis eu tincidunt luctus, massa augue ultrices velit, at venenatis diam augue in diam. Mauris semper quam nec dictum lobortis. Nam in sapien lorem.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a scelerisque nibh. Quisque luctus sed orci in semper. Aenean diam orci, rutrum sed ultrices eget, sollicitudin non augue. Ut eget massa quis n ~ eque congue egestas id ac arcu. Curabitur varius turpis eu orci luc ~ tus, quis vulputate purus sagittis. Pellentes",
                      "fieldLength": 0,
                      "isActive": false,
                      "linkedFieldValue": null,
                      "linkedFieldId": null,
                      "isDisplayed": null,
                      "isRequired": false,
                      "fieldSequence": 1
                    },
                    {
                      "id": 339,
                      "description": "RR",
                      "type": "READ_ONLY",
                      "lookupValue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin orci lorem, finibus imperdiet leo dignissim sed. In quis dolor consequat, ultricies mauris ac, dictum enim. Aenean volutpat sollicitudin enim eu iaculis. Suspendisse a tempus turpis. Curabitur tempor porta nunc a varius. Praesent iaculis sem at orci placerat, vitae malesuada nibh scelerisque. In purus nulla, venenatis in aliquet hendrerit, vehicula vel leo. Aliquam posuere, nibh vitae hendrerit sollicitudin, lectus eros convallis augue, sit amet tincidunt diam velit maximus lectus. Nullam eget enim accumsan, imperdiet turpis vehicula, bibendum ante. Pellentesque mattis eros non risus tristique, ut sagittis dolor placerat. Aenean faucibus fermentum elementum.\n\nCurabitur vel dictum nisi. Morbi at pretium mauris. Sed tristique eros aliquet enim fringilla, nec vulputate elit maximus. Ut massa erat, sodales non blandit euismod, consequat in est. Maecenas posuere, felis eu tincidunt luctus, massa augue ultrices velit, at venenatis diam augue in diam. Mauris semper quam nec dictum lobortis. Nam in sapien lorem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a scelerisque nibh. Quisque luctus sed orci in semper. Aenean diam orci, rutrum sed ultrices eget, sollicitudin non augue. Ut eget massa quis neque congue egestas id ac arcu. Curabitur varius turpis eu orci luctus, quis vulputate purus sagittis. Pellentes",
                      "fieldLength": 0,
                      "isActive": false,
                      "linkedFieldValue": null,
                      "linkedFieldId": null,
                      "isDisplayed": null,
                      "isRequired": false,
                      "fieldSequence": 2
                    },
                    {
                      "id": 341,
                      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin orci lorem, finibus imperdiet leo dignissim sed. In quis dolor consequat, ultricies mauris ac, dictum enim. Aenean volutpat sollicitudin enim eu iaculis. Suspendisse a tempus turpis. Curabitur tempor porta nunc a varius. Praese",
                      "type": "CHECK_BOX",
                      "lookupValue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin orci lorem, finibus imperdiet leo dignissim sed. In quis dolor consequat, ultricies mauris ac, dictum enim. Aenean volutpat sollicitudin enim eu iaculis. Suspendisse a tempus turpis. Curabitur tempor porta nunc a varius. Praesent iaculis sem at orci placerat, vitae malesuada nibh scelerisque. In purus nulla, venenatis in aliquet hendrerit, vehicula vel leo. Aliquam posuere, nibh vitae hendrerit sollicitudin, lectus eros convallis augue, sit amet tincidunt diam velit maximus lectus. Nullam eget enim accumsan, imperdiet turpis vehicula, bibendum ante. Pellentesque mattis eros non risus tristique, ut sagittis dolor placerat. Aenean faucibus fermentum elementum.  Curabitur vel dictum nisi. Morbi at pretium mauris. Sed tristique eros aliquet enim fringilla, nec vulputate elit maximus. Ut massa erat, sodales non blandit euismod, consequat in est. Maecenas posuere, felis eu tincidunt luctus, massa augue ultrices velit, at venenatis diam augue in diam. Mauris semper quam nec dictum lobortis. Nam in sapien lorem.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a scelerisque nibh. Quisque luctus sed orci in semper. Aenean diam orci, rutrum sed ultrices eget, sollicitudin non augue. Ut eget massa quis neque congue egestas id ac arcu. Curabitur varius turpis eu orci lu ~ ctus, quis vulputate purus sagittis. Pellentes",
                      "fieldLength": 0,
                      "isActive": false,
                      "linkedFieldValue": null,
                      "linkedFieldId": null,
                      "isDisplayed": null,
                      "isRequired": false,
                      "fieldSequence": 3
                    },
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
                    },
                    {
                      "id": 334,
                      "description": "Test spacing",
                      "type": "TEXT_AREA",
                      "lookupValue": "This is tedst only content for spacing issue This is tedst only content for spacing issueThis is tedst only content for spacing issueThis is tedst only content for spacing issueThis is tedst only content for spacing issueThis is tedst only content for spacing issueThis is tedst only content for spacing issue",
                      "fieldLength": 5000,
                      "isActive": false,
                      "linkedFieldValue": null,
                      "linkedFieldId": null,
                      "isDisplayed": null,
                      "isRequired": true,
                      "fieldSequence": 5
                    },
                    {
                      "id": 336,
                      "description": "RO1",
                      "type": "READ_ONLY",
                      "lookupValue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin orci lorem, finibus imperdiet leo dignissim sed. In quis dolor consequat, ultricies mauris ac, dictum enim. Aenean volutpat sollicitudin enim eu iaculis. Suspendisse a tempus turpis. Curabitur tempor porta nunc a varius. Praesent iaculis sem at orci placerat, vitae malesuada nibh scelerisque. In purus nulla, venenatis in aliquet hendrerit, vehicula vel leo. Aliquam posuere, nibh vitae hendrerit sollicitudin, lectus eros convallis augue, sit amet tincidunt diam velit maximus lectus. Nullam eget enim accumsan, imperdiet turpis vehicula, bibendum ante. Pellentesque mattis eros non risus tristique, ut sagittis dolor placerat. Aenean faucibus fermentum elementum.\n\nCurabitur vel dictum nisi. Morbi at pretium mauris. Sed tristique eros aliquet enim fringilla, nec vulputate elit maximus. Ut massa erat, sodales non blandit euismod, consequat in est. Maecenas posuere, felis eu tincidunt luctus, massa augue ultrices velit, at venenatis diam augue in diam. Mauris semper quam nec dictum lobortis. Nam in sapien lorem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a scelerisque nibh. Quisque luctus sed orci in semper. Aenean diam orci, rutrum sed ultrices eget, sollicitudin non augue. Ut eget massa quis neque congue egestas id ac arcu. Curabitur varius turpis eu orci luctus, quis vulputate purus sagittis. Pellentes",
                      "fieldLength": 0,
                      "isActive": false,
                      "linkedFieldValue": null,
                      "linkedFieldId": null,
                      "isDisplayed": null,
                      "isRequired": false,
                      "fieldSequence": 6
                    },
                    {
                      "id": 337,
                      "description": "CH",
                      "type": "CHECK_BOX",
                      "lookupValue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin orci lorem, finibus imperdiet leo dignissim sed. In quis dolor consequat, ultricies mauris ac, dictum enim. Aenean volutpat sollicitudin enim eu iaculis. Suspendisse a tempus turpis. Curabitur tempor porta nunc a varius. Praesent iaculis sem at orci placerat, vitae malesuada nibh scelerisque. In purus nulla, venenatis in aliquet hendrerit, vehicula vel leo. Aliquam posuere, nibh vitae hendrerit sollicitudin, lectus eros convallis augue, sit amet tincidunt diam velit maximus lectus. Nullam eget enim accumsan, imperdiet turpis vehicula, bibendum ante. Pellentesque mattis eros non risus tristique, ut sagittis dolor placerat. Aenean faucibus fermentum elementum.  Curabitur vel dictum nisi. Morbi at pretium mauris. Sed tristique eros aliquet enim fringilla, nec vulputate elit maximus. Ut massa erat, sodales non blandit euismod, consequat in est. Maecenas posuere, felis eu tincidunt luctus, massa augue ultrices velit, at ve ~ nenatis diam augue in diam. Mauris semper quam nec dictum lobortis. Nam in sapien lorem.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a scelerisque nibh. Quisque luctus sed orc ~ i in semper. Aenean diam orci, rutrum sed ultrices eget, sollicitudin non augue. Ut eget massa quis neque congue egestas id ac arcu. Curabitur varius turpis eu orci luctus, quis vulputate purus sagittis. Pellente ~ s",
                      "fieldLength": 0,
                      "isActive": false,
                      "linkedFieldValue": null,
                      "linkedFieldId": null,
                      "isDisplayed": null,
                      "isRequired": false,
                      "fieldSequence": 7
                    },
                    {
                      "id": 342,
                      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin orci lorem, finibus imperdiet leo dignissim sed. In quis dolor consequat, ultricies mauris ac, dictum enim. Aenean volutpat sollicitudin enim eu iaculis. Suspendisse a tempus turpis. Curabitur tempor porta nunc a varius. Praese",
                      "type": "READ_ONLY",
                      "lookupValue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin orci lorem, finibus imperdiet leo dignissim sed. In quis dolor consequat, ultricies mauris ac, dictum enim. Aenean volutpat sollicitudin enim eu iaculis. Suspendisse a tempus turpis. Curabitur tempor porta nunc a varius. Praesent iaculis sem at orci placerat, vitae malesuada nibh scelerisque. In purus nulla, venenatis in aliquet hendrerit, vehicula vel leo. Aliquam posuere, nibh vitae hendrerit sollicitudin, lectus eros convallis augue, sit amet tincidunt diam velit maximus lectus. Nullam eget enim accumsan, imperdiet turpis vehicula, bibendum ante. Pellentesque mattis eros non risus tristique, ut sagittis dolor placerat. Aenean faucibus fermentum elementum.\n\nCurabitur vel dictum nisi. Morbi at pretium mauris. Sed tristique eros aliquet enim fringilla, nec vulputate elit maximus. Ut massa erat, sodales non blandit euismod, consequat in est. Maecenas posuere, felis eu tincidunt luctus, massa augue ultrices velit, at venenatis diam augue in diam. Mauris semper quam nec dictum lobortis. Nam in sapien lorem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a scelerisque nibh. Quisque luctus sed orci in semper. Aenean diam orci, rutrum sed ultrices eget, sollicitudin non augue. Ut eget massa quis neque congue egestas id ac arcu. Curabitur varius turpis eu orci luctus, quis vulputate purus sagittis. Pellentes",
                      "fieldLength": 0,
                      "isActive": false,
                      "linkedFieldValue": null,
                      "linkedFieldId": null,
                      "isDisplayed": null,
                      "isRequired": false,
                      "fieldSequence": 8
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
                      "id": 328,
                      "description": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester t",
                      "type": "TEXT_BOX",
                      "lookupValue": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevel",
                      "fieldLength": 0,
                      "isActive": false,
                      "linkedFieldValue": null,
                      "linkedFieldId": null,
                      "isDisplayed": null,
                      "isRequired": true,
                      "fieldSequence": 2
                    },
                    {
                      "id": 343,
                      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin orci lorem, finibus imperdiet leo dignissim sed. In quis dolor consequat, ultricies mauris ac, dictum enim. Aenean volutpat sollicitudin enim eu iaculis. Suspendisse a tempus turpis. Curabitur tempor porta nunc a varius. Praese",
                      "type": "READ_ONLY",
                      "lookupValue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin orci lorem, finibus imperdiet leo dignissim sed. In quis dolor consequat, ultricies mauris ac, dictum enim. Aenean volutpat sollicitudin enim eu iaculis. Suspendisse a tempus turpis. Curabitur tempor porta nunc a varius. Praesent iaculis sem at orci placerat, vitae malesuada nibh scelerisque. In purus nulla, venenatis in aliquet hendrerit, vehicula vel leo. Aliquam posuere, nibh vitae hendrerit sollicitudin, lectus eros convallis augue, sit amet tincidunt diam velit maximus lectus. Nullam eget enim accumsan, imperdiet turpis vehicula, bibendum ante. Pellentesque mattis eros non risus tristique, ut sagittis dolor placerat. Aenean faucibus fermentum elementum.\n\nCurabitur vel dictum nisi. Morbi at pretium mauris. Sed tristique eros aliquet enim fringilla, nec vulputate elit maximus. Ut massa erat, sodales non blandit euismod, consequat in est. Maecenas posuere, felis eu tincidunt luctus, massa augue ultrices velit, at venenatis diam augue in diam. Mauris semper quam nec dictum lobortis. Nam in sapien lorem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a scelerisque nibh. Quisque luctus sed orci in semper. Aenean diam orci, rutrum sed ultrices eget, sollicitudin non augue. Ut eget massa quis neque congue egestas id ac arcu. Curabitur varius turpis eu orci luctus, quis vulputate purus sagittis. Pellentes",
                      "fieldLength": 0,
                      "isActive": false,
                      "linkedFieldValue": null,
                      "linkedFieldId": null,
                      "isDisplayed": null,
                      "isRequired": false,
                      "fieldSequence": 3
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
                      "serviceTitleName": "Development Testing",
                      "serviceTitleSequence": 0,
                      "id": 125,
                      "isActive": false,
                      "fieldDetails": [
                        {
                          "id": 319,
                          "description": "Development testeropment tester testing own sideDevelopment tester t",
                          "type": "CHECK_BOX",
                          "lookupValue": "Development tester testing own sideDevelopment tester testing own side",
                          "fieldLength": 0,
                          "isActive": false,
                          "linkedFieldValue": null,
                          "linkedFieldId": null,
                          "isDisplayed": null,
                          "isRequired": true,
                          "fieldSequence": 1
                        },
                        {
                          "id": 318,
                          "description": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester t",
                          "type": "CHECK_BOX",
                          "lookupValue": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own side",
                          "fieldLength": 0,
                          "isActive": false,
                          "linkedFieldValue": null,
                          "linkedFieldId": null,
                          "isDisplayed": null,
                          "isRequired": true,
                          "fieldSequence": 2
                        },
                        {
                          "id": 321,
                          "description": "test2",
                          "type": "CHECK_BOX",
                          "lookupValue": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own side",
                          "fieldLength": 0,
                          "isActive": false,
                          "linkedFieldValue": null,
                          "linkedFieldId": null,
                          "isDisplayed": null,
                          "isRequired": false,
                          "fieldSequence": 3
                        },
                        {
                          "id": 320,
                          "description": " test",
                          "type": "CHECK_BOX",
                          "lookupValue": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own side",
                          "fieldLength": 0,
                          "isActive": false,
                          "linkedFieldValue": null,
                          "linkedFieldId": null,
                          "isDisplayed": null,
                          "isRequired": false,
                          "fieldSequence": 4
                        },
                        {
                          "id": 317,
                          "description": "Development tester testing own side Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own side",
                          "type": "CHECK_BOX",
                          "lookupValue": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevel",
                          "fieldLength": 12,
                          "isActive": false,
                          "linkedFieldValue": null,
                          "linkedFieldId": null,
                          "isDisplayed": null,
                          "isRequired": true,
                          "fieldSequence": 5
                        },
                        {
                          "id": 322,
                          "description": "Development tester testing own side",
                          "type": "CHECK_BOX",
                          "lookupValue": "Development tester testing own side",
                          "fieldLength": 0,
                          "isActive": false,
                          "linkedFieldValue": null,
                          "linkedFieldId": null,
                          "isDisplayed": null,
                          "isRequired": true,
                          "fieldSequence": 6
                        },
                        {
                          "id": 323,
                          "description": "Development tester testing own side",
                          "type": "CHECK_BOX",
                          "lookupValue": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own side",
                          "fieldLength": 0,
                          "isActive": false,
                          "linkedFieldValue": null,
                          "linkedFieldId": null,
                          "isDisplayed": null,
                          "isRequired": true,
                          "fieldSequence": 7
                        },
                        {
                          "id": 324,
                          "description": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own side",
                          "type": "RADIO_BUTTON",
                          "lookupValue": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own side",
                          "fieldLength": 0,
                          "isActive": false,
                          "linkedFieldValue": null,
                          "linkedFieldId": null,
                          "isDisplayed": null,
                          "isRequired": true,
                          "fieldSequence": 8
                        },
                        {
                          "id": 325,
                          "description": "Development tester testing own side",
                          "type": "RADIO_BUTTON",
                          "lookupValue": "Development tester testing own sideDevelopment tester testing own side",
                          "fieldLength": 0,
                          "isActive": false,
                          "linkedFieldValue": null,
                          "linkedFieldId": null,
                          "isDisplayed": null,
                          "isRequired": true,
                          "fieldSequence": 9
                        },
                        {
                          "id": 326,
                          "description": "amit test",
                          "type": "RADIO_BUTTON",
                          "lookupValue": "Development tester testing own sideDevelopment tester testing own side",
                          "fieldLength": 0,
                          "isActive": false,
                          "linkedFieldValue": "Development tester testing own sideDevelopment tester testing own side",
                          "linkedFieldId": 325,
                          "isDisplayed": null,
                          "isRequired": true,
                          "fieldSequence": 10
                        },
                        {
                          "id": 327,
                          "description": "amit",
                          "type": "RADIO_BUTTON",
                          "lookupValue": "Development tester testing own side",
                          "fieldLength": 0,
                          "isActive": false,
                          "linkedFieldValue": null,
                          "linkedFieldId": null,
                          "isDisplayed": null,
                          "isRequired": true,
                          "fieldSequence": 11
                        }
                      ]
                    },
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
                          "isActive": false,
                          "linkedFieldValue": null,
                          "linkedFieldId": null,
                          "isDisplayed": null,
                          "isRequired": false,
                          "fieldSequence": 2
                        },
                        {
                          "id": 329,
                          "description": "test field 3 of service title 2",
                          "type": "CHECK_BOX",
                          "lookupValue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque lorem et urna laoreet pharetra. Donec vel nulla lorem. Vestibulum varius magna nulla. Mauris egestas diam eget elit venenatis fringilla. Mauris dictum, nunc ut efficitur lacinia, ante mauris suscipit odio, non rhoncus leo leo at quam~Morbi eu lorem vulputate, porta dolor interdum, efficitur est. Vestibulum ac leo eget nisi suscipit ultricies. Quisque eu massa eu neque posuere bibendum vitae eget sem. Pellentesque eros est, vehicula vitae faucibus sit amet, ultrices in velit. Nulla ornare rhoncus condimentum. Vestibulum dapibus, orci ut auctor vestib~Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque lorem et urna laoreet pharetra. Donec vel nulla lorem. Vestibulum varius magna nulla. Mauris egestas diam eget elit venenatis fringilla. Mauris dictum, nunc ut efficitur lacinia, ante mauris suscipit odio, non rhoncus leo leo at quam. Sed vitae porta augue, ac varius mi. Pellentesque at massa sagittis, gravida ante et, imperdiet mi. Morbi pretium, mi sit amet sollicitudin dignissim~aesent ullamcorper eget lacus vitae convallis. Morbi sit amet dui arcu. Nunc sagittis erat vitae a~orem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque lorem et urna laor",
                          "fieldLength": 0,
                          "isActive": false,
                          "linkedFieldValue": null,
                          "linkedFieldId": null,
                          "isDisplayed": null,
                          "isRequired": false,
                          "fieldSequence": 3
                        },
                        {
                          "id": 330,
                          "description": "test field 4 of service title 2",
                          "type": "CHECK_BOX",
                          "lookupValue": "hendrerit sollicitudin diam. Sed mi lacus, feugiat in elit in, ultrices efficitur turpis. Phasellus mollis a tellus at condimentum. Praesent vel facilisis leo.Quisque sit amet nisl sed~ntum tellus eu sapien euismod eleifend a eget nisl. Morbi sollicitudin condimentum augue, in auctor quam semper vel. Nullam tellus urna, tincidunt et est sed,~est ultricies viverra at ut leo. Pellentesque tincidunt gravida odio in rutrum. Vestibulum semper vitae sapien ac dictum. Cras elementum, leo quis maximus pretium, ex nisl faucibus odio, ut tempor ante elit et tortor. Nu  lla lectus justo, placerat feugiat mi quis, lacinia ornare nulla. Maecenas iaculis ornare nunc. Duis condimentum tellus eu sapien euismod eleifend a eget nisl. Morbi sollicitudin condimentum augue, in auctor quam semper vel. Nullam tellus urna, tincidunt et est sed, hendrerit sollicitudin diam. Sed mi lacus, feugiat in elit in, ultrices efficitur turpis. Phasellus mollis a tellus at condimentum. Praesent vel facilisis leo.Quisque sit amet nisl sed est ultricie~\"Quisque sit amet nisl sed est ultricies viverra at ut leo. Pellentesque tincidunt gravida odio in rutrum",
                          "fieldLength": 0,
                          "isActive": false,
                          "linkedFieldValue": null,
                          "linkedFieldId": null,
                          "isDisplayed": null,
                          "isRequired": false,
                          "fieldSequence": 4
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
                        },
                        {
                          "id": 303,
                          "description": "test",
                          "type": "TEXT_AREA",
                          "lookupValue": "",
                          "fieldLength": 0,
                          "isActive": false,
                          "linkedFieldValue": "YES",
                          "linkedFieldId": 292,
                          "isDisplayed": null,
                          "isRequired": false,
                          "fieldSequence": 6
                        },
                        {
                          "id": 304,
                          "description": "Font issue testing",
                          "type": "READ_ONLY",
                          "lookupValue": "Font issue testing only content. Please ignore it for now. Font issue testing only content. Please ignore it for now.",
                          "fieldLength": 1000,
                          "isActive": false,
                          "linkedFieldValue": null,
                          "linkedFieldId": null,
                          "isDisplayed": null,
                          "isRequired": true,
                          "fieldSequence": 7
                        },
                        {
                          "id": 305,
                          "description": "Blank Label without any text value testing Blank Label without any text value testingBlank Label without any text value testingBlank Label without any text value testing",
                          "type": "READ_ONLY",
                          "lookupValue": "vdvfdbvfdb",
                          "fieldLength": 1,
                          "isActive": false,
                          "linkedFieldValue": null,
                          "linkedFieldId": null,
                          "isDisplayed": null,
                          "isRequired": false,
                          "fieldSequence": 8
                        },
                        {
                          "id": 306,
                          "description": "Testing from development view",
                          "type": "READ_ONLY",
                          "lookupValue": "Testing from development view Font issue testing only content. Please ignore it for now. Font issue testing only content. Please ignore it for now.\nFont issue testing only content. Please ignore it for now. Font issue testing only content. Please ignore it for now.\n\nFont issue testing only content. ",
                          "fieldLength": 0,
                          "isActive": false,
                          "linkedFieldValue": null,
                          "linkedFieldId": null,
                          "isDisplayed": null,
                          "isRequired": false,
                          "fieldSequence": 9
                        },
                        {
                          "id": 331,
                          "description": "Test Development",
                          "type": "RADIO_BUTTON",
                          "lookupValue": "Testing1 ~ Testing 2 ~ Testing 3",
                          "fieldLength": 0,
                          "isActive": false,
                          "linkedFieldValue": null,
                          "linkedFieldId": null,
                          "isDisplayed": null,
                          "isRequired": true,
                          "fieldSequence": 10
                        },
                        {
                          "id": 332,
                          "description": "Checkbox space",
                          "type": "CHECK_BOX",
                          "lookupValue": "test1 ~ test2 ~ test3",
                          "fieldLength": 300,
                          "isActive": false,
                          "linkedFieldValue": null,
                          "linkedFieldId": null,
                          "isDisplayed": null,
                          "isRequired": true,
                          "fieldSequence": 11
                        },
                        {
                          "id": 333,
                          "description": "test",
                          "type": "TEXT_AREA",
                          "lookupValue": "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest",
                          "fieldLength": 500,
                          "isActive": false,
                          "linkedFieldValue": null,
                          "linkedFieldId": null,
                          "isDisplayed": null,
                          "isRequired": true,
                          "fieldSequence": 12
                        },
                        {
                          "id": 335,
                          "description": "test 2 space",
                          "type": "TEXT_AREA",
                          "lookupValue": "this is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only content",
                          "fieldLength": 0,
                          "isActive": false,
                          "linkedFieldValue": null,
                          "linkedFieldId": null,
                          "isDisplayed": null,
                          "isRequired": false,
                          "fieldSequence": 13
                        }
                      ]
                    }
                  ],
                  "isServicePageChecked": true
                }
              }
            }
          })
    }

    putOrderingDetail(param:any):Observable<any>{
        return of(true)
    }

    putSignUpDetail(param:any):Observable<any>{
        return of(true)
    }

    putEventDetail(param:any):Observable<any>{
        return of(true)
    }

    deleteHelpResource(param:any):Observable<any>{
        return of(true);
    }

    getAccountManagerList(param:any):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({searchText: "a%2Bb", clientId: 2}))
      {
        return throwError(new Error('Fake error'));
      } 
      else{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": [
              {
                "id": 391,
                "name": "Amanda Lovelady",
                "checked": false
              },
              {
                "id": 114933,
                "name": "Amisha kathuria",
                "checked": false
              },
              {
                "id": 114904,
                "name": "Amit thakur",
                "checked": false
              },
              {
                "id": 268,
                "name": "Anita Thompson",
                "checked": false
              },
              {
                "id": 114953,
                "name": "Anjuli Maya",
                "checked": false
              },
              {
                "id": 114932,
                "name": "Ankur Soni",
                "checked": false
              },
              {
                "id": 371,
                "name": "Ashley Ness",
                "checked": false
              },
              {
                "id": 337,
                "name": "Dan Greco",
                "checked": false
              }]
            })
          }
    }

    getProductExcelList(param:any):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({clientId:1}))
      {
        return throwError(new Error('Fake error'));
      } 
      else{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "results": [
                {
                  "id": 46,
                  "fileName": "SparksLink_Import.xlsx",
                  "type": "PRODUCT_MIGRATION",
                  "successCount": 0,
                  "errorCount": 5,
                  "duplicateCount": 9,
                  "totalCount": 14,
                  "updatedTime": "10-22-2019 11:03:33"
                },
                {
                  "id": 47,
                  "fileName": "SparksLink_Import.xlsx",
                  "type": "PRODUCT_MIGRATION",
                  "successCount": 0,
                  "errorCount": 0,
                  "duplicateCount": 15,
                  "totalCount": 15,
                  "updatedTime": "10-30-2019 12:54:31"
                },
                {
                  "id": 48,
                  "fileName": "event_template.xlsx",
                  "type": "EVENT_MIGRATION",
                  "successCount": 4,
                  "errorCount": 12,
                  "duplicateCount": 0,
                  "totalCount": 16,
                  "updatedTime": "11-14-2019 05:30:35"
                },
                {
                  "id": 49,
                  "fileName": "event_template.xlsx",
                  "type": "EVENT_MIGRATION",
                  "successCount": 0,
                  "errorCount": 16,
                  "duplicateCount": 0,
                  "totalCount": 16,
                  "updatedTime": "11-14-2019 05:42:39"
                },
                {
                  "id": 50,
                  "fileName": "event_template.xlsx",
                  "type": "EVENT_MIGRATION",
                  "successCount": 0,
                  "errorCount": 16,
                  "duplicateCount": 0,
                  "totalCount": 16,
                  "updatedTime": "11-14-2019 05:46:03"
                },
                {
                  "id": 51,
                  "fileName": "dis002 - SL3 Product Import_20191015.xlsx",
                  "type": "PRODUCT_MIGRATION",
                  "successCount": 0,
                  "errorCount": 997,
                  "duplicateCount": 0,
                  "totalCount": 997,
                  "updatedTime": "12-10-2019 09:35:54"
                },
                {
                  "id": 52,
                  "fileName": "dis002 - SL3 Product Import_20191015-v1.xlsx",
                  "type": "PRODUCT_MIGRATION",
                  "successCount": 75,
                  "errorCount": 922,
                  "duplicateCount": 0,
                  "totalCount": 997,
                  "updatedTime": "12-10-2019 09:54:29"
                }
              ]
            }
          })
    }
  }

    renameExcelFile(param:any):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({id:1,newName:"abc1.xls"}))
      {
        return throwError(new Error('Fake error'));
      } 
      else{
        return of(true);
      }
    }

    downloadExcelFile(param:any):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({id:1}))
      {
        return throwError(new Error('Fake error'));
      } 
      else{
        return of(true);
      }
    }

    excelUpload(param:any):Observable<any>{
        return of({
          "responseCode": "S0001",
          "responseDescription": "Success",
          "response":{
            "id":"37",
            "Type":"xls",
            "successCount":"10"
          }
        })
    }

    deleteExcelFile(param:any):Observable<any>{
      if(JSON.stringify(param)==JSON.stringify({id:1}))
      {
        return throwError(new Error('Fake error'));
      } 
      else{
        return of(true);
      }
    }
}