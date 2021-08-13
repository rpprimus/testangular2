import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatModule } from './../../../core/mat-module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { Component, OnInit, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { StoreService } from '../../service/store.service';
import { SharedService } from '../../../shared/services/shared.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Util } from '../../../shared/services/util';
import { Router} from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpHandler } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material';
import { Common } from '../../utility/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { DomSanitizer, By } from '@angular/platform-browser';
import { Location } from "@angular/common";
import { mockSharedService } from '../../../../Test/mockSharedService';
import { mockStoreService } from '../../../../Test/mockStoreService';
import { AppMessage } from '../../../shared/config/app-message.enum';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let de: DebugElement;
  let el:HTMLElement;
  let snap: ActivatedRouteSnapshot;
  let sharedService:SharedService;
  let location: Location;
  let router: Router;
  let appMessage = AppMessage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
      providers: [ HttpHandler, Util,StoreService,AuthService,DomSanitizer,
         CookieService,Common, SharedService, HttpClientService,
         { provide: SharedService, useClass: mockSharedService },
          { provide: StoreService, useClass: mockStoreService },
                {
                  provide: MatDialogRef,MatModule,
                  useValue: {}
                },
                { provide: MAT_DIALOG_DATA, useValue: {} },
                  {
                    provide: ActivatedRoute,
                    useValue: {
                      snapshot: {
                          routeConfig:{
                            path:"resetpassword/:id"
                          },
                          params:{
                            id:"1",
                            
                          }  ,
                          queryParams:{
                            ClientId:"2",   
                          }    
                          },
                      },
                  }, 
              ],
              imports: [RouterTestingModule.withRoutes([
                { path: 'store-login', component: ForgotPasswordComponent }
              ]) ,FormsModule,ReactiveFormsModule,RouterTestingModule,RouterModule, MatDialogModule,MatSnackBarModule,
                BrowserAnimationsModule, HttpClientTestingModule],
              schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
            }).compileComponents();
    router = TestBed.get(Router); 
    location = TestBed.get(Location);
    router.initialNavigation();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('form'));
    fixture.detectChanges();
    sharedService = fixture.debugElement.injector.get(SharedService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('test case for isResetPassword and isFormSubmitted', () => {
    component.isResetPassword;
    component.isFormSubmitted;
    expect(component.isResetPassword).toBeTruthy();
    expect(component.isFormSubmitted).toBeFalsy();
    fixture.detectChanges();
  });
  it('test case for store login navigation', fakeAsync(() => {
    component.resetPasswordRequest;
    expect(component.resetPasswordRequest).toBeDefined();
    router.navigate(['store-login']); 
    tick();
    expect(location.path()).toBe('/store-login'); 
  }));
  it('test case for markFormGroupChecked', () => { 
    component.isFormSubmitted=false;
    component.resetPassword();
    fixture.detectChanges();
    spyOn(Util.prototype, 'markFormGroupTouched');
    expect(component.util.markFormGroupTouched).toHaveBeenCalledTimes(0);
    expect(component.resetPassword).toBeTruthy();
  });
  it('test case for form controls- password and confirm password', () => { 
    component.isFormSubmitted=false;
    component.resetPasswordForm.controls['password'].setValue('Abcd@1234');
    component.resetPasswordForm.controls['confirmPassword'].setValue('Abcd@1234');
    expect(component.resetPasswordForm.valid).toBeTruthy();
    component.email.setValue('sdfdsf@dfd.com');
    fixture.detectChanges();
    component.resetPassword();
   expect(component.resetPassword).toBeTruthy();
  }); 
  it('test for resetPasswordRequest() function', () => {
    component.email.setValue('');
    component.resetPasswordRequest();
    expect(component.email.dirty).toBeTruthy();
  });
});









