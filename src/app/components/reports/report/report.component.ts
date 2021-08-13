import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Util } from '../../../shared/services/util';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { SharedService } from '../../../shared/services/shared.service';
import { ReportsService } from '../reports.service';
import { AppUrl } from '../../../shared/config/app-url.enum';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush, // Using this just to avoid the expression changed error. Please use this if required.
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  @ViewChild('reportsForm') reportsForm;
  @ViewChild(SelectAutocompleteComponent) multiSelect: SelectAutocompleteComponent;
  report: any = {};
  appMessage = AppMessage;
  isFormValid: boolean = true;
  fromDateError: boolean = false;
  toDateError: boolean = false;
  //inventory Report Section
  products: any = [];
  productSearchText = new FormControl();
  filteredOptions: any = [];
  inventoryError: boolean = false;
  //product Usage Section
  productGroup = {
    arrayValue: [],
    placeholder: "Select Products"   //have to pass the placeholder value to chip component
  };
  isSelectAll:boolean = false;
 // productSelectedGroup = []; 
  isReset: boolean = false;
  productUsageError: boolean = false;
  //product Listing Section
  categoryGroup = {
    arrayValue: [],
    placeholder: "Select Category"   //have to pass the placeholder value to chip component
  };
 // categorySelectedGroup = [];
  productListingError: boolean = false;

  noRecords: boolean = false;
  //selectedAll: boolean = false;
  isEvent: boolean = false;
  mediaType: string = 'XLSX';

  currentYear = new Date();
  yearList = []

  //product usage monthly report
  isIncludeAll : boolean = false;

  constructor(private reportService: ReportsService, private sharedService: SharedService, private util: Util) {
    this.util.currentPageLink = 'reports';
  }

  //Static types of reports - there are only 5 types(now 7 types) so kept static in UI
  reportTypes = [
    
    { name: 'Inventory Report', id: 1 },
    { name: 'Order Details Report', id: 4 },
    { name: 'Order Monthly Report', id: 6 },
    { name: 'Order Summary Report', id: 5 },
    { name: 'Product Listing Report', id: 2 },
    { name: 'Damage Product Report', id: 8 },
    { name: 'Product Usage Monthly Report', id: 7 },
    { name: 'Product Usage Report', id: 3 }    
  ];
 
  ngOnInit() {
    this.reportTypes.sort((a, b) => a.name < b.name ? -1 : 1); 
    this.getProducts();          //to get the product list for type = 1,3
    this.report = {              //report data object and by default type=1 will be auto-selected
      type: this.reportTypes[0].id,
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
    this.productSearchText.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.noRecords = false;
      this.filteredOptions = this._filter(value && value.trim());
      if (this.filteredOptions.length == 0) {
        this.noRecords = true;
      }
    });

    this.yearListFunc()
  }

  //filtering the list of products on based of name for type=1 report
  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.products.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  /** 
   * show/hide the repective section based on the type of the report
   * For Type=1 , show suggestive search for products for single selection
   * For Type=2 , show the chip component for categories for multiple selection
   * For Type=3 , show the chip component for products for multiple selection
   * For Type=4,5 , hide all the additional details section
   */
  selectedReportType(type) {
    

    // this.selectedAll = false;
    // this.categorySelectedGroup = [];
    // this.productSelectedGroup = [];
    this.isEvent = false;
    this.isIncludeAll = false;
    switch (type) {
      case 1: this.report.isInventory = true;
        this.report.isProductUsage = this.report.isProductListing = false;
        break;
      case 2: this.report.isProductListing = true;
        this.report.isProductUsage = this.report.isInventory = false;
        this.getCategories();
        break;
      case 3: this.report.isProductUsage = true;
        this.report.isInventory = this.report.isProductListing = false;
        break;
      default: this.report.isInventory = this.report.isProductUsage = this.report.isProductListing = false;
    }
  }

  //clear the selection from suggestive search for type=1
  clear() {
    this.noRecords = false;
    this.report.productId = 0;
    this.productSearchText.setValue('');
    this.filteredOptions = this.products;
  }

  //method called when dates are changed
  dateChange(value) {
    this.reportsForm.form.markAsDirty(); //mark the form as dirty and enable the submit btn
    this.validateDate(value);
  }

  //validate date that start date is not greater than end date and end date to be not less than start date
  validateDate(value) {
    if ((Date.parse(this.report.fromDate) > Date.parse(this.report.toDate))) {
      value == 'toDate' ? this.toDateError = true : this.fromDateError = true;
    }
    else {
      this.toDateError = false;
      this.fromDateError = false;
    }
  }

  //Method called when export button is clicked and the report is downloaded if the form validation is succesfull
  exportReport() {
    if (this.validateForm()) {
      this.getReport(this.report.type);
    }
  }

  validateForm() {
    let valid = this.reportsForm.valid; // form required  
    if (!this.report.title) {   //validate the report title
      valid = false;
    }
    if (!this.validateDifferentReport(this.report.type)) {
      valid = false;
    };
    this.isFormValid = valid; // used in HTML
    return valid;
  }

  //To download the reports based on type with different url and params
  getReport(type) {
    let param: any = {
      clientId: localStorage.getItem('selectedClientId'),
      reportTitle: this.report.title
    }
    switch (type) {
      case 1: param['productId'] = this.report.productId;
        param['startDate'] = this.util.formatDate(this.report.fromDate);
        param['endDate'] = this.util.formatDate(this.report.toDate);
        this.submit(AppUrl.inventoryReport, param);
        break;
      case 2: param['categoryIds'] = this.report.selectedCategoryId;
        this.submit(AppUrl.productListingReport, param);
        break;
      case 3: param['productIds'] = this.report.selectedProductsId;
        param['startDate'] = this.util.formatDate(this.report.fromDate);
        param['endDate'] = this.util.formatDate(this.report.toDate);
        param['isEvent'] = this.isEvent;
        param['mediaType'] = this.mediaType;
        param['isSelectAll'] = this.isSelectAll;
        this.submit(AppUrl.productUsageReport, param);
        break;
      case 4:   //case 4 is same as case 5 so using this syntax
      case 5: param['startDate'] = this.util.formatDate(this.report.fromDate);
        param['endDate'] = this.util.formatDate(this.report.toDate);
        this.submit(type == 5 ? AppUrl.orderSummaryReport : AppUrl.orderDetailReport, param);
        break;
      case 6: param['year'] = this.report.year;
        param['isEvent'] = this.isEvent;
        this.submit(AppUrl.orderMonthlyReport, param);
        break;
        case 7: param['year'] = this.report.year;
        param['isEvent'] = this.isEvent;
        param['isSelectAll'] = this.isIncludeAll;
        this.submit(AppUrl.productUsageMonthlyReport, param);
        break;
        case 8: param['startDate'] = this.util.formatDate(this.report.fromDate);
        param['endDate'] = this.util.formatDate(this.report.toDate);
        this.submit(AppUrl.damageproductreport, param);
        break;
    }
  }

  submit(url, param) {
    this.reportService.getReports(url, param).subscribe((response: any) => {
      if (response.body.type != 'application/json') { // application/json means there is no any report and we get error code for this case
        this.util.downloadFile(response);
        this.sharedService.openToast('s', AppMessage.U0142);
      } else {
        this.sharedService.openToast('e', AppMessage.U0143);
      }
    }, error => this.sharedService.onError(error));
  }

  //Get all the product list and assign to object for single and multiple selection
  getProducts() {
    let param = {
      clientId: localStorage.getItem('selectedClientId')
    }
    this.reportService.getProducts(param).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        if (response.response) {
          //next two lines are for inventory report
          this.products = response.response;       //base data object
          this.filteredOptions = this.products;     //filtered data object for suggestive search in type=1 initially set to response
          //this forEach loop is for product usage report
          response.response.forEach(prod => {
            this.productGroup.arrayValue.push({ value: prod.id, display: prod.name });
          })

          // Object.assign(this.productGroup.arrayValue, this.products);  //data object for chip component for type=3
        }
      });
    }, error => { this.sharedService.onError(error) });
  }

  //Get all the category list and assign to object for multiple selection
  getCategories() {
    let param = {
      clientId: localStorage.getItem('selectedClientId')
    }
    this.reportService.getCategories(param).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        if (response.response) {
          response.response.forEach(cat => {
            this.categoryGroup.arrayValue.push({ value: cat.id, display: cat.name });
          })
         // Object.assign(this.categoryGroup.arrayValue, response.response);  //data object for chip component for type=2
        }
      });
    }, error => { this.sharedService.onError(error) });
  }

  //save the id of selected product for type=1 only if event is selected by keyup.enter or click
  selectInventoryProduct(id, evt: any) {
    if (evt.source.selected) {     //this is a turn around of angular material that onSelectionChange event is triggering twice whenever you change the option
      this.report.productId = id;
      this.inventoryError = false;
      this.reportsForm.form.markAsDirty(); //mark the form as dirty and enable the submit btn
    }
  }

  validateDifferentReport(type) {
    this.inventoryError = false;
    this.productUsageError = false;
    let valid = true;
    switch (type) {
      case 1: if (this.report.productId == 0) {
        this.inventoryError = true;
        valid = false;
      }
        if (this.fromDateError || this.toDateError) {
          valid = false;
        }
        if (this.noRecords) {
          valid = false;
        }
        break;
      case 2: if (this.report.selectedCategoryId == 0) {
        this.productListingError = true;
        valid = false;
      }
        break;
      case 3:
        if (this.report.selectedProductsId.length == 0) {
          this.productUsageError = true;
          valid = false;
        }
        if (this.fromDateError || this.toDateError) {
          valid = false;
        }
        break;
      case 4:   //case 4 is same as case 5 so using this syntax
      case 5: if (this.fromDateError || this.toDateError) {
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
    if (selected.length > 0) {
      switch (type) {
        case 'categoryReport':
          this.report.selectedCategoryId = selected;
          break;
        case 'productReport':
          //if all products are selected, set isSeclectAll=true
          this.isSelectAll = selected.length==this.productGroup.arrayValue.length ? true : false;
          this.report.selectedProductsId = selected;
          break;
      }

    }
  }

  yearListFunc() {
    let prevYear = this.currentYear.getFullYear() - 1;
    this.yearList.push(prevYear);
    this.yearList.push(this.currentYear.getFullYear());
  }

   /** called for chip component in product group to set the value of selected chips into data product group */
  // onChangeProductGroup(data: any) {
  //   this.productUsageError = false;
  //   this.reportsForm.form.markAsDirty(); //mark the form as dirty and enable the submit btn
  //   this.report.selectedProductsId = [];
  //   if (data != '') {
  //     data.forEach(x => {
  //       this.report.selectedProductsId.push(x.id);
  //     });
  //     // mark select all checkbox true if all chips selected
  //     this.selectedAll = data.length === this.productGroup.arrayValue.length ? true : false;
  //   }

  // }

  // /** called for chip component in category group to set the value of selected chips into data category group */
  // onChangeCategoryGroup(data: any) {
  //   this.productListingError = false;
  //   this.reportsForm.form.markAsDirty(); //mark the form as dirty and enable the submit btn
  //   this.report.selectedCategoryId = [];
  //   if (data != '') {
  //     data.forEach(x => {
  //       this.report.selectedCategoryId.push(x.id);
  //     });  
  //     // mark select all checkbox true if all chips selected
  //     this.selectedAll = data.length === this.categoryGroup.arrayValue.length ? true : false;
  //   }

  // }

  // selectAllList( arr: any, selectedGroupName?: string ) {
  //   if (this.selectedAll) {
  //     this.isReset = false;
  //     this[selectedGroupName] = [...arr.arrayValue];
  //   } else  {
  //     this.isReset = true;
  //     this[selectedGroupName] = [];
  //   }
  //   switch (selectedGroupName) {
  //     case 'categorySelectedGroup' :
  //       this.onChangeCategoryGroup(this[selectedGroupName]);
  //       break;
  //     case 'productSelectedGroup' :
  //       this.onChangeProductGroup(this[selectedGroupName]);
  //       break;
  //   }
  // }

}
