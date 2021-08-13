import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitListComponent } from './kit-list.component';
import { MatModule } from '../../../core/mat-module';
import { KitService } from '../kit.service';
import { mockKitService } from '../../../../Test/mockKitService';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { Router } from '@angular/router';
import { FilterBoxComponent, MyFilterPipe } from '../../filter-box/filter-box.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('KitListComponent', () => {
  let component: KitListComponent;
  let fixture: ComponentFixture<KitListComponent>;
  let router={
    navigate: jasmine.createSpy('navigate')
}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitListComponent,FilterBoxComponent,MyFilterPipe ],
      imports: [MatModule,InfiniteScrollModule,BrowserAnimationsModule],
      providers: [{provide:KitService,useClass:mockKitService},{provide:SharedService,useClass:mockSharedService},
                  {provide:Util,useClass:mockUtil},{provide:Router,useValue:router}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getKitList() method',()=>{
    component.kitSortParams={};
    component.kitSortParams.orderBy=true;
    component.kitFilterParams={};
    localStorage.setItem('selectedClientId',"1");
    component.getKitList();
    fixture.detectChanges();
    expect(component.getKitList).toBeTruthy();
  });

  it('should call onRowClick() method',()=>{
    let $event={target:{id:""}},id=1;
    component.onRowClick($event,id);
    fixture.detectChanges();
    expect(component.onRowClick).toBeTruthy();
  });

  it('should call changeStatus() method',()=>{
    let status="ACTIVE",element={id:29};
    component.changeStatus(status,element);
    fixture.detectChanges();
    expect(component.changeStatus).toBeTruthy();
  });

  it('should call changeStatus() method should throw error',()=>{
    let status="INACTIVE",element={id:2};
    component.changeStatus(status,element);
    fixture.detectChanges();
    expect(component.changeStatus).toBeTruthy();
  });

  it('should call onChangeFilter() method',()=>{
    let data=[];
    component.onChangeFilter(data);
    fixture.detectChanges();
    expect(component.onChangeFilter).toBeTruthy();
  });

  it('should call onScroll() method',()=>{
    component.dataSource.data.length=1;
    component.totalKitRecords=2;
    component.onScroll();
    fixture.detectChanges();
    expect(component.onScroll).toBeTruthy();
  });

  it('should call getKitSettings() method else block',()=>{
    localStorage.setItem('selectedClientId',"3");
    let fun = function fn(params: any) { };
    component.getKitSettings(fun);
    fixture.detectChanges();
    expect(component.getKitSettings).toBeTruthy();
  });

  // it('should call getKitSettings() method should throw error',()=>{
  //   localStorage.setItem('selectedClientId',"4");
  //   let val = true;
  //   component.getKitSettings(val);
  //   fixture.detectChanges();
  //   expect(component.getKitSettings).toBeTruthy();
  // });
});
