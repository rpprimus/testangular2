import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { StoreCategoriesComponent } from './store-categories.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { MatModule } from '../../../core/mat-module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material';
import { LeftPanelCategoryService } from '../order/left-panel-category.service';
import { Common } from '../../utility/common';
import { mockCommon } from '../../../../Test/mockCommon';
import { StoreService } from '../../service/store.service';
import { mockStoreService } from '../../../../Test/mockStoreService';
import { Util } from '../../../shared/services/util';
import { DebugElement } from '@angular/core';
import { StoreCategoryInfoComponent } from '../store-category-info/store-category-info.component';
import { mockLeftPanelCategoryServive } from '../../../../Test/mockLeftPanelCategoryService';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('StoreCategoriesComponent', () => {
  let component: StoreCategoriesComponent;
  let fixture: ComponentFixture<StoreCategoriesComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCategoriesComponent,StoreCategoryInfoComponent],
      imports:[FormsModule,RouterTestingModule, BrowserModule, MatModule, HttpClientModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers:[Util,MatDialog,
      {provide:Common,useClass:mockCommon},
      {provide:StoreService,useClass:mockStoreService},
      {provide:LeftPanelCategoryService,useClass:mockLeftPanelCategoryServive}],
      
    }).overrideModule(BrowserDynamicTestingModule,{
      set: {
        entryComponents: [StoreCategoryInfoComponent]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the selectCategory() method',()=>{
    
    let category={
      childrens:[],
      parents:[],
      isInfoAvailable:"true",
      title:"fdghgvfc",
      description:""
    };
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
    component.selectCategory(category,event);
    fixture.detectChanges();
    expect(component.selectCategory).toBeTruthy();
  });

  it('should call changedCategoryId() method',()=>{
    component.changedCategoryId();
    fixture.detectChanges();
    expect(component.changedCategoryId).toBeTruthy();
  });
  
  it('should call unselectCategory() method',()=>{
    let category={
      childrens:[],
      parents:[],
      isInfoAvailable:true,
      title:"",
      description:""
    };
    component.unselectCategory(category);
    fixture.detectChanges();
    expect(component.unselectCategory).toBeTruthy();
  });

  it('should call clearProductSearch() method',()=>{
    component.clearProductSearch();
    fixture.detectChanges();
    expect(component.clearProductSearch).toBeTruthy();
  });
});
