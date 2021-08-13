import { Injectable } from '@angular/core';
import { AppUrl } from '../../shared/config/app-url.enum';
import { HttpClientService } from '../../shared/services/http-client.service';

@Injectable()
export class DamageProductService {

  constructor(private httpClientService: HttpClientService) { }

  getDamageProducts(param) {
    return this.httpClientService.get(AppUrl.getDamageProducts, param);
  }

  getFiles(param){
    return this.httpClientService.getFiles(AppUrl.downloadDamageResource, param);
  }

  deleteDamageResource(param){
    return this.httpClientService.delete(AppUrl.updateOrDeleteDamageResource, param);
  }

  uploadDamageResource(param){
    return this.httpClientService.upload(AppUrl.updateOrDeleteDamageResource,param);
  }

  updateDamageProductDetail(param){
    return this.httpClientService.put(AppUrl.getDamageProducts, param);
  }
}
