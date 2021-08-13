import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEmailPopupComponent } from './contact-email-popup.component';
import { Common } from '../../../../store/utility/common';
import { mockCommon } from '../../../../../Test/mockCommon';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatModule } from '../../../../core/mat-module';

describe('ContactEmailPopupComponent', () => {
  let component: ContactEmailPopupComponent;
  let fixture: ComponentFixture<ContactEmailPopupComponent>;
  const mockDialogRef = {
    close: (dialogResult: any) => { }
  };
  const model = {
    item: {
      data: {
        onDemandTextGraphic: "Test!"
      },
      isEdit: true
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactEmailPopupComponent ],
      imports:[MatModule],
      providers:[{provide:Common,useClass:mockCommon},{provide:MatDialogRef,useValue:mockDialogRef},{ provide: MAT_DIALOG_DATA, useValue: model },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEmailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
