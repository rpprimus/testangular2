import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { ChipComponent } from './chip.component';
import { MatModule } from '../../core/mat-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ChipComponent', () => {
  let component: ChipComponent;
  let fixture: ComponentFixture<ChipComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipComponent ],
      imports: [MatModule,BrowserAnimationsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipComponent);
    component = fixture.componentInstance;
    component.data={arrayValue:[
          {
            "id": 39,
            "name": "@",
            "domainName": "aruba",
            "isStoreCreated": true
          },
          {
            "id": 48,
            "name": "AFL",
            "domainName": "afl",
            "isStoreCreated": false
          },
          {
            "id": 37,
            "name": "Amazonuat",
            "domainName": "amazonuat",
            "isStoreCreated": true
          },
          {
            "id": 38,
            "name": "Bausch+Lomb",
            "domainName": "bl",
            "isStoreCreated": true
          }
    ]};
    component.optionSelected="Test";
    component.searchText.setValue("AFL");
    component.selectedData=[{
      "id": 39,
      "name": "@",
      "domainName": "aruba",
      "isStoreCreated": true
    },
    {
      "id": 48,
      "name": "AFL",
      "domainName": "afl",
      "isStoreCreated": false
    },
    {
      "id": 37,
      "name": "Amazonuat",
      "domainName": "amazonuat",
      "isStoreCreated": true
    }];
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));
  
  it('should call ngOnInit() method',fakeAsync(()=>{
    component.ngOnInit();
    tick(300);
    fixture.detectChanges();
    expect(component.ngOnInit).toBeTruthy();
  }))

  it('should call setOptions() method',()=>{
    let selectedData={
      "id": 39,
      "name": "@",
      "domainName": "aruba",
      "isStoreCreated": true
    };
    let evt={source:{selected:true}};
    component.setOptions(selectedData,evt);
    fixture.detectChanges();
    expect(component.setOptions).toBeTruthy();
  })

});
