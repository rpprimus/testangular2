import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseListComponent } from './warehouse-list.component';
import { MatModule } from '../../../core/mat-module';
import { WarehouseService } from '../warehouse.service';
import { mockWarehouseService } from '../../../../Test/mockWarehouseService';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('WarehouseListComponent', () => {
  let component: WarehouseListComponent;
  let fixture: ComponentFixture<WarehouseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseListComponent ],
      imports : [MatModule,BrowserAnimationsModule],
      providers : [{provide:WarehouseService,useClass:mockWarehouseService},{provide:SharedService,useClass:mockSharedService},
                   {provide:Util,useClass:mockUtil}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call save() method',()=>{
    component.warehouseName="Amazonuat";
    component.isFormSubmitted=false;
    let element={};
    component.save(element);
    fixture.detectChanges();
    expect(component.save).toBeTruthy();
  });

  it('should call save() method else block',()=>{
    component.warehouseName="";
    component.isFormSubmitted=true;
    let element={};
    component.save(element);
    fixture.detectChanges();
    expect(component.save).toBeTruthy();
  });

  it('should call save() method, and throw error',()=>{
    component.warehouseName="Amazonuat";
    component.isFormSubmitted=false;
    component.id=1;
    let element={};
    component.save(element);
    fixture.detectChanges();
    expect(component.save).toBeTruthy();
  });

  it('should call editWarehouse() method',()=>{
    let data={name:"",id:1}; 
    component.editWarehouse(data);
    fixture.detectChanges();
    expect(component.editWarehouse).toBeTruthy();
  });

  it('should call onCancel() method',()=>{
    let element={};
    component.onCancel(element);
    fixture.detectChanges();
    expect(component.onCancel).toBeTruthy();
  });
});
