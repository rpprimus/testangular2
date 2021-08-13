import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppMessage } from '../../../../shared/config/app-message.enum';
import { Util } from '../../../../shared/services/util';
import { FormControl } from '@angular/forms';
import { Common } from '../../../utility/common';
import { StoreService } from '../../../service/store.service';
import { Enum } from '../../../../shared/config/enum.enum';

@Component({
  selector: 'app-event-pop-up',
  templateUrl: './event-pop-up.component.html',
  styleUrls: ['./event-pop-up.component.scss']
})
export class EventPopUpComponent implements OnInit {
  @ViewChild('addEventForm') addEventForm;
  isSelectEvent: boolean = false;
  isAddEvent: boolean = false;
  eventName: string = '';
  eventStartDate: any = new Date();
  eventEndDate: any = new Date();
  startDateError: boolean = false;
  endDateError: boolean = false;
  appMessage = AppMessage;
  isFormValid: boolean = true;
  events: any = [];
  searchText = new FormControl();
  filteredOptions: any = [];
  name: string = '';
  start: any = new Date();
  end: any = new Date();
  eventId:number = 0;
  minDate = new Date(); //used in html for disabling previous dates from the calender
  selectEventError:boolean = false;
  noRecord:boolean = false;
  isAddButtonVisible:boolean = true;

  constructor(public dialogRef: MatDialogRef<EventPopUpComponent>, private util: Util, private storeService: StoreService,
    private common: Common, @Inject(MAT_DIALOG_DATA) public data: any) {
    data.autoFocus = true;
    dialogRef.disableClose = true;   //to disable click outside of angular material dialog area to close the dialog
    this.minDate.setDate(this.minDate.getDate() + 1);   // set the minimum date to the next date as per requirement because user cannot place order for today or previous date
    this.end = this.eventEndDate.setDate(this.eventEndDate.getDate() + 1);   // set the minimum date to the next date as per requirement
    this.start = this.eventStartDate.setDate(this.eventStartDate.getDate() + 1);   // set the minimum date to the next date as per requirement
  }
  ngOnInit() {
    this.getEvents();
    this.searchText.valueChanges.subscribe(value => {
      this.noRecord = false;
      this.filteredOptions = this._filter(value && value.trim());
      if (this.filteredOptions.length == 0) {
        this.noRecord = true;
      }
    });
     //add event button will only be hidden when only store user is logged in and add event checkbox is unchecked on admin setting
     let storeUser = this.common.storeUserInfo.getValue();
     if (storeUser && storeUser.roles.length == 1 && storeUser.roles[0] == Enum.Store_User && !this.common.storeClientInfo.storeUserAddEvent) {
       this.isAddButtonVisible = false;
     }
    // if(this.common.isStoreUserRoleExists([Enum.Store_User]) && !this.common.storeClientInfo.storeUserAddEvent){
    //   this.isAddButtonVisible =false;
    // }
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.events.filter(option => option.title.toLowerCase().includes(filterValue));
  }

  getEvents() {
    let param = {
      futureStatus: true,
      clientId: this.common.storeClientInfo.id
    }
    this.storeService.getAllEvents(param).subscribe(response => {
      if (response.response) {
        this.events = response.response;
        this.filteredOptions = this.events;
      }
    });
  }

  selectEvent() {
    this.isSelectEvent = true;
    this.isAddEvent = false;
  }

  addEvent() {
    this.isSelectEvent = false;
    this.isAddEvent = true;
  }

  backBtnEvent(){
    this.isSelectEvent = false;
    this.isAddEvent = false;
  }

   /**Store the value of selected event in local storage and call get event by selected event id*/
  selectEventSubmit() {
    if(this.name){
      this.selectEventError = false;
      localStorage.setItem('eventStartDate', this.start);
      localStorage.setItem('eventEndDate', this.end);
      localStorage.setItem('eventName', this.name);
      localStorage.setItem('eventId', this.eventId.toString());
      this.getEventById();
      this.dialogRef.close(true);
    }
    else{
      this.selectEventError = true;
    }
  }

  eventSelected(event,evt: any) {
    if (evt.source.selected && event) {     //this is a turn around of angular material that onSelectionChange event is triggering twice whenever you change the option
      this.selectEventError = false;
      this.name = event.title;
      this.start = event.start;
      this.end = event.end;
      this.eventId = event.id;
    }
  }

  clear() {
    this.noRecord = false;
    this.selectEventError = false;
    this.searchText.setValue('');
    this.filteredOptions = this.events;
    this.name="";
    this.eventId=0;
  }

  //get event by selected id and store its information in the event section or order details
   getEventById() {
    let param = {
      eventId: this.eventId
    }
    this.storeService.getEvent(param).subscribe(response => {
      this.common.placeOrderObj.eventDetails = response.response;
      this.common.getCountries();
    });
  }

  //validate date that start date is not greater than 90 days from current date and end date to be not less than start date
  validateDate(value) {
    // if (value == 'eventStart') {
    //   let curr_date = new Date();
    //   var timeDiff = Math.abs(this.eventStartDate.getTime() - curr_date.getTime());
    //   let dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
    //   if (dayDifference > 90) {
    //     this.startDateError = true;
    //   }
    //   else {
    //     this.startDateError = false;
    //   }
    // }
    if ((Date.parse(this.eventStartDate) > Date.parse(this.eventEndDate))) {
      this.endDateError = true;
    }
    else {
      this.endDateError = false;
    }
  }

  addNewEventSubmit() {
    if (this.validateForm()) {
      let result: any = {};
      result.eventName = this.eventName;
      result.eventStartDate = this.util.formatDate(this.eventStartDate);
      result.eventEndDate = this.util.formatDate(this.eventEndDate);
      localStorage.setItem('eventStartDate', result.eventStartDate);
      localStorage.setItem('eventEndDate', result.eventEndDate);
      localStorage.setItem('eventName', result.eventName);
      this.dialogRef.close(result);
    }
  }

  validateForm() {
    let valid = this.addEventForm.valid; // form required  
    if (this.startDateError) {   //validate the start date 90 days criterion
      valid = false;
    }
    if (this.endDateError) {   //validate the end date is greater than start date
      valid = false;
    }

    this.isFormValid = valid; // used in HTML
    return valid;
  }

}
