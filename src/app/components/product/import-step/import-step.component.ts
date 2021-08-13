import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { SharedService } from './../../../shared/services/shared.service';
import { ProductsService } from '../products.service';
import { AppMessage } from './../../../shared/config/app-message.enum';

@Component({
  selector: 'app-import-step',
  templateUrl: './import-step.component.html',
  styleUrls: ['./import-step.component.scss']
})
export class ImportStepComponent implements OnInit {
  
  @ViewChild('searchProdInput') searchProdInput: ElementRef;
  //searchText = new FormControl();
  searchText: string = '';
  //filteredOptions: any = [];
  noResult: boolean = false;
  productsList: any = [];
  inputPrimary: Observable<string>;
  selectedProdStepsList : Array<any> = [];
  displayedColumns: string[] = ['productId', 'productName', 'categories'];
  isSearched:boolean = false;
  selectedStepsList : any = [];
  isDisabled:boolean = true;

  constructor(public dialogRef: MatDialogRef<ImportStepComponent>,private productService:ProductsService,
    private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
  }

  searchProduct() {
    if (this.searchText.length >= 3) {
      let params: any = {
        clientId: localStorage.getItem('selectedClientId'),
        productName: this.searchText
      }
      this.productService.searchProduct(params).subscribe(response => {
        this.sharedService.onSuccess(response, null, () => {
          if (response.response) {
            this.productsList = response.response;
          }
        });
      }, error => { this.sharedService.onError(error) });
    }
    // else if (this.searchText.length == 0) {
    //   this.productsList = [];
    // }
  }

  getProductById(option, evt: any) {
    if (evt.source.selected && option) {     //this is a turn around of angular material that onSelectionChange event is triggering twice whenever you change the option
      this.noResult = false;  //no record error is visible for the 1st time when filtered option is blank as it takes time to load
      let param = {
        pathVariable: option.productId,
        clientId: localStorage.getItem('selectedClientId')
    }
    this.productService.getProductById(param).subscribe(response => {
        this.sharedService.onSuccess(response, null, () => {
            if (response.response) {
            this.isSearched = true;
              this.selectedProdStepsList = response.response.steps;
            }
        });
    }, error => { this.sharedService.onError(error) });
    }
  }
  
   //add selected step to list or delete selected step from list
   selectStep(event, index) {
     if((this.data.steps.length + this.selectedStepsList.length) == 5 && event.checked){
       this.isDisabled = true;
       this.sharedService.openToast('e',AppMessage.U0166);
     }else{
       this.isDisabled = false;
       if(event.checked){
        this.selectedProdStepsList[index].id = 0;
        this.selectedProdStepsList[index].products.forEach(x=>{
          x.id = 0;
        })
        this.selectedStepsList.push(this.selectedProdStepsList[index]);
       }else{
        this.selectedStepsList.splice(this.selectedStepsList.indexOf(this.selectedProdStepsList[index]), 1);
       }
     }
  }

  close() {
    this.dialogRef.close();
  }

  clear() {
    this.noResult = false;
    this.searchText = "";
    this.productsList = [];
    this.selectedProdStepsList = [];
    this.isSearched = false;
  }

  import(){
    this.dialogRef.close(this.selectedStepsList);
  }

}
