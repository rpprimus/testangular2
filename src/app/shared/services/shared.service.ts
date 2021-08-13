import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from "@angular/material";
import { DialogBoxComponent } from "../../components/dialog-box/dialog-box.component";
import { AppMessage } from '../config/app-message.enum';
import { AuthService } from './auth.service';
import { SnackBarComponent } from "../../components/snack-bar/snack-bar.component";
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientService } from './http-client.service';
import { AppUrl } from '../config/app-url.enum';
import { Util } from './util';
import { DisplayMagnifiedImageComponent } from './../../components/display-magnified-image/display-magnified-image.component';
import { Subject, Observable } from 'rxjs';


@Injectable()
export class SharedService {
  isTimedOut: boolean = false;
  mapObj : any;
  private subject = new Subject<any>();
  sequenceList:Array<{}>[] = [];

  constructor(private _dialog: MatDialog, private auth: AuthService,
    public snackBar: MatSnackBar, private http: HttpClientService, private util: Util) { }

  // code s = for success, code e = for error 
  openToast(code: string, textContent: string, fn?) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        code: code,
        content: textContent
      }, duration: 3500
    })
      .afterDismissed().subscribe((result) => {
        if (fn) {
          return fn(result);
        }
      });
  }

  // code > e = for error message dialog box.
  openDialog(code: string, textContent: string, fn?) {
    this._dialog.open(DialogBoxComponent, {
      data: {
        code: code,
        content: textContent
      }
    })
      .afterClosed().subscribe(result => {
        if (fn) {
          return fn(result);
        }
      });
  }

  // IF WE NEED TO DISPLAY A CONFIRM BOX WITH SPECIC CODE & ICON THEN USE THIS FUNCTION
  // cs > success type confirm dialog box
  otherConfirmBox(textContent: string, code: string, fn?) {
    this._dialog.open(DialogBoxComponent, {
      data: {
        content: textContent,
        code: code // confirm
      }
    })
      .afterClosed().subscribe(result => {
        if (fn) {
          return fn(result);
        }
      });
  }

  // this is for ALERT TYPE CONFIRM BOX WHERE CODE IS FIXED
  confirmBox(textContent: string, fn?) {
    this._dialog.open(DialogBoxComponent, {
      data: {
        content: textContent,
        code: 'c' // confirm
      }
    })
      .afterClosed().subscribe(result => {
        if (fn) {
          return fn(result);
        }
      });
  }

  /**
   * @param response - response
   * @param message - It may be message Code or complete Message
   * @param fn - This is return function
   */
  onSuccess(response: any, message?: string, fn?) {
    let msg = "";
    if (response.responseCode == "S0001") {
      if (message) {
        msg = AppMessage[message] ? AppMessage[message] : message;
        this.openToast('s', msg);
      }
      if (fn) {
        return fn(true); // true for success
      }
    }
    else {
      if (response.errorCode == 'E1018' || response.errorCode == 'E1009' || response.errorCode == 'E1007') {     //Session expired then logOut
        this.invalidAccess(response.errorCode);
      }
      else {
        if (response.errorCode && response.errorMessage && response.errorMessage.errors) {
          msg = response.errorMessage.errors.toString();
        }
        else {
          msg = AppMessage[response.errorCode] ? AppMessage[response.errorCode] : response.errorDescription;
        }
        this.openToast('e', msg);
        if (fn) {
          return fn(false); // false for failure
        }
      }
    }
  }

  onError(error: HttpErrorResponse) {
    if (error.error instanceof Error) {
      //A client-side or network error occurred.				 
      console.log('An error occurred:', error.error.message);
    } else {
      //Backend returns unsuccessful response codes such as 404, 500 etc.				 
      console.log('Backend returned status code: ', error.status);
      console.log('Response body:', error.error);
    }
  }

  /**
   * To logout if session expired or invalid token provided
   * @param err response error code
   */
  invalidAccess(err: string) {
    if (!this.isTimedOut) {  //to show message only once
      this.isTimedOut = true;
      switch (err) {
        case 'E1018': this.openDialog('e', AppMessage.E1018, () => {
          this.auth.sessionExpired();
        });
          break;
        case 'E1009': this.auth.sessionExpired();
          break;
        case 'E1007': this.openDialog('e', AppMessage.E1007, () => {
          this.auth.sessionExpired();
        });
          break;
      }
      return;
    }
  }

  // get Image files from server as OUTPUT stream
  getImageFile(url, param, fn?) {
    this.http.getFiles(url, param).subscribe(response => {
      if (response.body.type != 'application/json') { // application/json means there is no any image and we get error product image not found for this case
        return fn(response.body);
      } else {
        console.log('someting went wrong to fetch store logo from server...');
      }
    });
  }

  // On Demand Graphics - File/Img downloadable  
  downloadOnDemandFile(file) {
    let param = {
      fileName: file.fileName,
      filePath: file.filePath,
    }
    this.http.getFiles(AppUrl.onDemandProductImg, param).subscribe((response: any) => {
      this.util.downloadFile(response);
    }, error => this.onError(error));
  }

  // Funtion to convert the blob to image path
  openOnDemandFile(ele) {
    // if (ele.imageUrl) {
    //   this.openImagePopup(ele.imageUrl)
    // } else {
    if (this.util.checkExtension(ele.fileName, '')) {   //we only have to show image type files
      let param = {
        fileName: ele.fileName,
        filePath: ele.filePath,
      }
      this.http.getFiles('order/v1/resource', param).subscribe(response => {
        let imageUrl = window.URL.createObjectURL(response.body);
        ele.imageUrl = imageUrl;

        if (imageUrl) {
          this.openImagePopup(imageUrl);
          // window.open(imageUrl, "_blank")
        }
      }, error => this.onError(error));
    }
    // }
  }

  // Function to call the image in popup window.
  openImagePopup(url) {
    this._dialog.open(DisplayMagnifiedImageComponent, {
      data: {
        url: url
      }
    });
  }

  // subject
  sendMessage(object: any) {
    this.subject.next(object);
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  //only hit the sequence API when reloaded or user directly hit the product detail page with id else 
  //show the sequence from the Product list GET api
  getSequence(listingEnumType, clientId, fn) {
    if(this.sequenceList.length == 0){
      let url = AppUrl.getDetailSequence + '?listingEnumType=' + listingEnumType + '&clientId=' + clientId;
      this.http.get(url).subscribe((response: any) => {
        this.onSuccess(response, null, (value) => {
          if (value) {
            this.createSequenceMap(response.response);
            return fn(response.response);
          }
        });
      }, error => this.onError(error));
    }else{
      this.createSequenceMap(this.sequenceList);
      return fn(this.sequenceList);
    }
    
  }

  //create a Map object for sequence of list in Product/Inventory/Order
  createSequenceMap(data) {
    this.mapObj = new Map();
    data.forEach(item => {
      if (!this.mapObj.get(item.sequence)) {
        this.mapObj.set(item.sequence, item.id);
      }
    })
  }

  //return the value of map on basis of key
  //@Param: key - it comes in string 
  retrieveSequenceMap(key) {
    return this.mapObj.get(key);
  }

}
