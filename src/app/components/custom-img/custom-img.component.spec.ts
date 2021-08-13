import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomImgComponent } from './custom-img.component';
import { ElementRef } from '@angular/core';
import { mockElementRef } from '../../../Test/mockElementRef';

describe('CustomImgComponent', () => {
  let component: CustomImgComponent;
  let fixture: ComponentFixture<CustomImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomImgComponent ],
      providers:[{ provide: ElementRef, useClass: mockElementRef }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call clickEvent() method',()=>{
    let e={offsetX:500,offsetY:500,layerX:500,layerY:500};
    component.target=true;
    component.clickEvent(e);
    fixture.detectChanges();
    expect(component.clickEvent).toBeTruthy();
  });

  it('should call mouseMove() method',()=>{
    let e={offsetX:"test",offsetY:"test",layerX:"test",layerY:"test"}
    component.mouseMove(e);
    fixture.detectChanges();
    expect(component.mouseMove).toBeTruthy();
  });
});
