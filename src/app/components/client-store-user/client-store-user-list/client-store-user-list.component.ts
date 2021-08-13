import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { SharedService } from '../../../shared/services/shared.service';
import { Util } from '../../../shared/services/util';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { ClientStoreUserService } from '../client-store-user.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-store-list',
  templateUrl: './client-store-user-list.component.html',
  styleUrls: ['./client-store-user-list.component.scss']
})
export class ClientStoreUserListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  paginationInfo: any = "";
  displayedColumns: string[] = ['name', 'email', 'workPhone', 'roles', 'hierarchy', 'status', 'link'];
  dataSource = new MatTableDataSource();
  sortParams: any = '';
  filterParams: any = '';
  filterCat: any = [{ categories: ['role', 'hierarchy', 'status'], queryParams: ['roleIds', 'hierarchyIds', 'status'] }];
  filterValues: any = [];
  tempFilterValues: any = [];
  noRecords: boolean = false;
  totalRecords: number = 0;
  pageNumber: number = 1; // save current page number and increase it by 1 in case of lazy loading.
  hierarchyLabelName:any;
  isHierarchy: boolean = false; //to check whether hierarchy for client is enabled 

  constructor(private clientStoreService: ClientStoreUserService, private route: Router, private cookieService: CookieService,public util: Util, private sharedService: SharedService) {
    this.util.currentPageLink = 'client-store-users';
  }

  ngOnInit() {
    let arr1 = JSON.parse(localStorage.getItem(window.location.pathname));
    if(arr1){
      this.filterParams = arr1;
    }
    this.getSettings(()=>{
      this.getStoreUserList();
    });
    this.util.isClone = false;
    this.sort.sortChange.subscribe((value) => {
      this.sortParams = { orderBy: value.direction, sortedOnField: value.active };
      this.getStoreUserList();
    });
  }

  getRolesAndHierarchy() {
    let param1 = {
      userType: 'external'
    }
    let param2 = {
      clientId: this.util.isStore ? this.cookieService.get('storeClientId') : localStorage.getItem('selectedClientId')
    }

    let roles = this.clientStoreService.getRoles(param1);
    let hierarchies = this.clientStoreService.getHierarchy(param2);
    // Load multitple request at once
    forkJoin([roles, hierarchies]).subscribe(response => {
      this.tempFilterValues['role'] = response[0].response.results;
      if (this.isHierarchy) {
        let hirData =  response[1].response;
        // hirData.hierarchies.forEach(x => {
        //   Object.assign(x, { 'checked': false });
        // });
        this.hierarchyLabelName = hirData.hierachyLabelName;
        this.tempFilterValues[this.hierarchyLabelName.toLowerCase()] = hirData.hierarchies;
        this.filterCat = [{ categories: ['role', hirData.hierachyLabelName.toLowerCase(), 'status'], queryParams: ['roleIds', 'hierarchyIds', 'status'] }];
      }
      else {
        this.hierarchyLabelName = '';
        this. displayedColumns = ['name', 'email', 'workPhone', 'roles', 'status', 'link'];
        this.filterCat = [{ categories: ['role', 'status'], queryParams: ['roleIds', 'status'] }];
      }
      this.tempFilterValues['status'] = [{ id: 1, name: 'Active', checked: false }, { id: 0, name: 'Inactive', checked: false },{ id: 2, name: 'Verification Pending', checked: false },{ id: 3, name: 'Locked', checked: false }];
      this.filterValues = this.tempFilterValues;
    });
  }

  /**
   * IF sorted params applied then we have to send that params on each next request while we are on this page.
   * @param pageNumber to save current page number and increase at scroll
   * @param loadMore: optional - if scrolled down page and lazy load then true
   */
  getStoreUserList(pageNumber = 1, loadMore?) {
      let param: any = {
        pathVariable: pageNumber,
        pageSize: 50,
        clientId: this.util.isStore ? this.cookieService.get('storeClientId') : localStorage.getItem('selectedClientId')
      }
      if (this.sortParams && this.sortParams.orderBy) {
        Object.assign(param, this.sortParams);
      }
      if (this.filterParams) {
        //remove the Hierarchy filter if its setting has disabled
        if(!this.isHierarchy && ('hierarchyIds' in this.filterParams)){ 
          delete this.filterParams["hierarchyIds"];
          if(Object.keys(this.filterParams).length === 0){
            this.filterParams = "";
          }
          localStorage.setItem(window.location.pathname,JSON.stringify(this.filterParams));
        }
        Object.assign(param, this.filterParams);
      }

      this.clientStoreService.getStoreUserList(param).subscribe(response => {
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
      this.route.navigate(['/client-store-users/' + id]);
    }
  }

  cloneUser(id: number) {
    this.util.isClone = true;
    this.route.navigate(['/client-store-users/' + id]);
  }

  /**
   * called to change the status of the store user from the list
   * @param status status of store user : true-mark as active and false:mark as inactive
   * @param element : store detail
   */
  changeStatus(status, element) {
    let param = {
      pathVariable: element.id,
      status: status == "LOCKED" ? "ACTIVE" : status
    }
    this.sharedService.confirmBox(status == 'INACTIVE' ? AppMessage['U0009'] : status == 'LOCKED' ? AppMessage['U0083']: status == 'VERIFICATION_PENDING' ? AppMessage['U0151']: AppMessage['U0010'], (result) => { //show a confirm dialog box before status change
      if (result) {
        this.clientStoreService.changeStatus(param).subscribe(response => {
          if(status == "LOCKED"){
            response.responseDescription = AppMessage['U0086'];
          }
          this.sharedService.onSuccess(response, null, () => {
            this.sharedService.openToast('s', response.responseDescription);
            this.getStoreUserList();
          });
        });
      }
    });
  }

  resendEmailVerification(status, element) {
    
    let param = {
      pathVariable: element.id,
      // status: status == "LOCKED" ? "ACTIVE" : status
    }
    this.sharedService.confirmBox(status == 'VERIFICATION_PENDING' ? AppMessage['U0151']: AppMessage['U0010'], (result) => { //show a confirm dialog box before status change
      if (result) {
        
        this.clientStoreService.resendEmailVerification(param).subscribe(response => {
          if(status == "LOCKED"){
            response.responseDescription = AppMessage['U0086'];
          }
          this.sharedService.onSuccess(response, null, () => {
            this.sharedService.openToast('s', response.responseDescription);
            this.getStoreUserList();
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
    this.getStoreUserList();
  }

  onScroll() {
    if (this.dataSource.data.length < this.totalRecords) {
      this.getStoreUserList(this.pageNumber + 1, true);
    }
  }

  
  /**
   * if hierarchy of client is enabled then only show hierarchy in list column and in advance filter
   */
  getSettings(fn) {
    this.isHierarchy = false;
    let param: any = {
      pathVariable: this.util.isStore ? this.cookieService.get('storeClientId') : localStorage.getItem('selectedClientId')
    }
    this.clientStoreService.getClientSetting(param).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        if (response.response) {
          this.getRolesAndHierarchy();
          if (response.response.settings.isHierarchy) {
            this.isHierarchy = true;
          }
          else{
            this.isHierarchy = false;
          }
        }
        return fn();
      });
    }, error => { this.sharedService.onError(error) });
  }

}
