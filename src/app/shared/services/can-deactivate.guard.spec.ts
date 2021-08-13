import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';

import { CanDeactivateGuard } from './can-deactivate.guard';
import { Util } from './util';
import { mockUtil } from '../../../Test/mockUtil';
import { AddClientComponent } from '../../components/client/add-client/add-client.component';
import { ClientDetailsComponent } from '../../components/client/client-details/client-details.component';
import { ModuleCustomFieldsComponent } from '../../components/client/module-custom-fields/module-custom-fields.component';
import { DragDropRowsComponent } from '../../components/drag-drop-rows/drag-drop-rows.component';
import { ClientModulesComponent } from '../../components/client/client-modules/client-modules.component';
import { ClientSettingComponent } from '../../components/client/client-setting/client-setting.component';
import { ClientThemeSettingsComponent } from '../../components/client/client-theme-settings/client-theme-settings.component';
import { MatModule } from '../../core/mat-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClientService } from '../../components/client/client.service';
import { mockClientService } from '../../../Test/mockClientService';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientService } from './http-client.service';
import { mockHttpClientServiceClass } from '../../../Test/mockHttpClientServiceClass';
import { SharedService } from './shared.service';
import { mockSharedService } from '../../../Test/mockSharedService';

describe('CanDeactivateGuard', () => {
  let component:AddClientComponent;
  let fixture: ComponentFixture<AddClientComponent>;
  let router={
    navigate: jasmine.createSpy('navigate')
}
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddClientComponent,ClientDetailsComponent,ModuleCustomFieldsComponent,DragDropRowsComponent,ClientModulesComponent,ClientSettingComponent,ClientThemeSettingsComponent ],
      imports:  [MatModule,BrowserAnimationsModule,HttpClientModule,FormsModule,CKEditorModule],
      schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
      providers: [CanDeactivateGuard,{provide:ClientService,useClass:mockClientService},{provide:Router,useValue:router},{provide:HttpClientService,useClass:mockHttpClientServiceClass},
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
    fixture = TestBed.createComponent(AddClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should ...', inject([CanDeactivateGuard], (guard: CanDeactivateGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should call canDeactivate() method', inject([CanDeactivateGuard], (guard: CanDeactivateGuard) => {
    let component1 = fixture.componentInstance;
    guard.canDeactivate(component1);
    expect(guard.canDeactivate).toBeTruthy();
  }));
});
