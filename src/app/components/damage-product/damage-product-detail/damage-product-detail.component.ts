import { Component, OnInit, ViewChild } from '@angular/core';
import { Util } from '../../../shared/services/util';
import { MatTableDataSource } from '@angular/material';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { AppConstant } from '../../../shared/config/app-constant';
import { ActivatedRoute, Router } from '@angular/router';
import { DamageProductService } from '../damage-product.service';
import { SharedService } from '../../../shared/services/shared.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-damage-product-detail',
  templateUrl: './damage-product-detail.component.html',
  styleUrls: ['./damage-product-detail.component.scss']
})
export class DamageProductDetailComponent implements OnInit {

  @ViewChild('damageDetailForm') damageDetailForm;
  defaultImageSrc: string = "./assets/images/frame-landscape-placeholder.svg";
  displayedColumns: string[] = ['productNo', 'productName', 'categories', 'OrderedQuantity', 'ReceivedQuantity', 'DamageQuantity', 'fixedQuantity', 'trashQuantity'];
  dataSource: any = new MatTableDataSource();
  noRecords: boolean = false;
  isFormValid: boolean = true;
  isFormSubmitted: boolean = false;  //if form is submitted once then no action to perform on save button
  id: number = 0;
  data: any = {};
  appConstant = AppConstant;
  appMessage = AppMessage;
  fixedQtyDifference: number = 0;
  trashQtyDifference: number = 0;
  fixedQtyError: boolean = false;
  trashQtyError: boolean = false;
  isDisabled: boolean = false; //disable the form if status of the damage detail is Inactive
  reportError: string = '';

  constructor(private activatedRoute: ActivatedRoute, private damageProductService: DamageProductService, private router: Router,
    private sharedService: SharedService, public util: Util, public _domSanitizationService: DomSanitizer) {
      this.util.currentPageLink = 'damageproduct';
     }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'] ? this.activatedRoute.snapshot.params['id'] : 0;
    this.data = {
      damageResouces: [],
    }
    if (this.id > 0) {
      this.getDamageProductDetail();
    }
  }

  getDamageProductDetail() {
    let param = {
      clientId: localStorage.getItem('selectedClientId'),
      id: this.id
    }
    this.damageProductService.getDamageProducts(param).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        if (response.response) {
          this.data = response.response;
          this.dataSource.data = [this.data];
          this.noRecords = this.dataSource.data.length > 0 ? false : true;
          if (!this.noRecords) {
            this.isDisabled = this.data.status == "INACTIVE" ? true : false;
            this.dataSource.data.forEach(x => {
              x.currentFixedQty = x.fixedQuantity;
              x.currentTrashQty = x.trashQuantity;
            });
          }
        }
      });
    }, error => { this.sharedService.onError(error) });
  }

  navigateToList() {
    this.router.navigate(['/damageproduct']);
  }

  submitDamageDetails() {
    if (this.validateForm()) {
      if (this.data.damageQuantity == Number(this.data.currentFixedQty) + Number(this.data.currentTrashQty)) {
        this.sharedService.confirmBox(AppMessage['U0137'], (result) => { //show a confirm dialog box before status change
          if (result) {
            this.submit();
          }
        });
      }
      else {
        this.submit();
      }
    }
  }

  submit() {
    if (!this.isFormSubmitted) {
      let param: any = {
        clientId: localStorage.getItem('selectedClientId'),
        fixedQuantity: this.fixedQtyDifference,
        id: this.id,
        report: this.data.report,
        trashQuantity: this.trashQtyDifference
      };
      this.isFormSubmitted = true;
      this.damageProductService.updateDamageProductDetail(param).subscribe(response => {
        this.isFormSubmitted = false;
        this.sharedService.onSuccess(response, 'U0132', (value) => {
          if (value) {
            this.router.navigate(['/damageproduct']);
          }
        });

      }, error => { this.sharedService.onError(error) });
    }
  }

  validateForm() {
    this.reportError = '';
    let valid = this.damageDetailForm.valid; // form required  
    if (!this.validateQuantity()) {   //validate the category required
      valid = false;
    }
    if (this.fixedQtyError || this.trashQtyError) {
      valid = false;
    }
    // if (valid) {
    //   if (this.util.validateCkEditor(false)) { //validate the character count and space trial in ckeditor
    //     valid = true;
    //   }
    //   else {
    //     valid = false;
    //   }
    // }
    this.util.validateCkEditor(false, (value, msg) => {    //validate the character count and space trial in ckeditor
      if (!value) {
        if (msg == 'count') {
          this.reportError = AppMessage.U0139;
          valid = false;
        }
        else if (msg == 'space') {
          this.reportError = AppMessage.U0054;
          valid = false;
        }
        else {
          this.reportError = '';
        }
      }
    });
    this.isFormValid = valid; // used in HTML
    return valid;
  }

  /**
   * validate that summation of fixed and trash qty is always less than or equal to damage qty
   * if true the save the difference of values and send it in api as a param
   */
  validateQuantity(): boolean {
    if (this.data.currentFixedQty.toString() != '' && this.data.currentTrashQty.toString() != '') {
      if (this.data.damageQuantity >= Number(this.data.currentFixedQty) + Number(this.data.currentTrashQty)) {
        this.fixedQtyDifference = Number(this.data.currentFixedQty) - this.data.fixedQuantity;
        this.trashQtyDifference = Number(this.data.currentTrashQty) - this.data.trashQuantity;
        return true;
      }
      else {
        this.sharedService.openToast('e', AppMessage.U0134);
        return false;
      }
    }
    else {
      this.sharedService.openToast('e', AppMessage.U0054);
      return false;
    }
  }

  //current values of the quantity will always be greater than or equals to the previous quantity
  validateChangeQty(value) {
    if (value == 'fixed') {
      this.fixedQtyError = this.data.fixedQuantity > Number(this.data.currentFixedQty) ? true : false;
    } else {
      this.trashQtyError = this.data.trashQuantity > Number(this.data.currentTrashQty) ? true : false;
    }
  }

}
