import { Injectable } from '@angular/core';
import { HttpClientService } from '../../shared/services/http-client.service';
import { AppUrl } from '../../shared/config/app-url.enum';

@Injectable()
export class ProductsService {

  constructor(private httpClientService: HttpClientService) { }

  getClientSetting(param) {
    return this.httpClientService.get(AppUrl.clientSetting, param);
  }

  getProductList(param) {
    return this.httpClientService.get(AppUrl.getProductList, param);
  }

  changeStatus(status) {
    return this.httpClientService.put(AppUrl.changeStatusForProduct, status);
  }

  getCategoryList(param) {
    return this.httpClientService.get(AppUrl.getCategoryList, param);
  }

  getWarehouseList() {
    return this.httpClientService.get(AppUrl.warehouseList);
  }

  getVisibilityGroup(param) {
    return this.httpClientService.get(AppUrl.getVisibilityGroup, param);
  }

  saveProduct(param: any, type: string) {
    return this.httpClientService[type](AppUrl.productDetail, param);
  }

  getProductById(param) {
    return this.httpClientService.get(AppUrl.productDetail, param);
  }

  deleteProductResource(param) {
    return this.httpClientService.delete(AppUrl.productResource, param);
  }

  markPrimaryImage(param){
    return this.httpClientService.put(AppUrl.productResourcePrimary, param);
  }

  getThumbnailImage(param){
    return this.httpClientService.getFiles(AppUrl.getThumbnailImage,param);
  }

  deleteAssociatedProduct(param){
    return this.httpClientService.delete(AppUrl.stepAssociatedProduct, param);
  }

  deleteAssociatedStep(param){
    return this.httpClientService.delete(AppUrl.stepAssociated, param);
  }

  searchProduct(param) {
    return this.httpClientService.get(AppUrl.searchProductOnKit, param);
  }
}
