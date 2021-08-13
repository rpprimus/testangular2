import { Injectable } from '@angular/core';
import { HttpClientService } from '../../shared/services/http-client.service';
import { AppUrl } from '../../shared/config/app-url.enum';

@Injectable()
export class OrdersService {

  constructor(private httpClientService: HttpClientService) { }

  cancelOrder(param) {
    return this.httpClientService.put(AppUrl.cancelOrder, param);
  }

  getOrderList(param) {
    return this.httpClientService.get(AppUrl.getOrderList, param);
  }

  getStatus() {
    return this.httpClientService.get(AppUrl.getStatus);
  }
}
