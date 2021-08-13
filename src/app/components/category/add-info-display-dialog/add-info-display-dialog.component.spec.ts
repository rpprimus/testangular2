import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInfoDisplayDialogComponent } from './add-info-display-dialog.component';
import { MatModule } from '../../../core/mat-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { CategoryService } from '../category.service';
import { mockCategoryService } from '../../../../Test/mockCategoryService';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CKEditorModule } from 'ng2-ckeditor';

describe('AddInfoDisplayDialogComponent', () => {
  let component: AddInfoDisplayDialogComponent;
  let fixture: ComponentFixture<AddInfoDisplayDialogComponent>;
  const mockDialogRef = {
    close: (dialogResult: any) => { }
  };
  const model = {childData:{name:""}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInfoDisplayDialogComponent ],
      imports: [MatModule,BrowserAnimationsModule,CKEditorModule],
      providers: [{provide:Util,useClass:mockUtil},{provide:SharedService,useClass:mockSharedService},{provide:CategoryService,useClass:mockCategoryService},
        { provide: MatDialogRef, useValue: mockDialogRef },{ provide: MAT_DIALOG_DATA, useValue: model }]
    
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInfoDisplayDialogComponent);
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

  it('should call addInfo() method',()=>{
    component.addInfo();
    fixture.detectChanges();
    expect(component.addInfo).toBeTruthy();
  });

  it('should call delete() method',()=>{
    component.delete();
    fixture.detectChanges();
    expect(component.delete).toBeTruthy();
  });

  it('should call checkValid() method',()=>{
    component.checkValid();
    fixture.detectChanges();
    expect(component.checkValid).toBeTruthy();
  });
});
