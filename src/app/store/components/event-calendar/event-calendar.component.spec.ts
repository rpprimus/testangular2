import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventCalendarComponent } from './event-calendar.component';
import { StoreService } from '../../service/store.service';
import { Common } from '../../utility/common';
import { Router } from '@angular/router';
import { PrintEventComponent } from '../print-event/print-event.component';
import { SharedService } from '../../../shared/services/shared.service';
import { mockCommon } from '../../../../Test/mockCommon';
import { mockStoreService } from '../../../../Test/mockStoreService';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { MatModule } from '../../../core/mat-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { FullCalendarModule } from 'ng-fullcalendar';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { mockHttpClientServiceClass } from '../../../../Test/mockHttpClientServiceClass';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';

describe('EventCalendarComponent', () => {
    let component: EventCalendarComponent;
    let fixture: ComponentFixture<EventCalendarComponent>;
    let sharedService: SharedService;
    let location: Location;
    let common: Common;
    let router = {
        navigate: jasmine.createSpy('navigate')
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventCalendarComponent, PrintEventComponent],
            providers: [
                { provide: Router, useValue: router },
                { provide: SharedService, useClass: mockSharedService },
                { provide: StoreService, useClass: mockStoreService },
                { provide: Common, useClass: mockCommon },
                { provide: HttpClientService, useClass: mockHttpClientServiceClass },
                { provide: Util, useClass: mockUtil },
            ],
            imports: [MatModule, FullCalendarModule, BrowserAnimationsModule]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [PrintEventComponent]
            }
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventCalendarComponent);
        component = fixture.componentInstance;
        //sharedService=fixture.debugElement.injector.get(SharedService);
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('test case for onAddBtnClick() method', () => {
        component.onAddBtnClick();
        expect(component.onAddBtnClick).toBeDefined();
    });
    it('test case for openPrintPopUp() method', () => {
        component.openPrintPopUp();
        expect(component.openPrintPopUp).toBeDefined();
    });
    it('test case for openAddEventDialog() method', () => {
        let id = "1";
        component.openAddEventDialog(id);
        expect(component.openAddEventDialog).toBeDefined();
    });
    it('test case for eventClick() method', () => {
        let eventDetail = {
            event: {
                id: "5"
            }
        }
        component.eventClick(eventDetail);
        expect(component.eventClick).toBeDefined();
    });
    it('test case for checkForPermission() method', () => {
        component.checkForPermission();
        expect(component.checkForPermission).toBeDefined();
    });
});
