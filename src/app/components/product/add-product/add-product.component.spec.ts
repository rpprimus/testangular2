import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductComponent } from './add-product.component';
import { ProductsService } from '../products.service';
import { mockProductsService } from '../../../../Test/mockProductsService';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { CategoryService } from '../../category/category.service';
import { mockCategoryService } from '../../../../Test/mockCategoryService';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatTableDataSource, MatRadioButton, MatRadioGroup, MatRadioChange } from '@angular/material';
import { of } from 'rxjs';
import { MatModule } from '../../../core/mat-module';
import { CKEditorModule } from 'ng2-ckeditor';
import { ChipComponent } from '../../chip/chip.component';
import { ProductResourcesComponent } from '../product-resources/product-resources.component';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../Test/mockHttpClientServiceClass';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductComponent, ChipComponent, ProductResourcesComponent],
      imports: [MatModule, CKEditorModule, BrowserAnimationsModule],
      providers: [{ provide: ProductsService, useClass: mockProductsService }, { provide: SharedService, useClass: mockSharedService }, { provide: MatDialog, useClass: MatDialogMock },
      { provide: Util, useClass: mockUtil }, { provide: CategoryService, useClass: mockCategoryService }, { provide: Router, useValue: router }, { provide: HttpClientService, useClass: mockHttpClientServiceClass },
      {
        provide: ActivatedRoute, useValue: {
          snapshot: {
            routeConfig: {
              path: "eventcalendar"
            },
            params: {
              id: "1",

            },
            queryParams: {
              ClientId: "2",
            }
          },
        }
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call onSelectDemandGraphic() method if block', () => {
    let mrChange = new MatRadioChange(null, "isTextGraphic");
    component.onSelectDemandGraphic(mrChange);
    fixture.detectChanges();
    expect(component.onSelectDemandGraphic).toBeTruthy();
  });

  it('should call onSelectDemandGraphic() method else block', () => {
    let mrChange = new MatRadioChange(null, "isUpload");
    component.onSelectDemandGraphic(mrChange);
    fixture.detectChanges();
    expect(component.onSelectDemandGraphic).toBeTruthy();
  });

  it('should call openCatDialog() method', () => {
    component.openCatDialog();
    fixture.detectChanges();
    expect(component.openCatDialog).toBeTruthy();
  });

  it('should call submitProductDetails() method', () => {
    let type ='next';
    component.submitProductDetails(type);
    fixture.detectChanges();
    expect(component.submitProductDetails).toBeTruthy();
  });

  it('should call onChangeVisibilityGroup() method', () => {
    let data = [{ id: 1 }, { id: 2 }];
    component.onChangeVisibilityGroup(data);
    fixture.detectChanges();
    expect(component.onChangeVisibilityGroup).toBeTruthy();
  });

  it('should call onAddWarehouseItems() method', () => {
    component.onAddWarehouseItems();
    fixture.detectChanges();
    expect(component.onAddWarehouseItems).toBeTruthy();
  });

  it('should call onRemoveWarehouseItems() method', () => {
    let index = 0, id = 1;
    component.onRemoveWarehouseItems(index, id);
    fixture.detectChanges();
    expect(component.onRemoveWarehouseItems).toBeTruthy();
  });

  it('should call disableSelectedWareHouse() method', () => {
    component.disableSelectedWareHouse();
    fixture.detectChanges();
    expect(component.disableSelectedWareHouse).toBeTruthy();
  });

  it('should call importStep() method', () => {
    component.importStep();
    fixture.detectChanges();
    expect(component.importStep).toBeTruthy();
  });

  it('should call addStep() method', () => {
    component.addStep();
    fixture.detectChanges();
    expect(component.addStep).toBeTruthy();
  });

  it('should call addAssociatedProducts() method', () => {
    let step =
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
    }
    component.addAssociatedProducts(step);
    fixture.detectChanges();
    expect(component.addAssociatedProducts).toBeTruthy();
  });

  it('should call removeAssociatedProduct() method', () => {
    let step =
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
    }, element = {
      "id": 57,
      "productId": 66,
      "productNumber": "XR_Iphone",
      "productName": "Apple iPhone XR (Black, 64 GB)",
      "minQuantity": 1,
      "resouceId": 41,
      "categories": "iPhone, test 1",
      "maxOrderQuantity": 20,
    }
    component.removeAssociatedProduct(element, step);
    fixture.detectChanges();
    expect(component.removeAssociatedProduct).toBeTruthy();
  });

  it('should call deleteAssociatedStep() method', () => {
    let step =
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
    }
    component.deleteAssociatedStep(step);
    fixture.detectChanges();
    expect(component.deleteAssociatedStep).toBeTruthy();
  });

  it('should call deleteAssociatedStep() method should throw error', () => {
    let step =
    {
      "id": 9,
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
    }
    component.deleteAssociatedStep(step);
    fixture.detectChanges();
    expect(component.deleteAssociatedStep).toBeTruthy();
  });

  it('should call storeAssociateStepAndProductList() method when isStep=true', () => {
    let row = { "id": 57 }, isStep = true;
    let step =
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
    }
    component.storeAssociateStepAndProductList(row, step, isStep);
    fixture.detectChanges();
    expect(component.storeAssociateStepAndProductList).toBeTruthy();
  });

  it('should call storeAssociateStepAndProductList() method when isStep=false', () => {
    let row = { "id": 57 }, isStep = false;
    let step =
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
    }
    component.storeAssociateStepAndProductList(row, step, isStep);
    fixture.detectChanges();
    expect(component.storeAssociateStepAndProductList).toBeTruthy();
  });

  it('should call storeAssociatedProductData() method', () => {
    let row = { "id": 57 };
    let step =
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
    }
    component.storeAssociatedProductData(row, step);
    fixture.detectChanges();
    expect(component.storeAssociatedProductData).toBeTruthy();
  });

  it('should call associatedProductListDelete() method', () => {
    component.delList = [{ isDeleted: true, pids: [23] }];
    component.associatedProductListDelete();
    fixture.detectChanges();
    expect(component.associatedProductListDelete).toBeTruthy();
  });

  it('should call associatedProductListDelete() method should throw error', () => {
    component.delList = [{ isDeleted: false, pids: [2] }];
    component.associatedProductListDelete();
    fixture.detectChanges();
    expect(component.associatedProductListDelete).toBeTruthy();
  });

  it('should call prodExpiryDate() method', () => {
    component.prodExpiryDate();
    fixture.detectChanges();
    expect(component.prodExpiryDate).toBeTruthy();
  });
});
export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of([{ id: 1, name: "Test" }])
    };
  }
}

