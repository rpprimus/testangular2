import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { SharedService } from '../../../shared/services/shared.service';
import { Util } from '../../../shared/services/util';
import { UserService } from '../user.service';
import { AppMessage } from '../../../shared/config/app-message.enum';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  paginationInfo: any = "";
  displayedColumns: string[] = ['name', 'email', 'roles', 'status', 'link'];
  dataSource = new MatTableDataSource();

  filterCat: any = [{ categories: ['role', 'status'], queryParams: ['roleIds', 'status'] }];
  filterValues: any = [];
  tempFilterValues: any = [];
  noRecords: boolean = false;
  totalRecords: number = 0;
  pageNumber: number = 1; // save current page number and increase it by 1 in case of lazy loading.

  constructor(private userService: UserService, private route: Router, private util: Util, private sharedService: SharedService) {
    this.util.currentPageLink = 'users';
  }
  sortParams: any = '';
  filterParams: any = '';

  ngOnInit() {
    let arr = JSON.parse(localStorage.getItem(window.location.pathname));
    if(arr){
      this.filterParams = arr;
    }
    this.getRoles();
    this.getUser();
    this.util.isClone = false;
    this.sort.sortChange.subscribe((value) => {
      this.sortParams = { orderBy: value.direction, sortedOnField: value.active };
      this.getUser();
    });
  }

  getRoles() {
    let param = {
      userType: 'internal'
    }
    this.userService.getRoles(param).subscribe(response => {
      this.tempFilterValues['role'] = response.response.results;
      this.tempFilterValues['status'] = [{ id: 1, name: 'Active', checked: false }, { id: 0, name: 'Inactive', checked: false }];
      this.filterValues = this.tempFilterValues;
    });
  }

  /**
   * IF sorted params applied then we have to send that params on each next request while we are on this page.
   * @param pageNumber to save current page number and increase at scroll
   * @param loadMore: optional - if scrolled down page and lazy load then true
   */
  getUser(pageNumber = 1, loadMore?) {
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

    this.userService.getUserList(param).subscribe(response => {
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

  onRowClick($event, id: number) {
    if ($event.target.id != 'link') {
      this.route.navigate(['/users/' + id]);
    }
  }

  cloneUser(id: number) {
    this.util.isClone = true;
    this.route.navigate(['/users/' + id]);
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
    this.sharedService.confirmBox(status == 0 ? AppMessage['U0009'] : AppMessage['U0010'], (result) => { //show a confirm dialog box before status change
      if (result) {
        this.userService.changeStatus(param).subscribe(response => {
          this.sharedService.onSuccess(response, null, () => {
            this.sharedService.openToast('s', response.responseDescription);
            this.getUser();
          });
        });
      }
    });
  }

  onChangeFilter(data: any) {
    this.filterParams = data;
    if(data){
      localStorage.setItem(window.location.pathname,JSON.stringify(this.filterParams));
    }else{
      localStorage.removeItem(window.location.pathname);
    }
    
    this.getUser();
  }

  onScroll() {
    if (this.dataSource.data.length < this.totalRecords) {
      this.getUser(this.pageNumber + 1, true);
    }
  }

}