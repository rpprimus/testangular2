import { TestBed } from '@angular/core/testing';

import { DashboardService } from './dashboard.service';
import { HttpClientService } from '../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../Test/mockHttpClientServiceClass';

describe('DashboardService', () => {
  let service:DashboardService;
  beforeEach(() => TestBed.configureTestingModule({
    providers:[DashboardService,{provide:HttpClientService,useClass:mockHttpClientServiceClass}]
  }));

  it('should be created', () => {
    service = TestBed.get(DashboardService);
    expect(service).toBeTruthy();
  });

  it('should call the getClients() method',()=>{
    service = TestBed.get(DashboardService);
    service.getClients();
    expect(service.getClients).toBeTruthy();
  });

  it('should call the getDashboard() method',()=>{
    service = TestBed.get(DashboardService);
    service.getDashboard();
    expect(service.getDashboard).toBeTruthy();
  });
});
