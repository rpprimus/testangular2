import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Common } from '../../../utility/common';
import { PlaceOrderComponent } from './place-order.component';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { mockCommon } from '../../../../../Test/mockCommon';
import { RouterTestingModule } from '@angular/router/testing';
import { MatModule } from './../../../../core/mat-module';
import { ServicesComponent } from '../services/services.component';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ReviewOrderComponent } from '../review-order/review-order.component';
import { BrowseProductComponent } from '../browse-product/browse-product.component';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../../service/store.service';
import { mockStoreService } from '../../../../../Test/mockStoreService';
import { HttpClientService } from '../../../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../../Test/mockHttpClientServiceClass';
import { SharedService } from '../../../../shared/services/shared.service';
import { mockSharedService } from '../../../../../Test/mockSharedService';
import { mockUtil } from '../../../../../Test/mockUtil';
import { Util } from '../../../../shared/services/util';
import { LeftPanelCategoryService } from '../left-panel-category.service';

describe('PlaceOrderComponent', () => {
  let component: PlaceOrderComponent;
  let fixture: ComponentFixture<PlaceOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceOrderComponent, ServicesComponent,
        OrderDetailComponent,ProductDetailComponent,
        ReviewOrderComponent,BrowseProductComponent ],
      providers: [HttpClient, HttpHandler,HttpClientService,LeftPanelCategoryService,
          { provide: Common, useClass: mockCommon },
          { provide: Util, useClass: mockUtil },
          { provide: StoreService, useClass:mockStoreService  },
          { provide: HttpClientService, useClass:mockHttpClientServiceClass  },
          { provide: SharedService, useClass:mockSharedService },
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                  routeConfig:{
                    path:"resetpassword/:id"
                  },
                  params:{
                    id:"1",
                    length:"5",
                  }  ,
                  },
                  queryParams:{
                    value:"placeorder",   
                   }   ,
              },
          },     
        ],
        imports:  [
          RouterTestingModule.withRoutes([]),
        MatModule, MatDialogModule,RouterModule,
            BrowserAnimationsModule, HttpClientTestingModule],
          schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceOrderComponent);
    component = fixture.componentInstance;  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('test to call ngOnInit Explicitly', () => {
  //   component.ngOnInit();
  //   expect(component.ngOnInit).toBeDefined();
  //   });
  it('test to call animateToTop() function', () => {
    let e="";
    component.animateToTop(e);
    expect(component.animateToTop).toBeTruthy();
  });
  it('test to call  onWindowScroll() function of HostListener', () => {
    component.onWindowScroll();
   let showTopLink: boolean = false;
    let verScroll: 99;
    expect(component.showTopLink).toBeFalsy();
  });
});

