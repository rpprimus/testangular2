import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemePreviewOneComponent } from './theme-preview-one.component';

describe('ThemePreviewOneComponent', () => {
  let component: ThemePreviewOneComponent;
  let fixture: ComponentFixture<ThemePreviewOneComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemePreviewOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemePreviewOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.data={
    headerColorCode: '',
    bodyTextColorCode: '',
    actionButtonColorCode: '',
    logo: ''
    };
    expect(component).toBeTruthy();
  });
});
