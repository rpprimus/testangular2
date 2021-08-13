import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Util } from '../shared/services/util';
import { AuthService } from '../shared/services/auth.service';

@Injectable()
export class LoaderService {
  public isLoading = new BehaviorSubject(false);

  constructor() { }
}

@Injectable()                                                           //For Global Loader
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loaderService: LoaderService, public util: Util,private auth:AuthService) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);

    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.util.hideLoader) {
      this.requests.push(req);
      this.loaderService.isLoading.next(true);
    }
    return Observable.create(observer => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.checkForInvalidAccess(event);
              this.removeRequest(req);
              observer.next(event);
            }
          },
          err => { this.removeRequest(req); observer.error(err); },
          () => { this.removeRequest(req); observer.complete(); });
      // teardown logic in case of cancelled requests
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
        this.util.hideLoader = false;
      };
    });
  }

  /**
   * To check when user is deactivated on store then log out the user
   */
  checkForInvalidAccess(event:any){
    if(event.body && event.body.errorCode == "E1007"){
      this.auth.sessionExpired();
    }
  }
}