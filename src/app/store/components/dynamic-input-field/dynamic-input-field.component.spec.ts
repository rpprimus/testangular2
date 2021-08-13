import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { DynamicInputFieldComponent } from './dynamic-input-field.component';
import { MatModule } from '../../../core/mat-module';
import { LookupvaluesPipe } from '../../../shared/pipes/lookupvalues.pipe';
import { Common } from '../../utility/common';
import { mockCommon } from '../../../../Test/mockCommon';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { StoreService } from '../../service/store.service';
import { mockStoreService } from '../../../../Test/mockStoreService';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentPortal } from '@angular/cdk/portal';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../Test/mockHttpClientServiceClass';

describe('DynamicInputFieldComponent', () => {
  let component: DynamicInputFieldComponent;
  let fixture: ComponentFixture<DynamicInputFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicInputFieldComponent, LookupvaluesPipe],
      imports: [MatModule, BrowserAnimationsModule],
      providers: [{ provide: Common, useClass: mockCommon },
         { provide: Util, useClass: mockUtil },
         { provide: HttpClientService, useClass: mockHttpClientServiceClass },
      { provide: StoreService, useClass: mockStoreService }, { provide: SharedService, useClass: mockSharedService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicInputFieldComponent);
    component = fixture.componentInstance;
    component.field = {
      bindProperty: "countryList",
      childFieldId: -6,
      countryName: "United States",
      dbPropertyName: "countryId",
      description: "Event Country",
      fieldLength: 0,
      fieldSequence: 0,
      id: -5,
      isActive: true,
      isRequired: true,
      linkedFields: [],
      lookupValue: "",
      type: "REMOTE_DROP_DOWN",
      value: 101
    };
    component.type=false;
    component.obj = "pickupDetails";
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    component.ngOnInit();
    tick(1500);
    expect(component).toBeTruthy();
  }));

  it('should call onFieldValueChange() method', () => {
    let field = {
      id: -5,
      description: "Event Country",
      type: "REMOTE_DROP_DOWN",
      lookupValue: "",
      fieldLength: 0,
      isActive: true,
      isRequired: true,
      fieldSequence: 0,
      dbPropertyName: "countryId",
      bindProperty: "countryList",
      childFieldId: -6,
      value: 231,
      countryName: "United States"
    };
    let $event = { source: { _elementRef: { nativeElement: true } }, target: { value: true } };
    component.type = false;
    component.onFieldValueChange($event, field);
    fixture.detectChanges();
    expect(component.onFieldValueChange).toBeTruthy();
  });

  it('should call setPlaceOrderObj method', () => {
    let jsonObj = {
      addressOne: "logix cyber park",
      addressTwo: "Tower-B",
      city: "Noida",
      clientId: 37,
      countryId: 231,
      countryName: "India",
      customFieldValues: [{ customFieldId: 267, customFieldValue: "test" }],
      end: "11-18-2019",
      eventZip: "201009",
      id: null,
      name: "test",
      pickupDate: "09-09-11",
      start: "11-14-2019",
      stateId: 10,
      stateName: "Delhi",
      title: "guru purnima",
      venue: "C-block",
      zip: "test"
    };
    let field = {
      description: "test field of service title 2",
      fieldLength: 0,
      fieldSequence: 1,
      id: 315,
      isActive: true,
      isDisplayed: null,
      isRequired: true,
      linkedFieldId: null,
      linkedFieldValue: null,
      linkedFields: [{linkedFieldValue :"Microsoft",value:'',id:267,isDisplayed:false,linkedFields:[]}],
      lookupValue: "Microsoft~Apple~Google~Amazon",
      type: "CHECK_BOX",
      value: "Microsoft"
    };
    let $event = { checked: true };
    let value = "Google";
    component.setPlaceOrderObj(jsonObj, field, $event, value);
    fixture.detectChanges();
    expect(component.setPlaceOrderObj).toBeTruthy();
  });

  it('should call pushCustomValuesIntoPlaceOrderObj method', () => {
    let jsonObj = {
      addressOne: "logix cyber park",
      addressTwo: "Tower-B",
      city: "Noida",
      clientId: 37,
      countryId: 231,
      countryName: "India",
      customFieldValues: [{ customFieldId: 267, customFieldValue: "Microsoft~Apple~Google~Amazon" }],
      end: "11-18-2019",
      eventZip: "201009",
      id: null,
      name: "test",
      pickupDate: "09-09-11",
      start: "11-14-2019",
      stateId: 10,
      stateName: "Delhi",
      title: "guru purnima",
      venue: "C-block",
      zip: "test"
    };
    let field = {
      description: "test date field",
      fieldLength: 0,
      fieldSequence: 5,
      id: 267,
      isActive: true,
      isDisplayed: true,
      isRequired: false,
      linkedFieldId: null,
      linkedFieldValue: null,
      linkedFields: [{linkedFieldValue :new Date(),value:'',id:267,isDisplayed:false,linkedFields:[]}],
      lookupValue: "",
      value: new Date(),
      type: "CUSTOM_DATE"
    };
    let $event = { checked: true };
    component.pushCustomValuesIntoPlaceOrderObj(jsonObj, field, $event);
    fixture.detectChanges();
    expect(component.pushCustomValuesIntoPlaceOrderObj).toBeTruthy();
  });

  it('should call isCheckboxSelected() method', () => {
    let field = {
      value: "Microsoft~Apple~Google~Amazon"
    };
    let value = "Apple";
    component.isCheckboxSelected(field, value);
    fixture.detectChanges();
    expect(component.isCheckboxSelected).toBeTruthy();
  });

});
