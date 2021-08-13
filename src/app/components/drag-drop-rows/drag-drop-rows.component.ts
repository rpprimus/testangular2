import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Util } from './../../shared/services/util';

@Component({
  selector: 'app-drag-drop-rows',
  templateUrl: './drag-drop-rows.component.html',
  styleUrls: ['./drag-drop-rows.component.scss']
})
export class DragDropRowsComponent implements OnInit {


  @Input() data: any;
  @Input('rowIndex') selectedRowIndex = -1;
  filteredActiveList: any = [];
  filteredInactiveList: any = [];

  constructor(private util: Util) { }
  ngOnInit() {
  }


  /**
  * @param changes - If property binding changes occurred, this method will be called
  */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedRowIndex && changes.selectedRowIndex.currentValue) {
      this.selectedRowIndex = changes.selectedRowIndex.currentValue;
    } else if (changes.data && changes.data.currentValue && changes.data.currentValue.selectedRowIndex) {
      this.selectedRowIndex = changes.data.currentValue.selectedRowIndex;
    }
    if (this.data.serviceTitle) {
      this.filteredActiveList = this.data.serviceTitle.filter(x => x.isActive);
      this.filteredInactiveList = this.data.serviceTitle.filter(x => !x.isActive);
    }
  }

  /**
   * Check if the row index is greater than zero and then swap the data in field details using index
   * after swapping assign the temporary table data back to field details list
   * @param selectedRowIndex : index of the selected row
   */
  moveUp(selectedRowIndex) {
    if (selectedRowIndex != null && selectedRowIndex > 0) {
      let tableData = this.data.fieldDetails ? this.data.fieldDetails : this.filteredActiveList;
      let tmp = tableData[selectedRowIndex - 1];
      tableData[selectedRowIndex - 1] = tableData[selectedRowIndex];
      tableData[selectedRowIndex] = tmp;
      if (this.data.fieldDetails) {
        this.data.fieldDetails = tableData;
      } else {
        this.filteredActiveList = tableData;
      }
      //this.data.fieldDetails ? this.data.fieldDetails : this.filteredActiveList = tableData;
      if (this.data.serviceTitle) {
        this.data.serviceTitle = [...this.filteredActiveList, ...this.filteredInactiveList];
        this.util.isServiceDirty = true;
      }
      this.selectedRowIndex--;
    }
  }

  /**
   * Check if the row index is not greater than the length of fieldDetail list and then swap the data in field details using index
   * @param selectedRowIndex : index of the selected row
   */
  moveDown(selectedRowIndex) {
    if (selectedRowIndex != null && (selectedRowIndex < (this.data.fieldDetails ? this.data.fieldDetails.length - 1 : this.filteredActiveList.length - 1))) {
      let tableData = this.data.fieldDetails ? this.data.fieldDetails : this.filteredActiveList;
      let tmp = tableData[selectedRowIndex + 1];
      tableData[selectedRowIndex + 1] = tableData[selectedRowIndex];
      tableData[selectedRowIndex] = tmp;
      if (this.data.fieldDetails) {
        this.data.fieldDetails = tableData;
      } else {
        this.filteredActiveList = tableData;
      }
      // this.data.fieldDetails ? this.data.fieldDetails : this.filteredActiveList = tableData;
      if (this.data.serviceTitle) {
        this.data.serviceTitle = [...this.filteredActiveList, ...this.filteredInactiveList];
        this.util.isServiceDirty = true;
      }
      this.selectedRowIndex++;
    }
  }

}
