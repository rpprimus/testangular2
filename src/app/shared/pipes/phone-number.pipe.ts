import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value){
      var viewVal =  value.trim().replace(/^\+/, '');
      viewVal = viewVal.replace(/[^0-9]/g, '');
      var area, number;
      if (viewVal.length > 3) {
        area = viewVal.slice(0, 3);
        number = viewVal.slice(3);
        if (number) {
          if (number.length > 3) {
            number = number.slice(0, 3) + '-' + number.slice(3, 7);
          }
          return (area + "-" + number).trim().slice(0, 13);
        } else {
          return area;
        }
      } else {
        area = viewVal;
        return area;
      }
    }else{
      return "";
    }

    // switch(viewVal.length){
    //   case 1:
    //   case 2:
    //   case 3: area = viewVal;
    //   break;
    //   default:
    //     area = viewVal.slice(0,3);
    //     number = viewVal.slice(3);
    // }

    // if (number) {
    //   if (number.length > 3) {
    //     number = number.slice(0, 3) + '-' + number.slice(3, 7);
    //   }
    //   return ("(" + area + ")" + number).trim().slice(0, 13);
    // } else {
    //   return '(' + area;
    // }
  }

}
