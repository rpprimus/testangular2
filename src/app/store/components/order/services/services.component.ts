import { Component, OnInit, ElementRef } from '@angular/core';
import { Common } from '../../../utility/common';
import { Enum } from './../../../../../app/shared/config/enum.enum';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  constructor(public common: Common, private element: ElementRef) { }
  customFields: any = [];
  isServicePageChecked: boolean = true;
  data: any = {};
  Enum = Enum;
  ngOnInit() {
    // if (this.common.moduleStandardFields.length > 0) {
    //   this.setData();
    // } else {
    // Load data from cart JSON 
    this.common.getCartJson(() => {
      this.data = this.common.placeOrderObj;
     // this.common.loadModulesStandardField(() => {
        this.common.loadModulesCustomFields(() => {
          this.setData();
          this.getData();
        });
     // });
    });
    //}
  }

  setData() {
    let data = this.common.modulesCustomFields.serviceDetails;
    this.isServicePageChecked = data.isServicePageChecked;
    this.customFields = data.serviceTitle;
  }

  //This method is done for the smooth scrolling of the page to the particular section when click on left panel menu
  scroll(num) {
    let el = this.element.nativeElement.querySelector('#title' + num);
    el.scrollIntoView({ block: 'start', behavior: "smooth" });
  }

  getData() {
    for (let i = 0; i < this.customFields.length; i++) {
      this.customFields[i].fieldDetails.forEach(field => {
        this.common.getServiceSectionValue(field,this.data['serviceDetails']);
      });
      this.common.createLinkedData(this.customFields[i].fieldDetails,i,this.customFields);
    }
    // this.customFields.forEach(sTitle =>{
    //   sTitle.fieldDetails.forEach(field =>{
    //     this.getValue(field);
    //   });
    // });
  }

  /**
   * Used this method to display the entered values into form
   * @param field -  field object
   */
  getValue(field) {
    let data = this.data['serviceDetails'];
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

  // isNodeLinkedInTree(data, element, findItem) {
  //   data.forEach(item => {
  //     if (item) {
  //       if (element.linkedFieldId == item.id) {
  //         return findItem = item;
  //       } else {
  //         findItem = this.isNodeLinkedInTree(item.linkedFields, element, findItem);
  //       }
  //     }
  //   })
  //   return findItem;
  // }

  // createLinkedData(response,index) {
  //   //response.sort(function (a, b) { if (a.id < b.id) { return -1 } else { return 1 } });
  //   this.customFields[index].fieldDetails = [];
  //   response.forEach(element => {
  //     let findItem;
  //     findItem = this.isNodeLinkedInTree(this.customFields[index].fieldDetails, element, findItem);
  //     Object.assign(element, { linkedFields: [] });
  //     if (findItem) {
  //       findItem.linkedFields.push(element);
  //     } else {
  //       this.customFields[index].fieldDetails.push(element);
  //     }
  //   });
  // }
  
}
