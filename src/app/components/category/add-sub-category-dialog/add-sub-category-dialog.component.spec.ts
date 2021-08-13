import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubCategoryDialogComponent } from './add-sub-category-dialog.component';
import { MatModule } from '../../../core/mat-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { CategoryService } from '../category.service';
import { mockCategoryService } from '../../../../Test/mockCategoryService';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('AddSubCategoryDialogComponent', () => {
  let component: AddSubCategoryDialogComponent;
  let fixture: ComponentFixture<AddSubCategoryDialogComponent>;
  const mockDialogRef = {
    close: (dialogResult: any) => { }
  };
  const model = {childData:{name:""}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubCategoryDialogComponent ],
      imports: [MatModule,BrowserAnimationsModule],
      providers: [{provide:SharedService,useClass:mockSharedService},{provide:CategoryService,useClass:mockCategoryService},
        { provide: MatDialogRef, useValue: mockDialogRef },{ provide: MAT_DIALOG_DATA, useValue: model }]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close() method',()=>{
    component.close();
    fixture.detectChanges();
    expect(component.close).toBeTruthy();
  });

  it('should call onKeyPressEnter() method',()=>{
    let $event={keyCode:13};
    component.onKeyPressEnter($event);
    fixture.detectChanges();
    expect(component.onKeyPressEnter).toBeTruthy();
  });

  it('should call create() method',()=>{
    component.category.name=true;
    component.create();
    fixture.detectChanges();
    expect(component.create).toBeTruthy();
  });

  it('should call checkValid() method',()=>{
    component.checkValid();
    fixture.detectChanges();
    expect(component.checkValid).toBeTruthy();
  });
});
