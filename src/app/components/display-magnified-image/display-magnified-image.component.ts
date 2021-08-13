import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-display-magnified-image',
  templateUrl: './display-magnified-image.component.html',
  styleUrls: ['./display-magnified-image.component.scss']
})
export class DisplayMagnifiedImageComponent implements OnInit {

  constructor(public _domSanitizationService: DomSanitizer,public dialogRef: MatDialogRef<DisplayMagnifiedImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    data.autoFocus = true;
  }

  ngOnInit() {
  }

}
