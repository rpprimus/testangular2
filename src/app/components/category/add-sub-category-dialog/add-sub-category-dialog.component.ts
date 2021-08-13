import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { AppMessage } from '../../../shared/config/app-message.enum';
import { SharedService } from '../../../shared/services/shared.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-add-sub-category-dialog',
  templateUrl: './add-sub-category-dialog.component.html',
  styleUrls: ['./add-sub-category-dialog.component.scss']
})
export class AddSubCategoryDialogComponent implements OnInit {
  @ViewChild('subCategoryForm') subCategoryForm;
  isFormValid: boolean = true;
  appMessage = AppMessage;
  category: any = {};

  constructor(private categoryService: CategoryService, private sharedService: SharedService, 
    public dialogRef: MatDialogRef<AddSubCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    data.autoFocus = true;
  }

  ngOnInit() {
    /**
     * assign the values in category as per data
     * isEdit == null means add category or add new sub-category
     * if isEdit != null means we have to edit category or subcategory
     */
    let cData = this.data.childData;
    let isEdit = this.data.isEdit;
    this.category = {
      id: isEdit == null ? 0 : cData.id,      //in case of new record id=0 and in case of edit id = item id
      name: isEdit == null ? '' : cData.name,
      isActive: isEdit == null ? true : cData.isActive,  //in case of new record isActive is true
      isInfoAvailable: isEdit == null ? false : cData.isInfoAvailable,
      sequenceNumber: isEdit == null ? 0 : cData.sequenceNumber,
      parentId: isEdit == null ? cData.id : cData.parentId   //in case of new record parentid = id of item and in case of edit parentid = id of its parent item
    }
  }

  close() {
    this.dialogRef.close();
  }

  onKeyPressEnter($event){
    //Enter button 
    if($event.keyCode == 13) {
        this.create();
    }
  }

  create() {
    if (this.checkValid()) {
      let param: any = {
        pathVariable: localStorage.getItem('selectedClientId')
      }
      Object.assign(param, this.category);
      this.categoryService.saveCategories(param).subscribe(response => {
        this.sharedService.onSuccess(response, this.category.parentId == null ? 'U0038' : 'U0042', (value) => {
          if (value) {
            this.dialogRef.close();
            this.categoryService.loadData();
          }
        });
      }, error => { this.sharedService.onError(error) });
    }
  }

  checkValid() {
    let valid = this.subCategoryForm.valid;   //form validation
    if (!this.category.name) {
      valid = this.isFormValid = false;
    }
    return valid;
  }

}
