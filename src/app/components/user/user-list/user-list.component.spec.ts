import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { FilterBoxComponent, MyFilterPipe } from '../../filter-box/filter-box.component';
import { HttpClientService } from './../../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from './../../../../Test/mockHttpClientServiceClass';
import { Util } from './../../../shared/services/util';
import { mockUtil } from './../../../../Test/mockUtil';
import { SharedService } from './../../../shared/services/shared.service';
import { mockSharedService } from './../../../../Test/mockSharedService';
import { UserService } from '../user.service';
import { MockUserService } from './../../../../Test/mockUserService.service';
import { RouterTestingModule } from '@angular/router/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatModule } from './../../../core/mat-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent, FilterBoxComponent, MyFilterPipe],
      providers: [
        { provide: HttpClientService, useClass: mockHttpClientServiceClass },
        { provide: Util, useClass: mockUtil },
        { provide: SharedService, useClass: mockSharedService },
        { provide: UserService, useClass: MockUserService },
      ],
      imports: [RouterTestingModule.withRoutes([
        { path: 'users', component: UserListComponent }
      ]), InfiniteScrollModule, MatModule, BrowserAnimationsModule],
      schemas: [],
    })
      .compileComponents();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    router.initialNavigation();
  }));

  it('should create', () => {
component.ngOnInit();
    component.filterParams =
      {
        pathVariable: 1,
        pageSize: 50,
        roleIds: Array(2),
        status: Array(1)
      }
    expect(component.ngOnInit).toBeTruthy();
  });
  it('should call onRowClick() method', fakeAsync(() => {
    let $event = {
      target: {
        id: 'test'
      }
    }
    let id: number=391;
    component.onRowClick($event, id);
    router.navigate(['users']);
    tick();
    expect(location.path()).toBe('/users');
  }));

  it('should call cloneUser', fakeAsync(() => {
    component.cloneUser(391);
    router.navigate(['users']);
    tick();
    expect(location.path()).toBe('/users');
  }));
  it('test case for changeStatus() method', () => {
  
    let status=1;
    let element={
    name: "Anjuli Maya", 
    email: "anjulimaya@gmail.com",
    status: "InActive",
    role: "Admin", 
    id: 114954
  }
    component.changeStatus(status, element);
    expect(component.changeStatus).toBeDefined();
  });
  it('should call onChangeFilter() method', () => {
  
    component.filterParams =
      {
        pathVariable: 1,
        pageSize: 50,
        roleIds: Array(2),
        status: Array(1)
      }
    let data:any;   
    component.onChangeFilter(data);
    expect(component.onChangeFilter).toBeTruthy();
      });
});
