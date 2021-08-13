import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientStoreUserService } from '../client-store-user.service';
import { SharedService } from '../../../shared/services/shared.service';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { forkJoin } from 'rxjs';
import { AppConstant } from '../../../shared/config/app-constant';
import { Util } from '../../../shared/services/util';
import { CookieService } from 'ngx-cookie-service';
import { Common } from '../../../store/utility/common';
import { Enum } from '../../../shared/config/enum.enum';

@Component({
  selector: 'app-add-store-user',
  templateUrl: './add-client-store-user.component.html',
  styleUrls: ['./add-client-store-user.component.scss']
})
export class AddClientStoreUserComponent implements OnInit {

  @ViewChild('storeForm') addStoreUserForm;
  id: number = 0;
  fixVal = "Default@default1" // Default password to match regex condition, will not be saved
  data: any = { 
    password :  this.fixVal,      //this is done to hide the visibility icon at the time of load
    confirmPassword : this.fixVal
  };
  appMessage = AppMessage;
  roles = [];
  hierarchies = [];
  regionalManager = [];
  visibilityGroup = {
    arrayValue: [],
    placeholder: "Visibility Group"   //have to pass the placeholder value to chip component
  };
  selectedGroup = [];
  isReset: boolean = false;
  isFormSubmitted: boolean = false;  //if form is submitted once then no action to perform on save button
  isFormValid: boolean = true;
  isValidPassword: boolean = true;
  isHierarchy: boolean = false; //to check whether hierarchy for client is enabled 
  roleError: boolean = false;
  appConstant = AppConstant;
  isVisiblePassword: boolean = false;
  isVisibleConfirmPassword: boolean = false;
  isEditPassword:boolean = false;
  isEditConfirmPassword:boolean = false;
  isVisibility:boolean = false;  //to check whether visibility for client is enabled
  stateList: any = [];
  creditCardPayment: boolean = false;

  enum = Enum;
  isStoreAdmin: boolean = false;

  constructor(private _activatedRoute: ActivatedRoute, private clientStoreUserService: ClientStoreUserService,private cookieService: CookieService,
  private sharedService: SharedService, private router: Router, public util: Util,  public common: Common) { this.util.currentPageLink = 'client-store-users';}

  ngOnInit() {
    this.getDropdownsValue();
    this.getSettings();
    this.common.getCountries();
    this.id = this._activatedRoute.snapshot.params['id'] ? this._activatedRoute.snapshot.params['id'] : 0;
    if (this.id == 0) {
      this.data = {
        clientId: this.util.isStore ? this.cookieService.get('storeClientId') : localStorage.getItem('selectedClientId'),
        roleIds: [],
        id: 0,
        visibilityGroupIds: [],
        userStatusCode: 'ACTIVE'  //kept static because backend needs it at time of add new user
      }
    }
  }

  //get user details for Edit Section
  getStoreUserById() {
    let param: any = {
      pathVariable: this.id
    }
    this.clientStoreUserService.getStoreUser(param).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        if (response.response) {
          this.data = response.response;
          this.showPasswordAsStar();
          this.getCheckedRoles();
          this.getVisibilitySelectedGroup();
          this.clone();
          this.changeCountry();
        }
      });
    }, error => { this.sharedService.onError(error) });
  }

  clone() {
    if (this.util.isClone) {
      this.data.name = this.data.email = this.data.password = this.data.confirmPassword = this.data.mobileNumber = this.data.workPhoneNumber = this.data.designation= '';
      this.data.id = 0;
    }
  }

  /**
   * hit get API's for all the dropdown list 
   */
  getDropdownsValue() {
    let param1 = {
      userType: 'external'
    }
    let param2 = {
      clientId: this.util.isStore ? this.cookieService.get('storeClientId') : localStorage.getItem('selectedClientId'),
    }

    let roles = this.clientStoreUserService.getRoles(param1);
    let hierarchies = this.clientStoreUserService.getHierarchy(param2);
    let regionalManager = this.clientStoreUserService.getRegionalManager(param2);
    let visibilityGroup = this.clientStoreUserService.getVisibilityGroup(param2);
    // Load multitple request at once
    forkJoin([roles, hierarchies, regionalManager, visibilityGroup]).subscribe(response => {
      if(response){
        let [a, b, c, d, e] = response;
        this.roles = a.response.results;
        this.hierarchies = b.response;
        this.regionalManager = c.response;
        Object.assign(this.visibilityGroup.arrayValue, d.response);
        if (this.id > 0) {
          this.getStoreUserById();
        }
      }
    }, error => { this.sharedService.onError(error) });
  }

  /**
   * in edit case check the checkboxes of role which are added before
   */
  getCheckedRoles() {
    this.roles.forEach(element => {
      if (this.data.roleIds && this.data.roleIds.indexOf(element.id) > -1) {
        element.checked = true;
        if (this.data.roleIds.indexOf(this.enum.Store_Admin_Id) > -1) {
          this.isStoreAdmin = element.checked;
        }
      }
    });
  }

  //get the roleId of all the selected Roles in add new user
  getAndValidateRoleIds() {
    this.data.roleIds = [];
    this.roles.forEach(element => {
      if (element.checked) {
        this.data.roleIds.push(element.id);
      }
    });
    if (this.data.roleIds.length > 0) {
      this.roleError = false;
    }
    else {
      this.roleError = true;
    }
  }

  //add or edit store user functionality
  onSubmit() {
    if (this.isValid() && !this.isFormSubmitted) {
      this.isFormSubmitted = true;
      this.data.pathVariable = this.id;
      let param:any = JSON.parse(JSON.stringify(this.data));
      if (param.password == this.fixVal) {
       param.password = '';
      }
      if (param.confirmPassword == this.fixVal) {
        param.confirmPassword = '';
      }
      this.isVisiblePassword = false;
      this.isVisibleConfirmPassword = false;
      this.isEditConfirmPassword = false;
      this.isEditPassword = false;
      
      let request = this.clientStoreUserService.addClientStoreUser(param, (this.id > 0 && !this.util.isClone) ? 'put' : 'post');
      request.subscribe(response => {
        this.isFormSubmitted = false;
        this.sharedService.onSuccess(response, 'U0032', (value) => {
          
          if (value) {
            this.router.navigate(['/client-store-users']);
          } else if (this.id > 0) {
            this.showPasswordAsStar();
          }
        });

      }, error => { this.sharedService.onError(error) });
    }
  }

  showPasswordAsStar() {
    this.data.password = this.data.confirmPassword = this.fixVal;
  }

  //called for chip component in visibility group
  onChangeVisibilityGroup(data: any) {
    this.addStoreUserForm.form.markAsDirty(); //mark the form as dirty and enable the submit btn
    this.data.visibilityGroupIds = [];
    if (data) {
      data.forEach(x => {
        this.data.visibilityGroupIds.push(x.id);
      });
    }
  }

  resetForm() {
    this.addStoreUserForm.reset();
    this.isReset = true;
    this.roleError = false;
    this.isFormValid = true;
    this.data.visibilityGroupIds = [];
    this.data.roleIds = [];
  }

  getVisibilitySelectedGroup() {
    let array = [];
    this.visibilityGroup.arrayValue.forEach(element => {
      if (this.data.visibilityGroupIds && this.data.visibilityGroupIds.indexOf(element.id) > -1) {
        array.push(element);
      }
    });
    if (array.length > 0) {
      this.selectedGroup = array;
    }
  }

  isValid() {
    let valid = this.addStoreUserForm.valid; // form required
    this.isFormValid = valid; // used in HTML
    this.getAndValidateRoleIds(); // validate roles for required validations
    if (this.roleError) {
      valid = false;
    }
    if (valid) {
      if (!this.isValidPassword) { // password
        valid = false;
      }
    }

    return valid;
  }

  validatePassword() {
    if (this.data.confirmPassword && this.data.password) {
      if (this.data.confirmPassword !== this.data.password) {
        this.isValidPassword = false;
      } else {
        this.isValidPassword = true;
      }
    }
    else {
      this.isValidPassword = true;
    }
  }

  /**
   * if hierarchy of client is enabled then only show hierarchy and regional manager dropdown
   */
  getSettings() {
    this.isHierarchy = false;
    this.isVisibility = false;
    let param: any = {
      pathVariable: this.util.isStore ? this.cookieService.get('storeClientId') : localStorage.getItem('selectedClientId'),
    }
    this.clientStoreUserService.getClientSetting(param).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        if (response.response) {
          // client settings for credit card payment in Client Settings section
          this.creditCardPayment = response.response.settings.creditCardPayment;
          if (response.response.settings.isHierarchy) {
            this.isHierarchy = true;
          }
          if (response.response.settings.isVisibilityRestriction) {
            this.isVisibility = true;
          }
        }
      });
    }, error => { this.sharedService.onError(error) });
  }

  roleSelected() {
    this.roleError = false;
  }
  
  editPassword() {
    this.isEditPassword = true;
    this.data.password = "";
  }

  close(isPassword,value?){
    if(isPassword == 'confirmPassword'){
      this.isEditConfirmPassword = false;
    }else{
      this.isEditPassword = false;
    }
    if(value){
      if(isPassword == 'confirmPassword'){
        this.data.confirmPassword = this.fixVal;
      }else{
        this.data.password = this.fixVal;
      }
    }
  }

  editConfirmPassword() {
    this.isValidPassword = true;
    this.isEditConfirmPassword = true;
    this.data.confirmPassword = "";
  }

  changeCountry() {
    this.util.hideLoader = true;
    this.common.getStates(this.data.countryId, (response) =>{
      this.stateList = response;
    });
  }

  // storeRoleCheck(data) {
  //   if(data.id === this.enum.Store_Admin_Id) {
  //     this.isStoreAdmin = data.checked;
  //     if (!data.checked) {
  //       this.data.isExpirationNotification = false;
  //     }
  //   }
  // }
}
