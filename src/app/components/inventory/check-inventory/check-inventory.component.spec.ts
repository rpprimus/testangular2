import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInventoryComponent } from './check-inventory.component';
import { InventoryAvailabilityComponent } from '../inventory-availability/inventory-availability.component';
import { InventoryDetailsComponent } from '../inventory-details/inventory-details.component';
import { InventoryHistoryListComponent } from '../inventory-history-list/inventory-history-list.component';
import { MatModule } from '../../../core/mat-module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { InventoryService } from '../inventory.service';
import { MockInventoryService } from '../../../../Test/mockInventoryService.service';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('CheckInventoryComponent', () => {
  let component: CheckInventoryComponent;
  let fixture: ComponentFixture<CheckInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckInventoryComponent ,
        InventoryAvailabilityComponent,InventoryDetailsComponent,
        InventoryHistoryListComponent],
        providers:[
          {provide:Util,useClass:mockUtil},
          {provide:SharedService,useClass:mockSharedService},
          {provide:InventoryService,useClass:MockInventoryService},
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
        imports:[MatModule,InfiniteScrollModule,BrowserAnimationsModule,RouterTestingModule],
        schemas:[]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
