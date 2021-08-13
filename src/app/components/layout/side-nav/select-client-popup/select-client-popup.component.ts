import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClientService } from '../../../../shared/services/http-client.service';
import { AppUrl } from '../../../../shared/config/app-url.enum';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AppMessage } from '../../../../shared/config/app-message.enum';
import { Common } from '../../../../store/utility/common';

@Component({
  selector: 'app-select-client-popup',
  templateUrl: './select-client-popup.component.html',
  styleUrls: ['./select-client-popup.component.scss']
})
export class SelectClientPopupComponent implements OnInit {

  clients: any = [];
  searchText = new FormControl();
  filteredOptions: any = [];
  noResult:boolean = false;
  appMessage = AppMessage;

  constructor(public dialogRef: MatDialogRef<SelectClientPopupComponent>, private http: HttpClientService, private router: Router,private common:Common,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    data.autoFocus = true;
    dialogRef.disableClose = true;   //to disable click outside of angular material dialog area to close the dialog
  }

  ngOnInit() {
    this.getClients();
     this.searchText.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.noResult = false;
      this.filteredOptions =  this._filter(value && value.trim());
      if (this.filteredOptions.length == 0) {
        this.noResult = true;
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.clients.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getClients() {
    this.http.get(AppUrl.getFilteredClient).subscribe(response => {
      if (response.response) {
        this.clients = response.response.results;
        this.filteredOptions = this.clients;
      }
    });
  }

  /**Store the value of selected client in local storage */
  clientSelected(client,evt: any) {
    if (evt.source.selected && client) {     //this is a turn around of angular material that onSelectionChange event is triggering twice whenever you change the option
      this.data.isClientSelected = true;
      this.data.clientInfo = client;
    }
  }

  select() {
    if(!this.noResult){
      localStorage.setItem('selectedClientInfo', JSON.stringify(this.data.clientInfo));   //to store the value of selected client such that it can be naviagted to store
      localStorage.setItem('selectedClientId', this.data.clientInfo.id);  //this is maintained so that other pages are not affected
      this.common.getLogo(this.data.clientInfo.id);   //get the logo of selected client
      this.dialogRef.close(true);
    }
  }

  close() {
    this.dialogRef.close();
    this.router.navigate([this.data.previousPath]);
  }

  clear() {
    this.noResult = false;
    this.data.isClientSelected = false;
    this.searchText.setValue('');
    this.filteredOptions = this.clients;
  }

}
