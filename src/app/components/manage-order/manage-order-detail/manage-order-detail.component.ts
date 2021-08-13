import { Component, OnInit, ViewChild, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { SharedService } from '../../../shared/services/shared.service';
import { ManageOrderService } from '../manage-order.service';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { AppConstant } from '../../../shared/config/app-constant';
import { SelectProductPopupComponent } from '../select-product-popup/select-product-popup.component';
import { Common } from '../../../store/utility/common';
import { Enum } from '../../../shared/config/enum.enum';
import { Util } from '../../../shared/services/util';
import { HttpClient } from '@angular/common/http';
import { AppUrl } from './../../../shared/config/app-url.enum';
import { HttpClientService } from './../../../shared/services/http-client.service';
import { DomSanitizer } from '@angular/platform-browser';
import { EncryptionService } from './../../../shared/services/encryption.service';
import { AuthService } from './../../../shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-manage-order-detail',
  templateUrl: './manage-order-detail.component.html',
  styleUrls: ['./manage-order-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManageOrderDetailComponent implements OnInit {

  @ViewChild('placeOrderForm') placeOrderForm;
  @ViewChild('eventDetailsForm') eventDetailsForm;
  @Output()
  productDeleted: EventEmitter<any> = new EventEmitter<any>();
  isFormValid: boolean = true;
  displayedColumns: string[] = ['productNumber', 'productName', 'categories', 'orderedQuantity', 'link'];

  dataSource = new MatTableDataSource();
  onDemandDisplayedColumns: string[] = ['productNumber', 'productName', 'onDemandTextGraphic', 'link'];
  onDemandDataSource = new MatTableDataSource();
  //noRecords: boolean = false;
  data: any = {};
  moduleData: any = {};
  appMessage = AppMessage;
  appConstant = AppConstant;
  isFormSubmitted: boolean = false;  //if form is submitted once then no action to perform on save button
  isProductDialogOpen: boolean = false;  //to disable the add new product label when the select product popup is open
  isNewProduct: boolean = false;
  modulesData: any = [];
  // staticEventDetails: any = {};
  // staticShipmentDetails: any = {};
  // staticPickupDetails: any = {};

  contries: any = [];
  states: any = [];
  eventDetails: any = {};
  eventDetailsFormData: any = [];

  eventDetailsField: any = [];
  additionalInfoDetailFields: any = [];
  shipmentDetailFields: any = [];
  pickupDetailsFields: any = [];
  serviceCustomFields: any = [];
  //moduleCustomData: any = {};
  Enum = Enum;
  //image:any;
  isCardNumberVisible:boolean = false;

  editRow: any = {
    isOnDemandProdEditable: false,
    rowId: 0
  }
  isCreditCardAdmin:boolean = false;
  clientSettings: any = {};

  constructor(private http: HttpClient, private manageOrderService: ManageOrderService, 
    private httpClientService: HttpClientService,private authService: AuthService,private cookieService: CookieService,
    private common: Common,private encryptionService: EncryptionService, public dialog: MatDialog, public util: Util, public sharedService: SharedService,
    public _domSanitizationService: DomSanitizer) { }

  ngOnInit() {
    /* this.staticEventDetails = {
      name: '',
      venue: '',
      startDate: '',
      endDate: '',
      address1: '',
      address2: '',
      cityStateZip: '',
      country: ''
    };
    this.staticShipmentDetails = {
      name: '',
      venue: '',
      startDate: '',
      arrivalTime: '',
      address1: '',
      address2: '',
      cityStateZip: '',
      country: ''
    };
    this.staticPickupDetails = {
      name: '',
      venue: '',
      startDate: '',
      pickupTime: '',
      address1: '',
      address2: '',
      cityStateZip: '',
      country: ''
    } */
    if (this.util.isStore) {
      this.displayedColumns = ['productNumber', 'productName', 'categories', 'orderedQuantity'];
      this.onDemandDisplayedColumns = ['productNumber', 'productName', 'onDemandTextGraphic'];
    }else{
      this.isCreditCardAdmin = this.authService.isRoleExists([Enum.CreditCard_Admin]);
    }
  }

  getOrders(data) {
    this.data = data;
    this.common.manageOrderObject.serviceDetails = data.serviceInfoDetails;
    this.common.manageOrderObject.shipmentDetails = data.shipmentDetails;
    this.common.manageOrderObject.eventDetails = data.eventDetails;
    this.common.manageOrderObject.additionalInfoDetails = data.additionalInfoDetails;
    this.common.manageOrderObject.pickupDetails = data.pickupDetails;
    this.common.manageOrderObject.orderId = data.orderId;
    // this.common.manageOrderObject = data;
    this.common.manageOrderObject.orderDetails = data.productInfoWithGraphicsList;

    //this.noRecords = data.productInfoList.length > 0 ? false : true;
    if (data.productInfoList.length > 0) {
      data.productInfoList.forEach(x => {
        Object.assign(x, { 'isEdit': false });
      });
      this.dataSource.data = data.productInfoList;
      this.onDemandDataSource.data = data.productInfoWithGraphicsList;
      this.loadStandardCustomField();
    }

    this.common.loadModulesStandardField(() => {
      this.manageOrderService.loadModulesCustomFields((value) => {
        this.moduleData = value;
        this.setData();
      });
    });

    // get Client Settings 
    this.getClientSetting();

    //get the credit card info
    if(this.data.cardInfo){
      this.getCreditCardDetails();
    }
  }

  //decrypt the credit card json using requestor id as key and 
  //security one because apart from card number, all the card details will be visible to each user
  getCreditCardDetails(){
    this.data.creditDetails = this.encryptionService.decryptData(this.data.cardInfo.securityOne, this.data.cardInfo.requestorId.toString());
  }

  /**
   * Method will only be called for CreditCardAdmin because they have the authority to view the credit card number
   * For this, hit the API to get the credit card encrypted json for securityTwo string because it contains the value of card
   * store the value of encrypted and decrypted card number to show at the time of visibility icon click
   */
  getCreditCardNumber(){
    if(!this.data.creditDetails.decryptedCardNumber){
      let param = {
        id : this.data.cardInfo.cardId
      }
      this.manageOrderService.getCreditCardForCardAdmin(param).subscribe( (response) => { 
        this.sharedService.onSuccess(response, null, value => {
          if (value) {
            let key = this.data.cardInfo.requestorId.toString();
            let cardObject = this.encryptionService.decryptData(response.response.result.securityTwo, key);
            this.data.creditDetails['decryptedCardNumber'] = cardObject.number;
            this.data.creditDetails['encryptedCardNumber'] = this.data.creditDetails.number;
            this.data.creditDetails.number =  this.data.creditDetails['decryptedCardNumber'];
            this.isCardNumberVisible = !this.isCardNumberVisible;
          }
        });
      });
    }else{
      if(!this.isCardNumberVisible){
        this.data.creditDetails.number = this.data.creditDetails['decryptedCardNumber'];
      }else{
        this.data.creditDetails.number = this.data.creditDetails['encryptedCardNumber'];
      }
      this.isCardNumberVisible = !this.isCardNumberVisible;
    }
  }


  setData() {
    // this.moduleData = this.moduleCustomData;
    let standardField = this.common.moduleStandardFields;

    this.serviceCustomFields = this.moduleData.serviceDetails.serviceTitle;
    if(this.data.serviceInfoDetails){
      this.setDataIntoServiceSection();
    }
    // if (this.moduleData.eventDetails.isChecked) {  //to stop the error of date null when event module is disabled
    this.eventDetailsField = standardField[0].fieldDetails.concat(this.moduleData.eventDetails.fieldDetails);
    this.setDataIntoEventSection();
    // }

    this.additionalInfoDetailFields = this.moduleData.additionalInfoDetails.fieldDetails;
    this.shipmentDetailFields = standardField[1].fieldDetails.concat(this.moduleData.shipmentDetails.fieldDetails);
    this.pickupDetailsFields = standardField[2].fieldDetails.concat(this.moduleData.pickupDetails.fieldDetails);
    this.setDataIntoEachSection();
  
  }

  setDataIntoServiceSection() {
    for (let i = 0; i < this.serviceCustomFields.length; i++) {
      this.serviceCustomFields[i].fieldDetails.forEach(field => {
        if (this.checkDisabled()) {   //disable the service section in case of store
          field['isReadOnly'] = this.checkDisabled();
        };
        this.common.getServiceSectionValue(field, this.data.serviceInfoDetails);
      });
      this.common.createLinkedData(this.serviceCustomFields[i].fieldDetails, i, this.serviceCustomFields);
    }
  }

  // To show fixed data into fields
  setDataIntoEventSection() {
    this.putData(this.data.eventDetails, 1);
    this.eventDetailsField.forEach(element => {
      if (element.isReadOnly == false) {
        element.isReadOnly = true; //  we need event Name , start date and End date as readonly
      }
    });
  }

  setDataIntoEachSection() {
    this.putData(this.data.shipmentDetails, 2);
    this.putData(this.data.pickupDetails, 3);
    this.putData(this.data.additionalInfoDetails, 4);
  }

  putData(data, type) {
    let disabled = this.checkDisabled();
    switch (type) {
      case 1: this.putDataIntoSection(this.eventDetailsField, data, type);
        this.createLinkedData(this.eventDetailsField, type, disabled);
        break;
      case 2: this.putDataIntoSection(this.shipmentDetailFields, data, type);
        this.createLinkedData(this.shipmentDetailFields, type, disabled);
        break;
      case 3: this.putDataIntoSection(this.pickupDetailsFields, data, type);
        this.createLinkedData(this.pickupDetailsFields, type, disabled);
        break;
      case 4: this.putDataIntoSection(this.additionalInfoDetailFields, data, type);
        this.createLinkedData(this.additionalInfoDetailFields, type, disabled);
        break;
    }

  }

  putDataIntoSection(field, data, type) {
    if (!data) {
      return;
    }
    field.forEach(element => {
      if (element.id < 0) {
        if (element.type == 'DATE_FIELD') {
          if (type == 1) {
            element.value = new Date(this.common.displayDate(data[element.dbPropertyName]))
          } else {
            if (data[element.dbPropertyName]) {
              element.value = new Date(data[element.dbPropertyName])
            } else {
              element.value = '';
            }
          }
          //element.value = type == 1 ? new Date(this.common.displayDate(data[element.dbPropertyName])) : data[element.dbPropertyName] ? new Date(data[element.dbPropertyName]) : '';
        } else if (element.type == "REMOTE_DROP_DOWN") {
          if (element.dbPropertyName == "stateId") {
            element.value = data.stateId;
          }
          else if (element.dbPropertyName == "countryId" && data.countryId) {
            element.value = data.countryId;
          }
        }
        else {
          element.value = data[element.dbPropertyName];
        }
      } else {
        data.customFieldValues.some((item) => {
          if (item.customFieldId == element.id) {
            if (element.type == 'CUSTOM_DATE') {
              element.value = new Date(item.customFieldValue);
            }else{
              element.value = item.customFieldValue;
            }
          }
          return;
        });
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

  createLinkedData(response, type, isReadOnly) {
    // response.sort(function (a, b) { if (a.id < b.id) { return -1 } else { return 1 } });
    let typeOfData = type == 1 ? this.eventDetailsField : type == 2 ? this.shipmentDetailFields
      : type == 3 ? this.pickupDetailsFields : this.additionalInfoDetailFields;
    typeOfData = [];
    response.forEach(element => {
      let findItem;
      //  set property only when readonly is true 
      if (isReadOnly) {
        element['isReadOnly'] = isReadOnly
      };
      findItem = this.isNodeLinkedInTree(typeOfData, element, findItem);
      Object.assign(element, { linkedFields: [] });
      if (findItem) {
        findItem.linkedFields.push(element);
      } else {
        typeOfData.push(element);
      }
    });
    type == 1 ? this.eventDetailsField = typeOfData : type == 2 ? this.shipmentDetailFields = typeOfData
      : type == 3 ? this.pickupDetailsFields = typeOfData : this.additionalInfoDetailFields = typeOfData;
  }


  // Load standard field static Data (saved Locally at UI level)
  loadStandardCustomField() {
    this.http.get('./assets/module-standard-fields.json').subscribe((response: any) => {
      this.modulesData = response.modulesData;
      //this.getStaticData();
    });
  }


  /**
   * Get Data for service section to show it in Html with address fields combined
   * 0 = event; 1= shipment; 2 = pickup details
   */
  /* getStaticData() {
    if (this.data.eventDetails) {
     // this.eventAddress = "";
      this.getStaticDetails(0);
      this.getCompleteAddress(0);
    }
    if (this.data.shipmentDetails) {
      //this.shipmentAddress = "";
      this.getStaticDetails(1);
      this.getCompleteAddress(1);
    }
    if (this.data.pickupDetails) {
     // this.pickupAddress = "";
      this.getStaticDetails(2);
      this.getCompleteAddress(2);
    }
  }

  getStaticDetails(id) {
    let arr = id == 0 ? this.data.eventDetails.staticFields : id == 1 ? this.data.shipmentDetails.staticFields : this.data.pickupDetails.staticFields;
    let value = id == 0 ? this.staticEventDetails : id == 1 ? this.staticShipmentDetails : this.staticPickupDetails;
    arr.forEach(element => {
      if (element.fieldLabel == this.modulesData[id].fieldDetails[0].description) {
        value.name = element.fieldValue;
      }
      if (element.fieldLabel == this.modulesData[id].fieldDetails[1].description) {
        value.venue = element.fieldValue;
      }
      if (element.fieldLabel == this.modulesData[id].fieldDetails[8].description) {
        value.startDate = element.fieldValue;
      }
      if (element.fieldLabel == this.modulesData[id].fieldDetails[9].description) {
        //value.endDate = element.fieldValue;
        id == 0 ? value.endDate = element.fieldValue : id == 1 ? value.arrivalTime = element.fieldValue : value.pickupTime = element.fieldValue;
      }
    });
  }

  Here looping will be from i=2 to 7 because in our standard json we have saved the address fields in this order only
  getCompleteAddress(id) {
    let  city,state,zip;
    city = state = zip = "";
    let arr = id == 0 ? this.data.eventDetails.staticFields : id == 1 ? this.data.shipmentDetails.staticFields : this.data.pickupDetails.staticFields;
    let value = id == 0 ? this.staticEventDetails : id == 1 ? this.staticShipmentDetails : this.staticPickupDetails;
    arr.forEach(element => {
      for (let i = 2; i < 8; i++) {
        if (this.modulesData[id].fieldDetails[i].description == element.fieldLabel) {
          if (element.fieldValue) {
            if(this.modulesData[id].fieldDetails[i].dbPropertyName == "addressOne"){
              value.address1 = element.fieldValue + ', ';
            }else  if(this.modulesData[id].fieldDetails[i].dbPropertyName == "addressTwo"){
              value.address2 = element.fieldValue + ', ';
            }else if(this.modulesData[id].fieldDetails[i].dbPropertyName == "city"){
              city = element.fieldValue + ', ';
            }else if(this.modulesData[id].fieldDetails[i].dbPropertyName == "stateId"){
              state = element.fieldValue + ', ';
            }else if(this.modulesData[id].fieldDetails[i].dbPropertyName == "countryId"){
              value.country = element.fieldValue;
            }else{
              zip = element.fieldValue + ', ';
            }
            //value += element.fieldValue + ', ';
          }break;
        }
      }
    });
    value = city + state + zip;
    value = value.substring(0, value.length - 2);
    id == 0 ? this.staticEventDetails.cityStateZip = value : 
    id == 1 ? this.staticShipmentDetails.cityStateZip = value : 
    this.staticPickupDetails.cityStateZip = value;
  } */

  validateOrderDetail() {
    let valid = this.placeOrderForm.valid; // form required  
    this.isFormValid = valid; // used in HTML
    return valid;
  }

  updateOrder(fn?) {
    let param: any = {
      orderId: this.data.orderId,
      ampProjectNo: this.data.ampProjectNo,
      workOrderTaskNo: this.data.workOrderTaskNo,
      notes: this.data.notes
    }
    if (this.validateOrderDetail() && !this.isFormSubmitted) {
      this.isFormSubmitted = true;
      let request = this.data.orderStatus == Enum.Order_Placed ? this.manageOrderService.updateOrderToConfirm(param) : this.manageOrderService.updateOrder(param);
      request.subscribe(response => {
        this.sharedService.onSuccess(response, 'U0104', (value) => {
          this.isFormSubmitted = false;
          if (value) {
            return fn(true);
            // this.updateEventShipping(fn);
          }
        });
      }, error => { this.sharedService.onError(error) });
    }
  }

  //open the popUp to select the product
  openSelectProductPopup() {
    this.isProductDialogOpen = true;
    this.dialog.open(SelectProductPopupComponent, {
      data: {
        alreadySelected: this.dataSource.data.length > 0 ? this.dataSource.data : null,
        fromDate: this.data.fromDate,
        toDate: this.data.toDate
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        let data: any = this.dataSource.data;
        data.splice(data.length - 1, 1);
        result.forEach(x => {
          x.orderedQuantity = 0;
          x.isEdit = true;
          x.id = 0;
          data.push(x);
        });
        this.dataSource.data = data;
        this.isProductDialogOpen = false;
        //this.isNewProduct = false;
      }
      //else {
      this.isNewProduct = false;
      // }
    });
  }

  addNewProduct() {
    this.isNewProduct = true;
    let newData: any = this.dataSource.data;
    newData.push({ id: 0, productNumber: -1, productName: "", categories: "", orderedQuantity: "", isNew: true });
    this.dataSource.data = newData;
  }

  deleteProduct(product: any) {
    let param: any = {
      orderId: this.data.orderId,
      id: product.id
    }
    this.manageOrderService.deleteProductOnOrder(param).subscribe(response => {
      this.sharedService.onSuccess(response, 'U0146', (value) => {
        if (value) {
          this.productDeleted.emit(true);
        }
      });
    }, error => { this.sharedService.onError(error) });
  }

  editQuantity(element: any) {
    element.isEdit = true;
    element.isNew = false;
    element.previousOrderedQuantity = element.orderedQuantity;
  }

  updateQuantity(item: any) {
    if (this.common.quantityValidation(item)) {
      let param: any = {
        orderId: this.data.orderId,
        orderedQuantity: item.orderedQuantity,
        productId: item.productId,
        id: item.id
      }
      let request = item.id > 0 ? this.manageOrderService.updateQuantity(param) : this.manageOrderService.addNewProduct(param);
      request.subscribe(response => {
        let message;
        item.id > 0 ? message = 'U0103' : message = 'U0120';
        this.sharedService.onSuccess(response, message, (value) => {
          if (value) {
            item.id = response.response.id;
            item.isEdit = false;
            this.isNewProduct = false;
          }

        });
      }, error => { this.sharedService.onError(error) });
    }
  }

  close(item) {
    item.isEdit = false;
    item.orderedQuantity = item.previousOrderedQuantity ? item.previousOrderedQuantity : 1;
    if (item.id == 0) {   // remove the new product row added
      let newData: any = this.dataSource.data;
      newData.splice(newData.indexOf(item), 1);
      this.dataSource.data = newData;
    }
  }

  changeStatusToProcessing(fn?) {
    if (this.validateOrderDetail() && !this.isFormSubmitted) {
      let param: any = {
        orderId: this.data.orderId,
        ampProjectNo: this.data.ampProjectNo,
        workOrderTaskNo: this.data.workOrderTaskNo,
        notes: this.data.notes
      }
      this.isFormSubmitted = true;
      //this method is called first so that any changes done by user is also saved if they directly clicks on change status button
      this.manageOrderService.updateOrder(param).subscribe(response => {
        this.isFormSubmitted = false;
        this.sharedService.onSuccess(response, null, (value) => {

          if (value) {
            this.submit(fn);
          }
        });
      }, error => { this.sharedService.onError(error) });
    }
  }

  submit(fn) {
    let param: any = {
      pathVariable: this.data.orderId
    }
    this.manageOrderService.changeStatustoProcessing(param).subscribe(response => {
      this.sharedService.onSuccess(response, 'U0099', (value) => {
        this.isFormSubmitted = false;
        if (value) {
          return fn(true);
          // this.updateEventShipping(fn);
        }
      });
    }, error => { this.sharedService.onError(error) });
  }

  /**
   *  Returns true if order status is placed/confirmed/processing/ready to ship
   */
  checkDisabled() {
    return (([Enum.Order_Placed, Enum.Order_Confirmed, Enum.Order_Processing, Enum.Order_Ready_to_ship].indexOf(this.data.orderStatus) < 0) || (this.util.isStore)) ? true : false;
  }

  /**
   * Update shipping details/ event details/ other details
   * @param fn : callback function
   */
  updateEventShipping(fn?) {
    if (!this.checkDisabled()) {
      let client = JSON.parse(localStorage.getItem('selectedClientInfo'));
      this.common.manageOrderObject['clientId'] = client.id
      if (this.common.manageOrderObject.eventDetails) {
        this.common.manageOrderObject.eventDetails['clientId'] = client.id
        this.common.manageOrderObject['eventId'] = this.data.eventDetails.id;
      }

      this.manageOrderService.updateOrderDetail(this.common.manageOrderObject).subscribe(response => {
        this.util.disableSaveBtnOnOrder = true;
        if (fn && typeof fn == 'function') {
          return fn(true);
        } else {
          this.sharedService.onSuccess(response, 'U0162', () => {
            // return fn(true);
          });
        }
      }, error => { this.sharedService.onError(error) });
    } else {
      return fn(true);
    }

  }

  // On Demand Graphics Show Hide Button Editable, Save and Cancel
  editGraphicsText(element) {
    this.editRow.rowId = element.id;
    this.editRow.isOnDemandProdEditable = true;
    element.previousOnDemandTextGraphic = element.onDemandTextGraphic;
  }
  //Close button to cancel the editable section for on demand text graphics
  cancelOnDemandProdEditable(element) {
    this.editRow.rowId = 0
    this.editRow.isOnDemandProdEditable = false;
    element.onDemandTextGraphic = element.previousOnDemandTextGraphic;
  }

  updateOnDemandText(element) {
    this.util.disableSaveBtnOnOrder = false;   //enable the save button of event/shipping/pickup tab
    this.editRow.rowId = 0
    this.editRow.isOnDemandProdEditable = false;
    if (element.filePath) {
      this.updateGraphic(element.updateFile, element);
    }
  }

  changeGraphicFile(event: any, element): void {
    let file = event.target.files && event.target.files[0] ? event.target.files[0] : '';
    if (!this.util.checkExtension(file.name, '')) {
      this.sharedService.openToast('e', AppMessage.U0147);
    } else if (!this.util.checkSizeValidation(file)) {
      this.sharedService.openToast('e', AppMessage.U0150);
    } else {
      element.updateFile = event.target.files[0];
    }
  }

  updateGraphic(file, element) {
    const uploadData = new FormData();
    uploadData.append('file', file);
    this.httpClientService.upload(AppUrl.onDemandGraphic, uploadData).subscribe(response => {
      this.sharedService.onSuccess(response, 'U0165', (value) => {
        if (value) {
          element.fileName = response.response.fileName;
          element.filePath = response.response.filePath;
        }
      });
    }, error => this.sharedService.onError(error));
  }

  getClientSetting() {
    let param = { 
      pathVariable:  this.util.isStore ? this.cookieService.get('storeClientId') : localStorage.getItem('selectedClientId'), 
    };
    this.manageOrderService.getClientSetting(param).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        if (response.response && response.response.settings) {
          this.clientSettings = response.response.settings;
        }
      });
    });
  }

 


}
