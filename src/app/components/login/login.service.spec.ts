import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientService } from '../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../Test/mockHttpClientServiceClass';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService,{provide:HttpClientService,useClass:mockHttpClientServiceClass}]
    });
  });

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));

  it('should call authenticateUser() method', inject([LoginService], (service: LoginService) => {
    let param;
    service.authenticateUser(param);
    expect(service.authenticateUser).toBeTruthy();
  }));
});
