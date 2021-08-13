import { Injectable } from '@angular/core';
import { HttpClientService } from '../../shared/services/http-client.service';
import { AppUrl } from '../../shared/config/app-url.enum';

@Injectable()
export class ClientService {

  constructor(private httpClientService: HttpClientService) { }

  getClientList(param) {
    return this.httpClientService.get(AppUrl.clients, param);
  }

  getClientSetting(param) {
    return this.httpClientService.get(AppUrl.clientSetting, param);
  }

  changeStatus(status) {
    return this.httpClientService.put(AppUrl.changeStatusforClient, status);
  }

  getClientDetailById(param) {
    return this.httpClientService.get(AppUrl.clientDetailById, param);
  }

  submitClientDetail(param: any, type: string) {
    return this.httpClientService[type](AppUrl.clientDetailById, param);
  }

  putClientSetting(param) {
    return this.httpClientService.put(AppUrl.clientSetting, param);
  }

  getThemeSettings(param) {
    return this.httpClientService.get(AppUrl.clientThemeSettings, param);
  }

  uploadThemeSettings(file, param) {
    return this.httpClientService.upload(AppUrl.clientThemeSettings, file, param);
  }

  downloadLogo(param) {
    return this.httpClientService.get(AppUrl.downloadLogo, param);
  }

  createStore(param) {
    return this.httpClientService.put(AppUrl.createStore, param);
  }

  putModuleServicePage(param) {
    return this.httpClientService.put(AppUrl.moduleServicePage, param);
  }

  getClientModuleSetting(param) {
    return this.httpClientService.get(AppUrl.getClientModuleSetting, param);
  }

  putOrderingDetail(param) {
    return this.httpClientService.put(AppUrl.orderingDetail, param);
  }

  putSignUpDetail(param) {
    return this.httpClientService.put(AppUrl.clientSignUpModule, param);
  }

  putEventDetail(param) {
    return this.httpClientService.put(AppUrl.clientEvent, param);
  }

  deleteHelpResource(param){
    return this.httpClientService.delete(AppUrl.helpNResource, param);
  }

  getAccountManagerList(param){
    return this.httpClientService.get(AppUrl.getAccountManagerList, param);
  }

  getProductExcelList(param){
    return this.httpClientService.get(AppUrl.getMigrationList,param);
  }

  renameExcelFile(param) {
    return this.httpClientService.put(AppUrl.renameExcelUpload, param);
  }

  downloadExcelFile(param){
    return this.httpClientService.getFiles(AppUrl.downloadExcel, param);
  }

  excelUpload(param){
    return this.httpClientService.upload(AppUrl.uploadExcel, param)
  }
  
  deleteExcelFile(param){
    return this.httpClientService.delete(AppUrl.deleteExcelFile,param);
  }
}
