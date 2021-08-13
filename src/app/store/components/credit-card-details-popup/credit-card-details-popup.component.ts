import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppMessage } from './../../../shared/config/app-message.enum';
import { EncryptionService } from '../../../shared/services/encryption.service';
import { StoreService } from '../../service/store.service';
import { SharedService } from '../../../shared/services/shared.service';
import { Common } from '../../utility/common';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { FormControl, Validators } from '@angular/forms';
import { AppConstant } from './../../../shared/config/app-constant';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-credit-card-details-popup',
  templateUrl: './credit-card-details-popup.component.html',
  styleUrls: ['./credit-card-details-popup.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class CreditCardDetailsPopupComponent implements OnInit {

  @ViewChild('creditForm') creditForm;
  creditCardData:any = {}
  appMessage = AppMessage;
  isValid: boolean = true;
  appConstant = AppConstant;
  userCards: any = [];
  key: string = '';
  expiryDate = new FormControl(moment(null), Validators.required);
  selectedCard: any = {
    id: null,
    cardNo: ''
  };
  dateError: boolean = false;


  constructor(public dialogRef: MatDialogRef<CreditCardDetailsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private encryptionService: EncryptionService,
    private storeService: StoreService,
    private sharedService: SharedService,
    public common: Common
    ) {
    dialogRef.disableClose = true;   //to disable click outside of angular material dialog area to close the dialog
  }

  ngOnInit() {
    this.key = this.data.toString();
    this.getUserCreditCards();
  }

  saveCreditCard(){
    // if (!this.selectedCard.id && this.validateCard()) {
    if(this.checkDuplicateCard()) {
      this.sharedService.openDialog('e', AppMessage.U0181);
      return;
    }
    if (this.validateCard()) {
      // let cardDigits = this.creditCardData.number.toString().replace(/\d(?=\d{4})/g, "*");
      let cardDigits = this.creditCardData.number.toString().replace(/\d(?=.{4})/g, "*");
      this.creditCardData.expiryDate = (this.expiryDate.value.month() +1) + '/' + this.expiryDate.value.year();
      let encriptedDataTwo = this.encryptionService.encryptData(this.creditCardData, this.key);

      let dataToEncrypt = Object.assign({}, this.creditCardData);
      dataToEncrypt.number = cardDigits;
      let encriptedDataOne = this.encryptionService.encryptData(dataToEncrypt, this.key);
  
      let params = {
        "requestorId": this.data,
        "securityOne": encriptedDataOne,
        "securityTwo": encriptedDataTwo
      };
      this.storeService.saveCard(params).subscribe( (response) => {
        this.sharedService.onSuccess(response, AppMessage.U0175, value => {
          if (value) {
            this.common.placeOrderObj['cardId'] = response.response.id;
            this.selectedCard['cardNo'] = cardDigits;
            this.common.saveCartJson();
            this.dialogRef.close();
            this.sendCardAddedMessage();
          }
        })
      })
    }
  }

  validateCard(){
    let valid = this.creditForm.valid && this.expiryDate.valid && !this.dateError; // form required  
    this.isValid = valid; // used in HTML
    return valid;
  }

  chosenYearHandler(normalizedYear: Moment) {
    this.expiryDate.setValue(moment());   //to set the valid date beacuse initial null will give invalid moment date
    const ctrlValue = this.expiryDate.value;
    ctrlValue.year(normalizedYear.year());
    this.expiryDate.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.expiryDate.value;
    ctrlValue.month(normalizedMonth.month());
    this.expiryDate.setValue(ctrlValue);
    datepicker.close();
  }

  getUserCreditCards() {
    let param = {
      userId : this.data
    }
    this.storeService.getUserCreditCards(param).subscribe( (response) => {
      response.response.results.forEach( item => {
        item.securityOne = this.encryptionService.decryptData(item.securityOne, this.key);
      })
      this.userCards = response.response.results;
    })
  }

  onCardSelection(){
    this.selectedCard['cvv'] = '';
  }

  selectCard(cardId) {
    this.selectedCard['cvv'] = '';
    this.selectedCard.id = cardId;
    if(this.selectedCard['cvv']) {
      this.common.placeOrderObj['cardId'] = this.selectedCard.id;
      this.common.saveCartJson();
      let selectedCardObj = this.userCards.filter( i => i.cardId == this.selectedCard.id);
      this.selectedCard['cardNo'] = selectedCardObj[0].securityOne.number;
    }
  }

  selectOrderCard() {
    this.common.placeOrderObj['cardId'] = this.selectedCard.id;
    this.common.saveCartJson();
    let selectedCardObj = this.userCards.filter( i => i.cardId == this.selectedCard.id);
    this.selectedCard['cardNo'] = selectedCardObj[0].securityOne.number;
    this.dialogRef.close();
    // this.sharedService.openToast('s', AppMessage.U0175);
    this.sendCardAddedMessage();
  }

  sendCardAddedMessage() {
    let messageObj = {
      action: 'cardAdded',
      data: {
        cardId: this.common.placeOrderObj['cardId'],
        cardNo: this.selectedCard.cardNo
      }
    }
    this.sharedService.sendMessage(messageObj);
  }

  checkCvv() {
    return (!this.selectedCard.cvv || this.selectedCard.cvv.trim().length < 3 || isNaN(this.selectedCard.cvv)) ? true : false
  }

  deleteCard(cardId) {
    if(this.common.placeOrderObj['cardId'] ==  cardId) {
      this.sharedService.openDialog('s', AppMessage.U0177);
      return;
    }
    let _self = this;
    this.sharedService.confirmBox(AppMessage.U0178, function(result) {
      if(result) {

        let param = {
          cardId : cardId
        }
        _self.storeService.deleteCard(param).subscribe( (response) => {
          _self.sharedService.onSuccess(response, AppMessage.U0179, value => {
            if (value) {
              _self.userCards.forEach( (item, i) => {
                if(item.cardId == cardId) {
                  _self.userCards.splice(i, 1);
                }
              })
            }
          })
        })

      } 
    });

  }

  validateDate() {
    let curDate = new Date();
    if(this.expiryDate.value.year() < curDate.getUTCFullYear() ||
    (this.expiryDate.value.year() == curDate.getUTCFullYear() && this.expiryDate.value.month() < curDate.getMonth())
    ) {
      this.dateError = true;
    } else {
      this.dateError = false;
    }
  }

  checkDuplicateCard() {
    return this.userCards.some( i => {
      let cardInfo = this.encryptionService.decryptData(i.securityTwo, this.key);
      return cardInfo.number == this.creditCardData.number;
    });
  }
}
