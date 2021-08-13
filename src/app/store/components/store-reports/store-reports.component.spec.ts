import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatModule } from '../../../core/mat-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportsService } from '../../../components/reports/reports.service';
import { mockReportsService } from '../../../../Test/mockReportsService';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
 
import { StoreReportsComponent } from './store-reports.component';
import { Common } from '../../utility/common';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../Test/mockHttpClientServiceClass';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
 
describe('StoreReportsComponent', () => {
  let component: StoreReportsComponent;
  let fixture: ComponentFixture<StoreReportsComponent>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreReportsComponent ],
      imports: [FormsModule,MatModule,BrowserAnimationsModule,RouterTestingModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
      providers: [{provide:ReportsService,useClass:mockReportsService},{provide:SharedService,useClass:mockSharedService},
      {provide:Util,useClass:mockUtil}, Common, CookieService, Location, {provide:HttpClientService,useClass:mockHttpClientServiceClass},]
    })
    .compileComponents();
  }));
 
  beforeEach(() => {
    fixture = TestBed.createComponent(StoreReportsComponent);
    component = fixture.componentInstance;
    component.storeReportTypes = [{ name: 'Order Details Report', id: 4 }]
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});