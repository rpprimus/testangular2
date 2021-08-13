import { Component, ElementRef, Input, OnInit, SimpleChanges, ChangeDetectorRef, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin, BehaviorSubject } from 'rxjs';

import { AppUrl } from '../../../shared/config/app-url.enum';
import { Enum } from '../../../shared/config/enum.enum';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { SharedService } from '../../../shared/services/shared.service';
import { Util } from '../../../shared/services/util';
import { ProductsService } from '../products.service';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { MatDialog } from '@angular/material';
import { DisplayMagnifiedImageComponent } from '../../display-magnified-image/display-magnified-image.component';

@Component({
  selector: 'app-product-resources',
  templateUrl: './product-resources.component.html',
  styleUrls: ['./product-resources.component.scss']
})
export class ProductResourcesComponent implements OnInit {

  defaultImageSrc: string = "./assets/images/frame-landscape-placeholder.svg";
  @Input() data: any;
  @Input() productId: number = 0;
  @Input() isWorkshopTeamMember : boolean = false;
  imagesSrcArr = [];
  otherResourceArr = [];
  enum: Enum;
  appMessage = AppMessage;
  productResLoaderCheck: boolean = false;   //Loader flag for the media files.
  productUploadImageSpace: any;
  productFetchLoaderCheck: any = [];        //Loader while the images are fetched from the API's

  constructor(private ref:ChangeDetectorRef,private http: HttpClientService, public _domSanitizationService: DomSanitizer,
    private util: Util, private sharedService: SharedService, private productService: ProductsService, private elementRef: ElementRef,
    private dialog: MatDialog) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    // We have only 3 image fixed so simply create an array with default Values
    this.imagesSrcArr = [];
    this.otherResourceArr = [];

    let requests = [];
    if (changes.data && changes.data.currentValue.length > 0) {
      changes.data.currentValue.forEach((element, index) => {
        if (element.type == Enum.ProductImages) {
          requests.push(this.http.getFiles(AppUrl.productResource, { pathVariable: this.productId, resourceId: element.id })); // put all GET request for images in array
          element.imgClass = this.util.checkImageType(element.thumbnailDimension.imgWidth, element.thumbnailDimension.imgHeight); //get the type of image structure
          this.imagesSrcArr.push({ resourceId: element.id, isPrimary: element.isPrimary, url: this.defaultImageSrc, imgClass: element.imgClass });
        } else {
          this.otherResourceArr.push({ fileName: element.fileName, resourceId: element.id });
        }
      });
      this.pushDefaultValuesInImageArr();
      this.getImages(requests);
    } else {
      this.pushDefaultValuesInImageArr();
    }
  }

  pushDefaultValuesInImageArr() {
    // we need 3 image items
    let len = this.imagesSrcArr.length;
    if (len < 3) {
      for (let i = len; i < 3; i++) {
        this.imagesSrcArr.push({ resourceId: 0, isPrimary: false, url: this.defaultImageSrc, imgClass: 'img-square' });
      }
    }
  }

  getImages(requests) { // used spread operator here
    this.util.hideLoader = true;         //hiding the loader when getImages method is being called.
     let value=requests.length;        
     for(let i = 0; i < value;i++){          
       if (this.imagesSrcArr[i]['resourceId'] != 0)  //Here we check the index of the array which has images and show loader while fetching those images from the API's
       {
       this.productFetchLoaderCheck[i]=true;          //showing the loader while the images are being fetched.
       //break;
       }
     }
  //  this.productFetchLoaderCheck= true;             //showing a loader on each Image card while the images are being fetched
    forkJoin(...requests).subscribe(response => {
      response.forEach((element, i) => {
      //  this.productFetchLoaderCheck[index]= true;  
        if (element.body.type != 'application/json') { // application/json means there is no any image and we get error product image not found for this case
          const data = window.URL.createObjectURL(element.body);
          this.imagesSrcArr[i].url = data; // update URL 
        } 
        else {
          console.log('someting went wrong to fetch Images from server...');
        }
        this.productFetchLoaderCheck[i]= false;   //hiding the loaders on the image card section when images are already fetched
      });
    });
  }

  // Catch "a" tag click and Get file field and hit click event
  browseFileClick(inputField) {
    // let imageArr = JSON.parse(JSON.stringify(this.imagesSrcArr));
    // let emptySlot = imageArr.find((element, index) => {
    //   if (element['resourceId'] === 0) {
    //     element['index'] = index;
    //     return element;
    //   }
    // });
    // this.uploadImageSpace = emptySlot['index'];
    for (let i = 0; i < this.imagesSrcArr.length; i++) {
        if (this.imagesSrcArr[i]['resourceId'] == 0) {       //checking the index and resourceId while uploading the images
          this.productUploadImageSpace = i;
          break;
        }
    }
    let input_File = this._f(inputField);
    input_File.click();
  }

  fileChangeEvent(event: any, type): void {
    // resource upload only work when we have product Id
    if (!this.productId) {
      return;
    }

    let file = event.target.files && event.target.files[0] ? event.target.files[0] : '';
    if (!this.util.checkExtension(file.name, type == Enum.OtherResources ? 'files' : '')) {
      this.sharedService.openToast('e', AppMessage.U0147);
    } else if (!this.util.checkSizeValidation(file)) {
      this.sharedService.openToast('e', AppMessage.U0150);
    } else {
      this.onUpload(type, event.target.files[0]);
    }
  }

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
      pathVariable: this.productId,
      id: item.resourceId,
      newName: newFileName
    }
    this.http.put(AppUrl.productResource, param).subscribe((response: any) => {
      this.sharedService.onSuccess(response, 'U0064', (value) => {
        if (value) {
          this.otherResourceArr[index].fileName = newFileName;
          item.isRename = false;
        }
      });
    }, error => this.sharedService.onError(error));
  }
  downloadFile(id) {
    let param = {
      pathVariable: this.productId,
      resourceId: id
    }
    this.http.getFiles(AppUrl.productResource, param).subscribe((response: any) => {
      this.util.downloadFile(response);
    }, error => this.sharedService.onError(error));
  }

  /**
   * 
   * @param resourceId
   * @param index - select resource index
   * @param type  - image or otherResource
   */
  deleteFile(resourceId: number, index: number, type: string = '') {
    let params = {
      pathVariable: this.productId,
      resourceId: resourceId
    }
    this.productService.deleteProductResource(params).subscribe(response => {
      this.sharedService.onSuccess(response, type == Enum.OtherResources ? 'U0063' : 'U0059', (value) => {
        if (value) {
          if (type == Enum.OtherResources) {
            this.otherResourceArr.splice(index, 1); // removed object from array
          } else {
            this.imagesSrcArr[index] = { resourceId: 0, isPrimary: false, url: this.defaultImageSrc, imgClass: 'img-square' };
          }
        }

      });
    }, error => this.sharedService.onError(error));
  }

  markPrimary(resourceId: number, index: number) {
    let params = {
      pathVariable: this.productId,
      resourceId: resourceId
    }
    this.productService.markPrimaryImage(params).subscribe(response => {
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
    this.imagesSrcArr.forEach(element => {
      element.isPrimary = false;
    });
    this.imagesSrcArr[index].isPrimary = true;
  }

  isImageExist(): boolean {
    if (this.imagesSrcArr[0].resourceId || this.imagesSrcArr[1].resourceId || this.imagesSrcArr[2].resourceId) {
      return true;
    } else {
      return false;
    }
  }

  showImageDragPanel() {
    if (this.imagesSrcArr[0] && !this.imagesSrcArr[0].resourceId || this.imagesSrcArr[1] && !this.imagesSrcArr[1].resourceId || this.imagesSrcArr[2] && !this.imagesSrcArr[2].resourceId) {
      return true;
    } else {
      return false;
    }
  }

  onUpload(type, file) {
    this.util.hideLoader = true;      //hiding the main loader while uploading the images
   if(type == Enum.ProductImages)      //checking the type of the image uploaded for enabling the loader.
   {
    this.productResLoaderCheck = true;          // enabling the image loader for each image card section
   }
    let param: any = {
      pathVariable: this.productId
    }
    const uploadData = new FormData();
    uploadData.append('id', '0');

    if (type == Enum.ProductImages) {
      uploadData.append('isPrimary', this.isImageExist() ? 'false' : 'true'); // if there is no any images then mark  first image as PRIMARY  
    } else {
      uploadData.append('isPrimary', 'false'); // for other resources isPrimary value will be false
    }
    uploadData.append('type', type);
    uploadData.append('file', file);

    this.http.upload(AppUrl.productResource, uploadData, param).subscribe(response => {
      this.resetInputTypeFile();
      this.sharedService.onSuccess(response, type == Enum.ProductImages ? 'U0058' : 'U0062', (value) => {
        setTimeout(() => {
          if (value) {
            if (type == Enum.ProductImages) {
              this.displayUploadedImg(response.response.id, file);
            } else {
              this.displayOtherResource(response.response.id, file);
            }
          }
          this.productResLoaderCheck = false;    //closing the loader when images are already uploaded
        }, 100);
      });
    }, error => this.sharedService.onError(error));
  }

  // reset value of Input type FIle so that change event calls for same files upload also
  resetInputTypeFile() {
    let imgInputFile = this._f('imginputfile');
    let docInputFile = this._f('docinputfile');
    if (imgInputFile)
      imgInputFile.value = '';
    if (docInputFile)
      docInputFile.value = '';
  }

  displayOtherResource(resourceId, file) {
    this.otherResourceArr.push({ fileName: file.name, resourceId: resourceId });
    this.ref.detectChanges();
  }

  displayUploadedImg(resourceId, file) {
    if (resourceId) {
      var reader = new FileReader();
      reader.readAsDataURL(file); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        let obj = { resourceId: resourceId, isPrimary: this.isImageExist() ? false : true, url: event.target.result };

        // For which Index resource Id is 0 , update uploaded image on that Image
        if (!this.imagesSrcArr[0].resourceId) {
          this.imagesSrcArr[0] = obj;
        } else if (!this.imagesSrcArr[1].resourceId) {
          this.imagesSrcArr[1] = obj;
        } else {
          this.imagesSrcArr[2] = obj;
        }
        this.ref.detectChanges();
      }

    }
  }

  // find element
  _f(id: string): any {
    return this.elementRef.nativeElement.querySelector('#' + id);
  }

  /**Open popup to display the full size image
   * @param: product which contains url of the image to display
   * pass the url of the image of the popup if url exist
   */
  displayImage(item) {
    if (item.url && item.url != this.defaultImageSrc) {
      this.dialog.open(DisplayMagnifiedImageComponent, {
        data: {
          url: item.url
        }
      });
    }

  }

}
