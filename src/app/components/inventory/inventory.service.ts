import { Injectable } from '@angular/core';
import { HttpClientService } from '../../shared/services/http-client.service';
import { AppUrl } from '../../shared/config/app-url.enum';

@Injectable()
export class InventoryService {

  constructor(private httpClientService: HttpClientService) { }

  getClientSetting(param) {
    return this.httpClientService.get(AppUrl.clientSetting, param);
  }

  getInventoryList(param) {
    return this.httpClientService.get(AppUrl.getInventory, param);
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

  getInventoryHistory(param){
    return this.httpClientService.get(AppUrl.getInventoryHistory, param);
  }

  getUpdateInventoryReason(){
    return this.httpClientService.get(AppUrl.getUpdateInventoryReason);
  }

  getInventoryDetail(param){
    return this.httpClientService.get(AppUrl.getInventoryDetail,param);
  }

  updateInventoryDetail(param){
    return this.httpClientService.put(AppUrl.updateInventoryDetail,param);
  }

  getInventoryAvailability(param){
    return this.httpClientService.get(AppUrl.getInventoryAvailability,param);
  }

}
