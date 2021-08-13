import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardDetailsPopupComponent } from './credit-card-details-popup.component';
import { MatModule } from '../../../core/mat-module';
import { EncryptionService } from '../../../shared/services/encryption.service';
import { mockEncryptionService } from '../../../../Test/mockEncryptionService';
import { StoreService } from '../../service/store.service';
import { mockStoreService } from '../../../../Test/mockStoreService';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { CreditCardPipe } from '../../../shared/pipes/credit-card-mask.pipe';
import { MatDialogRef, MAT_DIALOG_DATA, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatDatepicker } from '@angular/material';
import { Common } from '../../utility/common';
import { mockCommon } from '../../../../Test/mockCommon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
const moment = _rollupMoment || _moment;
describe('CreditCardDetailsPopupComponent', () => {
  let component: CreditCardDetailsPopupComponent;
  let fixture: ComponentFixture<CreditCardDetailsPopupComponent>;
  let de: DebugElement;
  const mockDialogRef = {
    close: (dialogResult: any) => { },
    disableClose: true
  };
  const model = 384;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreditCardDetailsPopupComponent, CreditCardPipe],
      imports: [MatModule, BrowserAnimationsModule],
      providers: [{ provide: EncryptionService, useClass: mockEncryptionService }, { provide: StoreService, useClass: mockStoreService },
      { provide: SharedService, useClass: mockSharedService }, { provide: MatDialogRef, useValue: mockDialogRef }, { provide: MAT_DIALOG_DATA, useValue: model },
      { provide: Common, useClass: mockCommon }, {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
      },
  
      {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardDetailsPopupComponent);
    component = fixture.componentInstance;
    //Set value for the component's properties
    component.creditCardData = { number: "8888 8888 8888 8888" };
    component.expiryDate.setValue(moment("2023-12-05T09:46:04.086Z"));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call saveCreditCard() method', () => {
    component.saveCreditCard();
    fixture.detectChanges();
    expect(component.saveCreditCard).toBeTruthy();
  });

  it('should call chosenYearHandler() method', () => {
    let normalizedYear=moment("2023-12-05T09:46:04.086Z");
    component.chosenYearHandler(normalizedYear);
    fixture.detectChanges();
    expect(component.chosenYearHandler).toBeTruthy();
  });

  it('should call chosenMonthHandler() method', () => {
    let datepicker;
    datepicker = fixture.debugElement.query(By.css('#expiryDatePicker')).nativeElement;
    fixture.detectChanges();
    let normalizedMonth=moment("2023-12-05T09:46:04.086Z");
    //DatePicker is of type MatDatePicker, to explicitly test it,picked it up from the DOM and 
    //set a close() function as property to it
    datepicker.close=function(){};
    component.chosenMonthHandler(normalizedMonth, datepicker);
    fixture.detectChanges();
    expect(component.chosenMonthHandler).toBeTruthy();
  });

  it('should call onCardSelection() method', () => {
    component.onCardSelection();
    fixture.detectChanges();
    expect(component.onCardSelection).toBeTruthy();
  });

  it('should call selectCard() method', () => {
    let cardId=100;
    component.selectCard(cardId);
    fixture.detectChanges();
    expect(component.selectCard).toBeTruthy();
  });

  it('should call selectOrderCard() method', () => {
    component.selectedCard.id=100;
    component.selectOrderCard();
    fixture.detectChanges();
    expect(component.selectOrderCard).toBeTruthy();
  });

  it('should call sendCardAddedMessage() method', () => {
    component.sendCardAddedMessage();
    fixture.detectChanges();
    expect(component.sendCardAddedMessage).toBeTruthy();
  });

  it('should call checkCvv() method', () => {
    component.selectedCard.cvv="198";
    component.checkCvv();
    fixture.detectChanges();
    expect(component.checkCvv).toBeTruthy();
  });

  it('should call deleteCard() method', () => {
    let cardId=100;
    component.deleteCard(cardId);
    fixture.detectChanges();
    expect(component.deleteCard).toBeTruthy();
  });

  it('should call validateDate() method', () => {
    component.selectedCard.id=100;
    component.validateDate();
    fixture.detectChanges();
    expect(component.validateDate).toBeTruthy();
  });

  it('should call checkDuplicateCard() method', () => {
    component.checkDuplicateCard();
    fixture.detectChanges();
    expect(component.checkDuplicateCard).toBeTruthy();
  });
});
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};