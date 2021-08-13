import { TestBed, inject } from '@angular/core/testing';

import { HttpClientService } from './http-client.service';
import { Util } from './util';
import { mockUtil } from '../../../Test/mockUtil';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

describe('HttpClientService', () => {
  let service:HttpClientService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClientService,{provide:Util,useClass:mockUtil},CookieService,HttpClient,
        HttpHandler]
    });
  });

  it('should be created', inject([HttpClientService], (service: HttpClientService) => {
    expect(service).toBeTruthy();
  }));

  it('should call the setHeader() method',()=>{
    service = TestBed.get(HttpClientService);
    service.setHeader();
    expect(service.setHeader).toBeTruthy();
  });

  it('should call the login() method',()=>{
    service = TestBed.get(HttpClientService);
    let url="";;
    service.login(url);
    expect(service.login).toBeTruthy();
  });

  it('should call the get() method',()=>{
    service = TestBed.get(HttpClientService);
    let url="";;
    service.get(url);
    expect(service.get).toBeTruthy();
  });

  it('should call the post() method',()=>{
    service = TestBed.get(HttpClientService);
    let url="";;
    service.post(url);
    expect(service.post).toBeTruthy();
  });

  it('should call the put() method',()=>{
    service = TestBed.get(HttpClientService);
    let url="";;
    service.put(url);
    expect(service.put).toBeTruthy();
  });

  it('should call the delete() method',()=>{
    service = TestBed.get(HttpClientService);
    let url="";;
    service.delete(url);
    expect(service.delete).toBeTruthy();
  });

  it('should call the upload() method',()=>{
    service = TestBed.get(HttpClientService);
    let url="",formData="";;
    service.upload(url,formData);
    expect(service.upload).toBeTruthy();
  });

  it('should call the getFiles() method',()=>{
    service = TestBed.get(HttpClientService);
    let url="";;
    service.getFiles(url);
    expect(service.getFiles).toBeTruthy();
  });
});
