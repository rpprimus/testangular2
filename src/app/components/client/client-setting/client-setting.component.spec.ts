import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSettingComponent } from './client-setting.component';
import { MatModule } from '../../../core/mat-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { mockClientService } from '../../../../Test/mockClientService';
import { ClientService } from '../client.service';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../Test/mockHttpClientServiceClass';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { mockElementRef } from '../../../../Test/mockElementRef';

declare var CKEDITOR;
describe('ClientSettingComponent', () => {
  let component: ClientSettingComponent;
  let fixture: ComponentFixture<ClientSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientSettingComponent],
      imports: [MatModule, BrowserAnimationsModule, HttpClientModule, FormsModule, CKEditorModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: ClientService, useClass: mockClientService }, { provide: HttpClientService, useClass: mockHttpClientServiceClass },
      { provide: SharedService, useClass: mockSharedService }, { provide: Util, useClass: mockUtil },
      { provide: ElementRef, useClass: mockElementRef }]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit() method', () => {
    //CKEDITOR={instances:{instance:{name:{destroy:function(){}}}},replace:function(){return {setData:function(){},on:function(){},removeAllListeners:function(){}}}};
    component.util.clientId = 1;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.ngOnInit).toBeTruthy();
  });

  it('should call ngAfterViewInit() method', async(() => {
    component.util.clientId = 1;
    component.ngAfterViewInit();
    fixture.detectChanges();
    // component.inputPrimary.subscribe(val => {
    //   expect(val).toEqual('test')
    // })
    expect(component.ngAfterViewInit).toBeTruthy();
  }));

  it('should call getAccountManagers() method', () => {
    component.util.clientId = 1;
    let value = "a+b"
    component.getAccountManagers(value);
    fixture.detectChanges();
    expect(component.getAccountManagers).toBeTruthy();
  });

  it('should call getAccountManagers() method and should throw error', () => {
    component.util.clientId = 2;
    let value = "a+b"
    component.getAccountManagers(value);
    fixture.detectChanges();
    expect(component.getAccountManagers).toBeTruthy();
  });

  it('should call getAccManagerById() method',()=>{
    let option={id:1,name:""},evt={source:{selected:true}}
    component.getAccManagerById(option,evt);
    fixture.detectChanges();
    expect(component.getAccManagerById).toBeTruthy();
  });

  it('should call getClientSetting() method',()=>{
    //CKEDITOR={instances:{destroy:function(){}},replace:function(){return {setData:function(){},on:function(){},removeAllListeners:function(){}}}};
    component.getClientSetting();
    fixture.detectChanges();
    expect(component.getClientSetting).toBeTruthy();
  });

  it('should call setVisiblityFlag() method', () => {
    component.setVisiblityFlag();
    fixture.detectChanges();
    expect(component.setVisiblityFlag).toBeTruthy();
  });

  it('should call onAddVisibilityRestrictionItems() method', () => {
    component.onAddVisibilityRestrictionItems();
    fixture.detectChanges();
    expect(component.onAddVisibilityRestrictionItems).toBeTruthy();
  });

  it('should call onRemoveVisibilityRestrictionItems() method', () => {
    let index=0;
    component.onRemoveVisibilityRestrictionItems(index);
    fixture.detectChanges();
    expect(component.onRemoveVisibilityRestrictionItems).toBeTruthy();
  });

  it('should call onAddHierarchyItems() method', () => {
    component.onAddHierarchyItems();
    fixture.detectChanges();
    expect(component.onAddHierarchyItems).toBeTruthy();
  });

  it('should call onRemoveHierarchyItems() method', () => {
    let index = 0;
    component.onRemoveHierarchyItems(index);
    fixture.detectChanges();
    expect(component.onRemoveHierarchyItems).toBeTruthy();
  });

  it('should call submit() method if block', () => {
    //CKEDITOR={instances:[{getSnapshot:function(){},config:{maxCharCount:0}}]};
    component.util.clientId=1;
    component.submit();
    fixture.detectChanges();
    expect(component.submit).toBeTruthy();
  });

  it('should call submit() method else block', () => {
    //CKEDITOR={instances:[{getSnapshot:function(){},config:{maxCharCount:0}}]};
    component.util.clientId=1;
    component.isFormSubmitted=true;
    component.submit();
    fixture.detectChanges();
    expect(component.submit).toBeTruthy();
  });

  it('should call checkValid() method',()=>{
    //CKEDITOR={instances:[{getSnapshot:function(){},config:{maxCharCount:0}}]};
    component.data={
      isClientProductName: false,
      isVisibilityRestriction: true,
      isHierarchy: true,
      visibilityRestriction: [{ id: 0, visibilityGroupName: '2', isDefault: true, gid: new Date().getTime() }],
      hierarchy: [{ id: 0, hierarchyName: 'Test', gid: new Date().getTime() }]
    };
    component.checkValid();
    fixture.detectChanges();
    expect(component.checkValid).toBeTruthy();
  });

  it('should call clear() method', () => {
    component.clear();
    fixture.detectChanges();
    expect(component.clear).toBeTruthy();
  });

  it('should call setVisibility() method if block', () => {
    component.data = {
      isClientProductName: false,
      isVisibilityRestriction: false,
      isHierarchy: false,
      visibilityRestriction: [{ id: 0, visibilityGroupName: '2', isDefault: true, gid: new Date().getTime() }],
      hierarchy: [{ id: 0, hierarchyName: '', gid: new Date().getTime() }]
    };
    let item={id:0,gid: new Date().getTime()}
    component.setVisibility(item);
    fixture.detectChanges();
    expect(component.setVisibility).toBeTruthy();
  });

  it('should call setVisibility() method else block', () => {
    component.data = {
      isClientProductName: false,
      isVisibilityRestriction: false,
      isHierarchy: false,
      visibilityRestriction: [{ id: 0, visibilityGroupName: '2', isDefault: true, gid: new Date().getTime() }],
      hierarchy: [{ id: 0, hierarchyName: '', gid: new Date().getTime() }]
    };
    let item={id:1,gid: ""}
    component.setVisibility(item);
    fixture.detectChanges();
    expect(component.setVisibility).toBeTruthy();
  });

  it('should call excelUploadChangeEvent() method',()=>{
    component.util.clientId=1;
    let event={target:{files:[{"name":"abc.xlsx"}]}};
    component.excelUploadChangeEvent(event);
    fixture.detectChanges();
    expect(component.excelUploadChangeEvent).toBeTruthy();
  });

  it('should call renameAction() method',()=>{
    let item={fileName:"abc.xls"};
    component.renameAction(item);
    fixture.detectChanges();
    expect(component.renameAction).toBeTruthy();
  });

  it('should call renameFile() method if block',()=>{
    let item={fileName:"abc.xls",id:10};
    let index=0;
    component.renameFile(item,index);
    fixture.detectChanges();
    expect(component.renameFile).toBeTruthy();
  });

  it('should call renameFile() method',()=>{
    component.productExcelArr=[{}];
    let item={fileName:"abc.xls",newFileName :"abc1",id:10};
    let index=0;
    component.renameFile(item,index);
    fixture.detectChanges();
    expect(component.renameFile).toBeTruthy();
  });

  it('should call renameFile() method and should throw error',()=>{
    component.productExcelArr=[{}];
    let item={fileName:"abc.xls",newFileName :"abc1",id:1};
    let index=0;
    component.renameFile(item,index);
    fixture.detectChanges();
    expect(component.renameFile).toBeTruthy();
  });

  it('should call downloadFile() method',()=>{
    let id=10;
    component.downloadFile(id);
    fixture.detectChanges();
    expect(component.downloadFile).toBeTruthy();
  });

  it('should call downloadFile() method should throw error',()=>{
    let id=1;
    component.downloadFile(id);
    fixture.detectChanges();
    expect(component.downloadFile).toBeTruthy();
  });

  it('should call deleteFile() method',()=>{
    let id=10,index=0;
    component.deleteFile(id,index);
    fixture.detectChanges();
    expect(component.deleteFile).toBeTruthy();
  });

  
  it('should call deleteFile() method and should throw error',()=>{
    let id=1,index=0;
    component.deleteFile(id,index);
    fixture.detectChanges();
    expect(component.deleteFile).toBeTruthy();
  });

  it('should call getProductExcelSheet() method',()=>{
    component.getProductExcelSheet();
    fixture.detectChanges();
    expect(component.getProductExcelSheet).toBeTruthy();
  });

  it('should call getProductExcelSheet() method and should throw error',()=>{
    component.util.clientId=1;
    component.getProductExcelSheet();
    fixture.detectChanges();
    expect(component.getProductExcelSheet).toBeTruthy();
  });

  it('should call onExcelUpload() method',()=>{
    component.util.clientId=1;
    let file={};
    component.onExcelUpload(file);
    fixture.detectChanges();
    expect(component.onExcelUpload).toBeTruthy();
  });

});
