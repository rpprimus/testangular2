import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryHistoryListComponent } from './inventory-history-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatModule } from '../../../core/mat-module';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { InventoryService } from '../inventory.service';
import { MockInventoryService } from '../../../../Test/mockInventoryService.service';
import { ActivatedRoute } from '@angular/router';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';

describe('InventoryHistoryListComponent', () => {
  let component: InventoryHistoryListComponent;
  let fixture: ComponentFixture<InventoryHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryHistoryListComponent ],
      providers:[
        {provide:SharedService,useClass:mockSharedService},
        {provide:InventoryService,useClass:MockInventoryService},
        {provide:Util,useClass:mockUtil},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
                routeConfig:{
                  path:"resetpassword/:id"
                },
                params:{
                  id:"210",
                  value:"5",
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
      imports:[InfiniteScrollModule,MatModule],
      schemas:[]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getInventoryHistoryList method', () => {
      let pageNumber=1;
    component.getInventoryHistoryList(pageNumber,false);
    expect(component.getInventoryHistoryList).toBeTruthy();
  });
});
