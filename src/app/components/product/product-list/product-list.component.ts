import { Component, OnInit, ViewChild } from '@angular/core';
import { Util } from '../../../shared/services/util';
import { MatSort, MatTableDataSource } from '@angular/material';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/services/shared.service';
import { ProductsService } from '../products.service';
import { forkJoin } from 'rxjs';
import { Enum } from '../../../shared/config/enum.enum';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  paginationInfo: any = "";
  displayedColumns: string[] = ['productNumber', 'productName', 'category', 'clientProductName', 'warehouse', 'isNewProduct', 'visibilityGroup', 'status', 'link'];
  dataSource = new MatTableDataSource();
  sortParams: any = '';
  filterParams: any = '';
  filterCat: any = [{ categories: ['category', 'visibility Group', 'warehouse', 'status'], queryParams: ['categoryIds', 'visibilityGroupIds', 'warehouseIds', 'status'] }];
  filterValues: any = [];
  tempFilterValues: any = [];
  noRecords: boolean = false;
  totalRecords: number = 0;
  pageNumber: number = 1; // save current page number and increase it by 1 in case of lazy loading.
  isVisibility: boolean = true; //to check whether visibility for client is enabled 
  isTeam: boolean = false;
  enum = Enum;
  isClientProductName: boolean = false;
  clientProdName:string="";

  constructor(private productService: ProductsService, private route: Router,
    private util: Util, private sharedService: SharedService) {
    this.util.currentPageLink = 'product';
  }

  ngOnInit() {
    let productArr = JSON.parse(localStorage.getItem(window.location.pathname));
    if (productArr) {
      this.filterParams = productArr;
    }
    this.getSettings((val)=>{
      if(val){
        this.getProductList();
      }
    });
    this.sort.sortChange.subscribe((value) => {
      this.sortParams = { orderBy: value.direction, sortedOnField: value.active };
      this.getProductList();
    });
    let user = JSON.parse(localStorage.getItem('user'));
    //check that if the logged in user has 2 role(one will be store admin which is added by default) and that role is workshop team such that they cannot edit the status of the product
    if (user && user.roles.length == 2 && user.roles[0] == Enum.TEAM) {
      this.isTeam = true;
    }
  }

  /**
   * IF sorted params applied then we have to send that params on each next request while we are on this page.
   * @param pageNumber to save current page number and increase at scroll
   * @param loadMore: optional - if scrolled down page and lazy load then true
   */
  getProductList(pageNumber = 1, loadMore?) {
    if (localStorage.getItem('selectedClientId') != null) {
      let param: any = {
        pathVariable: pageNumber,
        pageSize: 50,
        clientId: localStorage.getItem('selectedClientId')
      }
      if (this.sortParams && this.sortParams.orderBy) {
        Object.assign(param, this.sortParams);
      }
      if (this.filterParams) {
        //remove the visibility filter if its setting has disabled
        if(!this.isVisibility && ('visibilityGroupIds' in this.filterParams)){ 
          delete this.filterParams["visibilityGroupIds"];
          if(Object.keys(this.filterParams).length === 0){
            this.filterParams = "";
          }
          localStorage.setItem(window.location.pathname,JSON.stringify(this.filterParams));
        }
        Object.assign(param, this.filterParams);
      }

      this.productService.getProductList(param).subscribe(response => {
        this.sharedService.onSuccess(response, null, () => {
          this.paginationInfo = response.response.paginationInfo;
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

  onRowClick($event, id: number) {
    if ($event.target.id != 'link') {
      this.route.navigate(['/product/' + id]);
    }
  }

  /**
   * called to change the status of the product from the list
   * @param status status of product : status= 0 - inactive; status = 1 - active; status = 2 - onhold  
   * @param element : product detail
   */
  changeStatus(status, element) {
    let param = {
      pathVariable: element.id,
      status: status
    }
    let message: string = '';
    message = status == 0 ? AppMessage['U0049'] : status == 1 ? AppMessage['U0050'] : AppMessage['U0051'];

    this.sharedService.confirmBox(message, (result) => { //show a confirm dialog box before status change
      if (result) {
        this.productService.changeStatus(param).subscribe(response => {
          this.sharedService.onSuccess(response, null, () => {
            this.sharedService.openToast('s', response.responseDescription);
            this.getProductList();
          });
        }, error => { this.sharedService.onError(error) });
      }
    });
  }

  onChangeFilter(data: any) {
    this.filterParams = data;
    if (this.filterParams) {
      localStorage.setItem(window.location.pathname, JSON.stringify(this.filterParams));
    } else {
      localStorage.removeItem(window.location.pathname);
    }
    this.getProductList();
  }

  onScroll() {
    if (this.dataSource.data.length < this.totalRecords) {
      this.getProductList(this.pageNumber + 1, true);
    }
  }


  /**
   * if visibility of client is enabled then only show visibility in list column and in advance filter
   */
  getSettings(fn) {
    this.isVisibility = true;
    this.isClientProductName = true;
    this.clientProdName = "";
    let param: any = {
      pathVariable: localStorage.getItem('selectedClientId')
    }
    this.productService.getClientSetting(param).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        if (response.response) {
          if (!response.response.settings.isVisibilityRestriction && !response.response.settings.isClientProductName) {
            this.isVisibility = false;
            this.isClientProductName = false;
            this.displayedColumns = ['productNumber', 'productName', 'category', 'warehouse', 'isNewProduct', 'status', 'link'];
            this.filterCat = [{ categories: ['category', 'warehouse', 'status'], queryParams: ['categoryIds', 'warehouseIds', 'status'] }];
          }
          else if(!response.response.settings.isVisibilityRestriction && response.response.settings.isClientProductName){
            this.isVisibility = false;
            this.isClientProductName = true;
            this.clientProdName = response.response.settings.clientProductName;
            this.displayedColumns = ['productNumber', 'productName', 'category','clientProductName', 'warehouse', 'isNewProduct', 'status', 'link'];
            this.filterCat = [{ categories: ['category', 'warehouse', 'status'], queryParams: ['categoryIds', 'warehouseIds', 'status'] }];
          }
          else if(response.response.settings.isVisibilityRestriction && !response.response.settings.isClientProductName) {
            this.isVisibility = true;
            this.isClientProductName = false;
            this.displayedColumns = ['productNumber', 'productName', 'category', 'warehouse', 'isNewProduct', 'visibilityGroup', 'status', 'link'];
          }
          this.getFilterDropDownList();
          return fn(true);
        }
      });
    }, error => { this.sharedService.onError(error) });
  }

  /**
   * Get the data of category , warehouse and visibilty group to bind in the filter list of product
   * Hit the GET API of visibility group only if isVisibility is set true for that client.
   * Assign the values of response to filter values.
   */
  getFilterDropDownList() {
    let param = {
      clientId: localStorage.getItem('selectedClientId')
    }
    let categories = this.productService.getCategoryList(param);
    let visibility = this.productService.getVisibilityGroup(param);
    let warehouse = this.productService.getWarehouseList();
    let arr = [categories, warehouse, visibility];
    if (!this.isVisibility) {
      arr = [categories, warehouse];
    }
    // Load multitple request at once
    forkJoin(arr).subscribe(response => {
      let [a, b, c] = response;
      this.tempFilterValues['category'] = a.response;
      if (this.isVisibility) {
        this.tempFilterValues['visibility Group'] = c.response;
      }
      this.tempFilterValues['warehouse'] = b.response;
      this.tempFilterValues['status'] = [
        { id: 1, name: 'Active', checked: false }, 
        { id: 0, name: 'Inactive', checked: false }, 
        { id: 2, name: 'On hold', checked: false },
        // { id: 3, name: 'Approval Awaited', checked: false }
        { id: 3, name: 'Waiting Approval', checked: false }
      ];
      this.filterValues = this.tempFilterValues;
    });
  }

}

