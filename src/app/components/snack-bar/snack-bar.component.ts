import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent {

  constructor(
   @Inject(MAT_SNACK_BAR_DATA) public data: any) {
    // data.disableClose = true;       //if we want to restrict the dialog to close only on Close button
    data.autoFocus = true;
  }



}

