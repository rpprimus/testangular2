import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Common } from '../../../../store/utility/common';

@Component({
  selector: 'app-contact-email-popup',
  templateUrl: './contact-email-popup.component.html',
  styleUrls: ['./contact-email-popup.component.scss']
})
export class ContactEmailPopupComponent {
  accountManagerEmail: string = "";
  accountManagerName:string = "";
  accountManagerPhoneNumber:string = "";

  constructor(public dialogRef: MatDialogRef<ContactEmailPopupComponent>, private common: Common,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    // data.autoFocus = true;
    this.accountManagerEmail = this.common.storeClientInfo.accountManagerEmail;
    this.accountManagerName = this.common.storeClientInfo.accountManagerName;
    this.accountManagerPhoneNumber = this.common.storeClientInfo.accountManagerPhoneNumber;
  }
  
  close() {
    this.dialogRef.close();
  }
}
