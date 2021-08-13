import { Component, OnInit, ViewChild } from '@angular/core';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { AppConstant } from '../../../shared/config/app-constant';
import { ActivatedRoute, Router } from '@angular/router';
import { KitService } from '../kit.service';
import { SharedService } from '../../../shared/services/shared.service';
import { Util } from '../../../shared/services/util';
import { CategoryService } from '../../category/category.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { SelectCategoryDialogComponent } from '../../product/select-category-dialog/select-category-dialog.component';
import { forkJoin } from 'rxjs';
import { KitAssociatedProductComponent } from '../kit-associated-product/kit-associated-product.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Enum } from './../../../shared/config/enum.enum';

@Component({
  selector: 'app-add-kit',
  templateUrl: './add-kit.component.html',
  styleUrls: ['./add-kit.component.scss']
})
export class AddKitComponent implements OnInit {

  defaultImageSrc: string = "./assets/images/frame-landscape-placeholder.svg";
  @ViewChild('addkitForm') addkitForm;
  appMessage = AppMessage;
  appConstant = AppConstant;
  isFormValid: boolean = true;
  selectedCategories: any = [];
  selectedCategoriesName: string = "";
  id: number = 0;
  data: any = {};
  visibilityGroup = {
    arrayValue: [],
    placeholder: "Visibility Group"   //have to pass the placeholder value to chip component
  };
  isVisibility: boolean = false;  //to check whether visibility for client is enabled
  selectedGroup = [];
  isReset: boolean = false;
  isFormSubmitted: boolean = false;  //if form is submitted once then no action to perform on save button
  selectedProductList: any = new MatTableDataSource();
  displayedColumns: string[] = ['productImg', 'productId', 'productName', 'categories', 'quantity', 'link'];
  descriptionError: string = '';
  isWorkshopTeam: boolean = false;
  enum = Enum;
  isApproveBtnVisible: boolean = false;

  constructor(private _activatedRoute: ActivatedRoute, private kitService: KitService, private router: Router,
    private sharedService: SharedService, public util: Util, public categoryService: CategoryService, private dialog: MatDialog, public _domSanitizationService: DomSanitizer) {
    this.util.currentPageLink = 'product';
  }

  ngOnInit() {
    // if (!!window.performance && window.performance.navigation.type == 2) {   //this is done such that data is fetched from server in case of browser back button
    //   this.initializeData();
    // } else {
    //   this.initializeData();
    // }
    this.initializeData();
    let users = JSON.parse(localStorage.getItem('user'));
    //check that if the logged in user has 2 role(one will be store admin which is added by default) and that role is workshop team such that they cannot edit the status of the product
    if (users && users.roles.length == 2 && users.roles[0] == Enum.TEAM) {
        this.isApproveBtnVisible = true;
    }
  }

  initializeData() {
    this.categoryService.loadData();
    this.getSettings();
    this.id = this._activatedRoute.snapshot.params['id'] ? this._activatedRoute.snapshot.params['id'] : 0;
    this.data = {
      kitDescription: "",
      kitCategory: [],
      clientId: localStorage.getItem('selectedClientId'),
      id: 0,
      kitId: "",
      kitName: "",
      kitResouces: [],
      kitVisibilityGroup: [],
      isApprove: false,
      kitProduct: [
        {
          id: 0,
          productId: 0,
          quantity: 0
        }
      ]
    }
    if (this.id > 0) {
      this.getKitData();
    }
    else {
      this.getDefaultProduct();
    }
  }

  getKitData() {
    let param = {
      kitId: this.id
    }
    this.kitService.getKit(param).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        if (response.response) {
          this.data = response.response;
          this.getVisibilitySelectedGroup();
          this.selectedCategoriesName = '';
          this.setCategoriesText(this.categoryService.data);
          this.selectedCategoriesName = this.selectedCategoriesName.substring(0, this.selectedCategoriesName.length - 2);
          this.selectedProductList.data = this.data.kitProduct;  //push the product values in this mat table variable
          if (this.selectedProductList.data.length > 0) {
            this.getImages();
          }
          this.disableKitFormForTeam();
        }
      });
    }, error => { this.sharedService.onError(error) });
  }

  getDefaultProduct() {
    if (this.selectedProductList.data.length == 0) {
      let data = this.selectedProductList.data;
      data.push({ productImg: this.defaultImageSrc, productId: 0, productName: '', categories: '', quantity: '' });
      this.selectedProductList.data = data;
    }
  }

  openCategoryDialog() {
    if(!this.isWorkshopTeam){   //open dialog only when not workshop team member
      this.dialog.open(SelectCategoryDialogComponent, {
        data: this.data.kitCategory.length > 0 ? this.data.kitCategory : null   //have to define the null in tertiary operator otherwise sonar qube gives error
      }).afterClosed().subscribe(result => {
        if (result) {
          this.addkitForm.form.markAsDirty(); //mark the form as dirty and enable the submit btn
          this.selectedCategoriesName = "";
          this.selectedCategories = result;
          this.addkitCategory(result);
          result.forEach(element => {
            this.selectedCategoriesName += element.name + ", ";
          });
          this.selectedCategoriesName = this.selectedCategoriesName.substring(0, this.selectedCategoriesName.length - 2);
        }
      });
    }
  }

  /**Push the value of selected category in kitCategory json */
  addkitCategory(data: any) {
    this.data.kitCategory = [];
    if (data != '') {
      data.forEach(x => {
        this.data.kitCategory.push(x.id);
      });
    }
  }

  //open the popUp to select the product
  openSelectProductPopup() {
    this.dialog.open(KitAssociatedProductComponent, {
      data: {
        alreadySelected: this.selectedProductList.data.length > 0 ? this.selectedProductList.data : null
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.addkitForm.form.markAsDirty(); //mark the form as dirty and enable the submit btn
        if (this.selectedProductList.data.length > 0 && this.selectedProductList.data[0].productId != 0) {  //push the selected product into list
          let previouslist = [...this.selectedProductList.data];
          previouslist.push.apply(previouslist, result);
          this.selectedProductList.data = Array.from(new Set(previouslist.map(i => i.productId)))
            .map(id => {
              return previouslist.find(item => item.productId === id)
            });
          //this.selectedProductList.data = previouslist;
        } else {
          this.selectedProductList.data = result;
        }
      }
      this.getDefaultProduct();
    });
  }


  submitKitDetails() {
    if (this.validateForm() && !this.isFormSubmitted) {
      let param = this.data;
      this.isFormSubmitted = true;

      param.kitProduct = this.selectedProductList.data;

      if (this.id > 0) {
        //param.pathVariable = this.id;
        delete param.kitResouces;
        //delete param.kitProduct;  //changed as per new SSD Ticket where kit products can always be editable
      }
      //  else {
      //   param.kitProduct = this.selectedProductList.data;
      // }
      let request = this.kitService.saveKit(param, (this.id > 0) ? 'put' : 'post');
      request.subscribe(response => {
        this.isFormSubmitted = false;
        this.sharedService.onSuccess(response, null, (value) => {

          if (value) {
            this.id = response.response.id;
            this.data.isApprove = false;
            this.sharedService.otherConfirmBox(AppMessage.U0131, 'cs', (value) => {
              if (value) {
                this.router.navigate(['/kit']);
              } else {
                this.getKitData();
              }
            })

          }
        });
      }, error => { this.sharedService.onError(error) });
    }
  }

  //reset the add kit form
  resetKitDetails() {
    this.addkitForm.reset();
    this.selectedCategories = [];
    this.isReset = true;
    this.isFormValid = true;
    this.data.kitVisibilityGroup = [];
    this.data.kitCategory = [];
    this.data.kitResouces = [];
    this.selectedCategoriesName = '';
    this.data.kitDescription = '';
    this.selectedProductList.data = [];
  }

  //in case of edit, set the ngModel of category to the name of the selected categories
  setCategoriesText(allData) {
    allData.forEach(element => {
      if (this.data.kitCategory.indexOf(element.id) > -1) {
        this.selectedCategoriesName += element.name + ", ";
      }
      if (element.childrens.length > 0) {
        this.setCategoriesText(element.childrens);
      }
    });
  }
  /** if visibility of client is enabled then only show visibility group dropdown 
     * Also hit get API's for warehouse and visibility value for the dropdown list
    */
  getSettings() {
    this.isVisibility = false;
    let param1: any = {
      pathVariable: localStorage.getItem('selectedClientId')
    }
    let param2 = {
      clientId: param1.pathVariable
    }
    let settings = this.kitService.getClientSetting(param1);
    let visibilityGroup = this.kitService.getVisibilityGroup(param2);
    forkJoin([settings, visibilityGroup]).subscribe(response => {
      if (response) {
        let [a, b] = response;
        if (a.response.settings.isVisibilityRestriction) {
          this.isVisibility = true;
        }
        if (this.isVisibility) {
          Object.assign(this.visibilityGroup.arrayValue, b.response);
        }
      }
    }, error => { this.sharedService.onError(error) });
  }


  validateForm() {
    this.descriptionError = '';
    let valid = this.addkitForm.valid; // form required  
    if (this.data.kitCategory.length == 0) {   //validate the category required
      valid = false;
    }
    this.util.validateCkEditor(true, (value, msg) => {    //validate the character count and space trial in ckeditor
      if (!value) {
        //valid = false;
        if (msg == 'count') {
          this.descriptionError = AppMessage.U0139;
          valid = false;
        }
        // else if (msg == 'space') {
        //   this.descriptionError = AppMessage.U0054;
        // }
        else {
          this.descriptionError = AppMessage.U0129;
          valid = false;
        }
      }
    });
    this.isFormValid = valid; // used in HTML
    return valid;
  }

  /** called for chip component in visibility group to set the value of selected chips into data visibility group */
  onChangeVisibilityGroup(data: any) {
    this.addkitForm.form.markAsDirty(); //mark the form as dirty and enable the submit btn
    this.data.kitVisibilityGroup = [];
    if (data != '') {
      data.forEach(x => {
        this.data.kitVisibilityGroup.push(x.id);
      });
    }
  }

  getVisibilitySelectedGroup() {    //when get Api is called then use this function to set the values of selected visibility group
    let array = [];
    this.visibilityGroup.arrayValue.forEach(element => {
      if (this.data.kitVisibilityGroup && this.data.kitVisibilityGroup.indexOf(element.id) > -1) {
        array.push(element);
      }
    });
    if (array.length > 0) {
      this.selectedGroup = array;
    }
  }

  removeProduct(element) {
    this.addkitForm.form.markAsDirty();
    let data = this.selectedProductList.data;
    data.splice(data.indexOf(element), 1);
    this.selectedProductList.data = data;
    this.getDefaultProduct();
  }

  getImages() {
    let data = this.selectedProductList.data;
    let requests = [];
    data.forEach(element => {
      if (element.resouceId) {
        requests.push(this.kitService.getThumbnailImage({ pathVariable: element.resouceId })); // put all GET request for images in array
      }
      element.url = this.defaultImageSrc;
    });
    this.getProductImages(requests);
  }

  getProductImages(requests) {
    this.util.hideLoader = true; // we dont need loader to load images
    // used spread operator here
    let kit = this.selectedProductList.data;
    forkJoin(...requests).subscribe(response => {
      response.forEach((element, i) => {
        let value = element.url.split('/');
        if (element.body.type != 'application/json') { // application/json means there is no any image and we get error product image not found for this case
          const data = window.URL.createObjectURL(element.body);
          for (let i = 0; i < kit.length; i++) {   //this loop because we have to insert the data into that items which have the corresponding resource id
            if (kit[i].resouceId == Number(value[value.length - 1])) {
              kit[i].url = data; // update URL 
              break;
            }
          }
        } else {
          console.log('someting went wrong to fetch Images from server...');
        }
      });
      this.selectedProductList.data = kit;
    });
  }

  //disable form for editing in case of workshop team role member
  disableKitFormForTeam() {
    if (this.id > 0 && this.isApproveBtnVisible && (this.data.kitStatus == Enum.Active ||
       this.data.kitStatus == Enum.Inactive || this.data.kitStatus == Enum.Product_Status_On_Hold)) {
      this.isWorkshopTeam = true;
      this.util.markFormControlDisable(this.addkitForm);
    }
  }

  approve() {
    this.data.isApprove = true;
    this.submitKitDetails();
  }
}
