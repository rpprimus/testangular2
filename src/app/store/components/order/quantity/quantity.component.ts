import { Component, OnInit, Input } from '@angular/core';
import { AppMessage } from '../../../../shared/config/app-message.enum';
import { AppConstant } from '../../../../shared/config/app-constant';
@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss']
})
export class QuantityComponent implements OnInit {

  @Input() data: any;
 // quantityError: boolean = false;
  appMessage = AppMessage;
  appConstant = AppConstant;
  requiredQty: any;

  constructor() { }

  ngOnInit() {
    this.data.orderedQuantity = this.data.orderedQuantity ? this.data.orderedQuantity : 0;
    this.data.quantityError = true;
  }

  /** validate the quantity entered that is should not be greater than available quantity 
   * then check whether ordered quantity is not greater than max order quantity 
   * Finally show the error message with minimum qty which can be availed in the error
  */
  // quantityValidation() {
  //   if (this.data.availableQuantity < this.data.orderedQuantity) {
  //     this.quantityError = true;
  //     this.data.quantityError = true;
  //   }
  //   else {
  //     if (this.data.maxOrderQuantity < this.data.orderedQuantity) {
  //       this.quantityError = true;
  //       this.data.quantityError = true;
  //     }
  //     else {
  //       this.quantityError = false;
  //       this.data.quantityError = false;
  //     }
  //   }
  //   if (this.quantityError) {
  //     this.data.availableQuantity < this.data.maxOrderQuantity ? this.requiredQty = "available quantity : " + this.data.availableQuantity : this.requiredQty = "maximum order quantity : " + this.data.maxOrderQuantity == null ? 0 : this.data.maxOrderQuantity;
  //   }
  //   return this.quantityError;
  // }

  increaseQuantity() {
    this.data.orderedQuantity = this.data.orderedQuantity + 1;
  }

  decreaseQuantity() {
    this.data.orderedQuantity = this.data.orderedQuantity - 1;
  }

}
