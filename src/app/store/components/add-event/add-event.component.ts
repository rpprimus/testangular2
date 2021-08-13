import { Component, OnInit } from '@angular/core';
import { Common } from '../../utility/common';
import { StoreService } from '../../service/store.service';
import { SharedService } from '../../../shared/services/shared.service';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { Util } from '../../../shared/services/util';
import { Enum } from '../../../shared/config/enum.enum';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  eventDetailsField: any = [];
  editPreviousEvent: boolean = false;
  appMessage = AppMessage;
  id: number = 0;
  canAddEdit: boolean = false;
  
  // constructor(private common: Common, public dialogRef: MatDialogRef<AddEventComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: any, private storeService: StoreService, private sharedService: SharedService) {
  //   data.autoFocus = false;
  // }

  constructor(private _activatedRoute: ActivatedRoute, private common: Common, private storeService: StoreService,
    private sharedService: SharedService, private router: Router, private util: Util) {
  }

  ngOnInit() {
    this.id = this._activatedRoute.snapshot.params['id'] ? this._activatedRoute.snapshot.params['id'] : 0;
    if (this.common.moduleStandardFields.length > 0) {
      this.setData();
    } else {
      this.common.loadModulesStandardField(() => {
        this.common.loadModulesCustomFields(() => {
          this.setData();
        });
      });
    }
  }

  setData() {
    this.common.calenderEventObject = {
    //this.common.placeOrderObj.eventDetails = {
      clientId: this.common.storeClientInfo.id,
      customFieldValues: []
    };
    let moduledata = this.common.modulesCustomFields;
    if (moduledata) {
      let userData = this.common.storeUserInfo.getValue();
      //check that if the logged in user has only 1 role and that role is store user also if addevent checked is false then user cannot edit events
      if(!moduledata.eventModuleDetails.isAddEventChecked && userData.roles.length == 1 && userData.roles == Enum.Store_User){
        this.canAddEdit = false;
      }else{
        this.canAddEdit = true;
      }
      //this.canAddEdit = data.eventModuleDetails.isAddEventChecked;
    }
    let standardFields = this.common.moduleStandardFields[0];
    this.eventDetailsField = standardFields && standardFields.fieldDetails.concat(moduledata.eventDetails.fieldDetails);
    this.eventDetailsField && this.eventDetailsField.forEach(element => {
      if (element.type != "REMOTE_DROP_DOWN" || element.dbPropertyName != "countryId") { //setting the default selected value of country to US
        element.value = '';
      }else{
        if(this.id == 0){
          element.value = 231;
        }
      }

      element.touched = false;
      if (element.isReadOnly) {
        element.isReadOnly = false; // On add event popup = we need event Name , start date and End date as editable fields so updated readonly property as  FALSEs
      }
    });
    if (this.id > 0) {
      this.getEvent()
    }
    this.createLinkedDataForEvent(this.eventDetailsField);
  }

  isNodeAlreadyLinkedInTree(data, element, findItem) {
    data.forEach(item => {
      if (item) {
        if (element.linkedFieldId == item.id) {
          return findItem = item;
        } else {
          findItem = this.isNodeAlreadyLinkedInTree(item.linkedFields, element, findItem);
        }
      }
    })
    return findItem;
  }

  createLinkedDataForEvent(response) {
    //response.sort(function (a, b) { if (a.id < b.id) { return -1 } else { return 1 } });
    this.eventDetailsField = [];
    response.forEach(element => {
      let findItem;
      findItem = this.isNodeAlreadyLinkedInTree(this.eventDetailsField, element, findItem);
      Object.assign(element, { linkedFields: [] });
      if (findItem) {
        findItem.linkedFields.push(element);
      } else {
        this.eventDetailsField.push(element);
      }
    });
  }

  getEvent() {
    let param = {
      eventId: this.id //this.data.eventId
    }
    this.storeService.getEvent(param).subscribe(response => {
      this.putData(response.response);
    });
  }

  putData(data) {
    this.editPreviousEvent = false;
    if (new Date(data.start) <= new Date()) {                    //to hide the action buttons from pop-up if event date is less than current date
      this.editPreviousEvent = true;
    }
    this.common.calenderEventObject = data;
    //this.common.placeOrderObj.eventDetails = data;
    this.eventDetailsField.forEach(element => {
      if (element.id < 0) {
        if (element.type == 'DATE_FIELD') {
          element.value = new Date(this.common.displayDate(data[element.dbPropertyName]));
        } else {
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
        })
      }
    });
  }

  addEvent() {
    if (!this.checkValid()) { // required Field validations Check
      //this.sharedService.openToast('e', AppMessage.U0122);
      return;
    }
    let obj = this.common.calenderEventObject;
    //let obj = this.common.placeOrderObj;
    // if (new Date(obj.eventDetails.start) > new Date(obj.eventDetails.end)) { // date validations
    if (new Date(obj.start) > new Date(obj.end)) { // date validations
      this.sharedService.openToast('e', AppMessage.U0071);
      return;
    }
    //these lines of code are not required anymore as per SSD-66 
    // if (!this.startDateValidation(new Date(obj.eventDetails.start))) {   //start date cannot be greater than 90 days from current date
    //   this.sharedService.openToast('e', AppMessage.U0084);
    //   return;
    // }

    obj.clientId = this.common.storeClientInfo.id;
    let request = this.storeService.addEvent(obj);
    // if (this.data.eventId > 0) {
    if (this.id > 0) {
      let param = {
        pathVariable: this.id //this.data.eventId
      }
      request = this.storeService.updateEvent(Object.assign(param, obj));

    }
    request.subscribe(response => {
      this.sharedService.onSuccess(response, this.id//this.data.eventId
        > 0 ? 'U0111' : 'U0105', (value) => {
          if (value) {
            //this.dialogRef.close(true);
            this.router.navigate(['/eventcalendar']);
          }
        });
    });
  }

  // startDateValidation(startDate) {
  //   let curr_date = new Date();
  //   var timeDiff = Math.abs(startDate.getTime() - curr_date.getTime());
  //   let dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
  //   if (dayDifference > 90) {
  //     return false;
  //   }
  //   else {
  //     return true;
  //   }
  // }

  checkValid() {
    let valid = true;
   // let data = this.common.placeOrderObj.eventDetails;
   let data = this.common.calenderEventObject;
    let fields = this.eventDetailsField;
    let customFieldData = data.customFieldValues.map(item => { return item.customFieldId });
    fields.some(element => {

      if (element.id < 0) {
        if (element.isRequired && !data[element.dbPropertyName]) {
          valid = false;
          element.touched = true;
          return valid;
        }
      } 
      //it is to check that if any custom field is required and not in data then valid false
      else if (element.isRequired && !customFieldData.includes(element.id) && element.type != "READ_ONLY") {
        valid = false;
        element.touched = true;
        return valid;
      }

    });
    return valid;
  }

  close() {
    // this.dialogRef.close();
    this.router.navigate(['/eventcalendar']);
  }

  //Its functionality is to open the browse product screen with the details of the event already set
  placeOrder() {
    localStorage.setItem('eventStartDate', this.common.calenderEventObject.start);
    localStorage.setItem('eventEndDate', this.common.calenderEventObject.end);
    localStorage.setItem('eventName', this.common.calenderEventObject.title);
    // localStorage.setItem('eventStartDate', this.common.placeOrderObj.eventDetails.start);
    // localStorage.setItem('eventEndDate', this.common.placeOrderObj.eventDetails.end);
    // localStorage.setItem('eventName', this.common.placeOrderObj.eventDetails.title);
    localStorage.setItem('eventId', this.id.toString());
    //this.putData(this.common.calenderEventObject);
    this.common.placeOrderObj.eventDetails = this.common.calenderEventObject;
    this.common.saveCartJson();
    this.router.navigate(["/order/placeorder"]);
  }

}
