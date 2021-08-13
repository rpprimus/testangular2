import { TestBed } from '@angular/core/testing';

import { StoreService } from './store.service';
import { HttpClientService } from '../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../Test/mockHttpClientServiceClass';
import { Common } from '../utility/common';
import { mockCommon } from '../../../Test/mockCommon';
import { MatModule } from '../../core/mat-module';

describe('StoreService', () => {
  let service:StoreService;
  beforeEach(() => TestBed.configureTestingModule({
    providers:[StoreService,
      {provide: HttpClientService,useClass:mockHttpClientServiceClass},
     {provide:Common,useClass:mockCommon},
    ],
    imports:[MatModule],
  }));

  it('should be created', () => {
    const service: StoreService = TestBed.get(StoreService);
    expect(service).toBeTruthy();
  });
  it('should call the signUpClient() method',()=>{
    service = TestBed.get(StoreService);
    let param=[];
    service.signUpClient(param);
    expect(service.signUpClient).toBeTruthy();
  });
  it('should call the getHierarchy() method',()=>{
    service = TestBed.get(StoreService);
    let param=[];
    service.getHierarchy(param);
    expect(service.getHierarchy).toBeTruthy();
  });
  it('should call the getClientSetting() method',()=>{
    service = TestBed.get(StoreService);
    let param=[];
    service.getClientSetting(param);
    expect(service.getClientSetting).toBeTruthy();
  });
  it('should call the passwordResetRequest() method',()=>{
    service = TestBed.get(StoreService);
    let param=[];
    service.passwordResetRequest(param);
    expect(service.passwordResetRequest).toBeTruthy();
  });
  it('should call the resetPassword() method',()=>{
    service = TestBed.get(StoreService);
    let param=[];
    service.resetPassword(param);
    expect(service.resetPassword).toBeTruthy();
  });
  it('should call the browseProductList() method',()=>{
    service = TestBed.get(StoreService);
    let param=[];
    service.browseProductList(param);
    expect(service.browseProductList).toBeTruthy();
  });
  it('should call the getUserInfo() method',()=>{
    service = TestBed.get(StoreService);
    service.getUserInfo();
    expect(service.getUserInfo).toBeTruthy();
  });
  it('should call the getCategories() method',()=>{
    service = TestBed.get(StoreService);
    let param=[];
    service.getCategories(param);
    expect(service.getCategories).toBeTruthy();
  });
  it('should call the getProductDetail() method',()=>{
    service = TestBed.get(StoreService);
    let param=[];
    service.getProductDetail(param);
    expect(service.getProductDetail).toBeTruthy();
  });
  it('should call the placeOrder() method',()=>{
    service = TestBed.get(StoreService);
    let param=[];
    service.placeOrder(param);
    expect(service.placeOrder).toBeTruthy();
  });
  it('should call the getOrderList() method',()=>{
    service = TestBed.get(StoreService);
    let param=[];
    service.getOrderList(param);
    expect(service.getOrderList).toBeTruthy();
  });
  it('should call the getHeaderFooter() method',()=>{
    service = TestBed.get(StoreService);
    let param=[];
    service.getHeaderFooter(param);
    expect(service.getHeaderFooter).toBeTruthy();
  });
  it('should call the getRequestor() method',()=>{
    service = TestBed.get(StoreService);
    let param=[];
    service.getRequestor(param);
    expect(service.getRequestor).toBeTruthy();
  });
  it('should call the addEvent() method',()=>{
    service = TestBed.get(StoreService);
    let param=[];
    service.addEvent(param);
    expect(service.addEvent).toBeTruthy();
  });
  it('should call the updateEvent() method',()=>{
    service = TestBed.get(StoreService);
    let param=[];
    service.updateEvent(param);
    expect(service.updateEvent).toBeTruthy();
  });
  it('should call the getEvent() method',()=>{
    service = TestBed.get(StoreService);
    let param=[];
    service.getEvent(param);
    expect(service.getEvent).toBeTruthy();
  });
  it('should call the getAllEvents() method',()=>{
    service = TestBed.get(StoreService);
    let param=[];
    service.getAllEvents(param);
    expect(service.getAllEvents).toBeTruthy();
  });
  it('should call the browseKitList() method',()=>{
    service = TestBed.get(StoreService);
    let param=[];
    service.browseKitList(param);
    expect(service.browseKitList).toBeTruthy();
  });
  it('should call the getKitDetail() method',()=>{
    service = TestBed.get(StoreService);
    let param=[];
    service.getKitDetail(param);
    expect(service.getKitDetail).toBeTruthy();
  });
  it('should call the getHelpAndResourceList() method',()=>{
    service = TestBed.get(StoreService);
    let param=[];
    service.getHelpAndResourceList(param);
    expect(service.getHelpAndResourceList).toBeTruthy();
  });
  it('should call the downloadHelpAndResourceList() method',()=>{
    service = TestBed.get(StoreService);
    let param=[];
    service.downloadHelpAndResourceList(param);
    expect(service.downloadHelpAndResourceList).toBeTruthy();
  });
  it('should call the addToCart() method',()=>{
    service = TestBed.get(StoreService);
    let data=[];
    service.addToCart(data);
    expect(service.addToCart).toBeTruthy();
  });
  it('should call the getAssociateOrdering() method',()=>{
    service = TestBed.get(StoreService);
    let data=[];
    let value="";
    service.getAssociateOrdering(value,data);
    expect(service.getAssociateOrdering).toBeTruthy();
  });
  it('should call the saveCard() method',()=>{
    service = TestBed.get(StoreService);
    let param=[];
    service.saveCard(param);
    expect(service.saveCard).toBeTruthy();
  });
  it('should call the getUserCreditCards() method',()=>{
    service = TestBed.get(StoreService);
    let param=[];
    service.getUserCreditCards(param);
    expect(service.getUserCreditCards).toBeTruthy();
  });
  it('should call the getCreditCardInfo() method',()=>{
    service = TestBed.get(StoreService);
    let param=[];
    service.getCreditCardInfo(param);
    expect(service.getCreditCardInfo).toBeTruthy();
  });
  it('should call the deleteCard() method',()=>{
    service = TestBed.get(StoreService);
    let param=[];
    service.deleteCard(param);
    expect(service.deleteCard).toBeTruthy();
  });
});
