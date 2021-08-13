import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Common } from '../../../../utility/common';
import { Util } from '../../../../../shared/services/util';
import { AppUrl } from '../../../../../shared/config/app-url.enum';
import { HttpClientService } from '../../../../../shared/services/http-client.service';
import { Enum } from '../../../../../shared/config/enum.enum';
import { AppMessage } from '../../../../../shared/config/app-message.enum';
import { SharedService } from '../../../../../shared/services/shared.service';
import { StoreService } from './../../../../../store/service/store.service';

@Component({
  selector: 'app-associate-product',
  templateUrl: './associate-product.component.html',
  styleUrls: ['./associate-product.component.scss']
})
export class AssociateProductComponent implements OnInit {

  @Input()step :any;
  defaultImageSrc: string = "./assets/images/frame-landscape-placeholder.svg";
  isViewOnlyStore: boolean = false;
  isAssociateProductDetail:boolean = false;
  productData:any = {};
  //stepProduct: any = [];
  enum = Enum;
  constructor(public _domSanitizationService: DomSanitizer,public common: Common, private storeService: StoreService,
    private http: HttpClientService,private util:Util,private sharedService:SharedService) {
     }

  ngOnInit() {
     this.common.userEventEnabled.subscribe(response => {
      //Only show browse product page if view store is true else show all
      this.isViewOnlyStore = this.common.isViewStore() ? true : false;
    });
    if(this.step.associateBrowseProduct.length > 0){
      this.getImageResource();
    }
  }

  /**
   * If step level quantity is defined then validate else directly add to cart
   * @param item item to be added
   * @param step step in which items are to be added: needed for step level quantity validation
   */
  onAddCart(item, step) {
    item['showPrice'] = item.isPriceVisible;
    if(step.quantity){
      if(!step.addedCountFromStep){
        step.addedCountFromStep = 0;
       }
      //  if(step.quantity != step.addedCountFromStep){
        if((step.addedCountFromStep + item.orderedQuantity) <= step.quantity){
         
        //this.common.addToCart(item,true);
        this.storeService.addToCart(item);
        if(this.common.isAddedSuccessFully){
          this.step.isProductAdded = true;
          // step.addedCountFromStep += 1;
          step.addedCountFromStep = step.addedCountFromStep + item.alreadyAddedCartQuantity;
        }
       }else{
        this.sharedService.openToast('e', AppMessage.U0167);
       }
    }else{
      //this.common.addToCart(item,true);
      this.storeService.addToCart(item);
      if(this.common.isAddedSuccessFully){
        this.step.isProductAdded = true;
      }
    }
    
   
  }

  navigateToDetail(item) {
    this.isAssociateProductDetail = true;
    this.productData = item;
  }

  getImageResource() {
    this.util.hideLoader = true; // we dont need loader to load images
    this.step.associateBrowseProduct.forEach((element) => {
      if (element.resourceId) {
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
        });
      }
      else {
        element.url = this.defaultImageSrc;
      }
    });
  }

}
