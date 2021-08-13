import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/services/shared.service';
import { Util } from '../../../shared/services/util';
import { AppMessage } from '../../../shared/config/app-message.enum';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  paginationInfo: any = "";
  displayedColumns: string[] = ['name', 'signUpModule', 'status', 'link'];
  dataSource = new MatTableDataSource();
  sortParams: any = '';
  filterParams: any = '';
  filterCat: any = [{ categories: ['status'], queryParams: ['status'] }];
  filterValues: any = [];
  noRecords: boolean = false;
  totalRecords: number = 0;
  pageNumber: number = 1; // save current page number and increase it by 1 in case of lazy loading.

  constructor(private clientService: ClientService, private route: Router, private sharedService: SharedService,
    private util: Util
  ) { this.util.currentPageLink = 'clients'; }

  ngOnInit() {
    let clientFilter = JSON.parse(localStorage.getItem(window.location.pathname));
    if(clientFilter){
      this.filterParams = clientFilter;
    }
    this.util.canCreateStore.next(false); // set this value FALSE at initial level
    this.util.storeCreated.next(false); // set this value FALSE at initial level or reset for every client
    this.getClient();
    this.filterValues['status'] = [{ id: 1, name: 'Active', checked: false }, { id: 0, name: 'Inactive', checked: false }];
    this.sort.sortChange.subscribe((value) => {
      this.sortParams = { orderBy: value.direction, sortedOnField: value.active };
      this.getClient();
    });
  }

  /**
   * Route to Client page when clicking on row instead of Link button
   * Save Id in UTIL for further use in save other tabs
   */
  onRowClick($event, id: number) {
    if ($event.target.id != 'link') {
      this.util.clientId = id;
      this.route.navigate(['/clients/' + id]);
    }
  }

  /**
   * When clicking on Add new button . mark clientId as 0
   */
  onAddBtnClick() {
    this.util.clientId = 0;
    this.route.navigate(['/clients/add']);
  }

  /**
  * IF sorted params applied then we have to send that params on each next request while we are on this page.
  * @param pageNumber to save current page number and increase at scroll
  * @param loadMore: optional - if scrolled down page and lazy load then true
  */
  getClient(pageNumber = 1, loadMore?) {
    let param: any = {
      pathVariable: pageNumber,
      pageSize: 50
    }
    if (this.sortParams && this.sortParams.orderBy) {
      Object.assign(param, this.sortParams);
    }

    if (this.filterParams) {
      Object.assign(param, this.filterParams);
    }

    this.clientService.getClientList(param).subscribe(response => {
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

  /**
   * called to change the status of the user from the list
   * @param status status of user : true-mark as active and false:mark as inactive
   * @param element : user detail
   */
  changeStatus(status, element) {
    let param = {
      pathVariable: element.id,
      status: status
    }
    this.sharedService.confirmBox(status == 0 ? AppMessage['U0011'] : AppMessage['U0012'], (result) => {    //show a confirm dialog box before status change
      if (result) {
        this.clientService.changeStatus(param).subscribe(response => {
          this.sharedService.onSuccess(response, null, () => {
            this.sharedService.openToast('s', response.responseDescription);
            this.getClient();
          });
        });
      }
    });
  }

  onChangeFilter(data: any) {
    this.filterParams = data;
    if(this.filterParams){
      localStorage.setItem(window.location.pathname,JSON.stringify(this.filterParams));
    }else{
      localStorage.removeItem(window.location.pathname);
    }
    this.getClient();
  }

  onScroll() {
    if (this.dataSource.data.length < this.totalRecords) {
      this.getClient(this.pageNumber + 1, true);
    }
  }

}
