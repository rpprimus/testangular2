import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitResourceComponent } from './kit-resource.component';
import { MatModule } from '../../../core/mat-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../Test/mockHttpClientServiceClass';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { KitService } from '../kit.service';
import { mockKitService } from '../../../../Test/mockKitService';
import { ElementRef } from '@angular/core';
import { mockElementRef } from '../../../../Test/mockElementRef';
import { MatDialog } from '@angular/material';
import { of } from 'rxjs';

xdescribe('KitResourceComponent', () => {
  let component: KitResourceComponent;
  let fixture: ComponentFixture<KitResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitResourceComponent ],
      imports: [MatModule,BrowserAnimationsModule],
      providers: [{provide:HttpClientService,useClass:mockHttpClientServiceClass},{provide:Util,useClass:mockUtil},{provide:SharedService,useClass:mockSharedService},
                  {provide:KitService,useClass:mockKitService},{provide:ElementRef,useClass:mockElementRef},{provide:MatDialog,useClass:MatDialogMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitResourceComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnChanges() method',()=>{
    //let changes={data:{}};
    fixture.detectChanges();
    component.ngOnChanges({});
    fixture.detectChanges();
    expect(component.ngOnChanges).toBeTruthy();
  });

  it('should call browseFileClick() method',()=>{
    component.elementRef.nativeElement={querySelector(){return {click(){return true}} }}
    let inputField="1";
    component.browseFileClick(inputField);
    fixture.detectChanges();
    expect(component.browseFileClick).toBeTruthy();
  });

  it('should call pushDefaultValuesInImage() method',()=>{
    component.imageResourceList=[{}];
    component.pushDefaultValuesInImage();
    fixture.detectChanges();
    expect(component.pushDefaultValuesInImage).toBeTruthy();
  });

  it('should call renameResource() method if block',()=>{
    let index=0,item={newFileName :""};
    component.renameResource(item,index);
    fixture.detectChanges();
    expect(component.renameResource).toBeTruthy();
  });

  it('should call renameResource() method else block',()=>{
    component.otherResourceList=[{}];
    let index=0,item={newFileName :"abc1",fileName:'abc.xls',resourceId:133};
    component.renameResource(item,index);
    fixture.detectChanges();
    expect(component.renameResource).toBeTruthy();
  });

  it('should call renameResource() method should throw error',()=>{
    component.otherResourceList=[{}];
    component.kitId=1;
    let index=0,item={newFileName :"abc1",fileName:'abc.xls',resourceId:133};
    component.renameResource(item,index);
    fixture.detectChanges();
    expect(component.renameResource).toBeTruthy();
  });

  it('should call renameAction() method',()=>{
    let item={fileName :"abc.xls"};
    component.renameAction(item);
    fixture.detectChanges();
    expect(component.renameAction).toBeTruthy();
  });

  it('should call downloadResource() method',()=>{
    let id=1;
    component.downloadResource(id);
    fixture.detectChanges();
    expect(component.downloadResource).toBeTruthy();
  });

  it('should call downloadResource() method should throw error',()=>{
    component.kitId=1;
    let id=1;
    component.downloadResource(id);
    fixture.detectChanges();
    expect(component.downloadResource).toBeTruthy();
  });

  it('should call deleteFile() method',()=>{
    let resourceId=133,index=0,type=1;
    component.deleteFile(resourceId,index,type);
    fixture.detectChanges();
    expect(component.deleteFile).toBeTruthy();
  });

  it('should call deleteFile() method',()=>{
    let resourceId=133,index=0,type=2;
    component.deleteFile(resourceId,index,type);
    fixture.detectChanges();
    expect(component.deleteFile).toBeTruthy();
  });

  it('should call deleteFile() method should throw error',()=>{
    component.kitId=1;
    let resourceId=133,index=0,type=1;
    component.deleteFile(resourceId,index,type);
    fixture.detectChanges();
    expect(component.deleteFile).toBeTruthy();
  });

  it('should call markPrimary() method',()=>{
    component.imageResourceList=[{}];
    let resourceId=133,index=0;
    component.markPrimary(resourceId,index);
    fixture.detectChanges();
    expect(component.markPrimary).toBeTruthy();
  });

  it('should call markPrimary() method should throw error',()=>{
    component.imageResourceList=[{}];
    component.kitId=1;
    let resourceId=133,index=0;
    component.markPrimary(resourceId,index);
    fixture.detectChanges();
    expect(component.markPrimary).toBeTruthy();
  });

  it('should call showImageDragPanel() method if block',()=>{
    component.imageResourceList=[{},{},{}];
    component.showImageDragPanel();
    fixture.detectChanges();
    expect(component.showImageDragPanel).toBeTruthy();
  });

  it('should call showImageDragPanel() method else block',()=>{
    component.imageResourceList=[{resourceId :1},{resourceId :2},{resourceId :3}];
    component.showImageDragPanel();
    fixture.detectChanges();
    expect(component.showImageDragPanel).toBeTruthy();
  });

  it('should call fileChangeEvent() method if block',()=>{
    let event={target:{files:[{name:"abc.xls"}]}},type=1;
    component.fileChangeEvent(event,type);
    fixture.detectChanges();
    expect(component.fileChangeEvent).toBeTruthy();
  });

  it('should call fileChangeEvent() method else block',()=>{
    component.kitId=1;
    let event={target:{files:[{name:"abc.xls"}]}},type=1;
    component.fileChangeEvent(event,type);
    fixture.detectChanges();
    expect(component.fileChangeEvent).toBeTruthy();
  });

  it('should call displayOtherResource() method',()=>{
    component.otherResourceList=[];
    let resourceId:1,file={name:"abc.xls"};
    component.displayOtherResource(resourceId,file);
    fixture.detectChanges();
    expect(component.displayOtherResource).toBeTruthy();
  });

  it('should call displayUploadedImg() method',()=>{
    component.imageResourceList=[{resourceId:1},{resourceId:2}];
    let resourceId=1,file=new Blob(["abc.xls"]);
    component.displayUploadedImg(resourceId,file);
    fixture.detectChanges();
    expect(component.displayUploadedImg).toBeTruthy();
  });

  it('should call displayMagnifiedImage() method',()=>{
    let item={url:"gooogle.com/img"};
    component.displayMagnifiedImage(item);
    fixture.detectChanges();
    expect(component.displayMagnifiedImage).toBeTruthy();
  });
});
export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(true)
    };
  }
}
