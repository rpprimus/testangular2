import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDashboardComponent } from './store-dashboard.component';
import { DebugElement,  NO_ERRORS_SCHEMA, } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';
import { HttpClientService } from './../../../shared/services/http-client.service';
import { Util } from './../../../shared/services/util';
import { Common } from './../../../store/utility/common';
import { MatModule } from './../../../core/mat-module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockHttpClientServiceClass } from '../../../../Test/mockHttpClientServiceClass';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { By, BrowserModule } from '@angular/platform-browser';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { StoreService } from '././../../service/store.service';
import { mockStoreService } from './../../../../Test/mockStoreService';
import { RouterTestingModule } from '@angular/router/testing';
import { mockCommon } from '../../../../Test/mockCommon';

describe('StoreDashboardComponent', () => {
  let component: StoreDashboardComponent;
  let fixture: ComponentFixture<StoreDashboardComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreDashboardComponent ],
      imports: [FormsModule,RouterTestingModule, BrowserModule, MatModule, HttpClientModule, BrowserAnimationsModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ Util, AuthService, CookieService,
        { provide: HttpClientService, useClass: mockHttpClientServiceClass },
        { provide: Router, useValue: router },
        { provide: Common, useClass: mockCommon },
        { provide:SharedService, useClass: mockSharedService},
        { provide:StoreService, useClass: mockStoreService},
        { provide:ActivatedRoute,useValue: fakeActivatedRoute}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the canDeactivate() method',()=>{
    component.canDeactivate();
    fixture.detectChanges();
    expect(component.canDeactivate).toBeTruthy();
  });

  it('should call the getRecentOrderList() method',()=>{
    component.getRecentOrderList();
    fixture.detectChanges();
    expect(component.getRecentOrderList).toBeTruthy();
  });

  it('should call the getCart() method',()=>{
    component.getCart();
    fixture.detectChanges();
    expect(component.getCart).toBeTruthy();
  });

  it('should call the checkForExistingCart() method',()=>{
    component.checkForExistingCart();
    fixture.detectChanges();
    expect(component.checkForExistingCart).toBeTruthy();
  });

});
