import { TestBed } from '@angular/core/testing';

import { RoleGuardService } from './role-guard.service';
import { AuthService } from './auth.service';
import { mockAuthService } from '../../../Test/mockAuthService.service';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

describe('RoleGuardService', () => {
  let router={
    navigate: jasmine.createSpy('navigate')
}
  beforeEach(() => TestBed.configureTestingModule({
    providers:[RoleGuardService,{provide:AuthService,useClass:mockAuthService},{provide:Router,useValue:router}]
  }));

  it('should be created', () => {
    const service: RoleGuardService = TestBed.get(RoleGuardService);
    expect(service).toBeTruthy();
  });

  it('should call canActivate() method if block', () => {
    const service: RoleGuardService = TestBed.get(RoleGuardService);
    let route:ActivatedRouteSnapshot={
      "routeConfig": null,
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
    }
    service.canActivate(route);
    expect(service.canActivate).toBeTruthy();
  });

  it('should call canActivate() method else block', () => {
    const service: RoleGuardService = TestBed.get(RoleGuardService);
    let route:ActivatedRouteSnapshot={
      "routeConfig": null,
      "url":[],
      "params":[],
      queryParams:[],
      fragment:"",
      data: {"roles":"WORKSTATION_ADMIN"},
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
    }
    service.canActivate(route);
    expect(service.canActivate).toBeTruthy();
  });
});
