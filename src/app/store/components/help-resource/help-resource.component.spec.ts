import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HelpResourceComponent } from './help-resource.component';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatSnackBarModule, MatHeaderRowDef } from '@angular/material';
import { SharedService } from '../../../shared/services/shared.service';
import { StoreService } from '../../service/store.service';
import { Common } from '../../utility/common';
import { Util } from '../../../shared/services/util';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpHandler } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './../../../core/mat-module';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { mockStoreService } from '../../../../Test/mockStoreService';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../Test/mockHttpClientServiceClass';
import { mockUtil } from '../../../../Test/mockUtil';
import { AuthService } from '../../../shared/services/auth.service';
import { mockAuthService } from '../../../../Test/mockAuthService.service';


describe('HelpResourceComponent', () => {
  let component: HelpResourceComponent;
  let fixture: ComponentFixture<HelpResourceComponent>;
  let service: mockStoreService;
  let util:Util;
  let sharedService:SharedService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpResourceComponent ],
      providers: [ HttpHandler, Util,StoreService,DomSanitizer,
          CookieService,Common,HttpClientService,AuthService,
          { provide: SharedService, useClass: mockSharedService },
           { provide: StoreService, useClass: mockStoreService },
           { provide: HttpClientService, useClass: mockHttpClientServiceClass },
           { provide: Util, useClass: mockUtil },{provide:AuthService,useClass:mockAuthService},
                 {
                   provide: MatDialogRef,
                   useValue: {}
                 },
                 { provide: MAT_DIALOG_DATA, useValue: {} },
                ],
                imports: [RouterTestingModule,FormsModule,ReactiveFormsModule,
                  RouterTestingModule,RouterModule, MatModule,MatDialogModule,
                  MatSnackBarModule,BrowserAnimationsModule, 
                  HttpClientTestingModule],
                   schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]    
    })
    .compileComponents();    
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(HelpResourceComponent);
    component=fixture.componentInstance;
    sharedService=fixture.debugElement.injector.get(SharedService);
    fixture.detectChanges();  
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('test for download file method', () => {
    let id="";
    component.downloadFile(id);
    spyOn(sharedService,'onSuccess');
    fixture.detectChanges();
    expect(component.downloadFile).toBeTruthy();
  });
});

