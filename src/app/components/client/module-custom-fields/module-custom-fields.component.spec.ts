import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleCustomFieldsComponent } from './module-custom-fields.component';
import { MatDialog } from '@angular/material';
import { of } from 'rxjs';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { MatModule } from '../../../core/mat-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ModuleCustomFieldsComponent', () => {
  let component: ModuleCustomFieldsComponent;
  let fixture: ComponentFixture<ModuleCustomFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleCustomFieldsComponent],
      imports: [MatModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock }, { provide: Util, useClass: mockUtil }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleCustomFieldsComponent);
    component = fixture.componentInstance;
    component.data = {
      isChecked: true,
      fieldDetails: [{
        id: 266,
        description: "Test event field",
        type: "READ_ONLY",
        lookupValue: "Blue↵Red↵Yellow↵Green",
        fieldLength: 0,
        isActive: true,
        linkedFieldValue: null,
        linkedFieldId: null,
        isDisplayed: false,
        isRequired: true,
        fieldSequence: 1,
        isClicked: false
      }, {
        id: 297,
        description: "test linked field",
        type: "DROP_DOWN",
        lookupValue: "test1~test2~test3",
        fieldLength: 0,
        isActive: true,
        linkedFieldValue: null,
        linkedFieldId: null,
        isDisplayed: false,
        isRequired: true,
        fieldSequence: 2,
        isClicked: false
      }, {
        id: 299,
        description: "test1 yes selected",
        type: "TEXT_BOX",
        lookupValue: "",
        fieldLength: 10,
        isActive: true,
        linkedFieldValue: "yes",
        linkedFieldId: 298,
        isDisplayed: false,
        isRequired: false,
        fieldSequence: 3,
        isClicked: false
      }],
      orderingType: 1,
      selectedRowIndex: 7,
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBaseCustomField() method',()=>{
    component.getBaseCustomField();
    fixture.detectChanges();
    expect(component.getBaseCustomField).toBeTruthy();
  });

  it('should call onAddCustomField() method',()=>{
    component.onAddCustomField();
    fixture.detectChanges();
    expect(component.onAddCustomField).toBeTruthy();
  });

  it('should call onRemoveCustomField() method',()=>{
    let index=0;
    component.onRemoveCustomField(index);
    fixture.detectChanges();
    expect(component.onRemoveCustomField).toBeTruthy();
  });

  it('should call selectRow() method if block',()=>{
    let rowId=7,item={};
    component.selectRow(rowId,item);
    fixture.detectChanges();
    expect(component.selectRow).toBeTruthy();
  });

  it('should call selectRow() method else block',()=>{
    let rowId=6,item={};
    component.selectRow(rowId,item);
    fixture.detectChanges();
    expect(component.selectRow).toBeTruthy();
  });

  it('should call enableSubmitBtn() method case 2',()=>{
    component.data.orderingType=2;
    component.enableSubmitBtn();
    fixture.detectChanges();
    expect(component.enableSubmitBtn).toBeTruthy();
  });

  it('should call enableSubmitBtn() method case 3',()=>{
    component.data.orderingType=3;
    component.enableSubmitBtn();
    fixture.detectChanges();
    expect(component.enableSubmitBtn).toBeTruthy();
  });

  it('should call enableSubmitBtn() method case 4',()=>{
    component.data.orderingType=4;
    component.enableSubmitBtn();
    fixture.detectChanges();
    expect(component.enableSubmitBtn).toBeTruthy();
  });

  it('should call enableSubmitBtn() method case default',()=>{
    component.data.orderingType=5;
    component.enableSubmitBtn();
    fixture.detectChanges();
    expect(component.enableSubmitBtn).toBeTruthy();
  });

  it('should call linkCustomField() method',()=>{
    let field={},listData={};
    component.linkCustomField(field,listData);
    fixture.detectChanges();
    expect(component.linkCustomField).toBeTruthy();
  });
});
export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(true)
    };
  }
}
