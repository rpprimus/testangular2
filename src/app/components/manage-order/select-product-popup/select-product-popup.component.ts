import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_LABEL_GLOBAL_OPTIONS, MatTableDataSource } from '@angular/material';
import { ManageOrderService } from '../manage-order.service';
import { SharedService } from '../../../shared/services/shared.service';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { DomSanitizer } from '@angular/platform-browser';
import { Util } from '../../../shared/services/util';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { AppUrl } from '../../../shared/config/app-url.enum';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-select-product-popup',
  templateUrl: './select-product-popup.component.html',
  styleUrls: ['./select-product-popup.component.scss'],
  providers: [
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'never' } }
  ]
})
export class SelectProductPopupComponent implements OnInit {

  //searchText: string = "";
  productList: any = [];
  //noRecords: string;
  selectedProductId: number = 0;

  defaultImageSrc: string = "./assets/images/frame-landscape-placeholder.svg";
  displayedColumns: string[] = ['selected', 'productImg', 'productId', 'productName', 'categories'];
  dataSource: any = new MatTableDataSource();
  selectAll: boolean = false;
  noRecords: boolean = true;
  searchText: string = '';
  selectedCount = 0;
  selectedProductList: any = [];
  alreadySelectedList: any = [];

  constructor(private util: Util, private manageOrderService: ManageOrderService, private sharedService: SharedService,
     private http: HttpClientService,public dialogRef: MatDialogRef<SelectProductPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public _domSanitizationService: DomSanitizer) {
    data.autoFocus = true;
    this.alreadySelectedList = data.alreadySelected ? data.alreadySelected : [];
    //dialogRef.disableClose = true;   //to disable click outside of angular material dialog area to close the dialog
  }

  ngOnInit() {
  }

  // close() {
  //   this.dialogRef.close();
  // }

  // searchProduct() {
  //   this.noRecords = '';
  //   if (this.searchText.length >= 3) {
  //     let param: any = {
  //       products: this.searchText,
  //       clientId: localStorage.getItem('selectedClientId')
  //     }
  //     this.manageOrderService.searchProduct(param).subscribe(response => {
  //       this.sharedService.onSuccess(response, null, () => {
  //         if (response.response) {
  //           this.productList = response.response;
  //           if (this.productList.length == 0) {
  //             this.noRecords = AppMessage.U0100;
  //           }
  //         }
  //       });
  //     }, error => { this.sharedService.onError(error) });
  //   }
  // }

  // selectProduct(id: number) {
  //   this.selectedProductId = id;
  // }

  // addProduct() {
  //   if (this.selectedProductId != 0) {
  //     let param: any = {
  //       productId: this.selectedProductId,
  //       clientId: localStorage.getItem('selectedClientId'),
  //       toDate: this.data.toDate,
  //       fromDate: this.data.fromDate
  //     }
  //     this.manageOrderService.getProductInfo(param).subscribe(response => {
  //       this.sharedService.onSuccess(response, null, () => {
  //         if (response.response) {
  //           this.dialogRef.close(response.response);
  //         }
  //       });
  //     }, error => { this.sharedService.onError(error) });
  //   }
  // }

  // clear() {
  //   this.searchText = '';
  //   this.selectedProductId = 0;
  //   this.productList = [];
  // }

  searchProduct() {
    this.noRecords = true;
    let requests = [];
    if (this.searchText.length >= 3) {
      let param: any = {
        productName: this.searchText,
        clientId: localStorage.getItem('selectedClientId')
      }
      this.manageOrderService.searchProduct(param).subscribe(response => {
        this.sharedService.onSuccess(response, null, () => {
          if (response.response) {
            this.dataSource.data = response.response;
            this.noRecords = this.dataSource.data.length > 0 ? false : true;
            if (!this.noRecords) {
              this.dataSource.data.forEach(element => {
                Object.assign(element, { 'selected': false });
                Object.assign(element, { 'quantity': 1 });
                Object.assign(element, { 'id': 0 });
                if(element.resouceId){
                  requests.push(this.http.getFiles(AppUrl.getThumbnailImage, { pathVariable: element.resouceId })); // put all GET request for images in array
                }
                element.url = this.defaultImageSrc;
              });
            }
            this.checkAlreadySelectedProduct();
            this.getImages(requests);
          }
        });
      }, error => { this.sharedService.onError(error) });
    }
    else if (this.searchText.length == 0) {
      this.dataSource.data = [];
    }
  }

  getImages(requests) {
    this.util.hideLoader = true; // we dont need loader to load images
    // used spread operator here
    let products = this.dataSource.data;
    forkJoin(...requests).subscribe(response => {
      response.forEach((element) => {
        let arr = element.url.split('/');
        if (element.body.type != 'application/json') { // application/json means there is no any image and we get error product image not found for this case
          const data = window.URL.createObjectURL(element.body);
          for (let i = 0; i < products.length; i++) {   //this loop because we have to insert the data into that items which have the corresponding resource id
            if (products[i].resouceId == Number(arr[arr.length - 1])) {
              products[i].url = data; // update URL 
              break;
            }
          }
        } else {
          console.log('someting went wrong to fetch Images from server...');
        }
      });
      this.dataSource.data = products;
    });
  }

  selectAllProducts() {
    this.dataSource.data.forEach(item => {
      item['selected'] = this.selectAll;
    });
    this.selectedProductList = this.selectAll ? this.dataSource.data : [];   //push all the products if all checkbox are selected
  }

  //add selected item to list or delete selected item from list
  changeSelected(item, state) {
    this.checkSelectedAll();
    state ? this.selectedProductList.push(item) : this.selectedProductList.splice(this.selectedProductList.indexOf(item), 1);
  }

  //enable disabled the selected all checkbox in header
  checkSelectedAll() {
    this.selectedCount = 0;
    this.dataSource.data.forEach(item => {
      item.selected ? this.selectedCount++ : this.selectedCount--;
    });
    this.selectAll = this.selectedCount == this.dataSource.data.length ? true : false;
  }

  close() {
    this.selectedProductList = [];
    this.dialogRef.close();
  }

  addProduct() {
    this.dialogRef.close(this.selectedProductList);
    this.selectedProductList = [];
  }

  /**
   * @description: to check the products which are already selected by the user and select all header checkbox if selected list is equal to data list
   */
  checkAlreadySelectedProduct() {
    let data = this.dataSource.data;
    if (this.alreadySelectedList.length > 0) {
      this.alreadySelectedList.forEach(elm => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].productId == elm.productId) {
            data[i].selected = true;
            break;
          }
        }
      });
      this.dataSource.data = data;
      this.checkSelectedAll();
    }
  }
}
