import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductResourcesComponent } from './product-resources.component';

xdescribe('ProductResourcesComponent', () => {
  let component: ProductResourcesComponent;
  let fixture: ComponentFixture<ProductResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductResourcesComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
