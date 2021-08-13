import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpClientService } from '../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../Test/mockHttpClientServiceClass';

describe('ProductsService', () => {
  let service:ProductsService;
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ProductsService,{provide:HttpClientService,useClass:mockHttpClientServiceClass}]
  }));

  it('should be created', () => {
    service = TestBed.get(ProductsService);
    expect(service).toBeTruthy();
  });

  it('should call the getClientSetting() method',()=>{
    service = TestBed.get(ProductsService);
    let param;
    service.getClientSetting(param);
    expect(service.getClientSetting).toBeTruthy();
  });

  it('should call the getProductList() method',()=>{
    service = TestBed.get(ProductsService);
    let param;
    service.getProductList(param);
    expect(service.getProductList).toBeTruthy();
  });

  it('should call the changeStatus() method',()=>{
    service = TestBed.get(ProductsService);
    let param;
    service.changeStatus(param);
    expect(service.changeStatus).toBeTruthy();
  });

  it('should call the getCategoryList() method',()=>{
    service = TestBed.get(ProductsService);
    let param;
    service.getCategoryList(param);
    expect(service.getCategoryList).toBeTruthy();
  });

  it('should call the getWarehouseList() method',()=>{
    service = TestBed.get(ProductsService);
    service.getWarehouseList();
    expect(service.getWarehouseList).toBeTruthy();
  });

  it('should call the getVisibilityGroup() method',()=>{
    service = TestBed.get(ProductsService);
    let param;
    service.getVisibilityGroup(param);
    expect(service.getVisibilityGroup).toBeTruthy();
  });

  it('should call the saveProduct() method',()=>{
    service = TestBed.get(ProductsService);
    let param,type="put";
    service.saveProduct(param,type);
    expect(service.saveProduct).toBeTruthy();
  });

  it('should call the getProductById() method',()=>{
    service = TestBed.get(ProductsService);
    let param;
    service.getProductById(param);
    expect(service.getProductById).toBeTruthy();
  });

  it('should call the deleteProductResource() method',()=>{
    service = TestBed.get(ProductsService);
    let param;
    service.deleteProductResource(param);
    expect(service.deleteProductResource).toBeTruthy();
  });

  it('should call the markPrimaryImage() method',()=>{
    service = TestBed.get(ProductsService);
    let param;
    service.markPrimaryImage(param);
    expect(service.markPrimaryImage).toBeTruthy();
  });

  it('should call the getThumbnailImage() method',()=>{
    service = TestBed.get(ProductsService);
    let param;
    service.getThumbnailImage(param);
    expect(service.getThumbnailImage).toBeTruthy();
  });

  it('should call the deleteAssociatedProduct() method',()=>{
    service = TestBed.get(ProductsService);
    let param;
    service.deleteAssociatedProduct(param);
    expect(service.deleteAssociatedProduct).toBeTruthy();
  });

  it('should call the deleteAssociatedStep() method',()=>{
    service = TestBed.get(ProductsService);
    let param;
    service.deleteAssociatedStep(param);
    expect(service.deleteAssociatedStep).toBeTruthy();
  });

  it('should call the searchProduct() method',()=>{
    service = TestBed.get(ProductsService);
    let param;
    service.searchProduct(param);
    expect(service.searchProduct).toBeTruthy();
  });
});
