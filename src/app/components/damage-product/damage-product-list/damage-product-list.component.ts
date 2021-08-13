import { Component, OnInit, ViewChild } from '@angular/core';
import { Util } from '../../../shared/services/util';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/services/shared.service';
import { DamageProductService } from '../damage-product.service';
import { AppMessage } from '../../../shared/config/app-message.enum';

@Component({
  selector: 'app-damage-product-list',
  templateUrl: './damage-product-list.component.html',
  styleUrls: ['./damage-product-list.component.scss']
})
export class DamageProductListComponent implements OnInit {

  displayedColumns: string[] = ['productId', 'productName', 'categories', 'orderNumber', 'damageQuantity', 'status'];
  @ViewChild(MatSort) sort: MatSort;
  paginationInfo: any = "";
  dataSource = new MatTableDataSource();
  sortParams: any = '';
  filterParams: any = '';
  filterCat: any = [{ categories: ['status'], queryParams: ['status'] }];
  filterValues: any = [];
  tempFilterValues: any = [];
  noRecords: boolean = false;
  totalRecords: number = 0;
  pageNumber: number = 1; // save current page number and increase it by 1 in case of lazy loading.

  constructor(private damageProductService: DamageProductService, private route: Router, private util: Util, private sharedService: SharedService) { this.util.currentPageLink = 'damageproduct'; }

  ngOnInit() {
    let damageArr = JSON.parse(localStorage.getItem(window.location.pathname));
    if(damageArr){
      this.filterParams = damageArr;
    }
    this.getDamageProductList();
    this.sort.sortChange.subscribe((value) => {
      this.sortParams = { orderBy: value.direction, sortedOnField: value.active };
      this.getDamageProductList();
    });
    this.tempFilterValues['status'] = [{ id: 1, name: 'Active', checked: false }, { id: 0, name: 'Inactive', checked: false }];
    this.filterValues = this.tempFilterValues;
  }

  /**
   * IF sorted params applied then we have to send that params on each next request while we are on this page.
   * @param pageNumber to save current page number and increase at scroll
   * @param loadMore: optional - if scrolled down page and lazy load then true
   */
  getDamageProductList(pageNumber = 1, loadMore?) {
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
        Object.assign(param, this.filterParams);
      }

      this.damageProductService.getDamageProducts(param).subscribe(response => {
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
          this.noRecords = this.dataSource.data.length > 0 ? false : true;
        });
      });
    } else {
      this.sharedService.openToast('e', AppMessage.U0026);
    }
  }

  onChangeFilter(data: any) {
    this.filterParams = data;
    if(data){
      localStorage.setItem(window.location.pathname,JSON.stringify(this.filterParams));
    }else{
      localStorage.removeItem(window.location.pathname);
    }
    this.getDamageProductList();
  }

  onScroll() {
    if (this.dataSource.data.length < this.totalRecords) {
      this.getDamageProductList(this.pageNumber + 1, true);
    }
  }

}
