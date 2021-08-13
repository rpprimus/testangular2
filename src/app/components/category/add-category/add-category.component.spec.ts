import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryComponent } from './add-category.component';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { CategoryService } from '../category.service';
import { mockCategoryService } from '../../../../Test/mockCategoryService';
import { MatModule } from '../../../core/mat-module';
import { CategoryTreeComponent, CategoryTreeActionBtnComponent } from '../category-tree/category-tree.component';
import { CategoryDragDropComponent } from '../category-drag-drop/category-drag-drop.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddCategoryComponent', () => {
  let component: AddCategoryComponent;
  let fixture: ComponentFixture<AddCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCategoryComponent,CategoryTreeComponent,CategoryTreeActionBtnComponent,CategoryDragDropComponent ],
      imports: [MatModule,BrowserAnimationsModule],
      providers: [{provide:Util,useClass:mockUtil},{provide:SharedService,useClass:mockSharedService},{provide:CategoryService,useClass:mockCategoryService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryComponent);
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

  it('should call onKeyPress() method',()=>{
    component.category.name="APG0001";
    let $event={keyCode :13};
    component.onKeyPress($event);
    fixture.detectChanges();
    expect(component.onKeyPress).toBeTruthy();
  });
});
