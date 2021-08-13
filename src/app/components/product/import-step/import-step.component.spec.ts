import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportStepComponent } from './import-step.component';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { ProductsService } from '../products.service';
import { mockProductsService } from '../../../../Test/mockProductsService';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { MatModule } from '../../../core/mat-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ImportStepComponent', () => { 
  let component: ImportStepComponent;
  let fixture: ComponentFixture<ImportStepComponent>;
  const mockDialogRef = {
    close: (dialogResult: any) => { }
  };
  const model = {"steps": [
    {
      "id": 8,
      "stepName": "tesijnfgd",
      "stepDescription": "tesijnfgdnn",
      "isRequired": true,
      "products": new MatTableDataSource([
        {
          "id": 43,
          "productId": 0,
          "productNumber": "XR_Iphone",
          "productName": "Apple iPhone XR (Black, 64 GB)",
          "minQuantity": 1,
          "resouceId": 41,
          "categories": "iPhone, test 1",
          "maxOrderQuantity": 20,
        },
        {
          "id": 57,
          "productId": 66,
          "productNumber": "XR_Iphone",
          "productName": "Apple iPhone XR (Black, 64 GB)",
          "minQuantity": 1,
          "resouceId": 41,
          "categories": "iPhone, test 1",
          "maxOrderQuantity": 20,
        }
      ]),
      "associateBrowseProduct": null,
      "isProductAdded": false,
      "quantity": null
    },
    {
      "id": 39,
      "stepName": "Step N3",
      "stepDescription": "Step3 Desc Detail for testing",
      "isRequired": true,
      "products": new MatTableDataSource([
        {
          "id": 116,
          "productId": 66,
          "productNumber": "XR_Iphone",
          "productName": "Apple iPhone XR (Black, 64 GB)",
          "minQuantity": 1,
          "resouceId": 41,
          "categories": "iPhone, test 1",
          "maxOrderQuantity": 20
        },
        {
          "id": 117,
          "productId": 74,
          "productNumber": "XR_Iphone112",
          "productName": "Iphone",
          "minQuantity": 1,
          "resouceId": 37,
          "categories": "iPhone",
          "maxOrderQuantity": 10
        }
      ]),
      "associateBrowseProduct": null,
      "isProductAdded": false,
      "quantity": 2
    },
    {
      "id": 40,
      "stepName": "Step N4",
      "stepDescription": "Step 4 Description detail",
      "isRequired": true,
      "products": new MatTableDataSource([
        {
          "id": 118,
          "productId": 66,
          "productNumber": "XR_Iphone",
          "productName": "Apple iPhone XR (Black, 64 GB)",
          "minQuantity": 1,
          "resouceId": 41,
          "categories": "iPhone, test 1",
          "maxOrderQuantity": 20
        },
        {
          "id": 119,
          "productId": 74,
          "productNumber": "XR_Iphone112",
          "productName": "Iphone",
          "minQuantity": 1,
          "resouceId": 37,
          "categories": "iPhone",
          "maxOrderQuantity": 10
        },
        {
          "id": 120,
          "productId": 1471,
          "productNumber": "XR_Iphone_123",
          "productName": "XR_Iphone113",
          "minQuantity": 1,
          "resouceId": null,
          "categories": "Sports T-Shirt",
          "maxOrderQuantity": 4
        }
      ]),
      "associateBrowseProduct": null,
      "isProductAdded": false,
      "quantity": 4
    }
  ]};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImportStepComponent],
      imports: [MatModule,BrowserAnimationsModule],
      providers: [{ provide: SharedService, useClass: mockSharedService }, { provide: ProductsService, useClass: mockProductsService },
      { provide: MatDialogRef, useValue: mockDialogRef }, { provide: MAT_DIALOG_DATA, useValue: model }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchProduct() method',()=>{
    component.searchText="test";
    component.searchProduct();
    fixture.detectChanges();
    expect(component.searchProduct).toBeTruthy();
  });

  it('should call searchProduct() method should throw error',()=>{
    component.searchText="testt";
    component.searchProduct();
    fixture.detectChanges();
    expect(component.searchProduct).toBeTruthy();
  });

  it('should call getProductById() method',()=>{
    let option={productId:1},evt={source:{selected:true}};
    component.getProductById(option,evt);
    fixture.detectChanges();
    expect(component.getProductById).toBeTruthy();
  });

  it('should call getProductById() method should throw error',()=>{
    let option={productId:10},evt={source:{selected:true}};
    component.getProductById(option,evt);
    fixture.detectChanges();
    expect(component.getProductById).toBeTruthy();
  });

  it('should call selectStep() method if block',()=>{
    component.selectedProdStepsList=[{products:[]}];
    component.selectedStepsList=[{},{}];
    let event={checked:true},index=0;
    component.selectStep(event,index);
    fixture.detectChanges();
    expect(component.selectStep).toBeTruthy();
  });

  it('should call selectStep() method else block when event.checked=true',()=>{
    component.selectedProdStepsList=[{products:[]}];
    let event={checked:true},index=0;
    component.selectStep(event,index);
    fixture.detectChanges();
    expect(component.selectStep).toBeTruthy();
  });

  it('should call selectStep() method else block when event.checked=false',()=>{
    component.selectedProdStepsList=[{products:[]}];
    let event={checked:false},index=0;
    component.selectStep(event,index);
    fixture.detectChanges();
    expect(component.selectStep).toBeTruthy();
  });

  it('should call close() method',()=>{
    component.close();
    fixture.detectChanges();
    expect(component.close).toBeTruthy();
  });

  it('should call clear() method',()=>{
    component.clear();
    fixture.detectChanges();
    expect(component.clear).toBeTruthy();
  });

  it('should call import() method',()=>{
    component.import();
    fixture.detectChanges();
    expect(component.import).toBeTruthy();
  });
});
