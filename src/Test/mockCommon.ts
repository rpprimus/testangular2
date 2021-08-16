import { BehaviorSubject, of } from "rxjs";
import { mockUtil } from "./mockUtil";

export class mockCommon {
 // constructor(public util:mockUtil){}

  isStoreProductSearched:boolean = false; 
  storeProductSearchText:string = "test"; 
  manageOrderObject: any = {};
  storeClientInfo: any = {
    id: "5",
    isEventEnable: true,
    accountManagers: "",
    isServicePageEnable: true,
    isEventPageEnable: true,
    isShipmentPageEnable: true,
    isPickupPageEnable: true,
    isAdditionalPageEnable: true
    //creditCardPayment:true
  }
  
  isStoreloggedIn = new BehaviorSubject<boolean>(false);
  calenderEventObject: any = {};
  selectedCategory: any = {
    childrens: [],
    parents: [],
    isInfoAvailable: true,
    title: "",
    description: ""
  };
  selectedCategoryName: string = "";
  isSelectedCategoryChanged: boolean = false;
  placeOrderObj: any = {
    cardId: 100,
    additionalInfoDetails: { customFieldValues: [{ customFieldId: 346, customFieldValue: "a@y.com", isDisplayed: true }, { customFieldId: 349, customFieldValue: "11-29-2019", isDisplayed: true }] },
    clientId: 37,
    eventDetails: {
      addressOne: "logix cyber park",
      addressTwo: "Tower-B",
      city: "Noida",
      clientId: 37,
      countryId: 101,
      countryName: "India",
      customFieldValues: [{ customFieldId: 297, customFieldValue: "test2" }],
      end: "11-18-2019",
      eventZip: "201009",
      id: null,
      start: "11-14-2019",
      stateId: 10,
      stateName: "Delhi",
      title: "guru purnima",
      venue: "C-block"
    },
    eventId: 169,
    fromDate: "11-14-2019",
    orderDetails: [{
      availableQuantity: 88,
      fileName: "",
      filePath: "",
      id: 210,
      isKit: true,
      isPriceRange: false,
      maxOrderQuantity: null,
      onDemandTextGraphic: "",
      orderedQuantity: 2,
      productId: 210,
      productMaxPrice: null,
      productName: "AS TEST",
      productNumber: "AS9891",
      productPrice: 98.91,
      resourceId: 67,
      showPrice: true,
      associatedProducts: [{
        availableQuantity: 4,
        damageQuantity: null,
        fileName: "",
        filePath: "",
        id: null,
        isReturnable: null,
        isShipped: null,
        lostQuantity: null,
        maxOrderQuantity: null,
        onDemandTextGraphic: "",
        orderId: null,
        orderedQuantity: 4,
        productId: 66,
        productName: "Apple iPhone XR (Black, 64 GB)",
        productNumber: "XR_Iphone",
        quantityError: true,
        reasonId: null,
        receiveQuantity: null,
      },
      {
        availableQuantity: 2,
        categories: null,
        damageQuantity: null,
        fileName: "",
        filePath: "",
        id: null,
        isReturnable: null,
        isShipped: null,
        lostQuantity: null,
        maxOrderQuantity: null,
        onDemandTextGraphic: "",
        orderId: null,
        orderedQuantity: 2,
        productId: 74,
        productName: "Iphone",
        productNumber: "XR_Iphone112",
        quantityError: true,
        reasonId: null,
        receiveQuantity: null
      }]
    },
    {
      availableQuantity: 100,
      fileName: "",
      filePath: "",
      id: 212,
      isKit: false,
      isPriceRange: false,
      maxOrderQuantity: 5,
      onDemandTextGraphic: "",
      orderedQuantity: 2,
      productId: 66,
      productMaxPrice: 1000,
      productName: "AS TEST 1",
      productNumber: "AS9892",
      productPrice: 99.91,
      resourceId: null,
      showPrice: false
    }, {
      availableQuantity: 101,
      fileName: "",
      filePath: "",
      id: 213,
      isKit: false,
      isPriceRange: false,
      maxOrderQuantity: null,
      onDemandTextGraphic: "",
      orderedQuantity: 1,
      productId: 213,
      productMaxPrice: null,
      productName: "AS TEST 2",
      productNumber: "AS9893",
      productPrice: 98.91,
      resourceId: 10,
      showPrice: true
    }],
    pickupDetails: {
      addressOne: "logix cyber park",
      addressTwo: "Tower-B",
      city: "Noida",
      name: "test",
      zip: "test",
      pickupDate: "09-09-11",
      clientId: 37,
      countryId: 231,
      countryName: "India",
      customFieldValues: [{ customFieldId: 267, customFieldValue: "test" }],
      end: "11-18-2019",
      eventZip: "201009",
      id: null,
      start: "11-14-2019",
      stateId: 10,
      stateName: "Delhi",
      title: "guru purnima",
      venue: "C-block"
    },
    requestorId: 384,
    requestorName: "Demo User",
    serviceDetails: {
      customFieldValues: [{ customFieldId: 315, customFieldValue: "test", isDisplayed: true },
      { customFieldId: 344, customFieldValue: "12-08-2019", isDisplayed: false }, { customFieldId: 296, customFieldValue: "12m length", isDisplayed: true }]
    },
    shipmentDetails: {
      addressOne: "logix cyber park",
      addressTwo: "Tower-B",
      name: "test",
      zip: "test",
      arrivalDate: "09-09-09",
      city: "Noida",
      clientId: 37,
      countryId: 231,
      countryName: "India",
      customFieldValues: [{ customFieldId: 297, customFieldValue: "test2" }],
      end: "11-18-2019",
      eventZip: "201009",
      id: null,
      start: "11-14-2019",
      stateId: 10,
      stateName: "Delhi",
      title: "guru purnima",
      venue: "C-block"
    },
    toDate: "11-18-2019"
  }
  storeUserInfo = new BehaviorSubject<any>({ id: 1, roles: true, isPaymentDisable: false });
  userEventEnabled = new BehaviorSubject<boolean>(false).asObservable();
  modulesCustomFields: any =
    {
      additionalInfoDetails: {
        isChecked: true, fieldDetails: [{
          description: "My Test",
          fieldLength: 0,
          fieldSequence: 1,
          id: 233,
          isActive: true,
          isDisplayed: false,
          isRequired: true,
          linkedFieldId: 233,
          linkedFieldValue: "Test",
          lookupValue: "ABC",
          type: "TEXT_BOX",
          value: "test"
        }], orderingType: 4
      },
      eventDetails: {
        isChecked: true, fieldDetails: [{
          description: "Test event field",
          fieldLength: 0,
          fieldSequence: 1,
          id: 266,
          isActive: true,
          isDisplayed: false,
          isRequired: false,
          linkedFieldId: null,
          linkedFieldValue: null,
          lookupValue: "Blue↵Red↵Yellow↵Green",
          type: "READ_ONLY"
        }], orderingType: 1
      },
      eventModuleDetails: { id: 11, isEventEnabled: true, isAddEventChecked: true },
      pickupDetails: {
        isChecked: true, fieldDetails: [{
          description: "test",
          fieldLength: 10,
          fieldSequence: 1,
          id: 267,
          isActive: true,
          isDisplayed: false,
          isRequired: false,
          linkedFieldId: null,
          linkedFieldValue: null,
          lookupValue: "Yes",
          type: "TEXT_AREA"
        }], orderingType: 3
      },
      serviceDetails: {
        serviceTitle: [
          {
            fieldDetails: [{
              description: "test field of service title 2",
              fieldLength: 0,
              fieldSequence: 1,
              id: 315,
              isActive: true,
              isDisplayed: null,
              isRequired: true,
              linkedFieldId: null,
              linkedFieldValue: null,
              linkedFields: [],
              lookupValue: "Microsoft~Apple~Google~Amazon",
              type: "CHECK_BOX",
              value: "Microsoft"
            },
            {
              description: "test date field",
              fieldLength: 0,
              fieldSequence: 5,
              id: 344,
              isActive: true,
              isDisplayed: null,
              isRequired: false,
              linkedFieldId: null,
              linkedFieldValue: null,
              lookupValue: "",
              type: "CUSTOM_DATE"
            }],
            id: 124,
            isActive: true,
            serviceTitleName: "Service title 2",
            serviceTitleSequence: 1,
          },

        ], isServicePageChecked: true
      },
      shipmentDetails: {
        isChecked: true, fieldDetails: [{
          description: "pickup email address",
          fieldLength: 200,
          fieldSequence: 4,
          id: 347,
          isActive: true,
          isDisplayed: null,
          isRequired: false,
          linkedFieldId: null,
          linkedFieldValue: null,
          lookupValue: "",
          type: "EMAIL"
        }], orderingType: 2
      },
      signUpModuleDetails: { id: 16, isSignUpEnabled: true, signUpEmailDomain: "yopmail.com, Compunnel.in, Compunnel.com, gmail.com" }
    }

  moduleStandardFields: any = [
    {
      fieldDetails: [
        {
          id: -1,
          description: "Event Name",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 500,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "title",
          isReadOnly: true,
          value: "test"
        },

        {
          id: -2,
          description: "Event Venue",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 500,
          isActive: true,
          isRequired: false,
          fieldSequence: 0,
          dbPropertyName: "venue"
        }, {

          id: -3,
          description: "Event Address 1",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 500,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "addressOne",
          value: "test"
        },
        {
          id: -4,
          description: "Event Address 2",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 500,
          isActive: true,
          isRequired: false,
          fieldSequence: 0,
          dbPropertyName: "addressTwo"
        },
        {
          id: -5,
          description: "Event Country",
          type: "REMOTE_DROP_DOWN",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "countryId",
          bindProperty: "countryList",
          childFieldId: -6,
          value: 231,
          countryName: "United States"
        },
        {
          id: -6,
          description: "Event State",
          type: "REMOTE_DROP_DOWN",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "stateId",
          parentFieldId: -5,
          dataLoadAPI: "getStates",
          value: "test"
        },
        {
          id: -7,
          description: "Event City",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 100,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "city",
          value: "test"
        },
        {
          id: -8,
          description: "Zip",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 10,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "eventZip",
          value: "test"
        },
        {
          id: -9,
          description: "Event Start Date",
          type: "DATE_FIELD",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "start",
          isReadOnly: true,
          value: "test"
        },
        {
          id: -10,
          description: "Event End Date",
          type: "DATE_FIELD",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "end",
          isReadOnly: true,
          value: "test"
        }
      ]
    },
    {
      fieldDetails: [
        {
          id: -1,
          description: "Name",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 200,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "name",
          dataLoadAPI: "getStates",
          value: "test"
        },
        {
          id: -2,
          description: "Location",
          type: "DROP_DOWN",
          lookupValue: "Home~Office~Convention Center~Hotel~Advance Warehouse",
          fieldLength: 500,
          isActive: true,
          isRequired: false,
          fieldSequence: 0,
          dbPropertyName: "eventVenue"
        },
        {
          id: -3,
          description: "Address 1",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 500,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "addressOne",
          value: "test"
        },
        {
          id: -4,
          description: "Address 2",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 500,
          isActive: true,
          isRequired: false,
          fieldSequence: 0,
          dbPropertyName: "addressTwo"
        },

        {
          id: -5,
          description: "Country",
          type: "REMOTE_DROP_DOWN",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "countryId",
          bindProperty: "countryList",
          childFieldId: -6,
          value: 231,
          countryName: "United States"
        },
        {
          id: -6,
          description: "State",
          type: "REMOTE_DROP_DOWN",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "stateId",
          parentFieldId: -5,
          dataLoadAPI: "getStates",
          value: "test"
        },
        {
          id: -7,
          description: "City",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 100,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "city",
          value: "test"
        },
        {
          id: -8,
          description: "Zip",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 10,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "zip",
          value: "test"
        },
        {
          id: -9,
          description: "Arrival Date",
          type: "DATE_FIELD",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "arrivalDate",
          value: "test"
        },
        {
          id: -10,
          description: "Arrival Time",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: false,
          fieldSequence: 0,
          dbPropertyName: "arrivalTime"
        }
      ]
    },
    {
      fieldDetails: [
        {
          id: -1,
          description: "Name",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 200,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "name",
          value: "test"
        },
        {
          id: -2,
          description: "Location",
          type: "DROP_DOWN",
          lookupValue: "Home~Office~Convention Center~Hotel~Advance Warehouse",
          fieldLength: 500,
          isActive: true,
          isRequired: false,
          fieldSequence: 0,
          dbPropertyName: "eventVenue"
        },
        {
          id: -3,
          description: "Address 1",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 500,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "addressOne",
          value: "test"
        },
        {
          id: -4,
          description: "Address 2",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 500,
          isActive: true,
          isRequired: false,
          fieldSequence: 0,
          dbPropertyName: "addressTwo"
        },
        {
          id: -5,
          description: "Country",
          type: "REMOTE_DROP_DOWN",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "countryId",
          bindProperty: "countryList",
          childFieldId: -6,
          value: 231,
          countryName: "United States"
        },
        {
          id: -6,
          description: "State",
          type: "REMOTE_DROP_DOWN",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "stateId",
          parentFieldId: -5,
          dataLoadAPI: "getStates",
          value: "test"
        },
        {
          id: -7,
          description: "City",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 100,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "city",
          value: "test"
        },
        {
          id: -8,
          description: "Zip",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: true,
          fieldSequence: 10,
          dbPropertyName: "zip",
          value: "test"
        },
        {
          id: -9,
          description: "Pick Up Date",
          type: "DATE_FIELD",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "pickupDate",
          value: "test"
        },
        {
          id: -10,
          description: "Pick Up Time",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: false,
          fieldSequence: 0,
          dbPropertyName: "pickupTime"
        }
      ]
    }
  ];

  addedCartCount: number = 0;

  onLinkClick(routeData: string) {
    return true
  }


  isViewStore(): boolean {
    return true
  }

  isStoreUserRoleExists(): boolean {
    return true;
  }

  saveCartJson() {
    return true;
  }

  addToCart() {
    return true;
  }

  deleteCartJson() {
    return true;
  }

  closeAssociateAndOnDemandPopup(param: any) {

  }

  getStates(param: any) {
    return ({
      responseCode: "S0001",
      responseDescription: "Success",
      response: [
        {
          id: 244,
          name: "Aruba",
          checked: false
        }
      ]
    });
  }

  getCountries(param: any) {
    return ({
      responseCode: "S0001", responseDescription: "Success", response: [
        { id: 1, name: "Afghanistan", checked: false },
        { id: 2, name: "Albania", checked: false },
        { id: 3, name: "Algeria", checked: false },
        { id: 4, name: "American Samoa", checked: false },
        { id: 5, name: "Andorra", checked: false },
        { id: 6, name: "Angola", checked: false },
        { id: 8, name: "Antarctica", checked: false },
        { id: 10, name: "Argentina", checked: false },
        { id: 11, name: "Armenia", checked: false },
        { id: 12, name: "Aruba", checked: false }
      ]
    });
  }

  getCartJson(fn?) {
    if (fn) {
      return fn(false);
    }
  }

  displayDate(value) {
    if (value) {
      let dateVar = value.split("-");
      let dateVal = dateVar[0] + "/" + dateVar[1] + "/" + dateVar[2];
      return dateVal;
    }
  }

  loadModulesStandardField(fn) {
    return fn();
  }
  loadModulesCustomFields(fn) {
    return fn(true);
  }

  getServiceSectionValue(field,data) {
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
            }else{
              field.value = item.customFieldValue;
            }
            return;
          }
        })
      //}
    }
  }

  quantityValidation(item, alreadyOrderedQuantity?) {
    return true;
  }


  // getCartJson(fn?) {
  //   if (fn) {
  //     return fn({
  //       "errorCode": "E1104",
  //       "errorDescription": "No cart found"
  //     });
  //   }

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

  createLinkedData(response,index,customField) {
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

  emptyCart(){
    localStorage.removeItem('eventStartDate');
    localStorage.removeItem('eventEndDate');
    localStorage.removeItem('eventName');
    localStorage.removeItem('eventId');
    localStorage.removeItem('lastUpdatedPlaceOrderJSON');
    this.deleteCartJson();
    this.modulesCustomFields = [];
    this.moduleStandardFields = [];
    //this.util.isSameAsEventOnPickup = false;
    //this.util.isSameAsEventOnShipment = false;
    this.addedCartCount = 0; //reset the value of cart count
  
}
getLogo(id: number){
  return of("Download 'pexels-photo-414612.jpeg'");
}
}
