import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatModule } from './../../../core/mat-module';
import { mockCommon } from './../../../../Test/mockCommon';
import { Common } from '../../utility/common';

import { TwoFactorAuthComponent } from './two-factor-auth.component';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Util } from './../../../shared/services/util';
import { mockUtil } from './../../../../Test/mockUtil';
import { Router } from '@angular/router';
import { mockSharedService } from './../../../../Test/mockSharedService';
import { SharedService } from './../../../shared/services/shared.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TwoFactorAuthComponent', () => {
  let component: TwoFactorAuthComponent;
  let fixture: ComponentFixture<TwoFactorAuthComponent>;
  const mockDialogRef = {
    close: (dialogResult: any) => { }
  };
  const model = {
      data: 'test'
  }
  let router = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoFactorAuthComponent ],
      imports:[MatModule,BrowserAnimationsModule],
      providers:[CookieService,
        {provide: Util,useClass: mockUtil},
        {provide:Common,useClass:mockCommon},
        {provide: SharedService, useClass: mockSharedService},
        {provide:Router,useValue : router},
        {provide:MatDialogRef,useValue:mockDialogRef},
        {provide:HttpClient},
        { provide: MAT_DIALOG_DATA, useValue: model },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoFactorAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
