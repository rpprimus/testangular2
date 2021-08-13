import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailComponent } from './order-detail.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatModule } from '../../../../core/mat-module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Common } from '../../../../store/utility/common';
import { mockCommon } from '../../../../../Test/mockCommon';
import { StoreService } from '../../../..//store/service/store.service';
import { mockStoreService } from '../../../../../Test/mockStoreService';
import { SharedService } from '../../../../shared/services/shared.service';
import { mockSharedService } from '../../../../../Test/mockSharedService';
import { Util } from '../../../../shared/services/util';
import { HeaderFooterNote } from '../header-footer-note';
import { DynamicInputFieldComponent } from '../../dynamic-input-field/dynamic-input-field.component';
import { DisplayLinkedFieldsComponent } from '../display-linked-fields/display-linked-fields.component';
import { LookupvaluesPipe } from '../../../../shared/pipes/lookupvalues.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mockUtil } from '../../../../../Test/mockUtil';
import { HttpClientService } from '../../../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../../Test/mockHttpClientServiceClass';

describe('OrderDetailComponent', () => {
  let component: OrderDetailComponent;
  let fixture: ComponentFixture<OrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LookupvaluesPipe, OrderDetailComponent,HeaderFooterNote, DynamicInputFieldComponent, DisplayLinkedFieldsComponent ],
      imports: [BrowserModule,MatModule,HttpClientTestingModule,BrowserAnimationsModule],
      providers:[{provide:Util,useClass:mockUtil},
      {provide:Common,useClass:mockCommon},
      {provide:StoreService,useClass:mockStoreService},
      {provide:HttpClientService,useClass:mockHttpClientServiceClass},
      {provide:SharedService,useClass:mockSharedService}],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call sameAsEvent() method',()=>{
    let type="shipment"
    component.sameAsEvent(type);
    expect(component.sameAsEvent).toBeTruthy();

  });

  it('should call requestorSelected() method',()=>{
    let event={target:{textContent:"Test User"}};
    component.requestorSelected(event);
    fixture.detectChanges();
    expect(component.requestorSelected).toBeTruthy();
  });

  it('should call the scroll() method',()=>{
    let num:number;
    component.scroll(num);
    fixture.detectChanges();
    expect(component.scroll).toBeTruthy();
  });

  it('should call getRequestor() method',()=>{
    component.getRequestor();
    fixture.detectChanges();
    expect(component.getRequestor).toBeTruthy();
  })
});
