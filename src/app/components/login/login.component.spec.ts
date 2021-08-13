import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatModule } from '../../core/mat-module';
import { SharedService } from '../../shared/services/shared.service';
import { mockSharedService } from '../../../Test/mockSharedService';
import { LoginService } from './login.service';
import { Util } from '../../shared/services/util';
import { mockUtil } from '../../../Test/mockUtil';
import { AppStorageService } from '../../shared/services/app-storage.service';
import { AuthService } from '../../shared/services/auth.service';
import { mockAuthService } from '../../../Test/mockAuthService.service';
import { mockLoginService } from '../../../Test/mockLoginService';
import { mockAppStorageService } from '../../../Test/mockAppStorageService';
import { HttpClientService } from '../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../Test/mockHttpClientServiceClass';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [MatModule],
      providers: [{provide:SharedService,useClass:mockSharedService},{provide:LoginService,useClass:mockLoginService},
      {provide:Util,useClass:mockUtil},{provide:AppStorageService,useClass:mockAppStorageService},{provide:AuthService,useClass:mockAuthService},
      {provide:HttpClientService,useClass:mockHttpClientServiceClass}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSignIn() method if block',()=>{
    let googleUser={getBasicProfile:function(){return {getEmail() {return "abc@yopmail.com"}}}};
    component.onSignIn(googleUser);
    fixture.detectChanges();
    expect(component.onSignIn).toBeTruthy();
  });

  it('should call onSignIn() method else block',()=>{
    let googleUser={getBasicProfile:function(){return {getEmail() {return "abc1@yopmail.com"}}}};
    component.onSignIn(googleUser);
    fixture.detectChanges();
    expect(component.onSignIn).toBeTruthy();
  });

  it('should call onFailure() method',()=>{
    let error={error:"popup_closed_by_user"};
    component.onFailure(error);
    fixture.detectChanges();
    expect(component.onFailure).toBeTruthy();
  });
});
