import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material';

import { HttpClientService } from '../../../shared/services/http-client.service';
import { forkJoin } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Util } from '../../../shared/services/util';

import { SharedService } from '../../../shared/services/shared.service';
import { AppUrl } from '../../../shared/config/app-url.enum';

@Component({
  selector: 'app-kit-associated-product',
  templateUrl: './kit-associated-product.component.html',
  styleUrls: ['./kit-associated-product.component.scss'],
  providers: [
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'never' } }
  ]
})
export class KitAssociatedProductComponent implements OnInit {

  defaultImageSrc: string = "./assets/images/frame-landscape-placeholder.svg";
  displayedColumns: string[] = ['selected', 'productImg', 'productId', 'productName', 'categories'];
  dataSource: any = new MatTableDataSource();

  selectedProductCount = 0;
  selectedProductList: any = [];
  alreadySelectedKitList: any = [];
  selectAll: boolean = false;
  noKitRecords: boolean = true;
  searchText: string = '';

  constructor(private util: Util, private sharedService: SharedService, 
    public dialogRef: MatDialogRef<KitAssociatedProductComponent>, private http: HttpClientService,
    @Inject(MAT_DIALOG_DATA) public data: any, public _domSanitizationService: DomSanitizer) {
    this.alreadySelectedKitList = data.alreadySelected ? data.alreadySelected : [];
    // if(data.alreadySelected)
    //   this.selectedProductList = data.alreadySelected;
  }

  ngOnInit() {
  }

  searchProduct() {
    this.noKitRecords = true;
    let requests = [];
    if (this.searchText.length >= 3) {
      let params: any = {
        clientId: localStorage.getItem('selectedClientId'),
        productName: this.searchText
      }
      this.http.get(AppUrl.searchProductOnKit, params).subscribe(response => {
        this.sharedService.onSuccess(response, null, () => {
          if (response.response) {
            this.dataSource.data = response.response;
            this.noKitRecords = this.dataSource.data.length > 0 ? false : true;
            if (!this.noKitRecords) {
              this.dataSource.data.forEach(element => {
                Object.assign(element, { 'id': 0 });
                if(this.data.isAssociatedProduct){
                  Object.assign(element, { 'minQuantity': 1 });
                  //Object.assign(element, { 'maxOrderQuantity': 1 });
                }else{
                  Object.assign(element, { 'quantity': 1 });
                }
                Object.assign(element, { 'selected': false });
                if (element.resouceId) {
                  requests.push(this.http.getFiles(AppUrl.getThumbnailImage, { pathVariable: element.resouceId })); // put all GET request for images in array
                }
                element.url = this.defaultImageSrc;
              });
            }
            this.checkForAlreadySelectedProduct();
            this.getKitImages(requests);
          }
        });
      }, error => { this.sharedService.onError(error) });
    }
    else if (this.searchText.length == 0) {
      this.dataSource.data = [];
    }
  }

  getKitImages(requests) {
    this.util.hideLoader = true; // we dont need loader to load images
    // used spread operator here
    let kit = this.dataSource.data;
    forkJoin(...requests).subscribe(response => {
      response.forEach((element) => {
        let arr = element.url.split('/');
        if (element.body.type != 'application/json') { // application/json means there is no any image and we get error product image not found for this case
          const data = window.URL.createObjectURL(element.body);
          for (let i = 0; i < kit.length; i++) {   //this loop because we have to insert the data into that items which have the corresponding resource id
            if (kit[i].resouceId == Number(arr[arr.length - 1])) {
              kit[i].url = data; // update URL 
              break;
            }
          }
        } else {
          console.log('someting went wrong to fetch Images from server...');
        }
      });
      this.dataSource.data = kit;
    });
  }

  //enable disabled the selected all checkbox in header
  checkIfAllSelected() {
    this.selectedProductCount = 0;
    this.dataSource.data.forEach(item => {
      item.selected ? this.selectedProductCount++ : this.selectedProductCount--;
    });
    this.selectAll = this.selectedProductCount == this.dataSource.data.length ? true : false;
  }

  closeDialog() {
    this.selectedProductList = [];
    this.dialogRef.close();
  }

  addSelectedProduct() {
    let sp = this.dataSource.data.filter( item => item.selected);
    this.dialogRef.close(sp);
    this.selectedProductList = [];
  }

  selectAllProducts() {
    this.dataSource.data.forEach(item => {
      item['selected'] = this.selectAll;
    });
    this.selectedProductList = this.selectAll ? this.dataSource.data : [];   //push all the products if all checkbox are selected
  }

  //add selected item to list or delete selected item from list
  changeSelectedProduct(item, state) {
    this.checkIfAllSelected();
    state ? this.selectedProductList.push(item) : this.selectedProductList.splice(this.selectedProductList.indexOf(item), 1);
  }

  /**
   * @description: to check the products which are already selected by the user and select all header checkbox if selected list is equal to data list
   */
  checkForAlreadySelectedProduct() {
    let data = this.dataSource.data;
    if (this.alreadySelectedKitList.length > 0) {
      this.alreadySelectedKitList.forEach(elm => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].productId == elm.productId) {
            data[i].selected = true;
            break;
          }
        }
      });
      this.dataSource.data = data;
      this.checkIfAllSelected();
    }
  }

}
