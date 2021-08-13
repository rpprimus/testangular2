import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Util } from './util';
import { mockUtil } from '../../../Test/mockUtil';
import { Router } from '@angular/router';
import { HttpClientService } from './http-client.service';
import { mockHttpClientServiceClass } from '../../../Test/mockHttpClientServiceClass';
import { Common } from '../../store/utility/common';
import { mockCommon } from '../../../Test/mockCommon';
import { CookieService } from 'ngx-cookie-service';
import { NgZone } from '@angular/core';

describe('AuthService', () => {
  let router={
    navigate: jasmine.createSpy('navigate')
}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService,{provide:Util,useClass:mockUtil},{provide:Router,useValue:router},CookieService,
      {provide:HttpClientService,useClass:mockHttpClientServiceClass},{provide:Common,useClass:mockCommon},
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should call getRequestedParamter() method', inject([AuthService], (service: AuthService) => {
    let url="a=b&c=d",key="a";
    service.getRequestedParamter(url,key);
    expect(service.getRequestedParamter).toBeTruthy();
  }));

  it('should call getUserInfo() method', inject([AuthService], (service: AuthService) => {
    service.getUserInfo();
    expect(service.getUserInfo).toBeTruthy();
  }));

  it('should call isRoleExists() method', inject([AuthService], (service: AuthService) => {
    let codes=["ADMIN"];
    service.isRoleExists(codes);
    expect(service.isRoleExists).toBeTruthy();
  }));

  it('should call logOut() method', inject([AuthService], (service: AuthService) => {
    service.logOut();
    expect(service.logOut).toBeTruthy();
  }));

  it('should call isEmpty() method', inject([AuthService], (service: AuthService) => {
    let obj={};
    service.isEmpty(obj);
    expect(service.isEmpty).toBeTruthy();
  }));

  // it('should call sessionExpired() method', inject([AuthService], (service: AuthService) => {
  //   service.sessionExpired();
  //   expect(service.sessionExpired).toBeTruthy();
  // }));
});
