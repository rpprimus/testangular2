import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowseProductComponent } from './browse-product.component';
import { StoreCategoriesComponent } from '../../store-categories/store-categories.component';
import { MatModule } from '../../../../core/mat-module';
import { HeaderFooterNote } from '../header-footer-note';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedService } from '../../../../shared/services/shared.service';
import { mockSharedService } from '../../../../../Test/mockSharedService';
import { StoreService } from '../../../service/store.service';
import { mockStoreService } from '../../../../../Test/mockStoreService';
import { HttpClientService } from '../../../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../../Test/mockHttpClientServiceClass';
import { Util } from '../../../../shared/services/util';
import { mockUtil } from '../../../../../Test/mockUtil';
import { Common } from '../../../../store/utility/common';
import { mockCommon } from '../../../../../Test/mockCommon';
import { RouterTestingModule } from '@angular/router/testing';
import { LeftPanelCategoryService } from '../left-panel-category.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventPopUpComponent } from '../event-pop-up/event-pop-up.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute } from '@angular/router';
import { isListLikeIterable } from '@angular/core/src/change_detection/change_detection_util';
import { of } from 'rxjs';
import { mockLeftPanelCategoryServive } from '../../../../../Test/mockLeftPanelCategoryService';
import { MatDialog, MatDialogRef } from '@angular/material';

describe('BrowseProductComponent', () => {
  let component: BrowseProductComponent;
  let fixture: ComponentFixture<BrowseProductComponent>;
  let common:Common;
  let  paginationInfo= {
    "pageSize": 5,
    "totalPages": 16,
    "totalRecords": 76,
    "curPage": 1
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseProductComponent ,StoreCategoriesComponent,HeaderFooterNote,EventPopUpComponent],
      providers:[
        { provide: SharedService, useClass: mockSharedService },
        { provide: StoreService, useClass: mockStoreService },
        { provide: HttpClientService, useClass: mockHttpClientServiceClass },
        { provide: Util, useClass: mockUtil },
        { provide: Common, useClass: mockCommon },
        {provide: MatDialog, useClass: MatDialogMock},
        { provide: LeftPanelCategoryService, useClass: mockLeftPanelCategoryServive },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
                routeConfig:{
                  path:"resetpassword/:id"
                },
                params:{
                  id:"210",
                  
                  pageSize:11,
                  pageNumber:22,
                  fromDate:"11-18-2018",
                  toDaTe:"12-08-2018",
                  length:"5",
                  clientId:"10",
                  categoryId:"222",
                  sortBy:""

                }  ,
                queryParams:{
                  ClientId:"2", 
                  kit:{
                    isKit:true
                  }
                }    
                },
            },
        }, 
      ],
      
      imports:[RouterTestingModule.withRoutes([]),MatModule,BrowserAnimationsModule,InfiniteScrollModule],
      schemas:[CUSTOM_ELEMENTS_SCHEMA,]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
          entryComponents: [EventPopUpComponent]
      }
    }).compileComponents();  
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseProductComponent);
    component = fixture.componentInstance;
    localStorage.setItem('storeProductSearchText', "test");
   fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('test case for ongetProductSuccess() method ', () => {
    let isLoadKit="";
    let response="";
    let loadMore="";
    let curPage="";
    let  paginationInfo= {
      "pageSize": 5,
      "totalPages": 16,
      "totalRecords": 76,
      "curPage": 1}
    component.ongetProductSuccess(true,true,true);
    expect(component.ongetProductSuccess).toBeDefined();
    component.getImageResource();
    expect(component.getImageResource).toBeDefined();
    component.pushDataIntoPlaceOrderJson();
    expect(component.pushDataIntoPlaceOrderJson).toBeDefined();
  });
  it('test case for onScroll() method', () => {
    component.data.length=2;
    component.productTotalRecords=6;
    component.kitTotalRecords=2;
    component.onScroll();
    expect(component.onScroll).toBeDefined();
    component.getKits(false,1,true);
    expect(component.getKits).toBeDefined();
    expect(component.loadingProducts).toBeFalsy();
  });
 
  it('test case for changedCategoryId() method', () => {
    let data: any;
    component.changedCategoryId(data);
    expect(component.changedCategoryId).toBeDefined();
  });
  it('test case for onAddCart() method', () => {
    let item={availableQuantity: 30,
      briefDescription: null,
      clientId: 37,
      fileNameOnServer: "f4bedfb1-9d2e-4133-935f-f413d6237991leaf.jpeg",
      id: 212,
      imgClass: "img-rectangle",
      isKit: false,
      isNewProduct: true,
      isPriceRange: true,
      isPriceVisible: false,
      isReturnableProduct: true,
      isSteps: true,
      isTextGraphic: true,
      isUploadGraphic: false,
      maxOrderQuantity: 50,
      productInfo: null,
      productMaxPrice: 1598.68,
      productName: "Handkerchief",
      productNumber: "19012019",
      productPrice: 1200.88,
      productStatus: "ACTIVE",
      resourceId: 45,
      steps: null,
      textGraphicCount: null,
      thumbnailDimension: {imgWidth: 300, imgHeight: 209},
      totalQuantity: 30};
    component.onAddCart(item);
    expect(component.onAddCart).toBeDefined();
  });
 
  it('test case for openCategoryPopup', () => {
    component.openCategoryPopup();
    expect(component.openCategoryPopup).toBeDefined(); 
  });
  it('test case for getProducts() method ', () => {
    let length:"5";
    component.getProducts();
    expect(component.getProducts).toBeDefined();
  });
  it('test case for getBrowseProductList method', () => {   
      let pageNumber=1;
      let loadMore=true;
      component.isEventEnabled=true;
      component.getBrowseProductList();
      expect(component.getBrowseProductList).toBeDefined();
      expect(localStorage.getItem('eventEndDate')).toBeDefined();
      expect(component.isEventEnabled).toBeTruthy();
    });
   it('test case for openEventDialog() method', () => {
    let data={
      content:"select Event"
    }
    component.openEventDialog();
    expect(component.openEventDialog).toBeDefined();
  });
  it('test case for searchProduct method', () => {   
    component.common.storeProductSearchText= 'test';
    component.searchProduct();
    fixture.detectChanges();
    expect(component.searchProduct).toBeDefined();
    expect(component.common.isStoreProductSearched).toBeTruthy();
  });
  it('test case for onClearSearch method', () => {  
    component.common.storeProductSearchText= '';
    localStorage.setItem('storeProductSearchText', "");
    component.onClearSearch();
    fixture.detectChanges();
    expect(component.onClearSearch).toBeDefined();
    expect(component.common.isStoreProductSearched).toBeFalsy();
  });
})
//here the mock is used to call the afterCloased() method of MatDialog
export class MatDialogMock {
  open() {
      return {
          afterClosed: () => of( true )
      };
  }
}
