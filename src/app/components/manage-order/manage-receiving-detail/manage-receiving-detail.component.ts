import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Enum } from '../../../shared/config/enum.enum';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { SharedService } from '../../../shared/services/shared.service';
import { ManageOrderService } from '../manage-order.service';
import { Util } from '../../../shared/services/util';

@Component({
  selector: 'app-manage-receiving-detail',
  templateUrl: './manage-receiving-detail.component.html',
  styleUrls: ['./manage-receiving-detail.component.scss']
})
export class ManageReceivingDetailComponent implements OnInit {

  @ViewChild('receiveDetailForm') receiveDetailForm;
  displayedColumns: string[] = ['productNumber', 'productName', 'categories', 'availableQuantity', 'orderedQuantity', 'receivedQuantity', 'lostQuantity', 'damageQuantity'];
  dataSource: any = new MatTableDataSource();
  noRecords: boolean = false;
  enum = Enum;
  data: any = {};
  appMessage = AppMessage;
  isFormValid: boolean = true;
  isFormSubmitted: boolean = false; // click only once on save button
  warehouses = [];
  invalidProductNames: string = '';
  returnDetails: any = [];
  dateError: boolean = false;

  constructor(private sharedService: SharedService, private manageOrderService: ManageOrderService, public util: Util) { }

  ngOnInit() {
    this.getWarehouse();
  }

  getOrders(data) {
    this.data = data;
    this.data.orderReceiveDate = this.data.orderReceiveDate ? this.util.displayFormattedDate(this.data.orderReceiveDate) : new Date();
    let arr = data.productInfoList;
    let arr1: any = [];
    arr.forEach(item => {
      if (item.isShipped && item.isReturnable) {
        arr1.push(item);
      }
    });
    this.dataSource.data = arr1;
    this.noRecords = this.dataSource.data.length > 0 ? false : true;
  }

  submitReceivingDetails(fn?) {
    if (this.checkValid() && !this.isFormSubmitted) {
      if(this.checkForeGreaterQty()){   //check whether quantity of lost/received/damaged is greater than product ordered quantity
        let param1 = this.getReturnDetails();
        param1.pathVariable = this.data.orderId;
        this.isFormSubmitted = true;
        this.manageOrderService.updateReceivingDetail(param1).subscribe(response => {
          this.sharedService.onSuccess(response, 'U0110', (value) => {
            this.isFormSubmitted = false;
            if (value) {
              return fn(true);
            }
          });
        }, error => { this.sharedService.onError(error) });
      }else{
        this.sharedService.openToast('e', this.invalidProductNames + AppMessage.U0121);
      }
    }
    else {
      this.util.markFormGroupTouched(this.receiveDetailForm.form);
    }

  }

  checkValid() {
    let valid = this.receiveDetailForm.valid;
    //  get blank record 
    if (!this.data.orderReceiveDate) {
      valid = false;
    }
    if (!this.data.warehouseId) {
      valid = false;
    }
    this.isFormValid = valid;
    return valid;
  }

  changeStatusToReturned(fn?) {
    if (this.checkValid() && !this.isFormSubmitted) {
      let param1 = this.getReturnDetails();
      param1.pathVariable = this.data.orderId;
      this.isFormSubmitted = true;
      this.manageOrderService.updateReceivingDetail(param1).subscribe(response => {
        this.sharedService.onSuccess(response, null, (value) => {
          this.isFormSubmitted = false;
          if (value) {
            if (this.validateQuantity()) {
              this.submit(fn);
            }
            else {
              this.sharedService.openToast('e', this.invalidProductNames + AppMessage.U0121);
            }
          }
        });
      }, error => { this.sharedService.onError(error) });
    }
    else {
      this.util.markFormGroupTouched(this.receiveDetailForm.form);
    }
  }

  submit(fn) {
    let param: any = {
      pathVariable: this.data.orderId
    }
    this.manageOrderService.changeStatusToReturned(param).subscribe(response => {
      this.sharedService.onSuccess(response, 'U0117', (value) => {
        this.isFormSubmitted = false;
        if (value) {
          return fn(true);
        }
      });
    }, error => { this.sharedService.onError(error) });
  }

  changeStatusToComplete(fn?) {
    if (this.checkValid() && !this.isFormSubmitted) {
      if (this.validateQuantity()) {
        let param = this.getReturnDetails();
        param.pathVariable = this.data.orderId;
        this.isFormSubmitted = true;
        this.manageOrderService.changeStatusToComplete(param).subscribe(response => {
          this.sharedService.onSuccess(response, 'U0116', (value) => {
            this.isFormSubmitted = false;
            if (value) {
              return fn(true);
            }
          });
        }, error => { this.sharedService.onError(error) });
      }
      else {
        this.sharedService.openToast('e', this.invalidProductNames + AppMessage.U0121);
      }
    }
  }

  /**Validate that the quantity of lost/received/damaged should always be equal to product ordered quantity
   * If not, then show a toast message with product names on it
  */
  validateQuantity() {
    let valid = true;
    this.invalidProductNames = "";
    this.dataSource.data.forEach(item => {
      if (item.orderedQuantity != Number(item.receiveQuantity) + Number(item.lostQuantity) + Number(item.damageQuantity)) {
        this.invalidProductNames += item.productName;
        valid = false;
      }
    });
    return valid;
  }

  /**
   * Validate at the time of submitting that whether quantity of lost/received/damaged is greater than product ordered quantity
   * If not, then show a toast message with product names on it
   */
  checkForeGreaterQty(){
    let valid = true;
    this.invalidProductNames = "";
    this.dataSource.data.forEach(item => {
      if (item.orderedQuantity < Number(item.receiveQuantity) + Number(item.lostQuantity) + Number(item.damageQuantity)) {
        this.invalidProductNames += item.productName;
        valid = false;
      }
    });
    return valid;
  }

  /**
   * Get the return detail json for put API of submit receiving details
   */
  getReturnDetails() {
    this.returnDetails = {
      receivingNote : this.data.receivingNote,
      returnDetails : []
    };
    this.dataSource.data.forEach(item => {
      this.returnDetails.returnDetails.push({
        damageQuantity: item.damageQuantity ? item.damageQuantity : 0, lostQuantity: item.lostQuantity ? item.lostQuantity : 0, orderProductId: item.id, warehouseId: this.data.warehouseId,
         productId: item.productId,receivedDate: this.util.formatDate(this.data.orderReceiveDate), receivedQuantity: item.receiveQuantity ? item.receiveQuantity : 0
      });
    });
    return this.returnDetails;
  }


  getWarehouse() {
    this.manageOrderService.getWarehouseList().subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        if (response.response) {
          this.warehouses = response.response;
        }
      });
    }, error => { this.sharedService.onError(error) });
  }

}
