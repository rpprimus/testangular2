import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { StoreSignupComponent } from './store-signup.component';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedService } from '../../../shared/services/shared.service';
import { Util } from '../../../shared/services/util';
import { StoreService } from '../../service/store.service';
import { Common } from '../../utility/common';
import { MatModule } from '../../../core/mat-module';
import { PhoneNumberPipe } from "../../../shared/pipes/phone-number.pipe";
import { Router, Routes } from '@angular/router';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../../shared/services/auth.service';
import { mockStoreService } from '../../../../Test/mockStoreService';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreLoginComponent } from '../store-login/store-login.component';
import { Location } from "@angular/common";

xdescribe('StoreSignupComponent', () => {
  let component: StoreSignupComponent;
  let fixture: ComponentFixture<StoreSignupComponent>;
  let de: DebugElement;
  let el:HTMLElement;
  let sharedService:SharedService;
  let storeService:StoreService;
  let router:Router;
  let location:Location;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreSignupComponent,PhoneNumberPipe,StoreLoginComponent ],
      imports:[RouterTestingModule.withRoutes([{path: 'store-login',
      component: StoreLoginComponent}]),FormsModule,ReactiveFormsModule,MatModule,HttpClientModule,BrowserAnimationsModule,HttpClientTestingModule],
      providers:[Common,SharedService,Util,HttpClientService,CookieService,AuthService,
        {provide:StoreService,useClass:mockStoreService}]
    })
    .compileComponents();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(StoreSignupComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
    storeService = fixture.debugElement.injector.get(StoreService);
    sharedService = fixture.debugElement.injector.get(SharedService);
    router.initialNavigation();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the onSubmit Method',fakeAsync(()=>{
    
    component.isFormSubmitted = false;
    component.onSubmit();
    fixture.detectChanges();
    expect(component.isFormSubmitted).toBe(false);
    expect(component.signUpForm.value.clientId).toBeUndefined();
    router.navigate(['/store-login']);
    tick();
    expect(location.path()).toBe('/store-login');
  }));

  it('return when form is invalid',(()=>{
    
    component.onSubmit();
    component.isFormSubmitted = false;
    fixture.detectChanges();
    component.signUpForm.markAsDirty();
    fixture.detectChanges();
    spyOn(Util.prototype, 'markFormGroupTouched');
    expect(component.util.markFormGroupTouched).toHaveBeenCalledTimes(0);
    expect(component.onSubmit).toBeTruthy();
  }));

  it('should call the getHierarchyList() method',(()=>{

    component.getHierarchyList();
    fixture.detectChanges();
    expect(component.getHierarchyList).toBeTruthy();
  }))

  it('should call the getStatesBasedOnCountry() method',(()=>{

    component.getStatesBasedOnCountry();
    fixture.detectChanges();
    expect(component.getStatesBasedOnCountry).toBeTruthy();
  }))
});
