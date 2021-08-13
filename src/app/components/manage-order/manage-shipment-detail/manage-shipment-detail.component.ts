import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';
import { ManageOrderService } from '../manage-order.service';
import { Enum } from '../../../shared/config/enum.enum';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { Util } from '../../../shared/services/util';
import { MatTableDataSource } from '@angular/material';
import { AppConstant } from '../../../shared/config/app-constant';

@Component({
  selector: 'app-manage-shipment-detail',
  templateUrl: './manage-shipment-detail.component.html',
  styleUrls: ['./manage-shipment-detail.component.scss']
})


export class ManageShipmentDetailComponent implements OnInit {

  @ViewChild('shipmentDetailForm') shipmentDetailForm;
  displayedColumns: string[] = ['productNumber', 'productName', 'categories', 'availableQuantity', 'orderedQuantity', 'Shipped', 'NotShipped', 'Reason'];
  dataSource: any = new MatTableDataSource();
  noRecords: boolean = false;
  enum = Enum;
  data: any = {};
  appMessage = AppMessage;
  isFormValid: boolean = true;
  isFormSubmitted: boolean = false; // click only once on save button
  shipmentReason: any = [];
  orderShipmentDetails: any = [];
  orderCarrierDetails: any = [];
  selectedAll: boolean = false;
  appConstant= AppConstant;

  constructor(private sharedService: SharedService, private manageOrderService: ManageOrderService, private util: Util) { }

  ngOnInit() {
    this.getShipmentReason();
  }

  getOrders(data) {
    this.data = data;
    this.dataSource.data = data.productInfoList;
    this.noRecords = data.productInfoList.length > 0 ? false : true;
    this.orderCarrierDetails = this.data.orderCarrierDetails && this.data.orderCarrierDetails.length > 0
      ? this.data.orderCarrierDetails : [{ carrierId: 0, carrier: '', trackingNumber: '', isActive: true }];
    if (!this.noRecords) {   //to disable the shipment column if the product has been successfully shipped
      this.dataSource.data.forEach(item => {
        item.alreadyShipped = item.isShipped ? true : false;
      });
      this.checkSelectedAll();
    }
  }

  onAddCarrierDetailItems() {
    this.orderCarrierDetails.push({ carrierId: 0, carrier: '', trackingNumber: '', isActive: true });
  }

  onRemoveCarrierDetailItems(index: number) {
    this.orderCarrierDetails.splice(index, 1);
  }

  getOrderShipmentDetail() {
    this.orderShipmentDetails = [];
    this.dataSource.data.forEach(item => {
      this.orderShipmentDetails.push({ id: item.id, isShipped: item.isShipped ? item.isShipped : false, reasonId: item.reasonId ? item.reasonId : 0 });
    });
  }

  submitShipmentDetails(fn?) {
    if (this.checkValid() && !this.isFormSubmitted) {
      this.getOrderShipmentDetail();
      let param: any = {
        pathVariable: this.data.orderId,
        orderShipmentDetails: this.orderShipmentDetails,
        orderCarrierDetails: this.orderCarrierDetails,
        isorderCarrierDetailDisable: this.data.isorderCarrierDetailDisable
      }
      this.isFormSubmitted = true;
      this.manageOrderService.updateCarrierDetails(param).subscribe(response => {
        this.isFormSubmitted = false;
        this.sharedService.onSuccess(response, 'U0110', (value) => {
          
          if (value) {
            return fn(true);
          }
        });
      }, error => { this.sharedService.onError(error) });
    }
    else {
      this.util.markFormGroupTouched(this.shipmentDetailForm.form);
    }

  }

  //Validate the tracking and carrier details only when the check is enabled
  checkValid() {
    let valid = this.shipmentDetailForm.valid;
    if(!this.data.isorderCarrierDetailDisable){
      let arr1 = this.orderCarrierDetails.map(function (item) { if (!item.carrier) { return item.carrier } });
      if (this.orderCarrierDetails && arr1.includes("")) {
        valid = false;
      }
    }
    this.isFormValid = valid;
    return valid;
  }


  getShipmentReason() {
    this.manageOrderService.getShipmentReasons().subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        if (response.response) {
          this.shipmentReason = response.response;
        }
      });
    }, error => { this.sharedService.onError(error) });
  }

  /**
   * Change the status to shipped if following conditions are met
   * Check whether there is any product which is not shipped then show a confirmation box 
   * if all the products are not shipped then show a error dialog box with Ok button
   * if all products are shipped then directly change the status and Hit the API
   */
  changeStatusToShipped(fn?) {
    let shippedProdList = [];
    this.data.productInfoList.forEach(prod => {
      if(!prod.isShipped){
        shippedProdList.push(prod);
      }
    });
    if(shippedProdList.length == this.data.productInfoList.length){
      this.sharedService.openDialog('e', AppMessage.U0161);
    }
    else if(shippedProdList.length > 0){
      this.sharedService.confirmBox(AppMessage.U0115, (result) => { //show a confirm dialog box before status change
        if (result) {
          this.shipped(fn);
        }
      });
    } else {
      this.shipped(fn);
    }


    // if (!this.ifNotShipped()) {
    //   this.sharedService.confirmBox(AppMessage['U0115'], (result) => { //show a confirm dialog box before status change
    //     if (result) {
    //       this.shipped(fn);
    //     }
    //   });
    // } else {
    //   this.shipped(fn);
    // }
  }

  shipped(fn?) {
    if (this.checkValid() && !this.isFormSubmitted) {
      this.getOrderShipmentDetail();
      let param: any = {
        pathVariable: this.data.orderId,
        orderShipmentDetails: this.orderShipmentDetails,
        orderCarrierDetails: this.orderCarrierDetails,
        isorderCarrierDetailDisable: this.data.isorderCarrierDetailDisable,
      }
      this.isFormSubmitted = true;
      //this method is called first so that any changes done by user is also saved if they directly clicks on change status button
      this.manageOrderService.updateCarrierDetails(param).subscribe(response => {
        this.sharedService.onSuccess(response, null, (value) => {
          this.isFormSubmitted = false;
          if (value) {
            this.submit(fn);
          }
        });
      }, error => { this.sharedService.onError(error) });
    }
    else {
      this.util.markFormGroupTouched(this.shipmentDetailForm.form);
    }
  }

  submit(fn) {
    let param: any = {
      pathVariable: this.data.orderId
    }
    this.manageOrderService.changeStatustoShipped(param).subscribe(response => {
      this.sharedService.onSuccess(response, 'U0114', (value) => {
        this.isFormSubmitted = false;
        if (value) {
          return fn(true);
        }
      });
    }, error => { this.sharedService.onError(error) });
  }

  /**
   * To check whether there is any product which is not shipped then show a confirmation box means return false
   */
  // ifNotShipped() {
  //   let valid = true;
  //   this.data.productInfoList.some(function (item) {
  //     if (!item.isShipped) {
  //       return valid = false;
  //     }
  //   });
  //   return valid;
  // }

  toggleShipped(item) {
    item.isShipped = !item.isShipped;
    this.checkSelectedAll();
  }

  markAllShipped() {
    this.dataSource.data.forEach(prod => {
      if(!prod.alreadyShipped){
        prod.isShipped = this.selectedAll ? true : false;
      }
    });
  }

  //enable disable the ship all checkbox in header
  checkSelectedAll() {
    let selectedCount = 0;
    this.dataSource.data.forEach(item => {
      item.isShipped ? selectedCount++ : selectedCount--;
    });
    this.selectedAll = selectedCount == this.dataSource.data.length ? true : false;
  }

}
