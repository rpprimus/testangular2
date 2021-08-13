import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageProductResourceComponent } from './damage-product-resource.component';
import { MatModule } from '../../../core/mat-module';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { DamageProductService } from '../damage-product.service';
import { MockDamageProductService } from '../../../../Test/mockDamageProductService.service';
import { SimpleChange, ElementRef, SimpleChanges } from '@angular/core';

xdescribe('DamageProductResourceComponent', () => {
  let component: DamageProductResourceComponent;
  let fixture: ComponentFixture<DamageProductResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DamageProductResourceComponent],
      providers: [
        { provide: Util, useClass: mockUtil },
        { provide: SharedService, useClass: mockSharedService },
        { provide: DamageProductService, useClass: MockDamageProductService },
        { provide: ElementRef, useValue: { nativeElement: { querySelector: {} } } },
      ],
      imports: [MatModule],
      schemas: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageProductResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {   
    expect(component).toBeTruthy();
  });
  
  it('should call browseFileClick method', () => {
    component.resourceList = [{
      resourceId: 0
    }];
    fixture.detectChanges();
    let inputField = 'imgInput';
    component.browseFileClick(inputField);
    expect(component.browseFileClick).toBeTruthy();
  });
  it('should call pushDefaultValuesInImage method', () => {
    component.pushDefaultValuesInImage();
    expect(component.pushDefaultValuesInImage).toBeTruthy();
  });
  it('should call deleteFile method', () => {
    component.deleteFile(1, 1, '');
    expect(component.deleteFile).toBeTruthy();
  });
  it('should call fileChangeEvent method', () => {
    var file = new File(["aushdahsdihasdhah"], "filename.png", { type: "image/png", lastModified: 1550570514877 })
    component.orderProductId = 1;
    let event: any = {
      isTrusted: true,
      type: "change",
      target: {
        files: [file],
      },
    };
    let type = 0;
    component.resourceList = [{
      resourceId: 0
    }];
    component.fileChangeEvent(event, type);
    expect(component.fileChangeEvent).toBeTruthy();
  });
  it('should call onUpload method', () => {
    var file = new File(["aushdahsdihasdhah"], "filename.txt", { type: "text/plain", lastModified: 1550570514877 })
    component.resourceList = [{
      resourceId: 0
    }];
    component.onUpload("1", file);
    expect(component.onUpload).toBeTruthy();
  });
  it('should call onUpload method for else condition', () => {
    var file = new File(["aushdahsdihasdhah"], "filename.txt", { type: "text/plain", lastModified: 1550570514877 })
    component.resourceList = [{
      resourceId: 0
    },
    {
      resourceId: 1
    }];
    component.onUpload("1", file);
    expect(component.onUpload).toBeTruthy();
  });  
});

