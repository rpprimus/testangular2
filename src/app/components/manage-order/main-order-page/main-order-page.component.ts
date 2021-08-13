import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageOrderDetailComponent } from '../manage-order-detail/manage-order-detail.component';
import { SharedService } from '../../../shared/services/shared.service';
import { ManageOrderService } from '../manage-order.service';
import { ActivatedRoute } from '@angular/router';
import { Enum } from '../../../shared/config/enum.enum';
import { ManageFreightDetailComponent } from '../manage-freight-detail/manage-freight-detail.component';
import { ManageShipmentDetailComponent } from '../manage-shipment-detail/manage-shipment-detail.component';
import { ManageReceivingDetailComponent } from '../manage-receiving-detail/manage-receiving-detail.component';
import { Util } from '../../../shared/services/util';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-main-order-page',
  templateUrl: './main-order-page.component.html',
  styleUrls: ['./main-order-page.component.scss']
})
export class MainOrderPageComponent implements OnInit {

  @ViewChild(ManageOrderDetailComponent) orderDetail;
  @ViewChild(ManageFreightDetailComponent) freightDetail;
  @ViewChild(ManageShipmentDetailComponent) shipmentDetail;
  @ViewChild(ManageReceivingDetailComponent) receivingDetail;
  id: number = 0;
  data: any = {};
  enum = Enum;
  showReturnButton: boolean = false;
  isEventEnabled: boolean = true;
  hasPermission:boolean = false;  //show the action button in case of logged in user is admin or account manager.If team then only show the Freight and Returned btns
  isReturnable:boolean = true;

  constructor(private _activatedRoute: ActivatedRoute,private authService: AuthService, private sharedService: SharedService, private manageOrderService: ManageOrderService, public util: Util) {
    this.util.currentPageLink = 'orders';
   }

  ngOnInit() {
    this.id = this._activatedRoute.snapshot.params['id'] ? this._activatedRoute.snapshot.params['id'] : 0;
    if (this.id > 0) {
      this.getOrders();
    }
    this.hasPermission = this.authService.isRoleExists([Enum.CreditCard_Admin,Enum.ADMIN,Enum.MANAGER]);
  }

  getOrders() {
    let param: any = {
      orderId: this.id
    }
    this.manageOrderService.getOrders(param).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        if (response.response) {
          this.data = response.response;
          this.isEventEnabled = this.data.eventDetails ? true : false;
          if(Enum['Order_' + this.data.orderStatus] > 4){
            this.checkForNotReturnableStatus();
          }
          if (this.data.warehouseId) {
            this.showReturnButton = true;
          }
          this.getData();
        }
      });
    }, error => { this.sharedService.onError(error) });
  }

  getData() {
    this.orderDetail.getOrders(this.data);
    if (!this.util.isStore && Enum['Order_' + this.data.orderStatus] != 8) {
      setTimeout(() => {
        if (Enum['Order_' + this.data.orderStatus] >= 3) {
          this.freightDetail.getOrders(this.data);
        }
        if (Enum['Order_' + this.data.orderStatus] >= 4) {
          this.shipmentDetail.getOrders(this.data);
        }
        if (Enum['Order_' + this.data.orderStatus] >= 5 && this.isEventEnabled && this.isReturnable) {
          this.receivingDetail.getOrders(this.data);
        }
      }, 0);
    }
  }


  updateOrderStatus() {
    switch (this.data.orderStatus) {
      case Enum.Order_Placed:
        this.orderDetail.updateOrder((value) => {
          if (value) {
            this.getOrders(); //to call the get orders to change the status from placed to confirmed
          }
        });
        break;
      case Enum.Order_Confirmed:
        this.orderDetail.updateOrder((value) => {
          if (value) {
            this.getOrders();
          }
        });
        break;
      case Enum.Order_Processing:
        this.freightDetail.submitFreightDetails((value) => {
          if (value) {
            this.getOrders();
            /* 
            // commented because order won't be updated from here (to be removed later)
            this.orderDetail.updateEventShipping((value) => {
              if (value) {
                this.getOrders();
              }
            }); */
          }
        });
        break;
      case Enum.Order_Ready_to_ship:
        this.shipmentDetail.submitShipmentDetails((value) => {
          if (value) {
            this.getOrders();
            /* this.orderDetail.updateEventShipping((value) => {
              if (value) {
                this.getOrders();
              }
            }); */
          }
        });
        break;
      case Enum.Order_Shipped:
        this.receivingDetail.submitReceivingDetails((value) => {
          if (value) {
            this.getOrders();
          }
        });
        break;
      case Enum.Order_Received:
        this.receivingDetail.submitReceivingDetails((value) => {
          if (value) {
            this.getOrders();
          }
        });
        break;
    }
  }

  releaseToWorkShop() {
    this.orderDetail.changeStatusToProcessing((value) => {
      if (value) {
        this.getOrders();
      }
    });
  }

  readyToShip() {
    this.freightDetail.changeStatusToReadyToShip((value) => {
      if (value) {
        this.getOrders();
        /* this.orderDetail.updateEventShipping((value) => {
          //to save the event details section before changing status
          if (value) {
            this.getOrders();
          }
        }); */
      }
    });
  }

  shipped() {
    this.shipmentDetail.changeStatusToShipped((value) => {
      if (value) {
        this.getOrders();
        /* this.orderDetail.updateEventShipping((value) => { 
          //to save the event details section before changing status
          if (value) {
            this.getOrders();
          }
        }); */
      }
    });
  }

  returned() {
    this.receivingDetail.changeStatusToReturned((value) => {
      if (value) {
        this.getOrders();
      }
    });
  }

  /**
   * If event was enabled for client at the time of placing the order then user will complete the order after filling the receiving details
   * else order can be completed directly after the order has been successuly shipped- in this case send the return details empty
   */
  complete() {
    if (this.isEventEnabled && this.isReturnable) {
      this.receivingDetail.changeStatusToComplete((value) => {
        if (value) {
          this.getOrders();
        }
      });
    }
    else {
      let param: any = {};
      param.pathVariable = this.data.orderId;
      // param.returnDetails = [];
      this.manageOrderService.changeStatusToComplete(param).subscribe(response => {
        this.sharedService.onSuccess(response, 'U0116', (value) => {
          if (value) {
            this.getOrders();
          }
        });
      }, error => { this.sharedService.onError(error) });
    }
  }

  /**
   * this btn will be enabled only in store page and when the status of order is in PLACED state
   * User can cancel the order from here
  */
  cancelOrder() {
    let param = {
      pathVariable: this.id
    }
    this.sharedService.confirmBox(AppMessage['U0091'], (result) => { //show a confirm dialog box before canceling the order
      if (result) {
        this.manageOrderService.cancelOrder(param).subscribe(response => {
          this.sharedService.onSuccess(response, null, () => {
            this.sharedService.openToast('s', AppMessage['U0092']);
            this.getOrders();
          });
        }, error => { this.sharedService.onError(error) });
      }
    });
  }

  //download order functionality
  printOrder() {
    let param = {
      orderId: this.id
    }
    this.manageOrderService.printOrder(param).subscribe((response: any) => {
      if (response.body.type != 'application/json') { // application/json means there is no any report and we get error code for this case
        this.util.downloadFile(response);
        this.sharedService.openToast('s', AppMessage.U0145);
      } else {
        this.sharedService.openToast('e', AppMessage.U0143);
      }
    }, error => this.sharedService.onError(error));

  }

  productDeleteChange(event:boolean){
    if(event){
      this.getOrders();
    }
  }

  /**
   * If all the products are not returnable then show the status to complete the order
   * in such case, no need to show the receiving section details
   */
  checkForNotReturnableStatus(){
    let products = this.data.productInfoList;
    let returnableProducts: any = [];
    products.forEach(prod => {
      if (prod.isShipped && prod.isReturnable) {
        returnableProducts.push(prod);
      }
    });
    this.isReturnable = returnableProducts.length > 0 ? true : false;
  }

  /**
   * Display the ready to ship button only when the order is in processing stage
   * Second condition: If the Freight details not mandatory check is enabled then display the button
   * else check whether a single box dimensions are saved or not
   * else return false
   */
  checkToEnableReadyToShip():boolean{
    let isEnable = false;
    if(this.data.orderStatus == Enum.Order_Processing){
      if(!this.data.freightDetailDisable){
        if(this.data.freightDetails 
          && this.data.freightDetails.dimensionDetails && this.data.freightDetails.dimensionDetails.length > 0){
            isEnable = true;
          }else{
            isEnable = false;
          }
      }else{
        isEnable = true;
      }
    }else{
      isEnable = false;
    }
    return isEnable;
  }

  /**
   * Display the Shipped button only when the order is in ready to ship stage
   * Second condition: If the Tracking details not mandatory check is enabled then display the button
   * else check whether atleast 1 tracking details are available or not
   * else return false
   */
  checkToEnableShipped():boolean{
    let isDisplay = false;
    if(this.hasPermission && this.data.orderStatus == Enum.Order_Ready_to_ship){
      if(!this.data.isorderCarrierDetailDisable){
        if(this.data.orderCarrierDetails && this.data.orderCarrierDetails.length > 0){
            isDisplay = true;
          }else{
            isDisplay = false;
          }
      }else{
        isDisplay = true;
      }
    }else{
      isDisplay = false;
    }
    return isDisplay;
  }
}
