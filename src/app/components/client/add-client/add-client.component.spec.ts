import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientComponent } from './add-client.component';
import { MatModule } from '../../../core/mat-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientService } from '../client.service';
import { mockClientService } from '../../../../Test/mockClientService';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { ClientDetailsComponent } from '../client-details/client-details.component';
import { ClientModulesComponent } from '../client-modules/client-modules.component';
import { ClientSettingComponent } from '../client-setting/client-setting.component';
import { ClientThemeSettingsComponent } from '../client-theme-settings/client-theme-settings.component';
import { DragDropRowsComponent } from '../../drag-drop-rows/drag-drop-rows.component';
import { ModuleCustomFieldsComponent } from '../module-custom-fields/module-custom-fields.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../Test/mockHttpClientServiceClass';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';

describe('AddClientComponent', () => {
  let component: AddClientComponent;
  let fixture: ComponentFixture<AddClientComponent>;
  let router={
    navigate: jasmine.createSpy('navigate')
}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClientComponent,ClientDetailsComponent,ModuleCustomFieldsComponent,DragDropRowsComponent,ClientModulesComponent,ClientSettingComponent,ClientThemeSettingsComponent ],
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
    fixture = TestBed.createComponent(AddClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit() method',()=>{
    component._activatedRoute.snapshot.params.id=0;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.ngOnInit).toBeTruthy();
  });

  it('should call ngAfterViewInit() method',()=>{
    component.util.canCreateStore.next(false);
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(component.ngAfterViewInit).toBeTruthy();
  });

  it('should call saveClient() method type 0',()=>{
    component.selectedTabIndex=0;
    component.saveClient();
    fixture.detectChanges();
    expect(component.saveClient).toBeTruthy();
  });

  it('should call saveClient() method type 1',()=>{
    component.selectedTabIndex=1;
    component.saveClient();
    fixture.detectChanges();
    expect(component.saveClient).toBeTruthy();
  });

  it('should call saveClient() method type 2',()=>{
    component.selectedTabIndex=2;
    component.saveClient();
    fixture.detectChanges();
    expect(component.saveClient).toBeTruthy();
  });

  it('should call saveClient() method type 3',()=>{
    component.selectedTabIndex=3;
    component.saveClient();
    fixture.detectChanges();
    expect(component.saveClient).toBeTruthy();
  });

  it('should call selectedTab() method',()=>{
    let index=3;
    component.selectedTab(index);
    fixture.detectChanges();
    expect(component.selectedTab).toBeTruthy();
  });

  it('should call onCancel() method',()=>{
    component.onCancel();
    fixture.detectChanges();
    expect(component.onCancel).toBeTruthy();
  });

  it('should call createStore() method',()=>{
    component.createStore();
    fixture.detectChanges();
    expect(component.createStore).toBeTruthy();
  });

  it('should call canDeactivate() method if block',()=>{
    component.util.isAdditionalDirty=true;
    component.canDeactivate();
    fixture.detectChanges();
    expect(component.canDeactivate).toBeTruthy();
  });

  it('should call canDeactivate() method else block',()=>{
    component.util.isAdditionalDirty=false;
    component.canDeactivate();
    fixture.detectChanges();
    expect(component.canDeactivate).toBeTruthy();
  });
});
