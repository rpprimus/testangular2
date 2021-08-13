import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddSubCategoryDialogComponent } from './add-sub-category-dialog/add-sub-category-dialog.component';
import { AddInfoDisplayDialogComponent } from './add-info-display-dialog/add-info-display-dialog.component';
import { SharedModule } from '../../core/shared-module';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule 
  ],
  declarations: [
    AddCategoryComponent, 
    AddSubCategoryDialogComponent, 
    AddInfoDisplayDialogComponent    
  ],
  entryComponents: [AddSubCategoryDialogComponent,AddInfoDisplayDialogComponent],
})
export class CategoryModule { }
