import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClientService } from '../client.service';
import { SharedService } from '../../../shared/services/shared.service';
import { Util } from '../../../shared/services/util';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { FormControl } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { Observable, fromEvent, pipe } from 'rxjs';
import { Enum } from '../../../shared/config/enum.enum';
import { AppConstant } from '../../../shared/config/app-constant';
declare var CKEDITOR;
@Component({
  selector: 'app-client-setting',
  templateUrl: './client-setting.component.html',
  styleUrls: ['./client-setting.component.scss']

})
export class ClientSettingComponent implements OnInit {

  @ViewChild('settingForm') settingForm;
  @ViewChild('hirname') hirname;
  @ViewChild('managerInput') managerInput: ElementRef;
  data: any = {};
  appMessage = AppMessage;
  isFormValid: boolean = true;
  isFormSubmitted: boolean = false; // click only once on save button
  searchText = new FormControl();
  filteredOptions: any = [];
  noResult: boolean = false;
  accManager: any = [];
  inputPrimary: Observable<string>;
  productExcelArr:any = [];
  enum = Enum;
  welcomeTextError: string = '';

  appConstant = AppConstant;

  constructor(private clientService: ClientService, private sharedService: SharedService,
    private elementRef: ElementRef,public util:Util) {
  }

  ngOnInit() {
    // check view if it is add or edit
    if (this.util.clientId > 0) {
      this.getClientSetting();
      this.getProductExcelSheet();
    } else {
      this.data = {
        isClientProductName: false,
        isVisibilityRestriction: false,
        isHierarchy: false,
        visibilityRestriction: [{ id: 0, visibilityGroupName: '' ,isDefault : true,  gid: new Date().getTime()}],
        hierarchy: [{ id: 0, hierarchyName: '', gid: new Date().getTime() }],
        reportSetting : {
          orderDetailReport: true,
          damageProductReport: false,
          orderMonthlyReport: false,
          productListingReport: true,
          productUsagesMothlyReport: true,
          orderSummaryReport: true,
          productUsagesReport: true,
          inventoryReport: false
        }
      }
    }


    /**
     * For setting the maxlength of 45 to the display text field of link in Ckeditor
     */
    CKEDITOR.on( 'dialogDefinition', function(ev) {
     
      // Take the dialog name and its definition from the event data.
      var dialogName = ev.data.name; var dialogDefinition = ev.data.definition;
      // Check if the definition is from the dialog window you are interested in (the "Link" dialog window).
      if (dialogName == 'link') {
        // Get a reference to the "Link Info" tab.
        var infoTab = dialogDefinition.getContents('info');
        // Set the default value for the URL field.
        var urlField =infoTab.get("linkDisplayText");
        urlField['maxLength'] = 45;
      }
    });
  }

  ngAfterViewInit() {
    this.inputPrimary = fromEvent(this.managerInput.nativeElement, 'input').pipe(
      debounceTime(500),
      map((e: KeyboardEvent) => e.target['value'])
    );

    this.inputPrimary.subscribe((value: string) => {
      if (value) {
        if (value.length > 2) {
          this.getAccountManagers(value);
          this.filteredOptions = this._filter(value && value.trim());
          this.noResult = false;
          if (this.filteredOptions.length == 0) {
            this.noResult = true;
          }
        }
        else if (value.length == 0) {
          this.filteredOptions = [];
        }
      }
    });

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.accManager.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getAccountManagers(value) {
    value = value && value.trim().replace('+', '%2B');
    let params = { 
      searchText: value,
      clientId: this.util.clientId
     };
    this.clientService.getAccountManagerList(params).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        if (response.response) {
          this.accManager = response.response;
          this.filteredOptions = this.accManager;
        }
      })
    }, error => { this.sharedService.onError(error) });
  }

  getAccManagerById(option, evt: any) {
    if (evt.source.selected && option) {     //this is a turn around of angular material that onSelectionChange event is triggering twice whenever you change the option
      this.data.primaryAccountManagerId = option.id;
      this.data.primaryAccountManagerName = option.name;
      this.noResult = false;  //no record error is visible for the 1st time when filtered option is blank as it takes time to load
    }
  }

  getClientSetting() {
    let param = { pathVariable: this.util.clientId };
    this.clientService.getClientSetting(param).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        if (response.response && response.response.settings) {
          this.data = response.response.settings;
          this.data.visibilityRestriction = this.data.visibilityRestriction.length > 0 ? this.data.visibilityRestriction : [{ id: 0, visibilityGroupName: '',isDefault : false,  gid: new Date().getTime() }];
          this.data.hierarchy = this.data.hierarchy.length > 0 ? this.data.hierarchy : [{ id: 0, hierarchyName: '' }];
          this.data.clientProductName = this.data.clientProductName ? this.data.clientProductName : "";
          this.searchText.setValue(this.data.primaryAccountManagerName ? this.data.primaryAccountManagerName : '');
          //this.util.canCreateStore.next(this.data.primaryAccountManagerName ? true : false);
          this.setVisiblityFlag();
        }
      });
    });
  }

  setVisiblityFlag() {
    if(this.data.visibilityRestriction.length === 1) {
      this.data.visibilityRestriction[0].isDefault = true;
    }
  }

  onAddVisibilityRestrictionItems() {
    this.data.visibilityRestriction.push({ id: 0, visibilityGroupName: '', isDefault : false,  gid: new Date().getTime()});
  }

  onRemoveVisibilityRestrictionItems(index: number) {
    this.data.visibilityRestriction.splice(index, 1);
  }

  onAddHierarchyItems() {
    this.data.hierarchy.push({ id: 0, hierarchyName: '' });
  }
  onRemoveHierarchyItems(index: number) {
    this.data.hierarchy.splice(index, 1);
  }

  submit() {
    if (this.checkValid() && !this.isFormSubmitted) {
      this.isFormSubmitted = true;
      this.data.pathVariable = this.util.clientId;
      this.setVisiblityFlag();
      this.clientService.putClientSetting(this.data).subscribe(response => {
        this.isFormSubmitted = false;
        this.sharedService.onSuccess(response, 'U0013', (value) => {
          if (value) {
            this.getClientSetting();
          }
        });
      });
    } else {
      this.util.markFormGroupTouched(this.settingForm.form);
    }

  }

  checkValid() {
    let valid = this.settingForm.valid;
    this.welcomeTextError = '';
    //  get blank record 
    let arr = this.data.hierarchy.map(function (item) { if (!item.hierarchyName) { return item.hierarchyName } });
    if (this.data.isHierarchy && arr.includes("")) {
      valid = false;
    }

    let arr1 = this.data.visibilityRestriction.map(function (item) { if (!item.visibilityGroupName) { return item.visibilityGroupName } });
    if (this.data.isVisibilityRestriction && arr1.includes("")) {
      valid = false;
    }
    /* if (!this.data.primaryAccountManagerId) {         // Removed condition - Primary account manager is a required field
      valid = false;
    } */
    this.util.validateCkEditor(false, (value, msg) => {    //validate the character count and space trial in ckeditor
      if (!value) {
        if (msg == 'count') {
          this.welcomeTextError = AppMessage.U0170;
          valid = false;
        }
        else if (msg == 'space') {
          this.welcomeTextError = AppMessage.U0054;
          valid = false;
        }
        else {
          this.welcomeTextError = '';
        }
      }
    });
    this.isFormValid = valid;

    return valid;
  }

  clear() {
    this.noResult = false;
    this.searchText.setValue('');
    this.filteredOptions = [];
    this.data.primaryAccountManagerId = '';
    this.data.primaryAccountManagerName = '';
  }

  setVisibility(item:any){
    this.data.visibilityRestriction.forEach( i => {
      if((i.id && i.id == item.id) || (i.gid && i.gid == item.gid)) {
        item.isDefault = true;
      } else {
        i.isDefault = false;
      }
    })
  }



  ////////////  Product Excel upload functionality /////////////////////

  excelUploadChangeEvent(event: any): void {
    let files = event.target.files && event.target.files[0] ? event.target.files[0] : '';
    if (!this.util.checkXLSExtension(files.name)) {
      this.sharedService.openToast('e', AppMessage.U0147);
    }else{
      this.onExcelUpload(event.target.files[0]);
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
      id: item.id,
      newName: newFileName
    }
    this.clientService.renameExcelFile(param).subscribe((response: any) => {
      this.sharedService.onSuccess(response, 'U0064', (value) => {
        if (value) {
          this.productExcelArr[index].fileName = newFileName;
          item.isRename = false;
        }
      });
    }, error => this.sharedService.onError(error));
  }

  downloadFile(id) {
    let param = {
      id: id
    }
    this.clientService.downloadExcelFile(param).subscribe((response: any) => {
      this.util.downloadFile(response);
    }, error => this.sharedService.onError(error));
  }

  /**
   * 
   * @param id
   * @param index - select resource index
   * @param type  - image or otherResource
   */
  deleteFile(id: number, index: number) {
    let params = {
      id: id
    }
    this.clientService.deleteExcelFile(params).subscribe(response => {
      this.sharedService.onSuccess(response, 'U0063', (value) => {
        if (value) {
          this.productExcelArr.splice(index, 1); // removed object from array
        }
      });
    }, error => this.sharedService.onError(error));
  }

  getProductExcelSheet() {
    let param = {
      clientId: this.util.clientId
    }
    this.clientService.getProductExcelList(param).subscribe((response: any) => {
      this.sharedService.onSuccess(response, null, (value) => {
        if (value) {
          response.response.results.forEach(element => {
            this.productExcelArr.push({ fileName: element.fileName, id: element.id, type : element.type,successCount: element.successCount,errorCount:element.errorCount,duplicateCount:element.duplicateCount,updatedTime:element.updatedTime });
          });
        }
      });
    }, error => this.sharedService.onError(error));
  }

  onExcelUpload(file) {
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('clientId', this.util.clientId.toString());
    this.clientService.excelUpload(uploadData).subscribe(response => {
      this.elementRef.nativeElement.querySelector('#excelinputfile').value = '';
      this.sharedService.onSuccess(response, 'U0062', (value) => {
       // setTimeout(() => {
         //unshift() is used so that, the new excel being uploaded is on index 0 of the productExcelArr
          if (value) {
            this.productExcelArr.unshift({ fileName: file.name, id: response.response.id, type : response.response.type,successCount: response.response.successCount,errorCount:response.response.errorCount,duplicateCount:response.response.duplicateCount });
          }
        //}, 100);
      });
    }, error => this.sharedService.onError(error));
  }

}
