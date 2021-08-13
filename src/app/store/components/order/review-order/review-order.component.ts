import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AppMessage } from '../../../../shared/config/app-message.enum';
import { AppUrl } from '../../../../shared/config/app-url.enum';
import { HttpClientService } from '../../../../shared/services/http-client.service';
import { SharedService } from '../../../../shared/services/shared.service';
import { Util } from '../../../../shared/services/util';
import { StoreService } from '../../../service/store.service';
import { Common } from '../../../utility/common';
import { Enum } from '../../../../shared/config/enum.enum';
import { DemandGraphicsComponent } from '../demand-graphics/demand-graphics.component';
import { MatDialog } from '@angular/material';
import { AppConstant } from './../../../../shared/config/app-constant';
import { EncryptionService } from '../../../../shared/services/encryption.service';


@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.scss']
})
export class ReviewOrderComponent implements OnInit {
  @ViewChild('order') order: ElementRef;
  @ViewChild('event') event: ElementRef;
  @ViewChild('shipment') shipment: ElementRef;
  @ViewChild('pickup') pickup: ElementRef;
  @ViewChild('additional') additional: ElementRef;
  @ViewChild('creditCardView') creditCardView: ElementRef;
  defaultImageSrc: string = "./assets/images/frame-landscape-placeholder.svg";
  serviceCustomFields: any = [];
  eventDetailsField: any = [];
  additionalInfoDetailFields: any = [];
  shipmentDetailFields: any = [];
  pickupDetailsFields: any = [];
  isSubmitted: boolean = false;
  data: any = {};
  customFieldsData: any = {};
  requiredField: string = '';  //contains the field which are required but no value is entered
  invalidEmailField: string = '';  //contains the text for invalid email custom fields
  isPriceRange: number = 0;
  reviewOrderUploadImageSpace: any;
  reviewOrderLoaderCheck: any = [];           //Loader flag for the media files.
  //loaderCheck: boolean = false;
  rangeTotal: any = { min: 0, max: 0 };
  creditCardObject: any = {
    isCard: false,
    detail: {}
  };

  userInfo: any = {}

  constructor(public cdr:ChangeDetectorRef,public common: Common, private storeService: StoreService, private router: Router, private util: Util, private encryptionService: EncryptionService,
    private http: HttpClientService, public sharedService: SharedService, public _domSanitizationService: DomSanitizer, public dialog: MatDialog) {
    this.sharedService.getMessage().subscribe((resp) => {
      if (resp && resp.action === 'cardAdded') {
        this.creditCardObject.isCard = true;
        this.creditCardObject.detail = resp.data;
      }
    });
  }

  ngOnInit() {
    this.getData();
    this.common.storeUserInfo.subscribe(response => {
      if (response.id) {
        this.userInfo = response;
      }
    });
  }

   //Implemented ChangeDetectionRef because of expression change error that occured during unit testing
  ngAfterViewInit(){
    //this.creditCardObject.isCard = true;
    this.cdr.detectChanges();
  }

  getData() {
    // Load data from cart JSON 
    this.common.getCartJson(() => {
      this.data = this.common.placeOrderObj;
      /**Calculate the count of total products added in cart */
      this.common.addedCartCount = this.data.orderDetails.length;
      this.getCartTotal();
      this.common.loadModulesStandardField(() => {
        this.common.loadModulesCustomFields(() => {
          this.setData();
        });
      });
      this.getProductImages();

      // check if credit card details are added with order
      this.creditCardObject.isCard = this.common.placeOrderObj.cardId ? true : false;
      if (this.creditCardObject.isCard) {
        // get card details
        this.creditCardObject.detail['cardId'] = this.common.placeOrderObj.cardId;
        this.getCardInfo(this.common.placeOrderObj.cardId);
      }
      
    });
  }

  getCartTotal() {
    let min = 0;
    let max = 0;
    let isPriceRange = 0;
    let orderDetails = this.data.orderDetails.filter(i => i.showPrice);
    orderDetails.forEach(i => {
      isPriceRange += ~~i.isPriceRange; // ~~ changes value into integer
      min += i.orderedQuantity * i.productPrice;
      max += i.orderedQuantity * (i.isPriceRange ? i.productMaxPrice : i.productPrice);
    });
    this.rangeTotal['min'] = min;
    this.rangeTotal['max'] = max;
    this.isPriceRange = isPriceRange;
  }

  setData() {
    this.customFieldsData = this.common.modulesCustomFields;
    this.serviceCustomFields = this.customFieldsData.serviceDetails.serviceTitle;
    let standardField = this.common.moduleStandardFields;
    this.eventDetailsField = standardField[0].fieldDetails.concat(this.customFieldsData.eventDetails.fieldDetails);
    this.additionalInfoDetailFields = this.customFieldsData.additionalInfoDetails.fieldDetails;
    this.shipmentDetailFields = standardField[1].fieldDetails.concat(this.customFieldsData.shipmentDetails.fieldDetails);
    this.pickupDetailsFields = standardField[2].fieldDetails.concat(this.customFieldsData.pickupDetails.fieldDetails);
    this.putData();
  }

  putData() {
    this.serviceCustomFields.forEach(sTitle => {
      this.putDataIntoSection(sTitle.fieldDetails, 'serviceDetails');
    });
    this.putDataIntoSection(this.eventDetailsField, 'eventDetails');
    this.putDataIntoSection(this.shipmentDetailFields, 'shipmentDetails');
    this.putDataIntoSection(this.pickupDetailsFields, 'pickupDetails');
    this.putDataIntoSection(this.additionalInfoDetailFields, 'additionalInfoDetails');
  }

  putDataIntoSection(field, type) {
    let data = this.data[type];
    field.forEach(element => {
      if (element.id > 0) {
        data.customFieldValues.some((item) => {
          if (item.customFieldId == element.id) {
            element.isDisplayed = item.isDisplayed;
          }
          return;
        })
      }
    });
  }
  /**
   * Used this methid direct into html
   * @param obj - object name from which we have to get data
   * @param field -  field object
   */
  getValue(obj, field) {
    let value = "- -";
    let data = this.data[obj];
    if (data) {
      if (field.id < 0) { // for standard values, If remote dropdown then we have to pick its value instead of id
        if (data[field.dbPropertyName]) {
          if (field.type == "REMOTE_DROP_DOWN") {
            //value = data[field.dbPropertyName + 'Value']; 
            if (field.dbPropertyName == "stateId") {
              value = data.stateName;
            }
            else if (field.dbPropertyName == "countryId") {
              value = data.countryName ? data.countryName : field.countryName;
            }
          } else {
            value = data[field.dbPropertyName];
          }
        }
      } else { // for custom values
        if (data.customFieldValues.length > 0) {
          data.customFieldValues.find((item) => {
            if (item.customFieldId == field.id) {
              value = item.customFieldValue;
              return;
            }
          });
        }
        if (field.type == "READ_ONLY") {  //display the value of readonly fields in review order page
          value = field.lookupValue ? field.lookupValue : '- -';
        }
        if (field.type == "UPLOAD" && obj != 'serviceDetails') {  //display name of uploaded image resource in the custom input feild
        
          field.file={fileName:value.split('^^^')[0],filePath:value.split('^^^')[1]}
          value = value.split('^^^')[0];
        }
      }
    }

    return value;
  }

  getProductImages() {

    this.util.hideLoader = true; // we dont need loader to load images
    //this.loaderCheck = true;
    this.data.orderDetails.forEach((element,index) => {
      element.previousQuantity = element.orderedQuantity;
      if (element.resourceId) {
        this.reviewOrderLoaderCheck[index] = true;     //showing loader at the image card section
        let req;
        if (element.isKit) {
          req = this.http.getFiles(AppUrl.downloadKitResource, { pathVariable: element.resourceId, kitId: element.id, type: Enum.Kit_ProductImages });
        } else {
          req = this.http.getFiles(AppUrl.getThumbnailImage, { pathVariable: element.resourceId });
        }
        req.subscribe(response => {
          if (response.body.type != 'application/json') { // application/json means there is no any image and we get error product image not found for this case
            const data = window.URL.createObjectURL(response.body);
            element.url = data; // update URL 
          } else {
            console.log('someting went wrong to fetch Images from server...');
          }
          //this.loaderCheck = false;
          this.reviewOrderLoaderCheck[index] = false;      //closing the loader at the image card section when the image is finished loading
        });
      }
      else {
        element.url = this.defaultImageSrc;
      }
    });

  }

  onChangeQuantity(item) {
    this.common.addToCart(item, true, true);
    this.getCartTotal();
  }

  //verify whether any ordered product quantity is 0 or less then return valid false else true
  orderedQuantityValidation(): boolean {
    let valid = true;
    this.common.placeOrderObj.orderDetails.some(product => {
      if (product.orderedQuantity <= 0) {
        valid = false;
      }
    });
    return valid;
  }

  /**
   * If pickup details or shipmentdetails : we did not pass any data then mark that values as null
   */
  onPlaceOrder() {
    if (!this.isSubmitted) {

      let params = this.common.placeOrderObj;
      params.isKit = false;  //by default set the value of isKit to false

      // check if payment option is diabled for user from user-settings 
      // then user can proceed without credit card information
      // this check will be for store-user only can proceed without adding credit card
      let isStoreUser = this.common.isStoreUserRoleExists([Enum.Store_Admin, Enum.Store_Regional_Manager, Enum.Store_User]);
      if (this.common.storeClientInfo.creditCardPayment && isStoreUser && (!this.userInfo.isPaymentDisable && !params.cardId)) {
        this.sharedService.openDialog('e', AppMessage.U0176);
        return;
      }

      if (params.orderDetails.length == 0) {
        this.sharedService.openToast('e', AppMessage.U0101);
        return;
      } else {
        if (!this.orderedQuantityValidation()) {
          this.sharedService.openToast('e', AppMessage.U0149);
          return;
        }
      }
      if (!this.requiredFieldCheck()) {
        this.requiredField = this.requiredField.substring(0, this.requiredField.length - 2);
        this.invalidEmailField = this.invalidEmailField.substring(0, this.invalidEmailField.length - 2);
        if (this.invalidEmailField && this.requiredField) {
          this.sharedService.openDialog('e', AppMessage.U0122 + this.requiredField + '.\n\n' + AppMessage.U0168 + this.invalidEmailField);
        } else if (this.invalidEmailField) {
          this.sharedService.openDialog('e', AppMessage.U0168 + this.invalidEmailField);
        } else {
          this.sharedService.openDialog('e', AppMessage.U0122 + this.requiredField);
        }
        return;
      }
      let tempOrderDetails = JSON.stringify(params.orderDetails); //save a temporary json in case order is not successfully placed
      this.processProductDetails(params.orderDetails, (value, isKit) => {
        if (value) {
          params.orderDetails = value;  //assign the processed products detail into param
          params.isKit = isKit; //isKit value is true only when order contains a kit such that max order quantity check will not be handled at the API level
          let storeInfo = this.common.storeClientInfo;
          if ((!storeInfo.isEventPageEnable && !storeInfo.isEventEnable) || (params.eventDetails && !params.eventDetails.title)) {
            params.eventDetails = null;
          }
          if (!storeInfo.isPickupPageEnable || (params.pickupDetails && Object.keys(params.pickupDetails).length < 2)) { // checking length < 2 because we have one value already defined in json 
            params.pickupDetails = null;
          }
          if (!storeInfo.isShipmentPageEnable || (params.shipmentDetails && Object.keys(params.shipmentDetails).length < 2)) {
            params.shipmentDetails = null;
          }
          // if (params.additionalInfoDetails.customFieldValues.length == 0) {    //this code is not needed in API for now
          //   params.additionalInfoDetails = null;
          // }

          this.isSubmitted = true;
          this.storeService.placeOrder(params).subscribe(response => {
            this.sharedService.onSuccess(response, AppMessage.U0089, value => {
              if (value) {
                this.onSuccess();
              } else {
                this.isSubmitted = false;
                params.orderDetails = JSON.parse(tempOrderDetails); //revert back the order Details value to the previously saved order details json
              }
            })
          });
        }
      });
    }
  }

  /**
   * Form the product data to order- If product is of type kit then extract the product details and set it in form of individual products
   * Scenarios - 
   * 1-Multiply the kit ordered quantity with its associated prodcuts available quantity and then validate it
   * 2-Check whether a product is not added 2 different times in the place order json
   */
  processProductDetails(orders, fn) {
    let products = [];
    let kits = [];
    let orderedKitQuantity: number = 0;
    orders.forEach(item => {
      if (item.isKit) { //segregate the kits from products
        orderedKitQuantity = item.orderedQuantity;
        if (item.associatedProducts.length > 0) {
          item.associatedProducts.forEach(prod => {
            prod.orderedQuantity = orderedKitQuantity * prod.availableQuantity;
            kits.push(prod);
          });
        }
      } else {
        products.push(item);
      }
    });
    if (kits.length > 0 && products.length == 0) {
      products = kits;   //if no product exist the all the associated products of kit will be treated as individual products
      products = this.checkMultipleProducts(products);
      return fn(products, true);
    }
    else if (kits.length > 0) {
      kits.forEach(x => {
        if (products.length > 0) {
          //insert all other kit elements in products array which are not already included
          let arr2 = products.map(function (item1) { return item1.productId });
          let isExist = arr2.includes(x.productId);
          if (isExist) {
            products.forEach(y => {
              if (x.productId == y.productId) {
                y.orderedQuantity += x.orderedQuantity;
              }
            });
          } else {
            products.push(x);
          }

        } else {
          products = kits;   //if no product exist the all the associated products of kit will be treated as individual products
        }
      });
      //here we have to check whether there are multiple products of same product id in the products list
      products = this.checkMultipleProducts(products);
      return fn(products, true);
    }
    else {
      return fn(orders, false);  //return the original list of orders which are passed as no need to change anything beacuse only products are there
    }
  }

  //here we check that if in the final product list there is any products which are multiple - if yes then merge both the product quantities
  checkMultipleProducts(products) {
    let obj: Map<any, any> = new Map<'', ''>();
    products.forEach(item => {
      if (!obj.get(item.productId)) {
        obj.set(item.productId, item);
      } else {
        item.orderedQuantity = item.orderedQuantity + obj.get(item.productId).orderedQuantity;
        obj.set(item.productId, item);
      }
    })
    let keys = Array.from(obj.values());
    return keys;
  }

  // If Order placed successfully or discard --> remove event details from localstorage & redirect o dashboard
  onSuccess() {
    this.common.emptyCart();
    this.router.navigate(['/store-dashboard']);
  }

  onRemoveProduct(productId) {
    this.sharedService.confirmBox(AppMessage.U0094, (value) => {
      if (value) {
        let findIndex = this.data.orderDetails.findIndex(function (item1) { if (item1.productId == productId) { return item1 } });
        if (findIndex > -1) {
          this.data.orderDetails.splice(findIndex, 1);
          this.common.addedCartCount--;  //decrease the count of added cart count
        }
        this.common.saveCartJson();
        this.getCartTotal();
      }
    });
  }

  cancelOrder() {
    this.sharedService.confirmBox(AppMessage.U0095, (value) => {
      if (value) {
        this.onSuccess();
      }
    })

  }

  /**Check whether if any required field is missing'
   * If yes - return valid= false and show error msg with required fields name on it
   * If No - return valid=true and place order
   */
  requiredFieldCheck(): boolean {
    let info = this.common.storeClientInfo;
    if (info) {
      this.requiredField = "";
      this.invalidEmailField = "";
      if (info.isServicePageEnable) {
        this.serviceCustomFields.forEach(field => {
          this.checkForEachRequiredField(field.fieldDetails, "serviceDetails");
        });
      }
      if (info.isEventPageEnable && info.isEventEnable) {
        this.checkForEachRequiredField(this.eventDetailsField, "eventDetails");
      }
      if (info.isShipmentPageEnable) {
        this.checkForEachRequiredField(this.shipmentDetailFields, "shipmentDetails");
      }
      if (info.isPickupPageEnable) {
        this.checkForEachRequiredField(this.pickupDetailsFields, "pickupDetails");
      }
      if (info.isAdditionalPageEnable) {
        this.checkForEachRequiredField(this.additionalInfoDetailFields, "additionalInfoDetails");
      }
      //return this.requiredField ? false : true;
      return this.requiredField || this.invalidEmailField ? false : true;
    }
  }

  checkForEachRequiredField(field: any, obj) {
    let data = this.data[obj];
    if (data) {
      field.forEach(element => {
        if ((element.isRequired && element.type != 'READ_ONLY') || element.type == 'EMAIL') {
          //if(element.isRequired && element.type != 'READ_ONLY'){
          if (element.id < 0) {
            if (element.isRequired && !data[element.dbPropertyName]) {
              this.requiredField += element.description + ", ";
            }
          } else {
            if ((obj == "serviceDetails" && element.isRequired) || element.type == 'EMAIL' || element.type == "CUSTOM_DATE") {
              //if (obj == "serviceDetails" && element.isRequired) {
              let arr = data.customFieldValues.find(x => x.customFieldId == element.id);
              if (arr) {
                if (!arr.customFieldValue) {
                  if ((obj == "serviceDetails" || element.type == "CUSTOM_DATE") && element.isRequired) {
                    this.requiredField += element.description + ", ";
                  }else if(element.isRequired){
                    this.requiredField += element.description + ", ";
                  }
                } else if (element.type == 'EMAIL') {
                  this.validateEmailAddress(arr, element);
                }
              } else {
                if (element.isDisplayed && element.linkedFieldId && element.isRequired) {
                  this.requiredField += element.description + ", ";
                } else if (!element.linkedFieldId && element.isRequired) {
                  this.requiredField += element.description + ", ";
                }
              }
            } else {
              if (data.customFieldValues.length > 0) {
                data.customFieldValues.some((item) => {
                  if (item.customFieldId == element.id) {
                    if (element.isRequired && !item.customFieldValue) {
                      this.requiredField += element.description + ", ";
                    }
                    else if (element.type == 'EMAIL') {
                      this.validateEmailAddress(item, element);
                    }
                  }else{
                    let arr1 = data.customFieldValues.find(x => x.customFieldId == element.id);
                    if(!arr1 && element.isRequired){
                      this.requiredField += element.description + ", ";
                    }
                  }
                });
              }
              else {
                this.requiredField += element.description + ", ";
              }
            }
          }
        }
      });
    }
  }

  /**
   * open the onDemand graphics popup to edit the text or change the upload file
   */
  editOnDemandGraphics(data) {
    this.dialog.open(DemandGraphicsComponent, {
      data: {
        item: data,
        isEdit: true    //While editing on review order,no need to remove product from cart when cross btn is clicked
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        let obj = this.common.placeOrderObj.orderDetails;
        let index = obj.findIndex(x => x.id == data.id);
        if (index > -1) {
          if (result.isType == "text") {
            obj[index].onDemandTextGraphic = result.description;
          } else {
            obj[index].fileName = result.fileName;
            obj[index].filePath = result.filePath;
          }
          this.common.saveCartJson();
        }
      }
    });
  }

  //This method is done for the smooth scrolling of the page to the particular section when click on left panel menu
  scroll(num: number) {
    switch (num) {
      case 1: this.order.nativeElement.scrollIntoView({ block: 'start', behavior: "smooth" });
        break;
      case 2: this.event.nativeElement.scrollIntoView({ block: 'start', behavior: "smooth" });
        break;
      case 3: this.shipment.nativeElement.scrollIntoView({ block: 'start', behavior: "smooth" });
        break;
      case 4: this.pickup.nativeElement.scrollIntoView({ block: 'start', behavior: "smooth" });
        break;
      case 5: this.additional.nativeElement.scrollIntoView({ block: 'start', behavior: "smooth" });
        break;
      case 6: this.creditCardView.nativeElement.scrollIntoView({ block: 'start', behavior: "smooth" });
        break;
      default: window.scrollTo(0, 0);
        break;
    }
  }

  //redirect to product details to view the details of kit and its associated products
  openKitDetails(item) {
    this.router.navigate(['/order/product/' + item.id], { queryParams: { kit: true, fromReview: true } });
  }

  //Validate whether the entered email address passes the regex of email, if not, store its value to display in error popup
  validateEmailAddress(field, element) {
    let emailReg = new RegExp(AppConstant.emailRegex);
    if (!emailReg.test(field.customFieldValue)) {
      this.invalidEmailField += element.description + ", ";
    }
  }
  /**
   * return details of credit card whatever encrypted and saved on server
   * @param cardId : credit card primary key id
   */
  getCardInfo(cardId) {
    let param = {
      id: cardId
    }
    this.storeService.getCreditCardInfo(param).subscribe((response) => {
      this.sharedService.onSuccess(response, null, value => {
        if (value) {
          let key = this.userInfo.id.toString();
          let cardObj = this.encryptionService.decryptData(response.response.result.securityOne, key);
          this.creditCardObject.detail['cardNo'] = cardObj.number;
        }
      });
    });
  }

}
