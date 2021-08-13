import { Injectable } from '@angular/core';
import { HttpClientService } from '../../shared/services/http-client.service';
import { AppUrl } from '../../shared/config/app-url.enum';
@Injectable()
export class ReportsService {

  constructor(private httpClientService: HttpClientService) { }

  getReports(url,param) {
    return this.httpClientService.getFiles(url, param);
  }

  getProducts(param){
    return this.httpClientService.get(AppUrl.getProducts, param);
  }

  getCategories(param){
    return this.httpClientService.get(AppUrl.getAllCategories, param);
  }
  
}
