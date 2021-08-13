import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayLinkedFieldsComponent } from './display-linked-fields.component';
import { DynamicInputFieldComponent } from '../../dynamic-input-field/dynamic-input-field.component';
import { MatModule } from '../../../../core/mat-module';
import { LookupvaluesPipe } from '../../../../shared/pipes/lookupvalues.pipe';

describe('DisplayLinkedFieldsComponent', () => {
  let component: DisplayLinkedFieldsComponent;
  let fixture: ComponentFixture<DisplayLinkedFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayLinkedFieldsComponent,DynamicInputFieldComponent,LookupvaluesPipe ],
      imports: [MatModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayLinkedFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
