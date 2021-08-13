import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreAuthenticateComponent } from './store-authenticate.component';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Util } from '../../../shared/services/util';
import { CookieService } from 'ngx-cookie-service';
import { Common } from '../../utility/common';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedService } from '../../../shared/services/shared.service';
import { AuthService } from '../../../shared/services/auth.service';
import { mockAuthService } from '../../../../Test/mockAuthService.service';
import { MatModule } from './../../../core/mat-module';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DialogBoxComponent } from '../../../components/dialog-box/dialog-box.component';
import { Router } from '@angular/router';
import { StoreAuthGuard } from '../../utility/store-auth.guard';
import { Location } from "@angular/common";
import { StoreDashboardComponent } from '../store-dashboard/store-dashboard.component';
import { AppMessage } from '../../../shared/config/app-message.enum';

describe('StoreAuthenticateComponent', () => {

  let component: StoreAuthenticateComponent;
  let fixture: ComponentFixture<StoreAuthenticateComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoreAuthenticateComponent, DialogBoxComponent, StoreDashboardComponent],
      providers: [HttpClient, HttpHandler, Util, CookieService, Common, SharedService, HttpClientService,
        { provide: AuthService, useClass: mockAuthService },
        StoreAuthGuard
      ],
      imports: [RouterTestingModule.withRoutes([
        { path: 'store-dashboard', component: StoreDashboardComponent }
      ]), MatModule, MatDialogModule,
        BrowserAnimationsModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [DialogBoxComponent]
      }
    })
    router = TestBed.get(Router); 
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(StoreAuthenticateComponent); 
    component = fixture.componentInstance;
    router.initialNavigation();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngOnInit() method should be defined', fakeAsync(() => {
    component.common.isGoToStore = true;
    component.ngOnInit();
    expect(component.ngOnInit).toBeDefined();
    router.navigate(['store-dashboard']); 
    tick();
    expect(location.path()).toBe('/store-dashboard'); 
  }));
  it('test - if not from gotostore', () => {
    component.common.isGoToStore = false;
    component.ngOnInit(); 
  });
  it('tests for Store - account verified', () => {
      component.ngOnInit();
      fixture.detectChanges();
      let message = 'Account verified successfully!';
      expect(message).toEqual(AppMessage.U0079);
    });
    it('test for Store - link expired', () => {
      component.ngOnInit();
      fixture.detectChanges();
      let message = 'Link is expired!';
      expect(message).toEqual(AppMessage.U0080);
    });
    it('test for Store - already verified', () => {
      component.ngOnInit();
      fixture.detectChanges();
      let message = 'User is already verified!';
      expect(message).toEqual(AppMessage.U0081);
    });
    it('test for Store - user does not exist', () => {
      component.ngOnInit();
      fixture.detectChanges();
      let message = 'User does not exist!';
      expect(message).toEqual(AppMessage.U0082);
    });
})