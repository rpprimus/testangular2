import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Common } from '../../../utility/common';
import { StoreService } from '../../../service/store.service';
import { SharedService } from '../../../../shared/services/shared.service';
import { AppMessage } from '../../../../shared/config/app-message.enum';
import { Enum } from '../../../../shared/config/enum.enum';
import { Util } from '../../../../shared/services/util';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  @ViewChild('events') events: ElementRef;
  @ViewChild('shipments') shipments: ElementRef;
  @ViewChild('pickups') pickups: ElementRef;
  @ViewChild('additionals') additionals: ElementRef;
  eventDetailsField: any = [];
  additionalInfoDetailFields: any = [];
  shipmentDetailFields: any = [];
  pickupDetailsFields: any = [];
  data: any = {};
  isStoreUser: boolean = false;
  requestors: any = [];
  appMessage = AppMessage;
  requestorName: string = "";
  enum = Enum;
  constructor(public common: Common, private storeService: StoreService, private sharedService: SharedService,
    public util: Util) { }

  ngOnInit() {
    this.common.loadModulesStandardField(() => {
      this.common.loadModulesCustomFields(() => {
        this.setData();
      });
    });
    //to check whether logged in user has role of an admin or regional manager then only show the dropdown with requestor names else readonly field with logged in user name
    this.common.storeUserInfo.subscribe(response => {
      if (response.roles) {
        this.isStoreUser = this.common.isStoreUserRoleExists([Enum.Store_Admin, Enum.Store_Regional_Manager, Enum.Store_User]);
        if (this.isStoreUser) {
          this.requestorName = response.name;
          this.common.placeOrderObj.requestorName = response.name;
          this.common.placeOrderObj.requestorId = response.id;
        }
        else {
          this.getRequestor();
        }
      }
    });

  }

  setData() {
    this.data = this.common.modulesCustomFields;
    let standardField = this.common.moduleStandardFields;
    if (this.data.eventDetails.isChecked) {  //to stop the error of date null when event module is disabled
      this.eventDetailsField = standardField[0].fieldDetails.concat(this.data.eventDetails.fieldDetails);
      this.setDataIntoEventSection();
    }
    this.additionalInfoDetailFields = this.data.additionalInfoDetails.fieldDetails;
    this.shipmentDetailFields = standardField[1].fieldDetails.concat(this.data.shipmentDetails.fieldDetails);
    this.pickupDetailsFields = standardField[2].fieldDetails.concat(this.data.pickupDetails.fieldDetails);
    this.setDataIntoEachSection();
  }

  // To show fixed data into fields
  setDataIntoEventSection() {
    this.putData(this.common.placeOrderObj.eventDetails, 1);
    this.eventDetailsField.forEach(element => {
      if (element.isReadOnly == false) {
        element.isReadOnly = true; //  we need event Name , start date and End date as readonly
      }
    });
    this.eventDetailsField[0].value = localStorage.getItem('eventName');
    this.eventDetailsField[8].value = new Date(this.common.displayDate(localStorage.getItem('eventStartDate')));
    this.eventDetailsField[9].value = new Date(this.common.displayDate(localStorage.getItem('eventEndDate')));
  }

  setDataIntoEachSection() {
    this.putData(this.common.placeOrderObj.shipmentDetails, 2);
    this.putData(this.common.placeOrderObj.pickupDetails, 3);
    this.putData(this.common.placeOrderObj.additionalInfoDetails, 4);
  }

  putData(data, type) {
    switch (type) {
      case 1: this.putDataIntoSection(this.eventDetailsField, data, type);
        this.createLinkedData(this.eventDetailsField, type);
        break;
      case 2: this.putDataIntoSection(this.shipmentDetailFields, data, type);
        this.createLinkedData(this.shipmentDetailFields, type);
        break;
      case 3: this.putDataIntoSection(this.pickupDetailsFields, data, type);
        this.createLinkedData(this.pickupDetailsFields, type);
        break;
      case 4: this.putDataIntoSection(this.additionalInfoDetailFields, data, type);
        this.createLinkedData(this.additionalInfoDetailFields, type);
        break;
    }

  }

  putDataIntoSection(field, data, type) {
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
            } else {
              element.value = item.customFieldValue;
            }
          }
          return;
        })
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

  createLinkedData(response, type) {
    // response.sort(function (a, b) { if (a.id < b.id) { return -1 } else { return 1 } });
    let typeOfData = type == 1 ? this.eventDetailsField : type == 2 ? this.shipmentDetailFields
      : type == 3 ? this.pickupDetailsFields : this.additionalInfoDetailFields;
    typeOfData = [];
    response.forEach(element => {
      let findItem;
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

  /**
   * copy the static data of event detail to shipment and pickup detail
   * @param type = 'shipment' or 'pickup' based on the checkbox clicked in sections
   */
  sameAsEvent(type: string) {
    let pickUpjsonObj = this.common.placeOrderObj['pickupDetails'];
    let shipmentjsonObj = this.common.placeOrderObj['shipmentDetails'];
    for (let i = 2; i < 8; i++) {
      //this.eventDetailsField.forEach(x => {
      if (type == "shipment") {
        let item = this.shipmentDetailFields.find(y => y.id == this.eventDetailsField[i].id);
        // if (i > 1) //this comdition is because we dont want to copy the event venue in shipment location
        this.copyEventData(this.eventDetailsField[i], item, shipmentjsonObj, this.util.isSameAsEventOnShipment, type)
      } else {
        let item = this.pickupDetailsFields.find(y => y.id == this.eventDetailsField[i].id);
        this.copyEventData(this.eventDetailsField[i], item, pickUpjsonObj, this.util.isSameAsEventOnPickup, type);
      }
    };
    this.common.saveCartJson();
  }

  copyEventData(eventField, item, typeObj, checkBoxType, type) {
    let eventjsonObj = this.common.placeOrderObj['eventDetails'];
    if (checkBoxType) {
      if (eventField.type == 'REMOTE_DROP_DOWN') {
        typeObj[item.dbPropertyName] = item.value = eventField.value;
        if (item.dbPropertyName == "stateId") {
          typeObj.stateName = eventjsonObj.stateName;
          typeObj[item.dbPropertyName + 'Value'] = eventjsonObj.stateIdValue ?
            eventjsonObj.stateIdValue : eventjsonObj.stateName;
        }
        else if (item.dbPropertyName == "countryId") {
          typeObj.countryName = eventjsonObj.countryName;
          typeObj[item.dbPropertyName + 'Value'] = eventjsonObj.countryIdValue ?
            eventjsonObj.countryIdValue : eventjsonObj.countryName;
          if (eventField.childFieldId) {
            this.loadStateDropdownData(eventField, type);
          }
        }
      }
      else if (eventField.dbPropertyName == 'venue') {
        item.value = eventField.value;
        typeObj['eventVenue'] = eventjsonObj[eventField.dbPropertyName];
      }
      else if (eventField.dbPropertyName == 'eventZip') {
        item.value = eventField.value;
        typeObj['zip'] = eventjsonObj[eventField.dbPropertyName];
      } else {
        item.value = eventField.value;
        typeObj[item.dbPropertyName] = eventjsonObj[item.dbPropertyName];
      }
    } else {
      typeObj[item.dbPropertyName] = item.value = '';
    }
  }

  //This is to load the data into particular section state dropdown which is copied from event details
  loadStateDropdownData(field, type) {
    let childField;
    let fields = type == 'shipment' ? this.shipmentDetailFields : this.pickupDetailsFields;
    fields.some((item) => { if (item.id == field.childFieldId) return childField = item; });
    this.common[childField.dataLoadAPI](field.value, (data) => {
      childField.remoteData = data; // bind data into remoteData property
    });
  }

  // sameAsshipment() {
  //   let pickUpjsonObj = this.common.placeOrderObj['pickupDetails'];
  //   let shipmentjsonObj = this.common.placeOrderObj['shipmentDetails'];
  //   this.shipmentDetailFields.forEach(x => {
  //     if (x.id < 0) {
  //       let item = this.pickupDetailsFields.find(y => y.id == x.id);
  //       if (this.util.isSameAsEvent) {
  //         if (x.type == 'REMOTE_DROP_DOWN') {
  //           pickUpjsonObj[item.dbPropertyName] = item.value = x.value;
  //           if (item.dbPropertyName == "stateId") {
  //             pickUpjsonObj.stateName = shipmentjsonObj.stateName;
  //             pickUpjsonObj[item.dbPropertyName + 'Value'] = shipmentjsonObj.stateIdValue;
  //           }
  //           else if (item.dbPropertyName == "countryId") {
  //             pickUpjsonObj.countryName = shipmentjsonObj.countryName;
  //             pickUpjsonObj[item.dbPropertyName + 'Value'] = shipmentjsonObj.countryIdValue ? 
  //             shipmentjsonObj.countryIdValue : shipmentjsonObj.countryName;
  //           }
  //         } else if (x.type == 'DATE_FIELD') {
  //           item.value = x.value;
  //           pickUpjsonObj[item.dbPropertyName] = x.value ? this.util.formatDate(x.value) : '';
  //         } else {
  //           item.value = x.value;
  //           pickUpjsonObj[item.dbPropertyName] = shipmentjsonObj[item.dbPropertyName];
  //         }
  //       } else {
  //         pickUpjsonObj[item.dbPropertyName] = item.value = '';
  //       }

  //     }
  //   });
  //   this.common.saveCartJson();
  // }

  getRequestor() {
    let param: any = {
      clientId: this.common.storeClientInfo.id
    }
    this.storeService.getRequestor(param).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        if (response.response) {
          this.requestors = response.response;
        }
      });
    }, error => { this.sharedService.onError(error) });
  }

  requestorSelected($event) {
    this.common.placeOrderObj.requestorName = $event.target.textContent;
    this.common.saveCartJson();
  }

  //This method is done for the smooth scrolling of the page to the particular section when click on left panel menu
  scroll(num: number) {
    switch (num) {
      case 1: this.events.nativeElement.scrollIntoView({ block: 'start', behavior: "smooth" });
        break;
      case 2: this.shipments.nativeElement.scrollIntoView({ block: 'start', behavior: "smooth" });
        break;
      case 3: this.pickups.nativeElement.scrollIntoView({ block: 'start', behavior: "smooth" });
        break;
      case 4: this.additionals.nativeElement.scrollIntoView({ block: 'start', behavior: "smooth" });
        break;
      default: window.scrollTo(0, 0);
        break;
    }
  }

}
