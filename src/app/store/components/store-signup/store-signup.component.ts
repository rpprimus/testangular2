import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { MyErrorStateMatcher } from '../../../core/error-state-matcher';
import { AppConstant } from '../../../shared/config/app-constant';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { SharedService } from '../../../shared/services/shared.service';
import { Util } from '../../../shared/services/util';
import { StoreService } from '../../service/store.service';
import { Common } from '../../utility/common';

@Component({
  selector: 'app-store-signup',
  templateUrl: './store-signup.component.html',
  styleUrls: ['./store-signup.component.scss']
})
export class StoreSignupComponent implements OnInit {

  signUpForm: FormGroup;
  appMessage = AppMessage;
  matcher = new MyErrorStateMatcher();
  hierarchies = [];
  //isHierarchy: boolean = false;
  isFormSubmitted: boolean = false;
  isVisiblePassword: boolean = false;
  isVisibleConfirmPassword: boolean = false;
  isAnimation:boolean = false;
  statesList: any = [];
  countryList: any = [];
  // countryId: number;
  // stateId: number;

  constructor(private router: Router, public common: Common, private storeService: StoreService, private sharedService: SharedService,
     public util: Util, public _domSanitizationService: DomSanitizer) { }

  ngOnInit() {
    this.common.getCountries();
    this.signUpForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.pattern(AppConstant.phoneNumberRegEx)]),
      workPhone: new FormControl('', [Validators.required, Validators.pattern(AppConstant.phoneNumberRegEx)]),
      userEmail: new FormControl('', [Validators.required, Validators.pattern(AppConstant.emailRegex)]),
      credential: new FormControl('', [Validators.required, Validators.pattern(AppConstant.passwordRegex)]),
      confirmCredential: new FormControl('', [Validators.required]),
      hierarchyId: new FormControl(0),

      designation: new FormControl(),
      addressOne: new FormControl(),
      addressTwo: new FormControl(),
      countryId: new FormControl(),
      stateId: new FormControl(),
      city: new FormControl(),
      zip: new FormControl()
    }
    );
    this.getHierarchyList();
  }
 
  //Implemented setTimeOut because of expression change error that occured during unit testing
  ngAfterViewInit(){
    setTimeout(() => {
      this.isAnimation = true;
    }, 0);
  }

  onSubmit() {
    if (!this.isFormSubmitted) {
      // stop here if form is invalid
      if (this.signUpForm.invalid) {
        // mark form all field touched in case user click on save button
        this.util.markFormGroupTouched(this.signUpForm);
        return;
      }
      let formValue = this.signUpForm.value;
      formValue.clientId = this.common.storeClientInfo.id;
      let request = this.storeService.signUpClient( this.util.trimParamValues(this.signUpForm.value));
      this.isFormSubmitted = true;
      request.subscribe(response => {
        this.isFormSubmitted = false;
        if (response.responseCode == "S0001") {
          this.sharedService.openDialog('s', AppMessage.U0072, () => {
            this.router.navigate(['/store-login']);
          });
        }else {
          this.sharedService.openToast('e', AppMessage[response.errorCode] ? AppMessage[response.errorCode] : response.errorDescription);
        }
      }, error => { this.sharedService.onError(error) });
    }
  }


  getHierarchyList() {
    let param = {
      clientId: this.common.storeClientInfo.id
    }
    this.storeService.getHierarchy(param).subscribe(response => {
      if (response) {
        //this.isHierarchy = true;
        this.hierarchies = response.response;
      }
    }, error => { this.sharedService.onError(error) });
  }

  getStatesBasedOnCountry() {
    this.common.getStates(this.signUpForm.controls.countryId.value, (response) =>{
      this.statesList = response;
    })
  }

  fieldChanged(field, keys) {
    this.util.resetFormKeys(this.signUpForm, keys);
    if (field === 'countryId') {
      this.getStatesBasedOnCountry();
    }
  }

}
