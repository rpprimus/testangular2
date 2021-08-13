import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { Util } from '../../../shared/services/util';
import { AppUrl } from '../../../shared/config/app-url.enum';
import { SharedService } from '../../../shared/services/shared.service';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { Common } from '../../utility/common';

@Component({
  selector: 'app-print-event',
  templateUrl: './print-event.component.html',
  styleUrls: ['./print-event.component.scss']
})
export class PrintEventComponent implements OnInit {
  @ViewChild('printEventForm') printEventForm;
  eventStartDate: any = new Date();
  eventEndDate: any = new Date();
  startDateError: boolean = false;
  endDateError: boolean = false;
  appMessage = AppMessage;
  isFormValid: boolean = true;

  constructor(private http: HttpClientService, private util: Util, private common: Common, private sharedService: SharedService, public dialogRef: MatDialogRef<PrintEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    data.autoFocus = true;
    dialogRef.disableClose = true;   //to disable click outside of angular material dialog area to close the dialog
  }

  ngOnInit() {
    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    this.eventStartDate = new Date(y, m, 1);  //to set default start date as the 1st date of the current month
    this.eventEndDate = new Date(y, m + 1, 0); //to set default end date as the last date of the current month 
  }

  dateChange(value) {
    value == 'eventStart' ? this.validateDate(this.eventStartDate) : this.validateDate(this.eventEndDate);
  }

  //validate date that start date is not greater than end date and end date to be not less than start date
  validateDate(value) {
    if ((Date.parse(this.eventStartDate) > Date.parse(this.eventEndDate))) {
      value == 'eventStart' ? this.startDateError = true : this.endDateError = true;
    }
    else {
      this.startDateError = false;
      this.endDateError = false;
    }
  }

  printEvent() {
    if (!this.startDateError && !this.endDateError) {
      let param: any = {
        clientId: this.common.storeClientInfo.id,
        startDate: this.util.formatDate(this.eventStartDate),
        endDate: this.util.formatDate(this.eventEndDate)
      }
      this.http.getFiles(AppUrl.eventReport, param).subscribe((response: any) => {
        if (response.body.type != 'application/json') { // application/json means there is no any report and we get error code for this case
          this.util.downloadFile(response);
          this.sharedService.openToast('s', AppMessage.U0142);
          this.dialogRef.close();
        } else {
          this.sharedService.openToast('e', AppMessage.U0143);
        }
      }, error => this.sharedService.onError(error));
    }
  }
}
