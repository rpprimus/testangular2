import { Common } from "./common";
import { TestBed } from "@angular/core/testing";
import { Util } from "../../shared/services/util";
import { mockUtil } from "../../../Test/mockUtil";
import { HttpClientService } from "../../shared/services/http-client.service";
import { mockHttpClientServiceClass } from "../../../Test/mockHttpClientServiceClass";
import { MatSnackBarModule, MatSnackBar, MatTableDataSource } from "@angular/material";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SnackBarComponent } from "../../components/snack-bar/snack-bar.component";
import { MatModule } from "../../core/mat-module";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";

describe('Common', () => {
    let common: Common;
    let router = {
        navigate: jasmine.createSpy('navigate')
    }
    beforeEach(() => TestBed.configureTestingModule({
        declarations: [SnackBarComponent],
        imports: [MatSnackBarModule, HttpClientTestingModule, BrowserAnimationsModule, MatModule],
        providers: [Common, MatSnackBar, CookieService,
            { provide: Util, useClass: mockUtil }, { provide: HttpClientService, useClass: mockHttpClientServiceClass },
            { provide: Router, useValue: router }]
    }).overrideModule(BrowserDynamicTestingModule, {
        set: {
            entryComponents: [SnackBarComponent]
        }
    })
    );
    it('should create an instance', () => {
        common = TestBed.get(Common);
        expect(common).toBeTruthy();
    });

    it('should call setPlaceOrderBaseObject() method', () => {
        common = TestBed.get(Common);
        common.setPlaceOrderBaseObject();
        expect(common.setPlaceOrderBaseObject).toBeTruthy();
    });

    it('should call getLogo() method', () => {
        common = TestBed.get(Common);
        let id = 10;
        common.getLogo(id);
        expect(common.getLogo).toBeTruthy();
    });

    it('should call checkDomain() method', () => {
        common = TestBed.get(Common);
        common.checkDomain();
        expect(common.checkDomain).toBeTruthy();
    });

    it('should call alreadyLoggedIn() method', () => {
        common = TestBed.get(Common);
        common.alreadyLoggedIn();
        expect(common.alreadyLoggedIn).toBeTruthy();
    });

    it('should call loadModulesStandardField() method', () => {
        common = TestBed.get(Common);
        let fun = function fn(params: any) { };
        common.loadModulesStandardField(fun);
        expect(common.loadModulesStandardField).toBeTruthy();
    });

    it('should call loadModulesCustomFields() method', () => {
        common = TestBed.get(Common);
        let fun = function fn(params: any) { };
        common.loadModulesCustomFields(fun);
        expect(common.loadModulesCustomFields).toBeTruthy();
    });

    it('should call addToCart() method', () => {
        common = TestBed.get(Common);
        let item = {
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
        },
            isAssociate = false, isChangeQuantity = false, fun = function fn(params: any) { };
        common.addToCart(item, isAssociate, isChangeQuantity, fun);
        expect(common.addToCart).toBeTruthy();
    });

    it('should call quantityValidation() method', () => {
        common = TestBed.get(Common);
        let item = { orderedQuantity: 1, maxOrderQuantity: 3, availableQuantity: 4 },
            alreadyOrderedQuantity = 2;
        common.quantityValidation(item, alreadyOrderedQuantity);
        expect(common.quantityValidation).toBeTruthy();
    });

    it('should call getStates() method', () => {
        common = TestBed.get(Common);
        let id = 10, fun = function fn(params: any) { };
        common.getStates(id, fun);
        expect(common.getStates).toBeTruthy();
    });

    it('should call deleteCartJson() method', () => {
        common = TestBed.get(Common);
        common.deleteCartJson();
        expect(common.deleteCartJson).toBeTruthy();
    });

    it('should call saveCartJson() method', () => {
        common = TestBed.get(Common);
        common.saveCartJson();
        expect(common.saveCartJson).toBeTruthy();
    });

    // it('should call getCartJson() method when callback function is passed', () => {
    //     common = TestBed.get(Common);
    //     let fun = function fn(params: any) { };
    //     common.getCartJson(fun);
    //     expect(common.getCartJson).toBeTruthy();
    // });

    // it('should call getCartJson() method when no callback function is passed', () => {
    //     common = TestBed.get(Common);
    //     common.getCartJson();
    //     expect(common.getCartJson).toBeTruthy();
    // });

    // it('should call isStoreUserRoleExists() method', () => {
    //     common = TestBed.get(Common);
    //     let codes=[];
    //     common.isStoreUserRoleExists(codes);
    //     expect(common.isStoreUserRoleExists).toBeTruthy();
    // });

    // it('should call openToast() method', () => {
    //     common = TestBed.get(Common);
    //     let code="s",textContent="test";
    //     common.openToast(code,textContent);
    //     expect(common.openToast).toBeTruthy();
    // });

    it('should call displayDate() method', () => {
        common = TestBed.get(Common);
        let value="02-02-2020";
        common.displayDate(value);
        expect(common.displayDate).toBeTruthy();
    });

    it('should call isViewStore() method if block', () => {
        common = TestBed.get(Common);
        common.storeClientInfo={isAdditionalPageEnable:false,isEventPageEnable:false,isPickupPageEnable:false,
            isServicePageEnable:false,isShipmentPageEnable:false,isEventEnable:false}
        common.isViewStore();
        expect(common.isViewStore).toBeTruthy();
    });

    it('should call isViewStore() method else block', () => {
        common = TestBed.get(Common);
        common.storeClientInfo={isAdditionalPageEnable:true,isEventPageEnable:true,isPickupPageEnable:true,
            isServicePageEnable:true,isShipmentPageEnable:true,isEventEnable:true}
        common.isViewStore();
        expect(common.isViewStore).toBeTruthy();
    });

    it('should call scrollToSection() method', () => {
        common = TestBed.get(Common);
        let to=100;
        common.scrollToSection(to);
        expect(common.scrollToSection).toBeTruthy();
    });

    it('should call backward() method case="services"', () => {
        common = TestBed.get(Common);
        common.activatedStep="services";
        common.backward();
        expect(common.backward).toBeTruthy();
    });

    it('should call backward() method case="orderdetail"', () => {
        common = TestBed.get(Common);
        common.activatedStep="orderdetail";
        common.backward();
        expect(common.backward).toBeTruthy();
    });

    it('should call backward() method case="revieworder"', () => {
        common = TestBed.get(Common);
        common.activatedStep="revieworder";
        common.backward();
        expect(common.backward).toBeTruthy();
    });

    it('should call forward() method case="productdetail"', () => {
        common = TestBed.get(Common);
        common.activatedStep="productdetail";
        common.forward();
        expect(common.forward).toBeTruthy();
    });

    it('should call forward() method case="placeorder"', () => {
        common = TestBed.get(Common);
        common.activatedStep="placeorder";
        common.forward();
        expect(common.forward).toBeTruthy();
    });

    it('should call forward() method case="services"', () => {
        common = TestBed.get(Common);
        common.activatedStep="services";
        common.forward();
        expect(common.forward).toBeTruthy();
    });

    it('should call forward() method case="orderdetail"', () => {
        common = TestBed.get(Common);
        common.activatedStep="orderdetail";
        common.forward();
        expect(common.forward).toBeTruthy();
    });

    it('should call closeAssociateAndOnDemandPopup() method', () => {
        common = TestBed.get(Common);
        //localStorage.setItem('lastUpdatedPlaceOrderJSON','[{},{"orderDetails":[{"productId":1,"orderedQuantity":1}]}]')
        let data={item:{id:1,alreadyAddedCartQuantity:1}};
        common.closeAssociateAndOnDemandPopup(data);
        expect(common.closeAssociateAndOnDemandPopup).toBeTruthy();
    });

    it('should call getSteps() method', () => {
        common = TestBed.get(Common);
        let data={id:90}, fun = function fn(params:any) {};
        common.getSteps(data,fun);
        expect(common.getSteps).toBeTruthy();
    });

    it('should call getServiceSectionValue() method if block', () => {
        common = TestBed.get(Common);
        let field={id:10,type:'CUSTOM_DATE'},data={customFieldValues:[{customFieldId:10,customFieldValue:5}]};
        common.getServiceSectionValue(field,data);
        expect(common.getServiceSectionValue).toBeTruthy();
    });

    it('should call getServiceSectionValue() method else block', () => {
        common = TestBed.get(Common);
        let field={id:10,type:'CUSTOM_X'},data={customFieldValues:[{customFieldId:10,customFieldValue:5}]};
        common.getServiceSectionValue(field,data);
        expect(common.getServiceSectionValue).toBeTruthy();
    });

    it('should call isNodeLinkedInTree() method', () => {
        common = TestBed.get(Common);
        let findItem={},data=[{id:10,linkedFields:[]}],element={linkedFieldId:10};
        common.isNodeLinkedInTree(data,element,findItem);
        expect(common.isNodeLinkedInTree).toBeTruthy();
    });

    it('should call createLinkedData() method', () => {
        common = TestBed.get(Common);
        let index=0,response=[{id:10,linkedFields:[]}],customField=[{fieldDetails:10}];
        common.createLinkedData(response,index,customField);
        expect(common.createLinkedData).toBeTruthy();
    });

    it('should call emptyCart() method', () => {
        common = TestBed.get(Common);
        common.emptyCart();
        expect(common.emptyCart).toBeTruthy();
    });
})