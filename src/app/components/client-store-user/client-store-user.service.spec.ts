import { TestBed } from '@angular/core/testing';

import { ClientStoreUserService } from './client-store-user.service';
import { HttpClientService } from '../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../Test/mockHttpClientServiceClass';

describe('ClientStoreUserService', () => {
  let service:ClientStoreUserService;
  beforeEach(() => TestBed.configureTestingModule({
    providers:[ClientStoreUserService,
    {provide:HttpClientService,useClass:mockHttpClientServiceClass}]
  }));

  it('should be created', () => {
    service = TestBed.get(ClientStoreUserService);
    expect(service).toBeTruthy();
  });

  it('should call the getStoreUserList() method',()=>{
    service = TestBed.get(ClientStoreUserService);
    let param;
    service.getStoreUserList(param);
    expect(service.getStoreUserList).toBeTruthy();
  });

  it('should call the getRoles() method',()=>{
    service = TestBed.get(ClientStoreUserService);
    let param;
    service.getRoles(param);
    expect(service.getRoles).toBeTruthy();
  });

  it('should call the getHierarchy() method',()=>{
    service = TestBed.get(ClientStoreUserService);
    let param;
    service.getHierarchy(param);
    expect(service.getHierarchy).toBeTruthy();
  });

  it('should call the changeStatus() method',()=>{
    service = TestBed.get(ClientStoreUserService);
    let param;
    service.changeStatus(param);
    expect(service.changeStatus).toBeTruthy();
  });

  it('should call the resendEmailVerification() method',()=>{
    service = TestBed.get(ClientStoreUserService);
    let param;
    service.resendEmailVerification(param);
    expect(service.resendEmailVerification).toBeTruthy();
  });
  
  it('should call the getStoreUser() method',()=>{
    service = TestBed.get(ClientStoreUserService);
    let param;
    service.getStoreUser(param);
    expect(service.getStoreUser).toBeTruthy();
  });

  it('should call the getRegionalManager() method',()=>{
    service = TestBed.get(ClientStoreUserService);
    let param;
    service.getRegionalManager(param);
    expect(service.getRegionalManager).toBeTruthy();
  });

  it('should call the getVisibilityGroup() method',()=>{
    service = TestBed.get(ClientStoreUserService);
    let param;
    service.getVisibilityGroup(param);
    expect(service.getVisibilityGroup).toBeTruthy();
  });

  it('should call the addClientStoreUser() method',()=>{
    service = TestBed.get(ClientStoreUserService);
    let param,type="put";
    service.addClientStoreUser(param,type);
    expect(service.addClientStoreUser).toBeTruthy();
  });

  it('should call the getClientSetting() method',()=>{
    service = TestBed.get(ClientStoreUserService);
    let param;
    service.getClientSetting(param);
    expect(service.getClientSetting).toBeTruthy();
  });
});
