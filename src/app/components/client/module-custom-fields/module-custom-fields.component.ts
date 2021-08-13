import { Component, OnInit, Input } from '@angular/core';
import { Util } from '../../../shared/services/util';
import { ConditionalLinkComponent } from '../conditional-link/conditional-link.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-module-custom-fields',
  templateUrl: './module-custom-fields.component.html',
  styleUrls: ['./module-custom-fields.component.scss']
})
export class ModuleCustomFieldsComponent implements OnInit {

  constructor(private dialog: MatDialog,public util: Util) {
  }

  @Input('orderingType') orderingType: any;
  @Input('invalid') invalid: boolean = false;
  @Input('data') data: any = {};
  customefieldTypes = [
    { text: 'Check Box', value: 'CHECK_BOX' },
    { text: 'Date', value: 'CUSTOM_DATE' },
    { text: 'Drop down', value: 'DROP_DOWN' },
    { text: 'Email', value: 'EMAIL' },
    { text: 'Radio Button', value: 'RADIO_BUTTON' },
    { text: 'Read only', value: 'READ_ONLY' },
    { text: 'Text Area', value: 'TEXT_AREA' },
    { text: 'Text Box', value: 'TEXT_BOX' },
    { text: 'Upload', value: 'UPLOAD' }
  ];
  selectedRowIndex: number = -1;

  ngOnInit() {
  }


  getBaseCustomField() {
    let field = {
      description: '',
      fieldLength: 0,
      fieldSequence: 1,
      id: 0,
      isActive: true,
      isRequired: false,
      lookupValue: '',
      type: ''
    };
    return field;
  }

  onAddCustomField() {
    this.data.fieldDetails.push(this.getBaseCustomField());
    this.enableSubmitBtn();
  }

  onRemoveCustomField(index: number) {
    this.data.fieldDetails.splice(index, 1);
  }

  /**
   * 
   * @param rowId - selected row Id
   * @param item  - selectd row data object
   * added isClicked property with element to add or remove a class from that row
   */
  selectRow(rowId, item) {
    this.enableSubmitBtn();
    if(this.data.selectedRowIndex && this.data.selectedRowIndex == rowId){  //this is done such that ngOnchange updates the selectedrowindex value in drag drop component
      this.data.selectedRowIndex = 0;
      setTimeout(()=>{
        this.data.selectedRowIndex = rowId;
      },100);
    }else{
      this.data.selectedRowIndex = rowId;
    }
    this.data.fieldDetails.forEach(element => {
      element.isClicked = false;
    });
    item.isClicked = true;
  }

  enableSubmitBtn(){
    switch(this.data.orderingType){
      case 1 :this.util.isEventDirty = true;
       break;
      case 2 :this.util.isShipmentDirty = true; break;
      case 3 :this.util.isPickupDirty = true; break;
      case 4 :this.util.isAdditionalDirty = true; break;
      default :  this.util.isServiceDirty = true;
       break;
    }
  }

  //dialog box containing the field names and there respective lookup values for linking a conditional field
  linkCustomField(field,listData) {
    this.dialog.open(ConditionalLinkComponent, {
      data: {
        field: field,
        service: listData
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        //field.isLinked = true;
      }
    });
  }

  //Highlight the link icon based on whether linkedFieldId and value is stored
  checkIsLinked(field):boolean{
    if(field.linkedFieldId && field.linkedFieldValue){
      return true;
    }else 
    {
      return false;
    }
  }

}
