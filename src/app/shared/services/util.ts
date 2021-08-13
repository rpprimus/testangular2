import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

declare var CKEDITOR;

export class Util {
  accessToken: string = "";
  isLoggedIn = new BehaviorSubject<boolean>(false);
  //baseUrl: string = "http://uatapi.sparkslink.com/SparksLink/"; // 'http://34.231.126.17:8080/SparksLink/'
  userInfo = new BehaviorSubject<any>({});  //display user name in header
  isClone: boolean = false;
  clientId: number = 0;
  isClientCreated = new BehaviorSubject<boolean>(false);
  isStore: boolean = false;
  canCreateStore = new BehaviorSubject<any>(false);
  storeCreated = new BehaviorSubject<any>(false);
  currentPageLink: string;
  moduleStandardFields: any; // load from static JSON file
  backgroundOverlay = new BehaviorSubject<boolean>(false);
  isUpdateInventory = new BehaviorSubject<boolean>(false);
  isLandingPage = new BehaviorSubject<boolean>(false);
  hideLoader: boolean = false; // in case when need to hide loader mark this property as TRUE
  disableSaveBtnOnOrder: boolean = true; //save button on manage order detail page

  isServiceDirty: boolean = false; //enable submit in case of form dirty in ordering modules
  isEventDirty: boolean = false; //enable submit in case of form dirty in ordering modules
  isShipmentDirty: boolean = false; //enable submit in case of form dirty in ordering modules
  isPickupDirty: boolean = false; //enable submit in case of form dirty in ordering modules
  isAdditionalDirty: boolean = false; //enable submit in case of form dirty in ordering modules

  isSameAsEventOnShipment: boolean = false; //this is for checkbox which ensures pickup detail is same as shipment
  isSameAsEventOnPickup: boolean = false; //this is for checkbox which ensures pickup detail is same as shipment
  
  baseUrl = new BehaviorSubject<any>("");
  http = new BehaviorSubject<any>("");
  www = new BehaviorSubject<any>("");
  existingPortal = new BehaviorSubject<any>("");
  feedbackLink = new BehaviorSubject<any>("");
  socketChannel = new BehaviorSubject<any>("");
  socketServerUrl = new BehaviorSubject<any>("");
  
  get baseURL() {
    return this.baseUrl.asObservable();
  }

  private notify = new Subject<any>();
  notifyObservable$ = this.notify.asObservable();

  public notifyChild(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }
  /**
   * url - this is base URL
   * urlParams - object of params 
   * Append pathVariable in URL path & then rest of params 
   */
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

  mergeObject() {
    (<any>Object).extend = function (destination, source) {
      for (var property in source) {
        if (source.hasOwnProperty(property)) {
          destination[property] = source[property];
        }
      }
      return destination;
    };
  }

  /**
 * Marks all controls in a form group as touched
 * @param formGroup - The group to which error has to be shown
 */
  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  //   markFormGroupPristine(form: FormGroup): void {
  //     (<any>Object).keys(form.controls).forEach(control => {
  //         form.controls[control].markAsPristine();

  //         if (control.controls) {
  //           this.markFormGroupPristine(control);
  //         }
  //     });
  // }

  ckEditorBaseConfigTitle = {
    uiColor: '#f0f0f0',
    maxCharCount: 200,
    removeButtons: 'Source,Save,NewPage,DocProps,Preview,Print,Templates,document,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,RemoveFormat,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Link,Unlink,Anchor,CreatePlaceholder,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,InsertPre,Styles,Format,Font,FontSize,BGColor,Maximize,ShowBlocks,oembed,MediaEmbed,About,button1,button2,button3,Language,Strike',
    disableNativeSpellChecker: false,
    removePlugins: 'elementspath',
    extraPlugins: 'divarea',
    colorButton_foreStyle: {
      element: 'font',
      attributes: { 'color': '#(color)' }
    }
  };

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
  // return param value
  getRequestedParam(url: string, paramName: string): any {
    let url1 = new URL(url);
    return url1.searchParams ? url1.searchParams.get(paramName) : false;
  }

  // download documents files
  downloadFile(response) {
    let header_content = response.headers.get('content-disposition');
    if (header_content) {
      let file = header_content.split('=')[1];
      file = file.substring(1, file.length - 1);
      let extension = file.split('.')[1].toLowerCase();
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      var newBlob = new Blob([response.body], { type: this.createFileType(extension) })

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }

      // For other browsers: 
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);
      var link = document.createElement('a');
      document.body.appendChild(link);
      link.href = data;
      link.download = file;
      link.click();
      window.URL.revokeObjectURL(data);
      // setTimeout(() => {
      //   // For Firefox it is necessary to delay revoking the ObjectURL
      //   window.URL.revokeObjectURL(data);
      // }, 400)
    }
  }

  createFileType(e): string {
    let fileType: string = "";
    if (e == 'pdf' || e == 'csv') {
      fileType = `application/${e}`;
    }
    else if (e == 'jpeg' || e == 'jpg' || e == 'png' || e == 'tif' || e == 'bmp' || e == 'tiff') {
      fileType = `image/${e}`;
    }
    else if (e == 'txt') {
      fileType = 'text/plain';
    }

    else if (e == 'ppt' || e == 'pot' || e == 'pps' || e == 'ppa') {
      fileType = 'application/vnd.ms-powerpoint';
    }
    else if (e == 'pptx') {
      fileType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    }
    else if (e == 'doc' || e == 'dot') {
      fileType = 'application/msword';
    }
    else if (e == 'docx') {
      fileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }
    else if (e == 'xls' || e == 'xlt' || e == 'xla') {
      fileType = 'application/vnd.ms-excel';
    }
    else if (e == 'xlsx') {
      fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    }

    return fileType;
  }

  /**
   * 
   * @param fileName - file Name
   * @param type  - values is files or "" (here "" means images)
   */
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

  /**
* @param event - files
@param isCustomUpload: OPTIONAL - will give value true if custom file upload and maximum size is 30mb
*/
  checkSizeValidation(event,isCustomUpload?): boolean {
    let valid = true;
    var sizeinbytes = event.size;
    if(isCustomUpload){
      valid = sizeinbytes > 5242880 ? false : true;
    }else{
      valid = sizeinbytes > 31457280 ? false : true;
    }
    return valid;
  }

  // pass object & it will return all values with trim.
  trimParamValues(params: any) {
    let keys = Object.keys(params);
    keys.forEach(element => {
      if (params[element] && !Number.isInteger(params[element])) {
        params[element] = params[element].toString().trim();
      }
    });
    return params;
  }

  /** Format the date to the format of MM-DD-YYYY to send it to backend */
  formatDate(value) {
    let curr_date = value.getDate() < 10 ? '0' + value.getDate() : value.getDate();
    let mon = value.getMonth() + 1; //Months are zero based
    let curr_month = mon < 10 ? '0' + mon : mon;
    let curr_year = value.getFullYear();
    let modifiedDate = curr_month + '-' + curr_date + '-' + curr_year;
    return modifiedDate;
  }

  //this method is used because of the Firefox and chrome issue of date i.e. it doesnot parse the date of type '12-12-2018'
  displayFormattedDate(value) {
    let date = value.split('-');
    let year = Number(date[2]);
    let day = Number(date[1]);
    let month = Number(date[0]) - 1;
    let date1 = new Date(year, month, day);
    return date1;
  }

  // To covert the Utc time to local time
  convertUTCDateToLocalDate(date) {
    if (date) {
      let date1;
      if (date.indexOf('-') > -1) {
        date1 = this.splitdate(date);
      }
      else {
        date1 = new Date(date);
      }
      let time = date1.getTime();
      let offset = date1.getTimezoneOffset() * 60 * 1000;

      let newDate = new Date(time - offset);
      return newDate;
    }
  }


  //This is done to avoid the error of 1 hour lag in IST timezone and it returns the date with local timezone
  splitdate(date) {
    if (date) {
      let splittedDate = date.split('-');
      let year = Number(splittedDate[0]);
      let month = Number(splittedDate[1]) - 1;
      let splittedTime = splittedDate[2].split(':');
      let h = Number(splittedTime[0].split(' ')[1]);
      let day = Number(splittedTime[0].split(' ')[0]);
      let m = Number(splittedTime[1]);
      let s = Number(splittedTime[2].split(' ')[0]);
      let date1 = new Date(year, month, day, h, m, s);
      return date1;
    }
  }

  /**Validate whether only trail of spaces is entered 
   * or entered characters are more than max character count
   * in above cases return valid is false
    */
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
            required ? fn(false, 'required') : fn(true);
      });
    }
  }

  validateCkEditorOnDemand(required, charLength, fn?) {
    //getSnapshot() retrieves the "raw" HTML, without tabs, linebreaks etc

    if (CKEDITOR.instances) {
      let instances = (<any>CKEDITOR).instances;
      let keys: any = Object.keys(instances);
      keys.forEach(i => {

        let max = charLength ? charLength : i.config.maxCharCount;
        i = instances[i];
        let html = i.getSnapshot();
        let dom = document.createElement("DIV");
        dom.innerHTML = html;
        let plain_text = (dom.textContent || dom.innerText);
        return plain_text.trim() ? plain_text.length <= max ? fn(true) : fn(false, 'count') :
          plain_text.length > 1 && plain_text.trim().length == 0 ?
            required ? fn(false, 'space') : fn(true) :
            required ? fn(false, 'required') : fn(true);
      });
    }
  }

  checkImageType(width, height) {
    if (width == height) {
      return 'img-square';
    }
    else if (width > height) {
      return 'img-rectangle';
    }
    else {
      return 'img-vertical';
    }
  }

  /**
  * This method is used to check the extension of file uploaded for excel upload
  * @param fileName - file Name
  */
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

  /**
     * For reseting certain fields of form
     * @param formGroup form 
     * @param keys array of keys to be reset
     */
    resetFormKeys(formGroup, keys) {
      keys.forEach(item => {
          formGroup.controls[item].setValue(null);
          formGroup.controls[item].markAsUntouched();
      })
  }

    /**
 * Marks all controls in a form group as disable
 * @param formGroup - The group to which property disabled has to be shown
 */
markFormControlDisable(formGroup: FormGroup) {
  (<any>Object).values(formGroup.controls).forEach(control => {
    control.disable();
    if (control.controls) {
      this.markFormControlDisable(control);
    }
  });
}


}
