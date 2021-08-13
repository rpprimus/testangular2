import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Common } from '../../utility/common';
import { Util } from '../../../shared/services/util';
import { Enum } from '../../../shared/config/enum.enum';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { AppConstant } from '../../../shared/config/app-constant';
import { AppUrl } from './../../../../app/shared/config/app-url.enum';
import { HttpClientService } from './../../../../app/shared/services/http-client.service';
import { SharedService } from './../../../../app/shared/services/shared.service';

@Component({
  selector: 'app-dynamic-input-field',
  templateUrl: './dynamic-input-field.component.html',
  styleUrls: ['./dynamic-input-field.component.scss']
})
export class DynamicInputFieldComponent implements OnInit {

  @Input() field: any = {};
  @Input() obj: any = {};
  @Input() type: any = "";
  orderType: number = 0; // for event detail
  appMessage = AppMessage;
  appConstant = AppConstant;
  file: any;
  @ViewChild('uploadFile') uploadFile:ElementRef;
  constructor(public common: Common, private util: Util, private elementRef: ElementRef, private http: HttpClientService, private sharedService: SharedService, ) { }

  ngOnInit() {
    if (this.obj == "shipmentDetails") {
      this.orderType = 1;
    }
    if (this.obj == "pickupDetails") {
      this.orderType = 2;
    }
    setTimeout(() => {
      //if(this.obj == "eventDetails"){   //this code is to get the values of state according to the state id 
      if (this.field.type == 'REMOTE_DROP_DOWN') {
        if (this.field.dbPropertyName == "countryId") {
          this.onFieldValueChange('', this.field);
        }
      }
      //}
    }, 1500);

    //field value contains ^^^ at the time data comes frim backend which needs to be processed at the time of Dom render
    setTimeout(() => {
    if (this.field.type == 'UPLOAD') {
      if (this.field.value) {
        let val=this.field.value.split('^^^');
        this.file = { fileName: val[0], filePath: val[1]};              
      }
    }
  }, 10);
  }


  /**
   * 
   * @param $event 
   * @param field 
   * @param value - it is for checkbox only
   */
  onFieldValueChange($event, field, value?) {
    if ($event) {
      this.util.disableSaveBtnOnOrder = false;
    }
    let jsonObj = this.type == Enum.Manage_Order ? this.common.manageOrderObject[this.obj] : !this.type ? this.common.placeOrderObj[this.obj] : this.common.calenderEventObject;
    if (field.id < 0) {

      // If childFieldId property exist means we have to load child data based on selected value of current drop-down
      // dataLoadAPI : dynamic API name
      if (field.childFieldId) {
        this.loadChildDropdownData(field);
      }
      if (field.type == 'DATE_FIELD') {
        jsonObj[field.dbPropertyName] = this.util.formatDate(field.value);
      }
      else {
        if (field.type == 'REMOTE_DROP_DOWN') {
          jsonObj[field.dbPropertyName] = field.value || ($event && $event.target.value);
          if ($event) {
            setTimeout(() => {
              let el = $event.source._elementRef.nativeElement;
              if (el) {
                jsonObj[field.dbPropertyName + 'Value'] = el.innerText;
                if (field.dbPropertyName == "stateId") {
                  jsonObj.stateName = el.innerText;
                }
                else if (field.dbPropertyName == "countryId") {
                  jsonObj.countryName = el.innerText;
                }
                if (!this.type) {
                  this.common.saveCartJson()
                };
              }
            }, 100);
          }
        } else {
          jsonObj[field.dbPropertyName] = field.value || $event.target.value;
        }
      }
    } else {
      this.setPlaceOrderObj(jsonObj, field, $event, value);
    }
    if (!this.type) {
      this.common.saveCartJson();
    };
  }

  setPlaceOrderObj(jsonObj, field, $event, value) {
    this.setDisplayLinkedField(field);
    if (field.type == 'CHECK_BOX') {
      if ($event.checked) {
        if (field.value && field.value[field.value.length - 1] == "~") {
          field.value = field.value + value + '~'; // append values if checkbox is checked
        } else if (field.value && field.value[field.value.length - 1] != "~") {
          field.value = field.value + '~' + value + '~'; // append values if checkbox is checked
        } else {
          field.value = value + '~'; // append values if checkbox is checked
        }

      } else {
        if (field.value.includes(value + '~')) {
          field.value = field.value.replace(value + '~', ''); // remove value if we uncheck checkbox
        } else {
          field.value = field.value.replace(value, ''); // remove value if we uncheck checkbox
        }
      }
    }
    if (field.type == 'UPLOAD') {
      let file = $event.target.files && $event.target.files[0] ? $event.target.files[0] : '';
      if (!this.util.checkExtension(file.name, file.type)) {
         this.uploadFile.nativeElement.value = ''; // input tag has the selected file in its native element, even if the file is not upLoaded,hence we had to empty the nativeElement's value
         this.sharedService.openToast('e', AppMessage.U0147);
      } else if (!this.util.checkSizeValidation(file,false)) {
          this.uploadFile.nativeElement.value = '';// input tag has the selected file in its native element, even if the file is not upLoaded,hence we had to empty the nativeElement's value
          this.sharedService.openToast('e', AppMessage.U0150);
      } else {
        this.onUpload($event.target.files[0], field, $event, jsonObj);
      }
    } else {
      this.pushCustomValuesIntoPlaceOrderObj(jsonObj, field, $event);
    }

  }

  // find exist item from main Json object , If find then update value into that else create new customField object
  pushCustomValuesIntoPlaceOrderObj(jsonObj, field, $event) {
    let existItem = jsonObj.customFieldValues.find((item) => { if (item.customFieldId == field.id) return item });
    if (existItem) {
      if (field.type == 'CUSTOM_DATE') {
        existItem.customFieldValue = this.util.formatDate(field.value);
      } else {
        existItem.customFieldValue = field.value || ($event.target && $event.target.value) || "";
      }
      existItem.isDisplayed = field.isDisplayed;
      if (existItem.customFieldValue[existItem.customFieldValue.length - 1] == "~") { // remove last ~ if contains
        //if (existItem.customFieldValue.includes("~")) { // remove last ~ if contains
        existItem.customFieldValue = existItem.customFieldValue.substring(0, existItem.customFieldValue.length - 1);
      }
    } else {

      let obj = {
        customFieldId: field.id,
        customFieldValue: field.value || $event && $event.target.value || '',
        isDisplayed: field.isDisplayed
      }
      if (field.type == 'CUSTOM_DATE') {
        obj.customFieldValue = this.util.formatDate(field.value);
      }

      if (obj.customFieldValue.includes("~")) { // remove last ~ if contains : this is for checkbox field
        obj.customFieldValue = obj.customFieldValue.substring(0, obj.customFieldValue.length - 1);
      }
      jsonObj.customFieldValues.push(obj);
    }
    if (field.linkedFields.length > 0) {
      let linkedChild = field.linkedFields.find(item => item.linkedFieldValue == field.value);
      if (linkedChild) {
        linkedChild.value = linkedChild.value ? linkedChild.value : '';  //initially set the value of linkedField as empty because user has not yet set its value
        this.removeLinkedFields(field, jsonObj);
        this.pushCustomValuesIntoPlaceOrderObj(jsonObj, linkedChild, '')  //push the linked child of selected field in placeorder json to show it on review order page
      } else {
        //if value of selected field is changed but its linked child is in placeorder json then remove that child fields from json
        this.removeLinkedFields(field, jsonObj);
      }
    }
  }

  removeLinkedFields(field, jsonObj) {
    field.linkedFields.forEach(item => {
      let existingField = jsonObj.customFieldValues.find(x => x.customFieldId == item.id);
      if (existingField && !item.isDisplayed) {
        jsonObj.customFieldValues.splice(jsonObj.customFieldValues.indexOf(existingField), 1);
        if (item.linkedFields.length > 0) {
          this.removeLinkedFields(item, jsonObj);
        }
      }
    });
  }

  loadChildDropdownData(field) {
    let fields = this.common.moduleStandardFields[this.orderType].fieldDetails;
    let childField;
    fields.some((item) => { if (item.id == field.childFieldId) return childField = item; });
    //childField.value = 0;
    this.common[childField.dataLoadAPI](field.value, (data) => {
      childField.remoteData = data; // bind data into remoteData property
    });
  }

  //Set the isDisplayed of clicked field and its associated linked field as true to display it on review order page
  setDisplayLinkedField(field) {
    field.isDisplayed = true;
    if (field.linkedFields.length > 0) {
      field.linkedFields.forEach(item => {
        item.isDisplayed = item.linkedFieldValue == field.value ? true : false;
      })
    }
  }

  //it checks for whether the selected value of checkbox exists in the field
  isCheckboxSelected(field, value): boolean {
    let val = false;
    if (field.value) {
      let fieldValueArray = field.value.split('~');
      val = fieldValueArray.indexOf(value) > -1 ? true : false;
    }
    return val;
  }
  // find element
  _f(id: string): any {
    return this.elementRef.nativeElement.querySelector('#' + id);
  }

  browseFileClick(inputField) {
    let input_File = this._f(inputField);
    input_File.click();
  }


  onUpload(file, field, $event, jsonObj) {
    const uploadData = new FormData();
    uploadData.append('file', file);
    this.http.upload(AppUrl.onDemandGraphic, uploadData).subscribe(
      response => {
        this.sharedService.onSuccess(response, 'U0062',
          (value) => {
            if (value) {
              this.file = { fileName: response.response.fileName, filePath: response.response.filePath };
              field.value = response.response.fileName+'^^^'+response.response.filePath;
              this.pushCustomValuesIntoPlaceOrderObj(jsonObj, field, $event);
              this.common.saveCartJson(); //so that the cart is upadted when any image is uploaded
            }
          });
      }, error => this.sharedService.onError(error));
  }

/**
 * 
 * @param field contains the value which needs to be deleted
 * deleteFile() delete the particular uploaded resource in the custom input field
 */
  deleteFile(field) {
    let jsonObj = this.type == Enum.Manage_Order ? this.common.manageOrderObject[this.obj] : !this.type ? this.common.placeOrderObj[this.obj] : this.common.calenderEventObject;
    if(jsonObj){
    let existItem = jsonObj.customFieldValues.find((item) => { if (item.customFieldId == field.id) return item });
    if(existItem){
      let index = jsonObj.customFieldValues.findIndex(x => JSON.stringify(x) == JSON.stringify(existItem));
     // jsonObj.customFieldValues.splice(index,1);
     jsonObj.customFieldValues[index].customFieldValue = "";
      this.file = undefined;
      this.common.saveCartJson();
    }
  }}
  
}
