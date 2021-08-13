import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMagnifiedImageComponent } from './display-magnified-image.component';
import { MatModule } from '../../../app/core/mat-module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('DisplayMagnifiedImageComponent', () => {
  let component: DisplayMagnifiedImageComponent;
  let fixture: ComponentFixture<DisplayMagnifiedImageComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayMagnifiedImageComponent ],
      providers:[
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      imports:[MatModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMagnifiedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
