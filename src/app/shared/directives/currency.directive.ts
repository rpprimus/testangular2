import { Directive, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[currency]',
    host: {
        //'(ngModelChange)': 'onInputChange($event)',
        '(keyup)': 'onInputChange($event)'
    }
})
export class CurrencyDirective {
    constructor(public model: NgControl) { }

    @Output() rawChange: EventEmitter<string> = new EventEmitter<string>();

    //   onInputChange(event: any, backspace: any) {
    onInputChange(event: any) {
        let value = event.target.value;
        if (value) {
            let newVal:any = (parseInt(value.replace(/[^0-9]/g, '')) / 100).toLocaleString('en-US', { minimumFractionDigits: 2 });
            if(newVal == 'NaN'){
                newVal = "";
            }
            let rawValue = newVal;

            // if(event.keyCode == 8) {   //keycode for Backspace key
            //   newVal = newVal.substring(0, newVal.length - 1);
            // }

            if (newVal.length == 0) {
                newVal = '';
            }
            // else {
            //     newVal = newVal;
            // }
         
            // set the new value
            this.model.valueAccessor.writeValue(newVal);
            this.rawChange.emit(rawValue);
        }
    }
}