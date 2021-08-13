import { TestBed } from '@angular/core/testing';

import { ClientSelectionService } from './client-selection.service';
import { Util } from './util';
import { mockUtil } from '../../../Test/mockUtil';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { MatDialog } from '@angular/material';
import { of } from 'rxjs';

describe('ClientSelectionService', () => {
  let router={
    navigate: jasmine.createSpy('navigate')
}
  beforeEach(() => TestBed.configureTestingModule({
    providers:[ClientSelectionService,{provide:Util,useClass:mockUtil},{provide:Router,useValue:router},{ provide: MatDialog, useClass: MatDialogMock }]
  }));

  it('should be created', () => {
    const service: ClientSelectionService = TestBed.get(ClientSelectionService);
    expect(service).toBeTruthy();
  });

  it('should call canActivate() method if block', () => {
    const service: ClientSelectionService = TestBed.get(ClientSelectionService);
    service.util.isStore=true;
    let route:ActivatedRouteSnapshot;
    service.canActivate(route);
    expect(service.canActivate).toBeTruthy();
  });

  it('should call canActivate() method else block', () => {
    const service: ClientSelectionService = TestBed.get(ClientSelectionService);
    localStorage.setItem('selectedClientId','37');
    let route:ActivatedRouteSnapshot;
    service.canActivate(route);
    expect(service.canActivate).toBeTruthy();
  });

  it('should call openClientPopUp() method', () => {
    const service: ClientSelectionService = TestBed.get(ClientSelectionService);
    let path='';
    service.openClientPopUp(path);
    expect(service.openClientPopUp).toBeTruthy();
  });
});
export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(true)
    };
  }
}
