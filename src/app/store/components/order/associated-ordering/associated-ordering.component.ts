import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatStepper } from '@angular/material';
import { Common } from '../../../../store/utility/common';

@Component({
  selector: 'app-associated-ordering',
  templateUrl: './associated-ordering.component.html',
  styleUrls: ['./associated-ordering.component.scss']
})
export class AssociatedOrderingComponent implements OnInit {

  //@ViewChild(AssociateProductComponent) associateProductComponent: any;
  stepForm: FormGroup;
  @ViewChild('stepper') private myStepper: MatStepper;
  stepSummary: any = [];

  constructor(public dialogRef: MatDialogRef<AssociatedOrderingComponent>, public common: Common,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;   //to disable click outside of angular material dialog area to close the dialog
  }

  ngOnInit() {
    this.stepForm = new FormGroup({
      associateOrderingStep: new FormArray([])
    });
    this.data.steps.forEach((x, index) => {
      if(!x.isStepEmpty){  //only add that steps whose atleast one associate products are in active stage
        this.stepForm.controls.associateOrderingStep['controls'].push(this.createSteps());
        this.stepForm.controls.associateOrderingStep['controls'][index].patchValue(x);
      }
    });
  }

  createSteps(): FormGroup {
    return new FormGroup({
      id: new FormControl(0),
      isRequired: new FormControl(true),
      stepName: new FormControl(''),
      stepDescription: new FormControl(''),
      associateBrowseProduct: new FormControl([]),
      isProductAdded: new FormControl([]),
      quantity: new FormControl('')
    });
  }

  /**
   * When user clicks on close then remove all the products which was added in cart 
   * Also, revert there alreadyadded quantity of that product and update the cart count
   */
  close() {
    this.common.closeAssociateAndOnDemandPopup(this.data);
    this.dialogRef.close();
  }

  // stepperChange($event){
  //   let stepDetail = this.stepForm.controls.associateOrderingStep['controls'][$event.selectedIndex - 1].value;
  //   this.validateStep(stepDetail);
  //   //this.associateProductComponent.isAssociateProductDetail = false;
  // }

  submitAssociateOrdering(step) {
    if (step.isRequired && step.isProductAdded) {
      if (this.common.storeClientInfo && this.common.storeClientInfo.isServicePageEnable){
        this.common.onLinkClick('services');
      }else{
        this.common.onLinkClick('orderdetail');
      }   
      this.dialogRef.close();
    } else if (!step.isRequired) { //if step is not required then move forward
      if (this.common.storeClientInfo && this.common.storeClientInfo.isServicePageEnable){
        this.common.onLinkClick('services');
      }else{
        this.common.onLinkClick('orderdetail');
      }   
      this.dialogRef.close();
    }
  }

  validateStep(step, stepper?: MatStepper) {
    if (step.isRequired && step.isProductAdded) {  //if step is required and its product added then move forward
      stepper.next();
    } else if (!step.isRequired) { //if step is not required then move forward
      stepper.next();
    }
  }

  valid(step) {
    if (step.isRequired && step.isProductAdded) {  //if step is required and its product added then move forward
      return true;
    } else if (!step.isRequired) { //if step is not required then move forward
      return true;
    } else {
      return false;
    }
  }

}
