import { TestBed } from '@angular/core/testing';

import { DamageProductService } from './damage-product.service';
import { MockDamageProductService } from '../../../Test/mockDamageProductService.service';
import { HttpClientService } from '../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../Test/mockHttpClientServiceClass';

describe('DamageProductService', () => {
  let service:DamageProductService;
  beforeEach(() => TestBed.configureTestingModule({
    providers:[DamageProductService,
      {provide:HttpClientService,useClass:mockHttpClientServiceClass},
  ]
  }));
  

  it('should be created', () => {
    service = TestBed.get(DamageProductService);
    expect(service).toBeTruthy();
  });

  it('should call the getDamageProducts() method',()=>{
    service = TestBed.get(DamageProductService);
    let param=[];
    service.getDamageProducts(param);
    expect(service.getDamageProducts).toBeTruthy();
  });

  it('should call the getFiles() method',()=>{
    service = TestBed.get(DamageProductService);
    let param=[];
    service.getFiles(param);
    expect(service.getFiles).toBeTruthy();
  });

  it('should call the deleteDamageResource() method',()=>{
    service = TestBed.get(DamageProductService);
    let param=[];
    service.deleteDamageResource(param);
    expect(service.deleteDamageResource).toBeTruthy();
  });
  it('should call the uploadDamageResource() method',()=>{
    service = TestBed.get(DamageProductService);
    let param=[];
    service.uploadDamageResource(param);
    expect(service.uploadDamageResource).toBeTruthy();
  });
  it('should call the updateDamageProductDetail() method',()=>{
    service = TestBed.get(DamageProductService);
    let param=[];
    service.updateDamageProductDetail(param);
    expect(service.updateDamageProductDetail).toBeTruthy();
  });
});
