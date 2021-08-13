import { Injectable } from '@angular/core';
import { HttpClientService } from '../../shared/services/http-client.service';
import { AppUrl } from '../../shared/config/app-url.enum';

@Injectable()
export class UserService {

  constructor(private httpClientService: HttpClientService) { }

  getRoles(param) {
    return this.httpClientService.get(AppUrl.getRoles,param);
  }

  getClients() {
    return this.httpClientService.get(AppUrl.getClient);
  }

  submitUser(param: any, type: string) {
    return this.httpClientService[type](AppUrl.user, param);
  }

  getUserList(param) {
    return this.httpClientService.get(AppUrl.getUsers, param);
  }

  getUserById(param) {
    return this.httpClientService.get(AppUrl.user, param);
  }

  getClientsById(param) {
    return this.httpClientService.get(AppUrl.getClientById,param);
  }

  changeStatus(param) {
    return this.httpClientService.put(AppUrl.changeStatusforUser,param);
  }

}
