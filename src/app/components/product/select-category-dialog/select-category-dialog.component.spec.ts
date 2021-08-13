import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCategoryDialogComponent } from './select-category-dialog.component';
import { MatModule } from '../../../core/mat-module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoryService } from '../../category/category.service';
import { mockCategoryService } from '.././../../../Test/mockCategoryService';
import { CategoryTreeComponent, CategoryTreeActionBtnComponent } from '../../category/category-tree/category-tree.component';
import { CategoryDragDropComponent } from '../../category/category-drag-drop/category-drag-drop.component';

describe('SelectCategoryDialogComponent', () => {
  let component: SelectCategoryDialogComponent;
  let fixture: ComponentFixture<SelectCategoryDialogComponent>;
  const mockDialogRef = {
    close: (dialogResult: any) => { }
  };
  const model={};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCategoryDialogComponent,CategoryTreeComponent,CategoryTreeActionBtnComponent,CategoryDragDropComponent ],
      imports: [MatModule],
      providers: [{ provide: MatDialogRef, useValue: mockDialogRef }, { provide: MAT_DIALOG_DATA, useValue: model },
      {provide:CategoryService,useClass:mockCategoryService}]
    
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getSelectedCat() method',()=>{
    component.getSelectedCat();
    fixture.detectChanges();
    expect(component.getSelectedCat).toBeTruthy();
  })

  it('should call close() method',()=>{
    component.close();
    fixture.detectChanges();
    expect(component.close).toBeTruthy();
  })
});
