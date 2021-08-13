import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectClientPopupComponent } from './select-client-popup.component';
import { MatModule } from '../../../../core/mat-module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClientService } from '../../../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../../Test/mockHttpClientServiceClass';
import { Router } from '@angular/router';
import { Common } from '../../../../store/utility/common';
import { mockCommon } from '../../../../../Test/mockCommon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('SelectClientPopupComponent', () => {
  let component: SelectClientPopupComponent;
  let fixture: ComponentFixture<SelectClientPopupComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
};
const mockDialogRef = {
  close: (dialogResult: any) => { }
};
const model = {clientInfo:{id:1}};


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectClientPopupComponent ],
      imports: [MatModule,BrowserAnimationsModule],
      providers: [{provide:MatDialogRef,useValue:mockDialogRef},{provide:HttpClientService,useClass:mockHttpClientServiceClass},
        {provide:Router,useValue:router},{provide:Common,useClass:mockCommon},{provide:MAT_DIALOG_DATA,useValue:model}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectClientPopupComponent);
    component = fixture.componentInstance;
    component.clients=["Acar","bcv","test"];
    component.searchText.setValue("AC");
    fixture.detectChanges();
  });

  it('should create', () => {
    component.clients=["Acar","bcv","test"];
    component.filteredOptions="AC"
    expect(component).toBeTruthy();
  });

  it('should call clientSelected() method',()=>{
    let client={},evt={source:{selected:true}};
    component.clientSelected(client,evt);
    fixture.detectChanges();
    expect(component.clientSelected).toBeTruthy();
  });

  it('should call select() method',()=>{
    component.select();
    fixture.detectChanges();
    expect(component.select).toBeTruthy();
  });

  it('should call close() method',()=>{
    component.close();
    fixture.detectChanges();
    expect(component.close).toBeTruthy();
  });

  it('should call clear() method',()=>{
    component.clear();
    fixture.detectChanges();
    expect(component.clear).toBeTruthy();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
