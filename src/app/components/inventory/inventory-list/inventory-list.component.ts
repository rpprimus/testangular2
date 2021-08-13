import { Component, OnInit, ViewChild } from '@angular/core';
import { Util } from '../../../shared/services/util';
import { MatSort, MatTableDataSource } from '@angular/material';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { SharedService } from '../../../shared/services/shared.service';
import { forkJoin } from 'rxjs';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  @ViewChild(MatSort) inventorySort: MatSort;
  displayedColumns: string[] = ['productNumber', 'productname', 'category', 'visibilitygroup', 'warehouse', 'totalquantity'];
  dataSource = new MatTableDataSource();
  sortParam: any = '';
  noRecords: boolean = false;
  totalRecords: number = 0;
  filterCat: any = [{ categories: ['category', 'visibility Group','warehouse'], queryParams: ['categoryIds', 'visibilityGroupIds', 'warehouseIds'] }];
  filterValues: any = [];
  tempFilterValues: any = [];
  filterParam: any = '';
  pageNumber: number = 1; // save current page number and increase it by 1 in case of lazy loading.
  isVisibility: boolean = true; //to check whether visibility for client is enabled 

  constructor( private util: Util, private sharedService: SharedService,private inventoryService:InventoryService) {
    this.util.currentPageLink  = "inventory";
  }

  ngOnInit() {
    let invArr = JSON.parse(localStorage.getItem(window.location.pathname));
    if(invArr){
      this.filterParam = invArr;
    }
    this.getInventorySettings();
    this.getInventoryList();
    this.inventorySort.sortChange.subscribe((value) => {
      this.sortParam = { orderBy: value.direction, sortedOnField: value.active };
      this.getInventoryList();
    });
  }

  /**
   * IF sorted params applied then we have to send that params on each next request while we are on this page.
   * @param pageNumber to save current page number and increase at scroll
   * @param loadMore: optional - if scrolled down page and lazy load then true
   */
  getInventoryList(pageNumber = 1, loadMore?) {
    if (localStorage.getItem('selectedClientId') != null) {
      let params: any = {
        pathVariable: pageNumber,
        clientId: localStorage.getItem('selectedClientId'),
        pageSize: 50,
      }
      if (this.filterParam) {
        Object.assign(params, this.filterParam);
      }
      if (this.sortParam && this.sortParam.orderBy) {
        Object.assign(params, this.sortParam);
      }
      this.inventoryService.getInventoryList(params).subscribe(response => {
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
          this.dataSource.data = data;
          this.sharedService.sequenceList = response.response.sequenceList;
          this.noRecords = this.dataSource.data.length > 0 ? false : true;
        });
      });
    } else {
      this.sharedService.openToast('e', AppMessage.U0026);
    }
  }

  onChangeFilter(data: any) {
    this.filterParam = data;
    if(this.filterParam){
      localStorage.setItem(window.location.pathname,JSON.stringify(this.filterParam));
    }else{
      localStorage.removeItem(window.location.pathname);
    }
    this.getInventoryList();
  }

  onScroll() {
    if (this.dataSource.data.length < this.totalRecords) {
      this.getInventoryList(this.pageNumber + 1, true);
    }
  }

  
  /**
   * if visibility of client is enabled then only show visibility in list column and in advance filter
   */
  getInventorySettings() {
    this.isVisibility = true;
    let param: any = {
      pathVariable: localStorage.getItem('selectedClientId')
    }
    this.inventoryService.getClientSetting(param).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        if (response.response) {
          if (response.response.settings.isVisibilityRestriction) {
            this.isVisibility = true;
          }
          else{
            this.isVisibility = false;
            this.displayedColumns = ['productNumber', 'productname', 'category', 'warehouse', 'totalquantity'];
            this.filterCat= [{ categories: ['category','warehouse'], queryParams: ['categoryIds', 'warehouseIds'] }];
          }
          this.getFilterDropDownList();
        }
      });
    }, error => { this.sharedService.onError(error) });
  }

  /**
   * Get the data of category , warehouse and visibilty group to bind in the filter list of inventory
   * Hit the GET API of visibility group only if isVisibility is set true for that client.
   * Assign the values of response to filter values.
   */
  getFilterDropDownList() {
    let param = {
      clientId: localStorage.getItem('selectedClientId')
    }
    let categories = this.inventoryService.getCategoryList(param);
    let warehouse = this.inventoryService.getWarehouseList();
    let visibility = this.inventoryService.getVisibilityGroup(param);
    let arr = [categories,warehouse,visibility];
    if(!this.isVisibility){
      arr = [categories,warehouse];
    }
    // Load multitple request at once
    forkJoin(arr).subscribe(response => {
      let [a, b, c] = response;
      this.tempFilterValues['category'] = a.response;
      if(this.isVisibility){
        this.tempFilterValues['visibility Group'] = c.response;
      }
      this.tempFilterValues['warehouse'] = b.response;
      this.filterValues = this.tempFilterValues;
    }, error => { this.sharedService.onError(error) });
  }

}
