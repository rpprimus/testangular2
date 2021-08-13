import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MatModule } from '../../../app/core/mat-module';
import { MatAutocompleteModule } from '@angular/material';
import { AuthService } from '../../shared/services/auth.service';
import { mockAuthService } from '../../../Test/mockAuthService.service';
import { SharedService } from '../../shared/services/shared.service';
import { mockSharedService } from '../../../Test/mockSharedService';
import { Util } from '../../shared/services/util';
import { mockUtil } from '../../../Test/mockUtil';
import { Common } from '../../store/utility/common';
import { mockCommon } from '../../../Test/mockCommon';
import { DashboardService } from './dashboard.service';
import { HttpClientService } from '../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../Test/mockHttpClientServiceClass';
import { MockDashboardService } from '../../../Test/mockDashboard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { SocketIoService } from './../../shared/services/socketio.service';

xdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  //let location: Location;
  let router={
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers:[
        SocketIoService,
        { provide: AuthService, useClass: mockAuthService },
        { provide: SharedService, useClass: mockSharedService },
        { provide:Router,useValue:router},
        { provide: Util, useClass: mockUtil },
        { provide: Common, useClass: mockCommon },
        { provide: HttpClientService, useClass: mockHttpClientServiceClass },
        { provide: DashboardService, useClass: MockDashboardService}
      ],
      imports:[MatAutocompleteModule,MatModule,BrowserAnimationsModule],
      schemas:[]
    })
    .compileComponents();
    // router = TestBed.get(Router); 
    // location = TestBed.get(Location);
    // fixture = TestBed.createComponent(DashboardComponent); 
    // component = fixture.componentInstance;
    //component.selectedValue="AFL";
    //router.initialNavigation();
  }));

  beforeEach(() => {
   fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    component.selectedValue="AFL";
    fixture.detectChanges();
  });

  it('should create', () => {
    localStorage.setItem('selectedClientInfo','{name:"Amazon"}');
    expect(component).toBeTruthy();
  });

  it('should call clientSelected() method', () => {
    let client = {id: 48, name: "AFL", domainName: "afl", isStoreCreated: false};
    let event={
      source:{
        selected: true
      }
    }
    component.clientSelected(client,event);
    fixture.detectChanges();
    expect(component.clientSelected).toBeDefined();

   });

   it('should call clientSelected() method', () => {
    let client = {id: 48, name: "AFL", domainName: "afl", isStoreCreated: false};
    let event={
      source:{
        selected: false
      }
    }
    component.clientSelected(client,event);
    fixture.detectChanges();
    expect(component.clientSelected).toBeDefined();

   });

  it('should call keypress() method', () => {
    let $event={
      target:{
        textContent:"kjhgf"
      }
    }
    component.keyPress($event);
    fixture.detectChanges();
    expect(component.keyPress).toBeDefined();
  });

  it('should call getClients() method', () => {
    component.getClients();
    fixture.detectChanges();
    expect(component.getClients).toBeDefined();
  });
  it('should call getDashboardData() method', () => {
    let param={
      clientId: 48
    }
    component.getDashboardData();
    fixture.detectChanges();
    expect(component.getDashboardData).toBeDefined();
  });
  it('should call onRowClick() method',(() => {
    
     let clientInfo=
     {
      clientId: 48, 
      clientName: "AFL", 
      clientDomainName:"afl", 
       //isStoreCreated: false
     }
     let id:number;
     component.onRowClick(id,clientInfo);
     fixture.detectChanges();
     expect(component.onRowClick).toBeTruthy();
  }));
 
  it('should call goToStore() method', () => {
    component.goToStore();
    fixture.detectChanges();
    expect(component.goToStore).toBeDefined();
  });
});
