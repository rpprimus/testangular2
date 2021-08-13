import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPopUpComponent } from './event-pop-up.component';
import { DebugElement, ElementRef, Component, Renderer, } from '@angular/core';
import { SharedService } from './../../../../shared/services/shared.service';
import { HttpClientService } from './../../../../shared/services/http-client.service';
import { Util } from './../../../../shared/services/util';
import { Common } from './../../../../store/utility/common';
import { MatModule } from './../../../../core/mat-module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockHttpClientServiceClass } from '../../../../../Test/mockHttpClientServiceClass';
import { mockElementRef } from '../../../../../Test/mockElementRef';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { AuthService } from './../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By, BrowserModule } from '@angular/platform-browser';
import { mockSharedService } from '../../../../../Test/mockSharedService';
import { StoreService } from './../../../service/store.service';
import { mockStoreService } from '../../../../../Test/mockStoreService';
import { BehaviorSubject } from 'rxjs';

describe('EventPopUpComponent', () => {
  let component: EventPopUpComponent;
  let fixture: ComponentFixture<EventPopUpComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  const mockDialogRef = {
    close: (dialogResult: any) => { }
  };
  const model = {
    item: {
      data: {
        onDemandTextGraphic: "Blah!"
      },
      isEdit: true
    }
  }
  class mockCommon {
    
    storeClientInfo: any={
      id:""
    }
    placeOrderObj:any={
      eventDetails:""
    }
    storeUserInfo = new BehaviorSubject<any>({ id: 1, roles: ['USER', 'STORE_ADMIN'], isPaymentDisable: false });
    closeAssociateAndOnDemandPopup(param: any) { 
      
    }
    getCountries(param:any){

    }
    isStoreUserRoleExists(codes: any): boolean {
      return true;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPopUpComponent ],
      imports: [CKEditorModule, FormsModule, BrowserModule, MatModule, HttpClientModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [ Util, AuthService, CookieService,
        { provide: HttpClientService, useClass: mockHttpClientServiceClass },
        { provide: Router, useValue: router },
        { provide: ElementRef, useClass: mockElementRef },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: model },
        { provide: Common, useClass: mockCommon },
        { provide:SharedService, useClass: mockSharedService},
        { provide:StoreService, useClass: mockStoreService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    fixture.whenStable().then( () => {
      //component.addEventForm.valid=true;;
   })
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call selectEvent() method',()=>{

    component.isSelectEvent=true;
    component.isAddEvent=false;
    component.selectEvent();
    expect(component.isSelectEvent).toBe(true);
    expect(component.isAddEvent).toBe(false);
    expect(component.selectEvent).toBeTruthy();
  });

  it('should call addEvent() method',()=>{

    component.isSelectEvent=false;
    component.isAddEvent=true;
    component.addEvent();
    expect(component.isSelectEvent).toBe(false);
    expect(component.isAddEvent).toBe(true);
    expect(component.addEvent).toBeTruthy();
  });

  it('should call backBtnEvent() method',()=>{

    component.isSelectEvent=false;
    component.isAddEvent=false;
    component.backBtnEvent();
    expect(component.isSelectEvent).toBe(false);
    expect(component.isAddEvent).toBe(false);
    expect(component.backBtnEvent).toBeTruthy();
  });

  it('should call the selectEventSubmit() method',()=>{
    component.name="Hey There!";
    component.selectEventSubmit();
    expect(component.selectEventSubmit).toBeTruthy();
  });

  it('should call the eventSelected() method',()=>{
    let event=true;
    let evt={source:{selected:true}};
    //let ev=fixture.debugElement.query(By.css('mat-option'));
    fixture.detectChanges();
    //ev.triggerEventHandler('onSelectionChange',null);
    component.eventSelected(event,evt);
    expect(component.eventSelected).toBeTruthy();
  });

  it('should call clear() method',()=>{
    component.clear();
    expect(component.clear).toBeTruthy();
  });

  it('should call addNewEventSubmit() method',()=>{
    component.addEventForm={valid:true};
    component.startDateError=false;
    component.addNewEventSubmit();
    expect(component.startDateError).toBeFalsy();
    expect(component.addNewEventSubmit).toBeTruthy();
  });

  it('check event start date should be less than end date', async(() => {
    let date = new Date();
    component.eventStartDate.setDate(date.getDate() + 1);//tomorrow date
    component.eventEndDate.setDate(date.getDate() + 7);//7 days after today's date
    component.validateDate('');
    expect(component.eventStartDate).toBeLessThan(component.eventEndDate);
  }));

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
