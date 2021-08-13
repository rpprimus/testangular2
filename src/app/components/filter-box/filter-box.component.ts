import { Component, OnInit, Input, SimpleChanges, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Util } from '../../shared/services/util';

@Component({
  selector: 'app-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.scss']
})

export class FilterBoxComponent implements OnInit {
  @Input() data: any;
  @Input() values: any;
  @Output()
  filterChange: EventEmitter<any> = new EventEmitter<any>();
  showFilter: boolean = false;
  filterCatories: any = [];
  filterValues: any = [];
  searchValue: any = {};
  queryParams: any = [];
  quickSearchText: string = "";
  hasfilter: boolean = false;
  countValue: any = [];
  isQuickSearchIconClicked: boolean = false;
  totalFilterCount: number = 0;
  hasSearched: boolean = false;  //this shows whether API has been hit with searchText or not
  @ViewChild("search") searchfield: ElementRef;
  constructor(private el: ElementRef, public util: Util) {
    this.util.mergeObject();
  }


  // On Click on outside Filter box it should be closed
  @HostListener('document:click', ['$event'])
  handleWindowClick(event: Event) {
    let isElement = this.el.nativeElement.contains(event.target);
    if ((<any>event.target).id == 'filter') {
      this.util.backgroundOverlay.next(true);
      this.showFilter = true;
    } else if (this.showFilter && isElement) {
      this.showFilter = true;
      this.util.backgroundOverlay.next(true);
    }
    else {
      this.showFilter = false;
      this.util.backgroundOverlay.next(false);
      // !this.hasfilter ? this.clearFilter() : '';
    }
  }


  /**
* 
* @param changes - If property binding changes occurred, this method will be called
*/
  ngOnChanges(changes: SimpleChanges) {
    if (changes.data.currentValue && changes.data.currentValue.values) {
      this.filterValues = changes.data.currentValue.values;
      let keys = Object.keys(this.filterValues);
      keys.forEach((element, index) => {
        if (this.filterValues[element].length > 0)
          this.filterValues[element].unshift({ id: -1, name: 'All', checked: false }); // added 'All' element in each category on first position
      });
      //for dynamic category name (used in client store user for hierarchy label name)
      let cat = this.data.categories[0];
      this.filterCatories = cat.categories;
      this.queryParams = cat.queryParams;
      if (keys.length > 0) {
        this.retainFilter();
      }
    }
  }

  ngOnInit() {

  }

  retainFilter() {
    let param = JSON.parse(localStorage.getItem(window.location.pathname));
    if (param) {
      let keys = Object.keys(param);
      keys.forEach((element) => {
        if (element == 'searchText') {
          this.quickSearchText = decodeURIComponent(param[element]);
          this.hasSearched = (this.quickSearchText && this.quickSearchText.trim().length) > 0 ? true : false;
          this.hasfilter = false;
        } else {
          let values, a;
          if (element == 'status') {
            values = this.filterValues[element];
          }
          else if (element == 'visibilityGroupIds') {
            values = this.filterValues['visibility Group'];
          } else {
            a = element.slice(0, -3).toLowerCase();
            values = this.filterValues[a];
          }
          if(values){
            values.forEach((item) => {
              param[element].forEach(x => {
                if (item.id == x) {
                  item.checked = true;
                  this.hasfilter = true;
                  a ? this.onCheck(true, x, a) : element == 'visibilityGroupIds' ?
                    this.onCheck(true, x, 'visibility Group') : this.onCheck(true, x, element);
                }
              })
            });
          }
        }
      });
      this.calculateTotalFilterCount();
    }
  }

  onClearQuickSearch() {
    this.isQuickSearchIconClicked = false;
    this.quickSearchText = '';
    this.onKeyEnter("clearSearch");
  }

  onQuickSearchIconClicked() {
    this.searchfield.nativeElement.focus();
    this.isQuickSearchIconClicked = !this.isQuickSearchIconClicked;   // toggle the search input box
    this.onKeyEnter();
  }

  /**
   * IF All option is checked > checked all items, if any item unchecked then uncheck All option also
   * @param $event - value
   * @param id  - item id
   * @param category - category
   */
  onCheck($event, id, category) {
    let values = this.filterValues[category];
    if (id == -1) {  // 'All'
      values.forEach((element) => {
        element.checked = $event.checked;
      });
      if ($event.checked) {                           //for count of filter
        this.countValue[category] = values.length - 1;
      } else {
        this.countValue[category] = 0;
      }
    }
    else {
      if (!$event.checked) {   // if any item is unchecked then deselect All
        values[0].checked = false
      }

      // If all items are checked then select All option also
      let checkedValues = values.map(function (item) { return item.checked });  // get all item's checked property array
      if (checkedValues.lastIndexOf(false) == 0) { // if false last index is not 0 means more then 1 item are still unchecked
        values[0].checked = true;
      }
      let count = 0;
      checkedValues.forEach(x => {
        if (x) {
          count++;
        }
      });
      this.countValue[category] = count;
    }
  }

  applyFilter() {
    let arr = {};
    let keys = Object.keys(this.filterValues);

    keys.forEach((element, index) => {
      let ids = [];
      let values = this.filterValues[element];

      values.find(function (item) {
        if (item.checked && item.id > -1) {  // get all checked item of a category, -1 id is for 'All' value
          ids.push(item.id);
        }
      });
      if (ids.length > 0) {
        arr[this.queryParams[index]] = ids;
      }
    });

    if (Object.keys(arr).length > 0) {
      //calculate the value of total filter count and assign in variable totalFilterCount
      this.calculateTotalFilterCount();

      this.hasfilter = true;
      this.filterChange.emit(arr);
    }
    //this.onClearQuickSearch();
    this.isQuickSearchIconClicked = false;
    this.quickSearchText = '';
    this.hasSearched = false;
    this.showFilter = false;
  }

  /**
   * IF filter applied then only emit event to load default data
   */
  clearFilter() {
    if (this.hasfilter) {
      this.totalFilterCount = 0;
      this.filterChange.emit(); // Emit event with no data
      this.hasfilter = false;
    }
    let keys = Object.keys(this.filterValues);
    keys.forEach((element, index) => {
      let values = this.filterValues[element];
      values.find(function (item) {
        if (item.checked) {
          item.checked = false;
        }
      }); // mark unchecked
      this.countValue[keys[index]] = 0;       //reset the count of each filter back to 0.
    });
    this.showFilter = false;
  }

  /**Perform search
   * @param type = optional only defined for search icon click
   * If no letter is typed then perform SEARCH only in case of clear search X button click
   */
  onKeyEnter(type?: string) {
   if (this.quickSearchText != '' || (type != undefined && type == "clearSearch")) {
      if (this.quickSearchText != '' && this.quickSearchText.trim().length > 0) {
        let param = {
          searchText: encodeURIComponent(this.quickSearchText),
        }
        this.filterChange.emit(param);
      }
      else {
        this.filterChange.emit();
      }
      this.hasSearched = (this.quickSearchText && this.quickSearchText.trim().length) > 0 ? true : false;
      //remove the filters before emitting search data
      this.hasfilter = false;
      let keys = Object.keys(this.filterValues);
      keys.forEach((element, index) => {
        let values = this.filterValues[element];
        values.find(function (item) {
          if (item.checked) {
            item.checked = false;
          }
        }); // mark unchecked
        this.countValue[keys[index]] = 0;
        this.totalFilterCount = 0;
      });
      this.showFilter = false;
    }else{
      if(this.hasSearched){
        this.filterChange.emit();
        this.hasSearched = false;
      }
    }
  }

  calculateTotalFilterCount() {
    this.totalFilterCount = 0;
    let keys = Object.keys(this.countValue);
    keys.forEach(x => {
      this.totalFilterCount += this.countValue[x];
    });
  }

}



import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myfilter',
  pure: false
})
export class MyFilterPipe implements PipeTransform {
  transform(items: any[], filter: any): any {
    if (!items || !filter) {
      return items;
    }

    // filter items array, items which match
    return items.filter(function (item) {
      if ((item.description || item.name).toLowerCase().indexOf(filter.toLowerCase()) > -1) {
        return item;
      }
    });
  }
}