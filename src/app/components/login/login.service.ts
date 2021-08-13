import { Injectable } from '@angular/core';
import { HttpClientService } from '../../shared/services/http-client.service';
import { AppUrl } from '../../shared/config/app-url.enum';

@Injectable()
export class LoginService {

  constructor(private httpClient:HttpClientService) { }

  authenticateUser(param){
    return this.httpClient.get(AppUrl.getToken, param);
  }
}
