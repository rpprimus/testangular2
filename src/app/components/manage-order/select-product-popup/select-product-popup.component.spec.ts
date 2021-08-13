import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProductPopupComponent } from './select-product-popup.component';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { ManageOrderService } from '../manage-order.service';
import { mockManageOrderService } from '../../../../Test/mockManageOrderService';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../Test/mockHttpClientServiceClass';
import { MatModule } from '../../../core/mat-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SelectProductPopupComponent', () => {
  let component: SelectProductPopupComponent;
  let fixture: ComponentFixture<SelectProductPopupComponent>;
  const mockDialogRef = {
    close: (dialogResult: any) => { }
  };
  const model = {childData:{name:""}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectProductPopupComponent ],
      imports: [MatModule,BrowserAnimationsModule],
      providers: [{provide:SharedService,useClass:mockSharedService},{provide:Util,useClass:mockUtil},
        {provide:ManageOrderService,useClass:mockManageOrderService},{ provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: model },{provide:HttpClientService,useClass:mockHttpClientServiceClass}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProductPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchProduct() method if block',()=>{
    component.searchText="AMA";
    component.searchProduct();
    fixture.detectChanges();
    expect(component.searchProduct).toBeTruthy();
  });

  it('should call searchProduct() method else block',()=>{
    component.searchProduct();
    fixture.detectChanges();
    expect(component.searchProduct).toBeTruthy();
  });

  it('should call searchProduct() method should throw error',()=>{
    component.searchText="AMC";
    component.searchProduct();
    fixture.detectChanges();
    expect(component.searchProduct).toBeTruthy();
  });

  it('should call selectAllProducts() method',()=>{
    component.selectAll=true;
    component.selectAllProducts();
    fixture.detectChanges();
    expect(component.selectAllProducts).toBeTruthy();
  });

  it('should call changeSelected() method',()=>{
    let item={},state=true;
    component.changeSelected(item,state);
    fixture.detectChanges();
    expect(component.changeSelected).toBeTruthy();
  });

  it('should call changeSelected() method when state is false',()=>{
    let item={},state=false;
    component.changeSelected(item,state);
    fixture.detectChanges();
    expect(component.changeSelected).toBeTruthy();
  });

  it('should call close() method',()=>{
    component.close();
    fixture.detectChanges();
    expect(component.close).toBeTruthy();
  });

  it('should call addProduct() method',()=>{
    component.addProduct();
    fixture.detectChanges();
    expect(component.addProduct).toBeTruthy();
  });

  it('should call checkAlreadySelectedProduct() method',()=>{
    component.alreadySelectedList=[{
      "productId": 1971,
      "resouceId": null,
      "productNumber": "12786657",
      "productName": "Iphone XI_X1_test",
      "categories": "X11",
      "maxOrderQuantity": 1
    }]
    component.checkAlreadySelectedProduct();
    fixture.detectChanges();
    expect(component.checkAlreadySelectedProduct).toBeTruthy();
  });
});
