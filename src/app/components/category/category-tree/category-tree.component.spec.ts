import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTreeComponent, CategoryTreeActionBtnComponent } from './category-tree.component';
import { MatModule } from '../../../core/mat-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { CategoryService } from '../category.service';
import { mockCategoryService } from '../../../../Test/mockCategoryService';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoryDragDropComponent } from '../category-drag-drop/category-drag-drop.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AddSubCategoryDialogComponent } from '../add-sub-category-dialog/add-sub-category-dialog.component';
import { AddInfoDisplayDialogComponent } from '../add-info-display-dialog/add-info-display-dialog.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';

describe('categoryTreeComponent', () => {
  let component: CategoryTreeActionBtnComponent;
  let fixture: ComponentFixture<CategoryTreeActionBtnComponent>;
  const mockDialogRef = {
    close: (dialogResult: any) => { }
  };
  const model = {childData:{name:"X12",id:766,isActive:true,isInfoAvailable:true,sequenceNumber:766,parentId:630,showButton:true}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryTreeComponent,CategoryTreeActionBtnComponent,CategoryDragDropComponent,AddSubCategoryDialogComponent,AddInfoDisplayDialogComponent ],
      imports: [MatModule,BrowserAnimationsModule,CKEditorModule],
      providers: [{provide:SharedService,useClass:mockSharedService},{provide:CategoryService,useClass:mockCategoryService},
        { provide: MatDialogRef, useValue: mockDialogRef },{ provide: MAT_DIALOG_DATA, useValue: model },{provide:Util,useClass:mockUtil}]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
          entryComponents: [AddSubCategoryDialogComponent,AddInfoDisplayDialogComponent]
      }
  })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTreeActionBtnComponent);
    component = fixture.componentInstance;
    component.childData={name:"X12",id:766,isActive:true,isInfoAvailable:true,sequenceNumber:766,parentId:630,showButton:true}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call openSubCategoryDialog() method',()=>{
    component.openSubCategoryDialog();
    fixture.detectChanges();
    expect(component.openSubCategoryDialog).toBeTruthy();
  });

  it('should call openInfoDialog() method',()=>{
    component.openInfoDialog();
    fixture.detectChanges();
    expect(component.openInfoDialog).toBeTruthy();
  });

  it('should call changeStatus() method if block',()=>{
    let status="ACTIVE";
    component.changeStatus(status);
    fixture.detectChanges();
    expect(component.changeStatus).toBeTruthy();
  });

  it('should call changeStatus() method else block',()=>{
    component.childData.parentId=null;
    let status="ACTIVE";
    component.changeStatus(status);
    fixture.detectChanges();
    expect(component.changeStatus).toBeTruthy();
  });

  it('should call getCategoryInfo() method',()=>{
    component.getCategoryInfo();
    fixture.detectChanges();
    expect(component.getCategoryInfo).toBeTruthy();
  });

});
