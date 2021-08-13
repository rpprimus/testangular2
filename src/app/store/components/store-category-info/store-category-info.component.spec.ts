import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCategoryInfoComponent } from './store-category-info.component';
import { MatModule } from '../../../core/mat-module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('StoreCategoryInfoComponent', () => {
  let component: StoreCategoryInfoComponent;
  let fixture: ComponentFixture<StoreCategoryInfoComponent>;
  const mockDialogRef = {
    close: (dialogResult: any) => { }
  };
  const model={};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCategoryInfoComponent ],
      imports: [MatModule],
      providers: [{ provide: MatDialogRef, useValue: mockDialogRef }, { provide: MAT_DIALOG_DATA, useValue: model }]
    
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCategoryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
