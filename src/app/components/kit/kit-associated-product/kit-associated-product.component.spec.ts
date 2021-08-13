import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitAssociatedProductComponent } from './kit-associated-product.component';
import { MatModule } from '../../../core/mat-module';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../Test/mockHttpClientServiceClass';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('KitAssociatedProductComponent', () => {
  let component: KitAssociatedProductComponent;
  let fixture: ComponentFixture<KitAssociatedProductComponent>;
  const model={alreadySelected:[]};
  const mockDialogRef = {
    close: (dialogResult: any) => { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitAssociatedProductComponent ],
      imports: [MatModule,BrowserAnimationsModule],
      providers: [{provide:Util,useClass:mockUtil},{provide:SharedService,useClass:mockSharedService},{provide:HttpClientService,useClass:mockHttpClientServiceClass},
        { provide: MatDialogRef, useValue: mockDialogRef },{ provide: MAT_DIALOG_DATA, useValue: model }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitAssociatedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchProduct() method if block',()=>{
    component.searchText="kit";
    component.searchProduct();
    fixture.detectChanges();
    expect(component.searchProduct).toBeTruthy();
  });

  it('should call searchProduct() method should throw error',()=>{
    component.searchText="kitt";
    component.searchProduct();
    fixture.detectChanges();
    expect(component.searchProduct).toBeTruthy();
  });

  it('should call searchProduct() method else block',()=>{
    component.searchProduct();
    fixture.detectChanges();
    expect(component.searchProduct).toBeTruthy();
  });

  it('should call closeDialog() method else block',()=>{
    component.closeDialog();
    fixture.detectChanges();
    expect(component.closeDialog).toBeTruthy();
  });

  it('should call addSelectedProduct() method else block',()=>{
    component.addSelectedProduct();
    fixture.detectChanges();
    expect(component.addSelectedProduct).toBeTruthy();
  });

  it('should call selectAllProducts() method else block',()=>{
    component.selectAll=true;
    component.selectAllProducts();
    fixture.detectChanges();
    expect(component.selectAllProducts).toBeTruthy();
  });

  it('should call changeSelectedProduct() method',()=>{
    let item={},state="INACTIVE";
    component.changeSelectedProduct(item,state);
    fixture.detectChanges();
    expect(component.changeSelectedProduct).toBeTruthy();
  });

  it('should call checkForAlreadySelectedProduct() method',()=>{
    component.alreadySelectedKitList=[{productId : 10},{productId : 11},{productId : 12}];
    component.dataSource.data=[{productId :11}];
    component.checkForAlreadySelectedProduct();
    fixture.detectChanges();
    expect(component.checkForAlreadySelectedProduct).toBeTruthy();
  });
});
