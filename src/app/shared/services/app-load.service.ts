import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { AppUrl } from '../config/app-url.enum';
import { Util } from './util';

@Injectable()
export class AppLoadService {

  constructor(private httpClient: HttpClient,private util:Util) { }

  getSettings(): Promise<any> {
    
    const promise = this.httpClient.get(AppUrl.settings)
      .toPromise()
      .then(settings => {
        let data:any = settings;
        this.util.baseUrl.next(data.baseUrl);
        this.util.http.next(data.http);
        this.util.www.next(data.www);
        this.util.existingPortal.next(data.existingPortal);
        this.util.feedbackLink.next(data.feedbackLink);
        this.util.socketServerUrl.next(data.socketServerUrl);

        //return settings;
      });

    return promise;
  }
}
