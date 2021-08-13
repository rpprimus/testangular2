import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../inventory.service';
import { SharedService } from '../../../shared/services/shared.service';
import { FormControl } from '@angular/forms';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { Util } from '../../../shared/services/util';

@Component({
  selector: 'app-inventory-availability',
  templateUrl: './inventory-availability.component.html',
  styleUrls: ['./inventory-availability.component.scss']
})
export class InventoryAvailabilityComponent implements OnInit {
  @Output()productId: EventEmitter<any> = new EventEmitter<any>();
  noRecords: boolean = false;
  displayedColumns: string[] = ['totalquantity', 'availablequantity', 'onorderquantity'];
  dataSource = new MatTableDataSource();
  id: number = 0;
  fromDate = new FormControl(new Date());
  toDate = new FormControl(new Date());
  fromDateError: boolean = false;
  toDateError: boolean = false;
  appMessage = AppMessage;

  constructor(private sharedService: SharedService, private inventoryService: InventoryService, private _activatedRoute: ActivatedRoute,private util:Util) { }

  ngOnInit() {
    this.id = this._activatedRoute.snapshot.params['id'];
    this.getInventoryAvailability();
  }

  getInventoryAvailability() {
    if (!this.fromDateError && !this.toDateError) {
      let param: any = {
        clientId: localStorage.getItem('selectedClientId'),
        productId: this.id,
        fromDate: this.util.formatDate(this.fromDate.value),
        toDate: this.util.formatDate(this.toDate.value)
      }
      this.inventoryService.getInventoryAvailability(param).subscribe(response => {
        this.sharedService.onSuccess(response, null, () => {
          this.dataSource.data = [response.response];
          this.productId.emit(response.response.productId);
          this.noRecords = this.dataSource.data.length > 0 ? false : true;
        });
      }, error => { this.sharedService.onError(error) });
    }
  }

  dateChange(value){
    let date = (value == 'toDate' ? this.toDate.value : this.fromDate.value);
    this.util.formatDate(date);
    this.validateDate(value);
  }

  //validate date that start date is not greater than end date and end date to be not less than start date
  validateDate(value) {
    if ((Date.parse(this.fromDate.value) > Date.parse(this.toDate.value))) {
      value == 'toDate' ? this.toDateError = true : this.fromDateError = true;
    }
    else {
      this.toDateError = false;
      this.fromDateError = false;
    }
  }


}
