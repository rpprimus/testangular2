import { TestBed, async, inject } from '@angular/core/testing';

import { StoreAuthGuard } from './store-auth.guard';
import { Util } from '../../shared/services/util';
import { mockUtil } from '../../../Test/mockUtil';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('StoreAuthGuard', () => {
  let router={
    navigate: jasmine.createSpy('navigate')
}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreAuthGuard,{provide:Util,useClass:mockUtil},{provide:Router,useValue:router}]
    });
  });

  it('should ...', inject([StoreAuthGuard], (guard: StoreAuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should should call canActivate() method if block', inject([StoreAuthGuard], (guard: StoreAuthGuard) => {
    let next:ActivatedRouteSnapshot={
      "routeConfig": {path:"storenotfound"},
      "url":[],
      "params":[],
      queryParams:[],
      fragment:"",
      data: {"roles":"ADMIN"},
      outlet: "",
      component :null,
      root:null,
      parent: null,
      firstChild: null,
      children: null,
      pathFromRoot: null,
      paramMap: null,
      queryParamMap: null,
      toString():string {return ""}
    },
    state:RouterStateSnapshot;
    guard.canActivate(next,state)
    expect(guard.canActivate).toBeTruthy();
  }));

  it('should should call canActivate() method else-if block', inject([StoreAuthGuard], (guard: StoreAuthGuard) => {
    let next:ActivatedRouteSnapshot={
      "routeConfig": {path:""},
      "url":[],
      "params":[],
      queryParams:[],
      fragment:"",
      data: {"roles":"ADMIN"},
      outlet: "",
      component :null,
      root:null,
      parent: null,
      firstChild: null,
      children: null,
      pathFromRoot: null,
      paramMap: null,
      queryParamMap: null,
      toString():string {return ""}
    },
    state:RouterStateSnapshot;
    localStorage.setItem('isLoggedIn','true');
    guard.canActivate(next,state)
    expect(guard.canActivate).toBeTruthy();
  }));

  it('should should call canActivate() method else block', inject([StoreAuthGuard], (guard: StoreAuthGuard) => {
    let next:ActivatedRouteSnapshot={
      "routeConfig": {path:""},
      "url":[],
      "params":[],
      queryParams:[],
      fragment:"",
      data: {"roles":"ADMIN"},
      outlet: "",
      component :null,
      root:null,
      parent: null,
      firstChild: null,
      children: null,
      pathFromRoot: null,
      paramMap: null,
      queryParamMap: null,
      toString():string {return ""}
    },
    state:RouterStateSnapshot;
    guard.canActivate(next,state)
    expect(guard.canActivate).toBeTruthy();
  }));
});
