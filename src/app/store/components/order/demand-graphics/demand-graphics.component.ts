import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Util } from './../../../../shared/services/util';
import { Common } from './../../../../store/utility/common';
import { AppMessage } from './../../../../shared/config/app-message.enum';
import { SharedService } from './../../../../shared/services/shared.service';
import { AppUrl } from './../../../../shared/config/app-url.enum';
import { HttpClientService } from './../../../../shared/services/http-client.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-demand-graphics',
  templateUrl: './demand-graphics.component.html',
  styleUrls: ['./demand-graphics.component.scss']
})
export class DemandGraphicsComponent implements OnInit {

  defaultImageSrc: string = "./assets/images/frame-landscape-placeholder.svg";
  description: string = "";
  uploadedDemandGraphic: any = {};
  descriptionError: boolean = false;
  appMessage = AppMessage;

  constructor(private http: HttpClientService, private sharedService: SharedService, private common: Common, private elementRef: ElementRef,
    public dialogRef: MatDialogRef<DemandGraphicsComponent>, public _domSanitizationService: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any, public util: Util) {
    dialogRef.disableClose = true;   //to disable click outside of angular material dialog area to close the dialog
  }

  ngOnInit() {
    this.util.ckEditorBaseConfigDescription.maxCharCount = this.data.item.textGraphicCount;
    if (this.data.item.onDemandTextGraphic) {
      this.description = this.data.item.onDemandTextGraphic;
    }
    if (this.data.item.filePath) {
      this.uploadedDemandGraphic.fileName = this.data.item.fileName;
      this.uploadedDemandGraphic.filePath = this.data.item.filePath;
    }
  }

  //While editing on review order,no need to remove product from cart when cross btn is clicked
  close() {
    if (!this.data.isEdit) {
      this.common.closeAssociateAndOnDemandPopup(this.data);
    }
    this.dialogRef.close();
  }

  submitOndemandText() {
    this.util.validateCkEditor(true, (value, msg) => {  //validate the character count and space trial in ckeditor
      if(this.data.item.textGraphicCount){
        this.descriptionError = !value;
      }
        
    });
    if(this.descriptionError) {
      // this.sharedService.openDialog('e', AppMessage.U0177);
      return;
    }
    let result = {
      description: this.description,
      isType: 'text'
    }
    this.dialogRef.close(result);
  }
  

  submitOndemandFile() {
    let result1 = {
      fileName: this.uploadedDemandGraphic.fileName,
      filePath: this.uploadedDemandGraphic.filePath,
      isType: 'file'
    }
    this.dialogRef.close(result1);
  }

  graphicUploadEvent(event: any): void {
    let file = event.target.files && event.target.files[0] ? event.target.files[0] : '';
    if (!this.util.checkExtension(file.name, '')) {
      this.sharedService.openToast('e', AppMessage.U0147);
    } else if (!this.util.checkSizeValidation(file)) {
      this.sharedService.openToast('e', AppMessage.U0150);
    } else {
      this.onUploadGraphic(event.target.files[0]);
    }
  }

  onUploadGraphic(file) {
    const uploadData = new FormData();
    uploadData.append('file', file);
    this.http.upload(AppUrl.onDemandGraphic, uploadData).subscribe(
      response => {
        this.sharedService.onSuccess(response, 'U0058',
          (value) => {
            if (value) {
              this.uploadedDemandGraphic = { fileName: response.response.fileName, filePath: response.response.filePath };
              this.displayUploadedImg(file);
            }
          });
      }, error => this.sharedService.onError(error));
  }

  displayUploadedImg(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file); // read file as data url
    reader.onload = (event: any) => { // called once readAsDataURL is completed
      this.uploadedDemandGraphic["imageUrl"] = event.target.result;
    }
  }


}
