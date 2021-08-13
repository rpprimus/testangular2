import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardComponent } from './credit-card.component';
import { MatDialogRef, MAT_DIALOG_DATA, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MatModule } from '../../../core/mat-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { CreditCardDetailsPopupComponent } from '../credit-card-details-popup/credit-card-details-popup.component';
import { CreditCardPipe } from '../../../shared/pipes/credit-card-mask.pipe';
import { StoreService } from '../../service/store.service';
import { mockStoreService } from '../../../../Test/mockStoreService';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { Common } from '../../utility/common';
import { mockCommon } from '../../../../Test/mockCommon';
import { EncryptionService } from '../../../shared/services/encryption.service';
import { mockEncryptionService } from '../../../../Test/mockEncryptionService';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

describe('CreditCardComponent', () => {
  let component: CreditCardComponent;
  let fixture: ComponentFixture<CreditCardComponent>;
  const mockDialogRef = {
    close: (dialogResult: any) => { },
    open: (dialogResult: any) => { }
  };
  const model={};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditCardComponent,CreditCardDetailsPopupComponent,CreditCardPipe ],
      imports: [MatModule,BrowserAnimationsModule],
      providers: [{ provide: EncryptionService, useClass: mockEncryptionService },{ provide: MatDialogRef, useValue: mockDialogRef }, { provide: MAT_DIALOG_DATA, useValue: model },{provide:StoreService,useClass:mockStoreService},
      {provide:SharedService,useClass:mockSharedService},{ provide: Common, useClass: mockCommon },{
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
      },
  
      {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}]
    
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
          entryComponents: [CreditCardDetailsPopupComponent]
      }
  })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call openCreditCardDetails() method',()=>{
    component.openCreditCardDetails();
    fixture.detectChanges();
    expect(component.openCreditCardDetails).toBeTruthy();
  })
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
