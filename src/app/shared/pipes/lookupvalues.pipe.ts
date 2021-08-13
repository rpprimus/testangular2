import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lookupvalues'
})
export class LookupvaluesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return value.split('~');
    } else
      return value;

  }

}
