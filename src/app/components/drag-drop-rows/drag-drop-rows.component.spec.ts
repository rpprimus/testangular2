import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropRowsComponent } from './drag-drop-rows.component';
import { Util } from '../../shared/services/util';
import { mockUtil } from '../../../Test/mockUtil';

describe('DragDropRowsComponent', () => {
  let component: DragDropRowsComponent;
  let fixture: ComponentFixture<DragDropRowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragDropRowsComponent ],
      providers: [{provide:Util,useClass:mockUtil}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropRowsComponent);
    component = fixture.componentInstance;
    component.data={
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call moveUp() method', () => {
    let selectedRowIndex=1;
    component.moveUp(selectedRowIndex);
    fixture.detectChanges();
    expect(component.moveUp).toBeTruthy();
  });

  it('should call moveDown() method', () => {
    let selectedRowIndex=1;
    component.moveDown(selectedRowIndex);
    fixture.detectChanges();
    expect(component.moveDown).toBeTruthy();
  });
});
