import { Component, OnInit, ViewChild } from '@angular/core';
import { Enum } from '../../../shared/config/enum.enum';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { Util } from '../../../shared/services/util';
import { SharedService } from '../../../shared/services/shared.service';
import { ManageOrderService } from '../manage-order.service';

@Component({
  selector: 'app-manage-freight-detail',
  templateUrl: './manage-freight-detail.component.html',
  styleUrls: ['./manage-freight-detail.component.scss']
})
export class ManageFreightDetailComponent implements OnInit {

  @ViewChild('freightDetailForm') freightDetailForm;
  enum = Enum;
  data: any = {};
  appMessage = AppMessage;
  isFormValid: boolean = true;
  isFormSubmitted: boolean = false; // click only once on save button
  notes: string = "";

  constructor(private sharedService: SharedService, private manageOrderService: ManageOrderService, private util: Util) { }

  ngOnInit() {
  }

  getOrders(data) {
    this.data = data;
    this.data.dimensionDetails = this.data.freightDetails && this.data.freightDetails.dimensionDetails && this.data.freightDetails.dimensionDetails.length > 0
      ? this.data.freightDetails.dimensionDetails : [{ id: 0, length: '', width: '', height: '', weight: '', isActive: true }];
    this.notes = this.data.freightDetails && this.data.freightDetails.notes ? this.data.freightDetails.notes : '';
  }

  onAddDimensionItems() {
    this.data.dimensionDetails.push({ id: 0, length: '', width: '', height: '', weight: '', isActive: true });
  }

  onRemoveDimensionItems(index: number) {
    this.data.dimensionDetails.splice(index, 1);
  }

  submitFreightDetails(fn?) {
    if (this.checkValid() && !this.isFormSubmitted) {
      let param: any = {
        pathVariable: this.data.orderId,
        boxCount: this.data.dimensionDetails.length,
        dimensionDetails: this.data.dimensionDetails,
        notes: this.notes,
        freightDetailDisable: this.data.freightDetailDisable
      }
      this.isFormSubmitted = true;
      this.manageOrderService.updateFreigthDetails(param).subscribe(response => {
        this.isFormSubmitted = false;
        this.sharedService.onSuccess(response, 'U0110', (value) => {
          
          if (value) {
            return fn(true);
          }
        });
      }, error => { this.sharedService.onError(error) });
    } else {
      this.util.markFormGroupTouched(this.freightDetailForm.form);
    }

  }

  checkValid() {
    let valid = this.freightDetailForm.valid;
    //  get blank record 

    if(!this.data.freightDetailDisable){
      let arr1 = this.data.dimensionDetails.map(function (item) { if (!item.length) { return item.length } });
      if (this.data.dimensionDetails && arr1.includes("")) {
        valid = false;
      }
    }
    this.isFormValid = valid;

    return valid;
  }

  changeStatusToReadyToShip(fn?) {
    if (this.checkValid() && !this.isFormSubmitted) {   //this method is called to save the freight details before changing the status to ready to ship
      let param: any = {
        pathVariable: this.data.orderId,
        boxCount: this.data.dimensionDetails.length,
        dimensionDetails: this.data.dimensionDetails,
        notes: this.notes,
        freightDetailDisable: this.data.freightDetailDisable
      }
      this.isFormSubmitted = true;
      //this method is called first so that any changes done by user is also saved if they directly clicks on change status button
      this.manageOrderService.updateFreigthDetails(param).subscribe(response => {
        this.sharedService.onSuccess(response, null, (value) => {
          this.isFormSubmitted = false;
          if (value) {
            this.submit(fn);
          }
        });
      }, error => { this.sharedService.onError(error) });
    } else {
      this.util.markFormGroupTouched(this.freightDetailForm.form);
    }
  }

  submit(fn){
    let param: any = {
      pathVariable: this.data.orderId
    }
    this.manageOrderService.changeStatustoReadyToShip(param).subscribe(response => {
      this.sharedService.onSuccess(response, 'U0109', (value) => {
        this.isFormSubmitted = false;
        if (value) {
          return fn(true);
        }
      });
    }, error => { this.sharedService.onError(error) });
  }

}
