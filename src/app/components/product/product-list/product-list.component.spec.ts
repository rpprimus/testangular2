import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { MatModule } from '../../../core/mat-module';
import { FilterBoxComponent, MyFilterPipe } from '../../filter-box/filter-box.component';
import { ProductsService } from '../products.service';
import { mockProductsService } from '../../../../Test/mockProductsService';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { Router } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
}


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListComponent,FilterBoxComponent,MyFilterPipe ],
      imports: [MatModule,InfiniteScrollModule,BrowserAnimationsModule],
      providers: [{provide:ProductsService,useClass:mockProductsService},{provide:SharedService,useClass:mockSharedService},
                  {provide:Util,useClass:mockUtil},{provide:Router,useValue:router}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
