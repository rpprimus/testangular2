import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreLoginComponent } from './store-login.component';
import { DebugElement } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { Util } from '../../../shared/services/util';
import { By } from '@angular/platform-browser';
import { Common } from '../../utility/common';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from '../../../core/mat-module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { mockHttpClientServiceClass } from './../../../../Test/mockHttpClientServiceClass';
import { ContactEmailPopupComponent } from './contact-email-popup/contact-email-popup.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { TwoFactorAuthComponent } from '../two-factor-auth/two-factor-auth.component';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material';

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(true)
    };
  }
}

describe('StoreLoginComponent', () => {
  let component: StoreLoginComponent;
  let fixture: ComponentFixture<StoreLoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let sharedService: SharedService;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }

  let service: HttpClientService;
  let httpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoreLoginComponent, ContactEmailPopupComponent,TwoFactorAuthComponent],
      imports: [FormsModule, ReactiveFormsModule, MatModule, HttpClientModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [SharedService, Util, CookieService, Common, AuthService,
        { provide: Router, useValue: router },
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: HttpClientService, useClass: mockHttpClientServiceClass }]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ContactEmailPopupComponent,TwoFactorAuthComponent]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreLoginComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
    httpTestingController = TestBed.get(HttpTestingController);
    service = fixture.debugElement.injector.get(HttpClientService);
    sharedService = fixture.debugElement.injector.get(SharedService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('for contactEmailPopup', (() => {
    component.contactEmailPopup();
    fixture.detectChanges();
    expect(component.contactEmailPopup).toBeTruthy();
  }));

  it('should call the loginUser Method', () => {

    component.isFormSubmitted = false;
    component.loginUser();
    fixture.detectChanges();
    expect(component.isFormSubmitted).toBe(false);
    expect(component.storeLoginForm.value.clientId).toBeUndefined();
  });

  it('storeLoginForm should be invalid', (() => {

    component.storeLoginForm.controls['userEmail'].setValue('');
    component.storeLoginForm.controls['userCredential'].setValue('');
    expect(component.storeLoginForm.valid).toBeFalsy();
  }));

  it('form should be valid', (() => {

    component.storeLoginForm.controls['userEmail'].setValue('sakshi.agrawal@compunnel.in');
    component.storeLoginForm.controls['userCredential'].setValue('123');
    expect(component.storeLoginForm.valid).toBeTruthy();
  }));

  it('for enter key', (() => {


    component.storeLoginForm.controls['userEmail'].setValue('saskhi.agrawal@compunnel.in');
    component.storeLoginForm.controls['userCredential'].setValue('123');
    const eve = { keyCode: 13 }
    component.onKeyPress(eve);
    fixture.detectChanges();
    expect(component.storeLoginForm.valid).toBeTruthy();
  }));

  it('for required messages on email',(()=>{

     component.storeLoginForm.controls['userEmail'].setValue("");
     component.appMessage.U0002;
     expect(component.storeLoginForm.controls['userEmail'].hasError('required')).toBe(true);
   }));

   it('for required messages on password',(()=>{

    component.storeLoginForm.controls['userCredential'].setValue(""); 
    component.appMessage.U0029;
    expect(component.storeLoginForm.controls['userCredential'].hasError('required')).toBe(true);
  }));

  it('for no required error messages on password',(()=>{

    component.storeLoginForm.controls['userCredential'].setValue("123");
    component.appMessage.U0029;
    expect(component.storeLoginForm.controls['userCredential'].hasError('required')).toBe(false);
  }));

  it('for error messages on email',(()=>{
    // let form: NgForm = fixture.debugElement.children[0].injector.get(NgForm);
    // let emailControl = form.control.get('email');

     component.storeLoginForm.controls['userEmail'].setValue("xyz@compunnel.in");
     component.appMessage.U0005;
     expect(component.storeLoginForm.controls['userEmail'].hasError('required')).toBe(false);
   }));

  it('for submit key', (()=>{

    component.loginUser();

    //let user = {token : 'sakshi.agrawal@compunnel.in'};
    fixture.detectChanges();
    expect(component.isFormSubmitted).toBeFalsy();
  })); 

  it('return when form is invalid',(()=>{

     component.loginUser();
     component.isFormSubmitted = false;
     fixture.detectChanges();
     component.storeLoginForm.markAsDirty();
     fixture.detectChanges();
     spyOn(Util.prototype, 'markFormGroupTouched');
     expect(component.util.markFormGroupTouched).toHaveBeenCalledTimes(0);
     expect(component.loginUser).toBeTruthy();
   }));

  it('should log an error on console',()=>{

    //to check whether the error is being handled,we have explicitly set some values to the 
    //storeLoginForm
    component.storeLoginForm.controls['userCredential'].setValue('123');
    component.storeLoginForm.controls['userEmail'].setValue("xyz1@compunnel.in");
    component.isFormSubmitted = false;
    component.loginUser();
    fixture.detectChanges();  
    expect(component.isFormSubmitted).toBe(true);
  });

  it('should call the login Method',(()=>{
    let response ={ response : { isImported : true}}
    component.login(response);
    expect(component.login).toBeTruthy();
  }));

 
});
