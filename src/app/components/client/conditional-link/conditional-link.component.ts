import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-conditional-link',
  templateUrl: './conditional-link.component.html',
  styleUrls: ['./conditional-link.component.scss']
})
export class ConditionalLinkComponent implements OnInit {
  fieldData: any = [];
  lookupListData:any = [];

  constructor(public dialogRef: MatDialogRef<ConditionalLinkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    //Need to only show the data which have lookup values such as dropdown, radio and checkbox
    this.fieldData = this.data["service"].filter(field => {
      if (field.id>0 && field.id != this.data.field.id && (field.type == 'DROP_DOWN' || field.type == 'RADIO_BUTTON')) {
        return field;
      }
    });
    if(this.data.field.linkedFieldId){
      this.onLinkSelection(this.data.field.linkedFieldId);
    }
  }

  //Set the listData of lookup values of the selected field id
  onLinkSelection(fieldId){
     this.fieldData.map( item =>{ 
      if(item.id == fieldId){
        this.lookupListData = item.lookupValue.split('~');
      }
    }); 
  }

  complete(){
    if(this.data.field.linkedFieldId && this.data.field.linkedFieldValue){
      this.dialogRef.close(true);
    }
  }

}
