import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityComponent } from './quantity.component';
import { FormsModule } from '@angular/forms';

describe('QuantityComponent', () => {
  let component: QuantityComponent;
  let fixture: ComponentFixture<QuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantityComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityComponent);
    component = fixture.componentInstance;
    component.data={orderedQuantity :1}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call increaseQuantity() method',()=>{
    component.increaseQuantity();
    fixture.detectChanges();
    expect(component.increaseQuantity).toBeTruthy();
  })

  it('should call decreaseQuantity() method',()=>{
    component.decreaseQuantity();
    fixture.detectChanges();
    expect(component.decreaseQuantity).toBeTruthy();
  })
});
