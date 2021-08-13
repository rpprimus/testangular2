import { TestBed } from '@angular/core/testing';

import { ManageOrderService } from './manage-order.service';
import { HttpClientService } from '../../../app/shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../Test/mockHttpClientServiceClass';
import { Util } from '../../../app/shared/services/util';
import { mockUtil } from '../../../Test/mockUtil';
import { CookieService } from 'ngx-cookie-service';

describe('ManageOrderService', () => {
  let service:ManageOrderService;
  beforeEach(() => TestBed.configureTestingModule({
    providers:[ManageOrderService,CookieService,
      {provide: HttpClientService,useClass:mockHttpClientServiceClass},
      {provide: Util,useClass:mockUtil},
    ],
  }));

  it('should be created', () => {
    const service: ManageOrderService = TestBed.get(ManageOrderService);
    expect(service).toBeTruthy();
  });
  it('should call the getOrders() method',()=>{
    service = TestBed.get(ManageOrderService);
    let param=[];
    service.getOrders(param);
    expect(service.getOrders).toBeTruthy();
  });
  it('should call the updateOrder() method',()=>{
    service = TestBed.get(ManageOrderService);
    let param=[];
    service.updateOrder(param);
    expect(service.updateOrder).toBeTruthy();
  });
  it('should call the updateOrderDetail() method',()=>{
    service = TestBed.get(ManageOrderService);
    let param=[];
    service.updateOrderDetail(param);
    expect(service.updateOrderDetail).toBeTruthy();
  });
  it('should call the searchProduct() method',()=>{
    service = TestBed.get(ManageOrderService);
    let param=[];
    service.searchProduct(param);
    expect(service.searchProduct).toBeTruthy();
  });
  it('should call the getProductInfo() method',()=>{
    service = TestBed.get(ManageOrderService);
    let param=[];
    service.getProductInfo(param);
    expect(service.getProductInfo).toBeTruthy();
  });
  it('should call the updateQuantity() method',()=>{
    service = TestBed.get(ManageOrderService);
    let param=[];
    service.updateQuantity(param);
    expect(service.updateQuantity).toBeTruthy();
  });
  it('should call the updateOrderToConfirm() method',()=>{
    service = TestBed.get(ManageOrderService);
    let param=[];
    service.updateOrderToConfirm(param);
    expect(service.updateOrderToConfirm).toBeTruthy();
  });
  it('should call the addNewProduct() method',()=>{
    service = TestBed.get(ManageOrderService);
    let param=[];
    service.addNewProduct(param);
    expect(service.addNewProduct).toBeTruthy();
  });
  it('should call the changeStatustoProcessing() method',()=>{
    service = TestBed.get(ManageOrderService);
    let param=[];
    service.changeStatustoProcessing(param);
    expect(service.changeStatustoProcessing).toBeTruthy();
  });
  it('should call the updateFreigthDetails() method',()=>{
    service = TestBed.get(ManageOrderService);
    let param=[];
    service.updateFreigthDetails(param);
    expect(service.updateFreigthDetails).toBeTruthy();
  });
  it('should call the changeStatustoReadyToShip() method',()=>{
    service = TestBed.get(ManageOrderService);
    let param=[];
    service.changeStatustoReadyToShip(param);
    expect(service.changeStatustoReadyToShip).toBeTruthy();
  });
  it('should call the getShipmentReasons() method',()=>{
    service = TestBed.get(ManageOrderService);
    service.getShipmentReasons();
    expect(service.getShipmentReasons).toBeTruthy();
  });
  it('should call the updateCarrierDetails() method',()=>{
    service = TestBed.get(ManageOrderService);
    let param=[];
    service.updateCarrierDetails(param);
    expect(service.updateCarrierDetails).toBeTruthy();
  });
  it('should call the changeStatustoShipped() method',()=>{
    service = TestBed.get(ManageOrderService);
    let param=[];
    service.changeStatustoShipped(param);
    expect(service.changeStatustoShipped).toBeTruthy();
  });
  it('should call the getWarehouseList() method',()=>{
    service = TestBed.get(ManageOrderService);
    service.getWarehouseList();
    expect(service.getWarehouseList).toBeTruthy();
  });
  it('should call the updateReceivingDetail() method',()=>{
    service = TestBed.get(ManageOrderService);
    let param=[];
    service.updateReceivingDetail(param);
    expect(service.updateReceivingDetail).toBeTruthy();
  });
  it('should call the changeStatusToReturned() method',()=>{
    service = TestBed.get(ManageOrderService);
    let param=[];
    service.changeStatusToReturned(param);
    expect(service.changeStatusToReturned).toBeTruthy();
  });
  it('should call the changeStatusToComplete() method',()=>{
    service = TestBed.get(ManageOrderService);
    let param=[];
    service.changeStatusToComplete(param);
    expect(service.changeStatusToComplete).toBeTruthy();
  });
  it('should call the cancelOrder() method',()=>{
    service = TestBed.get(ManageOrderService);
    let param=[];
    service.cancelOrder(param);
    expect(service.cancelOrder).toBeTruthy();
  });
  it('should call the printOrder() method',()=>{
    service = TestBed.get(ManageOrderService);
    let param=[];
    service.printOrder(param);
    expect(service.printOrder).toBeTruthy();
  });
  it('should call the deleteProductOnOrder() method',()=>{
    service = TestBed.get(ManageOrderService);
    let param=[];
    service.deleteProductOnOrder(param);
    expect(service.deleteProductOnOrder).toBeTruthy();
  });
  it('should call the getCreditCardForCardAdmin() method',()=>{
    service = TestBed.get(ManageOrderService);
    let param=[];
    service.getCreditCardForCardAdmin(param);
    expect(service.getCreditCardForCardAdmin).toBeTruthy();
  });
  // it('should call the loadModulesCustomFields() method',()=>{
  //   service = TestBed.get(ManageOrderService);
  //   let fn;
  //   service.loadModulesCustomFields(fn);
  //   expect(service.loadModulesCustomFields).toBeTruthy();
  // });
  it('should call the getClientSetting() method',()=>{
    service = TestBed.get(ManageOrderService);
    let param=[];
    service.getClientSetting(param);
    expect(service.getClientSetting).toBeTruthy();
  });
});
