import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Common } from '../../utility/common';
import { LeftPanelCategoryService } from '../order/left-panel-category.service';
import { StoreCategoryInfoComponent } from '../store-category-info/store-category-info.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-store-categories',
  templateUrl: './store-categories.component.html',
  styleUrls: ['./store-categories.component.scss']
})
export class StoreCategoriesComponent implements OnInit {

  @Input() data: any;
  @Output() selectedCategoryId: EventEmitter<any> = new EventEmitter<any>();

  constructor(public common:Common,private dialog: MatDialog,public categoryService:LeftPanelCategoryService) { }

  ngOnInit() {
    //retain the product search text to see the whether to implement the expanded class css
    this.common.storeProductSearchText = localStorage.getItem('storeProductSearchText') ? localStorage.getItem('storeProductSearchText') : '';
    if(this.common.storeProductSearchText){
      this.common.isStoreProductSearched = true;
    }
  }

  /**
   * Clear the search on browse products when clicked on categories
   */
  clearProductSearch(){
    this.common.storeProductSearchText = '';
    localStorage.setItem('storeProductSearchText','');
    this.common.isStoreProductSearched = false;
  }

  selectCategory(category, $event) {
    this.openInfoPopUp(category);
    if (category.childrens.length == 0) {
      $event.stopPropagation();
      this.common.selectedCategory = category;
      this.common.selectedCategoryName = category.name;
      this.common.isSelectedCategoryChanged = false;  //to close the category popup in mobile 
      this.markSelection(category);
      category.expandedClass = true;
      this.expandParent(category);
       this.clearProductSearch();
      this.selectedCategoryId.emit(category.id);
    }
  }

  /** called for getting the value of selected category */
  changedCategoryId() {
    if (this.common.selectedCategory) {
      this.markSelection(this.common.selectedCategory);
      this.common.selectedCategory.expandedClass = true;
      this.expandParent(this.common.selectedCategory);
      this.common.selectedCategoryName = this.common.selectedCategory.name;
      this.common.isSelectedCategoryChanged = false;  //to close the category popup in mobile 
      this.selectedCategoryId.emit(this.common.selectedCategory.id);
    }
  }

  /**mark the selectedClass = true for the selected node and 
   * before that mark selectedclass = false to all other nodes*/
  markSelection(category) {
    this.categoryService.categoryData.forEach(x => {
      this.unselectCategory(x);
    });
    category.selectedClass = true;
  }

  /**mark the selected class = false and data.expandedClass = false for all the nodes */
  unselectCategory(data) {
    if (data) {
      data.expandedClass = false;
      if (data.childrens.length > 0) {
        data.childrens.forEach(category => {
          this.unselectCategory(category);
        });
      }
      else {
        data.selectedClass = false;
      }
    }
  }

/**mark the expandedClass = true for the selected nodes parent */
  expandParent(data){
    data.expandedClass = true;
    if(data && data.parents.length > 0){
      this.expandParent(data.parents[0]);
    }
  }


    openInfoPopUp(data){
      if(data.isInfoAvailable == 'true' && (data.title || data.description)){
        this.dialog.open(StoreCategoryInfoComponent, {
          data: data
        });
      }
    }

}
