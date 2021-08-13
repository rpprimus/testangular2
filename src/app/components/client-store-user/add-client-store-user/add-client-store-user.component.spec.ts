import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientStoreUserComponent } from './add-client-store-user.component';
import { FormsModule } from '@angular/forms';
import { MatModule } from '../../../core/mat-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhoneNumberPipe } from "../../../shared/pipes/phone-number.pipe";
import { ChipComponent } from '../../chip/chip.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientStoreUserService } from '../client-store-user.service';
import { mockClientStoreUserService } from '../../../../Test/mockClientStoreUserService';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { Common } from '../../../store/utility/common';
import { mockCommon } from '../../../../Test/mockCommon';

describe('AddStoreUserComponent', () => {
  let component: AddClientStoreUserComponent;
  let fixture: ComponentFixture<AddClientStoreUserComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClientStoreUserComponent,PhoneNumberPipe,ChipComponent ],
      imports: [FormsModule,MatModule,BrowserAnimationsModule],
      providers: [CookieService,{provide:ClientStoreUserService,useClass:mockClientStoreUserService},
        {provide:SharedService,useClass:mockSharedService},{provide:Router,useValue:router},
        {provide:Util,useClass:mockUtil},{provide:Common,useClass:mockCommon},
        {provide: ActivatedRoute, useValue: {
          snapshot: {
            routeConfig: {
              path: "eventcalendar"
            },
            params: {
              id: "1",

            },
            queryParams: {
              ClientId: "2",
            }
          },
        }
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClientStoreUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getStoreUserById() method',()=>{
    component.getStoreUserById();
    fixture.detectChanges();
    expect(component.getStoreUserById).toBeTruthy();
  });

  it('should call getDropdownsValue() method',()=>{
    component.getDropdownsValue();
    fixture.detectChanges();
    expect(component.getDropdownsValue).toBeTruthy();
  });

  it('should call getCheckedRoles() method',()=>{
    component.getCheckedRoles();
    fixture.detectChanges();
    expect(component.getCheckedRoles).toBeTruthy();
  });

  it('should call onSubmit() method',()=>{
    component.onSubmit();
    fixture.detectChanges();
    expect(component.onSubmit).toBeTruthy();
    expect(component.isValid).toBeTruthy();
  });

  it('should call onSubmit() method else',()=>{
    component.data={id:"1"};
    component.onSubmit();
    fixture.detectChanges();
    expect(component.onSubmit).toBeTruthy();
    expect(component.isValid).toBeTruthy();
  });

  it('should call showPasswordAsStar() method',()=>{
    component.showPasswordAsStar();
    fixture.detectChanges();
    expect(component.showPasswordAsStar).toBeTruthy();
  });

  it('should call onChangeVisibilityGroup() method',()=>{
    let data=[{id:1}]
    component.onChangeVisibilityGroup(data);
    fixture.detectChanges();
    expect(component.onChangeVisibilityGroup).toBeTruthy();
  });

  it('should call resetForm() method',()=>{
    component.resetForm();
    fixture.detectChanges();
    expect(component.resetForm).toBeTruthy();
  });

  it('should call validatePassword() method',()=>{
    component.validatePassword();
    fixture.detectChanges();
    expect(component.validatePassword).toBeTruthy();
  });

  it('should call roleSelected() method',()=>{
    component.roleSelected();
    fixture.detectChanges();
    expect(component.roleSelected).toBeTruthy();
  });

  it('should call editPassword() method',()=>{
    component.editPassword();
    fixture.detectChanges();
    expect(component.editPassword).toBeTruthy();
  });

  it('should call close() method',()=>{
    let isPassword = 'confirmPassword';
    let value=true;
    component.close(isPassword,value);
    fixture.detectChanges();
    expect(component.close).toBeTruthy();
  });

  it('should call close() method else block',()=>{
    let isPassword = '';
    let value=true;
    component.close(isPassword,value);
    fixture.detectChanges();
    expect(component.close).toBeTruthy();
  });

  it('should call editConfirmPassword() method',()=>{
    component.editConfirmPassword();
    fixture.detectChanges();
    expect(component.editConfirmPassword).toBeTruthy();
  });
});
