import { Injectable, ElementRef, Inject, ViewChild } from '@angular/core';
import { HttpClientService } from '../../shared/services/http-client.service';
import { AppUrl } from '../../shared/config/app-url.enum';
import { SharedService } from './../../shared/services/shared.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CategoryService {
  data: any = [];
  categoryDataInserted = new BehaviorSubject<any>(false);

  constructor(private httpClientService: HttpClientService, private sharedService: SharedService) { }

  saveCategories(param) {
    return this.httpClientService.put(AppUrl.saveCategories, param);
  }

  saveInfoCategory(param) {
    return this.httpClientService.put(AppUrl.saveInfoCategory, param);
  }

  getCategories(param) {
    return this.httpClientService.get(AppUrl.getCategories, param);
  }

  getCategoriesInfo(param) {
    return this.httpClientService.get(AppUrl.saveInfoCategory, param);
  }

  updateSequence(param) {
    return this.httpClientService.put(AppUrl.updateCategorySequence, param);
  }

  changeStatus(status) {
    return this.httpClientService.put(AppUrl.changeStatusForCategory, status);
  }

  deleteCategoryInfo(param) {
    return this.httpClientService.delete(AppUrl.saveInfoCategory, param);
  }

  loadData() {
    let param = {
      clientId: localStorage.getItem('selectedClientId')
    }
    this.getCategories(param).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        this.data = this.list_to_tree(response.response);
        this.sortOnSequence(this.data);
        // this.createTreeData(response.response);
        this.enableMoveButton(this.data);
        this.categoryDataInserted.next(this.data.length > 0 ? true : false);
      });
    });

  }

  list_to_tree(list) {
    var map = {}, node, roots = [], i;
    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].childrens = []; // initialize the children
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
          return findItem = item;
        } else {
          findItem = this.isNodeExistInTree(item.childrens, element, findItem);
        }
      }
    })
    return findItem;
  }

  createTreeData(response) {
    response.sort(function (a, b) { if (a.id < b.id) { return -1 } else { return 1 } });
    this.data = [];
    response.forEach(element => {
      let findItem;
      findItem = this.isNodeExistInTree(this.data, element, findItem);
      Object.assign(element, { childrens: [] });
      if (findItem) {
        findItem.childrens.push(element);
      } else {
        this.data.push(element);
      }
    });
    this.sortOnSequence(this.data);
    // this.data.sort(function (a, b) {   //sort by name
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

  //Enable the Move option on the three dots of category node if there are siblings of that node
  enableMoveButton(data, enableOnlyOne?) {
    data.forEach(element => {
      let siblingCategories = this.findCategoryNode(element.parentId);
      if (siblingCategories.length > 1) {          //show move buttons only for those nodes which have sibling
        element.isDragDrop = true;
        if (!element.showButton || enableOnlyOne) {        //if undefined, initialize checkbox value as false
          element.showButton = false;
        }
      }
      if (element.childrens.length > 0) {
        this.enableMoveButton(element.childrens, enableOnlyOne);
      }
    });
  }

  //find all the sibling nodes whose parentId matches the current node which is to be moved
  findCategoryNode(id) {
    var trail = [];
    var found = false;
    if (id == null) {   //means if parent id is null then return the main tree data
      return this.data;
    }
    const recurse = (categoryAry) => {
      for (var i = 0; i < categoryAry.length; i++) {
        trail.push(categoryAry[i].childrens);
        if ((categoryAry[i].id === id)) {
          found = true;
          break;
        } else {
          if (categoryAry[i].childrens.length > 0) {
            recurse(categoryAry[i].childrens);
            if (found) {
              break;
            }
          }
        }
      }
    }
    recurse(this.data);
    return trail[trail.length - 1];
  }

  saveSequence(cat1, cat2) {
    let request = [];
    request.push({ id: cat1.id, sequence: cat1.sequenceNumber }, { id: cat2.id, sequence: cat2.sequenceNumber });
    this.updateSequence(request).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        this.scroll(cat1.id);
      });
    }, error => { this.sharedService.onError(error) });
  }

  //This method is done for the smooth scrolling of the page to the particular section
  scroll(num) {
    let el = document.getElementById('cat' + num);
    el.scrollIntoView({ block: 'start', behavior: "smooth" });
  }

  //Display only 1 set of buttons to change the sequence of categories at a time
  disableOtherMoveButtons(selectedCategory) {
    if (selectedCategory.showButton) {
      this.enableMoveButton(this.data, true);
      selectedCategory.showButton = true;
    }
  }


  //find all the sibling nodes whose parentId matches the current node which can be moved
  // findCategoryNode(element) {
  //   let arr = [];
  //   if (element.parentId == null) {
  //     arr= this.data;
  //   } else {
  //     arr = this.searchNode(this.data, element);
  //   }
  //   // arr = this.unalteredData.filter(x=> x.parentId == parentId)
  //    return arr;
  // }

  // searchNode(data, element) {
  //   let nodeChilds :any;
  //   // for(let i = 0; i< data.length; i++){
  //   //   if (data[i].id == element.parentId) {
  //   //     nodeChilds = data[i].childrens;
  //   //     break;
  //   //   }else{
  //   //     if (data[i].childrens.length > 0) {
  //   //       this.searchNode(data[i].childrens, element);
  //   //     }
  //   //   }
  //   // }
  //   nodeChilds =  data.find((x)=> {
  //     if(x.id == element.parentId){
  //      return x.childrens;
  //     }
  //   else if(x.childrens && x.childrens.length){
  //    return this.searchNode(x.childrens, element);
  //   }})
  //   return nodeChilds && nodeChilds.childrens;
  // }


  //generate map of json in categories to pass in API
  // generateMapOfSequence(categories) {
  //   let obj: Map<String, any> = new Map<'', ''>();
  //   categories.forEach(item => {
  //       obj.set(item.id, item.sequenceNumber);
  //   });
  //    this.saveSequence(this.map_to_object(obj));
  // }

  // map_to_object(map) {
  //   const out = Object.create(null)
  //   map.forEach((value, key) => {
  //     if (value instanceof Map) {
  //       out[key] = this.map_to_object(value);
  //     }
  //     else {
  //       out[key] = value;
  //       JSON.stringify(out[key]);
  //     }
  //   })
  //   return out;
  // }
}
