import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoryService } from '../category.service';
import { SharedService } from '../../../shared/services/shared.service';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { Util } from '../../../shared/services/util';

declare var CKEDITOR;

@Component({
  selector: 'app-add-info-display-dialog',
  templateUrl: './add-info-display-dialog.component.html',
  styleUrls: ['./add-info-display-dialog.component.scss']
})
export class AddInfoDisplayDialogComponent implements OnInit {
  @ViewChild('categoryInfoForm') categoryInfoForm;
  categoryInfo: any = {};
  appMessage = AppMessage;
  titleError:string ='';
  descriptionError:string ='';

  constructor(private categoryService: CategoryService, private sharedService: SharedService, public dialogRef: MatDialogRef<AddInfoDisplayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public util: Util) {
    data.autoFocus = true;
  }

  ngOnInit() {
    //Assign the values in category info in case of add or edit
    this.categoryInfo = {
      id: this.data.id,
      title: this.data.title == null ? '' : this.data.title,
      description: this.data.description == null ? '' : this.data.description
    }
  }

  close() {
    this.dialogRef.close();
  }

  // update the category info
  addInfo() {
    if (this.checkValid()) {
      let param: any = {
        pathVariable: localStorage.getItem('selectedClientId'),
      }
      Object.assign(param, this.categoryInfo);
      this.categoryService.saveInfoCategory(param).subscribe(response => {
        this.sharedService.onSuccess(response, 'U0041', (value) => {
          if (value) {
            this.dialogRef.close();
            this.categoryService.loadData();
          }
        });
      }, error => { this.sharedService.onError(error) });
    }
  }

  /**
   * Delete the category info if clicked on yes in confimation box
   * After success, load the tree data and close the dialog box
   */
  delete() {
    let param = {
      pathVariable: localStorage.getItem('selectedClientId'),
      categoryId: this.data.id,
    }
    this.sharedService.confirmBox(AppMessage['U0046'], (result) => { //show a confirm dialog box before status change
      if (result) {
        this.categoryService.deleteCategoryInfo(param).subscribe(response => {
          this.sharedService.onSuccess(response, 'U0045', (value) => {
            if (value) {
              this.dialogRef.close();
              this.categoryService.loadData();
            }
          });
        }, error => { this.sharedService.onError(error) });
      }
    });
  }

  checkValid() {
    let valid = this.categoryInfoForm.valid; // form required
    if(this.validateCkEditor()){
      valid = true;
    }
    else{
      valid = false;
    }
    if(this.titleError || this.descriptionError){
      valid = false;
    }
    return valid;
  }

  /**Validate whether only trail of spaces is entered 
   * or entered characters are more than max character count
   * in above cases return valid is false
    */
   validateCkEditor() {
    this.titleError = '';
    this.descriptionError = '';
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
          else{
            valid = false;
            keys[i].config.maxCharCount == 200 ? this.titleError = AppMessage.U0138 : this.descriptionError = AppMessage.U0139;
          }
        }
        else {
          if(plain_text.length >= 1 && plain_text.trim().length == 0){  //to restrict the space trial validation and by default plaintext has 1 length
            valid = false;
            keys[i].config.maxCharCount == 200 ? this.titleError = AppMessage.U0054 : this.descriptionError = AppMessage.U0054;
          } else{
            valid = true;
          }
        }
      }
      
    }
    return valid;
  }

}
