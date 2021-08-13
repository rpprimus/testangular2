import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Util } from '../../../shared/services/util';
import { ClientDetailsComponent } from '../client-details/client-details.component';
import { ClientSettingComponent } from '../client-setting/client-setting.component';
import { ClientThemeSettingsComponent } from '../client-theme-settings/client-theme-settings.component';
import { SharedService } from '../../../shared/services/shared.service';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { ClientService } from '../client.service';
import { ClientModulesComponent } from '../client-modules/client-modules.component';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  @ViewChild(ClientDetailsComponent) clientDetail;
  @ViewChild(ClientModulesComponent) clientModule;
  @ViewChild(ClientSettingComponent) clientSetting;
  @ViewChild(ClientThemeSettingsComponent) themeSettings;
  id: number = 0;
  isDisabled: boolean = false;
  selectedTabIndex: number = 0;
  title: string;
  isCreateStore: boolean = false;
  storeCreated: boolean = false;

  constructor(private router: Router, public _activatedRoute: ActivatedRoute, public util: Util, private sharedService: SharedService, private clientService: ClientService) {
    this.util.currentPageLink = 'clients';
   }

  ngOnInit() {
    this.title = "Add Client";
    this.id = this._activatedRoute.snapshot.params['id'] ? this._activatedRoute.snapshot.params['id'] : 0;
    if (this.id == 0) {    //disable all other tabs if client id is not available
      this.isDisabled = true;
    }
    else {
      this.title = "Client Details";
      this.isDisabled = false;
    }
   
    this.util.storeCreated.subscribe(value => {
      this.storeCreated = value;
    });
  }

  ngAfterViewInit(){
    this.util.canCreateStore.subscribe(value => {
      //if(value && this.clientSetting.data.primaryAccountManagerName && this.themeSettings.canCreate){
      if(value && this.themeSettings.canCreate){
        this.isCreateStore = true;
      }else{
        this.isCreateStore = false;
      }
    });
  }

  /**
   * Save Client Id in UTIL so that we can use this id for other tab save request
   * mark isDisbled variable : false to enable other tabs
   */
  saveClient() {
    switch (this.selectedTabIndex) {
      //case 0 for Client details
      case 0: this.clientDetail.submitClientDetailForm((response) => {
        this.util.clientId = response.response.id;
        this.util.isClientCreated.next(true);
        this.isDisabled = false;
        //this.util.storeCreated.next(false);
      });
        break;
      //case 1 for Client Modules
      case 1: break;
      //case 2 for Client Settings
      case 2: this.clientSetting.submit();
        break;
      //case 3 for theme settings
      case 3: this.themeSettings.uploadFile();
        break;
    }
  }

  /**
   * To check and store the value of the selected tab index
   * @param index return number of the selected tab
   */
  selectedTab(index: number) {
    this.selectedTabIndex = index;
    if (index == 3) {                       //this is done to initialize the ckeditor for the last tab because we have destroyed the instance of ckeditor in 1st tab to avoid error
      this.util.ckEditorBaseConfigDescription = {
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
    }
  }

  onCancel() {
    this.router.navigate(['clients']);
  }

  /**
   * Create store if button is enabled after theme settings is saved and primary account manager has been set
   * Show confirm box then create store on Yes
   * Hide the button once create store is successfull
   */
  createStore() {
    let param: any = {
      pathVariable: this.util.clientId
    }
    this.sharedService.confirmBox(AppMessage['U0019'], (result) => {
      if (result) {
        this.clientService.createStore(param).subscribe(response => {
          this.sharedService.onSuccess(response, 'U0021', () => {
            this.util.storeCreated.next(true);
          });
        });
      }
    });
  }

  canDeactivate() {
    if (this.util.isServiceDirty ||
      this.util.isEventDirty || this.util.isShipmentDirty || this.util.isPickupDirty ||
      this.util.isAdditionalDirty) {
      return false;
    } else {
      return true;
    }

  }
}
