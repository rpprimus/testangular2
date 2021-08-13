import { Injectable } from '@angular/core';
import { HttpClientService } from '../../shared/services/http-client.service';
import { AppUrl } from '../../shared/config/app-url.enum';
import { Util } from './../../shared/services/util';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class ManageOrderService {

  constructor(private httpClientService: HttpClientService,private util:Util,private cookie:CookieService) { }

  getOrders(param) {
    return this.httpClientService.get(AppUrl.getOrders, param);
  }

  updateOrder(param){
    return this.httpClientService.put(AppUrl.updateorder, param);
  }

  updateOrderDetail(param){
    return this.httpClientService.post(AppUrl.updateorder, param);
  }

  searchProduct(param) {
    return this.httpClientService.get(AppUrl.searchProductOnKit, param);
  }

  getProductInfo(param){
    return this.httpClientService.get(AppUrl.getProductInfo, param);
  }

  updateQuantity(param){
    return this.httpClientService.put(AppUrl.updateQuantity, param);
  }

  updateOrderToConfirm(param){
    return this.httpClientService.put(AppUrl.updateorderToConfirm, param);
  }

  addNewProduct(param){
    return this.httpClientService.post(AppUrl.addProduct, param)
  }

  changeStatustoProcessing(param){
    return this.httpClientService.put(AppUrl.changeStatusToProcessing, param);
  }

  updateFreigthDetails(param){
    return this.httpClientService.put(AppUrl.updateFreigthDetails, param);
  }

  changeStatustoReadyToShip(param){
    return this.httpClientService.put(AppUrl.changeStatustoReadyToShip, param);
  }

  getShipmentReasons(){
    return this.httpClientService.get(AppUrl.getShipmentReason);
  }

  updateCarrierDetails(param){
    return this.httpClientService.put(AppUrl.updateCarrierDetails, param);
  }

  changeStatustoShipped(param){
    return this.httpClientService.put(AppUrl.changeStatusToShipped, param);
  }

  getWarehouseList() {
    return this.httpClientService.get(AppUrl.warehouseList);
  }

  updateReceivingDetail(param){
    return this.httpClientService.put(AppUrl.updateReceivingDetail, param);
  }

  changeStatusToReturned(param){
    return this.httpClientService.put(AppUrl.changeStatusToReturned, param);
  }

  changeStatusToComplete(param){
    return this.httpClientService.put(AppUrl.changeStatusToComplete, param);
  }

  cancelOrder(param) {
    return this.httpClientService.put(AppUrl.cancelOrder, param);
  }

  printOrder(param){
    return this.httpClientService.getFiles(AppUrl.printOrder,param);
  }

  deleteProductOnOrder(param) {
    return this.httpClientService.delete(AppUrl.deleteProduct, param);
  }

  getCreditCardForCardAdmin(param){
    return this.httpClientService.get(AppUrl.getCreditCard, param);
  }

  loadModulesCustomFields(fn) {
    let param = {
      pathVariable : this.util.isStore ? this.cookie.get('storeClientId') : localStorage.getItem('selectedClientId')
    }
    this.httpClientService.get(AppUrl.activeOrderingDetails, param).subscribe(response => {
      if (response.responseCode == "S0001") {
        return fn(response.response.modulesData);
      }
    });
  }

  getClientSetting(param) {
    return this.httpClientService.get(AppUrl.clientSetting, param);
  }
}
