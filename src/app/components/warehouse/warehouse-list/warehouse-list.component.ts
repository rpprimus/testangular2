import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { SharedService } from '../../../shared/services/shared.service';
import { WarehouseService } from '../warehouse.service';
import { Util } from '../../../shared/services/util';
import { AppMessage } from '../../../shared/config/app-message.enum';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.scss']
})

export class WarehouseListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'link'];
  dataSource = new MatTableDataSource();
  isAdd: boolean = false;
  warehouseName: string = '';
  id: number = 0;
  isFormSubmitted: boolean = false;
  isEditWareHouse: boolean = false;
  appMessage = AppMessage;
  isValid: boolean = true;

  constructor(private warehouseService: WarehouseService, private sharedService: SharedService, private util: Util) {
    this.util.currentPageLink = 'warehouse';
  }

  ngOnInit() {
    this.getWarehouse();
    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => data[sortHeaderId].toLocaleLowerCase();
  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getWarehouse() {
    this.warehouseService.getWarehouseList().subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        this.dataSource.data = response.response;
        this.isAdd = false;
      });
    });
  }

  save(element) {
    if (this.warehouseName.trim() != '' && !this.isFormSubmitted) {
      let param = {
        wareHouseName: this.warehouseName.trim(),
        pathVariable: this.id
      }
      let request = this.warehouseService.saveWarehouse(param, this.id > 0 ? 'put' : 'post');
      this.isFormSubmitted = true;
      request.subscribe(response => {
        this.isFormSubmitted = false;
        this.sharedService.onSuccess(response, 'U0025', (value) => {
         
          if (value) {
            this.isEditWareHouse = false;
            this.id = 0;
            if (element) {
              element.isEdit = false;
            }
            this.getWarehouse();
            this.isValid = true;
          }
        });
      }, error => { this.sharedService.onError(error) });
    }
    else {
      this.isValid = false;
    }
  }

  editWarehouse(data) {
    this.warehouseName = data.name;
    this.id = data.id;
    data.isEdit = true;
    this.isEditWareHouse = true;
  }

  onCancel(element) {
    this.id = 0;
    this.isValid = true;
    this.isAdd = false;
    this.isEditWareHouse = false;
    this.warehouseName = '';
    if (element) {
      element.isEdit = false;
    }
  }

}
