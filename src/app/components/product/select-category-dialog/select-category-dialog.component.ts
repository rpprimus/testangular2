import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from '../../category/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppMessage } from '../../../shared/config/app-message.enum';

@Component({
  selector: 'app-select-category-dialog',
  templateUrl: './select-category-dialog.component.html',
  styleUrls: ['./select-category-dialog.component.scss']
})
export class SelectCategoryDialogComponent implements OnInit {
  appMessage = AppMessage;
  checkedData: any = [];

  constructor(public categoryService: CategoryService,
    public dialogRef: MatDialogRef<SelectCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = []) { }

  /**if category is selected then firstly set the checked value of the record to true */
  ngOnInit() {
    this.markCategorySelection(this.categoryService.data);
  }

  markCategorySelection(allData) {
    allData.forEach(element => {
      if(this.data){
        (this.data.indexOf(element.id) > -1) ?  element.checked = true : element.checked = false;   //if user doesnot manually select the category then each category checked = false
      }
      else{
        element.checked = false;          //if user doesnot manually select the category then each category checked = false
      }
      if (element.childrens) {
        this.markCategorySelection(element.childrens);
      }
    });
  }


  getSelectedCat() {
    this.findCheckedRecord(this.categoryService.data);
  }

  close() {
    this.dialogRef.close();
  }

  findCheckedRecord(data) {
    data.forEach(element => {
      if (element.checked) {
        this.checkedData.push(element);
      }
      if (element.childrens) {
        this.findCheckedRecord(element.childrens);
      }

    });

    this.dialogRef.close(this.checkedData);
  }

}
