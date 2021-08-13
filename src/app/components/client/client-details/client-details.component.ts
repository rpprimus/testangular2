import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MyErrorStateMatcher } from '../../../core/error-state-matcher';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { SharedService } from '../../../shared/services/shared.service';
import { Util } from '../../../shared/services/util';
import { ClientService } from '../client.service';

declare var CKEDITOR;

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  appMessage = AppMessage;
  matcher = new MyErrorStateMatcher();
  addClientForm: FormGroup;
  id: number = 0;
  isFormSubmitted: boolean = false;  //if form is submitted once then no action to perform on save button
  domainFieldWidth: any = ''; // dyanamic width for domain field
  domainValue : string = "";
  
  constructor(private _activatedRoute: ActivatedRoute, private clientService: ClientService,
    private sharedService: SharedService, public util: Util) { }

  ngOnInit() {
    this.addClientForm = new FormGroup({
      name: new FormControl('', Validators.required),
      domain: new FormControl('', Validators.required),
    });
    this.util.clientId = this._activatedRoute.snapshot.params['id'] ? this._activatedRoute.snapshot.params['id'] : 0;

    if (this.util.clientId > 0) {
      this.getClientById();
    }

    this.addClientForm.controls.domain.valueChanges
      .subscribe(value => {
        this.domainFieldWidth = (value.length + 2) * 8.5;
      });
  }

  
//this is done avoid the error caused by ckeditor because it is initialized in theme settings but is not available in DOM at the time load
  ngAfterViewInit() {      
    if (typeof CKEDITOR !== 'undefined') {
      for (var instanceName in CKEDITOR.instances) {
        if (typeof CKEDITOR.instances[instanceName] !== 'undefined') {
          CKEDITOR.instances[instanceName].destroy();
        }
      }
    }
  }

  //Edit Section
  getClientById() {
    let param: any = {
      pathVariable: this.util.clientId
    }
    this.clientService.getClientDetailById(param).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        if (response.response && response.response.client) {
          let userData = response.response.client;
          this.addClientForm.controls.domain.disable();
          this.addClientForm.patchValue(userData);
          this.domainValue = userData.domain;
        //  this.domainFieldWidth = (userData.domain.length + 2) * 8.5;
          this.util.storeCreated.next(userData.isStoreCreated);
        }
      });
    }, error => { this.sharedService.onError(error) });
  }

  /**
   * Check Form all fields are valid or not : if valid hit request
   * If client Id > 0 then put request else post request
   */
  submitClientDetailForm(fn?) {
    if (!this.checkFormValidation() && !this.isFormSubmitted) {
      let param = this.addClientForm.getRawValue();
      param.name = param.name.trim();
      param.domain = param.domain.trim();
      param.pathVariable = this.util.clientId;
      let request = this.clientService.submitClientDetail(param, this.util.clientId > 0 ? 'put' : 'post');
      this.isFormSubmitted = true;
      request.subscribe(response => {
        this.isFormSubmitted = false;
        this.sharedService.onSuccess(response, 'U0008', (value) => {
          
          if (value) {
            this.domainValue = param.domain;
            //this.addClientForm.controls.domain.disable();
            return fn(response);
          }
        });

      }, error => { this.sharedService.onError(error) });
    }
    else {
      // mark form all field touched in case user click on save button
      this.util.markFormGroupTouched(this.addClientForm);
    }
  }

  // Validate the form
  checkFormValidation(): boolean {
    let error: boolean;
    if (!this.addClientForm.valid) {
      error = true;
    } else {
      error = false;
    }
    return error;
  }

}
