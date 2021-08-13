import { TestBed } from '@angular/core/testing';

import { InventoryService } from './inventory.service';
import { HttpClientService } from '../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../Test/mockHttpClientServiceClass';

describe('InventoryService', () => {
  let service:InventoryService;
  beforeEach(() => TestBed.configureTestingModule({
    providers:[InventoryService,
      {provide:HttpClientService,useClass:mockHttpClientServiceClass}
    ]
  }));

  it('should be created', () => {
    const service: InventoryService = TestBed.get(InventoryService);
    expect(service).toBeTruthy();
  });
  it('should call the getClientSetting() method',()=>{
    service = TestBed.get(InventoryService);
    let param=[];
    service.getClientSetting(param);
    expect(service.getClientSetting).toBeTruthy();
  });
  it('should call the getInventoryList() method',()=>{
    service = TestBed.get(InventoryService);
    let param=[];
    service.getInventoryList(param);
    expect(service.getInventoryList).toBeTruthy();
  });
  it('should call the getCategoryList() method',()=>{
    service = TestBed.get(InventoryService);
    let param=[];
    service.getCategoryList(param);
    expect(service.getCategoryList).toBeTruthy();
  });
  it('should call the getWarehouseList() method',()=>{
    service = TestBed.get(InventoryService);
    service.getWarehouseList();
    expect(service.getWarehouseList).toBeTruthy();
  });
  
  it('should call the getInventoryHistory() method',()=>{
    service = TestBed.get(InventoryService);
    let param=[];
    service.getInventoryHistory(param);
    expect(service.getInventoryHistory).toBeTruthy();
  });
  it('should call the getUpdateInventoryReason() method',()=>{
    service = TestBed.get(InventoryService);
    service.getUpdateInventoryReason();
    expect(service.getUpdateInventoryReason).toBeTruthy();
  });
  it('should call the getInventoryDetail() method',()=>{
    service = TestBed.get(InventoryService);
    let param=[];
    service.getInventoryDetail(param);
    expect(service.getInventoryDetail).toBeTruthy();
  });
  it('should call the updateInventoryDetail() method',()=>{
    service = TestBed.get(InventoryService);
    let param=[];
    service.updateInventoryDetail(param);
    expect(service.updateInventoryDetail).toBeTruthy();
  });
  it('should call the getInventoryAvailability() method',()=>{
    service = TestBed.get(InventoryService);
    let param=[];
    service.getInventoryAvailability(param);
    expect(service.getInventoryAvailability).toBeTruthy();
  });
});
