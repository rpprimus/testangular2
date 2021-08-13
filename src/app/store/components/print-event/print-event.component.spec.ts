import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PrintEventComponent } from './print-event.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { Util } from '../../../shared/services/util';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MatModule } from './../../../core/mat-module';
import { CookieService } from 'ngx-cookie-service';
import { Common } from '../../utility/common';
import { AuthService } from '../../../shared/services/auth.service';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';


describe('PrintEventComponent', () => {
  let component: PrintEventComponent;
  let fixture: ComponentFixture<PrintEventComponent>;
  let de: DebugElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({

      declarations: [PrintEventComponent],
      providers: [HttpClient,
        HttpHandler, Util, CookieService, Common, SharedService, AuthService,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {
          provide: HttpClientService, useValue: {
            getFiles(param: any): Observable<any> {
              return of();
            }
          }
        }
      ],
      imports: [FormsModule, MatModule, RouterTestingModule, MatDialogModule,
        BrowserAnimationsModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));
  let service: HttpClientService;
  let httpMock;
  beforeEach(() => {
    fixture = TestBed.createComponent(PrintEventComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.get(HttpTestingController);
    service = fixture.debugElement.injector.get(HttpClientService);
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('test to explicitly run ngOnInit', () => {
    component.ngOnInit();
    expect(component.ngOnInit).toBeDefined();
  });
  it('check event start date should be less than end date', async(() => {
    let date = new Date();
    component.eventStartDate.setDate(date.getDate() + 1);//tomorrow date
    component.eventEndDate.setDate(date.getDate() + 7);//7 days after today's date
    component.validateDate('');
    expect(component.eventStartDate).toBeLessThan(component.eventEndDate);
  }));
  it('check event start date should be greater than end date', async(() => {
    let date = new Date();
    component.eventStartDate.setDate(date.getDate() + 1);//tomorrow date
    component.eventEndDate.setDate(date.getDate() - 1);//1 days before today's date
    component.validateDate('');
    fixture.detectChanges();
    expect(component.eventStartDate).toBeGreaterThan(component.eventEndDate);
  }));
  it('getFiles() should http GET files', () => {
    component.printEvent();
    let params;
    service.getFiles(params).subscribe(res => {
    });
  });
});