import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

import { TrimValidator } from './trim.validator';

/**
 * This validator works like "required" but it does not allow whitespace either
 *
 * @export
 * @class NoWhitespaceDirective
 * @implements {Validator}
 */
@Directive({
    selector: '[trimDirective]',
    providers: [{ provide: NG_VALIDATORS, useExisting: TrimDirective, multi: true }]
})
export class TrimDirective implements Validator {

    private valFn = TrimValidator();
    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}