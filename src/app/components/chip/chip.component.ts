import { Component, OnInit, ViewChild, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AppMessage } from '../../shared/config/app-message.enum';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent implements OnInit {
  @ViewChild('matChip') matChipEvent;
  @Input() data: any;
  @Input() isReset: boolean;
  @Input() selected: any;
  @Input() disabled: boolean;
  @Output()
  chipValueChange: EventEmitter<any> = new EventEmitter<any>();
  //Chip Value
  filteredOptions = [];
  selectedData = [];
  //dataName: string = '';
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  //keyUp = new Subject<string>();

  searchText = new FormControl();
  noResult: boolean = false;
  appMessage = AppMessage;

  optionSelected:string = '';

  constructor() { }

  ngOnInit() {
    this.filteredOptions = this.data.arrayValue;
    //auto-search
    // const observable = this.keyUp
    //   .map(value => (event))
    //   .subscribe((data) => {
    //     this.filteredOptions = this._filter(this.dataName);
    //   });

    this.searchText.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(value => {
      this.noResult = false;
      if(this.optionSelected !== value){
        this.filteredOptions = this._filter(value && value.trim());
        if (this.filteredOptions.length == 0) {
          this.noResult = true;
        }
      }
    });
  }

  /**
  * @param changes - If property binding changes occurred, this method will be called
  */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.isReset && changes.isReset.currentValue) {
      this.selectedData = [];
    }
    if (changes.selected && changes.selected.currentValue.length > 0) {
      this.selectedData = changes.selected.currentValue;
    }

  }

  /**
   * Return the value of search in  dropdown
   * @param value each letter in search field
   */
  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.data.arrayValue.filter(val => val.name.toLowerCase().includes(filterValue));
  }

  findIndex(name) {
    let index = -1;
    if (this.selectedData) {
      for (let i = 0; i < this.selectedData.length; i++) {
        if (this.selectedData[i].id == name.id) {
          index = i;
        }
      }
    }
    return index;
  }

  setOptions(selectedData, evt: any) {
    if (evt.source.selected) {     //this is a turn around of angular material that onSelectionChange event is triggering twice whenever you change the option
      let index = this.findIndex(selectedData);
      if (index == -1) {
        this.selectedData.push(selectedData);
      }
      this.optionSelected = selectedData.name;
      this.searchText.setValue('');
      this.matChipEvent.nativeElement.value = "";
      this.filteredOptions = this.data.arrayValue;
      this.chipValueChange.emit(this.selectedData);
    }
  }

  //Remove individual chip
  remove(name: any): void {
    let index = this.selectedData ? this.selectedData.indexOf(name) : null;
    if (index >= 0) {
      this.selectedData.splice(index, 1);
      this.chipValueChange.emit(this.selectedData);
    }
  }

}
