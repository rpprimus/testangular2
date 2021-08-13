import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageProductDetailComponent } from './damage-product-detail.component';
import { FormsModule } from '@angular/forms';
import { MatModule } from '../../../../app/core/mat-module';
import { DamageProductResourceComponent } from '../damage-product-resource/damage-product-resource.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { ActivatedRoute } from '@angular/router';
import { DamageProductService } from '../damage-product.service';
import { MockDamageProductService } from '../../../../Test/mockDamageProductService.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
declare var CKEDITOR;
xdescribe('DamageProductDetailComponent', () => {
  let component: DamageProductDetailComponent;
  let fixture: ComponentFixture<DamageProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DamageProductDetailComponent, DamageProductResourceComponent],
      providers: [
        { provide: Util, useClass: mockUtil },
        { provide: DamageProductService, useClass: MockDamageProductService },
        { provide: SharedService, useClass: mockSharedService },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              routeConfig: {
                // path: ""
              },
              params: {
                id: "1",

              },
              queryParams: {
                ClientId: "2",
              }
            },
          }
        }
      ],
      imports: [FormsModule, MatModule, CKEditorModule,
        RouterTestingModule.withRoutes([
          { path: 'damageproduct', component: DamageProductDetailComponent}
      ]), BrowserAnimationsModule],
      schemas: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageProductDetailComponent);
    component = fixture.componentInstance;
    let param: any = {
      clientId: 37,
      fixedQuantity: 0,
      id: "277",
      report: "<p>helloooo</p>↵",
      trashQuantity: 0
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call submit method', () => {
    component.submit();
    expect(component.submit).toBeTruthy();
  });
  it('should call submitDamageDetails method', () => {
    component.submitDamageDetails();

    expect(component.submitDamageDetails).toBeTruthy();
  });
  it('should call validateForm method', () => {
    let instances = (<any>CKEDITOR).instances;
    let de = fixture.debugElement.query(By.css('CKEDITOR')).nativeElement;
    de.innerHtml = "   "
    component.validateForm();
    expect(component.validateForm).toBeTruthy();
  });
  it('should call validateForm method else', () => {
    component.validateForm();
    expect(component.validateForm).toBeTruthy();
  });
  it('should call validateChangeQty', () => {
    let value = 'fixed';
    component.validateChangeQty(value);
    expect(component.validateChangeQty).toBeTruthy();
  });
 
});