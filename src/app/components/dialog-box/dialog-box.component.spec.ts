import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxComponent } from './dialog-box.component';
import { MatModule } from '../../../app/core/mat-module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Util } from '../../shared/services/util';
import { mockUtil } from '../../../Test/mockUtil';

describe('DialogBoxComponent', () => {
  let component: DialogBoxComponent;
  let fixture: ComponentFixture<DialogBoxComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxComponent ],
      providers:[
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: Util, useValue: mockUtil },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      imports:[MatModule],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
