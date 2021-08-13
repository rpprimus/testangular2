import { Component, Input } from '@angular/core';
import { AddSubCategoryDialogComponent } from '../add-sub-category-dialog/add-sub-category-dialog.component';
import { AddInfoDisplayDialogComponent } from '../add-info-display-dialog/add-info-display-dialog.component';
import { MatDialog } from '@angular/material';
import { SharedService } from '../../../shared/services/shared.service';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { CategoryService } from '../category.service';

/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss']
})
export class CategoryTreeComponent {
  @Input() data: any;
  @Input() displayActionButtons: boolean = false;
  @Input() level: number = 0;
}


@Component({
  selector: 'app-category-tree-action-btn',
  template:
    `  <app-category-drag-drop *ngIf="childData.showButton" [data]="childData">
    </app-category-drag-drop>
    <button id="link" [matMenuTriggerFor]="menu" mat-icon-button class="category_btn">
  <mat-icon class="right-menu-option" >more_vert</mat-icon>
  <mat-menu #menu="matMenu" [overlapTrigger]="false">
    <button mat-menu-item (click)="openSubCategoryDialog()">Add Sub Category</button>
    <button mat-menu-item *ngIf="!childData.isInfoAvailable" (click)="openInfoDialog()">Add Info Display</button>
    <button mat-menu-item *ngIf="childData.isInfoAvailable" (click)="getCategoryInfo()">Edit Info Display</button>
    <button mat-menu-item (click)="openSubCategoryDialog('edit')">Edit</button>
    <button mat-menu-item *ngIf="childData.isActive" (click)="changeStatus(0)">Mark Inactive</button>
    <button mat-menu-item *ngIf="!childData.isActive" (click)="changeStatus(1)">Mark Active</button>
    <mat-checkbox class="mat-menu-item"  *ngIf="childData.isDragDrop" [(ngModel)]="childData.showButton" (ngModelChange)="categoryService.disableOtherMoveButtons(childData)">
    Change Sequence</mat-checkbox>
  </mat-menu>
  </button>
`,
  styleUrls: ['./category-tree.component.scss']
})

export class CategoryTreeActionBtnComponent {
  @Input() childData: any;

  constructor(private sharedService: SharedService, public categoryService: CategoryService, public dialog: MatDialog) { }

  /**
   * isEdit: variable need to show whether it is for editing existing record or addign new record
   * value:optional -  contains 'edit' if editing existing record
  */
  openSubCategoryDialog(value?) {
    this.dialog.open(AddSubCategoryDialogComponent, {
      data: {
        content: value && this.childData.parentId == null ? "Category" : 'Sub-category',
        childData: this.childData,
        isEdit: value ? 'edit' : null
      }
    });
  }

  /**
  * isEdit: variable need to show whether it is for editing existing record or addign new record
  * value:optional -  contains 'edit' if editing existing record
 */
  openInfoDialog(value?) {
    this.dialog.open(AddInfoDisplayDialogComponent, {
      data: {
        content: "Info Display",
        id: this.childData.id,
        childData: this.childData,
        title: value ? value.title : null,
        description: value ? value.description : null,
        isEdit: value ? 'edit' : null
      }
    });
  }

  /**
  * called to change the status of the category from the list
  * @param status status of category : true-mark as active and false:mark as inactive
  */
  changeStatus(status) {
    let param = {
      pathVariable: localStorage.getItem('selectedClientId'),
      status: status,
      categoryId: this.childData.id
    }

    let message: string = '';                                           // status= 0 - inactive; status = 1 - active
    let parentId = this.childData.parentId;
    if (parentId) {                                                   //parent id not null then show message for sub-category
      message = status == 0 ? AppMessage['U0047'] : AppMessage['U0048'];
    }
    else {
      message = status == 0 ? AppMessage['U0043'] : AppMessage['U0044'];
    }
    this.sharedService.confirmBox(message, (result) => { //show a confirm dialog box before status change
      if (result) {
        this.categoryService.changeStatus(param).subscribe(response => {
          this.sharedService.onSuccess(response, null, () => {
            this.sharedService.openToast('s', response.responseDescription);
            this.categoryService.loadData();
          });
        });
      }
    });
  }

  /** get the info of category title and description and populate it in info dialog box */
  getCategoryInfo() {
    let param = {
      clientId: localStorage.getItem('selectedClientId'),
      categoryId: this.childData.id,
    }
    this.categoryService.getCategoriesInfo(param).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        if (response.response) {
          this.openInfoDialog(response.response);
        }
      });
    });
  }

}