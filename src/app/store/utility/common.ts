import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

import { AppUrl } from '../../shared/config/app-url.enum';
import { HttpClientService } from '../../shared/services/http-client.service';
import { Util } from '../../shared/services/util';
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';
import { AppMessage } from '../../shared/config/app-message.enum';

@Injectable()
export class Common {
  isValidatedStoreUser: boolean = false;
  storeLogo: string = "";
  storeUserInfo: any = new BehaviorSubject<any>({});
  importedStoreUserInfo: any = new BehaviorSubject<any>({});
  storeClientInfo: any = {};  //contains the info of client for store login and signup
  selectedCategory: any;
  isStoreloggedIn = new BehaviorSubject<boolean>(false);
  moduleStandardFields: any = [];
  modulesCustomFields: any = [];
  countryList: any = [];
  headerText: string = "";
  footerText: string = "";
  userEventEnabled = new BehaviorSubject<boolean>(false);
  // This is object where will place all fields of place order process
  placeOrderObj: any = {};
  isGoToStore: boolean = false;
  selectedCategoryName: string = "";
  isSelectedCategoryChanged: boolean = false;
  addedCartCount: number = 0;
  activatedStep: string = "";
  calenderEventObject: any = {};
  isAddedSuccessFully: boolean = false;
  manageOrderObject: any = {};
  displayWelcomeMessage: boolean = true;  //to display the welcome message to store user on login

  isStoreProductSearched:boolean = false;   //to disable the categories when any search text is entered and searched
  storeProductSearchText:string = "";       //contains the search text on browse product screen

  constructor(private util: Util, private router: Router,
    private httpService: HttpClientService, private cookieService: CookieService, private http: HttpClient,
    public snackBar: MatSnackBar) {
    this.setPlaceOrderBaseObject();
  }

  createDynamicClassForStoreColor(response) {
    let style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `.dy-action-btn-color { background-color: ${response.actionColor} !important; }
                            .dy-body-txt-color { color:${response.bodyColor} !important; }
                            .dy-header-color { background-color: ${response.headerColor} !important; }
                            .dy-btn-color { color: ${response.actionColor} !important;}
        `;
    document.body.appendChild(style);
  }

  setPlaceOrderBaseObject() {
    this.placeOrderObj = {
      eventDetails: {
        clientId: 0, // will add dynamially
        customFieldValues: []
      },
      additionalInfoDetails: {
        customFieldValues: []
      },
      orderDetails: [],
      pickupDetails: {
        customFieldValues: []
      },
      serviceDetails: {
        customFieldValues: []
      },
      shipmentDetails: {
        customFieldValues: []
      }
    }

    this.manageOrderObject = {
      eventDetails: {
        clientId: 0, // will add dynamially
        customFieldValues: []
      },
      additionalInfoDetails: {
        customFieldValues: []
      },
      orderDetails: [],
      serviceDetails: {
        customFieldValues: []
      },
      pickupDetails: {
        customFieldValues: []
      },
      shipmentDetails: {
        customFieldValues: []
      }
    }
  }

  getLogo(id: number) {
    let param = {
      pathVariable: id
    }
    this.httpService.getFiles(AppUrl.logoDownload, param).subscribe(response => {
      if (response.body.type != 'application/json') { // application/json means there is no any image and we get error product image not found for this case
        this.storeLogo = window.URL.createObjectURL((response.body));
      } else {
        this.storeLogo = "null";
        console.log('something went wrong to fetch store logo from server...');
      }
    });

  }

  loadClientInfo(response) {
    this.util.isStore = true;
    this.isValidatedStoreUser = true;
    this.storeClientInfo = response;
    this.userEventEnabled.next(response.isEventEnable);
    this.util.hideLoader = true; //hide the loader when client's logo is being downloaded
    this.getLogo(response.id);
    this.createDynamicClassForStoreColor(response);
  }


  checkDomain() {
    let url = location.host;
    let arr = url.split('.');
    let param = {
        domain: arr[0] // This is client sub domain
    //  domain: "amazonuat" // This is client sub domain for local development
    }
    this.httpService.get(AppUrl.validateStore, param).subscribe(response => {
      if (response.responseCode == "S0001") {
        this.cookieService.delete('storeClientInfo');
        this.cookieService.delete('storeClientId');
        this.util.isStore = true;
        this.cookieService.set('storeClientInfo', JSON.stringify(response.response));
        this.cookieService.set('storeClientId', response.response.id);

        this.loadClientInfo(response.response);

      } else {
        this.isStoreloggedIn.next(false);
        this.util.isStore = false;
        this.router.navigate(['/storenotfound']); //, {data : true}
      }
    });
  }

  // If already loggedIn then move to same route which you want to navigate
  // If already logged In and you want to access again store-login page then redirect to dashboard page
  alreadyLoggedIn() {
    if (this.cookieService.get('storeAccessToken')) {
      let routes = ['/store-login', '/store-signup', '/forgotpassword', '/resetpassword'];
      if (routes.includes(location.pathname) || location.pathname == '/') {
        this.router.navigate(['/store-dashboard']);
      }
    }
    else {
      if (!(location.href.includes('resetpassword') || location.href.includes('authstore') || location.href.includes('verification'))) {
        this.router.navigate(['/store-login']);
      }

    }

    this.checkDomain();

  }

  // Load standard field static Data (saved Locally at UI level)
  loadModulesStandardField(fn) {
    // if (this.moduleStandardFields.length == 0) {
    this.http.get('./assets/module-standard-fields.json').subscribe((response: any) => {
      this.moduleStandardFields = response.modulesData;
      return fn();
    });

    this.getCountries(); // Load countries
    // }
    // else {
    //   return fn();
    // }
  }

  loadModulesCustomFields(fn) {
    // if (this.moduleStandardFields.length == 0) {
    let param = {
      pathVariable: this.storeClientInfo.id
    }
    this.httpService.get(AppUrl.activeOrderingDetails, param).subscribe(response => {
      if (response.responseCode == "S0001") {
        this.modulesCustomFields = response.response.modulesData;
        return fn();
      }
    });
    // } else {
    //   return fn();
    // }
  }

  /**
   * Save Data into Cart JSON, If item already added into cart then increase its quantity ELSE add into cart json
   * @param item - item details
   * @param isChangeQuantity - comes from review order page
   */
  addToCart(item, isAssociate, isChangeQuantity = false, fn?) {
    let user = this.storeUserInfo.getValue();
    // if ((item.steps && item.steps.length > 0 && !isAssociate && user.isAssociateOrdering) || (item.isTextGraphic || item.isUploadGraphic)) {
    if ((item.isSteps && !isAssociate && user.isAssociateOrdering) || (item.isTextGraphic || item.isUploadGraphic)) {
      let updatedJSON = JSON.parse(localStorage.getItem('lastUpdatedPlaceOrderJSON')) ? JSON.parse(localStorage.getItem('lastUpdatedPlaceOrderJSON')) : [];
      updatedJSON.push(JSON.stringify(this.placeOrderObj));
      localStorage.setItem('lastUpdatedPlaceOrderJSON', JSON.stringify(updatedJSON));
    }
    //let isAdded = false;
    this.isAddedSuccessFully = false;
    if (item.orderedQuantity) {
      let orders = this.placeOrderObj.orderDetails;
      this.addedCartCount = orders.length;
      let findIndex = orders.findIndex(function (item1) { if (item1.productId == item.id) { return item1 } });

      if (findIndex > -1) {
        if (isChangeQuantity) {
          if (this.quantityValidation(item)) {
            //isAdded = true;
            this.isAddedSuccessFully = true;
          }

        } else if (this.quantityValidation(item, orders[findIndex].orderedQuantity)) {
          orders[findIndex].orderedQuantity += item.orderedQuantity; // add quantity if item exists
          //isAdded = true;
          this.isAddedSuccessFully = true;
          item.alreadyAddedCartQuantity = orders[findIndex].orderedQuantity;
        }
      } else {
        let obj = {
          id: item.id,
          "orderedQuantity": item.orderedQuantity,
          "productId": item.id,
          "productName": item.productName,
          "productNumber": item.productNumber,
          "resourceId": item.resourceId,
          availableQuantity: item.availableQuantity,
          maxOrderQuantity: item.maxOrderQuantity,
          minOrderQuantity: item.minOrderQuantity,
          isKit: item.isKit,
          isPriceRange: item.isPriceRange,
          productPrice: item.productPrice,
          productMaxPrice: item.isPriceRange ? item.productMaxPrice : null,
          showPrice: item.showPrice,
          onDemandTextGraphic: '',
          fileName: '',
          filePath: ''
        }
        if (obj.isKit) {
          obj['associatedProducts'] = item.productInfo
        }
        if (this.quantityValidation(item)) {
          orders.push(obj);
          item.alreadyAddedCartQuantity = item.orderedQuantity;
          // isAdded = true;
          this.isAddedSuccessFully = true;
          this.addedCartCount++; //increase the count of items added in cart if added from browse or product detail screen
        }

      }
      // If any item has been added then only run below code of lines
      // if (isAdded) {
      if (this.isAddedSuccessFully) {
        this.saveCartJson();
        if (!isChangeQuantity) { // no need to update quantity as 0 when change quantity from review order screen
          item.orderedQuantity = 0;
          this.openToast('s', AppMessage.U0090);
        } else {
          this.openToast('s', AppMessage.U0098);
          item.previousQuantity = item.orderedQuantity;
        }
        //Open popup of ondemand graphics for user whose on demand flag is enabled and get the steps
        if (item.isTextGraphic || item.isUploadGraphic) {
          if (fn) {
            this.getSteps(item, (value) => {
              item.steps = value;
              return fn(item.steps, item);
            });
            //return fn(item.steps, item);
          }
        }
        //Open popup of associated products for user whose associate ordering flag is enabled 
        else if (item.isSteps && !isAssociate && user.isAssociateOrdering) {
          // else if (item.steps && item.steps.length > 0 && !isAssociate && user.isAssociateOrdering) {
          if (fn) {
            this.getSteps(item, (value) => {
              item.steps = value;
              return fn(item.steps, item);
            });
            //return fn(item.steps, item);
          }
          //this.storeService.openAssociateOrdering(item.steps);
        }
      }
    }
    else {
      this.openToast('e', AppMessage.U0136);
    }
  }

  /** validate the quantity entered that is should not be greater than available quantity 
   * then check whether ordered quantity is not greater than max order quantity 
   * Finally show the error message with minimum qty which can be availed in the error
  */
  quantityValidation(item, alreadyOrderedQuantity?) {
    let valid = true;
    if (!item.orderedQuantity) {

      valid = false;
      this.openToast('e', AppMessage.U0055);
    } else if (item.orderedQuantity < 0) {

      valid = false;
      this.openToast('e', AppMessage.U0054);
    }
    else {

      let maxQuantValue = item.maxOrderQuantity ? item.availableQuantity < item.maxOrderQuantity ? item.availableQuantity : item.maxOrderQuantity : item.availableQuantity;
      let value = alreadyOrderedQuantity ? (alreadyOrderedQuantity + item.orderedQuantity) : item.orderedQuantity;
      let quantityMessage = "";
      if (value > maxQuantValue) {
  
        valid = false;
        quantityMessage = `You can order maximum quantity ${maxQuantValue}`;
      }
      else if (item.minOrderQuantity && value < item.minOrderQuantity) {
        valid = false;
        quantityMessage = `You must order minimum quantity ${item.minOrderQuantity}`
      }
      if (!valid) {
  
        let message = "";
        if (alreadyOrderedQuantity) {
          message = `You have already ordered ${alreadyOrderedQuantity} quantity. You can order maximum quantity ${maxQuantValue}`;
        } else {
          message =  quantityMessage;
        }

        this.openToast('e', message);
      }
    }
    return valid;
    //  item.availableQuantity < item.maxOrderQuantity ? this.requiredQty = "available quantity : " +this.data.availableQuantity : this.requiredQty = "maximum order quantity : "+this.data.maxOrderQuantity == null ? 0 : this.data.maxOrderQuantity;

  }

  getCountries() {
    this.httpService.get(AppUrl.getCountries).subscribe(response => {
      if (response.responseCode == "S0001") {
        this.countryList = response.response;
      }
    })
  }

  /**
   * @param countryId - get state based on country Id
   */
  getStates(countryId: number, fn?) {
    this.util.hideLoader = true;
    let param = {
      countryId: countryId
    }
    this.httpService.get(AppUrl.getStates, param).subscribe(response => {
      if (response.responseCode == "S0001") {
        return fn(response.response);
      }
    });
  }

  deleteCartJson() {
    this.setPlaceOrderBaseObject();
    this.util.hideLoader = true;
    let param = {
      clientId: this.storeClientInfo.id
    }
    this.httpService.delete(AppUrl.cartDetailsJson, param).subscribe();
  }

  saveCartJson() {
    this.util.hideLoader = true;
    let param = {
      cart: encodeURIComponent(JSON.stringify(this.placeOrderObj)),  // encodeURIComponent and decodeURIComponent method are used to pass the special character into string UTF format
      pathVariable: this.storeClientInfo.id
    }
    this.httpService.put(AppUrl.cartDetailsJson, param).subscribe();
  }

  // encodeURIComponent and decodeURIComponent method are used to pass the special character into string UTF format
  getCartJson(fn?) {
    let param = {
      clientId: this.storeClientInfo.id
    }
    this.httpService.get(AppUrl.cartDetailsJson, param).subscribe(response => {
      if (response.responseCode == "S0001") {
        this.placeOrderObj = JSON.parse(decodeURIComponent(JSON.parse(response.response).cart));

        if (fn) {
          return fn();
        }
      } else {//this condition is because it send true in callback when no cart is found to store value in localstorage in store dashboard
        if (fn) {
          return fn(true);
        }
      }
    });
  }
  /**
   * Pass arrays of role Codes : If role exists it will return true
   */
  isStoreUserRoleExists(codes: any): boolean {
    let exists: boolean = false;
    let user: any = this.storeUserInfo.getValue();
    if (user && user.roles) {
      user.roles.some((element: any) => {
        if (codes.indexOf(element) > -1) { // check role exists
          return exists = true;
        }
      });
      return exists;
    }
  }

  // code s = for success, code e = for error 
  openToast(code: string, textContent: string, fn?) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        code: code,
        content: textContent
      }, duration: 3000
    })
      .afterDismissed().subscribe((result) => {
        if (fn) {
          return fn(result);
        }
      });
  }

  //this method is used because of the Firefox and chrome issue of date i.e. it doesnot parse the date of type '12-12-2018'
  displayDate(value) {
    if (value) {
      let dateVar = value.split("-");
      let dateVal = dateVar[0] + "/" + dateVar[1] + "/" + dateVar[2];
      return dateVal;
    }
  }

  /*
   * If all the ordering modules section are disabled then only the store will be a view Store 
   where user can view Browse product screen but add to cart button will not be enabled
   and all other service, order detail and review order section will not be visible
   */
  isViewStore(): boolean {
    let info = this.storeClientInfo;
    if (info && !info.isAdditionalPageEnable && !info.isEventPageEnable
      && !info.isPickupPageEnable && !info.isServicePageEnable && !info.isShipmentPageEnable
      && !info.isEventEnable) {
      return true;
    } else {
      return false;
    }
  }

  scrollToSection(to) {
    var smoothScrollFeature = 'scrollBehavior' in document.documentElement.style;
    var i = window.pageYOffset;
    i = parseInt(i.toString());
    if (i != to) {
      if (!smoothScrollFeature) {
        to = parseInt(to);
        if (i < to) {
          var int = setInterval(function () {
            if (i > (to - 20)) i += 2;
            else if (i > (to - 40)) i += 4;
            else if (i > (to - 80)) i += 9;
            else if (i > (to - 160)) i += 19;
            else if (i > (to - 200)) i += 25;
            else if (i > (to - 300)) i += 41;
            else i += 61;
            window.scroll(0, i);
            if (i >= to) clearInterval(int);
          }, 0);
        }
        else {
          var int = setInterval(function () {
            if (i < (to + 20)) i -= 3;
            else if (i < (to + 40)) i -= 5;
            else if (i < (to + 80)) i -= 10;
            else if (i < (to + 160)) i -= 20;
            else if (i < (to + 200)) i -= 26;
            else if (i < (to + 300)) i -= 42;
            else i -= 63;
            window.scroll(0, i);
            if (i <= to) clearInterval(int);
          }, 0);
        }
      }
      else {
        window.scroll({
          top: to,
          left: 0,
          behavior: 'smooth'
        });
      }
    }
  }

  backward() {
    if (this.activatedStep != 'placeorder' && this.activatedStep != 'productdetail') {
      switch (this.activatedStep) {
        case 'services': this.onLinkClick('placeorder');
          break;
        case 'orderdetail': if (this.storeClientInfo && this.storeClientInfo.isServicePageEnable) {
          this.onLinkClick('services');
        } else {
          this.onLinkClick('placeorder');
        }
          break;
        case 'revieworder': this.onLinkClick('orderdetail');
          break;
      }
    }
  }

  forward() {
    if (this.activatedStep != 'revieworder') {
      switch (this.activatedStep) {
        case 'productdetail':  //case productdetail is same as place order
        case 'placeorder': if (this.storeClientInfo && this.storeClientInfo.isServicePageEnable) {
          this.onLinkClick('services');
        } else {
          this.onLinkClick('orderdetail');
        }
          break;
        case 'services': this.onLinkClick('orderdetail');
          break;
        case 'orderdetail': this.onLinkClick('revieworder');
          break;
      }
    }
  }

  onLinkClick(routeData: string) {
    this.activatedStep = routeData;
    this.router.navigate(['order/' + routeData]);
  }


  /**
   * When user clicks on close then remove the product which was added in cart 
   * Also, revert there alreadyadded quantity of that product and update the cart count
   */
  closeAssociateAndOnDemandPopup(data) {
    if (localStorage.getItem('lastUpdatedPlaceOrderJSON')) {
      let orderJson = JSON.parse(localStorage.getItem('lastUpdatedPlaceOrderJSON'));
      this.placeOrderObj = JSON.parse(orderJson[orderJson.length - 1]);
      orderJson.splice(orderJson.length - 1, 1)  //remove the last updated Json
      localStorage.setItem('lastUpdatedPlaceOrderJSON', JSON.stringify(orderJson));  //update the localStorage
      // this.placeOrderObj = JSON.parse(localStorage.getItem('lastUpdatedPlaceOrderJSON'));
      this.saveCartJson();
      this.addedCartCount = this.placeOrderObj.orderDetails.length;  //reset the value of total cart count
      if (this.addedCartCount > 0) {
        this.placeOrderObj.orderDetails.forEach(orderedItem => {
          if (data.item.id == orderedItem.productId) {
            data.item.alreadyAddedCartQuantity = orderedItem.orderedQuantity;
          } else {
            data.item.alreadyAddedCartQuantity = 0;
          }
        });
      } else {
        data.item.alreadyAddedCartQuantity = 0;
      }
    }
  }

  //get the steps of a product if available
  getSteps(item, fn) {
    let param: any = {
      productId: item.id,
      fromDate: this.userEventEnabled.value ? localStorage.getItem('eventStartDate') : null,
      toDate: this.userEventEnabled.value ? localStorage.getItem('eventEndDate') : null
    }
    this.httpService.get(AppUrl.getSteps, param).subscribe(response => {
      if (response.responseCode == "S0001") {
        return fn(response.response);
      }
    });
  }

  /**
   * Used this method to display the entered values into form
   * @param field -  field object
   */
  getServiceSectionValue(field, data) {
    //let data = serviceData['serviceDetails'];
    if (data) {
      // if (field.id < 0) { // for standard values, If remote dropdown then we have to pick its value instead of id
      //   if (data[field.dbPropertyName]) {
      //     if (field.type == "REMOTE_DROP_DOWN") {
      //       //value = data[field.dbPropertyName + 'Value']; 
      //       if (field.dbPropertyName == "stateId") {
      //         field.value = data.stateName;
      //       }
      //       else if (field.dbPropertyName == "countryId") {
      //         field.value = data.countryName;
      //       }
      //     } else {
      //       field.value = data[field.dbPropertyName];
      //     }
      //   }
      // } else { // for custom values
      data.customFieldValues.find((item) => {
        if (item.customFieldId == field.id) {
          if (field.type == 'CUSTOM_DATE') {
            field.value = new Date(item.customFieldValue);
          } else {
            field.value = item.customFieldValue;
          }
          return;
        }
      })
      //}
    }
  }

  isNodeLinkedInTree(data, element, findItem) {
    data.forEach(item => {
      if (item) {
        if (element.linkedFieldId == item.id) {
          return findItem = item;
        } else {
          findItem = this.isNodeLinkedInTree(item.linkedFields, element, findItem);
        }
      }
    })
    return findItem;
  }

  createLinkedData(response, index, customField) {
    customField[index].fieldDetails = [];
    response.forEach(element => {
      let findItem;
      findItem = this.isNodeLinkedInTree(customField[index].fieldDetails, element, findItem);
      Object.assign(element, { linkedFields: [] });
      if (findItem) {
        findItem.linkedFields.push(element);
      } else {
        customField[index].fieldDetails.push(element);
      }
    });
  }

  //remove all the storage related to cart on cancel or place order 
  emptyCart() {
    localStorage.removeItem('eventStartDate');
    localStorage.removeItem('eventEndDate');
    localStorage.removeItem('eventName');
    localStorage.removeItem('eventId');
    localStorage.removeItem('lastUpdatedPlaceOrderJSON');
    this.deleteCartJson();
    this.modulesCustomFields = [];
    this.moduleStandardFields = [];
    this.util.isSameAsEventOnPickup = false;
    this.util.isSameAsEventOnShipment = false;
    this.addedCartCount = 0; //reset the value of cart count
  }

}

