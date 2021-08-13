import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardMask'
})
export class CreditCardPipe implements PipeTransform {

  transform(value: any): any {
      if(value){
        return value.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
      }
  }

}
