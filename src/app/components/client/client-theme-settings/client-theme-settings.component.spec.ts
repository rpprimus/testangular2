import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientThemeSettingsComponent } from './client-theme-settings.component';
import { ClientService } from '../client.service';
import { mockClientService } from '../../../../Test/mockClientService';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../Test/mockHttpClientServiceClass';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { ElementRef, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { mockElementRef } from '../../../../Test/mockElementRef';
import { MatModule } from '../../../core/mat-module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CustomImgComponent } from '../../custom-img/custom-img.component';
import { ThemePreviewOneComponent } from '../theme-preview/theme-preview-one/theme-preview-one.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { ColorPickerModule } from 'ngx-color-picker';
import { By } from '@angular/platform-browser';


describe('ClientThemeSettingsComponent', () => {
  let component: ClientThemeSettingsComponent;
  let fixture: ComponentFixture<ClientThemeSettingsComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientThemeSettingsComponent,CustomImgComponent,ThemePreviewOneComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MatModule,ImageCropperModule,CKEditorModule,ColorPickerModule],
      providers: [{provide:ClientService,useClass:mockClientService},{provide:HttpClientService,useClass:mockHttpClientServiceClass},
        {provide:SharedService,useClass:mockSharedService},{provide:Util,useClass:mockUtil},{provide:ElementRef,useClass:mockElementRef}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientThemeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit() method',()=>{
    component.util.clientId=1;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.ngOnInit).toBeTruthy();
  });

  
  it('should call getColor() method',()=>{
    let color="red";
    component.getColor(color);
    fixture.detectChanges();
    expect(component.getColor).toBeTruthy();
  });

  it('should call onCustomizeColorClick() method',()=>{
    let $event={target:{id:37}}
    component.onCustomizeColorClick($event);
    fixture.detectChanges();
    expect(component.onCustomizeColorClick).toBeTruthy();
  });

  it('should call getThemeSettings() method',()=>{
    component.util.clientId=2;
    component.getThemeSettings();
    fixture.detectChanges();
    expect(component.getThemeSettings).toBeTruthy();
  });

  it('should call colorPickerColorChanged() method',()=>{
    let $event={target:{id:37}},color="red";
    component.colorPickerColorChanged(color,$event);
    fixture.detectChanges();
    expect(component.colorPickerColorChanged).toBeTruthy();
  });

  it('should call onImageReset() method',()=>{
    component.onImageReset();
    fixture.detectChanges();
    expect(component.onImageReset).toBeTruthy();
  });

  it('should call crop() method',()=>{
    component.crop();
    fixture.detectChanges();
    expect(component.crop).toBeTruthy();
  });

  it('should call fileChangeEvent() method if block',()=>{
    component.util.clientId=1;
    let event={target:{files:[{name:"abc.xls"}]}},type="OTHER_RESOURCES";
    component.fileChangeEvent(event,type);
    fixture.detectChanges();
    expect(component.fileChangeEvent).toBeTruthy();
  });

  // it('should call fileChangeEvent() method else block',()=>{
  //   component.util.clientId=1;
  //   fixture.detectChanges();
  //   component.elementRef.nativeElement=fixture.debugElement.query(By.css('#img'));
  //   let event={target:{files:[{name:"abc.jpg"}]}},type="";
  //   component.fileChangeEvent(event,type);
  //   fixture.detectChanges();
  //   expect(component.fileChangeEvent).toBeTruthy();
  // });

  // it('should call imageCropped() method',()=>{
  //   let image="";
  //   component.imageCropped(image);
  //   fixture.detectChanges();
  //   expect(component.imageCropped).toBeTruthy();
  // });

  // it('should call onSliderChange() method',()=>{
  //   let $event={value:""};
  //   component.onSliderChange($event);
  //   fixture.detectChanges();
  //   expect(component.onSliderChange).toBeTruthy();
  // });

  // it('should call uploadFile() method',()=>{
  //   component.croppedImage="data:image/png;base64,iVBORw0K"
  //   component.util.clientId=1;
  //   component.filename="image1";
  //   component.headerText="Bleh!!!!";
  //   component.footerText="Bleh!!!!";
  //   component.uploadFile();
  //   fixture.detectChanges();
  //   expect(component.uploadFile).toBeTruthy();
  // });

  it('should call setColorCodes() method',()=>{
    component.setColorCodes();
    fixture.detectChanges();
    expect(component.setColorCodes).toBeTruthy();
  });

  // it('should call renameAction() method',()=>{
  //   let item={isRename:true,fileName:"abc.xls"}
  //   component.renameAction(item);
  //   fixture.detectChanges();
  //   expect(component.renameAction).toBeTruthy();
  // });

  // it('should call renameFile() method',()=>{
  //   component.util.clientId=1;
  //   component.helpResourceArr=[{}];
  //   let item={isRename:true,fileName:"abc.xls",newFileName:"abc1",resourceId:10},index=0;
  //   component.renameFile(item,index);
  //   fixture.detectChanges();
  //   expect(component.renameFile).toBeTruthy();
  // });
});
