import { Injectable } from '@angular/core';
import { HttpClientService } from '../../shared/services/http-client.service';
import { AppUrl } from '../../shared/config/app-url.enum';

@Injectable()
export class DashboardService {

  constructor(private httpClientService: HttpClientService) { }

  getClients(){
    return this.httpClientService.get(AppUrl.getFilteredClient);
  }
  
  getDashboard(param?){
    return this.httpClientService.get(AppUrl.getDashboard, param);
  }
}
