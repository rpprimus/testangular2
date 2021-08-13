import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalLinkComponent } from './conditional-link.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatModule } from '../../../core/mat-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ConditionalLinkComponent', () => {
  let component: ConditionalLinkComponent;
  let fixture: ComponentFixture<ConditionalLinkComponent>;
  const mockDialogRef = {
    close: (dialogResult: any) => { }
  };
  const model = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConditionalLinkComponent],
      imports:[MatModule,BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },{ provide: MAT_DIALOG_DATA, useValue: model }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionalLinkComponent);
    component = fixture.componentInstance;
    component.data = {
      field: {
        id: 298,
        description: "test1 selected",
        type: "RADIO_BUTTON",
        lookupValue: "yes~no",
        fieldLength: 0,
        isActive: true,
        linkedFieldValue: "test1",
        linkedFieldId: 297,
        isDisplayed: false,
        isRequired: false,
        fieldSequence: 3,
        isClicked: true
      },
      service: [
        {
          id: 266,
          description: "Test event field",
          type: "READ_ONLY",
          lookupValue: "Blue↵Red↵Yellow↵Green",
          fieldLength: 0,
          isActive: true,
          linkedFieldValue: null,
          linkedFieldId: null,
          isDisplayed: false,
          isRequired: true,
          fieldSequence: 1,
          isClicked: false
        }, {
          id: 297,
          description: "test linked field",
          type: "DROP_DOWN",
          lookupValue: "test1~test2~test3",
          fieldLength: 0,
          isActive: true,
          linkedFieldValue: null,
          linkedFieldId: null,
          isDisplayed: false,
          isRequired: true,
          fieldSequence: 2,
          isClicked: false
        }, {
          id: 298,
          description: "test1 selected",
          type: "RADIO_BUTTON",
          lookupValue: "yes~no",
          fieldLength: 0,
          isActive: true,
          linkedFieldValue: "test1",
          linkedFieldId: 297,
          isDisplayed: false,
          isRequired: false,
          fieldSequence: 3,
          isClicked: true
        }, {
          id: 299,
          description: "test1 yes selected",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 10,
          isActive: true,
          linkedFieldValue: "yes",
          linkedFieldId: 298,
          isDisplayed: false,
          isRequired: false,
          fieldSequence: 4,
          isClicked: false
        }
      ]
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
