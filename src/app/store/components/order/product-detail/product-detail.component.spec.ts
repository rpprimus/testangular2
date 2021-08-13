import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail.component';
import { StoreCategoriesComponent } from '../../store-categories/store-categories.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MatModule } from '../../../../core/mat-module';
import { StoreService } from '../../../../store/service/store.service';
import { mockStoreService } from '../../../../../Test/mockStoreService';
import { HttpClientService } from '../../../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../../Test/mockHttpClientServiceClass';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { mockCommon } from '../../../../../Test/mockCommon';
import { Common } from '../../../../store/utility/common';
import { SharedService } from '../../../../shared/services/shared.service';
import { mockSharedService } from '../../../../../Test/mockSharedService';
import { mockUtil } from '../../../../../Test/mockUtil';
import { Util } from '../../../../../app/shared/services/util';
import { LeftPanelCategoryService } from '../left-panel-category.service';
import { mockLeftPanelCategoryServive } from '../../../../../Test/mockLeftPanelCategoryService';
import { Location } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
//  let value:"5";
//  let isKitDetail: true;
 let location: Location;
 let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent,StoreCategoriesComponent ],
      providers:[
        { provide: StoreService, useClass: mockStoreService },
        { provide: HttpClientService, useClass: mockHttpClientServiceClass },
        { provide: Common, useClass: mockCommon },
        { provide: SharedService, useClass: mockSharedService },
        { provide: Util, useClass: mockUtil },
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
                  value:"5",
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
                    isKit:true,
                  },
                  value:"5"
                }   
                },
                params:{
                  value:{
                    id:"5"
                  }
                },
                queryParams:{
                  ClientId:"2", 
                  value:{
                    kit:true
                  }
            },
            
        }, 
         } ],
      imports:[BrowserAnimationsModule,RouterTestingModule.withRoutes([
        { path: 'order/placeorder', component: ProductDetailComponent }]),MatModule],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
    router = TestBed.get(Router); 
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(ProductDetailComponent); 
    component = fixture.componentInstance;
    router.initialNavigation();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit(); 
    expect(component.ngOnInit).toBeTruthy();
  });
  it('tset case for openCategoriesPopup() method', () => {
    component.openCategoriesPopup();
    fixture.detectChanges();
    expect(component.openCategoriesPopup).toBeDefined();
  });
  it('test case for downloadFile() method', () => {
    let id="5";
    component.downloadFile(id);
    expect(component.downloadFile).toBeDefined();
  });
  it('test case for getProductDetail() method', () => {
    component.getProductDetail();
    expect(component.getProductDetail).toBeDefined();
  });
  it('test case for onAddCart() method', () => {
    component.onAddCart();
    expect(component.onAddCart).toBeDefined();
  });
  it('test case for changedCategoryId() method', fakeAsync(() => {
    let data = 867;
    component.changedCategoryId(data);
    fixture.detectChanges();
    expect(component.changedCategoryId).toBeDefined();
    router.navigate(['/order/placeorder']); 
    tick(1);
    expect(location.path()).toBe('/order/placeorder'); 
  }));
  it('test case for viewImage() method', () => {
    let url="";
    let imgClass="";
    component.viewImage(url,imgClass);
    expect(component.viewImage).toBeDefined();
  });
});
