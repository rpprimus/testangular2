import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientModulesComponent } from './client-modules.component';
import { MatModule } from '../../../core/mat-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClientService } from '../client.service';
import { mockClientService } from '../../../../Test/mockClientService';
import { Router } from '@angular/router';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../../Test/mockHttpClientServiceClass';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { Enum } from '../../../shared/config/enum.enum';

describe('ClientModulesComponent', () => {
  let component: ClientModulesComponent;
  let fixture: ComponentFixture<ClientModulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientModulesComponent ],
      imports:  [MatModule,BrowserAnimationsModule,HttpClientModule,FormsModule,CKEditorModule],
      schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
      providers: [mockClientService,HttpClient,{provide:ClientService,useClass:mockClientService},{provide:HttpClientService,useClass:mockHttpClientServiceClass},
      {provide:SharedService,useClass:mockSharedService},{provide:Util,useClass:mockUtil}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOninit() method',()=>{
    component.util.clientId=1;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.ngOnInit).toBeTruthy();
  });

  it('should call onGetRequestSuccess() method case 1',()=>{
    let data={eventDetails:{}}
    let val=Enum.Module_EventDetails;
    component.onGetRequestSuccess(data,val);
    fixture.detectChanges();
    expect(component.onGetRequestSuccess).toBeTruthy();
  });

  it('should call onGetRequestSuccess() method case 2',()=>{
    let data={shipmentDetails:{}}
    let val=Enum.Module_ShipmentDetails;
    component.onGetRequestSuccess(data,val);
    fixture.detectChanges();
    expect(component.onGetRequestSuccess).toBeTruthy();
  });

  it('should call onGetRequestSuccess() method case 3',()=>{
    let data={pickupDetails:{}}
    let val=Enum.Module_PickupDetails;
    component.onGetRequestSuccess(data,val);
    fixture.detectChanges();
    expect(component.onGetRequestSuccess).toBeTruthy();
  });

  it('should call onGetRequestSuccess() method case 4',()=>{
    let data={additionalInfoDetails:{}}
    let val=Enum.Module_AdditionalDetail;
    component.onGetRequestSuccess(data,val);
    fixture.detectChanges();
    expect(component.onGetRequestSuccess).toBeTruthy();
  });

  it('should call onGetRequestSuccess() method case 5',()=>{
    let data={eventModuleDetails:{}}
    let val=Enum.Module_Event;
    component.onGetRequestSuccess(data,val);
    fixture.detectChanges();
    expect(component.onGetRequestSuccess).toBeTruthy();
  });

  it('should call onGetRequestSuccess() method case 6',()=>{
    let data={signUpModuleDetails:{}}
    let val=Enum.Module_SignUp;
    component.onGetRequestSuccess(data,val);
    fixture.detectChanges();
    expect(component.onGetRequestSuccess).toBeTruthy();
  });

  it('should call onGetRequestSuccess() method case 7',()=>{
    let data={serviceDetails:{serviceTitle:[]}};
    let val=Enum.Module_ServicePage;
    component.onGetRequestSuccess(data,val);
    fixture.detectChanges();
    expect(component.onGetRequestSuccess).toBeTruthy();
  });

  it('should call onSaveServicePage() method',()=>{
    component.util.clientId=1;
    component.onSaveServicePage();
    fixture.detectChanges();
    expect(component.onSaveServicePage).toBeTruthy();
  });

  it('should call onSaveOrderingDetail() method',()=>{
    component.util.clientId=1;
    let data={
      "isChecked": true,
      "fieldDetails": [
        {
          "id": 266,
          "description": "Test event field",
          "type": "READ_ONLY",
          "lookupValue": "Blue\nRed\nYellow\nGreen",
          "fieldLength": 0,
          "isActive": true,
          "linkedFieldValue": null,
          "linkedFieldId": null,
          "isDisplayed": false,
          "isRequired": true,
          "fieldSequence": 1
        },
        {
          "id": 297,
          "description": "test linked field",
          "type": "DROP_DOWN",
          "lookupValue": "test1~test2~test3",
          "fieldLength": 0,
          "isActive": true,
          "linkedFieldValue": null,
          "linkedFieldId": null,
          "isDisplayed": false,
          "isRequired": true,
          "fieldSequence": 2
        },
        {
          "id": 298,
          "description": "test1 selected",
          "type": "RADIO_BUTTON",
          "lookupValue": "yes~no",
          "fieldLength": 0,
          "isActive": true,
          "linkedFieldValue": "test1",
          "linkedFieldId": 297,
          "isDisplayed": false,
          "isRequired": false,
          "fieldSequence": 3
        },
        {
          "id": 299,
          "description": "test1 yes selected",
          "type": "TEXT_BOX",
          "lookupValue": "",
          "fieldLength": 10,
          "isActive": true,
          "linkedFieldValue": "yes",
          "linkedFieldId": 298,
          "isDisplayed": false,
          "isRequired": false,
          "fieldSequence": 4
        },
        {
          "id": 340,
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin orci lorem, finibus imperdiet leo dignissim sed. In quis dolor consequat, ultricies mauris ac, dictum enim. Aenean volutpat sollicitudin enim eu iaculis. Suspendisse a tempus turpis. Curabitur tempor porta nunc a varius. Praese",
          "type": "READ_ONLY",
          "lookupValue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin orci lorem, finibus imperdiet leo dignissim sed. In quis dolor consequat, ultricies mauris ac, dictum enim. Aenean volutpat sollicitudin enim eu iaculis. Suspendisse a tempus turpis. Curabitur tempor porta nunc a varius. Praesent iaculis sem at orci placerat, vitae malesuada nibh scelerisque. In purus nulla, venenatis in aliquet hendrerit, vehicula vel leo. Aliquam posuere, nibh vitae hendrerit sollicitudin, lectus eros convallis augue, sit amet tincidunt diam velit maximus lectus. Nullam eget enim accumsan, imperdiet turpis vehicula, bibendum ante. Pellentesque mattis eros non risus tristique, ut sagittis dolor placerat. Aenean faucibus fermentum elementum.\n\nCurabitur vel dictum nisi. Morbi at pretium mauris. Sed tristique eros aliquet enim fringilla, nec vulputate elit maximus. Ut massa erat, sodales non blandit euismod, consequat in est. Maecenas posuere, felis eu tincidunt luctus, massa augue ultrices velit, at venenatis diam augue in diam. Mauris semper quam nec dictum lobortis. Nam in sapien lorem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a scelerisque nibh. Quisque luctus sed orci in semper. Aenean diam orci, rutrum sed ultrices eget, sollicitudin non augue. Ut eget massa quis neque congue egestas id ac arcu. Curabitur varius turpis eu orci luctus, quis vulputate purus sagittis. Pellentes",
          "fieldLength": 0,
          "isActive": false,
          "linkedFieldValue": null,
          "linkedFieldId": null,
          "isDisplayed": null,
          "isRequired": false,
          "fieldSequence": 5
        },
        {
          "id": 348,
          "description": "Email field test",
          "type": "EMAIL",
          "lookupValue": "",
          "fieldLength": 200,
          "isActive": true,
          "linkedFieldValue": null,
          "linkedFieldId": null,
          "isDisplayed": null,
          "isRequired": false,
          "fieldSequence": 6
        },
        {
          "id": 350,
          "description": "date field test",
          "type": "CUSTOM_DATE",
          "lookupValue": "",
          "fieldLength": 0,
          "isActive": true,
          "linkedFieldValue": null,
          "linkedFieldId": null,
          "isDisplayed": null,
          "isRequired": false,
          "fieldSequence": 7
        }
      ],
      "orderingType": 1
    };
    component.onSaveOrderingDetail(data);
    fixture.detectChanges();
    expect(component.onSaveOrderingDetail).toBeTruthy();
  });

  it('should call checkCustomFieldValid() method',()=>{
    component.util.clientId=1;
    let data={
      "isChecked": true,
      "fieldDetails": [
        {
          "id": 266,
          "description": "",
          "type": "READ_ONLY",
          "lookupValue": "Blue\nRed\nYellow\nGreen",
          "fieldLength": 0,
          "isActive": true,
          "linkedFieldValue": null,
          "linkedFieldId": null,
          "isDisplayed": false,
          "isRequired": true,
          "fieldSequence": 1
        },
        {
          "id": 297,
          "description": "test linked field",
          "type": "DROP_DOWN",
          "lookupValue": "test1~test2~test3",
          "fieldLength": 0,
          "isActive": true,
          "linkedFieldValue": null,
          "linkedFieldId": null,
          "isDisplayed": false,
          "isRequired": true,
          "fieldSequence": 2
        },
      ],
      "orderingType": 1
    };
    component.checkCustomFieldValid(data);
    fixture.detectChanges();
    expect(component.checkCustomFieldValid).toBeTruthy();
  });

  it('should call manageServiceTitleSequence() method',()=>{
    component.util.clientId=1;
    let data=[
        {
          "id": 266,
          "description": "",
          "type": "READ_ONLY",
          "lookupValue": "Blue\nRed\nYellow\nGreen",
          "fieldLength": 0,
          "isActive": true,
          "linkedFieldValue": null,
          "linkedFieldId": null,
          "isDisplayed": false,
          "isRequired": true,
          "fieldSequence": 1
        },
        {
          "id": 297,
          "description": "test linked field",
          "type": "DROP_DOWN",
          "lookupValue": "test1~test2~test3",
          "fieldLength": 0,
          "isActive": false,
          "linkedFieldValue": null,
          "linkedFieldId": null,
          "isDisplayed": false,
          "isRequired": true,
          "fieldSequence": 2
        },
      ];
    component.manageServiceTitleSequence(data);
    fixture.detectChanges();
    expect(component.manageServiceTitleSequence).toBeTruthy();
  });

  it('should call removeBlankObject() method',()=>{
    component.servicePageData={"serviceTitle": [
      {
        "serviceTitleName": "Development Testing",
        "serviceTitleSequence": 0,
        "id": 125,
        "isActive": false,
        "fieldDetails": [
          {
            "id": 319,
            "description": "Development testeropment tester testing own sideDevelopment tester t",
            "type": "CHECK_BOX",
            "lookupValue": "Development tester testing own sideDevelopment tester testing own side",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 1
          },
          {
            "id": 318,
            "description": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester t",
            "type": "CHECK_BOX",
            "lookupValue": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own side",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 2
          },
          {
            "id": 321,
            "description": "test2",
            "type": "CHECK_BOX",
            "lookupValue": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own side",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 3
          },
          {
            "id": 320,
            "description": " test",
            "type": "CHECK_BOX",
            "lookupValue": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own side",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 4
          },
          {
            "id": 317,
            "description": "Development tester testing own side Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own side",
            "type": "CHECK_BOX",
            "lookupValue": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevel",
            "fieldLength": 12,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 5
          },
          {
            "id": 322,
            "description": "Development tester testing own side",
            "type": "CHECK_BOX",
            "lookupValue": "Development tester testing own side",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 6
          },
          {
            "id": 323,
            "description": "Development tester testing own side",
            "type": "CHECK_BOX",
            "lookupValue": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own side",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 7
          },
          {
            "id": 324,
            "description": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own side",
            "type": "RADIO_BUTTON",
            "lookupValue": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own side",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 8
          },
          {
            "id": 325,
            "description": "Development tester testing own side",
            "type": "RADIO_BUTTON",
            "lookupValue": "Development tester testing own sideDevelopment tester testing own side",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 9
          },
          {
            "id": 326,
            "description": "amit test",
            "type": "RADIO_BUTTON",
            "lookupValue": "Development tester testing own sideDevelopment tester testing own side",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": "Development tester testing own sideDevelopment tester testing own side",
            "linkedFieldId": 325,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 10
          },
          {
            "id": 327,
            "description": "amit",
            "type": "RADIO_BUTTON",
            "lookupValue": "Development tester testing own side",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 11
          }
        ]
      },
      {
        "serviceTitleName": "Service title 2",
        "serviceTitleSequence": 1,
        "id": 124,
        "isActive": true,
        "fieldDetails": [
          {
            "id": 315,
            "description": "test field of service title 2",
            "type": "CHECK_BOX",
            "lookupValue": "Microsoft~Apple~Google~Amazon",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 1
          },
          {
            "id": 316,
            "description": "test field 2 of service title 2 ",
            "type": "CHECK_BOX",
            "lookupValue": "Lorem ipsum it. Phasellus vestibulum felis id eros vehicula, sed fermentum ligula tempor. Duis pulvinar, purus viverra dictum congue, justo nibh pulvinar magna, eget dapibus justo ante bibendum arcu. Proin egestas ligula sed arcu imperdiet, sit amet fringilla nisi fringilla~Morbi eu lorem vulputate, porta dolor interdum, efficitur est. Vestibulum ac leo eget nisi suscipit ultricies. Quisque eu massa eu neque posuere bibendum vitae eget sem. Pellentesque eros est, vehicula vitae faucibus sit amet, ultrices in velit. Nulla ornare rhoncus condimentum. Vestibulum dapibus, orci ut auctor vestibulum, turpis mauris ullamcorper nisi, at efficitur nisi ex quis lectus. Nullam ut diam dapibus, egestas magna quis, euismod odio. Nunc ac iaculis magna. Phasellus id lorem la~lacinia nunc vel, pellentesque odio. Aenean vel enim nisi. Cras orci tellus, facilisis eu consequat eget, rhoncus in lectus. Aenean accumsan ligula a facilisis dapibus. Fusce eget tempus mi. Vivamus sit amet magna aliquet, rutrum quam ac, sagittis lacus. Ut vel mi in lorem ultrices vehicula~Praesent ullamcorper eget lacus vitae convallis. Morbi sit amet dui arcu. Nunc sagittis erat vitae augue tincidunt, vitae laoreet ex rhoncus. Quisque in tristique dui. Fusce sit amet ipsum eros. Nunc placerat felis non nisi gravida mattis. Nulla laoreet iaculis massa ac bibendum. Etiam in nulla eget velit ultricies malesuada nec id diam. Quisque ac varius sapien. Morbi vitae b~t amet sollicitudin dignissim, metus lorem vulputate dui, sit amet fringilla massa augue non velit. Phasellus vestibulum felis id eros vehicula, sed fermentum ligula tempor. Duis pulvinar, purus viverra dictum congue, justo nibh pulvinar magna, eget dapibus justo ante bibendum arcu. Proin egestas ligula sed arcu imperdiet, sit am~gestas magna quis, euismod odio. Nunc ac iaculis magna. Phasellus id lorem laoreet, lacinia nunc vel, pellentesque odio. Aenean vel enim nisi. Cras orci tellus, facilisis eu consequat eget, rhoncus in lectus. Aenean accumsan ",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 2
          },
          {
            "id": 329,
            "description": "test field 3 of service title 2",
            "type": "CHECK_BOX",
            "lookupValue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque lorem et urna laoreet pharetra. Donec vel nulla lorem. Vestibulum varius magna nulla. Mauris egestas diam eget elit venenatis fringilla. Mauris dictum, nunc ut efficitur lacinia, ante mauris suscipit odio, non rhoncus leo leo at quam~Morbi eu lorem vulputate, porta dolor interdum, efficitur est. Vestibulum ac leo eget nisi suscipit ultricies. Quisque eu massa eu neque posuere bibendum vitae eget sem. Pellentesque eros est, vehicula vitae faucibus sit amet, ultrices in velit. Nulla ornare rhoncus condimentum. Vestibulum dapibus, orci ut auctor vestib~Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque lorem et urna laoreet pharetra. Donec vel nulla lorem. Vestibulum varius magna nulla. Mauris egestas diam eget elit venenatis fringilla. Mauris dictum, nunc ut efficitur lacinia, ante mauris suscipit odio, non rhoncus leo leo at quam. Sed vitae porta augue, ac varius mi. Pellentesque at massa sagittis, gravida ante et, imperdiet mi. Morbi pretium, mi sit amet sollicitudin dignissim~aesent ullamcorper eget lacus vitae convallis. Morbi sit amet dui arcu. Nunc sagittis erat vitae a~orem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque lorem et urna laor",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 3
          },
          {
            "id": 330,
            "description": "test field 4 of service title 2",
            "type": "CHECK_BOX",
            "lookupValue": "hendrerit sollicitudin diam. Sed mi lacus, feugiat in elit in, ultrices efficitur turpis. Phasellus mollis a tellus at condimentum. Praesent vel facilisis leo.Quisque sit amet nisl sed~ntum tellus eu sapien euismod eleifend a eget nisl. Morbi sollicitudin condimentum augue, in auctor quam semper vel. Nullam tellus urna, tincidunt et est sed,~est ultricies viverra at ut leo. Pellentesque tincidunt gravida odio in rutrum. Vestibulum semper vitae sapien ac dictum. Cras elementum, leo quis maximus pretium, ex nisl faucibus odio, ut tempor ante elit et tortor. Nu  lla lectus justo, placerat feugiat mi quis, lacinia ornare nulla. Maecenas iaculis ornare nunc. Duis condimentum tellus eu sapien euismod eleifend a eget nisl. Morbi sollicitudin condimentum augue, in auctor quam semper vel. Nullam tellus urna, tincidunt et est sed, hendrerit sollicitudin diam. Sed mi lacus, feugiat in elit in, ultrices efficitur turpis. Phasellus mollis a tellus at condimentum. Praesent vel facilisis leo.Quisque sit amet nisl sed est ultricie~\"Quisque sit amet nisl sed est ultricies viverra at ut leo. Pellentesque tincidunt gravida odio in rutrum",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 4
          },
          {
            "id": 344,
            "description": "test date field",
            "type": "CUSTOM_DATE",
            "lookupValue": "",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 5
          },
          {
            "id": 345,
            "description": "test email field",
            "type": "EMAIL",
            "lookupValue": "",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 6
          }
        ]
      },
      {
        "serviceTitleName": "Service title 1",
        "serviceTitleSequence": 2,
        "id": 117,
        "isActive": true,
        "fieldDetails": [
          {
            "id": 292,
            "description": "Is Event approved",
            "type": "RADIO_BUTTON",
            "lookupValue": "YES~NO",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": false,
            "isRequired": false,
            "fieldSequence": 1
          },
          {
            "id": 293,
            "description": "Type of event",
            "type": "DROP_DOWN",
            "lookupValue": "Google IO~AutoExpo",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": "YES",
            "linkedFieldId": 292,
            "isDisplayed": false,
            "isRequired": false,
            "fieldSequence": 2
          },
          {
            "id": 294,
            "description": "Thank you for your time",
            "type": "READ_ONLY",
            "lookupValue": "We appreciate the time you have invested with us.",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": "NO",
            "linkedFieldId": 292,
            "isDisplayed": false,
            "isRequired": false,
            "fieldSequence": 3
          },
          {
            "id": 295,
            "description": "What type of automobile will be there?",
            "type": "DROP_DOWN",
            "lookupValue": "Car~Bike~Boat",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": "AutoExpo",
            "linkedFieldId": 293,
            "isDisplayed": false,
            "isRequired": true,
            "fieldSequence": 4
          },
          {
            "id": 296,
            "description": "Size of package",
            "type": "CHECK_BOX",
            "lookupValue": "12m length~10m width~12m height",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": false,
            "isRequired": true,
            "fieldSequence": 5
          },
          {
            "id": 303,
            "description": "test",
            "type": "TEXT_AREA",
            "lookupValue": "",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": "YES",
            "linkedFieldId": 292,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 6
          },
          {
            "id": 304,
            "description": "Font issue testing",
            "type": "READ_ONLY",
            "lookupValue": "Font issue testing only content. Please ignore it for now. Font issue testing only content. Please ignore it for now.",
            "fieldLength": 1000,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 7
          },
          {
            "id": 305,
            "description": "Blank Label without any text value testing Blank Label without any text value testingBlank Label without any text value testingBlank Label without any text value testing",
            "type": "READ_ONLY",
            "lookupValue": "vdvfdbvfdb",
            "fieldLength": 1,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 8
          },
          {
            "id": 306,
            "description": "Testing from development view",
            "type": "READ_ONLY",
            "lookupValue": "Testing from development view Font issue testing only content. Please ignore it for now. Font issue testing only content. Please ignore it for now.\nFont issue testing only content. Please ignore it for now. Font issue testing only content. Please ignore it for now.\n\nFont issue testing only content. ",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 9
          },
          {
            "id": 331,
            "description": "Test Development",
            "type": "RADIO_BUTTON",
            "lookupValue": "Testing1 ~ Testing 2 ~ Testing 3",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 10
          },
          {
            "id": 332,
            "description": "Checkbox space",
            "type": "CHECK_BOX",
            "lookupValue": "test1 ~ test2 ~ test3",
            "fieldLength": 300,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 11
          },
          {
            "id": 333,
            "description": "test",
            "type": "TEXT_AREA",
            "lookupValue": "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest",
            "fieldLength": 500,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 12
          },
          {
            "id": 335,
            "description": "test 2 space",
            "type": "TEXT_AREA",
            "lookupValue": "this is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only content",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 13
          }
        ]
      }
    ],
    "isServicePageChecked": true
  };
    component.util.clientId=1;
    component.removeBlankObject();
    fixture.detectChanges();
    expect(component.removeBlankObject).toBeTruthy();
  });

  it('should call checkValid() method',()=>{
    component.servicePageData={"serviceTitle": [
      {
        "serviceTitleName": "Development Testing",
        "serviceTitleSequence": 0,
        "id": 125,
        "isActive": false,
        "fieldDetails": [
          {
            "id": 319,
            "description": "Development testeropment tester testing own sideDevelopment tester t",
            "type": "CHECK_BOX",
            "lookupValue": "Development tester testing own sideDevelopment tester testing own side",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 1
          },
          {
            "id": 318,
            "description": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester t",
            "type": "CHECK_BOX",
            "lookupValue": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own side",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 2
          },
          {
            "id": 321,
            "description": "test2",
            "type": "CHECK_BOX",
            "lookupValue": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own side",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 3
          },
          {
            "id": 320,
            "description": " test",
            "type": "CHECK_BOX",
            "lookupValue": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own side",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 4
          },
          {
            "id": 317,
            "description": "Development tester testing own side Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own side",
            "type": "CHECK_BOX",
            "lookupValue": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevel",
            "fieldLength": 12,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 5
          },
          {
            "id": 322,
            "description": "Development tester testing own side",
            "type": "CHECK_BOX",
            "lookupValue": "Development tester testing own side",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 6
          },
          {
            "id": 323,
            "description": "Development tester testing own side",
            "type": "CHECK_BOX",
            "lookupValue": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own side",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 7
          },
          {
            "id": 324,
            "description": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own sideDevelopment tester testing own side",
            "type": "RADIO_BUTTON",
            "lookupValue": "Development tester testing own sideDevelopment tester testing own sideDevelopment tester testing own side",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 8
          },
          {
            "id": 325,
            "description": "Development tester testing own side",
            "type": "RADIO_BUTTON",
            "lookupValue": "Development tester testing own sideDevelopment tester testing own side",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 9
          },
          {
            "id": 326,
            "description": "amit test",
            "type": "RADIO_BUTTON",
            "lookupValue": "Development tester testing own sideDevelopment tester testing own side",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": "Development tester testing own sideDevelopment tester testing own side",
            "linkedFieldId": 325,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 10
          },
          {
            "id": 327,
            "description": "amit",
            "type": "RADIO_BUTTON",
            "lookupValue": "Development tester testing own side",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 11
          }
        ]
      },
      {
        "serviceTitleName": "Service title 2",
        "serviceTitleSequence": 1,
        "id": 124,
        "isActive": true,
        "fieldDetails": [
          {
            "id": 315,
            "description": "test field of service title 2",
            "type": "CHECK_BOX",
            "lookupValue": "Microsoft~Apple~Google~Amazon",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 1
          },
          {
            "id": 316,
            "description": "test field 2 of service title 2 ",
            "type": "CHECK_BOX",
            "lookupValue": "Lorem ipsum it. Phasellus vestibulum felis id eros vehicula, sed fermentum ligula tempor. Duis pulvinar, purus viverra dictum congue, justo nibh pulvinar magna, eget dapibus justo ante bibendum arcu. Proin egestas ligula sed arcu imperdiet, sit amet fringilla nisi fringilla~Morbi eu lorem vulputate, porta dolor interdum, efficitur est. Vestibulum ac leo eget nisi suscipit ultricies. Quisque eu massa eu neque posuere bibendum vitae eget sem. Pellentesque eros est, vehicula vitae faucibus sit amet, ultrices in velit. Nulla ornare rhoncus condimentum. Vestibulum dapibus, orci ut auctor vestibulum, turpis mauris ullamcorper nisi, at efficitur nisi ex quis lectus. Nullam ut diam dapibus, egestas magna quis, euismod odio. Nunc ac iaculis magna. Phasellus id lorem la~lacinia nunc vel, pellentesque odio. Aenean vel enim nisi. Cras orci tellus, facilisis eu consequat eget, rhoncus in lectus. Aenean accumsan ligula a facilisis dapibus. Fusce eget tempus mi. Vivamus sit amet magna aliquet, rutrum quam ac, sagittis lacus. Ut vel mi in lorem ultrices vehicula~Praesent ullamcorper eget lacus vitae convallis. Morbi sit amet dui arcu. Nunc sagittis erat vitae augue tincidunt, vitae laoreet ex rhoncus. Quisque in tristique dui. Fusce sit amet ipsum eros. Nunc placerat felis non nisi gravida mattis. Nulla laoreet iaculis massa ac bibendum. Etiam in nulla eget velit ultricies malesuada nec id diam. Quisque ac varius sapien. Morbi vitae b~t amet sollicitudin dignissim, metus lorem vulputate dui, sit amet fringilla massa augue non velit. Phasellus vestibulum felis id eros vehicula, sed fermentum ligula tempor. Duis pulvinar, purus viverra dictum congue, justo nibh pulvinar magna, eget dapibus justo ante bibendum arcu. Proin egestas ligula sed arcu imperdiet, sit am~gestas magna quis, euismod odio. Nunc ac iaculis magna. Phasellus id lorem laoreet, lacinia nunc vel, pellentesque odio. Aenean vel enim nisi. Cras orci tellus, facilisis eu consequat eget, rhoncus in lectus. Aenean accumsan ",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 2
          },
          {
            "id": 329,
            "description": "test field 3 of service title 2",
            "type": "CHECK_BOX",
            "lookupValue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque lorem et urna laoreet pharetra. Donec vel nulla lorem. Vestibulum varius magna nulla. Mauris egestas diam eget elit venenatis fringilla. Mauris dictum, nunc ut efficitur lacinia, ante mauris suscipit odio, non rhoncus leo leo at quam~Morbi eu lorem vulputate, porta dolor interdum, efficitur est. Vestibulum ac leo eget nisi suscipit ultricies. Quisque eu massa eu neque posuere bibendum vitae eget sem. Pellentesque eros est, vehicula vitae faucibus sit amet, ultrices in velit. Nulla ornare rhoncus condimentum. Vestibulum dapibus, orci ut auctor vestib~Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque lorem et urna laoreet pharetra. Donec vel nulla lorem. Vestibulum varius magna nulla. Mauris egestas diam eget elit venenatis fringilla. Mauris dictum, nunc ut efficitur lacinia, ante mauris suscipit odio, non rhoncus leo leo at quam. Sed vitae porta augue, ac varius mi. Pellentesque at massa sagittis, gravida ante et, imperdiet mi. Morbi pretium, mi sit amet sollicitudin dignissim~aesent ullamcorper eget lacus vitae convallis. Morbi sit amet dui arcu. Nunc sagittis erat vitae a~orem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque lorem et urna laor",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 3
          },
          {
            "id": 330,
            "description": "test field 4 of service title 2",
            "type": "CHECK_BOX",
            "lookupValue": "hendrerit sollicitudin diam. Sed mi lacus, feugiat in elit in, ultrices efficitur turpis. Phasellus mollis a tellus at condimentum. Praesent vel facilisis leo.Quisque sit amet nisl sed~ntum tellus eu sapien euismod eleifend a eget nisl. Morbi sollicitudin condimentum augue, in auctor quam semper vel. Nullam tellus urna, tincidunt et est sed,~est ultricies viverra at ut leo. Pellentesque tincidunt gravida odio in rutrum. Vestibulum semper vitae sapien ac dictum. Cras elementum, leo quis maximus pretium, ex nisl faucibus odio, ut tempor ante elit et tortor. Nu  lla lectus justo, placerat feugiat mi quis, lacinia ornare nulla. Maecenas iaculis ornare nunc. Duis condimentum tellus eu sapien euismod eleifend a eget nisl. Morbi sollicitudin condimentum augue, in auctor quam semper vel. Nullam tellus urna, tincidunt et est sed, hendrerit sollicitudin diam. Sed mi lacus, feugiat in elit in, ultrices efficitur turpis. Phasellus mollis a tellus at condimentum. Praesent vel facilisis leo.Quisque sit amet nisl sed est ultricie~\"Quisque sit amet nisl sed est ultricies viverra at ut leo. Pellentesque tincidunt gravida odio in rutrum",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 4
          },
          {
            "id": 344,
            "description": "test date field",
            "type": "CUSTOM_DATE",
            "lookupValue": "",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 5
          },
          {
            "id": 345,
            "description": "test email field",
            "type": "EMAIL",
            "lookupValue": "",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 6
          }
        ]
      },
      {
        "serviceTitleName": "Service title 1",
        "serviceTitleSequence": 2,
        "id": 117,
        "isActive": true,
        "fieldDetails": [
          {
            "id": 292,
            "description": "Is Event approved",
            "type": "RADIO_BUTTON",
            "lookupValue": "YES~NO",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": false,
            "isRequired": false,
            "fieldSequence": 1
          },
          {
            "id": 293,
            "description": "Type of event",
            "type": "DROP_DOWN",
            "lookupValue": "Google IO~AutoExpo",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": "YES",
            "linkedFieldId": 292,
            "isDisplayed": false,
            "isRequired": false,
            "fieldSequence": 2
          },
          {
            "id": 294,
            "description": "Thank you for your time",
            "type": "READ_ONLY",
            "lookupValue": "We appreciate the time you have invested with us.",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": "NO",
            "linkedFieldId": 292,
            "isDisplayed": false,
            "isRequired": false,
            "fieldSequence": 3
          },
          {
            "id": 295,
            "description": "What type of automobile will be there?",
            "type": "DROP_DOWN",
            "lookupValue": "Car~Bike~Boat",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": "AutoExpo",
            "linkedFieldId": 293,
            "isDisplayed": false,
            "isRequired": true,
            "fieldSequence": 4
          },
          {
            "id": 296,
            "description": "Size of package",
            "type": "CHECK_BOX",
            "lookupValue": "12m length~10m width~12m height",
            "fieldLength": 0,
            "isActive": true,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": false,
            "isRequired": true,
            "fieldSequence": 5
          },
          {
            "id": 303,
            "description": "test",
            "type": "TEXT_AREA",
            "lookupValue": "",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": "YES",
            "linkedFieldId": 292,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 6
          },
          {
            "id": 304,
            "description": "Font issue testing",
            "type": "READ_ONLY",
            "lookupValue": "Font issue testing only content. Please ignore it for now. Font issue testing only content. Please ignore it for now.",
            "fieldLength": 1000,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 7
          },
          {
            "id": 305,
            "description": "Blank Label without any text value testing Blank Label without any text value testingBlank Label without any text value testingBlank Label without any text value testing",
            "type": "READ_ONLY",
            "lookupValue": "vdvfdbvfdb",
            "fieldLength": 1,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 8
          },
          {
            "id": 306,
            "description": "Testing from development view",
            "type": "READ_ONLY",
            "lookupValue": "Testing from development view Font issue testing only content. Please ignore it for now. Font issue testing only content. Please ignore it for now.\nFont issue testing only content. Please ignore it for now. Font issue testing only content. Please ignore it for now.\n\nFont issue testing only content. ",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 9
          },
          {
            "id": 331,
            "description": "Test Development",
            "type": "RADIO_BUTTON",
            "lookupValue": "Testing1 ~ Testing 2 ~ Testing 3",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 10
          },
          {
            "id": 332,
            "description": "Checkbox space",
            "type": "CHECK_BOX",
            "lookupValue": "test1 ~ test2 ~ test3",
            "fieldLength": 300,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 11
          },
          {
            "id": 333,
            "description": "test",
            "type": "TEXT_AREA",
            "lookupValue": "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest",
            "fieldLength": 500,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": true,
            "fieldSequence": 12
          },
          {
            "id": 335,
            "description": "test 2 space",
            "type": "TEXT_AREA",
            "lookupValue": "this is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only contentthis is test only content",
            "fieldLength": 0,
            "isActive": false,
            "linkedFieldValue": null,
            "linkedFieldId": null,
            "isDisplayed": null,
            "isRequired": false,
            "fieldSequence": 13
          }
        ]
      }
    ],
    "isServicePageChecked": true
  };
    component.util.clientId=1;
    component.checkValid();
    fixture.detectChanges();
    expect(component.checkValid).toBeTruthy();
  });

  it('should call onSaveEventData() method',()=>{
    component.util.clientId=1;
    let fromSliderToggle=true;
    component.onSaveEventData(fromSliderToggle);
    fixture.detectChanges();
    expect(component.onSaveEventData).toBeTruthy();
  });

  it('should call onChangeSignUp() method if block',()=>{
    component.util.clientId=1;
    let value=true;
    component.onChangeSignUp(value);
    fixture.detectChanges();
    expect(component.onChangeSignUp).toBeTruthy();
  });

  it('should call onChangeSignUp() method else block',()=>{
    component.signUpModuleData.isSignUpEnabled=true;
    let value=true;
    component.onChangeSignUp(value);
    fixture.detectChanges();
    expect(component.onChangeSignUp).toBeTruthy();
  });

  it('should call checkEventSection() method else block',()=>{
    component.eventDetailData={
      "isChecked": true,
      "fieldDetails": [
        {
          "id": 266,
          "description": "Test event field",
          "type": "READ_ONLY",
          "lookupValue": "Blue\nRed\nYellow\nGreen",
          "fieldLength": 0,
          "isActive": true,
          "linkedFieldValue": null,
          "linkedFieldId": null,
          "isDisplayed": false,
          "isRequired": true,
          "fieldSequence": 1
        },
        {
          "id": 297,
          "description": "test linked field",
          "type": "DROP_DOWN",
          "lookupValue": "test1~test2~test3",
          "fieldLength": 0,
          "isActive": true,
          "linkedFieldValue": null,
          "linkedFieldId": null,
          "isDisplayed": false,
          "isRequired": true,
          "fieldSequence": 2
        },
        {
          "id": 298,
          "description": "test1 selected",
          "type": "RADIO_BUTTON",
          "lookupValue": "yes~no",
          "fieldLength": 0,
          "isActive": true,
          "linkedFieldValue": "test1",
          "linkedFieldId": 297,
          "isDisplayed": false,
          "isRequired": false,
          "fieldSequence": 3
        },
        {
          "id": 299,
          "description": "test1 yes selected",
          "type": "TEXT_BOX",
          "lookupValue": "",
          "fieldLength": 10,
          "isActive": true,
          "linkedFieldValue": "yes",
          "linkedFieldId": 298,
          "isDisplayed": false,
          "isRequired": false,
          "fieldSequence": 4
        },
        {
          "id": 340,
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin orci lorem, finibus imperdiet leo dignissim sed. In quis dolor consequat, ultricies mauris ac, dictum enim. Aenean volutpat sollicitudin enim eu iaculis. Suspendisse a tempus turpis. Curabitur tempor porta nunc a varius. Praese",
          "type": "READ_ONLY",
          "lookupValue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin orci lorem, finibus imperdiet leo dignissim sed. In quis dolor consequat, ultricies mauris ac, dictum enim. Aenean volutpat sollicitudin enim eu iaculis. Suspendisse a tempus turpis. Curabitur tempor porta nunc a varius. Praesent iaculis sem at orci placerat, vitae malesuada nibh scelerisque. In purus nulla, venenatis in aliquet hendrerit, vehicula vel leo. Aliquam posuere, nibh vitae hendrerit sollicitudin, lectus eros convallis augue, sit amet tincidunt diam velit maximus lectus. Nullam eget enim accumsan, imperdiet turpis vehicula, bibendum ante. Pellentesque mattis eros non risus tristique, ut sagittis dolor placerat. Aenean faucibus fermentum elementum.\n\nCurabitur vel dictum nisi. Morbi at pretium mauris. Sed tristique eros aliquet enim fringilla, nec vulputate elit maximus. Ut massa erat, sodales non blandit euismod, consequat in est. Maecenas posuere, felis eu tincidunt luctus, massa augue ultrices velit, at venenatis diam augue in diam. Mauris semper quam nec dictum lobortis. Nam in sapien lorem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a scelerisque nibh. Quisque luctus sed orci in semper. Aenean diam orci, rutrum sed ultrices eget, sollicitudin non augue. Ut eget massa quis neque congue egestas id ac arcu. Curabitur varius turpis eu orci luctus, quis vulputate purus sagittis. Pellentes",
          "fieldLength": 0,
          "isActive": false,
          "linkedFieldValue": null,
          "linkedFieldId": null,
          "isDisplayed": null,
          "isRequired": false,
          "fieldSequence": 5
        },
        {
          "id": 348,
          "description": "Email field test",
          "type": "EMAIL",
          "lookupValue": "",
          "fieldLength": 200,
          "isActive": true,
          "linkedFieldValue": null,
          "linkedFieldId": null,
          "isDisplayed": null,
          "isRequired": false,
          "fieldSequence": 6
        },
        {
          "id": 350,
          "description": "date field test",
          "type": "CUSTOM_DATE",
          "lookupValue": "",
          "fieldLength": 0,
          "isActive": true,
          "linkedFieldValue": null,
          "linkedFieldId": null,
          "isDisplayed": null,
          "isRequired": false,
          "fieldSequence": 7
        }
      ],
      "orderingType": 1
    };
    let $event=true;
    component.checkEventSection($event);
    fixture.detectChanges();
    expect(component.checkEventSection).toBeTruthy();
  });

  it('should call onOrderingSectionCheckboxChange() method if block',()=>{
    let isEventToggled=true,$event={checked:false},data={
      "isChecked": true,
      "fieldDetails": [
        {
          "id": 266,
          "description": "Test event field",
          "type": "READ_ONLY",
          "lookupValue": "Blue\nRed\nYellow\nGreen",
          "fieldLength": 0,
          "isActive": true,
          "linkedFieldValue": null,
          "linkedFieldId": null,
          "isDisplayed": false,
          "isRequired": true,
          "fieldSequence": 1
        },
        {
          "id": 297,
          "description": "test linked field",
          "type": "DROP_DOWN",
          "lookupValue": "test1~test2~test3",
          "fieldLength": 0,
          "isActive": true,
          "linkedFieldValue": null,
          "linkedFieldId": null,
          "isDisplayed": false,
          "isRequired": true,
          "fieldSequence": 2
        },
        {
          "id": 298,
          "description": "test1 selected",
          "type": "RADIO_BUTTON",
          "lookupValue": "yes~no",
          "fieldLength": 0,
          "isActive": true,
          "linkedFieldValue": "test1",
          "linkedFieldId": 297,
          "isDisplayed": false,
          "isRequired": false,
          "fieldSequence": 3
        },
        {
          "id": 299,
          "description": "test1 yes selected",
          "type": "TEXT_BOX",
          "lookupValue": "",
          "fieldLength": 10,
          "isActive": true,
          "linkedFieldValue": "yes",
          "linkedFieldId": 298,
          "isDisplayed": false,
          "isRequired": false,
          "fieldSequence": 4
        },
        {
          "id": 340,
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin orci lorem, finibus imperdiet leo dignissim sed. In quis dolor consequat, ultricies mauris ac, dictum enim. Aenean volutpat sollicitudin enim eu iaculis. Suspendisse a tempus turpis. Curabitur tempor porta nunc a varius. Praese",
          "type": "READ_ONLY",
          "lookupValue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin orci lorem, finibus imperdiet leo dignissim sed. In quis dolor consequat, ultricies mauris ac, dictum enim. Aenean volutpat sollicitudin enim eu iaculis. Suspendisse a tempus turpis. Curabitur tempor porta nunc a varius. Praesent iaculis sem at orci placerat, vitae malesuada nibh scelerisque. In purus nulla, venenatis in aliquet hendrerit, vehicula vel leo. Aliquam posuere, nibh vitae hendrerit sollicitudin, lectus eros convallis augue, sit amet tincidunt diam velit maximus lectus. Nullam eget enim accumsan, imperdiet turpis vehicula, bibendum ante. Pellentesque mattis eros non risus tristique, ut sagittis dolor placerat. Aenean faucibus fermentum elementum.\n\nCurabitur vel dictum nisi. Morbi at pretium mauris. Sed tristique eros aliquet enim fringilla, nec vulputate elit maximus. Ut massa erat, sodales non blandit euismod, consequat in est. Maecenas posuere, felis eu tincidunt luctus, massa augue ultrices velit, at venenatis diam augue in diam. Mauris semper quam nec dictum lobortis. Nam in sapien lorem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a scelerisque nibh. Quisque luctus sed orci in semper. Aenean diam orci, rutrum sed ultrices eget, sollicitudin non augue. Ut eget massa quis neque congue egestas id ac arcu. Curabitur varius turpis eu orci luctus, quis vulputate purus sagittis. Pellentes",
          "fieldLength": 0,
          "isActive": false,
          "linkedFieldValue": null,
          "linkedFieldId": null,
          "isDisplayed": null,
          "isRequired": false,
          "fieldSequence": 5
        },
        {
          "id": 348,
          "description": "Email field test",
          "type": "EMAIL",
          "lookupValue": "",
          "fieldLength": 200,
          "isActive": true,
          "linkedFieldValue": null,
          "linkedFieldId": null,
          "isDisplayed": null,
          "isRequired": false,
          "fieldSequence": 6
        },
        {
          "id": 350,
          "description": "date field test",
          "type": "CUSTOM_DATE",
          "lookupValue": "",
          "fieldLength": 0,
          "isActive": true,
          "linkedFieldValue": null,
          "linkedFieldId": null,
          "isDisplayed": null,
          "isRequired": false,
          "fieldSequence": 7
        }
      ],
      "orderingType": 1
    };
    component.onOrderingSectionCheckboxChange(isEventToggled,$event,data);
    fixture.detectChanges();
    expect(component.onOrderingSectionCheckboxChange).toBeTruthy();
  })

  it('should call onOrderingSectionCheckboxChange() method else block',()=>{
    let isEventToggled=false,$event={checked:false}
    component.onOrderingSectionCheckboxChange(isEventToggled,$event);
    fixture.detectChanges();
    expect(component.onOrderingSectionCheckboxChange).toBeTruthy();
  });

  it('should call performUncheck() method if block',()=>{
    let result=false,data={orderingType:1};
    component.performUncheck(result,data);
    fixture.detectChanges();
    expect(component.performUncheck).toBeTruthy();
  });

  it('should call performUncheck() method else block',()=>{
    let result=false,data=false;
    component.performUncheck(result,data);
    fixture.detectChanges();
    expect(component.performUncheck).toBeTruthy();
  });

  it('should call enableSubmit() method',()=>{
    let item={isActive:false};
    component.enableSubmit(item);
    fixture.detectChanges();
    expect(component.enableSubmit).toBeTruthy();
  });

  it('should call selectRow() method elseblock',()=>{
    component.servicePageData.selectRowIndex=0;
    let item={isActive:false},rowId=0;
    component.selectRow(rowId,item);
    fixture.detectChanges();
    expect(component.selectRow).toBeTruthy();
  });
});
