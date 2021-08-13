import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-store-category-info',
  templateUrl: './store-category-info.component.html',
  styleUrls: ['./store-category-info.component.scss']
})
export class StoreCategoryInfoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<StoreCategoryInfoComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      data.autoFocus = true;
    }

  ngOnInit() {
  }

}
