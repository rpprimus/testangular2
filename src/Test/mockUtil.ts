import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';

declare var CKEDITOR;
@Injectable()

export class mockUtil {
  //notify: any;

  constructor() { }
  private notify = new Subject<any>();
  notifyObservable$ = this.notify.asObservable();
  isClone: boolean = true;
  isStore:boolean = false;
  isClientCreated = new BehaviorSubject<boolean>(false);
  isLoggedIn = new BehaviorSubject<boolean>(false);
  userInfo = new BehaviorSubject<any>({});  //display user name in header
  feedbackLink = new BehaviorSubject<any>("");
  canCreateStore = new BehaviorSubject<any>(false);
  storeCreated = new BehaviorSubject<any>(false);
  isSameAsEventOnShipment:boolean=true;
  isSameAsEventOnPickup:boolean=true;
  baseUrl = new BehaviorSubject<any>("");
  backgroundOverlay = new BehaviorSubject<boolean>(false);
  isLandingPage = new BehaviorSubject<boolean>(false);
  hideLoader: boolean = false;
  moduleStandardFields: any = [
    {
      fieldDetails: [
        {
          id: -1,
          description: "Event Name",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 500,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "title",
          isReadOnly: true,
          value: "test"
        },

        {
          id: -2,
          description: "Event Venue",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 500,
          isActive: true,
          isRequired: false,
          fieldSequence: 0,
          dbPropertyName: "venue"
        }, {

          id: -3,
          description: "Event Address 1",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 500,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "addressOne",
          value: "test"
        },
        {
          id: -4,
          description: "Event Address 2",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 500,
          isActive: true,
          isRequired: false,
          fieldSequence: 0,
          dbPropertyName: "addressTwo"
        },
        {
          id: -5,
          description: "Event Country",
          type: "REMOTE_DROP_DOWN",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "countryId",
          bindProperty: "countryList",
          childFieldId: -6,
          value: 231,
          countryName: "United States"
        },
        {
          id: -6,
          description: "Event State",
          type: "REMOTE_DROP_DOWN",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "stateId",
          parentFieldId: -5,
          dataLoadAPI: "getStates",
          value: "test"
        },
        {
          id: -7,
          description: "Event City",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 100,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "city",
          value: "test"
        },
        {
          id: -8,
          description: "Zip",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 10,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "eventZip",
          value: "test"
        },
        {
          id: -9,
          description: "Event Start Date",
          type: "DATE_FIELD",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "start",
          isReadOnly: true,
          value: "test"
        },
        {
          id: -10,
          description: "Event End Date",
          type: "DATE_FIELD",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "end",
          isReadOnly: true,
          value: "test"
        }
      ]
    },
    {
      fieldDetails: [
        {
          id: -1,
          description: "Name",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 200,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "name",
          dataLoadAPI: "getStates",
          value: "test"
        },
        {
          id: -2,
          description: "Location",
          type: "DROP_DOWN",
          lookupValue: "Home~Office~Convention Center~Hotel~Advance Warehouse",
          fieldLength: 500,
          isActive: true,
          isRequired: false,
          fieldSequence: 0,
          dbPropertyName: "eventVenue"
        },
        {
          id: -3,
          description: "Address 1",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 500,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "addressOne",
          value: "test"
        },
        {
          id: -4,
          description: "Address 2",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 500,
          isActive: true,
          isRequired: false,
          fieldSequence: 0,
          dbPropertyName: "addressTwo"
        },

        {
          id: -5,
          description: "Country",
          type: "REMOTE_DROP_DOWN",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "countryId",
          bindProperty: "countryList",
          childFieldId: -6,
          value: 231,
          countryName: "United States"
        },
        {
          id: -6,
          description: "State",
          type: "REMOTE_DROP_DOWN",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "stateId",
          parentFieldId: -5,
          dataLoadAPI: "getStates",
          value: "test"
        },
        {
          id: -7,
          description: "City",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 100,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "city",
          value: "test"
        },
        {
          id: -8,
          description: "Zip",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 10,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "zip",
          value: "test"
        },
        {
          id: -9,
          description: "Arrival Date",
          type: "DATE_FIELD",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "arrivalDate",
          value: "test"
        },
        {
          id: -10,
          description: "Arrival Time",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: false,
          fieldSequence: 0,
          dbPropertyName: "arrivalTime"
        }
      ]
    },
    {
      fieldDetails: [
        {
          id: -1,
          description: "Name",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 200,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "name",
          value: "test"
        },
        {
          id: -2,
          description: "Location",
          type: "DROP_DOWN",
          lookupValue: "Home~Office~Convention Center~Hotel~Advance Warehouse",
          fieldLength: 500,
          isActive: true,
          isRequired: false,
          fieldSequence: 0,
          dbPropertyName: "eventVenue"
        },
        {
          id: -3,
          description: "Address 1",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 500,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "addressOne",
          value: "test"
        },
        {
          id: -4,
          description: "Address 2",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 500,
          isActive: true,
          isRequired: false,
          fieldSequence: 0,
          dbPropertyName: "addressTwo"
        },
        {
          id: -5,
          description: "Country",
          type: "REMOTE_DROP_DOWN",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "countryId",
          bindProperty: "countryList",
          childFieldId: -6,
          value: 231,
          countryName: "United States"
        },
        {
          id: -6,
          description: "State",
          type: "REMOTE_DROP_DOWN",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "stateId",
          parentFieldId: -5,
          dataLoadAPI: "getStates",
          value: "test"
        },
        {
          id: -7,
          description: "City",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 100,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "city",
          value: "test"
        },
        {
          id: -8,
          description: "Zip",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: true,
          fieldSequence: 10,
          dbPropertyName: "zip",
          value: "test"
        },
        {
          id: -9,
          description: "Pick Up Date",
          type: "DATE_FIELD",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: true,
          fieldSequence: 0,
          dbPropertyName: "pickupDate",
          value: "test"
        },
        {
          id: -10,
          description: "Pick Up Time",
          type: "TEXT_BOX",
          lookupValue: "",
          fieldLength: 0,
          isActive: true,
          isRequired: false,
          fieldSequence: 0,
          dbPropertyName: "pickupTime"
        }
      ]
    }
  ];
  isUpdateInventory = new BehaviorSubject<boolean>(false);
  ckEditorBaseConfigDescription = {
    uiColor: '#f0f0f0',
    maxCharCount: 2000,
    removeButtons: 'Source,Save,NewPage,DocProps,Preview,Print,Templates,document,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,RemoveFormat,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Link,Unlink,Anchor,CreatePlaceholder,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,InsertPre,Styles,Format,Font,FontSize,BGColor,Maximize,ShowBlocks,oembed,MediaEmbed,About,button1,button2,button3,Language,Strike',
    disableNativeSpellChecker: false,
    removePlugins: 'elementspath',
    extraPlugins: 'divarea',
    colorButton_foreStyle: {
      element: 'font',
      attributes: { 'color': '#(color)' }
    }
  };
  ckEditorConfigWithHyperlink = {
    uiColor: '#f0f0f0',
    maxCharCount: 750,
    removeButtons: 'Source,Save,NewPage,DocProps,Preview,Print,Templates,document,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,RemoveFormat,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Anchor,CreatePlaceholder,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,InsertPre,Styles,Format,Font,FontSize,BGColor,Maximize,ShowBlocks,oembed,MediaEmbed,About,button1,button2,button3,Language,Strike',
    disableNativeSpellChecker: false,
    removePlugins: 'elementspath',
    extraPlugins: 'divarea',
    colorButton_foreStyle: {
      element: 'font',
      attributes: { 'color': '#(color)' }
    },
  };

  downloadFile(param:any): Observable<any>{
      return of(true);
  }
  notifyChild(data:any){
}
checkImageType(data:any){
}
formatDate(value) {
  let curr_date = value.getDate() < 10 ? '0' + value.getDate() : value.getDate();
  let mon = value.getMonth() + 1; //Months are zero based
  let curr_month = mon < 10 ? '0' + mon : mon;
  let curr_year = value.getFullYear();
  let modifiedDate = curr_month + '-' + curr_date + '-' + curr_year;
  return modifiedDate;
}

validateCkEditor(required, fn?) {
  //getSnapshot() retrieves the "raw" HTML, without tabs, linebreaks etc
  if (CKEDITOR.instances) {
    let instances = (<any>CKEDITOR).instances;
    let keys: any = Object.keys(instances);
    keys.forEach(i => {
      i = instances[i];
      let html = i.getSnapshot();
      let dom = document.createElement("DIV");
      dom.innerHTML = html;
      let plain_text = (dom.textContent || dom.innerText);
      return plain_text.trim() ? plain_text.length <= i.config.maxCharCount ? fn(true) : fn(false, 'count') :
        plain_text.length > 1 && plain_text.trim().length == 0 ?
          required ? fn(false, 'space') : fn(true) :
          required ? fn(true, 'required') : fn(true);
    });
  }
}

attachParams(url, urlParams) {
  if (urlParams) {
    if (urlParams.pathVariable) {
      url += "/" + urlParams.pathVariable;
    }
    let keys = Object.keys(urlParams);
    url += "?";
    keys.forEach(element => {
      if (element != 'pathVariable')
        url += `${element}=${urlParams[element]}&`;
    });
    url = url.substring(0, url.length - 1);
  }
  return url;
}

mergeObject(){
  return true;
}

markFormGroupTouched(formGroup: FormGroup) {
  (<any>Object).values(formGroup.controls).forEach(control => {
    control.markAsTouched();

    if (control.controls) {
      this.markFormGroupTouched(control);
    }
  });
}

checkXLSExtension(fileName: string): boolean {
  let isValid = true;
  let array = fileName.split('.');
  let fileExtension = array[array.length - 1];
  var allowedExtension = ['XLSX'];
  if (allowedExtension.indexOf(fileExtension.toUpperCase()) == -1) {
    isValid = false;
  }
  return isValid;
}
checkExtension(fileName: string, type: string = ''): boolean {
  let valid = true;
  let arr = fileName.split('.');
  let ext = arr[arr.length - 1];
  var allowedExtensions = type ? ['DOC', 'DOCX', 'PDF', 'XLS', 'XLSX', 'CSV', 'PPT', 'PNG', 'JPG', 'JPEG', 'BMP', 'TIF', 'TIFF'] : ['PNG', 'JPG', 'JPEG', 'BMP', 'TIF', 'TIFF'];
  if (allowedExtensions.indexOf(ext.toUpperCase()) == -1) {
    valid = false;
  }
  return valid;
}
checkSizeValidation(event): boolean {
  let valid = true;
  var sizeinbytes = event.size;
  valid = sizeinbytes > 31457280 ? false : true;
  return valid;
}

displayFormattedDate(value) {
  let date = value.split('-');
  let year = Number(date[2]);
  let day = Number(date[1]);
  let month = Number(date[0]) - 1;
  let date1 = new Date(year, month, day);
  if(value=="12-14-2018"){
  return value;
  }
  else{
  return date1;
  }
}

}