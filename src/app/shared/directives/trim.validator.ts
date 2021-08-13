import { AbstractControl, ValidatorFn } from '@angular/forms';

export function TrimValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } => {

     // messy but you get the idea
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'required': true }

  };
}