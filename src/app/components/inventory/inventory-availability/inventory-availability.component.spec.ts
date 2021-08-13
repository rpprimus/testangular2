import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryAvailabilityComponent } from './inventory-availability.component';
import { MatModule } from '../../../core/mat-module';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { InventoryService } from '../inventory.service';
import { MockInventoryService } from '../../../../Test/mockInventoryService.service';
import { ActivatedRoute } from '@angular/router';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('InventoryAvailabilityComponent', () => {
  let component: InventoryAvailabilityComponent;
  let fixture: ComponentFixture<InventoryAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryAvailabilityComponent ],
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
      imports:[MatModule,BrowserAnimationsModule],
      schemas:[]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should create', () => {
    let value="";
    component.validateDate(value);
    expect(component.validateDate).toBeTruthy();
  });
});
