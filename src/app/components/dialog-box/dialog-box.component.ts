import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Util } from '../../shared/services/util';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {

  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>, public util:Util,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    // data.disableClose = true;       //if we want to restrict the dialog to close only on Close button
    data.autoFocus = true;
  }

  close() {
    this.dialogRef.close();
  }
  
  confirm() {
    this.dialogRef.close(true);
  }


}

