import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryListComponent } from './inventory-list.component';
import { FilterBoxComponent, MyFilterPipe } from '../../filter-box/filter-box.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatModule } from '../../../../app/core/mat-module';
import { RouterTestingModule } from '@angular/router/testing';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { InventoryService } from '../inventory.service';
import { MockInventoryService } from '../../../../Test/mockInventoryService.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('InventoryListComponent', () => {
  let component: InventoryListComponent;
  let fixture: ComponentFixture<InventoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryListComponent,FilterBoxComponent,MyFilterPipe ],
      providers:[
        {provide:Util, useClass:mockUtil},
        {provide:SharedService, useClass:mockSharedService},
        {provide:InventoryService, useClass:MockInventoryService},
      ],
      imports:[InfiniteScrollModule,MatModule,RouterTestingModule,BrowserAnimationsModule],
      schemas:[]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryListComponent);
    component = fixture.componentInstance;
    component.filterParam = 
    {categoryIds:{
      0: 90,
      1: 91,
      2: 92
    },
       visibilityGroupIds: {
        0: 81,
        1: 82,
        2: 83,
        3: 95,
        4: 118,
        5: 119,
        6: 139,
       }, 
       warehouseIds: {
        0: 76
       }}
    fixture.detectChanges();
  });

 
  it('should create', () => {
    localStorage.setItem('selectedClientId','37')
    let filterParam:any={
    searchText:"a"
    }
    expect(component).toBeTruthy();
  });
  it('should call onScroll method', () => {    
     
    component.onScroll();
    expect(component.onScroll).toBeTruthy();
  });
  it('should create getInventorySettings method', () => {
     
    let param = {pathVariable: "37"}
    component.getInventorySettings();
    expect(component.getInventorySettings).toBeTruthy();
  });
  it('should call onChangeFilter method', () => {
     
    let data:any;
    component.onChangeFilter(data);
    expect(component.onChangeFilter).toBeTruthy();
  });
});
