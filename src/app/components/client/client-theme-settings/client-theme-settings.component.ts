import { Component, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ClientService } from '../client.service';
import { SharedService } from '../../../shared/services/shared.service';
import { Util } from '../../../shared/services/util';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { AppUrl } from '../../../shared/config/app-url.enum';
import { Enum } from '../../../shared/config/enum.enum';
import { HttpClientService } from '../../../shared/services/http-client.service';

declare var CKEDITOR;

@Component({
  selector: 'app-client-theme-settings',
  templateUrl: './client-theme-settings.component.html',
  styleUrls: ['./client-theme-settings.component.scss']
})

export class ClientThemeSettingsComponent {
  isCropped: boolean = false;
  isFormSubmitted: boolean = false;  //if form is submitted once then no action to perform on save button
  target: any = '';
  colorItems: any = [
    { text: 'Header', target: 'headerColorCode' },
    { text: 'Body Text', target: 'bodyTextColorCode' },
    { text: 'Action Button', target: 'actionButtonColorCode' }
  ]
  data: any = {};
  temp: any = {}; // temp variable to save selected Color
  isImage: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  sliderValue: number = 0;
  filename: string = '';
  fileErrorMessage: string = "";
  headerText: string = "";
  footerText: string = "";
  headerError: string = '';
  footerError: string = '';
  isPencil: boolean = false; //to show the pencil icon on image
  helpResourceArr = [];
  canCreate: boolean = false;
  //loaderCheck: boolean = false;

  constructor(private ref:ChangeDetectorRef,private clientService: ClientService, private http: HttpClientService,
    private sharedService: SharedService, private elementRef: ElementRef, public util: Util) {
    this.temp = {
      headerColorCode: '#1C57B7',
      bodyTextColorCode: '#616167',
      actionButtonColorCode: '#D11E47',
      logo: ''
    }
  }

  getColor(color: any) {
    this.temp[this.target] = color;
    this.data = this.temp;
  }
  onCustomizeColorClick($event) {
    this.target = $event.target.id;
    this.isPencil = true;
  }

  ngOnInit() {
    if (this.util.clientId > 0) {
      this.getThemeSettings();
      this.getHelpNResouces();
    }
  }

  getThemeSettings() {
    let param = {
      pathVariable: this.util.clientId
    }
    this.clientService.getThemeSettings(param).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        if (response.response.theme != null) {
          let colorCodes = response.response.theme;
          this.temp['actionButtonColorCode'] = colorCodes.actionButtonColorCode;
          this.temp['bodyTextColorCode'] = colorCodes.bodyTextColorCode;
          this.temp['headerColorCode'] = colorCodes.headerColorCode;
          this.data = this.temp;
          this.headerText = colorCodes.header == null ? '' : colorCodes.header;
          this.footerText = colorCodes.footer == null ? '' : colorCodes.footer;
          this.canCreate = true;
          this.util.canCreateStore.next(true);
          this.clientService.downloadLogo(param).subscribe(resp => {
            this.sharedService.onSuccess(resp, null, () => {
              if (resp.response) {
                this.isCropped = true;
                this.filename = resp.response.fileName;
                let fileExtension = this.filename.split('.').pop();
                this.croppedImage = "data:image/" + fileExtension + ";base64," + resp.response.file;
                this.data.logo = this.temp.logo = this.croppedImage;
              }
            });
          });
        } else {
          this.canCreate = false;
          this.util.canCreateStore.next(false);
          this.temp = {
            headerColorCode: '#1C57B7',
            bodyTextColorCode: '#616167',
            actionButtonColorCode: '#D11E47',
            logo: ''
          }
        }
      });
    });
  }

  /**
   * To select the color for header, body and action button from the color palette
   * @param color : color code in hex
   * @param target : target value for which the color is selected
   */
  colorPickerColorChanged(color, target) {
    if (target) {
      this.temp[target] = color;
      this.data = this.temp;
    }
  }

  onImageReset() {
    this.isImage = false;
    this.isCropped = false;
    this.data = {};
    this.temp = {};
    this.target = '';
    this.croppedImage = '';
    this.fileErrorMessage = '';
  }

  crop() {
    this.isCropped = true;
    this.isImage = false;
    this.temp['logo'] = this.croppedImage;
    this.data = this.temp;
  }



  fileChangeEvent(event: any, type?): void {
    if (type == Enum.OtherResources) {
      let files = event.target.files && event.target.files[0] ? event.target.files[0] : '';
      if (!this.util.checkExtension(files.name, 'files')) {
        this.sharedService.openToast('e', AppMessage.U0147);
      } else if (!this.util.checkSizeValidation(files)) {
        this.sharedService.openToast('e', AppMessage.U0150);
      } else {
        this.onUpload(files.name, event.target.files[0]);
      }
    } else {
      this.filename = event.target.files && event.target.files[0] ? event.target.files[0].name : '';
      if (this.util.checkExtension(this.filename.split('.')[1])) {
        this.imageChangedEvent = event;
        this.isImage = true;
        setTimeout(() => {
          let myImg = this.elementRef.nativeElement.querySelector('#img');
          myImg = myImg.firstChild.firstElementChild;
          if (myImg.clientHeight < 40) {
            this.fileErrorMessage = AppMessage.U0018;
            return;
          }
          this.sliderValue = myImg.clientHeight;
        }, 200);
      } else {
        this.fileErrorMessage = AppMessage.U0017;
      }
    }
  }

  imageCropped(image: string) {
    this.croppedImage = image;
  }

  onSliderChange($event) {
    let myImg = this.elementRef.nativeElement.querySelector('#img');
    if (myImg.firstChild)
      myImg = myImg.firstChild.firstElementChild;
    myImg.style.height = $event.value + "px";
  }

  uploadFile() {
    //this.util.hideLoader = true;
    //this.loaderCheck = true;
    var imageURL = this.croppedImage;
    if (!imageURL) {
      this.fileErrorMessage = AppMessage.U0022;
      return;
    }
    else if (!this.validateCkEditor()) { //validate the character count and space trial in ckeditor
      return;
    }
    else if (this.headerError || this.footerError) {
      return;
    }
    else {
      if (!this.isFormSubmitted) {
        // Split the base64 string in data and contentType
        var block = imageURL.split(";");
        // Get the content type of the image
        var contentType = block[0].split(":")[1];// Like "image/gif"
        // get the real base64 content of the file
        var realData = block[1].split(",")[1];

        // Convert it to a blob to upload
        var blob = this.b64toBlob(realData, contentType);

        let param: any = {
          pathVariable: this.util.clientId
        }
        this.setColorCodes();
        const uploadData = new FormData();
        uploadData.append('actionButtonColorCode', this.temp['actionButtonColorCode']);
        uploadData.append('bodyTextColorCode', this.temp['bodyTextColorCode']);
        uploadData.append('headerColorCode', this.temp['headerColorCode']);
        uploadData.append('fileName', this.filename);
        uploadData.append('headerTxt', this.headerText);
        uploadData.append('footerTxt', this.footerText);
        uploadData.append('file', blob);
        this.isFormSubmitted = true;
        this.clientService.uploadThemeSettings(uploadData, param).subscribe(response => {
          this.isFormSubmitted = false;
          this.sharedService.onSuccess(response, 'U0020', () => {
            
            if (response.response && response.response.id) {
              this.getThemeSettings();
              this.crop();
              this.canCreate = true;
              this.util.canCreateStore.next(true);
            }
          });
        }, error => { this.sharedService.onError(error) });
      }
    }
  }

  onUpload(fileName, file) {
    // this.util.hideLoader = true;
    // this.loaderCheck = true;
    const uploadData = new FormData();
    uploadData.append('id', '0');
    uploadData.append('clientId', this.util.clientId.toString());
    uploadData.append('resourceName', fileName);
    uploadData.append('file', file);

    this.http.upload(AppUrl.helpNResource, uploadData).subscribe(response => {
      //this.resetInputTypeFile();
      this.sharedService.onSuccess(response, 'U0062', (value) => {
       // setTimeout(() => {
          if (value) {
            this.helpResourceArr.push({ fileName: file.name, resourceId: response.response.id });
            this.ref.detectChanges();
          }
        //  this.loaderCheck = false;
       // }, 100);
      });
    }, error => this.sharedService.onError(error));
  }

  /**
  * Convert a base64 string in a Blob according to the data and contentType.
  * 
  * @param b64Data {String} Pure base64 string without contentType
  * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
  * @param sliceSize {Int} SliceSize to process the byteCharacters
  * @return Blob
  */
  b64toBlob(b64Data, contentType, sliceSize?) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  /**Validate whether only trail of spaces is entered 
   * or entered characters are more than max character count
   * in above cases return valid is false
    */
  validateCkEditor() {
    this.headerError = '';
    this.footerError = '';
    //getSnapshot() retrieves the "raw" HTML, without tabs, linebreaks etc
    let valid = false;
    if (CKEDITOR.instances) {
      let instances = (<any>CKEDITOR).instances;
      let keys: any = Object.keys(instances);
      for (let i = 0; i < keys.length; i++) {
        keys[i] = instances[keys[i]];
        let html = keys[i].getSnapshot();
        let dom = document.createElement("DIV");
        dom.innerHTML = html;
        let plain_text = (dom.textContent || dom.innerText);
        if (plain_text.trim()) {
          if (plain_text.length <= keys[i].config.maxCharCount) {
            valid = true;
          }
          else {
            valid = false;
            i == 0 ? this.headerError = AppMessage.U0139 : this.footerError = AppMessage.U0139;
          }
        }
        else {
          if (plain_text.length > 1 && plain_text.trim().length == 0) {  //to restrict the space trial validation and by default plaintext has 1 length
            valid = false;
            i == 0 ? this.headerError = AppMessage.U0054 : this.footerError = AppMessage.U0054;
          } else {
            valid = true;
          }
        }
      }
    }
    return valid;
  }

  //set the default color values before submitting
  setColorCodes() {
    if (!this.temp.actionButtonColorCode || this.temp.actionButtonColorCode == "undefined") {
      this.temp = {
        headerColorCode: '#1C57B7',
        bodyTextColorCode: '#616167',
        actionButtonColorCode: '#D11E47'
      }
    }
  }




  //////section for help and resouce files

  renameAction(item) {
    item.isRename = true;
    if (item.fileName)
      item.newFileName = item.fileName.substring(0, item.fileName.lastIndexOf('.'));
  }

  renameFile(item, index) {
    if (!item.newFileName || item.newFileName.trim() == "") {
      return;
    }
    let newFileName = item.newFileName + item.fileName.substring(item.fileName.lastIndexOf('.'), item.fileName.length);
    let param = {
      clientId: this.util.clientId,
      id: item.resourceId,
      resourceName: newFileName
    }
    this.http.put(AppUrl.helpNResource, param).subscribe((response: any) => {
      this.sharedService.onSuccess(response, 'U0064', (value) => {
        if (value) {
          this.helpResourceArr[index].fileName = newFileName;
          item.isRename = false;
        }
      });
    }, error => this.sharedService.onError(error));
  }

  downloadFile(id) {
    let param = {
      pathVariable: id
    }
    this.http.getFiles(AppUrl.helpNResource, param).subscribe((response: any) => {
      this.util.downloadFile(response);
    }, error => this.sharedService.onError(error));
  }

  /**
   * 
   * @param resourceId
   * @param index - select resource index
   * @param type  - image or otherResource
   */
  deleteFile(resourceId: number, index: number) {
    let params = {
      resouceId: resourceId
    }
    this.clientService.deleteHelpResource(params).subscribe(response => {
      this.sharedService.onSuccess(response, 'U0063', (value) => {
        if (value) {
          this.helpResourceArr.splice(index, 1); // removed object from array
        }
      });
    }, error => this.sharedService.onError(error));
  }

  getHelpNResouces() {
    let param = {
      clientId: this.util.clientId
    }
    this.http.get(AppUrl.helpNResource, param).subscribe((response: any) => {
      this.sharedService.onSuccess(response, null, (value) => {
        if (value) {
          response.response.forEach(ele => {
            this.helpResourceArr.push({ fileName: ele.resourceName, resourceId: ele.id });
          });
        }
      });
    }, error => this.sharedService.onError(error));
  }

}




