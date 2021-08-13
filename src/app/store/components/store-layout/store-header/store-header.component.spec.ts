import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreHeaderComponent } from './store-header.component';
import { DebugElement } from '@angular/core';
import { SharedService } from './../../../../shared/services/shared.service';
import { HttpClientService } from './../../../../shared/services/http-client.service';
import { Util } from './../../../../shared/services/util';
import { Common } from './../../../../store/utility/common';
import { MatModule } from './../../../../core/mat-module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockHttpClientServiceClass } from '../../../../../Test/mockHttpClientServiceClass';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { AuthService } from './../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { By, BrowserModule } from '@angular/platform-browser';
import { mockSharedService } from '../../../../../Test/mockSharedService';
import { StoreService } from './../../../service/store.service';
import { mockStoreService } from '../../../../../Test/mockStoreService';
import { Observable, BehaviorSubject } from 'rxjs';

describe('StoreHeaderComponent', () => {
  let component: StoreHeaderComponent;
  let fixture: ComponentFixture<StoreHeaderComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  class mockCommon {
    
    storeClientInfo: any={
      id:""
    }
    storeUserInfo: any = new BehaviorSubject<any>({});
    placeOrderObj:any={
      eventDetails:""
    }
    closeAssociateAndOnDemandPopup(param: any) { 
      
    }
    getCountries(param:any){

    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreHeaderComponent ],
      imports: [CKEditorModule, FormsModule, BrowserModule, MatModule, HttpClientModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers:[Util,AuthService,CookieService,
        { provide: HttpClientService, useClass: mockHttpClientServiceClass },
        { provide: Router, useValue: router },
        { provide: Common, useClass: mockCommon },
        { provide:SharedService, useClass: mockSharedService},
        { provide:StoreService, useClass: mockStoreService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout() method',()=>{
    component.logout();
    fixture.detectChanges();
    expect(component.logout).toBeTruthy();
  });

  it('should call onLogoClick() method',()=>{
    component.onLogoClick();
    fixture.detectChanges();
    expect(component.onLogoClick).toBeTruthy();
  });

  // it('should call feedback() method',()=>{
  //   component.feedback();
  //   fixture.detectChanges();
  //   expect(component.feedback).toBeTruthy();
  // });
});
