import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { StoreService } from '../../service/store.service';
import { Common } from '../../utility/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { PrintEventComponent } from '../print-event/print-event.component';
import { SharedService } from '../../../shared/services/shared.service';
import { Enum } from '../../../shared/config/enum.enum';

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss']
})
export class EventCalendarComponent implements OnInit {

  calendarOptions: any;
  events: any = [];
  canAddEdit: boolean = true;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(private storeService: StoreService, private common: Common, private router: Router, private dialog: MatDialog,
    private sharedService: SharedService) { }
  ngOnInit() {
    
    this.setCalendarOptions();
    this.getAllEvents();
    this.checkForPermission();
  }

  setCalendarOptions() {
    
    this.calendarOptions = {
      editable: false,
      eventLimit: 3,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: []
    };
  }

  startEndDateChanges(data) {
    data.forEach(element => {
      let d = new Date(this.common.displayDate(element.end));
      d.setDate(d.getDate() + 1); // add one more day into end date (due to some time Issue)
      element.end = d;
      let d1 = new Date(this.common.displayDate(element.start));
      d1.setDate(d1.getDate()); // convert into date and set into start date
      element.start = d1;
    });
    this.events = data;
  }

  getAllEvents() {
    
    let param = {
      clientId: this.common.storeClientInfo.id
    }
    this.storeService.getAllEvents(param).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        this.startEndDateChanges(response.response);
      });
    });
  }

  openAddEventDialog(id?) {

    if(id){
      this.router.navigate(['/events/' + id]);
    }else{
      this.router.navigate(['/events']);
    }
    
  }

  eventClick(eventDetail) {
    
    this.openAddEventDialog(eventDetail.event.id);

  }

  onAddBtnClick() {
    this.openAddEventDialog();
  }

  clickButton(detail) {
    // console.log(detail);
  }

  /**
   * If the role of the logged in user is only "User" and event module is disabled then only event edit is not possible
   * else for every other case, event can be created and edited
   */
  checkForPermission() {
    this.common.loadModulesCustomFields(() => {
      let data = this.common.modulesCustomFields;
      if (data) {
        let storeUserData = this.common.storeUserInfo.getValue();
         //check that if the logged in user has only 1 role and that role is store user also if addevent checked is false then user cannot edit events
        if(!data.eventModuleDetails.isAddEventChecked && storeUserData.roles.length == 1 && storeUserData.roles[0] == Enum.Store_User){
          this.canAddEdit = false;
        }else{
          this.canAddEdit = true;
        }
      }
    });
  }

  openPrintPopUp() {
    this.dialog.open(PrintEventComponent, {
      data: {
        content: 'Event Report'
      }
    })
  }
}

