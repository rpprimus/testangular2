import { Injectable } from '@angular/core';
import { HttpClientService } from '../../shared/services/http-client.service';
import { AppUrl } from '../../shared/config/app-url.enum';

@Injectable()
export class WarehouseService {

  constructor(private httpClientService: HttpClientService) { }

  getWarehouseList(){
    return this.httpClientService.get(AppUrl.warehouseList);
  }

  saveWarehouse(param: any, type: string) {
    return this.httpClientService[type](AppUrl.warehouse, param);
  }
}
