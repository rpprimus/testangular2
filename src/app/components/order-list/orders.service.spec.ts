import { TestBed } from '@angular/core/testing';

import { OrdersService } from './orders.service';
import { HttpClientService } from '../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../Test/mockHttpClientServiceClass';

describe('OrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[OrdersService,{provide:HttpClientService,useClass:mockHttpClientServiceClass}]
  }));

  it('should be created', () => {
    const service: OrdersService = TestBed.get(OrdersService);
    expect(service).toBeTruthy();
  });

  it('should call cancelOrder() method', () => {
    const service: OrdersService = TestBed.get(OrdersService);
    let param;
    service.cancelOrder(param);
    expect(service.cancelOrder).toBeTruthy();
  });

  it('should call getOrderList() method', () => {
    const service: OrdersService = TestBed.get(OrdersService);
    let param;
    service.getOrderList(param);
    expect(service.getOrderList).toBeTruthy();
  });

  it('should call getStatus() method', () => {
    const service: OrdersService = TestBed.get(OrdersService);
    service.getStatus();
    expect(service.getStatus).toBeTruthy();
  });
});
