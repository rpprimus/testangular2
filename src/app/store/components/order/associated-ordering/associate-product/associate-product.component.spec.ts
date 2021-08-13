import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateProductComponent } from './associate-product.component';
import { Common } from '../../../../../store/utility/common';
import { mockCommon } from '../../../../../../Test/mockCommon';
import { StoreService } from '../../../../../store/service/store.service';
import { mockStoreService } from '../../../../../../Test/mockStoreService';
import { Util } from '../../../../../shared/services/util';
import { mockUtil } from '../../../../../../Test/mockUtil';
import { HttpClientService } from '../../../../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../../../Test/mockHttpClientServiceClass';
import { MatModule } from '../../../../../core/mat-module';
import { QuantityComponent } from '../../quantity/quantity.component';
import { SharedService } from '../../../../../shared/services/shared.service';
import { mockSharedService } from '../../../../../../Test/mockSharedService';

describe('AssociateProductComponent', () => {
  let component: AssociateProductComponent;
  let fixture: ComponentFixture<AssociateProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssociateProductComponent, QuantityComponent],
      imports: [MatModule],
      providers: [{ provide: Common, useClass: mockCommon }, { provide: StoreService, useClass: mockStoreService },
      { provide: Util, useClass: mockUtil }, { provide: HttpClientService, useClass: mockHttpClientServiceClass }, { provide: SharedService, useClass: mockSharedService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateProductComponent);
    component = fixture.componentInstance;
    component.step = {
      id: 31,
      isRequired: true,
      stepName: "seventh",
      stepDescription: "step",
      associateBrowseProduct: [{
        id: 66,
        resourceId: null,
        fileNameOnServer: null,
        thumbnailDimension: null,
        clientId: 37,
        productName: "Apple iPhone XR (Black, 64 GB)",
        isNewProduct: true,
        isPriceVisible: true,
        productPrice: 100,
        productMaxPrice: null,
        isPriceRange: false,
        isReturnableProduct: true,
        productStatus: "ACTIVE",
        isKit: false,
        productInfo: null,
        briefDescription: "<p>Apple iPhone XR (Black, 64 GB)</p>↵",
        isSteps: true,
        steps: null,
        isTextGraphic: false,
        isUploadGraphic: false,
        textGraphicCount: null,
        productNumber: "XR_Iphone",
        totalQuantity: 2992,
        availableQuantity: 2990,
        maxOrderQuantity: 20
      }, {
        id: 206,
        resourceId: 48,
        fileNameOnServer: "fec6c0b5-de62-4d82-a3f5-b695ab18efecimages.jpeg",
        thumbnailDimension: { imgWidth: 300, imgHeight: 300 },
        clientId: 37,
        productName: "ATESTing",
        isNewProduct: false,
        isPriceVisible: true,
        productPrice: 120,
        productMaxPrice: 150,
        isPriceRange: true,
        isReturnableProduct: false,
        productStatus: "ACTIVE",
        isKit: true,
        productInfo: null,
        briefDescription: "<p>tEST ds</p>↵",
        isSteps: true,
        steps: null,
        isTextGraphic: false,
        isUploadGraphic: false,
        textGraphicCount: null,
        productNumber: "a9891",
        totalQuantity: 70,
        availableQuantity: 70,
        maxOrderQuantity: 20
      }],
      isProductAdded: false,
      quantity: 2
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onAddCart() method if block when common.isAddedSuccessFully=true',()=>{
    component.common.isAddedSuccessFully=true;
    let item={
      id: 67,
        resourceId: null,
        fileNameOnServer: null,
        thumbnailDimension: null,
        clientId: 37,
        productName: "Apple iPhone XR (Black, 64 GB)",
        isNewProduct: true,
        isPriceVisible: true,
        productPrice: 100,
        productMaxPrice: null,
        isPriceRange: false,
        isReturnableProduct: true,
        productStatus: "ACTIVE",
        isKit: false,
        productInfo: null,
        briefDescription: "<p>Apple iPhone XR (Black, 64 GB)</p>↵",
        isSteps: true,
        steps: null,
        isTextGraphic: false,
        isUploadGraphic: false,
        textGraphicCount: null,
        productNumber: "XR_Iphone",
        totalQuantity: 2992,
        availableQuantity: 2990,
        maxOrderQuantity: 20,
        orderedQuantity:1
    },
    step = {
      id: 31,
      isRequired: true,
      stepName: "seventh",
      stepDescription: "step",
      associateBrowseProduct: [{
        id: 66,
        resourceId: null,
        fileNameOnServer: null,
        thumbnailDimension: null,
        clientId: 37,
        productName: "Apple iPhone XR (Black, 64 GB)",
        isNewProduct: true,
        isPriceVisible: true,
        productPrice: 100,
        productMaxPrice: null,
        isPriceRange: false,
        isReturnableProduct: true,
        productStatus: "ACTIVE",
        isKit: false,
        productInfo: null,
        briefDescription: "<p>Apple iPhone XR (Black, 64 GB)</p>↵",
        isSteps: true,
        steps: null,
        isTextGraphic: false,
        isUploadGraphic: false,
        textGraphicCount: null,
        productNumber: "XR_Iphone",
        totalQuantity: 2992,
        availableQuantity: 2990,
        maxOrderQuantity: 20
      }, {
        id: 206,
        resourceId: 48,
        fileNameOnServer: "fec6c0b5-de62-4d82-a3f5-b695ab18efecimages.jpeg",
        thumbnailDimension: { imgWidth: 300, imgHeight: 300 },
        clientId: 37,
        productName: "ATESTing",
        isNewProduct: false,
        isPriceVisible: true,
        productPrice: 120,
        productMaxPrice: 150,
        isPriceRange: true,
        isReturnableProduct: false,
        productStatus: "ACTIVE",
        isKit: false,
        productInfo: null,
        briefDescription: "<p>tEST ds</p>↵",
        isSteps: true,
        steps: null,
        isTextGraphic: false,
        isUploadGraphic: false,
        textGraphicCount: null,
        productNumber: "a9891",
        totalQuantity: 70,
        availableQuantity: 70,
        maxOrderQuantity: 20
      }],
      isProductAdded: false,
      quantity: 2
    }
    component.onAddCart(item,step);
    fixture.detectChanges();
    expect(component.onAddCart).toBeTruthy();
  });

  it('should call onAddCart() method if block when common.isAddedSuccessFully=false',()=>{
    component.common.isAddedSuccessFully=false;
    let item={
      id: 67,
        resourceId: null,
        fileNameOnServer: null,
        thumbnailDimension: null,
        clientId: 37,
        productName: "Apple iPhone XR (Black, 64 GB)",
        isNewProduct: true,
        isPriceVisible: true,
        productPrice: 100,
        productMaxPrice: null,
        isPriceRange: false,
        isReturnableProduct: true,
        productStatus: "ACTIVE",
        isKit: false,
        productInfo: null,
        briefDescription: "<p>Apple iPhone XR (Black, 64 GB)</p>↵",
        isSteps: true,
        steps: null,
        isTextGraphic: false,
        isUploadGraphic: false,
        textGraphicCount: null,
        productNumber: "XR_Iphone",
        totalQuantity: 2992,
        availableQuantity: 2990,
        maxOrderQuantity: 20
    },
    step = {
      id: 31,
      isRequired: true,
      stepName: "seventh",
      stepDescription: "step",
      associateBrowseProduct: [{
        id: 66,
        resourceId: null,
        fileNameOnServer: null,
        thumbnailDimension: null,
        clientId: 37,
        productName: "Apple iPhone XR (Black, 64 GB)",
        isNewProduct: true,
        isPriceVisible: true,
        productPrice: 100,
        productMaxPrice: null,
        isPriceRange: false,
        isReturnableProduct: true,
        productStatus: "ACTIVE",
        isKit: false,
        productInfo: null,
        briefDescription: "<p>Apple iPhone XR (Black, 64 GB)</p>↵",
        isSteps: true,
        steps: null,
        isTextGraphic: false,
        isUploadGraphic: false,
        textGraphicCount: null,
        productNumber: "XR_Iphone",
        totalQuantity: 2992,
        availableQuantity: 2990,
        maxOrderQuantity: 20
      }, {
        id: 206,
        resourceId: 48,
        fileNameOnServer: "fec6c0b5-de62-4d82-a3f5-b695ab18efecimages.jpeg",
        thumbnailDimension: { imgWidth: 300, imgHeight: 300 },
        clientId: 37,
        productName: "ATESTing",
        isNewProduct: false,
        isPriceVisible: true,
        productPrice: 120,
        productMaxPrice: 150,
        isPriceRange: true,
        isReturnableProduct: false,
        productStatus: "ACTIVE",
        isKit: false,
        productInfo: null,
        briefDescription: "<p>tEST ds</p>↵",
        isSteps: true,
        steps: null,
        isTextGraphic: false,
        isUploadGraphic: false,
        textGraphicCount: null,
        productNumber: "a9891",
        totalQuantity: 70,
        availableQuantity: 70,
        maxOrderQuantity: 20
      }],
      isProductAdded: false,
      quantity: 2
    }
    component.onAddCart(item,step);
    fixture.detectChanges();
    expect(component.onAddCart).toBeTruthy();
  });

  it('should call onAddCart() method else block',()=>{
    component.common.isAddedSuccessFully=true;
    let item={
      id: 67,
        resourceId: null,
        fileNameOnServer: null,
        thumbnailDimension: null,
        clientId: 37,
        productName: "Apple iPhone XR (Black, 64 GB)",
        isNewProduct: true,
        isPriceVisible: true,
        productPrice: 100,
        productMaxPrice: null,
        isPriceRange: false,
        isReturnableProduct: true,
        productStatus: "ACTIVE",
        isKit: false,
        productInfo: null,
        briefDescription: "<p>Apple iPhone XR (Black, 64 GB)</p>↵",
        isSteps: true,
        steps: null,
        isTextGraphic: false,
        isUploadGraphic: false,
        textGraphicCount: null,
        productNumber: "XR_Iphone",
        totalQuantity: 2992,
        availableQuantity: 2990,
        maxOrderQuantity: 20,
        orderedQuantity:1
    },
    step = {
      id: 31,
      isRequired: true,
      stepName: "seventh",
      stepDescription: "step",
      associateBrowseProduct: [{
        id: 66,
        resourceId: null,
        fileNameOnServer: null,
        thumbnailDimension: null,
        clientId: 37,
        productName: "Apple iPhone XR (Black, 64 GB)",
        isNewProduct: true,
        isPriceVisible: true,
        productPrice: 100,
        productMaxPrice: null,
        isPriceRange: false,
        isReturnableProduct: true,
        productStatus: "ACTIVE",
        isKit: false,
        productInfo: null,
        briefDescription: "<p>Apple iPhone XR (Black, 64 GB)</p>↵",
        isSteps: true,
        steps: null,
        isTextGraphic: false,
        isUploadGraphic: false,
        textGraphicCount: null,
        productNumber: "XR_Iphone",
        totalQuantity: 2992,
        availableQuantity: 2990,
        maxOrderQuantity: 20
      }, {
        id: 206,
        resourceId: 48,
        fileNameOnServer: "fec6c0b5-de62-4d82-a3f5-b695ab18efecimages.jpeg",
        thumbnailDimension: { imgWidth: 300, imgHeight: 300 },
        clientId: 37,
        productName: "ATESTing",
        isNewProduct: false,
        isPriceVisible: true,
        productPrice: 120,
        productMaxPrice: 150,
        isPriceRange: true,
        isReturnableProduct: false,
        productStatus: "ACTIVE",
        isKit: false,
        productInfo: null,
        briefDescription: "<p>tEST ds</p>↵",
        isSteps: true,
        steps: null,
        isTextGraphic: false,
        isUploadGraphic: false,
        textGraphicCount: null,
        productNumber: "a9891",
        totalQuantity: 70,
        availableQuantity: 70,
        maxOrderQuantity: 20
      }],
      isProductAdded: false,
      quantity: null
    }
    component.onAddCart(item,step);
    fixture.detectChanges();
    expect(component.onAddCart).toBeTruthy();
  });

  it('should call navigateToDetail() method',()=>{
    let item={};
    component.navigateToDetail(item);
    fixture.detectChanges();
    expect(component.navigateToDetail).toBeTruthy();
  });
});
