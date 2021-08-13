import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDragDropComponent } from './category-drag-drop.component';
import { CategoryService } from '../category.service';
import { mockCategoryService } from '../../../../Test/mockCategoryService';

describe('CategoryDragDropComponent', () => {
  let component: CategoryDragDropComponent;
  let fixture: ComponentFixture<CategoryDragDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryDragDropComponent],
      providers: [{ provide: CategoryService, useClass: mockCategoryService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDragDropComponent);
    component = fixture.componentInstance;
    component.data={id:2,parentId:1,sequenceNumber:2};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call moveUp() method', () => {
    component.moveUp();
    fixture.detectChanges();
    expect(component.moveUp).toBeTruthy();
  });

  it('should call moveDown() method', () => {
    component.moveDown();
    fixture.detectChanges();
    expect(component.moveDown).toBeTruthy();
  });
});
