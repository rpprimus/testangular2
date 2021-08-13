import { TestBed } from '@angular/core/testing';

import { KitService } from './kit.service';
import { HttpClientService } from '../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../Test/mockHttpClientServiceClass';

describe('KitService', () => {
  let service:KitService;
  beforeEach(() => TestBed.configureTestingModule({
    providers:[KitService,{provide:HttpClientService,useClass:mockHttpClientServiceClass}]
  }));

  it('should be created', () => {
    service = TestBed.get(KitService);
    expect(service).toBeTruthy();
  });

  it('should call the getKitList() method',()=>{
    service = TestBed.get(KitService);
    let param;
    service.getKitList(param);
    expect(service.getKitList).toBeTruthy();
  });

  it('should call the getClientSetting() method',()=>{
    service = TestBed.get(KitService);
    let param;
    service.getClientSetting(param);
    expect(service.getClientSetting).toBeTruthy();
  });

  it('should call the changeStatus() method',()=>{
    service = TestBed.get(KitService);
    let param;
    service.changeStatus(param);
    expect(service.changeStatus).toBeTruthy();
  });

  it('should call the getCategoryList() method',()=>{
    service = TestBed.get(KitService);
    let param;
    service.getCategoryList(param);
    expect(service.getCategoryList).toBeTruthy();
  });

  it('should call the getVisibilityGroup() method',()=>{
    service = TestBed.get(KitService);
    let param;
    service.getVisibilityGroup(param);
    expect(service.getVisibilityGroup).toBeTruthy();
  });

  it('should call the getKit() method',()=>{
    service = TestBed.get(KitService);
    let param;
    service.getKit(param);
    expect(service.getKit).toBeTruthy();
  });

  it('should call the saveKit() method',()=>{
    service = TestBed.get(KitService);
    let param,type="put";
    service.saveKit(param,type);
    expect(service.saveKit).toBeTruthy();
  });

  it('should call the markPrimaryImage() method',()=>{
    service = TestBed.get(KitService);
    let param;
    service.markPrimaryImage(param);
    expect(service.markPrimaryImage).toBeTruthy();
  });

  it('should call the deleteKitResource() method',()=>{
    service = TestBed.get(KitService);
    let param;
    service.deleteKitResource(param);
    expect(service.deleteKitResource).toBeTruthy();
  });

  it('should call the renameFile() method',()=>{
    service = TestBed.get(KitService);
    let param;
    service.renameFile(param);
    expect(service.renameFile).toBeTruthy();
  });

  it('should call the getThumbnailImage() method',()=>{
    service = TestBed.get(KitService);
    let param;
    service.getThumbnailImage(param);
    expect(service.getThumbnailImage).toBeTruthy();
  });
});
