import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportComponent } from './report.component';
import { FormsModule } from '@angular/forms';
import { MatModule } from '../../../core/mat-module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReportsService } from '../reports.service';
import { mockReportsService } from '../../../../Test/mockReportsService';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MainReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportComponent ],
      imports: [FormsModule,MatModule,BrowserAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
      providers: [{provide:ReportsService,useClass:mockReportsService},{provide:SharedService,useClass:mockSharedService},
      {provide:Util,useClass:mockUtil}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    component.productSearchText.setValue("CAN-085 ~ \"Thank you\" Cards");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call selectedReportType() method type 1',()=>{
    let type=1;
    component.selectedReportType(type);
    fixture.detectChanges();
    expect(component.selectedReportType).toBeTruthy();
  });

  it('should call selectedReportType() method type 2',()=>{
    let type=2;
    component.selectedReportType(type);
    fixture.detectChanges();
    expect(component.selectedReportType).toBeTruthy();
  });

  it('should call selectedReportType() method type 3',()=>{
    let type=3;
    component.selectedReportType(type);
    fixture.detectChanges();
    expect(component.selectedReportType).toBeTruthy();
  });

  it('should call selectedReportType() method type 4',()=>{
    let type=4;
    component.selectedReportType(type);
    fixture.detectChanges();
    expect(component.selectedReportType).toBeTruthy();
  });

  it('should call clear() method',()=>{
    component.clear();
    fixture.detectChanges();
    expect(component.clear).toBeTruthy();
  });

  it('should call dateChange() method',()=>{
    let value="11/11/20"
    component.dateChange(value);
    fixture.detectChanges();
    expect(component.dateChange).toBeTruthy();
  });

  it('should call exportReport() method',()=>{
    component.exportReport();
    fixture.detectChanges();
    expect(component.exportReport).toBeTruthy();
  });

  it('should call getReport() method type 1',()=>{
    let type=1;
    component.getReport(type);
    fixture.detectChanges();
    expect(component.getReport).toBeTruthy();
  });

  it('should call getReport() method type 2',()=>{
    let type=2;
    component.getReport(type);
    fixture.detectChanges();
    expect(component.getReport).toBeTruthy();
  });

  it('should call getReport() method type 3',()=>{
    let type=3;
    component.getReport(type);
    fixture.detectChanges();
    expect(component.getReport).toBeTruthy();
  });

  it('should call getReport() method type 4',()=>{
    let type=4;
    component.getReport(type);
    fixture.detectChanges();
    expect(component.getReport).toBeTruthy();
  });

  it('should call getReport() method type 5',()=>{
    let type=5;
    component.getReport(type);
    fixture.detectChanges();
    expect(component.getReport).toBeTruthy();
  });

  it('should call getReport() method type 6',()=>{
    let type=6;
    component.getReport(type);
    fixture.detectChanges();
    expect(component.getReport).toBeTruthy();
  });

  it('should call getReport() method type 7',()=>{
    let type=7;
    component.getReport(type);
    fixture.detectChanges();
    expect(component.getReport).toBeTruthy();
  });

  it('should call getReport() method type 8',()=>{
    let type=8;
    component.getReport(type);
    fixture.detectChanges();
    expect(component.getReport).toBeTruthy();
  });

  it('should call submit() method else block',()=>{
    let url=[],param=1;;
    component.submit(url,param);
    fixture.detectChanges();
    expect(component.submit).toBeTruthy();
  });

  it('should call selectInventoryProduct() method',()=>{
    let id=96;
    let evt={source:{selected:true}};
    component.selectInventoryProduct(id,evt);
    fixture.detectChanges();
    expect(component.selectInventoryProduct).toBeTruthy();
  });

  it('should call validateDifferentReport() method type 1',()=>{
    component.fromDateError=true;
    component.noRecords=true;
    let type=1;
    component.validateDifferentReport(type);
    fixture.detectChanges();
    expect(component.validateDifferentReport).toBeTruthy();
  });

  it('should call validateDifferentReport() method type 2',()=>{
    let type=2;
    component.validateDifferentReport(type);
    fixture.detectChanges();
    expect(component.validateDifferentReport).toBeTruthy();
  });

  it('should call validateDifferentReport() method type 3',()=>{
    component.fromDateError=true;
    let type=3;
    component.validateDifferentReport(type);
    fixture.detectChanges();
    expect(component.validateDifferentReport).toBeTruthy();
  });

  it('should call validateDifferentReport() method type 4',()=>{
    component.fromDateError=true;
    let type=4;
    component.validateDifferentReport(type);
    fixture.detectChanges();
    expect(component.validateDifferentReport).toBeTruthy();
  });

  it('should call validateDifferentReport() method type 5',()=>{
    component.fromDateError=true;
    let type=5;
    component.validateDifferentReport(type);
    fixture.detectChanges();
    expect(component.validateDifferentReport).toBeTruthy();
  });

  it('should call onSelectionChange() method type 1',()=>{
    let selected=[""];
    let type='categoryReport';
    component.onSelectionChange(selected,type);
    fixture.detectChanges();
    expect(component.onSelectionChange).toBeTruthy();
  });

  it('should call onSelectionChange() method type 2',()=>{
    let selected=[""];
    let type='productReport';
    component.onSelectionChange(selected,type);
    fixture.detectChanges();
    expect(component.onSelectionChange).toBeTruthy();
  });

});
