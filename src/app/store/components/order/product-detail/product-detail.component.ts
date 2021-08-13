import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Common } from '../../../utility/common';
import { StoreService } from '../../../service/store.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SharedService } from '../../../../shared/services/shared.service';
import { HttpClientService } from '../../../../shared/services/http-client.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Enum } from '../../../../shared/config/enum.enum';
import { AppUrl } from '../../../../shared/config/app-url.enum';
import { forkJoin, Subscription } from 'rxjs';
import { Util } from '../../../../shared/services/util';
import { LeftPanelCategoryService } from '../left-panel-category.service';
import { MatTableDataSource } from '@angular/material';
import 'rxjs/add/observable/combineLatest';
import Drift from 'drift-zoom';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @ViewChild('img') img: ElementRef;
  defaultImageSrc: string = "./assets/images/frame-landscape-placeholder.svg";
  id: number = 0;
  productData: any = [];
  imagesSrcArr = [];
  otherResourceArr = [];
  primaryImage: any = [];
  enum: Enum;
  isEventEnabled: boolean = false;
  isKitDetail: boolean = false;
  navigationSubscription: Subscription;
  displayedColumns: string[] = ['ProductNo', 'ProductName', 'Quantity'];
  dataSource = new MatTableDataSource();
  isOnlyViewStore: boolean = false;
  isFromReview:boolean = false;
  ProductDetailUploadImageSpace: any;
  productDetailLoaderCheck: boolean = false;   //Loader flag for the media files.
  constructor(private storeService: StoreService, private http: HttpClientService, public _domSanitizationService: DomSanitizer, private router: Router,
    public common: Common, private _activatedRoute: ActivatedRoute, private sharedService: SharedService,
    private util: Util, public categoryService: LeftPanelCategoryService) {
  }

  ngOnInit() {
    //retain the product search text
    this.common.storeProductSearchText = localStorage.getItem('storeProductSearchText') ? localStorage.getItem('storeProductSearchText') : '';
    if(this.common.storeProductSearchText){
      this.common.isStoreProductSearched = true;
    }
    this.id = this._activatedRoute.snapshot.params['id'] ? this._activatedRoute.snapshot.params['id'] : 0;
    this.isKitDetail = JSON.parse(this._activatedRoute.queryParams['value'].kit);
    this.isFromReview = this._activatedRoute.queryParams['value'].fromReview? JSON.parse(this._activatedRoute.queryParams['value'].fromReview) : false;
    if (this.id > 0) {
      if (this.categoryService.categoryData.length == 0) { // If we have category data then no need to load again
        this.categoryService.getCategories();
      }
      this.common.userEventEnabled.subscribe(response => {
        this.isEventEnabled = response;

        //Only show browse product page if view store is true else show all
        this.isOnlyViewStore = this.common.isViewStore() ? true : false;

        this.getProductDetail();
      });
    }
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.id = this._activatedRoute.params['value'].id;
        this.isKitDetail = JSON.parse(this._activatedRoute.queryParams['value'].kit);
        this.isFromReview = this._activatedRoute.queryParams['value'].fromReview? JSON.parse(this._activatedRoute.queryParams['value'].fromReview) : false;
        this.primaryImage = [];
        this.getProductDetail();
      }
    });

    //get a single subscription to both the queryParams and Params by combining the observables by using Observable.combineLatest before subscribing
    // var obsComb = Observable.combineLatest(this._activatedRoute.params, this._activatedRoute.queryParams,
    //   (params, qparams) => ({ params, qparams }));
    // this.subscription = obsComb.subscribe((val: any) => {
    //   if (val.qparams['kit']) {
    //     this.isKitDetail = JSON.parse(val.qparams['kit']);
    //   }
    //   //the router doesnot reconstruct the component, so we have to subscribe the activated route to detect for changes
    //   this.id = val.params['id'] ? val.params['id'] : 0;
    //   if (this.id > 0) {
    //     if (this.categoryService.categoryData.length == 0) { // If we have category data then no need to load again
    //       this.categoryService.getCategories();
    //     }
    //     this.common.userEventEnabled.subscribe(response => {
    //       this.isEventEnabled = response;
    //       this.getProductDetail();
    //     });
    //   }
    // });
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
    if(this.navigationSubscription){
    this.navigationSubscription.unsubscribe();
    }
  }

  getProductDetail() {
    this.util.hideLoader = true;
    if (this.isEventEnabled && localStorage.getItem('eventStartDate')) {
      this.getProducts();
    }
    else if (!this.isEventEnabled && !localStorage.getItem('eventStartDate')) {
      this.getProducts();
    }
  }

  getProducts() {
    this.util.hideLoader = true;
    let param: any = {
      clientId: this.common.storeClientInfo.id,
      fromDate: this.isEventEnabled == true ? localStorage.getItem('eventStartDate') : null,
      toDate: this.isEventEnabled == true ? localStorage.getItem('eventEndDate') : null
    }
    this.isKitDetail ? param['kitId'] = this.id : param['productId'] = this.id;
    let request = this.isKitDetail ? this.storeService.getKitDetail(param) : this.storeService.getProductDetail(param);
    request.subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        if (response.response) {
          this.productData = response.response;
          this.common.placeOrderObj.orderDetails.forEach(orderedItem => {
            if (this.id == orderedItem.productId) {
              this.productData.alreadyAddedCartQuantity = orderedItem.orderedQuantity;
            }
          });
          this.productData.orderedQuantity = 0;
          this.getImageResources();
        }
      });
    });
  }

  getImageResources() {
    // We have only 3 image fixed so simply create an array with default Values
    this.imagesSrcArr = [];
    this.otherResourceArr = [];
     this.util.hideLoader = true;
    let requests = [];
    if (this.productData.productResources.length > 0) {
      this.productData.productResources.forEach((element) => {
        if (element.type == Enum.ProductImages) {
          if (this.productData.isKit) {
            requests.push(this.http.getFiles(AppUrl.downloadKitResource, { pathVariable: element.id, kitId: this.id, type: Enum.Kit_OtherResources })); // here type is 1 so that actual file is downloaded
          } else {
            requests.push(this.http.getFiles(AppUrl.productResource, { pathVariable: this.id, resourceId: element.id })); // put all GET request for images in array
          }
          if (element.isPrimary) {          //to save the resource id in the main product data so that id is available at time of add to cart
            this.productData.resourceId = element.id;
          }
          element.imgClass = this.util.checkImageType(element.actualImgDimension.imgWidth, element.actualImgDimension.imgHeight); //get the type of image structure
          this.imagesSrcArr.push({ resourceId: element.id, isPrimary: element.isPrimary, url: this.defaultImageSrc, imgClass: element.imgClass });
        } else {
          this.otherResourceArr.push({ fileName: element.fileName, resourceId: element.id });
        }
      });
      //this.pushDefaultValuesInImageArr();
      if (requests.length > 0) {
        this.getImages(requests);
      }
    }
    else {
      //this.pushDefaultValuesInImageArr();
    }
  }


  // pushDefaultValuesInImageArr() {
  //   // we need 3 image items
  //   let len = this.imagesSrcArr.length;
  //   if (len < 3) {
  //     for (let i = len; i < 3; i++) {
  //       this.imagesSrcArr.push({ resourceId: 0, isPrimary: false, url: this.defaultImageSrc, imgClass: 'img-square' });
  //     }
  //   }
  // }

  getImages(requests) {
    this.util.hideLoader = true;          // we dont need loader to load images 
   this.productDetailLoaderCheck = true;                //showing a loader on each Image card while the images are being fetched
    // used spread operator here
    forkJoin(...requests).subscribe(response => {
      response.forEach((element, i) => {
        if (element.body.type != 'application/json') { // application/json means there is no any image and we get error product image not found for this case
          const data = window.URL.createObjectURL(element.body);
          this.imagesSrcArr[i].url = data; // update URL 
        }
        else {
          console.log('someting went wrong to fetch Images from server...');
        }
        this.productDetailLoaderCheck = false;  //hiding the loaders on the image card section when images are already fetched
      });
      let index = this.imagesSrcArr.indexOf(this.imagesSrcArr.find(x => x.isPrimary == true));
      if (index != -1) {
        this.primaryImage.url = this.imagesSrcArr[index].url;
        this.primaryImage.imgClass = this.imagesSrcArr[index].imgClass;
      } else {
        this.primaryImage.url = this.imagesSrcArr[0].url;
        this.primaryImage.imgClass = this.imagesSrcArr[0].imgClass;
      }

      //For image magnify
      var demoTrigger = document.querySelector('.demo-trigger');
      var paneContainer = document.querySelector('.detail');

      new Drift(demoTrigger, {
        paneContainer: paneContainer,
        inlinePane: false,
      });
      this.img.nativeElement.setAttribute("data-zoom", this.primaryImage.url);
    });
  }

  downloadFile(id) {
    let param: any;
    let request: any;
    if (this.productData.isKit) {
      param = {
        pathVariable: id,
        kitId: this.id,
        type: Enum.Kit_OtherResources  //for other resource files
      }
      request = this.http.getFiles(AppUrl.downloadKitResource, param);
    } else {
      param = {
        pathVariable: this.id,
        resourceId: id,
      }
      request = this.http.getFiles(AppUrl.productResource, param);
    }
    request.subscribe((response: any) => {
      this.util.downloadFile(response);
    }, error => this.sharedService.onError(error));
  }

  // View the full size image if any image is clicked
  viewImage(url, imgClass) {
    this.primaryImage.url = url;
    this.primaryImage.imgClass = imgClass;
    this.img.nativeElement.setAttribute("data-zoom", this.primaryImage.url);
  }


  /** called for getting the value of selected category */
  changedCategoryId(data: any) {
    if (data) {
      this.categoryService.categoryId = data;
      this.router.navigate(['/order/placeorder']);
    }
  }

  /**
   * Add product to cart and on its success , check for following conditions
   * Firstly check for on demand graphics, if available then capture its information and on its success 
   * check for associate ordering else directly check for associate ordering
   */
  onAddCart() {
    this.storeService.addToCart(this.productData);
    //if (!this.productData.quantityError && this.productData.orderedQuantity > 0) {
    //this.common.addToCart(this.productData,false);
    //  this.sharedService.openToast('s', AppMessage.U0090);
    //}
  }

  // getAssociateOrdering(value){
  //   if (value.length > 0) {
  //     this.dialog.open(AssociatedOrderingComponent, {
  //       data: {
  //         steps: value,
  //         item: this.productData
  //       }
  //     });
  //   }
  // }

  navigateToProductDetail(id) {
    //this.common.isKitDetail.next(false);
    this.router.navigate(['/order/product/' + id], { queryParams: { kit: false } });
  }

  //This method toggles the category tree in mobile screens only
  openCategoriesPopup() {
    this.common.isSelectedCategoryChanged = !this.common.isSelectedCategoryChanged;
  }

  backToReview(){
    this.router.navigate(['/order/revieworder'])
  }
  backToPlaceorder(){
    this.router.navigate(['/order/placeorder'])
  }
}
