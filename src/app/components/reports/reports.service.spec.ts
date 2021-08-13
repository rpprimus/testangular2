import { TestBed } from '@angular/core/testing';

import { ReportsService } from './reports.service';
import { HttpClientService } from '../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../Test/mockHttpClientServiceClass';

describe('ReportsService', () => {
  let service:ReportsService;
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ReportsService,{provide:HttpClientService,useClass:mockHttpClientServiceClass}]
  }));

  it('should be created', () => {
    service = TestBed.get(ReportsService);
    expect(service).toBeTruthy();
  });

  it('should call the getReports() method',()=>{
    service = TestBed.get(ReportsService);
    let url,param;
    service.getReports(url,param);
    expect(service.getReports).toBeTruthy();
  });

  it('should call the getProducts() method',()=>{
    service = TestBed.get(ReportsService);
    let param;
    service.getProducts(param);
    expect(service.getProducts).toBeTruthy();
  });

  it('should call the getCategories() method',()=>{
    service = TestBed.get(ReportsService);
    let param;
    service.getCategories(param);
    expect(service.getCategories).toBeTruthy();
  });
});
