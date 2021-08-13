import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SharedService } from '../../../shared/services/shared.service';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { Util } from '../../../shared/services/util';
import { AppUrl } from '../../../shared/config/app-url.enum';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { OrdersService } from '../orders.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  paginationInfo: any = "";
  displayedColumns: string[] = ['orderNumber', 'OrderDate', 'ArrivalDate', 'RequestedBy', 'EventName', 'Status', 'link'];
  dataSource = new MatTableDataSource();
  noRecords: boolean = false;
  totalRecords: number = 0;
  sortParams: any = '';
  filterParams: any = '';
  filterCat: any = [{ categories: ['status'], queryParams: ['status'] }];
  filterValues: any = [];
  tempFilterValues: any = [];
  pageNumber: number = 1; // save current page number and increase it by 1 in case of lazy loading.

  constructor(private sharedService: SharedService, private orderService: OrdersService, private cookieService: CookieService, private router: Router, public util: Util) {
    this.util.currentPageLink = "orders";
  }

  ngOnInit() {
    let orderArr = JSON.parse(localStorage.getItem(window.location.pathname));
    if(orderArr){
      this.filterParams = orderArr;
    }
    this.getStatus();
    this.getOrderList();
    this.sort.sortChange.subscribe((value) => {
      this.sortParams = { orderBy: value.direction, sortedOnField: value.active };
      this.getOrderList();
    });
  }

  getStatus() {
    this.orderService.getStatus().subscribe(response => {
      this.tempFilterValues['status'] = response.response;
      this.filterValues = this.tempFilterValues;
    });
  }

  /**
   * IF sorted params applied then we have to send that params on each next request while we are on this page.
   * @param pageNumber to save current page number and increase at scroll
   * @param loadMore: optional - if scrolled down page and lazy load then true
   * if store user is logged in then client id is for loggedin user else for sparkslink admin, client have to be selected from the dashboard
   */
  getOrderList(pageNumber = 1, loadMore?) {
    let param: any = {
      pathVariable: pageNumber,
      pageSize: 50,
      clientId: this.util.isStore ? this.cookieService.get('storeClientId') : localStorage.getItem('selectedClientId')
    }
    if (this.sortParams && this.sortParams.orderBy) {
      Object.assign(param, this.sortParams);
    }

    if (this.filterParams) {
      Object.assign(param, this.filterParams);
    }

    this.orderService.getOrderList(param).subscribe(response => {
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
  }

  onChangeFilter(data: any) {
    this.filterParams = data;
    if(this.filterParams){
      localStorage.setItem(window.location.pathname,JSON.stringify(this.filterParams));
    }else{
      localStorage.removeItem(window.location.pathname);
    }
    this.getOrderList();
  }

  onScroll() {
    if (this.dataSource.data.length < this.totalRecords) {
      this.getOrderList(this.pageNumber + 1, true);
    }
  }

  //An order can only be canceled if its status is before the 'Shipped' status
  cancelOrder(id: number) {
    let param = {
      pathVariable: id
    }
    this.sharedService.confirmBox(AppMessage['U0091'], (result) => { //show a confirm dialog box before canceling the order
      if (result) {
        this.orderService.cancelOrder(param).subscribe(response => {
          this.sharedService.onSuccess(response, null, () => {
            this.sharedService.openToast('s', AppMessage['U0092']);
            this.getOrderList();
          });
        }, error => { this.sharedService.onError(error) });
      }
    });
  }

  navigateToManageOrder($event,id:number) {
    if ($event.target.id != 'link') {
      this.router.navigate(['/manageorder/' +id]);
    }
  }

}
