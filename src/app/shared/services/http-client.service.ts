import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Util } from './util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class HttpClientService {

  constructor(private _http: HttpClient, private util: Util, private cookieService: CookieService) {
  }

  setHeader() {
    const headers = new HttpHeaders({ 'Accept': 'application/json', 'X-Auth-Token': this.util.isStore ? this.cookieService.get('storeAccessToken') : this.util.accessToken });
    return headers;
  }

  login(url): any {
    return this._http.get(this.util.baseUrl.getValue() + url, { headers: this.setHeader() });
  }

  get(url, urlParams?): any {
    url = this.util.attachParams(url, urlParams);
    return this._http.get(this.util.baseUrl.getValue() + url, { headers: this.setHeader() });
  }

  post(url, urlParams?): any {
    return this._http.post(this.util.baseUrl.getValue() + url, urlParams, { headers: this.setHeader() });
  }

  put(url, urlParams?): any {
    if (urlParams && urlParams.pathVariable) {
      url = url + "/" + urlParams.pathVariable; // append pathvariable with URL
      delete urlParams.pathVariable; // delete from param object as we don't need this in param
    }
    return this._http.put(this.util.baseUrl.getValue() + url, urlParams, { headers: this.setHeader() });
  }

  delete(url, urlParams?): any {
    // if (urlParams) {
    //   url = url + urlParams;
    // }
    url = this.util.attachParams(url, urlParams);
    return this._http.delete(this.util.baseUrl.getValue() + url, { headers: this.setHeader() });
  }

  upload(url, formdata, urlParams?): any {
    url = urlParams && urlParams.pathVariable ? url + "/" + urlParams.pathVariable : url; // append pathvariable with URL
    let headers = new HttpHeaders();
    headers = headers.set('X-Auth-Token', this.util.isStore ? this.cookieService.get('storeAccessToken') : this.util.accessToken);
    headers.delete("Content-Type");
    return this._http.post(this.util.baseUrl.getValue() + url, formdata, { headers: headers });
  }

  getFiles(url, urlParams?) {
    url = this.util.attachParams(url, urlParams);
    const headers = new HttpHeaders(
      {
        'X-Auth-Token': this.util.isStore ? this.cookieService.get('storeAccessToken') : this.util.accessToken 
      });
    return this._http.get(this.util.baseUrl.getValue() + url, { headers: headers, responseType: "blob", observe: 'response', reportProgress: true });
  }
}
