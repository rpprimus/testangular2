import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppUrl } from '../../../../shared/config/app-url.enum';
import { HttpClientService } from '../../../../shared/services/http-client.service';
import { SharedService } from '../../../../shared/services/shared.service';
import { Util } from '../../../../shared/services/util';
import { StoreService } from '../../../service/store.service';
import { Common } from '../../../utility/common';
import { EventPopUpComponent } from '../event-pop-up/event-pop-up.component';
import { LeftPanelCategoryService } from '../left-panel-category.service';
import { Enum } from '../../../../shared/config/enum.enum';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';


@Component({
  selector: 'app-browse-product',
  templateUrl: './browse-product.component.html',
  styleUrls: ['./browse-product.component.scss']
})
export class BrowseProductComponent implements OnInit {
  @ViewChild(InfiniteScrollDirective) infiniteScroll;

  set appScroll(directive: InfiniteScrollDirective) {
    this.infiniteScroll = directive;
  }

  defaultImageSrc: string = "./assets/images/frame-landscape-placeholder.svg";
  noRecords: boolean = false;
  productTotalRecords: number = 0;
  kitTotalRecords: number = 0;
  pageNumber: number = 1; // save current page number and increase it by 1 in case of lazy loading.
  data: any = [];
  //imagesSrcArr = [];
  orderDetails: any = [];
  isEventEnabled: boolean = false;
  isKitRecord: boolean = false;
  browseproductUploadImageSpace: any;
  //loaderCheck: boolean = false;
  browseProductLoaderCheck: any = [];         //Loader flag for the media files.
  //placeOrderData: any = {};
  isViewOnlyStore: boolean = false;
  sortByOptions: any = [
    { value: 'PRODUCT_NAME', viewValue: 'Product Name' },
    { value: 'PRODUCT_ID', viewValue: 'Product Number' }
  ];
  sortBy: string = 'PRODUCT_NAME';

  enum = Enum;
  loadingProducts: boolean = false;

  constructor(private sharedService: SharedService, private storeService: StoreService, public _domSanitizationService: DomSanitizer, private http: HttpClientService,
    private util: Util, public common: Common, private route: Router, public dialog: MatDialog, public categoryService: LeftPanelCategoryService) { }


  ngOnInit() {
    //retain the product search text
    this.common.storeProductSearchText = localStorage.getItem('storeProductSearchText') ? localStorage.getItem('storeProductSearchText') : '';
    if(this.common.storeProductSearchText){
      this.common.isStoreProductSearched = true;
    }
    this.common.userEventEnabled.subscribe(response => {
      this.isEventEnabled = response;
      //Only show browse product page if view store is true else show all
      this.isViewOnlyStore = this.common.isViewStore() ? true : false;

      this.common.getCartJson(() => {
        //this.placeOrderData = this.common.placeOrderObj;
        if (this.isEventEnabled && !localStorage.getItem('eventStartDate')) {
          this.openEventDialog();
        }
        else if (this.categoryService.categoryData.length == 0) {
          this.categoryService.getCategories();
        } else {
          this.getBrowseProductList();
        }
      });
    });
    this.util.notifyObservable$.subscribe((response: any) => {
      if (response.action == "categoryData") {
        this.getBrowseProductList();
      }
    });
  }

  getBrowseProductList(pageNumber = 1, loadMore?) {
    if (this.isEventEnabled && localStorage.getItem('eventStartDate')) {
      this.getProducts(pageNumber, loadMore);
    }
    else if (!this.isEventEnabled && !localStorage.getItem('eventStartDate')) {
      this.getProducts(pageNumber, loadMore);
    }
  }

  getProducts(pageNumber = 1, loadMore?) {
    let param: any = {
      pathVariable: pageNumber,
      pageSize: 11,
      fromDate: this.isEventEnabled ? localStorage.getItem('eventStartDate') : null,
      toDate: this.isEventEnabled ? localStorage.getItem('eventEndDate') : null,
      clientId: this.common.storeClientInfo.id,
      // categoryId: this.categoryService.categoryId,
      sortBy: this.sortBy
    }
    if (this.common.storeProductSearchText != '' && this.common.storeProductSearchText.trim().length > 0 && this.common.isStoreProductSearched) {
      param['searchText'] = encodeURIComponent(this.common.storeProductSearchText);
    } else {
      param['categoryId'] = this.categoryService.categoryId;
    }
    this.storeService.browseProductList(param).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        this.loadingProducts = false;
        if (response.response.results.length > 0) { //if the length to record for products is zero then hit the api for browse kit and that is also blank then show no record found message
          this.isKitRecord = false;
          this.ongetProductSuccess(false, response, loadMore);
          if (response.response.results.length < 11) { //to show that the products exists in the list but its number are less than 5 so window scroll will not work so we have to load the kit
            this.isKitRecord = true;
            this.getKits(true);
          }
        } else {
          this.loadingProducts = false;
          this.productTotalRecords = 0;   //to show that the products doesnot exist in the list for the selected category so set the productTotalRecord to zero
          this.isKitRecord = true;
          this.getKits(false);
        }
      });
    });
  }

  ongetProductSuccess(isLoadKit, response, loadMore) {
    if (response.response) {
      let pageInfo = response.response.paginationInfo;
      this.pageNumber = pageInfo.curPage; // save current page value
      this.isKitRecord ? this.kitTotalRecords = pageInfo.totalRecords : this.productTotalRecords = pageInfo.totalRecords;
      let results = response.response.results;
      let data = this.data;
      if (loadMore) {
        data.push.apply(data, results);
      } else {
        if (!isLoadKit) {
          data = [];
        }
        data.push.apply(data, results);
      }
      this.getPreviouslyAddToCartQuantity(data);
      this.data = data;
      this.noRecords = this.data.length > 0 ? false : true;
      if (!this.noRecords) {
        this.getImageResource();
      }
    }
    this.pushDataIntoPlaceOrderJson();
  }

  getPreviouslyAddToCartQuantity(data: any) {
    this.common.placeOrderObj.orderDetails.forEach(orderedItem => {
      data.forEach(item => {
        if (item.id == orderedItem.productId) {
          item.alreadyAddedCartQuantity = orderedItem.orderedQuantity;
        }
      });
    });
  }

  onScroll() {
    this.infiniteScroll.ngOnDestroy();   //to solve the problem of not scrolling for the second time
    this.infiniteScroll.setup();
    if (!this.isKitRecord && !this.loadingProducts) {
      this.loadingProducts = true;
      if (this.data.length < this.productTotalRecords) {
        this.getBrowseProductList(this.pageNumber + 1, true);
      } else if (this.data.length != 0 && this.data.length == this.productTotalRecords) {
        this.isKitRecord = true;
        this.getKits(false, 1, true);
      }
    } else {
      if (this.data.length < this.productTotalRecords + this.kitTotalRecords && !this.loadingProducts) {
        this.getKits(false, this.pageNumber + 1, true);
      }
    }
  }

  getKits(loadKit, pageNumber = 1, loadMore?) {
    let param: any = {
      pathVariable: pageNumber,
      pageSize: 11,
      fromDate: this.isEventEnabled ? localStorage.getItem('eventStartDate') : null,
      toDate: this.isEventEnabled ? localStorage.getItem('eventEndDate') : null,
      clientId: this.common.storeClientInfo.id,
      //categoryId: this.categoryService.categoryId
    }
    if (this.common.storeProductSearchText != '' && this.common.storeProductSearchText.trim().length > 0 && this.common.isStoreProductSearched) {
      param['searchText'] = encodeURIComponent(this.common.storeProductSearchText);
    } else {
      param['categoryId'] = this.categoryService.categoryId;
    }
    this.storeService.browseKitList(param).subscribe(response => {
      this.loadingProducts = false;
      this.sharedService.onSuccess(response, null, () => {
        this.ongetProductSuccess(loadKit, response, loadMore);
      });
    });
  }

  getImageResource() {
    this.util.hideLoader = true; // we dont need loader to load images
    //this.loaderCheck = true;
    //this.imagesSrcArr = [];
    this.data.forEach((element, index) => {
      if (element.resourceId) {
        this.browseProductLoaderCheck[index] = true;     //showing loader at the image card section
        let request;
        element.imgClass = this.util.checkImageType(element.thumbnailDimension.imgWidth, element.thumbnailDimension.imgHeight); //get the type of image structure
        if (element.isKit) {
          request = this.http.getFiles(AppUrl.downloadKitResource, { pathVariable: element.resourceId, kitId: element.id, type: Enum.Kit_ProductImages });
        } else {
          request = this.http.getFiles(AppUrl.getThumbnailImage, { pathVariable: element.resourceId });
        }
        request.subscribe(response => {
          if (response.body.type != 'application/json') { // application/json means there is no any image and we get error, product image not found for this case
            const data = window.URL.createObjectURL(response.body);
            element.url = data; // update URL 
          } else {
            console.log('someting went wrong to fetch Images from server...');
          }
          this.browseProductLoaderCheck[index] = false;     //closing the loader at the image card section when the image is finished loading
        });
      }
      else {
        element.url = this.defaultImageSrc;
      }
    });
  }

  /** called for getting the value of selected category */
  changedCategoryId(data: any) {
    if (data) {
      this.categoryService.categoryId = data;
      this.getBrowseProductList();
    }
  }

  openEventDialog() {
    this.dialog.open(EventPopUpComponent, {
      data: {
        content: "Select event"
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.getCategories();
      }
    });
  }

  onAddCart(item) {
    item['showPrice'] = item.isPriceVisible;
    this.storeService.addToCart(item);
    // this.common.addToCart(item, false, false, (value, item) => {
    //   if (value.length > 0) {
    //     this.dialog.open(AssociatedOrderingComponent, {
    //       data: {
    //         steps: value,
    //         item: item
    //       }
    //     });
    //   }
    // });
  }

  pushDataIntoPlaceOrderJson() {
    let obj = this.common.placeOrderObj;
    obj.eventDetails.clientId = obj.clientId = this.common.storeClientInfo.id;
    obj.eventDetails.start = obj.fromDate = localStorage.getItem('eventStartDate');
    obj.eventDetails.end = obj.toDate = localStorage.getItem('eventEndDate');
    obj.eventDetails.title = localStorage.getItem('eventName');
    obj.eventId = localStorage.getItem('eventId') ? Number(localStorage.getItem('eventId')) : 0;
    let user = this.common.storeUserInfo.getValue();
    obj.requestorId = user.id;
    obj.requestorName = user.name;
    this.common.saveCartJson();
  }

  navigateToDetail(id: number, isKit: boolean) {
    this.route.navigate(['/order/product/' + id], { queryParams: { kit: isKit } });
  }

  //This method toggles the category tree in mobile screens only
  openCategoryPopup() {
    this.common.isSelectedCategoryChanged = !this.common.isSelectedCategoryChanged;
  }


  /************************* SEARCH BOX FUNCTIONALITY ****************** */
  onClearSearch() {
    this.common.storeProductSearchText = '';
    localStorage.setItem('storeProductSearchText','');
    this.common.isStoreProductSearched = false;
    this.getProducts();
  }

  /*
  *Perform search on search icon click or on Keypress Enter
  */
  searchProduct() {
    if (this.common.storeProductSearchText != '' && this.common.storeProductSearchText.trim().length > 0) {
      this.common.isStoreProductSearched = true;
      localStorage.setItem('storeProductSearchText',this.common.storeProductSearchText);
      this.getProducts();
    }
  }

}
