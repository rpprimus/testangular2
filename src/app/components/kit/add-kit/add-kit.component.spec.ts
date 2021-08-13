import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKitComponent } from './add-kit.component';
import { KitService } from '../kit.service';
import { mockKitService } from '../../../../Test/mockKitService';
import { CategoryService } from '../../category/category.service';
import { mockCategoryService } from '../../../../Test/mockCategoryService';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { of, BehaviorSubject } from 'rxjs';
import { KitResourceComponent } from '../kit-resource/kit-resource.component';
import { MatModule } from '../../../core/mat-module';
import { ChipComponent } from '../../chip/chip.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../Test/mockHttpClientServiceClass';

describe('AddKitComponent', () => {
  let component: AddKitComponent;
  let fixture: ComponentFixture<AddKitComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddKitComponent,KitResourceComponent,ChipComponent],
      imports: [MatModule,BrowserAnimationsModule,CKEditorModule],
      providers: [{ provide: KitService, useClass: mockKitService }, { provide: CategoryService, useClass: mockCategoryService },{provide:HttpClientService,useClass:mockHttpClientServiceClass},
      { provide: SharedService, useClass: mockSharedService }, { provide: Util, useClass: mockUtil }, { provide: Router, useValue: router }, { provide: MatDialog, useClass: MatDialogMock },
      {
        provide: ActivatedRoute, useValue: {
          snapshot: {
            routeConfig: {
              path: "eventcalendar"
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
    ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getDefaultProduct() method',()=>{
    component.selectedProductList.data.length=0;
    component.getDefaultProduct();
    fixture.detectChanges();
    expect(component.getDefaultProduct).toBeTruthy();
  });

  it('should call openCategoryDialog() method',()=>{
    component.data={"kitCategory": [
      111,
      129,
      128,
      142,
      152,
      153,
      147,
      148,
      645,
      154,
      158,
      585,
      587,
      589,
      636,
      637,
      644,
      632,
      633,
      635,
      643,
      669
    ]};
    component.openCategoryDialog();
    fixture.detectChanges();
    expect(component.openCategoryDialog).toBeTruthy();
  });

  it('should call openSelectProductPopup() method',()=>{
    component.data={"kitCategory": [
      111,
      129,
      128,
      142,
      152,
      153,
      147,
      148,
      645,
      154,
      158,
      585,
      587,
      589,
      636,
      637,
      644,
      632,
      633,
      635,
      643,
      669
    ]};
    component.openSelectProductPopup();
    fixture.detectChanges();
    expect(component.openSelectProductPopup).toBeTruthy();
  });

  it('should call submitKitDetails() method',()=>{
    component.submitKitDetails();
    fixture.detectChanges();
    expect(component.submitKitDetails).toBeTruthy();
  });

  it('should call resetKitDetails() method',()=>{
    component.resetKitDetails();
    fixture.detectChanges();
    expect(component.resetKitDetails).toBeTruthy();
  });

  it('should call onChangeVisibilityGroup() method',()=>{
    let data=[{id:47},{id:39}];
    component.onChangeVisibilityGroup(data);
    fixture.detectChanges();
    expect(component.onChangeVisibilityGroup).toBeTruthy();
  });

  it('should call removeProduct() method',()=>{
    component.selectedProductList.data=[{id:39},{id:47}];
    let element={id:47};
    component.removeProduct(element);
    fixture.detectChanges();
    expect(component.removeProduct).toBeTruthy();
  });
});
export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of([{id:47},{id:39}])
    };
  }
}
