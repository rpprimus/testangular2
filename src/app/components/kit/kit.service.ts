import { Injectable } from '@angular/core';
import { HttpClientService } from '../../shared/services/http-client.service';
import { AppUrl } from '../../shared/config/app-url.enum';
import { MatGridTileHeaderCssMatStyler } from '@angular/material';

@Injectable()
export class KitService {

  constructor(private httpClientService: HttpClientService) { }

  getKitList(param){
    return this.httpClientService.get(AppUrl.kitList,param)
  }

  getClientSetting(param) {
    return this.httpClientService.get(AppUrl.clientSetting, param);
  }

  changeStatus(status) {
    return this.httpClientService.put(AppUrl.changeStatusForKit, status);
  }

  getCategoryList(param) {
    return this.httpClientService.get(AppUrl.getCategoryList, param);
  }
  
  getVisibilityGroup(param) {
    return this.httpClientService.get(AppUrl.getVisibilityGroup, param);
  }

  getKit(param){
    return this.httpClientService.get(AppUrl.kitDetail, param);
  }

  saveKit(param: any, type: string) {
    return this.httpClientService[type](AppUrl.kitDetail, param);
  }

  markPrimaryImage(param){
    return this.httpClientService.put(AppUrl.markKitImagePrimary, param);
  }

  deleteKitResource(param) {
    return this.httpClientService.delete(AppUrl.kitDetail, param);
  }

  renameFile(param){
    return this.httpClientService.put(AppUrl.kitDetail, param);
  }

  // searchProduct(param){
  //   return this.httpClientService.get(AppUrl.searchProductOnKit, param);
  // }

  getThumbnailImage(param){
    return this.httpClientService.getFiles(AppUrl.getThumbnailImage,param);
  }
}
