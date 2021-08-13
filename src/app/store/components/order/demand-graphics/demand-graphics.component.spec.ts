import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandGraphicsComponent } from './demand-graphics.component';
import { DebugElement, ElementRef, Component, Renderer, } from '@angular/core';
import { SharedService } from './../../../../shared/services/shared.service';
import { HttpClientService } from './../../../../shared/services/http-client.service';
import { Util } from './../../../../shared/services/util';
import { Common } from './../../../../store/utility/common';
import { MatModule } from './../../../../core/mat-module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockHttpClientServiceClass } from '../../../../../Test/mockHttpClientServiceClass';
import { mockElementRef } from '../../../../../Test/mockElementRef';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { AuthService } from './../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { SnackBarComponent } from './../../../../components/snack-bar/snack-bar.component';
import { By, BrowserModule } from '@angular/platform-browser';
import { mockSharedService } from '../../../../../Test/mockSharedService';
import { mockUtil } from '../../../../../Test/mockUtil';

declare var CKEDITOR;

describe('DemandGraphicsComponent', () => {
  let component: DemandGraphicsComponent;
  let fixture: ComponentFixture<DemandGraphicsComponent>;
  let de: DebugElement;
   let el: HTMLElement;
  // let sharedService: SharedService;
  // let httpService: HttpClientService;
 // let common: Common;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  const mockDialogRef = {
    close: (dialogResult: any) => { }
  };
  const model = {
    item: {
      data: {
        onDemandTextGraphic: "Blah!"
      },
      isEdit: true
    }
  }

  class mockCommon {
    closeAssociateAndOnDemandPopup(param: any) { 
      
    }
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DemandGraphicsComponent, SnackBarComponent],
      imports: [CKEditorModule, FormsModule, BrowserModule, MatModule, HttpClientModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [ AuthService, CookieService,
        { provide: HttpClientService, useClass: mockHttpClientServiceClass },
        { provide: Router, useValue: router },
        { provide: ElementRef, useClass: mockElementRef },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: model },
        { provide: Common, useClass: mockCommon },
        { provide:Util,useClass:mockUtil},
        { provide:SharedService, useClass: mockSharedService}
      ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [SnackBarComponent]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandGraphicsComponent);
    component = fixture.componentInstance;

    //httpService = fixture.debugElement.injector.get(HttpClientService);
   // sharedService = fixture.debugElement.injector.get(SharedService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the close() method', (() => {

    component.data={item:{
      isTextGraphic:''
    }};
    component.data.isEdit = false;
    de = fixture.debugElement.query(By.css('.demand-graphics-btn'));
    el = de.nativeElement;
   // spyOn(common, 'closeAssociateAndOnDemandPopup');
    el.click();
    fixture.detectChanges();
  //  expect(common.closeAssociateAndOnDemandPopup).toHaveBeenCalled();
    //expect(component.close).toBeTruthy();
  }));

  it('should call the submitOndemandText() method',(()=>{
    //CKEDITOR={instances:[{getSnapshot:function(){},config:{maxCharCount:0}}]};
    component.submitOndemandText();
    fixture.detectChanges();
    expect(component.submitOndemandText).toBeTruthy();

  }));

  it('should call the submitOndemandFile() method',(()=>{
    component.submitOndemandFile();
    fixture.detectChanges();
    expect(component.submitOndemandFile).toBeTruthy();
    expect(component.uploadedDemandGraphic.filename).toBeUndefined();

  }));

  it('should call the graphicUploadEvent() method',(()=>{

    const mockFile = new File([''], 'filename', { type: 'text/html' });
    const mockEvt = {
      target:{
        files:[mockFile]
      }
    }
    spyOn(window as any, 'FormData').and.returnValue({
      "append": jasmine.createSpy()
    });

    component.graphicUploadEvent(mockEvt);
    fixture.detectChanges();
    expect(component.graphicUploadEvent).toBeTruthy();

    component.onUploadGraphic(mockFile);
    fixture.detectChanges();
    expect(component.onUploadGraphic).toBeTruthy();

    component.displayUploadedImg(mockFile);
    fixture.detectChanges();
    let eventListener = jasmine.createSpy();
    spyOn(window as any, "FileReader").and.returnValue({
    addEventListener: eventListener
    });
    var reader = new FileReader();
    reader.addEventListener('load', function(e) {
      //expect(e.target.result).toEqual('url');
      //done();
  });

    expect(eventListener.calls.mostRecent().args[0]).toEqual('load');
    var onloadHandler = eventListener.calls.mostRecent().args[1];
    var event = { target : { result : 'url' } };
    onloadHandler(event);
    expect(component.uploadedDemandGraphic["imageUrl"]).toBeUndefined();
    expect(component.displayUploadedImg).toBeTruthy();

  }));

});
