import { Injectable } from '@angular/core';
import { HttpClientService } from '../../shared/services/http-client.service';
import { AppUrl } from '../../shared/config/app-url.enum';

@Injectable()
export class ClientStoreUserService {

  constructor(private httpClientService: HttpClientService) { }

  getStoreUserList(param) {
    return this.httpClientService.get(AppUrl.storeUser, param);
  }

  getRoles(param) {
    return this.httpClientService.get(AppUrl.getRoles,param);
  }

  getHierarchy(param){
    return this.httpClientService.get(AppUrl.getHierarchies,param);
  }

  changeStatus(status) {
    return this.httpClientService.put(AppUrl.changeStatusforStore, status);
  }

  resendEmailVerification(status) {
    return this.httpClientService.put(AppUrl.resendEmail, status);
  }

  getStoreUser(param){
    return this.httpClientService.get(AppUrl.updateStoreUser,param);
  }
  getRegionalManager(param){
    return this.httpClientService.get(AppUrl.getRegionalManager,param);
  }
  getVisibilityGroup(param){
    return this.httpClientService.get(AppUrl.getVisibilityGroup,param);
  }
  
  addClientStoreUser(param: any, type: string) {
    return this.httpClientService[type](AppUrl.updateStoreUser, param);
  }

  getClientSetting(param) {
    return this.httpClientService.get(AppUrl.clientSetting, param);
  }
}
