import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';
import { ReportsService } from '../../../components/reports/reports.service';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { AppUrl } from '../../../shared/config/app-url.enum';
import { SharedService } from '../../../shared/services/shared.service';
import { Util } from '../../../shared/services/util';
import { Common } from '../../utility/common';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-store-reports',
  templateUrl: './store-reports.component.html',
  styleUrls: ['./store-reports.component.scss']
})
export class StoreReportsComponent implements OnInit {

  @ViewChild('storeReportsForm') storeReportsForm;
  @ViewChild(SelectAutocompleteComponent) multiSelect: SelectAutocompleteComponent;
  report: any = {};
  appStoreMessage = AppMessage;
  isStoreFormValid: boolean = true;
  storeFromDateError: boolean = false;
  storeToDateError: boolean = false;
  //inventory Report Section
  products: any = [];
  storeProductSearchText = new FormControl();
  storeFilteredOptions: any = [];
  storeInventoryError: boolean = false;
  //product Usage Section
  storeProductGroup = {
    arrayValue: [],
    placeholder: "Select Products"   //have to pass the placeholder value to chip component
  };
  storeIsSelectAll: boolean = false;

  // isReset: boolean = false;
  storeProductUsageError: boolean = false;
  //product Listing Section
  storeCategoryGroup = {
    arrayValue: [],
    placeholder: "Select Category"   //have to pass the placeholder value to chip component
  };
  storeproductListingError: boolean = false;

  storenoRecords: boolean = false;
  isEvent: boolean = false;
  storemediaType: string = 'XLSX';

  storecurrentYear = new Date();
  yearListStore = []

  //product usage monthly report
  storeisIncludeAll: boolean = false;

  constructor(private objReportService: ReportsService, private objSharedService: SharedService, private common:Common,
    private objUtil: Util, private objCommon: Common, private objLocation: Location) {
    this.objUtil.currentPageLink = 'storereport';
  }
  //Static types of reports - there are only 5 types(now 7 types) so kept static in UI
  storeReportTypes = [];
  ngOnInit() {
    this.createStoreReports();
    this.storeReportTypes.sort((a, b) => a.name < b.name ? -1 : 1);
    this.getProducts();          //to get the product list for type = 1,3
    this.report = {              //report data object and by default type=1 will be auto-selected
      type: this.storeReportTypes[0].id,
      fromDate: new Date(),
      toDate: new Date(),
      title: '',
      isInventory: false,
      isProductUsage: false,
      isProductListing: false,
      productId: 0,
      selectedProductsId: [],
      selectedCategoryId: []
    }
    //suggestive search for type=1 report in products list
    this.storeProductSearchText.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.storenoRecords = false;
      this.storeFilteredOptions = this._storeFilter(value && value.trim());
      if (this.storeFilteredOptions.length == 0) {
        this.storenoRecords = true;
      }
    });

    this.storeYearListFunc();

  }

  //create report type dropdown based on the enable  reports from the client settings
  createStoreReports() {
    if (this.common.storeClientInfo && this.common.storeClientInfo.reportSetting) {  //if all the reports are disabled then hide the View Report section
      for (let key in this.common.storeClientInfo.reportSetting) {
        if(this.common.storeClientInfo.reportSetting[key]){
          if (key == 'orderDetailReport') {
            this.storeReportTypes.push( { name: 'Order Details Report', id: 4 });
          }
          else if (key == 'damageProductReport') {
            this.storeReportTypes.push({ name: 'Damage Product Report', id: 8 });
          }
          else if(key == 'orderMonthlyReport'){
            this.storeReportTypes.push({ name: 'Order Monthly Report', id: 6 });
          }
          else if(key == 'productListingReport'){
            this.storeReportTypes.push({ name: 'Product Listing Report', id: 2 });
          }
          else if(key == 'productUsagesMothlyReport'){
            this.storeReportTypes.push({ name: 'Product Usage Monthly Report', id: 7 });
          }
          else if(key == 'orderSummaryReport'){
            this.storeReportTypes.push({ name: 'Order Summary Report', id: 5 });
          }
          else if(key == 'productUsagesReport'){
            this.storeReportTypes.push({ name: 'Product Usage Report', id: 3 });
          }
          else if(key == 'inventoryReport'){
            this.storeReportTypes.push({ name: 'Inventory Report', id: 1 });
          }
        }
      }
    }
  }

  //filtering the list of products on based of name for type=1 report
  _storeFilter(value: string): string[] {
    const storeFilterValue = value.toLowerCase();
    return this.products.filter(option => option.name.toLowerCase().includes(storeFilterValue));
  }

  /** 
   * show/hide the repective section based on the type of the report
   * For Type=1 , show suggestive search for products for single selection
   * For Type=2 , show the chip component for categories for multiple selection
   * For Type=3 , show the chip component for products for multiple selection
   * For Type=4,5 , hide all the additional details section
   */
  selectedStoreReportType(type) {
    // this.report.title='';
    this.isEvent = false;
    this.storeisIncludeAll = false;
    this.storeProductUsageError = false;
    switch (type) {
      case 1: this.report.isInventory = true;
        this.report.isProductUsage = this.report.isProductListing = false;
        break;
      case 2: this.report.isProductListing = true;
        this.report.isProductUsage = false;
        this.getCategories();
        break;
      case 3: this.report.isProductUsage = true;
        this.report.isProductListing = false;
        break;
      default: this.report.isProductUsage = this.report.isProductListing = false;
    }
  }

  //clear the selection from suggestive search for type=1
  clearField() {
    this.storenoRecords = false;
    this.report.productId = 0;
    this.storeProductSearchText.setValue('');
    this.storeFilteredOptions = this.products;
  }

  //method called when dates are changed
  dateChangeStoreReport(value) {
    this.storeReportsForm.form.markAsDirty(); //mark the form as dirty and enable the submit btn
    this.validateDateStoreReport(value);
  }

  //validate date that start date is not greater than end date and end date to be not less than start date
  validateDateStoreReport(value) {
    if ((Date.parse(this.report.fromDate) > Date.parse(this.report.toDate))) {
      value == 'toDate' ? this.storeToDateError = true : this.storeFromDateError = true;
    }
    else {
      this.storeToDateError = false;
      this.storeFromDateError = false;
    }
  }

  //Method called when export button is clicked and the report is downloaded if the form validation is succesfull
  reportExport() {
    if (this.formValidationStoreReport()) {
      this.getReport(this.report.type);
    }
  }

  formValidationStoreReport() {
    let valid = this.storeReportsForm.valid; // form required  
    if (!this.report.title) {   //validate the report title
      valid = false;
    }
    if (!this.validateDifferentReportStore(this.report.type)) {
      valid = false;
    };
    this.isStoreFormValid = valid; // used in HTML
    return valid;
  }

  //To download the reports based on type with different url and params
  getReport(type) {
    // this.isEvent=false;
    // this.report.title='';
    // console.log(this.report);
    let param: any = {
      clientId: this.objCommon.storeClientInfo.id,
      reportTitle: this.report.title
    }
    switch (type) {
      case 1: param['productId'] = this.report.productId;
        param['startDate'] = this.objUtil.formatDate(this.report.fromDate);
        param['endDate'] = this.objUtil.formatDate(this.report.toDate);
        this.submit(AppUrl.inventoryReport, param);
        break;
      case 2: param['categoryIds'] = this.report.selectedCategoryId;
        this.submit(AppUrl.productListingReport, param);
        break;
      case 3: param['productIds'] = this.report.selectedProductsId;
        param['startDate'] = this.objUtil.formatDate(this.report.fromDate);
        param['endDate'] = this.objUtil.formatDate(this.report.toDate);
        param['isEvent'] = this.isEvent;
        param['mediaType'] = this.storemediaType;
        param['isSelectAll'] = this.storeIsSelectAll;
        this.submit(AppUrl.productUsageReport, param);
        break;
      case 4:   //case 4 is same as case 5 so using this syntax
      case 5: param['startDate'] = this.objUtil.formatDate(this.report.fromDate);
        param['endDate'] = this.objUtil.formatDate(this.report.toDate);
        this.submit(type == 5 ? AppUrl.orderSummaryReport : AppUrl.orderDetailReport, param);
        break;
      case 6: param['year'] = this.report.year;
        param['isEvent'] = this.isEvent;
        this.submit(AppUrl.orderMonthlyReport, param);
        break;
      case 7: param['year'] = this.report.year;
        param['isEvent'] = this.isEvent;
        param['isSelectAll'] = this.storeisIncludeAll;
        this.submit(AppUrl.productUsageMonthlyReport, param);
        break;
      case 8: param['startDate'] = this.objUtil.formatDate(this.report.fromDate);
        param['endDate'] = this.objUtil.formatDate(this.report.toDate);
        this.submit(AppUrl.damageproductreport, param);
        break;
    }
  }

  submit(url, param) {
    this.objReportService.getReports(url, param).subscribe((response: any) => {
      if (response.body.type != 'application/json') { // application/json means there is no any report and we get error code for this case
        this.objUtil.downloadFile(response);
        this.objSharedService.openToast('s', AppMessage.U0142);
      } else {
        this.objSharedService.openToast('e', AppMessage.U0143);
      }
    }, error => this.objSharedService.onError(error));
  }

  //Get all the product list and assign to object for single and multiple selection
  getProducts() {
    let param = {
      clientId: this.objCommon.storeClientInfo.id
    }
    this.objReportService.getProducts(param).subscribe(response => {
      this.objSharedService.onSuccess(response, null, () => {
        if (response.response) {
          //next two lines are for inventory report
          this.products = response.response;       //base data object
          this.storeFilteredOptions = this.products;     //filtered data object for suggestive search in type=1 initially set to response
          //this forEach loop is for product usage report
          response.response.forEach(prod => {
            this.storeProductGroup.arrayValue.push({ value: prod.id, display: prod.name });
          })

          // Object.assign(this.storeProductGroup.arrayValue, this.products);  //data object for chip component for type=3
        }
      });
    }, error => { this.objSharedService.onError(error) });
  }

  //Get all the category list and assign to object for multiple selection
  getCategories() {
    let param = {
      clientId: this.objCommon.storeClientInfo.id
    }
    this.objReportService.getCategories(param).subscribe(response => {
      this.objSharedService.onSuccess(response, null, () => {
        if (response.response) {
          response.response.forEach(cat => {
            this.storeCategoryGroup.arrayValue.push({ value: cat.id, display: cat.name });
          })
          // Object.assign(this.storeCategoryGroup.arrayValue, response.response);  //data object for chip component for type=2
        }
      });
    }, error => { this.objSharedService.onError(error) });
  }

  //save the id of selected product for type=1 only if event is selected by keyup.enter or click
  selectInventoryProductStoreReport(id, evt: any) {

    if (evt.source.selected) {     //this is a turn around of angular material that onSelectionChange event is triggering twice whenever you change the option
      this.report.productId = id;
      this.storeInventoryError = false;
      this.storeReportsForm.form.markAsDirty(); //mark the form as dirty and enable the submit btn
    }
  }

  validateDifferentReportStore(type) {
    this.storeInventoryError = false;
    this.storeProductUsageError = false;
    let valid = true;
    switch (type) {
      case 1: if (this.report.productId == 0) {
        this.storeInventoryError = true;
        valid = false;
      }
        if (this.storeFromDateError || this.storeToDateError) {
          valid = false;
        }
        if (this.storenoRecords) {
          valid = false;
        }
        break;
      case 2: if (this.report.selectedCategoryId == 0) {
        this.storeproductListingError = true;
        valid = false;
      } else {
        this.storeproductListingError = false;
      }
        break;
      case 3:
        if (this.report.selectedProductsId.length == 0) {
          this.storeProductUsageError = true;
          valid = false;
        }
        if (this.storeFromDateError || this.storeToDateError) {
          valid = false;
        }
        break;
      case 4:   //case 4 is same as case 5 so using this syntax
      case 5: if (this.storeFromDateError || this.storeToDateError) {
        valid = false;
      }
        break;
    }
    return valid;
  }

  /**
   * Store the value of selection into params of respective report
   * @param selected contains the id of the selected group
   * @param type = type of report
   */
  onSelectionChange(selected: any, type) {
    // if (selected.length > 0) {
    switch (type) {
      case 'categoryReport':

        this.report.selectedCategoryId = selected;
        break;
      case 'productReport':
        //if all products are selected, set isSeclectAll=true
        this.storeIsSelectAll = selected.length == this.storeProductGroup.arrayValue.length ? true : false;
        this.report.selectedProductsId = selected;
        break;
    }

    // }
  }

  storeYearListFunc() {
    let prevYear = this.storecurrentYear.getFullYear() - 1;
    this.yearListStore.push(prevYear);
    this.yearListStore.push(this.storecurrentYear.getFullYear());
  }

  goBackPage() {
    this.objLocation.back();
  }

}
