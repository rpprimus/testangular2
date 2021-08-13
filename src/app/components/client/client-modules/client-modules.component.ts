import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientService } from '../client.service';
import { SharedService } from '../../../shared/services/shared.service';
import { Util } from '../../../shared/services/util';
import { Enum } from '../../../shared/config/enum.enum';
import { AppMessage } from '../../../shared/config/app-message.enum';

@Component({
  selector: 'app-client-modules',
  templateUrl: './client-modules.component.html',
  styleUrls: ['./client-modules.component.scss']
})
export class ClientModulesComponent implements OnInit {

  servicePageData: any = {};
  servicePageCustomFieldData: any = {}; // as service page have service title data also so created a seperated varaible for field data
  eventDetailData: any = {};
  shipmentDetailsData: any = {};
  pickupDetailsData: any = {};
  additionalInfoDetailsData: any = {};
  moduleEventData: any = {};
  signUpModuleData: any = {};
  selectedServiceTitleIndex: number = 0;
  inValid: boolean = false;
  appMessage = AppMessage;
  isValid: boolean = true;
  isSignUpChanged: boolean = false;
  isEventChanged: boolean = false;
  constructor(private http: HttpClient, private clientService: ClientService,
    private sharedService: SharedService, public util: Util) {

  }


  ngOnInit() {
    this.loadStandardCustomField();
    this.servicePageData.serviceTitle = [];
    this.servicePageData.isServicePageChecked = true;
    if (this.util.clientId > 0) {
      this.getData();
    }
    //This is done only for the time of creating new client such that getData is called
    this.util.isClientCreated.subscribe(response => {
      if (this.util.clientId > 0) {
        this.getData();
      }
    });
  }

  // Load standard field static Data (saved Locally at UI level)
  loadStandardCustomField() {
    this.http.get('./assets/module-standard-fields.json').subscribe((response: any) => {
      this.util.moduleStandardFields = response.modulesData;
    });
  }

  /**
   * @param isOrderingTypeExist :optional - contains the value of section which call for data change -- load only sectionwise data after save
   */
  getData(isOrderingTypeExist?) {
    let param = {
      pathVariable: this.util.clientId
    }
    this.clientService.getClientModuleSetting(param).subscribe(response => {
      this.onGetRequestSuccess(response.response.modulesData, isOrderingTypeExist);
    });
  }

  /**
  * @param val contains the value of section - 
  *  1= event details, 2= shipment details, 3= pickup details, 4= addtional info,5= service page, 6= event, 7= sign up, undefined = all
  */
  onGetRequestSuccess(data, val) {
    switch (val) {

      case Enum.Module_EventDetails: this.eventDetailData = data.eventDetails;
        this.util.isEventDirty = false;
        break;
      case Enum.Module_ShipmentDetails: this.shipmentDetailsData = data.shipmentDetails;
        this.util.isShipmentDirty = false;
        break;
      case Enum.Module_PickupDetails: this.pickupDetailsData = data.pickupDetails;
        this.util.isPickupDirty = false;
        break;
      case Enum.Module_AdditionalDetail: this.additionalInfoDetailsData = data.additionalInfoDetails;
        this.util.isAdditionalDirty = false;
        break;
      case Enum.Module_Event: this.moduleEventData = data.eventModuleDetails;
        break;
      case Enum.Module_SignUp: this.signUpModuleData = data.signUpModuleDetails;
        break;
      case Enum.Module_ServicePage:
        if (data.serviceDetails) {
          this.servicePageData = data.serviceDetails;
          if (this.servicePageData && this.servicePageData.serviceTitle.length == 0) {
            this.onAddServiceTitle()
          }
        }
        this.sortServiceTitle();
        this.onServiceTitleClick(this.selectedServiceTitleIndex, this.servicePageData.serviceTitle[this.selectedServiceTitleIndex]);
        break;
      default: this.loadAllData(data);
        this.sortServiceTitle();
        this.onServiceTitleClick(this.selectedServiceTitleIndex, this.servicePageData.serviceTitle[this.selectedServiceTitleIndex]);
        break;
    }
  }

  loadAllData(data: any) {
    if (data.serviceDetails) {
      this.servicePageData = data.serviceDetails;
      if (this.servicePageData && this.servicePageData.serviceTitle.length == 0) {
        this.onAddServiceTitle();
      }
    }
    this.servicePageCustomFieldData = this.servicePageData.serviceTitle[this.selectedServiceTitleIndex];
    this.eventDetailData = data.eventDetails;
    this.shipmentDetailsData = data.shipmentDetails;
    this.pickupDetailsData = data.pickupDetails;
    this.additionalInfoDetailsData = data.additionalInfoDetails;
    this.moduleEventData = data.eventModuleDetails;
    this.signUpModuleData = data.signUpModuleDetails;
  }

  getBaseObjServiceTitle() {
    let obj = {
      isActive: true,
      serviceTitleName: '',
      serviceTitleSequence: 1,
      id: 0,
      fieldDetails: []
    }
    return obj;
  }

  onAddServiceTitle() {
    this.util.isServiceDirty = this.servicePageData.serviceTitle.length > 0 ? true : false;
    this.servicePageData.serviceTitle.push(this.getBaseObjServiceTitle());
  }

  onRemoveServiceTitle(i: number) {
    this.servicePageData.serviceTitle.splice(i, 1);
  }

  sortServiceTitle(){
   this.servicePageData.serviceTitle = this.servicePageData.serviceTitle.sort(function(a, b) {
    return b.isActive - a.isActive 
  });
  }


  onServiceTitleClick(index: number, item) {
    this.servicePageCustomFieldData = this.servicePageData.serviceTitle[index]; // update data into 'servicePageCustomFieldData' object so that it refect on right side section
    this.selectedServiceTitleIndex = index;
    // added a extra property isClicked to add a dynamic class on items
    this.servicePageData.serviceTitle.forEach(element => {
      element.isClicked = false;
    });
    item.isClicked = true;
    this.selectRow(index,item);
  }

  onSaveServicePage() {
    if (!this.checkValid()) {
      return;
    }
    let param = {
      pathVariable: this.util.clientId
    }
    this.servicePageData.serviceTitle = this.removeBlankObject();
    this.manageServiceTitleSequence(this.servicePageData.serviceTitle);   //manage the sequence of service title
    this.servicePageData.serviceTitle.forEach(element => {
      this.managefieldSequence(element.fieldDetails);
    });
    Object.assign(param, this.servicePageData);
    this.clientService.putModuleServicePage(param).subscribe(response => {
      this.sharedService.onSuccess(response, 'U0024', () => {
        this.selectedServiceTitleIndex = 0;   //to open the first service detail on the list
        this.getData(Enum.Module_ServicePage);
        this.util.isServiceDirty = false;
      });
    });
  }

  //param:isPickup = true only if, pickup is enabled/disabled from event module slider toggle
  onSaveOrderingDetail(data: any) {
    if (!this.checkCustomFieldValid(data)) {
      return;
    }
    let param = {
      pathVariable: this.util.clientId
    }
    this.managefieldSequence(data.fieldDetails);
    Object.assign(param, data);
    this.clientService.putOrderingDetail(param).subscribe(response => {
      this.sharedService.onSuccess(response, 'U0024', () => {
        this.getData(data.orderingType);
      });
    });
  }

  /**
  * update the service title sequence
  * @param data service title data
  */
 manageServiceTitleSequence(data: any) {
    let serviceTitleSequence = 1;
    data.forEach(x => {
      if(x.isActive){
        x.serviceTitleSequence = serviceTitleSequence;
        serviceTitleSequence++;
      }else{
        x.serviceTitleSequence = 0 ;
      }
    });
  }

    /**
  * update the field sequence of each item in module particular section
  * @param data list data of each module section which is saved
  */
 managefieldSequence(data: any) {
  let fieldSequence = 1;
  data.forEach(x => {
    x.fieldSequence = fieldSequence;
    fieldSequence++;
  });
}

  removeBlankObject() {
    return this.servicePageData.serviceTitle.filter((item) => {
      if (item.serviceTitleName != "") {
        return item;
      }
    });
  }

  checkValid() {
    let valid = true;
    this.servicePageData.serviceTitle.some(element => {
      let fields = element.fieldDetails;
      if (fields.length > 0 && !element.serviceTitleName) {
        this.servicePageData.formInvalid = true;
        return valid = false;
      }
      else if (fields.length > 0) {
        fields.some((element) => {
          if (!element.description || !element.type) {
            this.servicePageData.formInvalid = true;
            return valid = false;
          }
        })
      }
    });
    return valid;
  }

  /**
   * Check custom field Valid or not for ordering tab instead of service page section
   * @param data - section data
   */
  checkCustomFieldValid(data: any) {
    let valid = true;
    data.fieldDetails.some((element) => {
      if (!element.description || !element.type) {
        data.formInvalid = true;
        return valid = false;
      }
    })

    return valid;
  }

  onSaveEventData(fromSliderToggle) {
    let param = {
      pathVariable: this.util.clientId
    }
    Object.assign(param, this.moduleEventData);
    let message = fromSliderToggle ? null : 'U0024';
    this.clientService.putEventDetail(param).subscribe(response => {
      this.sharedService.onSuccess(response, message, () => {
        this.getData(Enum.Module_Event);
        this.isEventChanged = false;
      });
    });
  }

  onSaveSignUpModule() {
    let domain = this.signUpModuleData.signUpEmailDomain;
    domain = domain ? domain.trim() : null; // Trim domain value
    if (this.signUpModuleData.isSignUpEnabled && !domain) { // if isSignUpEnabled checked then domain is required.
      this.signUpModuleData.signUpEmailDomain = domain;
      this.isValid = false;
    }
    else {
      let param = {
        pathVariable: this.util.clientId
      }
      this.signUpModuleData.signUpEmailDomain = domain;
      Object.assign(param, this.signUpModuleData);
      this.clientService.putSignUpDetail(param).subscribe(response => {
        this.sharedService.onSuccess(response, 'U0024', () => {
          this.getData(Enum.Module_SignUp);
          this.isValid = true;
          this.isSignUpChanged = false;
        });
      });
    }
  }

  onChangeSignUp(value) {
    this.isValid = value;
    this.isSignUpChanged = true;
    if (!this.signUpModuleData.isSignUpEnabled){
      this.sharedService.confirmBox(AppMessage.U0033, (result) => {
        if(result){
          this.onSaveSignUpModule();
        }else{
          this.signUpModuleData.isSignUpEnabled = true;  //return slider checked to its original
        }
      
      });
    }else{
      this.onSaveSignUpModule();
    }
  }

  onOrderingSectionCheckboxChange(isEventToggled, $event, data?) {
    if (isEventToggled) {    //This section is entirely for the event module slider check and uncheck
      if (data.isChecked) {    //If slider checked > save the module and ordering data
        this.saveChanges(data);
        //this.saveChanges(this.pickupDetailsData, true); //save the pickup details data
        this.onSaveEventData(true);
      } else {                      //If slider unchecked > open the confirmation box
        this.sharedService.confirmBox(AppMessage.U0033, (result) => {
          if (result) {              //If clicked Yes > save the module and ordering data
            this.saveChanges(data);
            //this.saveChanges(this.pickupDetailsData, true); //save the pickup details data
            this.onSaveEventData(true);
          } else {                      //If clicked No > again mark checked to that box
            this.performUncheck(result, data);
            //this.performUncheck(result, this.pickupDetailsData);
          }
        });
      }
    } else {       //This section is for the other ordering modules
      if (!$event.checked) {
        this.sharedService.confirmBox(AppMessage.U0033, (result) => {
          this.performUncheck(result, data);
        });
      } else {
        this.saveChanges(data);
      }
    }
  }

  saveChanges(data) {
    if (data) {
      this.onSaveOrderingDetail(data);
    } else {
      this.onSaveServicePage();
    }
  }

  /**
   * 
   * @param result - yes or no 
   * @param data - which you have to save : If data is blank it means we have to save sevice page else we have to save that particular section.
   * In case User select No option > again mark checked to that box
   */
  performUncheck(result, data) {
    if (result) {
      this.saveChanges(data);
    } else {
      if (!data) {
        this.servicePageData.isServicePageChecked = true;
      }
      else {
        data.checked = true;
        data.isChecked = true;
        if (data.orderingType == 1) {  //if event type then toggle the slider of event module to true
          this.moduleEventData.isEventEnabled = true;
        }
      }
    }

  }

  /**The slider toggle to event is linked with Ordering event section
   * If toggled checked, enabled event and save data,
   * If toggled unchecked, show confimation box and save data according to result
  */
  checkEventSection($event) {
    this.eventDetailData.isChecked = this.moduleEventData.isEventEnabled ? true : false;
    this.onOrderingSectionCheckboxChange(true, $event, this.eventDetailData);
  }

  enableSubmit(item) {
    this.util.isServiceDirty = true;
    item.isActive = !item.isActive;
    if(!item.isActive){
      item.serviceTitleSequence = 0;
    }
  }

   /**
   * 
   * @param rowId - selected row Id
   * @param item  - selectd row data object
   * added isClicked property with element to add or remove a class from that row
   */
  selectRow(rowId, item) {
    if(item.isActive){
      if(this.servicePageData.selectedRowIndex && this.servicePageData.selectedRowIndex == rowId){  //this is done such that ngOnchange updates the selectedrowindex value in drag drop component
        this.servicePageData.selectedRowIndex = 0;
        setTimeout(()=>{
          this.servicePageData.selectedRowIndex = rowId;
        },100);
      }else{
        this.servicePageData.selectedRowIndex = rowId;
      }
      item.isClicked = true;
     // this.util.isServiceDirty = true;
    }else{
      this.servicePageData.selectedRowIndex = null;
    }
  }

}
