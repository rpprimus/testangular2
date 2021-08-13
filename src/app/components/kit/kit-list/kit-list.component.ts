import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { KitService } from '../kit.service';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { Router } from '@angular/router';
import { Util } from '../../../shared/services/util';
import { SharedService } from '../../../shared/services/shared.service';
import { forkJoin } from 'rxjs';
import { Enum } from './../../../shared/config/enum.enum';

@Component({
  selector: 'app-kit-list',
  templateUrl: './kit-list.component.html',
  styleUrls: ['./kit-list.component.scss']
})
export class KitListComponent implements OnInit {

  @ViewChild(MatSort) kitSort: MatSort;
  paginationInfo: any = "";
  displayedColumns: string[] = ['kitId', 'KitName', 'category', 'VisibilityGroup', 'Status', 'Link'];
  dataSource = new MatTableDataSource();
  kitSortParams: any = '';
  kitFilterParams: any = '';
  filterCat: any = [{ categories: ['category', 'visibility Group', 'status'], queryParams: ['categoryIds', 'visibilityGroupIds', 'status'] }];
  filterValues: any = [];
  tempFilterValues: any = [];
  noRecords: boolean = false;
  totalKitRecords: number = 0;
  kitPageNumber: number = 1; // save current page number and increase it by 1 in case of lazy loading.
  isVisibility: boolean = true; //to check whether visibility for client is enabled 
  enum = Enum;
  isOnlyTeam : boolean = false;

  constructor(private kitService: KitService,private route: Router, private util: Util, private sharedService: SharedService) { 
    this.util.currentPageLink = 'product'; 
  }
 
  ngOnInit() {
    let kitArr = JSON.parse(localStorage.getItem(window.location.pathname));
    if(kitArr){
      this.kitFilterParams = kitArr;
    }
    this.getKitSettings(()=>{
      this.getKitList();
    });
    
    this.kitSort.sortChange.subscribe((value) => {
      this.kitSortParams = { orderBy: value.direction, sortedOnField: value.active };
      this.getKitList();
    });
    let loginuser = JSON.parse(localStorage.getItem('user'));
    //check that if the logged in user has 2 role(one will be store admin which is added by default) and that role is workshop team such that they cannot edit the status of the product
    if (loginuser && loginuser.roles.length == 2 && loginuser.roles[0] == Enum.TEAM) {
      this.isOnlyTeam = true;
    }
  }
  
  getKitList(pageNumber = 1, loadMoreData?) {
    if (localStorage.getItem('selectedClientId') != null) {
      let kitparam: any = {
        pathVariable: pageNumber,
        pageSize: 50,
        clientId: localStorage.getItem('selectedClientId')
      }
      if (this.kitSortParams && this.kitSortParams.orderBy) {
        Object.assign(kitparam, this.kitSortParams);
      }

      if (this.kitFilterParams) {
        //remove the visibility filter if its setting has disabled
        if(!this.isVisibility && ('visibilityGroupIds' in this.kitFilterParams)){ 
          delete this.kitFilterParams["visibilityGroupIds"];
          if(Object.keys(this.kitFilterParams).length === 0){
            this.kitFilterParams = "";
          }
          localStorage.setItem(window.location.pathname,JSON.stringify(this.kitFilterParams));
        }
        Object.assign(kitparam, this.kitFilterParams);
      }

      this.kitService.getKitList(kitparam).subscribe(response => {
        this.sharedService.onSuccess(response, null, () => {
          this.paginationInfo = response.response.paginationInfo;
          this.kitPageNumber = response.response.paginationInfo.curPage; // save current page value
          this.totalKitRecords = response.response.paginationInfo.totalRecords;
          let data = this.dataSource.data;
          if (loadMoreData) {
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

  onRowClick($event, id: number) {
    if ($event.target.id != 'link') {
      this.route.navigate(['/kit/' + id]);
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
    message = status == 0 ? AppMessage['U0123'] : status == 1 ? AppMessage['U0124'] : AppMessage['U0125'];

    this.sharedService.confirmBox(message, (result) => { //show a confirm dialog box before status change
      if (result) {
        this.kitService.changeStatus(param).subscribe(response => {
          this.sharedService.onSuccess(response, null, () => {
            this.sharedService.openToast('s', response.responseDescription);
            this.getKitList();
          });
        }, error => { this.sharedService.onError(error) });
      }
    });
  }

  onChangeFilter(data: any) {
    this.kitFilterParams = data;
    if(this.kitFilterParams){
      localStorage.setItem(window.location.pathname,JSON.stringify(this.kitFilterParams));
    }else{
      localStorage.removeItem(window.location.pathname);
    }
    this.getKitList();
  }

  onScroll() {
    if (this.dataSource.data.length < this.totalKitRecords) {
      this.getKitList(this.kitPageNumber + 1, true);
    }
  }

  
  /**
   * if visibility of client is enabled then only show visibility in list column and in advance filter
   */
  getKitSettings(fn) {
    this.isVisibility = true;
    let param: any = {
      pathVariable: localStorage.getItem('selectedClientId')
    }
    this.kitService.getClientSetting(param).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        if (response.response) {
          if (response.response.settings.isVisibilityRestriction) {
            this.isVisibility = true;
          }
          else{
            this.isVisibility = false;
            this.displayedColumns = ['kitId', 'KitName', 'category', 'Status', 'Link'];
            this.filterCat= [{ categories: ['category', 'status'], queryParams: ['categoryIds', 'status'] }];
          }
          this.getFilterDropDownList();
          return fn();
        }
      });
    }, error => { this.sharedService.onError(error) });
  }

   /**
   * Get the data of category and visibilty group to bind in the filter list of product
   * Hit the GET API of visibility group only if isVisibility is set true for that client.
   * Assign the values of response to filter values.
   */
  getFilterDropDownList() {
    let param = {
      clientId: localStorage.getItem('selectedClientId')
    }
    let categories = this.kitService.getCategoryList(param);
    let visibility = this.kitService.getVisibilityGroup(param);
    let arr = [categories,visibility];
    if(!this.isVisibility){
      arr = [categories];
    }
    // Load multitple request at once
    forkJoin(arr).subscribe(response => {
      let [a, b] = response;
      this.tempFilterValues['category'] = a.response;
      if(this.isVisibility){
        this.tempFilterValues['visibility Group'] = b.response;
      }
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
