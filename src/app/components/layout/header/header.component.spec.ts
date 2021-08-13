import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MatModule } from '../../../core/mat-module';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { Common } from '../../../store/utility/common';
import { mockCommon } from '../../../../Test/mockCommon';
import { AuthService } from '../../../shared/services/auth.service';
import { mockAuthService } from '../../../../Test/mockAuthService.service';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
}


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [MatModule],
      providers: [{provide:Util,useClass:mockUtil},{provide:Common,useClass:mockCommon},{provide:AuthService,useClass:mockAuthService},
      {provide:Router,useValue:router}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logOut() method',()=>{
    component.logOut();
    fixture.detectChanges();
    expect(component.logOut).toBeTruthy();
  });

  it('should call feedback() method',()=>{
    component.feedback();
    fixture.detectChanges();
    expect(component.feedback).toBeTruthy();
  });

  it('should call onLogoClick() method',()=>{
    component.onLogoClick();
    fixture.detectChanges();
    expect(component.onLogoClick).toBeTruthy();
  });
});
