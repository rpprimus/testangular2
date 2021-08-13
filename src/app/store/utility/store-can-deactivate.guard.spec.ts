import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';

import { StoreCanDeactivateGuard } from './store-can-deactivate.guard';
import { StoreDashboardComponent } from '../components/store-dashboard/store-dashboard.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { MatModule } from '../../core/mat-module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Util } from '../../shared/services/util';
import { AuthService } from '../../shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientService } from '../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../Test/mockHttpClientServiceClass';
import { Common } from './common';
import { mockCommon } from '../../../Test/mockCommon';
import { SharedService } from '../../shared/services/shared.service';
import { mockSharedService } from '../../../Test/mockSharedService';
import { StoreService } from '../service/store.service';
import { mockStoreService } from '../../../Test/mockStoreService';

describe('StoreCanDeactivateGuard', () => {
  let component:StoreDashboardComponent;
  let fixture: ComponentFixture<StoreDashboardComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations:[StoreDashboardComponent],
      imports: [FormsModule,RouterTestingModule, BrowserModule, MatModule, HttpClientModule, BrowserAnimationsModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ StoreCanDeactivateGuard,Util, AuthService, CookieService,
        { provide: HttpClientService, useClass: mockHttpClientServiceClass },
        { provide: Router, useValue: router },
        { provide: Common, useClass: mockCommon },
        { provide:SharedService, useClass: mockSharedService},
        { provide:StoreService, useClass: mockStoreService},
        { provide:ActivatedRoute,useValue: fakeActivatedRoute}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should ...', inject([StoreCanDeactivateGuard], (guard: StoreCanDeactivateGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should call canDeactivate() method', inject([StoreCanDeactivateGuard], (guard: StoreCanDeactivateGuard) => {
    let component1 = fixture.componentInstance;
    guard.canDeactivate(component1);
    expect(guard.canDeactivate).toBeTruthy();
  }));
});
