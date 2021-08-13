import { TestBed } from '@angular/core/testing';

import { WarehouseService } from './warehouse.service';
import { HttpClientService } from '../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../Test/mockHttpClientServiceClass';

describe('WarehouseService', () => {
  let service:WarehouseService;
  beforeEach(() => TestBed.configureTestingModule({
    providers:[WarehouseService,{provide:HttpClientService,useClass:mockHttpClientServiceClass}]
  }));

  it('should be created', () => {
    service = TestBed.get(WarehouseService);
    expect(service).toBeTruthy();
  });

  it('should call the getWarehouseList() method',()=>{
    service = TestBed.get(WarehouseService);
    service.getWarehouseList();
    expect(service.getWarehouseList).toBeTruthy();
  });

  it('should call the saveWarehouse() method',()=>{
    service = TestBed.get(WarehouseService);
    let param,type="put";
    service.saveWarehouse(param,type);
    expect(service.saveWarehouse).toBeTruthy();
  });
});
