import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { SharedService } from '../../../shared/services/shared.service';
import { InventoryService } from '../inventory.service';
import { ActivatedRoute } from '@angular/router';
import { AppConstant } from '../../../shared/config/app-constant';
import { Util } from '../../../shared/services/util';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.scss']
})
export class InventoryDetailsComponent implements OnInit {
  @ViewChild('inventoryDetailForm') inventoryDetailForm;
  noRecords: boolean = false;
  id: number = 0;
  displayedColumns: string[] = ['warehouseName', 'totalQuantity','modifiedquantity', 'updatedQuantity', 'reason', 'notes','link'];
  dataSource = new MatTableDataSource();
  totalRecords: number = 0;
  pageNumber: number = 1; // save current page number and increase it by 1 in case of lazy loading.
  appMessage = AppMessage;
  appConstant = AppConstant;
  updateReason:any = [];
  isFormSubmitted: boolean = false;  //if form is submitted once then no action to perform on save button
  isFormValid: boolean = true;
  isUpdateInventory:boolean = false;

  constructor(private sharedService: SharedService,private inventoryService:InventoryService,private _activatedRoute: ActivatedRoute,private util: Util) { }

  ngOnInit() {
    this.id = this._activatedRoute.snapshot.params['id'];
    this.getInventoryUpdateReason();
    this.getInventoryDetailList();
  }

  getInventoryDetailList(pageNumber = 1, loadMore?) {
      let param: any = {
        pathVariable: pageNumber,
        pageSize: 10,
        productId: this.id
      }
      this.inventoryService.getInventoryDetail(param).subscribe(response => {
        this.sharedService.onSuccess(response, null, () => {
          this.pageNumber = response.response.paginationInfo.curPage; // save current page value
          this.totalRecords = response.response.paginationInfo.totalRecords;
          let data = this.dataSource.data;
          if (loadMore) {
            data.push.apply(data, response.response.results);
          } else {
            data = [];
            data.push.apply(data, response.response.results);
          }
           data.forEach(x => {
             Object.assign(x, { 'isEdit': false });
             Object.assign(x, { 'isRequired': false });
             Object.assign(x, { 'updatedQuantity': Number(0) });   //assigned this value to solve the problem of NAN on updated quantity at the time of edit
           });
          this.dataSource.data = data;
          this.noRecords = this.dataSource.data.length > 0 ? false : true;
        });
      });
  }

  getInventoryUpdateReason(){
    this.inventoryService.getUpdateInventoryReason().subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        if (response.response) {
          this.updateReason = response.response;
        }
      });
    }, error => { this.sharedService.onError(error) });
  }

  onScroll() {
    if (this.dataSource.data.length < this.totalRecords) {
      this.getInventoryDetailList(this.pageNumber + 1, true);
    }
  }

  getUpdatedValue(item:any){
    let value = item.totalQuantity +  Number(item.updatedQuantity);
    return isNaN(value) ? 0 : value;
  }

  //restrict the updated quantity to be not less negative of the total quantity
  restrictUpdatedQuantity(item){
    item.updatedQuantity = item.totalQuantity +  Number(item.updatedQuantity) < 0 ? 0 : item.updatedQuantity;
  }

  updateInventoryDetail(item:any){
    if (this.isValid(item) && !this.isFormSubmitted) {
      this.isFormSubmitted = true;
      Object.assign(item, { 'pathVariable': item.id });
      delete item.id;
      delete item.isEdit;
      delete item.totalQuantity;
      delete item.warehouseName;
      delete item.isRequired;
      item.updatedQuantity = Number(item.updatedQuantity);
      this.inventoryService.updateInventoryDetail(item).subscribe(response => {
        this.isFormSubmitted = false;
        this.sharedService.onSuccess(response, 'U0069', (value) => {
          
          if (value) {
            item.isEdit = false;
            item.isRequired = false;
            this.isFormValid = true;
            this.isUpdateInventory = false;
            this.getInventoryDetailList();
            this.util.isUpdateInventory.next(true);
          } 
        });

      }, error => { this.sharedService.onError(error) });
    }
  }

  isValid(item) {
    let valid = this.inventoryDetailForm.valid; // form required
    if(!item.reasonId){
      valid = false;
    }
    if(item.notes && item.notes.trim().length == 0){
      valid = false;
    }
    this.isFormValid = valid; // used in HTML
    return valid;
  }

  close(item){
    item.isEdit = false;
    item.isRequired = false;
    item.updatedQuantity = 0;
    delete item.notes;
    delete item.reasonId;
    this.isUpdateInventory = false;
  }

}
