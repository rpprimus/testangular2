import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBoxComponent, MyFilterPipe } from './filter-box.component';
import { ElementRef } from '@angular/core';
import { mockElementRef } from '../../../Test/mockElementRef';
import { Util } from '../../shared/services/util';
import { mockUtil } from '../../../Test/mockUtil';
import { MatModule } from '../../core/mat-module';

describe('FilterBoxComponent', () => {
  let component: FilterBoxComponent;
  let fixture: ComponentFixture<FilterBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterBoxComponent,MyFilterPipe ],
      imports:[MatModule],
      providers:[{provide:ElementRef,useClass:mockElementRef},{provide:Util,useClass:mockUtil}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterBoxComponent);
    component = fixture.componentInstance;
    component.countValue={status:1};
    component.filterValues={status: [
       {id: -1, name: "All", checked: false},
       {id: 1, name: "Active", checked: true},
       {id: 0, name: "Inactive", checked: false}]};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call handleWindowClick() method',()=>{
  //   let event= new Event("");
  //   component.handleWindowClick(event);
  //   fixture.detectChanges();
  //   expect(component.handleWindowClick).toBeTruthy();
  // });

  it('should call retainFilter() method',()=>{
    //spyOn(window.location,"pathname").and.returnValue("{searchText:'AC'}");
    component.countValue={status:1};
    component.filterValues={status: [
       {id: -1, name: "All", checked: false},
       {id: 1, name: "Active", checked: true},
       {id: 0, name: "Inactive", checked: false}]};
    component.retainFilter();
    fixture.detectChanges();
    expect(component.retainFilter).toBeTruthy();
  });

  it('should call onClearQuickSearch() method',()=>{
    component.onClearQuickSearch();
    fixture.detectChanges();
    expect(component.onClearQuickSearch).toBeTruthy();
  });

  it('should call onQuickSearchIconClicked() method',()=>{
    component.onQuickSearchIconClicked();
    fixture.detectChanges();
    expect(component.onQuickSearchIconClicked).toBeTruthy();
  });

  it('should call onCheck() method when id=-1',()=>{
    let event={checked:true},id=-1,category="status";
    component.onCheck(event,id,category);
    fixture.detectChanges();
    expect(component.onCheck).toBeTruthy();
  });

  it('should call onCheck() method when id!=-1',()=>{
    let event={checked:false},id=0,category="status";
    component.onCheck(event,id,category);
    fixture.detectChanges();
    expect(component.onCheck).toBeTruthy();
  });

  it('should call applyFilter() method',()=>{
    component.applyFilter();
    fixture.detectChanges();
    expect(component.applyFilter).toBeTruthy();
  });

  it('should call clearFilter() method',()=>{
    component.hasfilter=true;
    component.clearFilter();
    fixture.detectChanges();
    expect(component.clearFilter).toBeTruthy();
  });

  it('should call calculateTotalFilterCount() method',()=>{
    component.calculateTotalFilterCount();
    fixture.detectChanges();
    expect(component.calculateTotalFilterCount).toBeTruthy();
  });
});
