import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDisplayFieldComponent } from './dynamic-display-field.component';
import { MatModule } from '../../../core/mat-module';
import { LookupvaluesPipe } from '../../../shared/pipes/lookupvalues.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DynamicDisplayFieldComponent', () => {
  let component: DynamicDisplayFieldComponent;
  let fixture: ComponentFixture<DynamicDisplayFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicDisplayFieldComponent,LookupvaluesPipe ],
      imports: [MatModule,BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDisplayFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
