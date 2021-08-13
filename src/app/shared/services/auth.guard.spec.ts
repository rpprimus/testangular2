import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { Util } from './util';
import { mockUtil } from '../../../Test/mockUtil';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let router={
    navigate: jasmine.createSpy('navigate')
}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard,{provide:Util,useClass:mockUtil},{provide:Router,useValue:router}]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    guard.util.isStore=true;
    let next:ActivatedRouteSnapshot,state:RouterStateSnapshot;
    guard.canActivate(next,state);
    expect(guard).toBeTruthy();
  }));
});
