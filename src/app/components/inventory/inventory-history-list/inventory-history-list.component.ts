import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { InventoryService } from '../inventory.service';
import { SharedService } from '../../../shared/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { Util } from '../../../shared/services/util';

@Component({
  selector: 'app-inventory-history-list',
  templateUrl: './inventory-history-list.component.html',
  styleUrls: ['./inventory-history-list.component.scss']
})
export class InventoryHistoryListComponent implements OnInit {


  noRecords: boolean = false;
  id: number = 0;
  displayedColumns: string[] = ['date', 'warehouseName', 'updatedQuantity', 'updatedBy', 'reason', 'notes'];
  dataSource = new MatTableDataSource();
  totalRecords: number = 0;
  pageNumber: number = 1; // save current page number and increase it by 1 in case of lazy loading.

  constructor(private sharedService: SharedService, private inventoryService: InventoryService, private _activatedRoute: ActivatedRoute, public util: Util) { }

  ngOnInit() {
    this.id = this._activatedRoute.snapshot.params['id'];
    this.getInventoryHistoryList();

    this.util.isUpdateInventory.subscribe(value => {
      if (value) {
        this.getInventoryHistoryList();
      }
    });
  }

  getInventoryHistoryList(pageNumber = 1, loadMore?) {
    let param: any = {
      pathVariable: pageNumber,
      pageSize: 10,
      productId: this.id
    }
    this.inventoryService.getInventoryHistory(param).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        this.pageNumber = response.response.paginationInfo.curPage; // save current page value
        this.totalRecords = response.response.paginationInfo.totalRecords;
        let data: any = this.dataSource.data;
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

  onScroll() {
    if (this.dataSource.data.length < this.totalRecords) {
      this.getInventoryHistoryList(this.pageNumber + 1, true);
    }
  }



}
