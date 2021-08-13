import { Component, OnInit, ViewChild } from '@angular/core';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { SharedService } from '../../../shared/services/shared.service';
import { Util } from '../../../shared/services/util';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  @ViewChild('categoryForm') categoryForm;
  isFormValid: boolean = true;
  appMessage = AppMessage;
  category: any = {};

  constructor(private util: Util, private sharedService: SharedService,public categoryService: CategoryService) { this.util.currentPageLink = "category" }

  ngOnInit() {
    this.category = {
      id: 0,
      isActive: true,
      isInfoAvailable: false,
      sequenceNumber: 0,
      parentId: null    // if parent or root category is added the parent Id will be passed as null
    }
    this.categoryService.loadData();

  }

  close() {
    this.categoryForm.reset(); 
    this.isFormValid = true;
  }

  onKeyPress($event){
    //Enter button 
    if($event.keyCode == 13) {
        this.create();
    }
  }

  //create root category 
  create() {
    if (this.checkValid()) {
      let param: any = {
        pathVariable: localStorage.getItem('selectedClientId'),
      }
      this.category.name = this.category.name.trim();
      Object.assign(param, this.category);
      this.categoryService.saveCategories(param).subscribe(response => {
        this.sharedService.onSuccess(response, 'U0038', (value) => {
          if (value) {
            this.isFormValid = true;
            this.category.name = "";
            this.categoryService.loadData();
          }
        });
      }, error => { this.sharedService.onError(error) });
    }
  }

  checkValid() {
    let valid = this.categoryForm.valid; // form required
    if (!this.category.name.trim()) {
      valid = this.isFormValid = false;
    }
    return valid;
  }

}
