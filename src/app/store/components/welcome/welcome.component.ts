import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  constructor(public dialogRef: MatDialogRef<WelcomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     }

}
