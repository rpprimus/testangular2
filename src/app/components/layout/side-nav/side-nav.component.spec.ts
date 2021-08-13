import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavComponent } from './side-nav.component';
import { MatModule } from '../../../core/mat-module';
import { AuthService } from '../../../shared/services/auth.service';
import { mockAuthService } from '../../../../Test/mockAuthService.service';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { of } from 'rxjs';
import { SelectClientPopupComponent } from './select-client-popup/select-client-popup.component';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideNavComponent,SelectClientPopupComponent ],
      imports: [MatModule],
      providers: [{provide:AuthService,useClass:mockAuthService},{provide:Util,useClass:mockUtil},
        {provide:Router,useValue:router},{provide:MatDialog,useClass: MatDialogMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call menuItemClick() method',()=>{
  //   let path=""
  //   component.menuItemClick(path);
  //   fixture.detectChanges();
  //   expect(component.menuItemClick).toBeTruthy();
  // });

  // it('should call openClientPopUp() method',()=>{
  //   let path=""
  //   component.openClientPopUp(path)
  //   fixture.detectChanges();
  //   expect(component.openClientPopUp).toBeTruthy();
  // });
});
export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(true)
    };
  }
}
