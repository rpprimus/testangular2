import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreNotFoundComponent } from './store-not-found.component';

describe('StoreNotFoundComponent', () => {
  let component: StoreNotFoundComponent;
  let fixture: ComponentFixture<StoreNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
