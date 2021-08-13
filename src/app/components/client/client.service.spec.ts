import { TestBed, inject } from '@angular/core/testing';

import { ClientService } from './client.service';
import { HttpClientService } from '../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../Test/mockHttpClientServiceClass';

describe('ClientService', () => {
  let service:ClientService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientService,{provide:HttpClientService,useClass:mockHttpClientServiceClass}]
    });
  });

  it('should be created', inject([ClientService], (service: ClientService) => {
    expect(service).toBeTruthy();
  }));

  it('should call the getClientList() method',()=>{
    service = TestBed.get(ClientService);
    let param;
    service.getClientList(param);
    expect(service.getClientList).toBeTruthy();
  });

  it('should call the getClientSetting() method',()=>{
    service = TestBed.get(ClientService);
    let param;
    service.getClientSetting(param);
    expect(service.getClientSetting).toBeTruthy();
  });

  it('should call the changeStatus() method',()=>{
    service = TestBed.get(ClientService);
    let param;
    service.changeStatus(param);
    expect(service.changeStatus).toBeTruthy();
  });

  it('should call the getClientDetailById() method',()=>{
    service = TestBed.get(ClientService);
    let param;
    service.getClientDetailById(param);
    expect(service.getClientDetailById).toBeTruthy();
  });

  it('should call the submitClientDetail() method',()=>{
    service = TestBed.get(ClientService);
    let param,type="put";
    service.submitClientDetail(param,type);
    expect(service.submitClientDetail).toBeTruthy();
  });

  it('should call the putClientSetting() method',()=>{
    service = TestBed.get(ClientService);
    let param;
    service.putClientSetting(param);
    expect(service.putClientSetting).toBeTruthy();
  });

  it('should call the getThemeSettings() method',()=>{
    service = TestBed.get(ClientService);
    let param;
    service.getThemeSettings(param);
    expect(service.getThemeSettings).toBeTruthy();
  });

  it('should call the uploadThemeSettings() method',()=>{
    service = TestBed.get(ClientService);
    let file="",param;
    service.uploadThemeSettings(file,param);
    expect(service.uploadThemeSettings).toBeTruthy();
  });

  it('should call the downloadLogo() method',()=>{
    service = TestBed.get(ClientService);
    let param;
    service.downloadLogo(param);
    expect(service.downloadLogo).toBeTruthy();
  });

  it('should call the createStore() method',()=>{
    service = TestBed.get(ClientService);
    let param;
    service.createStore(param);
    expect(service.createStore).toBeTruthy();
  });

  it('should call the putModuleServicePage() method',()=>{
    service = TestBed.get(ClientService);
    let param;
    service.putModuleServicePage(param);
    expect(service.putModuleServicePage).toBeTruthy();
  });

  it('should call the getClientModuleSetting() method',()=>{
    service = TestBed.get(ClientService);
    let param;
    service.getClientModuleSetting(param);
    expect(service.getClientModuleSetting).toBeTruthy();
  });

  it('should call the putOrderingDetail() method',()=>{
    service = TestBed.get(ClientService);
    let param;
    service.putOrderingDetail(param);
    expect(service.putOrderingDetail).toBeTruthy();
  });

  it('should call the putSignUpDetail() method',()=>{
    service = TestBed.get(ClientService);
    let param;
    service.putSignUpDetail(param);
    expect(service.putSignUpDetail).toBeTruthy();
  });

  it('should call the putEventDetail() method',()=>{
    service = TestBed.get(ClientService);
    let param;
    service.putEventDetail(param);
    expect(service.putEventDetail).toBeTruthy();
  });

  it('should call the deleteHelpResource() method',()=>{
    service = TestBed.get(ClientService);
    let param;
    service.deleteHelpResource(param);
    expect(service.deleteHelpResource).toBeTruthy();
  });

  it('should call the getAccountManagerList() method',()=>{
    service = TestBed.get(ClientService);
    let param;
    service.getAccountManagerList(param);
    expect(service.getAccountManagerList).toBeTruthy();
  });

  it('should call the getProductExcelList() method',()=>{
    service = TestBed.get(ClientService);
    let param;
    service.getProductExcelList(param);
    expect(service.getProductExcelList).toBeTruthy();
  });

  it('should call the renameExcelFile() method',()=>{
    service = TestBed.get(ClientService);
    let param;
    service.renameExcelFile(param);
    expect(service.renameExcelFile).toBeTruthy();
  });

  it('should call the downloadExcelFile() method',()=>{
    service = TestBed.get(ClientService);
    let param;
    service.downloadExcelFile(param);
    expect(service.downloadExcelFile).toBeTruthy();
  });

  it('should call the excelUpload() method',()=>{
    service = TestBed.get(ClientService);
    let param;
    service.excelUpload(param);
    expect(service.excelUpload).toBeTruthy();
  });

  it('should call the deleteExcelFile() method',()=>{
    service = TestBed.get(ClientService);
    let param;
    service.deleteExcelFile(param);
    expect(service.deleteExcelFile).toBeTruthy();
  });
});
