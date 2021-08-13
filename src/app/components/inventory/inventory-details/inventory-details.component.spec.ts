import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryDetailsComponent } from './inventory-details.component';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatModule } from '../../../core/mat-module';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { InventoryService } from '../inventory.service';
import { MockInventoryService } from '../../../../Test/mockInventoryService.service';
import { ActivatedRoute } from '@angular/router';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';

describe('InventoryDetailsComponent', () => {
  let component: InventoryDetailsComponent;
  let fixture: ComponentFixture<InventoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryDetailsComponent ],
      providers:[
        {provide:SharedService, useClass:mockSharedService},
        {provide:InventoryService, useClass:MockInventoryService},
        {provide:Util, useClass:mockUtil},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
                routeConfig:{
                  path:"resetpassword/:id"
                },
                params:{
                  id:"1411",//1893
                  value:"35",
                  pageSize:11,
                  pageNumber:22,
                  fromDate:"11-18-2018",
                  toDaTe:"12-08-2018",
                  length:"5",
                  clientId:"10",
                  categoryId:"222",
                  sortBy:""

                }  ,
                queryParams:{
                  ClientId:"2", 
                  kit:{
                    isKit:true,
                  },
                  value:"5"
                }   
                },
                queryParams:{
                  ClientId:"2", 
                  value:{
                    kit:true
                  }
            },
            
        }, 
         }
      ],
      imports:[FormsModule,InfiniteScrollModule,MatModule],
      schemas:[]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call onScroll method', () => {
    component.onScroll();
    expect(component.onScroll).toBeTruthy();
  });
  it('should call getUpdatedValue and restrictUpdatedQuantity method', () => {
    let item=
     {id: 1411, 
      warehouseName: "LA Warehouse", 
      totalQuantity: 35,
      updatedQuantity:10,
       isEdit: true,
        isRequired: true,}
    component.getUpdatedValue(item);
    expect(component.getUpdatedValue).toBeTruthy();
    component.restrictUpdatedQuantity(item);
    expect(component.restrictUpdatedQuantity).toBeTruthy();
  });
  it('should call updateInventoryDetail method', () => {
    let item=    {id: 1411, 
     warehouseName: "LA Warehouse", 
     totalQuantity: 35,
      isEdit: true,
       isRequired: true,
       reasonId:24,
      notes:"This warehouse is in LA"}
    component.updateInventoryDetail(item);
    expect(component.updateInventoryDetail).toBeTruthy();
  });
  it('should call isValid and close method', () => { 
    let item=
    {id: 1411, 
     warehouseName: "LA Warehouse", 
     totalQuantity: 35,
      isEdit: true,
       isRequired: true,}
    component.isValid(item);
    expect(component.isValid).toBeTruthy();
    component.close(item);
    expect(component.close).toBeTruthy();

  });
});
