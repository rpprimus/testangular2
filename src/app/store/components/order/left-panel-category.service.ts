import { Injectable } from '@angular/core';
import { StoreService } from '../../service/store.service';
import { Common } from '../../utility/common';
import { Util } from '../../../shared/services/util';

@Injectable()
export class LeftPanelCategoryService {

  categoryData: any = [];
  categoryId: number = 0;

  constructor(private storeService: StoreService, private common: Common, private util: Util) { }


  // get the value of categories
  getCategories() {
    let param = {
      clientId: this.common.storeClientInfo.id
    }
    this.storeService.getCategories(param).subscribe(response => {
      //this.createTreeData(response.response);
      this.categoryData = this.list_to_tree(response.response);
      this.sortOnSequence(this.categoryData);
      this.markDefaultCategorySelection(this.categoryData[0]);
      this.util.notifyChild({ action: "categoryData", data: this.categoryData });
    });
  }

  list_to_tree(list) {
    var map = {}, node, roots = [], i;
    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].childrens = []; // initialize the children
      Object.assign(list[i], { parents: [] });
    }
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentId) {
        if (list[map[node.parentId]]) {
          // if you have dangling branches check that map[node.parentId] exists
          list[map[node.parentId]].childrens.push(node);
        }
      } else {
        roots.push(node);
      }
    }
    return roots;
  }


  isNodeExistInTree(data, element, findItem) {
    data.forEach(item => {
      if (item) {
        if (element.parentId == item.id) {
          element.parents.push(item);
          return findItem = item;
        } else {
          findItem = this.isNodeExistInTree(item.childrens, element, findItem);
        }
      }
    })

    return findItem;
  }

  createTreeData(response) {
    this.categoryData = [];
    response.forEach(element => {
      Object.assign(element, { parents: [] });
      let findItem;
      findItem = this.isNodeExistInTree(this.categoryData, element, findItem);
      Object.assign(element, { childrens: [] });
      if (findItem) {
        findItem.childrens.push(element);
      } else {
        this.categoryData.push(element);
      }
    });
    this.sortOnSequence(this.categoryData);
    //this.categoryData.sort(function (a, b) { if (a.name < b.name) { return 0 } else { return 1 } }); // sort by Name
    // this.categoryData.sort(function (a, b) { //sort by name
    //   let nameA = a.name.toLowerCase();
    //   let nameB = b.name.toLowerCase()
    //   if (nameA < nameB) //sort string ascending
    //     return -1
    //   if (nameA > nameB)
    //     return 1
    //   return 0 //default return value (no sorting)
    // });
  }

  sortOnSequence(data) {
    if (data.length > 1) {
      data.sort((a, b) => {   //sort by sequence number
        let nameA = a.sequenceNumber;
        let nameB = b.sequenceNumber
        if (a.childrens.length > 0) {
          this.sortOnSequence(a.childrens);
        }
        if (b.childrens.length > 0) {
          this.sortOnSequence(b.childrens);
        }
        if (nameA < nameB) //sort string ascending
          return -1
        if (nameA > nameB)
          return 1
        return 0 //default return value (no sorting)
      });
    } else if (data.length == 1 && data[0].childrens.length > 0) {
      this.sortOnSequence(data[0].childrens);
    }
  }

  markDefaultCategorySelection(data) {
    if (this.categoryId == 0) {
      if (data) {
        data.expandedClass = true;
        if (data.childrens.length > 0) {
          this.markDefaultCategorySelection(data.childrens[0]);
        }
        else {
          data.selectedClass = true;
          this.categoryId = data.id;
          this.common.selectedCategoryName = data.name;
          this.common.isSelectedCategoryChanged = false;  //to close the category popup in mobile 
        }
      }
    }
  }

}
