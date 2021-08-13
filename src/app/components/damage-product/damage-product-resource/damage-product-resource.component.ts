import { Component, OnInit, Input, ElementRef, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { Util } from '../../../shared/services/util';
import { SharedService } from '../../../shared/services/shared.service';
import { DamageProductService } from '../damage-product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-damage-product-resource',
  templateUrl: './damage-product-resource.component.html',
  styleUrls: ['./damage-product-resource.component.scss']
})
export class DamageProductResourceComponent implements OnInit {

  @Input() data: any;
  @Input() orderProductId: any = 0;
  defaultImageUrl: string = "./assets/images/frame-landscape-placeholder.svg";
  resourceList = [];
 // imagesSrcArr = [];
  appMessage = AppMessage;
 damageUploadImageSpace: any;
 damageResLoaderCheck: boolean = false;         //Loader flag for the media files.
 DamageFetchLoaderCheck: any = [];                //Loader while the images are fetched from the API's
  constructor(private ref:ChangeDetectorRef,private util: Util, private sharedService: SharedService, private damageProductService: DamageProductService,
    private elementRef: ElementRef, public _domSanitizationService: DomSanitizer) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {// We have only 3 image fixed so simply create an array with default Values
    this.resourceList = [];

    let requests = [];
    if (changes.data && changes.data.currentValue && changes.data.currentValue.length > 0) {
      changes.data.currentValue.forEach((element) => {
        //this.orderProductId = element.id;
        requests.push(this.damageProductService.getFiles({ pathVariable: element.id, orderProductId: this.orderProductId, type: 0 }));
        // put all GET request for images in array
        this.resourceList.push({ resourceId: element.id, name: element.name, url: this.defaultImageUrl });

      });
      this.pushDefaultValuesInImage();
      this.getImage(requests);
    } else {
      this.pushDefaultValuesInImage();
    }
  }

 // Catch "a" tag click and Get file field and hit click event
  browseFileClick(inputField) {
     // this.uploadImageSpace = emptySlot['index'];
     for (let i = 0; i < this.resourceList.length; i++) {
      if (this.resourceList[i]['resourceId'] == 0) {          //checking the index and resourceId while uploading the images
        this.damageUploadImageSpace = i;
        break;
      }
  }
    let input_File = this.findElement(inputField);
    input_File.click();
  }


  pushDefaultValuesInImage() {
    // we need 3 image items
    let len = this.resourceList.length;
    if (len < 3) {
      for (let i = len; i < 3; i++) {
        this.resourceList.push({ resourceId: 0, name: '', url: this.defaultImageUrl });
      }
    }
  }

  getImage(requests) {  // used spread operator here
    this.util.hideLoader = true;    // we dont need loader to load images 
    let value=requests.length;
    for(let i = 0; i < value;i++){
      if (this.resourceList[i]['resourceId'] != 0)  //Here we check the index of the array which has images and show loader while fetching those images from the API's
      {
      this.DamageFetchLoaderCheck[i]=true;           //showing the loader while the images are being fetched.
      //break;
      }
    }
   // this.damageResLoaderCheck = true;        //showing a loader on each Image card while the images are being fetched
  
    forkJoin(...requests).subscribe(response => {
      response.forEach((element, i) => {
        if (element.body.type != 'application/json') { // application/json means there is no any image and we get error product image not found for this case
          const data = window.URL.createObjectURL(element.body);
          this.resourceList[i].url = data; // update URL 
        } else {
          console.log('someting went wrong to fetch Images from server...');
        }
        this.DamageFetchLoaderCheck[i]= false;     //hiding the loaders on the image card section when images are already fetched
      });
    });
  }

  // downloadResource(id) {
  //   let param = {
  //     pathVariable: id,
  //     orderProductId: this.orderProductId
  //   }
  //   this.damageProductService.getFiles(param).subscribe((response: any) => {
  //     this.util.downloadFile(response);
  //   }, error => this.sharedService.onError(error));
  // }

  /**
   * 
   * @param resourceId
   * @param index - select resource index
   * @param type  - image or otherResource
   */
  deleteFile(resourceId: number, index: number, type: string = '') {
    let params = {
      id: this.orderProductId,
      resourceId: resourceId
    }
    this.damageProductService.deleteDamageResource(params).subscribe(response => {
      this.sharedService.onSuccess(response, 'U0059', (value) => {
        if (value) {
          this.resourceList[index] = { resourceId: 0, name: '', url: this.defaultImageUrl };
        }
      });
    }, error => this.sharedService.onError(error));
  }

  // isImageExist(): boolean {
  //   if (this.resourceList[0].resourceId || this.resourceList[1].resourceId || this.resourceList[2].resourceId) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  showImageDragPanel() {
    if (this.resourceList[0] && !this.resourceList[0].resourceId || this.resourceList[1] && !this.resourceList[1].resourceId || this.resourceList[2] && !this.resourceList[2].resourceId) {
      return true;
    } else {
      return false;
    }
  }

  fileChangeEvent(event: any, type): void {
    // resource upload only work when we have product Id
    if (!this.orderProductId) {
      return;
    }

    let damageResFile = event.target.files && event.target.files[0] ? event.target.files[0] : '';
    if (!this.util.checkExtension(damageResFile.name, '')) {
      this.sharedService.openToast('e', AppMessage.U0147);
    } else if (!this.util.checkSizeValidation(damageResFile)) {
      this.sharedService.openToast('e', AppMessage.U0150);
    } else {
      this.onUpload(type, event.target.files[0]);
    }
  }

  //type = 0 is for thumbnail images
  onUpload(type, file) {
    this.util.hideLoader = true;       //hiding the main loader while uploading the images
    this.damageResLoaderCheck = true;           // enabling the image loader for each image card section
    const uploadData = new FormData();
    uploadData.append('id', '0');
    uploadData.append('orderProductId', this.orderProductId);
    uploadData.append('clientId', localStorage.getItem('selectedClientId'));
    uploadData.append('fileName', file.name);
    uploadData.append('type', type);
    uploadData.append('file', file);

    this.damageProductService.uploadDamageResource(uploadData).subscribe(response => {
      this.resetInputTypeFile();
      this.sharedService.onSuccess(response, 'U0058', (value) => {
        setTimeout(() => {
          if (value) {
            this.displayUploadedImg(response.response.id, file);
          }
          this.damageResLoaderCheck = false;    //closing the loader when images are already uploaded
        }, 100);
      });
    }, error => this.sharedService.onError(error));
  }

  // reset value of Input type FIle so that change event calls for same files upload also
  resetInputTypeFile() {
    let imgInput = this.findElement('imgInput');
    if (imgInput) {
      imgInput.value = '';
    }
  }

  displayUploadedImg(resourceId, file) {
    if (resourceId) {
      var reader = new FileReader();
      reader.readAsDataURL(file); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        let obj = { resourceId: resourceId, name: file.name, url: event.target.result };

        // For which Index resource Id is 0 , update uploaded image on that Image
        if (!this.resourceList[0].resourceId) {
          this.resourceList[0] = obj;
        } else if (!this.resourceList[1].resourceId) {
          this.resourceList[1] = obj;
        } else {
          this.resourceList[2] = obj;
        }
        this.ref.detectChanges();
      }

    }
  }

  //find element
  findElement(id: string): any {
    return this.elementRef.nativeElement.querySelector('#' + id);
  }

}
