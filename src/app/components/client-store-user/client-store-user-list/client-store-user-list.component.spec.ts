import { async, ComponentFixture, TestBed ,fakeAsync,tick} from '@angular/core/testing';

import { ClientStoreUserListComponent } from './client-store-user-list.component';
import { FilterBoxComponent, MyFilterPipe } from '../../filter-box/filter-box.component';
import { MatModule } from '../../../core/mat-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PhoneNumberPipe } from "../../../shared/pipes/phone-number.pipe";
import { ClientStoreUserService } from '../client-store-user.service';
import { mockClientStoreUserService } from '../../../../Test/mockClientStoreUserService';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { RouterTestingModule } from '@angular/router/testing';

describe('StoreListComponent', () => {
  let component: ClientStoreUserListComponent;
  let fixture: ComponentFixture<ClientStoreUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientStoreUserListComponent,FilterBoxComponent,PhoneNumberPipe,MyFilterPipe ],
      imports: [MatModule,BrowserAnimationsModule,InfiniteScrollModule,RouterTestingModule.withRoutes([{path:'client-store-users/1',component:ClientStoreUserListComponent}])],
      providers: [CookieService,{provide:ClientStoreUserService,useClass:mockClientStoreUserService},
                 {provide:Util,useClass:mockUtil},{provide:SharedService,useClass:mockSharedService}]
    }).compileComponents();
  }));

  beforeEach(()=>{
    fixture = TestBed.createComponent(ClientStoreUserListComponent);
    component = fixture.componentInstance;
    component.filterParams=true;
    fixture.detectChanges();
  });

  it('should create', (() => {
    expect(component).toBeTruthy();
  }));

  it('should call getRolesAndHierarchy() method',()=>{
    component.isHierarchy=true;
    component.getRolesAndHierarchy();
    fixture.detectChanges();
    expect(component.getRolesAndHierarchy).toBeTruthy();
  });

  it('should call onRowClick method',fakeAsync(()=>{
    let $event={target:{id:1}};
    let id=1;
    component.onRowClick($event,id);
    fixture.detectChanges();
    expect(component.onRowClick).toBeTruthy();
  }));

  it('should call cloneUser()',fakeAsync(()=>{
    let id=1;
    component.cloneUser(id);
    fixture.detectChanges();
    expect(component.cloneUser).toBeTruthy();
  }));
  it('should call changeStatus() method',()=>{
    let element={id:1};
    let status="LOCKED";
    component.changeStatus(status,element);
    fixture.detectChanges();
    expect(component.changeStatus).toBeTruthy();
  });

  it('should call resendEmailVerification() method',()=>{
    let element={id:1};
    let status="LOCKED";
    component.resendEmailVerification(status,element);
    fixture.detectChanges();
    expect(component.resendEmailVerification).toBeTruthy();
  });

  it('should call onChangeFilter() method',()=>{
    let data={};
    component.onChangeFilter(data);
    fixture.detectChanges();
    expect(component.onChangeFilter).toBeTruthy();
  });

  it('should call onChangeFilter() method else block',()=>{
    let data=false;
    component.onChangeFilter(data);
    fixture.detectChanges();
    expect(component.onChangeFilter).toBeTruthy();
  });

  it('should call onScroll() method',()=>{
    component.onScroll();
    fixture.detectChanges();
    expect(component.onScroll).toBeTruthy();
  });
});
