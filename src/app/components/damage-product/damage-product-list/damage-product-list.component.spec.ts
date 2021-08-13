import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageProductListComponent } from './damage-product-list.component';
import { FilterBoxComponent, MyFilterPipe } from '../../filter-box/filter-box.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatModule } from '../../../../app/core/mat-module';
import { RouterLink, Router, RouterModule } from '@angular/router';
import { DamageProductService } from '../damage-product.service';
import { MockDamageProductService } from '../../../../Test/mockDamageProductService.service';
import { MatRow } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { mockUtil } from '../../../../Test/mockUtil';
import { Util } from '../../../../app/shared/services/util';
import { SharedService } from '../../../../app/shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('DamageProductListComponent', () => {
  let component: DamageProductListComponent;
  let fixture: ComponentFixture<DamageProductListComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
}
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DamageProductListComponent ,FilterBoxComponent,MyFilterPipe],
      providers:[
       {provide: DamageProductService, useClass: MockDamageProductService},
       { provide: Router, useValue: router },
       { provide: Util, useClass: mockUtil },
       { provide: SharedService,useClass: mockSharedService },
      ],
      imports:[RouterTestingModule, InfiniteScrollModule, MatModule,BrowserAnimationsModule],
      schemas:[]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageProductListComponent);
    component = fixture.componentInstance;
    component.filterValues=[
      { id: 1, name: 'Active', checked: false }, 
      { id: 0, name: 'Inactive', checked: false }
      ];
  
    fixture.detectChanges();
  });

  it('should create', () => {
    localStorage.setItem('selectedClientId','37');
    expect(component).toBeTruthy();
  });
  it('should call getDamageProductList method', () => {
    component.getDamageProductList();
    fixture.detectChanges();
    expect(component.getDamageProductList).toBeTruthy();
  });
  it('should call onChangeFilter method', () => {
    let data={};
    component.onChangeFilter(data);
    fixture.detectChanges();
    expect(component.onChangeFilter).toBeTruthy();
  });
  it('should call onscroll method', () => {
    component.dataSource.data.length=2;
    component.totalRecords=6;
    component.onScroll();
    fixture.detectChanges();
    expect(component.onScroll).toBeTruthy();
  });
});
