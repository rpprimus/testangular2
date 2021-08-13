import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsComponent } from './client-details.component';
import { MatModule } from '../../../core/mat-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClientService } from '../client.service';
import { mockClientService } from '../../../../Test/mockClientService';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../Test/mockHttpClientServiceClass';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';

declare var CKEDITOR;

describe('ClientDetailsComponent', () => {
  let component: ClientDetailsComponent;
  let fixture: ComponentFixture<ClientDetailsComponent>;
  let router={
    navigate: jasmine.createSpy('navigate')
}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientDetailsComponent ],
      imports:  [MatModule,BrowserAnimationsModule,HttpClientModule,FormsModule,CKEditorModule],
      schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide:ClientService,useClass:mockClientService},{provide:Router,useValue:router},{provide:HttpClientService,useClass:mockHttpClientServiceClass},
      {provide:SharedService,useClass:mockSharedService},{provide:Util,useClass:mockUtil},{provide: ActivatedRoute, useValue: {
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
    fixture = TestBed.createComponent(ClientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngAfterViewInit() method',()=>{
   // CKEDITOR={instances:{instanceName:{destroy:function(){}}}};
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(component.ngAfterViewInit).toBeTruthy();
  });  

  it('should call getClientById() method',()=>{
    component.util.clientId=1;
    component.getClientById();
    fixture.detectChanges();
    expect(component.getClientById).toBeTruthy();
  })

  it('should call submitClientDetailForm() method if block',()=>{
    let fn=function(){};
    component.submitClientDetailForm(fn);
    fixture.detectChanges();
    expect(component.submitClientDetailForm).toBeTruthy();
  });

  it('should call submitClientDetailForm() method should throw error',()=>{
    component.addClientForm.setValue({name:'test',domain:'test'});
    component.util.clientId=1;
    let fn=function(){};
    component.submitClientDetailForm(fn);
    fixture.detectChanges();
    expect(component.submitClientDetailForm).toBeTruthy();
  });

  it('should call submitClientDetailForm() method else block',()=>{
    component.isFormSubmitted=true;
    // declared fn as a function because it was a call back function
    let fn=function(){};
    component.submitClientDetailForm(fn);
    fixture.detectChanges();
    expect(component.submitClientDetailForm).toBeTruthy();
  });

});
