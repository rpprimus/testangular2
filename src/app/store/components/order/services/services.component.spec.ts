import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesComponent } from './services.component';
import { ElementRef, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Common } from '../../../../store/utility/common';
import { mockCommon } from '../../../../../Test/mockCommon';
import { mockElementRef } from '../../../../../Test/mockElementRef';
import { HeaderFooterNote } from '../header-footer-note';
import { DynamicInputFieldComponent } from '../../dynamic-input-field/dynamic-input-field.component';
import { DisplayLinkedFieldsComponent } from '../display-linked-fields/display-linked-fields.component';
import { MatModule } from '../../../../core/mat-module';
import { HttpClientModule } from '@angular/common/http';
import { LookupvaluesPipe } from '../../../../shared/pipes/lookupvalues.pipe';
import { StoreService } from '../../../../store/service/store.service';
import { mockStoreService } from '../../../../../Test/mockStoreService';
import { SharedService } from '../../../../shared/services/shared.service';
import { mockSharedService } from '../../../../../Test/mockSharedService';
import { Util } from '../../../../shared/services/util';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientService } from '../../../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../../Test/mockHttpClientServiceClass';

describe('ServicesComponent', () => {
  let component: ServicesComponent;
  let fixture: ComponentFixture<ServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LookupvaluesPipe, ServicesComponent, HeaderFooterNote, DynamicInputFieldComponent, DisplayLinkedFieldsComponent],
      imports: [BrowserModule, MatModule, HttpClientTestingModule,BrowserAnimationsModule],
      providers: [Util, { provide: ElementRef, useClass: mockElementRef }, { provide: Common, useClass: mockCommon },
        { provide: StoreService, useClass: mockStoreService }, 
        { provide: HttpClientService, useClass: mockHttpClientServiceClass },
        { provide: SharedService, useClass: mockSharedService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the getValue() method',()=>{
    let field="";
    component.getValue(field);
    expect(component.getValue).toBeTruthy();
  });

});
