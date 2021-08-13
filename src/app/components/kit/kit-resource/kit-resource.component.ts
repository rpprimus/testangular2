import { Component, OnInit, SimpleChanges, ElementRef, Input, ChangeDetectorRef } from '@angular/core';
import { AppUrl } from '../../../shared/config/app-url.enum';
import { Enum } from '../../../shared/config/enum.enum';
import { Util } from '../../../shared/services/util';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from '../../../shared/services/shared.service';
import { KitService } from '../kit.service';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { forkJoin } from 'rxjs';
import { DisplayMagnifiedImageComponent } from '../../display-magnified-image/display-magnified-image.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-kit-resource',
  templateUrl: './kit-resource.component.html',
  styleUrls: ['./kit-resource.component.scss']
})
export class KitResourceComponent implements OnInit {

  @Input() data: any;
  @Input() kitId: any = 0;
  defaultImageUrl: string = "./assets/images/frame-landscape-placeholder.svg";
  imageResourceList = [];
  otherResourceList = [];
  enum: Enum;
  appMessage = AppMessage;
  kitResLoaderCheck: boolean = false;            //Loader flag for the media files.
  KitUploadImageSpace: any;
  kitFetchLoaderCheck: any = [];                 //Loader while the images are fetched from the API's
  constructor(private ref: ChangeDetectorRef,private http: HttpClientService, private util: Util, private sharedService: SharedService, private kitService: KitService,
    public elementRef: ElementRef,private dialog: MatDialog, public _domSanitizationService: DomSanitizer) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    // We have only 3 image fixed so simply create an array with default Values
    this.imageResourceList = [];
    this.otherResourceList = [];
 
    let requests = [];
    if (changes.data && changes.data.currentValue && changes.data.currentValue.length > 0) {
      changes.data.currentValue.forEach((element) => {
        if (element.type == Enum.Kit_ProductImages) {
          if (element.id) {
            requests.push(this.http.getFiles(AppUrl.downloadKitResource, { pathVariable: element.id, kitId: this.kitId, type: Enum.Kit_OtherResources })); // here type is 1 so that actual file is downloaded
          }
          this.imageResourceList.push({ resourceId: element.id, isPrimary: element.isPrimary, url: this.defaultImageUrl });
        } else {
          this.otherResourceList.push({ fileName: element.fileName, resourceId: element.id });
        }
      });
      this.pushDefaultValuesInImage();
      this.getImage(requests);
    } else {
      this.pushDefaultValuesInImage();
    }
  }

  // Catch "a" tag click and Get file field and hit click event
  browseFileClick(inputField) {
    for (let i = 0; i < this.imageResourceList.length; i++) {          //checking the index and resourceId while uploading the images
      if (this.imageResourceList[i]['resourceId'] == 0) 
      {
        this.KitUploadImageSpace = i;
        break;
      }
  }
    let input_File = this.findQuery(inputField);
    input_File.click();
  }


  pushDefaultValuesInImage() {
    // we need 3 image items
    let len = this.imageResourceList.length;
    if (len < 3) {
      for (let i = len; i < 3; i++) {
        this.imageResourceList.push({ resourceId: 0, isPrimary: false, url: this.defaultImageUrl });
      }
    }
  }

  getImage(requests) {// used spread operator here
    this.util.hideLoader = true;       // we dont need loader to load images 
    let value=requests.length;
    for(let i = 0; i < value;i++){
      if (this.imageResourceList[i]['resourceId'] != 0)   //Here we check the index of the array which has images and show loader while fetching those images from the API's
      {
      this.kitFetchLoaderCheck[i]=true;                   //showing the loader while the images are being fetched.
      //break;
      }
    }
   // this.kitResLoaderCheck = true;          //showing a loader on each Image card while the images are being fetched
    forkJoin(...requests).subscribe(response => {
      response.forEach((element, i) => {
        let arr = element.url.split('/');
        let substring = arr[arr.length - 1].split('?')[0];
        if (element.body.type != 'application/json') { // application/json means there is no any image and we get error product image not found for this case
          const data = window.URL.createObjectURL(element.body);
          for (let i = 0; i < this.imageResourceList.length; i++) {   //this loop because we have to insert the data into that items which have the corresponding resource id
            if (this.imageResourceList[i].resourceId == Number(substring)) {
              this.imageResourceList[i].url = data; // update URL 
              break;
            }
          }
        } else {
          console.log('someting went wrong to fetch Images from server...');
        }
        this.kitFetchLoaderCheck[i] = false;     //hiding the loaders on the image card section when images are already fetched
      });
    });
  }

  renameResource(item, index) {
    if (!item.newFileName || item.newFileName.trim() == "") {
      return;
    }
    let newFileName = item.newFileName + item.fileName.substring(item.fileName.lastIndexOf('.'), item.fileName.length);
    let param = {
      pathVariable: this.kitId,
      id: item.resourceId,
      newName: newFileName
    }
    this.kitService.renameFile(param).subscribe((response: any) => {
      this.sharedService.onSuccess(response, 'U0064', (value) => {
        if (value) {
          this.otherResourceList[index].fileName = newFileName;
          item.isRename = false;
        }
      });
    }, error => this.sharedService.onError(error));
  }

  renameAction(item) {
    item.isRename = true;
    if (item.fileName) {
      item.newFileName = item.fileName.substring(0, item.fileName.lastIndexOf('.'));
    }
  }

  downloadResource(id) {
    let param = {
      pathVariable: id,
      kitId: this.kitId,
      type: Enum.Kit_OtherResources  //for other resource files
    }
    this.http.getFiles(AppUrl.downloadKitResource, param).subscribe((response: any) => {
      this.util.downloadFile(response);
    }, error => this.sharedService.onError(error));
  }

  /**
   * 
   * @param resourceId
   * @param index - select resource index
   * @param type  - image or otherResource
   */
  deleteFile(resourceId: number, index: number, type?) {
    let params = {
      pathVariable: this.kitId,
      resourceId: resourceId
    }
    this.kitService.deleteKitResource(params).subscribe(response => {
      this.sharedService.onSuccess(response, type == Enum.Kit_OtherResources ? 'U0063' : 'U0059', (value) => {
        if (value) {
          if (type == Enum.Kit_OtherResources) {
            this.otherResourceList.splice(index, 1); // removed object from array
          } else {
            this.imageResourceList[index] = { resourceId: 0, isPrimary: false, url: this.defaultImageUrl };
          }
        }

      });
    }, error => this.sharedService.onError(error));
  }

  markPrimary(resourceId: number, index: number) {
    let params = {
      pathVariable: this.kitId,
      resourceId: resourceId
    }
    this.kitService.markPrimaryImage(params).subscribe(response => {
      this.sharedService.onSuccess(response, 'U0060', (value) => {
        if (value) {
          this.tagImagePrimary(index);
        }
      });
    }, error => this.sharedService.onError(error));
  }

  /**
   * Tag Primary label on Image : first mark isPrimary false for each image and then mark true for selected image only
   * @param index - selected Image index
   */
  tagImagePrimary(index: number) {
    this.imageResourceList.forEach(element => {
      element.isPrimary = false;
    });
    this.imageResourceList[index].isPrimary = true;
  }

  isImageExist(): boolean {
    if (this.imageResourceList[0].resourceId || this.imageResourceList[1].resourceId || this.imageResourceList[2].resourceId) {
      return true;
    } else {
      return false;
    }
  }

  showImageDragPanel() {
    if (this.imageResourceList[0] && !this.imageResourceList[0].resourceId || this.imageResourceList[1] && !this.imageResourceList[1].resourceId || this.imageResourceList[2] && !this.imageResourceList[2].resourceId) {
      return true;
    } else {
      return false;
    }
  }

  fileChangeEvent(event: any, type): void {
    // resource upload only work when we have product Id
    if (!this.kitId) {
      return;
    }

    let kitFile = event.target.files && event.target.files[0] ? event.target.files[0] : '';
    if (!this.util.checkExtension(kitFile.name, type == Enum.Kit_OtherResources ? 'files' : '')) {
      this.sharedService.openToast('e', AppMessage.U0147);
    } else if (!this.util.checkSizeValidation(kitFile)) {
      this.sharedService.openToast('e', AppMessage.U0150);
    } else {
      this.onUpload(type, event.target.files[0]);
    }
  }

  //type = 0 is for images and type = 1 is for other resource files
  onUpload(type, file) {
    this.util.hideLoader = true;          //hiding the main loader while uploading the images
   if(type == Enum.Kit_ProductImages)     //checking the type of the image uploaded for enabling the loader.
   {
    this.kitResLoaderCheck = true;           // enabling the image loader for each image card section
   }
    const uploadData = new FormData();
    uploadData.append('id', '0');
    uploadData.append('kitId', this.kitId);

    if (type == Enum.Kit_ProductImages) {
      uploadData.append('isPrimary', this.isImageExist() ? 'false' : 'true'); // if there is no any images then mark  first image as PRIMARY  
    } else {
      uploadData.append('isPrimary', 'false'); // for other resources isPrimary value will be false
    }
    uploadData.append('type', type);
    uploadData.append('file', file);
    this.http.upload(AppUrl.addKitResource, uploadData).subscribe(response => {
      this.resetInputTypeFile();
      this.sharedService.onSuccess(response, type == Enum.Kit_ProductImages ? 'U0058' : 'U0062', (value) => {
        setTimeout(() => {
          if (value) {
            if (type == Enum.Kit_ProductImages) {
              this.displayUploadedImg(response.response.id, file);
            } else {
              this.displayOtherResource(response.response.id, file);
            }
          }
          this.kitResLoaderCheck = false;       //closing the loader when images are already uploaded
        }, 100);
      });
    }, error => this.sharedService.onError(error));
  }

  // reset value of Input type FIle so that change event calls for same files upload also
  resetInputTypeFile() {
    let imgInput = this.findQuery('imgInput');
    let docInputFile = this.findQuery('docinputfile');
    if (imgInput) {
      imgInput.value = '';
    }
    if (docInputFile) {
      docInputFile.value = '';
    }
  }

  displayOtherResource(resourceId, file) {
    this.otherResourceList.push({ fileName: file.name, resourceId: resourceId });
    this.ref.detectChanges();
  }

  displayUploadedImg(resourceId, file) {
    if (resourceId) {
      var reader = new FileReader();
      reader.readAsDataURL(file); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        let obj = { resourceId: resourceId, isPrimary: this.isImageExist() ? false : true, url: event.target.result };

        // For which Index resource Id is 0 , update uploaded image on that Image
        if (!this.imageResourceList[0].resourceId) {
          this.imageResourceList[0] = obj;
        } else if (!this.imageResourceList[1].resourceId) {
          this.imageResourceList[1] = obj;
        } else {
          this.imageResourceList[2] = obj;
        }
        this.ref.detectChanges();
      }

    }
  }

  // find element
  findQuery(id: string): any {
    return this.elementRef.nativeElement.querySelector('#' + id);
  }

  /**Open popup to display the full size image
   * @param: product which contains url of the image to display
   * pass the url of the image of the popup if url exist
   */
  displayMagnifiedImage(item){
    if(item.url && item.url != this.defaultImageUrl){
      this.dialog.open(DisplayMagnifiedImageComponent, {
        data: {
         url : item.url
        }
      });
    }
  }


}
