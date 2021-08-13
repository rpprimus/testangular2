import { TestBed, inject } from '@angular/core/testing';

import { SharedService } from './shared.service';
import { AuthService } from './auth.service';
import { mockAuthService } from '../../../Test/mockAuthService.service';
import { Util } from './util';
import { mockUtil } from '../../../Test/mockUtil';
import { HttpClientService } from './http-client.service';
import { mockHttpClientServiceClass } from '../../../Test/mockHttpClientServiceClass';
import { MatDialog, MatSnackBar, MatSnackBarContainer, MatSnackBarModule } from '@angular/material';
import { of } from 'rxjs';
import { Overlay } from '@angular/cdk/overlay';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';
import { MatModule } from '../../core/mat-module';
import { HttpErrorResponse } from '@angular/common/http';

describe('SharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SnackBarComponent],
      imports: [MatSnackBarModule, BrowserAnimationsModule, MatModule],
      providers: [SharedService, MatSnackBar, Overlay, { provide: AuthService, useClass: mockAuthService }, { provide: Util, useClass: mockUtil },
        { provide: HttpClientService, useClass: mockHttpClientServiceClass }, { provide: MatDialog, useClass: MatDialogMock }]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [SnackBarComponent]
      }
    })
  });

  it('should be created', inject([SharedService], (service: SharedService) => {
    expect(service).toBeTruthy();
  }));

  it('should call openToast() method', inject([SharedService], (service: SharedService) => {
    let code = "s", textContent = "test";
    service.openToast(code, textContent);
    expect(service.openToast).toBeTruthy();
  }));

  it('should call openDialog() method', inject([SharedService], (service: SharedService) => {
    let code = "s", textContent = "test";
    service.openDialog(code, textContent);
    expect(service.openDialog).toBeTruthy();
  }));

  it('should call otherConfirmBox() method', inject([SharedService], (service: SharedService) => {
    let code = "s", textContent = "test";
    service.otherConfirmBox(code, textContent);
    expect(service.otherConfirmBox).toBeTruthy();
  }));

  it('should call confirmBox() method', inject([SharedService], (service: SharedService) => {
    let textContent = "test";
    service.confirmBox(textContent);
    expect(service.confirmBox).toBeTruthy();
  }));

  it('should call onSuccess() method if block', inject([SharedService], (service: SharedService) => {
    let response = { responseCode: "S0001" }, message = "test", fun = function fn(params: any) { };
    service.onSuccess(response, message, fun);
    expect(service.onSuccess).toBeTruthy();
  }));

  it('should call onSuccess() method else block', inject([SharedService], (service: SharedService) => {
    let response = { errorCode: "E1018", errorMessage: { errors: "Error message" } }, message = "test", fun = function fn(params: any) { };
    service.onSuccess(response, message, fun);
    expect(service.onSuccess).toBeTruthy();
  }));

  it('should call onSuccess() method el', inject([SharedService], (service: SharedService) => {
    let response = { errorCode: "E101", errorMessage: {} }, message = "test", fun = function fn(params: any) { };
    service.onSuccess(response, message, fun);
    expect(service.onSuccess).toBeTruthy();
  }));

  it('should call onError() method', inject([SharedService], (service: SharedService) => {
    let error: HttpErrorResponse = {
      name: 'HttpErrorResponse',
      message: "error",
      error: {},
      ok: false,
      headers: null,
      status: null,
      statusText: "",
      url: null,
      type: null
    };
    service.onError(error);
    expect(service.onError).toBeTruthy();
  }));

  it('should call getImageFile() method', inject([SharedService], (service: SharedService) => {
    let url="", message = "test", fun = function fn(params: any) { };
    service.getImageFile(url, message, fun);
    expect(service.getImageFile).toBeTruthy();
  }));

  it('should call downloadOnDemandFile() method', inject([SharedService], (service: SharedService) => {
    let file={fileName:"abc.xls",filePath:""};
    service.downloadOnDemandFile(file);
    expect(service.downloadOnDemandFile).toBeTruthy();
  }));

  it('should call openOnDemandFile() method', inject([SharedService], (service: SharedService) => {
    let file={fileName:"abc.xls",filePath:""};
    spyOn(window.URL,'createObjectURL');
    service.openOnDemandFile(file);
    expect(service.openOnDemandFile).toBeTruthy();
  }));

  it('should call openImagePopup() method', inject([SharedService], (service: SharedService) => {
    let url="";
    service.openImagePopup(url);
    expect(service.openImagePopup).toBeTruthy();
  }));

  it('should call sendMessage() method', inject([SharedService], (service: SharedService) => {
    let obj={};
    service.sendMessage(obj);
    expect(service.sendMessage).toBeTruthy();
  }));

  it('should call clearMessage() method', inject([SharedService], (service: SharedService) => {
    service.clearMessage();
    expect(service.clearMessage).toBeTruthy();
  }));

  it('should call getMessage() method', inject([SharedService], (service: SharedService) => {
    service.getMessage();
    expect(service.getMessage).toBeTruthy();
  }));
});
export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(true)
    };
  }
}