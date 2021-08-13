import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListComponent } from './client-list.component';
import { FilterBoxComponent, MyFilterPipe } from '../../filter-box/filter-box.component';
import { MatModule } from '../../../core/mat-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ClientService } from '../client.service';
import { mockClientService } from '../../../../Test/mockClientService';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';

describe('ClientListComponent', () => {
  let component: ClientListComponent;
  let fixture: ComponentFixture<ClientListComponent>;
  let router={
    navigate: jasmine.createSpy('navigate')
}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientListComponent,FilterBoxComponent,MyFilterPipe ],
      imports: [MatModule,BrowserAnimationsModule,InfiniteScrollModule],
      providers: [{provide:ClientService,useClass:mockClientService},{provide:Router,useValue:router},
      {provide:SharedService,useClass:mockSharedService},{provide:Util,useClass:mockUtil}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onRowClick() method',()=>{
    let $event={target:{id:1}};
    let id=37;
    component.onRowClick($event,id);
    fixture.detectChanges();
    expect(component.onRowClick).toBeTruthy();
  });

  it('should call onAddBtnClick() method',()=>{
    component.onAddBtnClick();
    fixture.detectChanges();
    expect(component.onAddBtnClick).toBeTruthy();
  });

  it('should call changeStatus() method',()=>{
    let status="ACTIVE";
    let element={id:37};
    component.changeStatus(status,element);
    fixture.detectChanges();
    expect(component.changeStatus).toBeTruthy();
  });

  it('should call onChangeFilter() method if block',()=>{
    let data=[];
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
