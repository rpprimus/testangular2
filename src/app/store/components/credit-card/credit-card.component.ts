import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreditCardDetailsPopupComponent } from '../credit-card-details-popup/credit-card-details-popup.component';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {

  @Input('data') data: any;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  /**
 * Display a dialog box which adds the detail of credit card or display the already saved card
 */
  openCreditCardDetails() {
    this.dialog.open(CreditCardDetailsPopupComponent, {
      data: this.data
    });
  }

}
