import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientService } from '../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../Test/mockHttpClientServiceClass';

describe('UserService', () => {
  let service:UserService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService,{provide:HttpClientService,useClass:mockHttpClientServiceClass}]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('should call the getRoles() method',()=>{
    service = TestBed.get(UserService);
    let param;
    service.getRoles(param);
    expect(service.getRoles).toBeTruthy();
  });

  it('should call the getClients() method',()=>{
    service = TestBed.get(UserService);
    service.getClients();
    expect(service.getClients).toBeTruthy();
  });

  it('should call the submitUser() method',()=>{
    service = TestBed.get(UserService);
    let param,type="put";
    service.submitUser(param,type);
    expect(service.submitUser).toBeTruthy();
  });

  it('should call the getUserList() method',()=>{
    service = TestBed.get(UserService);
    let param;
    service.getUserList(param);
    expect(service.getUserList).toBeTruthy();
  });

  it('should call the getUserById() method',()=>{
    service = TestBed.get(UserService);
    let param;
    service.getUserById(param);
    expect(service.getUserById).toBeTruthy();
  });

  it('should call the getClientsById() method',()=>{
    service = TestBed.get(UserService);
    let param;
    service.getClientsById(param);
    expect(service.getClientsById).toBeTruthy();
  });

  it('should call the changeStatus() method',()=>{
    service = TestBed.get(UserService);
    let param;
    service.changeStatus(param);
    expect(service.changeStatus).toBeTruthy();
  });
});
