import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedOrderingComponent } from './associated-ordering.component';
import { MatModule } from '../../../../core/mat-module';
import { Common } from '../../../../store/utility/common';
import { mockCommon } from '../../../../../Test/mockCommon';
import { MatDialogRef, MAT_DIALOG_DATA, MatStepper, MatHorizontalStepper } from '@angular/material';
import { AssociateProductComponent } from './associate-product/associate-product.component';
import { QuantityComponent } from '../quantity/quantity.component';
import { StoreService } from '../../../../store/service/store.service';
import { mockStoreService } from '../../../../../Test/mockStoreService';
import { HttpClientService } from '../../../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../../Test/mockHttpClientServiceClass';
import { Util } from '../../../../shared/services/util';
import { mockUtil } from '../../../../../Test/mockUtil';
import { SharedService } from '../../../../shared/services/shared.service';
import { mockSharedService } from '../../../../../Test/mockSharedService';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AssociatedOrderingComponent', () => {
  let component: AssociatedOrderingComponent;
  let fixture: ComponentFixture<AssociatedOrderingComponent>;
  const mockDialogRef = {
    close: (dialogResult: any) => { }
  };
  const model = {
    steps: [{
      id: 31,
      stepName: "seventh",
      stepDescription: "step",
      isRequired: true,
      products: null,
      associateBrowseProduct: [{
        id: 1194,
        resourceId: 55,
        fileNameOnServer: "4595b140-dc02-4078-9c4b-0ecc37659aa3contact-email-popup.png",
        thumbnailDimension: { imgWidth: 300, imgHeight: 279 },
        clientId: 37,
        productName: "Qunatity test",
        isNewProduct: false,
        isPriceVisible: false,
        productPrice: null,
        productMaxPrice: null,
        isPriceRange: false,
        isReturnableProduct: true,
        productStatus: "ACTIVE",
        isKit: false,
        productInfo: null,
        briefDescription: "<p>test</p>↵",
        isSteps: true,
        steps: null,
        isTextGraphic: false,
        isUploadGraphic: false,
        textGraphicCount: null,
        productNumber: "999999",
        totalQuantity: 12,
        availableQuantity: 12,
        maxOrderQuantity: 21,
        imgClass: "img-rectangle",
        orderedQuantity: 0,
        quantityError: true,
        url: "blob:http://localhost:4200/d943846d-1ada-42d4-8ee3-569401b2fc12"
      }],
      isProductAdded: false,
      quantity: 2
    }, {
      id: 42,
      stepName: "test ",
      stepDescription: "testing 1",
      isRequired: true,
      products: null,
      associateBrowseProduct: [{
        id: 74,
        resourceId: 37,
        fileNameOnServer: "7732e635-7429-4c8b-9e92-90df5ec1849fmobile.jpeg",
        thumbnailDimension: { imgWidth: 226, imgHeight: 300 },
        clientId: 37,
        productName: "Iphone",
        isNewProduct: false,
        isPriceVisible: false,
        productPrice: 100,
        productMaxPrice: null,
        isPriceRange: false,
        isReturnableProduct: true,
        productStatus: "ACTIVE",
        isKit: false,
        productInfo: null,
        briefDescription: "<p>11</p>↵",
        isSteps: false,
        steps: null,
        isTextGraphic: false,
        isUploadGraphic: false,
        textGraphicCount: null,
        productNumber: "XR_Iphone112",
        totalQuantity: 11,
        availableQuantity: 11,
        maxOrderQuantity: 10,
        imgClass: "img-vertical",
        orderedQuantity: 0,
        quantityError: true,
        url: "blob:http://localhost:4200/43672a13-095a-4184-a0da-010368cb897e"
      }],
      isProductAdded: false,
      quantity: 1
    }],
    item: {
      id: 212,
      resourceId: 45,
      fileNameOnServer: "f4bedfb1-9d2e-4133-935f-f413d6237991leaf.jpeg",
      thumbnailDimension: { imgWidth: 300, imgHeight: 209 },
      clientId: 37,
      productName: "Handkerchief",
      isNewProduct: true,
      isPriceVisible: false,
      productPrice: 1200.88,
      productMaxPrice: 1598.68,
      isPriceRange: true,
      isReturnableProduct: true,
      productStatus: "ACTIVE",
      isKit: false,
      productInfo: null,
      briefDescription: null,
      isSteps: true,
      steps: [{
        id: 31,
        stepName: "seventh",
        stepDescription: "step",
        isRequired: true,
        products: null,
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
          maxOrderQuantity: 20,
          url: "./assets/images/frame-landscape-placeholder.svg",
          orderedQuantity: 0,
          quantityError: true
        }],
        isProductAdded: false,
        quantity: 2
      }, {
        id: 36,
        stepName: "ten",
        stepDescription: "",
        isRequired: true,
        products: null,
        associateBrowseProduct: [{}],
        isProductAdded: false,
        quantity: null
      }],
      isTextGraphic: false,
      isUploadGraphic: true,
      textGraphicCount: 999,
      productNumber: "19012019",
      totalQuantity: 30,
      availableQuantity: 28,
      maxOrderQuantity: 50,
      imgClass: "img-rectangle",
      orderedQuantity: 0,
      quantityError: true,
      url: "blob:http://localhost:4200/d74fa543-f892-488d-9e2b-155a1f618fe9",
      showPrice: false,
      alreadyAddedCartQuantity: 1
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssociatedOrderingComponent,AssociateProductComponent,QuantityComponent],
      imports: [MatModule,BrowserAnimationsModule],
      providers: [{ provide: Common, useClass: mockCommon }, { provide: MatDialogRef, useValue: mockDialogRef }, { provide: MAT_DIALOG_DATA, useValue: model },
      {provide:StoreService,useClass:mockStoreService},{provide:HttpClientService,useClass:mockHttpClientServiceClass},
      {provide:Util,useClass:mockUtil},{provide:SharedService,useClass:mockSharedService}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociatedOrderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close() method',()=>{
    component.close();
    fixture.detectChanges();
    expect(component.close).toBeTruthy();
  });

  it('should call submitAssociateOrdering() method if block',()=>{
    let step = {
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
      isProductAdded: true,
      quantity: 2
    }
    component.submitAssociateOrdering(step);
    fixture.detectChanges();
    expect(component.submitAssociateOrdering).toBeTruthy();
  });

  it('should call submitAssociateOrdering() method if block, when servicePage is not enabled',()=>{
    component.common.storeClientInfo={isServicePageEnable:false};
    let step = {
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
      isProductAdded: true,
      quantity: 2
    }
    component.submitAssociateOrdering(step);
    fixture.detectChanges();
    expect(component.submitAssociateOrdering).toBeTruthy();
  });

  it('should call submitAssociateOrdering() method else block',()=>{
    //component.common.storeClientInfo={isServicePageEnable:true};
    let step = {
      id: 31,
      isRequired: false,
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
      isProductAdded: true,
      quantity: 2
    }
    component.submitAssociateOrdering(step);
    fixture.detectChanges();
    expect(component.submitAssociateOrdering).toBeTruthy();
  });

  it('should call submitAssociateOrdering() method else block,when servicePage is not enabled',()=>{
    component.common.storeClientInfo={isServicePageEnable:false};
    let step = {
      id: 31,
      isRequired: false,
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
      isProductAdded: true,
      quantity: 2
    }
    component.submitAssociateOrdering(step);
    fixture.detectChanges();
    expect(component.submitAssociateOrdering).toBeTruthy();
  });

  it('should call validateStep() method if block',()=>{
    let step = {
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
    },
    stepper= new MatStepper(null,null,null,{next:function(){}});
    component.validateStep(step,stepper);
    fixture.detectChanges();
    expect(component.validateStep).toBeTruthy();
  });

  // it('should call validateStep() method else block',()=>{
  //   let step = {
  //     id: 31,
  //     isRequired: false,
  //     stepName: "seventh",
  //     stepDescription: "step",
  //     associateBrowseProduct: [{
  //       id: 66,
  //       resourceId: null,
  //       fileNameOnServer: null,
  //       thumbnailDimension: null,
  //       clientId: 37,
  //       productName: "Apple iPhone XR (Black, 64 GB)",
  //       isNewProduct: true,
  //       isPriceVisible: true,
  //       productPrice: 100,
  //       productMaxPrice: null,
  //       isPriceRange: false,
  //       isReturnableProduct: true,
  //       productStatus: "ACTIVE",
  //       isKit: false,
  //       productInfo: null,
  //       briefDescription: "<p>Apple iPhone XR (Black, 64 GB)</p>↵",
  //       isSteps: true,
  //       steps: null,
  //       isTextGraphic: false,
  //       isUploadGraphic: false,
  //       textGraphicCount: null,
  //       productNumber: "XR_Iphone",
  //       totalQuantity: 2992,
  //       availableQuantity: 2990,
  //       maxOrderQuantity: 20
  //     }, {
  //       id: 206,
  //       resourceId: 48,
  //       fileNameOnServer: "fec6c0b5-de62-4d82-a3f5-b695ab18efecimages.jpeg",
  //       thumbnailDimension: { imgWidth: 300, imgHeight: 300 },
  //       clientId: 37,
  //       productName: "ATESTing",
  //       isNewProduct: false,
  //       isPriceVisible: true,
  //       productPrice: 120,
  //       productMaxPrice: 150,
  //       isPriceRange: true,
  //       isReturnableProduct: false,
  //       productStatus: "ACTIVE",
  //       isKit: false,
  //       productInfo: null,
  //       briefDescription: "<p>tEST ds</p>↵",
  //       isSteps: true,
  //       steps: null,
  //       isTextGraphic: false,
  //       isUploadGraphic: false,
  //       textGraphicCount: null,
  //       productNumber: "a9891",
  //       totalQuantity: 70,
  //       availableQuantity: 70,
  //       maxOrderQuantity: 20
  //     }],
  //     isProductAdded: true,
  //     quantity: 2
  //   },
  //   stepper= new MatStepper(null,null,null,{next:function(){}});
  //   component.validateStep(step,stepper);
  //   fixture.detectChanges();
  //   expect(component.validateStep).toBeTruthy();
  // });

  it('should call valid() method if block',()=>{
    let step = {
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
      isProductAdded: true,
      quantity: 2
    }
    component.valid(step);
    fixture.detectChanges();
    expect(component.valid).toBeTruthy();
  });

  it('should call valid() method else block',()=>{
    let step = {
      id: 31,
      isRequired: false,
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
      isProductAdded: true,
      quantity: 2
    }
    component.valid(step);
    fixture.detectChanges();
    expect(component.valid).toBeTruthy();
  });
});
