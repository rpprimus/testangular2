import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { UserService } from '../user.service';
import { SharedService } from '../../../shared/services/shared.service';
import { AppConstant } from '../../../shared/config/app-constant';
import { Util } from '../../../shared/services/util';
//import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { MyErrorStateMatcher } from '../../../core/error-state-matcher';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  @ViewChild('matChip') matChipEvent;
  title: string;
  appMessage = AppMessage;
  matcher = new MyErrorStateMatcher();
  addUserForm: FormGroup;
  clients = [];
  roles = [];
  selectedClient = [];
  selectedRole = [];
  roleError: boolean = false;
  clientError: boolean = false;
  isSelectAll: boolean = false;
  id: number = 0;
  isFormSubmitted: boolean = false;
  filteredOptions = [];
  //clientName:any = '';
  noResult: boolean = false;
  //Chip Value
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  keyUp = new Subject<string>();
  searchText = new FormControl();

  constructor(private router: Router, private _activatedRoute: ActivatedRoute, private userService: UserService, private sharedService: SharedService, private util: Util) {
    this.util.currentPageLink = 'users';
   }

  ngOnInit() {
    
    this.title = "Add User";
    this.addUserForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(AppConstant.emailRegex)]),
      name: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required,Validators.pattern(AppConstant.phoneNumberRegEx)])
    });
    this.id = this._activatedRoute.snapshot.params['id'] ? this._activatedRoute.snapshot.params['id'] : 0;
    if (this.id > 0) {
      this.getUserById();
    }
    this.getClients();
    this.getRoles();

    // Trim Name value
    // this.addUserForm.controls.name.valueChanges
    //   .debounceTime(10)
    //   .subscribe(res => {
    //     if (res) {
    //       this.addUserForm.controls.name.setValue(res.replace(/^\s+/g, ''));
    //     }
    //   });

    //auto-search
    // const observable = this.keyUp
    // .map(value => (event))
    // .debounceTime(300)
    // .subscribe((data) => {
    //   this.noResult = false;
    //   this.filteredOptions = this._filter(this.clientName);
    //   if(this.filteredOptions.length == 0){
    //     this.clientError = false;
    //     this.noResult = true;
    //   }
    // });
    this.searchText.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(value => {
      this.noResult = false;
      //this.addUserForm.markAsDirty(); //mark the form as dirty and enable the submit btn
      this.filteredOptions = this._filter(value && value.trim());
      if (this.filteredOptions.length == 0) {
        this.clientError = false;
        this.noResult = true;
      }
    });
  }

  /**
   * Return the value of search in client dropdown
   * @param value each letter in client search field
   */
  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.clients.filter(val => val.name.toLowerCase().includes(filterValue));
  }

  getClients() {   //data for client dropdown
    if (this.id > 0) {
      let param: any = {
        pathVariable: this.id
      }
      this.userService.getClientsById(param).subscribe(response => {
        this.clients = response.response.results;
        this.filteredOptions = this.clients;
        this.clients.forEach(data => {
          this.clientSelected(data);
        });
      });
    }
    else {
      this.userService.getClients().subscribe(response => {
        this.clients = response.response.results;
        this.filteredOptions = this.clients;
      });
    }
  }

  getRoles() {     //data for roles
    let param: any;
    if (this.id > 0) {
      param = {
        pathVariable: this.id
      }
    }
    else {
      param = {
        userType: 'internal'
      }
    }
    this.userService.getRoles(param).subscribe(response => {
      this.roles = response.response.results;
      if (this.id > 0) {
        this.roles.forEach(data => {
          this.roleSelected(data);
        });
      }
    });
  }

  roleSelected(selected) {         //updating roles array if any checkbox is clicked
    //this.addUserForm.markAsDirty(); //mark the form as dirty and enable the submit btn
    let index = this.selectedRole.indexOf(selected.id);
    if (index == -1) {
      this.roleError = false;
      if (selected.checked) {
        this.selectedRole.push(selected.id);
      }
    }
    else {
      this.selectedRole.splice(this.selectedRole.indexOf(selected.id), 1)
    }
  }

  clientSelected(selectedData) {  //updating clients array if any checkbox is clicked
    let index = this.selectedClient.indexOf(selectedData.id);
    if (index == -1) {
      this.clientError = false;
      if (selectedData.checked) {
        this.selectedClient.push(selectedData);
      }
    }
    else {
      this.selectedClient.splice(this.selectedClient.indexOf(selectedData), 1)
    }
    if (this.selectedClient.length == this.clients.length) {
      this.isSelectAll = true;
    } else {
      this.isSelectAll = false;
    }
    //this.clientName = "";
    this.searchText.setValue('');
    this.matChipEvent.nativeElement.value = "";
    this.filteredOptions = this.clients;
  }

  findIndex(name) {
    let index = -1;
    if (this.selectedClient) {
      for (let i = 0; i < this.selectedClient.length; i++) {
        if (this.selectedClient[i].id == name.id) {
          index = i;
        }
      }
    }
    return index;
  }

  /**Select a client and store its data in array
   * Also update the checked field of select All if all clients are selected
   */
  setClients(selectedData) {
    //this.addUserForm.markAsDirty(); //mark the form as dirty and enable the submit btn
    let index = this.findIndex(selectedData);
    if (index == -1) {
      this.clientError = false;
      this.selectedClient.push(selectedData);
    }
    if (this.selectedClient.length == this.clients.length) {
      this.isSelectAll = true;
    } else {
      this.isSelectAll = false;
    }
    //this.clientName = "";
    this.searchText.setValue('');
    this.matChipEvent.nativeElement.value = "";
    this.filteredOptions = this.clients;
  }

  //Remove individual chip
  remove(name: any): void {
    //this.addUserForm.markAsDirty(); //mark the form as dirty and enable the submit btn
    let index = this.selectedClient ? this.selectedClient.indexOf(name) : null;
    if (index >= 0) {
      this.selectedClient.splice(index, 1);
    }
    if (this.selectedClient.length == this.clients.length) {
      this.isSelectAll = true;
    } else {
      this.isSelectAll = false;
    }
  }

  /** Select All Functionality of Client dropdown
   * if all selected then save data into array or remove it
   * display checkbox checked
  */
  selectAll() {
    //this.addUserForm.markAsDirty(); //mark the form as dirty and enable the submit btn
    this.selectedClient = [];
    let toggleStatus = this.isSelectAll;
    for (let i = 0; i < this.clients.length; i++) {
      this.clients[i].checked = toggleStatus;
      if (this.clients[i].checked) {
        this.selectedClient.push(this.clients[i]);
      }
      else {
        this.selectedClient.splice(this.selectedClient.indexOf(this.clients[i]), 1)
      }
    }
    if (!toggleStatus) {
      this.selectedClient = [];
      this.isSelectAll = false;
    }
    else {
      this.isSelectAll = true;
      this.clientError = false;
    }
  }

  submitUserForm() {         //Submit the form
    if (!this.checkFormValidation() && !this.isFormSubmitted) {
      let param = this.addUserForm.getRawValue();
      param.name = param.name.trim();
      param.email = param.email.trim();
      param.isSelectAll = this.isSelectAll;
      let clients = [];
      this.selectedClient.forEach(x => {
        clients.push(x.id);
      })
      param.clientId = clients;
      param.roleId = this.selectedRole;
      param.pathVariable = this.id;
      let request = this.userService.submitUser(param, (this.id > 0 && !this.util.isClone) ? 'put' : 'post');
      this.isFormSubmitted = true;
      request.subscribe(response => {
        this.isFormSubmitted = false;
        this.sharedService.onSuccess(response, 'U0001', (value) => {
          
          if (value) {
            this.resetUserForm();
            this.router.navigate(['/users']);
          }

        });
      }, error => { this.sharedService.onError(error) });
    }
  }

  /** Validate the form
   * check for validation of roles and clients
   */
  checkFormValidation(): boolean {
    let error: boolean=false;
    this.clientError = false;
    this.roleError = false;

    if (!this.addUserForm.valid) {
      error = true;
    }
    if (this.checkValidation(this.selectedClient)) {
      this.clientError = true;
      error = true;
    }
    if (this.checkValidation(this.selectedRole)) {
      this.roleError = true;
      error = true
    }
    return error;
  }

  /**Check whether the Array have atleast 1 field selected */
  checkValidation(array: any) {
    ;
    let error: boolean;
    if (array.length > 0) {
      error = false;
    }
    else {
      error = true;
    }
    return error;
  }

  resetUserForm() {    //reset form functionality
    this.selectedClient = [];
    this.selectedRole = [];
    this.roleError = false;
    this.clientError = false;
    this.isSelectAll = false;
    this.roles.forEach(role => {
      role.checked = false;
    });
    this.clients.forEach(client => {
      client.checked = false;
    })
    this.addUserForm.reset();
  }

  //Edit Section
  getUserById() {
    let param: any = {
      pathVariable: this.id
    }
    this.userService.getUserById(param).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        let userData = response.response;
        if (this.util.isClone) {
          this.addUserForm.setValue({ email: '', name: '',phoneNumber: '' });
        }
        else {
          this.title = "User Details";
          this.addUserForm.patchValue(userData);
        }
      });
    }, error => { this.sharedService.onError(error) });
  }

}